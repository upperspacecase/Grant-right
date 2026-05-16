import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background grid place-items-center px-6">
      <Card className="w-full max-w-md p-8">
        <Link href="/" className="block font-heading text-2xl mb-1">
          Grant-Right
        </Link>
        <div className="eyebrow mb-6">Create your account</div>
        <form action="/onboarding" className="space-y-4">
          <div>
            <div className="field-label">Public name</div>
            <Input placeholder="The name funders will see" />
          </div>
          <div>
            <div className="field-label">Email</div>
            <Input type="email" placeholder="you@studio.com" />
          </div>
          <div>
            <div className="field-label">Password</div>
            <Input type="password" placeholder="At least 12 characters" />
          </div>
          <Button className="w-full mt-2">
            Start your kit <ArrowRight size={13} />
          </Button>
        </form>
        <div className="mt-4 text-xs text-muted-foreground leading-relaxed text-center">
          By signing up you agree that Grant-Right's AI drafts are starting points to edit, not
          final submissions. We never auto-submit on your behalf in V1.
        </div>
        <div className="mt-6 text-center text-xs">
          Already a member? <Link href="/sign-in" className="text-foreground underline">Sign in</Link>
        </div>
      </Card>
    </div>
  );
}
