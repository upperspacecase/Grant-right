import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-background grid place-items-center px-6">
      <Card className="w-full max-w-md p-8">
        <Link href="/" className="block font-heading text-2xl mb-1">
          Grant-Right
        </Link>
        <div className="eyebrow mb-6">Sign in</div>
        <form action="/dashboard" className="space-y-4">
          <div>
            <div className="field-label">Email</div>
            <Input defaultValue="studio@miraokonkwo.com" />
          </div>
          <div>
            <div className="field-label">Password</div>
            <Input type="password" defaultValue="••••••••" />
          </div>
          <Button className="w-full mt-2">
            Sign in <ArrowRight size={13} />
          </Button>
        </form>
        <div className="mt-4 text-xs text-muted-foreground text-center">
          Backed by Firebase Auth in V1. Prototype skips real verification.
        </div>
        <div className="mt-6 text-center text-xs">
          No account? <Link href="/sign-up" className="text-foreground underline">Sign up</Link>
        </div>
      </Card>
    </div>
  );
}
