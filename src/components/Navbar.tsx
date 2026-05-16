"use client";

import Link from "next/link";
import { Palette, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-4 right-4 z-50 rounded-2xl bg-white/80 backdrop-blur-md border border-white/50 shadow-sm">
      <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <div className="h-9 w-9 rounded-xl bg-coral flex items-center justify-center">
            <Palette className="h-5 w-5 text-white" />
          </div>
          <span className="font-heading text-xl font-semibold text-foreground">
            Residency
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/opportunities"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Explore Residencies
          </Link>
          <Link
            href="/artists"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Browse Artists
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            How It Works
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button asChild variant="ghost" size="sm" className="cursor-pointer">
            <Link href="/sign-in">Log In</Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="bg-coral hover:bg-coral/90 text-white rounded-xl cursor-pointer"
          >
            <Link href="/sign-up">Join Now</Link>
          </Button>
        </div>

        <button
          className="md:hidden cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-3">
          <Link
            href="/opportunities"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 cursor-pointer"
          >
            Explore Residencies
          </Link>
          <Link
            href="/artists"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 cursor-pointer"
          >
            Browse Artists
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 cursor-pointer"
          >
            How It Works
          </Link>
          <div className="flex gap-3 pt-2">
            <Button asChild variant="ghost" size="sm" className="cursor-pointer">
              <Link href="/sign-in">Log In</Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="bg-coral hover:bg-coral/90 text-white rounded-xl cursor-pointer"
            >
              <Link href="/sign-up">Join Now</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
