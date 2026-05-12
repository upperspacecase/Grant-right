import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-paper grid place-items-center px-6">
      <div className="w-full max-w-md paper-card p-8">
        <Link href="/" className="block font-display text-2xl mb-1">
          Grant-Right
        </Link>
        <div className="eyebrow mb-6">Create your account</div>
        <form action="/onboarding" className="space-y-4">
          <div>
            <div className="field-label">Public name</div>
            <input className="input" placeholder="The name funders will see" />
          </div>
          <div>
            <div className="field-label">Email</div>
            <input className="input" type="email" placeholder="you@studio.com" />
          </div>
          <div>
            <div className="field-label">Password</div>
            <input className="input" type="password" placeholder="At least 12 characters" />
          </div>
          <button className="btn btn-primary w-full justify-center mt-2">
            Start your kit <ArrowRight size={13} />
          </button>
        </form>
        <div className="mt-4 text-xs text-muted leading-relaxed text-center">
          By signing up you agree that Grant-Right's AI drafts are starting points to edit, not
          final submissions. We never auto-submit on your behalf in V1.
        </div>
        <div className="mt-6 text-center text-xs">
          Already a member? <Link href="/sign-in" className="text-ink underline">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
