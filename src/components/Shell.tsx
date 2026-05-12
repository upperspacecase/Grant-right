"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Library,
  FileText,
  Settings,
  Sparkles,
  ChevronRight,
  Plus
} from "lucide-react";
import { cn } from "@/lib/cn";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/kit", label: "The Kit", icon: User },
  { href: "/opportunities", label: "Opportunities", icon: Library },
  { href: "/applications", label: "Applications", icon: FileText },
  { href: "/settings", label: "Settings", icon: Settings }
];

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen flex bg-paper text-ink">
      <aside className="w-64 shrink-0 border-r rule bg-[#FBF8F1] flex flex-col">
        <div className="px-6 pt-7 pb-6 border-b rule">
          <Link href="/dashboard" className="block">
            <div className="font-display text-2xl leading-none">Grant-Right</div>
            <div className="eyebrow mt-2">For artists, by design</div>
          </Link>
        </div>
        <nav className="px-3 py-5 flex-1">
          {nav.map((item) => {
            const active = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-sm text-[13px] mb-0.5 transition-colors",
                  active
                    ? "bg-ink text-paper"
                    : "text-ink/80 hover:bg-[#EFE9DA]"
                )}
              >
                <Icon size={15} strokeWidth={1.6} />
                <span>{item.label}</span>
                {active && <ChevronRight size={13} className="ml-auto opacity-60" />}
              </Link>
            );
          })}
        </nav>
        <div className="border-t rule p-4 mx-3 mb-4 paper-card">
          <div className="flex items-center gap-2 text-xs font-medium text-ink">
            <Sparkles size={13} className="text-accent" />
            Claude drafting credit
          </div>
          <div className="mt-2 text-[11px] text-muted leading-snug">
            42 of 50 monthly drafts remaining. Voice-preserving mode on.
          </div>
        </div>
      </aside>
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b rule px-8 flex items-center justify-between bg-paper">
          <div className="text-xs text-muted">
            Signed in as <span className="text-ink font-medium">Mira Okonkwo</span> · Brooklyn, NY
          </div>
          <div className="flex items-center gap-3">
            <Link href="/applications/new" className="btn btn-ghost">
              <Plus size={13} /> New application
            </Link>
            <div className="size-8 rounded-full bg-ink text-paper flex items-center justify-center text-[11px] font-medium">
              MO
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-auto">{children}</div>
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
    <div className="px-8 pt-10 pb-6 border-b rule">
      <div className="flex items-end justify-between gap-6">
        <div>
          {eyebrow && <div className="eyebrow mb-3">{eyebrow}</div>}
          <h1 className="font-display text-4xl leading-tight">{title}</h1>
          {subtitle && <p className="mt-3 text-muted text-[15px] max-w-prose2 leading-relaxed">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2 pb-1">{actions}</div>}
      </div>
    </div>
  );
}
