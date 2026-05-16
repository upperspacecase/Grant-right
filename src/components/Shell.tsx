"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  User,
  Library,
  FileText,
  Settings,
  Sparkles,
  ChevronRight,
  Plus,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/kit", label: "The Kit", icon: User },
  { href: "/opportunities", label: "Opportunities", icon: Library },
  { href: "/applications", label: "Applications", icon: FileText },
  { href: "/settings", label: "Settings", icon: Settings }
];

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Mobile drawer overlay */}
      {drawerOpen && (
        <button
          aria-label="Close menu"
          onClick={() => setDrawerOpen(false)}
          className="md:hidden fixed inset-0 bg-foreground/40 z-30"
        />
      )}

      {/* Sidebar — drawer on mobile, persistent on md+ */}
      <aside
        className={cn(
          "w-64 shrink-0 border-r border-border bg-muted flex flex-col",
          "fixed inset-y-0 left-0 z-40 transform transition-transform duration-200",
          "md:static md:translate-x-0",
          drawerOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="px-6 pt-7 pb-6 border-b border-border flex items-center justify-between">
          <Link href="/dashboard" className="block">
            <div className="font-heading text-2xl leading-none">Grant-Right</div>
            <div className="eyebrow mt-2">For artists, by design</div>
          </Link>
          <button
            onClick={() => setDrawerOpen(false)}
            className="md:hidden text-muted-foreground hover:text-foreground p-1 -mr-1"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="px-3 py-5 flex-1 overflow-y-auto">
          {nav.map((item) => {
            const active = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] mb-0.5 transition-colors",
                  active
                    ? "bg-foreground text-background"
                    : "text-foreground/80 hover:bg-sand-light"
                )}
              >
                <Icon size={15} strokeWidth={1.6} />
                <span>{item.label}</span>
                {active && <ChevronRight size={13} className="ml-auto opacity-60" />}
              </Link>
            );
          })}
        </nav>
        <Card className="border-t border-border mx-3 mb-4 p-4 rounded-xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
            <Sparkles size={13} className="text-primary" />
            Claude drafting credit
          </div>
          <div className="mt-2 text-[11px] text-muted-foreground leading-snug">
            42 of 50 monthly drafts remaining. Voice-preserving mode on.
          </div>
        </Card>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-border px-4 sm:px-6 md:px-8 flex items-center justify-between bg-background gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setDrawerOpen(true)}
              className="md:hidden text-foreground p-1 -ml-1"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <div className="text-xs text-muted-foreground truncate">
              <span className="hidden sm:inline">Signed in as </span>
              <span className="text-foreground font-medium">Mira Okonkwo</span>
              <span className="hidden sm:inline"> · Brooklyn, NY</span>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Button asChild variant="ghost" size="sm">
              <Link href="/applications/new">
                <Plus size={13} />
                <span className="hidden sm:inline">New application</span>
                <span className="sm:hidden">New</span>
              </Link>
            </Button>
            <div className="size-8 rounded-full bg-foreground text-background flex items-center justify-center text-[11px] font-medium">
              MO
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-x-hidden">{children}</div>
      </main>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  actions
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="px-4 sm:px-6 md:px-8 pt-7 sm:pt-10 pb-5 sm:pb-6 border-b border-border">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6">
        <div className="min-w-0">
          {eyebrow && <div className="eyebrow mb-3">{eyebrow}</div>}
          <h1 className="font-heading text-3xl sm:text-4xl leading-tight">{title}</h1>
          {subtitle && (
            <p className="mt-3 text-muted-foreground text-[14px] sm:text-[15px] max-w-prose2 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-2 flex-wrap md:flex-nowrap md:pb-1 md:shrink-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
