/**
 * Client-side file import for onboarding and the assistant: turns an uploaded
 * file into either plain text (sent to the AI as usual) or a downscaled image
 * data URL (sent to the vision model). Parsers load lazily so the main bundle
 * stays lean.
 */

export type ImportedFile =
  | { kind: "text"; name: string; text: string }
  | { kind: "image"; name: string; dataUrl: string };

export const IMPORT_ACCEPT =
  ".txt,.csv,.tsv,.md,.text,.pdf,.docx,.doc,.xlsx,.xls,.png,.jpg,.jpeg,.webp,.gif,.bmp";

const IMAGE_RE = /\.(png|jpe?g|webp|gif|bmp)$/i;
const TEXT_RE = /\.(txt|csv|tsv|md|text)$/i;
const PDF_RE = /\.pdf$/i;
const WORD_RE = /\.docx?$/i;
const EXCEL_RE = /\.xlsx?$/i;

const MAX_TEXT_CHARS = 19_000;

/** Read a File into text or a (downscaled) image data URL. */
export async function importFile(file: File): Promise<ImportedFile> {
  const name = file.name || "file";
  if (IMAGE_RE.test(name) || file.type.startsWith("image/")) {
    return { kind: "image", name, dataUrl: await fileToDataUrl(file) };
  }
  if (TEXT_RE.test(name)) {
    return { kind: "text", name, text: capText(await file.text()) };
  }
  if (PDF_RE.test(name) || file.type === "application/pdf") {
    return importPdf(file);
  }
  if (WORD_RE.test(name)) {
    const mammoth = await import("mammoth/mammoth.browser");
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return { kind: "text", name, text: capText(result.value) };
  }
  if (EXCEL_RE.test(name)) {
    const XLSX = await import("xlsx");
    const wb = XLSX.read(await file.arrayBuffer());
    const parts: string[] = [];
    for (const sheetName of wb.SheetNames) {
      const csv = XLSX.utils.sheet_to_csv(wb.Sheets[sheetName]);
      if (csv.trim()) parts.push(`# ${sheetName}\n${csv}`);
      if (parts.join("\n").length > MAX_TEXT_CHARS) break;
    }
    return { kind: "text", name, text: capText(parts.join("\n\n")) };
  }
  // Unknown type — try reading it as text (many exports arrive extensionless).
  try {
    const text = await file.text();
    if (text.trim()) return { kind: "text", name, text: capText(text) };
  } catch {
    /* fall through */
  }
  throw new Error("Couldn't read that file type — try a screenshot or PDF.");
}

function capText(text: string): string {
  const trimmed = text.trim();
  return trimmed.length > MAX_TEXT_CHARS ? trimmed.slice(0, MAX_TEXT_CHARS) : trimmed;
}

async function importPdf(file: File): Promise<ImportedFile> {
  const pdfjs = await import("pdfjs-dist");
  const worker = await import("pdfjs-dist/build/pdf.worker.min.mjs?url");
  pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
  const doc = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;

  const pages: string[] = [];
  for (let i = 1; i <= Math.min(doc.numPages, 8); i += 1) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const text = content.items
      .map((item) => ("str" in item ? item.str : ""))
      .join(" ");
    if (text.trim()) pages.push(text.trim());
    if (pages.join("\n").length > MAX_TEXT_CHARS) break;
  }

  const text = capText(pages.join("\n\n"));
  if (text.length > 40) return { kind: "text", name: file.name, text };

  // Scanned PDF — render the first page to an image and let the model read it.
  const page = await doc.getPage(1);
  const viewport = page.getViewport({ scale: 2 });
  const canvas = document.createElement("canvas");
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  await page.render({ canvas, canvasContext: canvas.getContext("2d")!, viewport }).promise;
  return {
    kind: "image",
    name: file.name,
    dataUrl: await downscaleCanvas(canvas),
  };
}

/** Decode an image file, downscale to ≤1600px, re-encode as JPEG data URL. */
async function fileToDataUrl(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file).catch(() => null);
  if (bitmap) {
    const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
    const w = Math.max(1, Math.round(bitmap.width * scale));
    const h = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, w, h);
    bitmap.close();
    return downscaleCanvas(canvas);
  }
  // Fallback: raw data URL (rare — exotic format the browser can't decode).
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read the image."));
    reader.readAsDataURL(file);
  });
}

async function downscaleCanvas(canvas: HTMLCanvasElement): Promise<string> {
  const max = 1600;
  let source = canvas;
  if (Math.max(canvas.width, canvas.height) > max) {
    const scale = max / Math.max(canvas.width, canvas.height);
    const smaller = document.createElement("canvas");
    smaller.width = Math.round(canvas.width * scale);
    smaller.height = Math.round(canvas.height * scale);
    smaller.getContext("2d")!.drawImage(canvas, 0, 0, smaller.width, smaller.height);
    source = smaller;
  }
  // White background so transparent screenshots still read well as JPEG.
  const flat = document.createElement("canvas");
  flat.width = source.width;
  flat.height = source.height;
  const ctx = flat.getContext("2d")!;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, flat.width, flat.height);
  ctx.drawImage(source, 0, 0);
  return flat.toDataURL("image/jpeg", 0.85);
}
