"use client";

import { MapPin, Paintbrush, DollarSign } from "lucide-react";
import Image from "next/image";

interface ResidencyCardProps {
  title: string;
  location: string;
  duration: string;
  imageUrl: string;
  disciplines: string[];
  hasStipend: boolean;
  color: string;
}

export function ResidencyCard({
  title,
  location,
  duration,
  imageUrl,
  disciplines,
  hasStipend,
  color,
}: ResidencyCardProps) {
  return (
    <div className="group cursor-pointer rounded-2xl bg-white border border-border/50 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-44 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-lg bg-white/90 backdrop-blur-sm px-2.5 py-1 text-xs font-medium">
          <MapPin className="h-3 w-3 text-coral" />
          {location}
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-heading text-lg font-semibold text-foreground">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{duration}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Paintbrush className="h-3.5 w-3.5 text-sage" />
            <span>{disciplines.join(", ")}</span>
          </div>
          {hasStipend && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <DollarSign className="h-3.5 w-3.5 text-sage" />
              <span>Stipend</span>
            </div>
          )}
        </div>

        <div
          className="h-1 w-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}
