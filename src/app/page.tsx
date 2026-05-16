import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { ResidencyCard } from "@/components/ResidencyCard";
import { HowItWorks } from "@/components/HowItWorks";
import { FeaturedArtists } from "@/components/FeaturedArtists";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const featuredResidencies = [
  {
    title: "Alpine Studio",
    location: "Swiss Alps",
    duration: "2 Months",
    imageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    disciplines: ["Painting", "Sculpture"],
    hasStipend: true,
    color: "#7BAE7F",
  },
  {
    title: "Urban Loft",
    location: "Berlin, DE",
    duration: "1 Month",
    imageUrl:
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=600&h=400&fit=crop",
    disciplines: ["Digital Art", "Photography"],
    hasStipend: false,
    color: "#6AAFE8",
  },
  {
    title: "Coastal Haven",
    location: "Lisbon, PT",
    duration: "6 Weeks",
    imageUrl:
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600&h=400&fit=crop",
    disciplines: ["Ceramics", "Textiles"],
    hasStipend: true,
    color: "#E8756A",
  },
  {
    title: "Beachfront Residency",
    location: "Bali, ID",
    duration: "3 Months",
    imageUrl:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=400&fit=crop",
    disciplines: ["Mixed Media"],
    hasStipend: true,
    color: "#B8A9D4",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 px-4 overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 -left-20 h-80 w-80 rounded-full bg-coral/15 blur-3xl" />
          <div className="absolute top-40 right-0 h-96 w-96 rounded-full bg-lavender/15 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-sage/15 blur-3xl" />
          <div className="absolute top-60 left-1/2 h-64 w-64 rounded-full bg-sky/10 blur-3xl" />
          <div className="absolute bottom-20 right-1/4 h-48 w-48 rounded-full bg-sand/30 blur-3xl" />

          {/* Geometric shapes */}
          <div className="absolute top-32 right-20 h-20 w-20 rounded-2xl bg-peach/40 rotate-12" />
          <div className="absolute bottom-40 left-20 h-16 w-16 rounded-full bg-mint/40" />
          <div className="absolute top-1/2 right-1/3 h-12 w-12 rounded-lg bg-lavender-light/50 -rotate-6" />
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-sand/60 px-4 py-1.5 text-sm font-medium text-foreground mb-6">
                <span className="h-2 w-2 rounded-full bg-sage animate-pulse" />
                Now accepting applications
              </div>

              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
                Connecting
                <br />
                Artists With
                <br />
                <span className="text-coral">Residency Hosts</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-4 font-semibold uppercase tracking-wide">
                A Two-Sided Marketplace.
              </p>
              <p className="text-base text-muted-foreground mb-8 leading-relaxed max-w-md">
                Artists create rich profiles; Hosts list unique spaces to
                discover and invite. Find your next creative home anywhere in
                the world.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-coral hover:bg-coral/90 text-white rounded-xl text-base px-8 h-13 font-heading font-semibold cursor-pointer"
                >
                  <Link href="/sign-up">
                    Join Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-lavender bg-lavender/20 hover:bg-lavender/30 text-foreground rounded-xl text-base px-8 h-13 font-heading font-semibold cursor-pointer"
                >
                  <Link href="/opportunities">Explore Residencies</Link>
                </Button>
              </div>
            </div>

            {/* Right: Featured Residencies Grid */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-xl font-semibold text-foreground">
                  Featured Residencies
                </h2>
                <Link
                  href="/opportunities"
                  className="text-sm text-coral hover:text-coral/80 font-medium flex items-center gap-1 cursor-pointer transition-colors"
                >
                  View all
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {featuredResidencies.map((residency) => (
                  <ResidencyCard key={residency.title} {...residency} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar Section */}
      <section className="py-12 px-4 bg-white">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-cream p-2 shadow-sm">
            <div className="flex-1 flex items-center gap-3 px-4">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by location, discipline, or keyword..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
              />
            </div>
            <Button className="bg-coral hover:bg-coral/90 text-white rounded-xl px-6 cursor-pointer">
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-white">
        <div className="mx-auto max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "2,400+", label: "Artists", color: "text-coral" },
            { value: "850+", label: "Residencies", color: "text-sage" },
            { value: "45+", label: "Countries", color: "text-sky" },
            { value: "12K+", label: "Connections Made", color: "text-lavender" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className={`font-heading text-3xl font-bold ${stat.color}`}>
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <HowItWorks />
      <FeaturedArtists />
      <CTASection />
      <Footer />
    </div>
  );
}
