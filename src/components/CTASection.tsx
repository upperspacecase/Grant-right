import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 h-64 w-64 rounded-full bg-coral/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-64 w-64 rounded-full bg-lavender/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-sage/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
          Ready to Find Your Next
          <br />
          <span className="text-coral">Creative Home?</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
          Join thousands of artists and hosts building meaningful creative
          connections around the world.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-coral hover:bg-coral/90 text-white rounded-xl text-base px-8 h-12 cursor-pointer"
          >
            <Link href="/sign-up">
              Join as an Artist
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-lavender bg-lavender/10 hover:bg-lavender/20 text-foreground rounded-xl text-base px-8 h-12 cursor-pointer"
          >
            List Your Space
          </Button>
        </div>
      </div>
    </section>
  );
}
