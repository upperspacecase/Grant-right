import Image from "next/image";
import { MapPin } from "lucide-react";

const artists = [
  {
    name: "Maya Chen",
    discipline: "Painter",
    location: "Brooklyn, NY",
    avatar: "https://i.pravatar.cc/300?img=1",
    color: "border-coral",
  },
  {
    name: "Luca Moretti",
    discipline: "Sculptor",
    location: "Florence, Italy",
    avatar: "https://i.pravatar.cc/300?img=3",
    color: "border-sky",
  },
  {
    name: "Aisha Williams",
    discipline: "Mixed Media",
    location: "London, UK",
    avatar: "https://i.pravatar.cc/300?img=5",
    color: "border-sage",
  },
  {
    name: "Kenji Tanaka",
    discipline: "Digital Art",
    location: "Tokyo, Japan",
    avatar: "https://i.pravatar.cc/300?img=8",
    color: "border-lavender",
  },
  {
    name: "Sofia Rivera",
    discipline: "Ceramics",
    location: "Mexico City, MX",
    avatar: "https://i.pravatar.cc/300?img=9",
    color: "border-coral",
  },
  {
    name: "André Dupont",
    discipline: "Photography",
    location: "Paris, France",
    avatar: "https://i.pravatar.cc/300?img=11",
    color: "border-sky",
  },
];

export function FeaturedArtists() {
  return (
    <section className="py-24 px-4 bg-cream">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl font-bold text-foreground mb-4">
            Featured Artists
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover talented artists from around the world ready for their next
            creative adventure.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {artists.map((artist) => (
            <div
              key={artist.name}
              className="group cursor-pointer text-center"
            >
              <div
                className={`relative mx-auto mb-3 h-28 w-28 rounded-2xl overflow-hidden border-3 ${artist.color} transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg`}
              >
                <Image
                  src={artist.avatar}
                  alt={artist.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-heading text-sm font-semibold">
                {artist.name}
              </h3>
              <p className="text-xs text-muted-foreground">
                {artist.discipline}
              </p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <MapPin className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {artist.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
