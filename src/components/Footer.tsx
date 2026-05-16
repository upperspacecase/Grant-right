import { Palette } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white border-t border-border py-12 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4 cursor-pointer">
              <div className="h-8 w-8 rounded-lg bg-coral flex items-center justify-center">
                <Palette className="h-4 w-4 text-white" />
              </div>
              <span className="font-heading text-lg font-semibold">
                Residency
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Connecting artists with inspiring spaces worldwide.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">For Artists</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/artists" className="hover:text-foreground transition-colors cursor-pointer">
                  Browse Residencies
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-foreground transition-colors cursor-pointer">
                  Create Profile
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-foreground transition-colors cursor-pointer">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">For Hosts</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/list" className="hover:text-foreground transition-colors cursor-pointer">
                  List Your Space
                </Link>
              </li>
              <li>
                <Link href="/discover" className="hover:text-foreground transition-colors cursor-pointer">
                  Discover Artists
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-foreground transition-colors cursor-pointer">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors cursor-pointer">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-foreground transition-colors cursor-pointer">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors cursor-pointer">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Residency. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
