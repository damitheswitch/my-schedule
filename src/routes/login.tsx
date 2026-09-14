import { createFileRoute } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <main className="grid min-h-dvh place-items-center bg-paper px-6 py-10">
      <div className="w-full max-w-sm space-y-5">
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-ink-muted uppercase">
            North & South
          </p>
          <h1 className="mt-2 font-serif text-4xl leading-none">Sign in</h1>
          <p className="mt-3 text-sm text-ink-muted">
            Sign in to keep your schedule in sync across your devices — and to
            use the built-in AI without your own API key.
          </p>
        </div>
        {authEnabled ? (
          <div className="flex flex-col gap-2">
            {GROK_PROVIDERS.map((p) => (
              <button
                key={p.providerId}
                type="button"
                onClick={() => signIn(p.providerId, { callbackURL: "/" })}
                className="w-full cursor-pointer rounded-md border border-line bg-paper-elevated px-4 py-2.5 text-left text-sm font-medium shadow-[var(--shadow-border)] transition-[transform,box-shadow] duration-150 hover:-translate-y-px hover:shadow-[var(--shadow-border-hover)]"
              >
                Continue with {p.label}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-ink-muted">Sign-in is disabled.</p>
        )}
      </div>
    </main>
  );
}
