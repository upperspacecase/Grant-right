import { UserPlus, Search, Send, Sparkles } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Your Profile",
    description:
      "Build a rich artist portfolio with your work, bio, and availability.",
    color: "bg-coral",
  },
  {
    icon: Search,
    title: "Discover Spaces",
    description:
      "Browse residencies worldwide filtered by discipline, duration, and perks.",
    color: "bg-sky",
  },
  {
    icon: Send,
    title: "Apply or Get Invited",
    description:
      "Submit applications or receive direct invitations from residency hosts.",
    color: "bg-sage",
  },
  {
    icon: Sparkles,
    title: "Create & Connect",
    description:
      "Immerse yourself in a new environment and create your best work.",
    color: "bg-lavender",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 bg-white scroll-mt-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you&apos;re an artist seeking inspiration or a host with
            space to share, getting started is simple.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="text-center group">
              <div className="relative mb-6">
                <div
                  className={`mx-auto h-16 w-16 rounded-2xl ${step.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                >
                  <step.icon className="h-7 w-7 text-white" />
                </div>
                <span className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-sand text-foreground text-xs font-bold flex items-center justify-center font-heading">
                  {index + 1}
                </span>
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
