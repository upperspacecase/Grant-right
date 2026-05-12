import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-paper grid place-items-center px-6">
      <div className="w-full max-w-md paper-card p-8">
        <Link href="/" className="block font-display text-2xl mb-1">
          Grant-Right
        </Link>
        <div className="eyebrow mb-6">Sign in</div>
        <form action="/dashboard" className="space-y-4">
          <div>
            <div className="field-label">Email</div>
            <input className="input" defaultValue="studio@miraokonkwo.com" />
          </div>
          <div>
            <div className="field-label">Password</div>
            <input className="input" type="password" defaultValue="••••••••" />
          </div>
          <button className="btn btn-primary w-full justify-center mt-2">
            Sign in <ArrowRight size={13} />
          </button>
        </form>
        <div className="mt-4 text-xs text-muted text-center">
          Backed by Firebase Auth in V1. Prototype skips real verification.
        </div>
        <div className="mt-6 text-center text-xs">
          No account? <Link href="/sign-up" className="text-ink underline">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
