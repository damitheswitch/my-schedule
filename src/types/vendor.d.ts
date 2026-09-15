/** Types for vendor entry points that ship untyped browser builds. */
declare module "mammoth/mammoth.browser" {
  export function extractRawText(input: {
    arrayBuffer: ArrayBuffer;
  }): Promise<{ value: string }>;
}
