"use client";
import { TripInfo } from "@/app/create-new-trip/_components/ChatBox";
import { Calendar, Users, Wallet2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data, tripData }: { data: TimelineEntry[], tripData: TripInfo }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref, data]);

  return (
    <div className="w-full bg-background">
      {/* Header */}
      <div className="px-4 py-6 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Your Trip: <span className="text-primary">{tripData?.origin}</span> → <span className="text-primary">{tripData?.destination}</span>
        </h2>

        {/* Trip meta */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-primary" aria-hidden="true" />
            <span className="text-foreground">{tripData.duration}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Wallet2 className="h-4 w-4 text-success" aria-hidden="true" />
            <span className="text-foreground">{tripData.budget}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-warning" aria-hidden="true" />
            <span className="text-foreground">{tripData.group_size}</span>
          </div>
        </div>
      </div>

      {/* Timeline content */}
      <div ref={ref} className="relative px-4 py-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="relative pl-8 pb-8 last:pb-0"
          >
            {/* Timeline marker */}
            <div className="absolute left-0 top-0 flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-primary border-2 border-background" />
              {index !== data.length - 1 && (
                <div className="w-px flex-1 bg-border mt-1" />
              )}
            </div>

            {/* Content */}
            <div className="ml-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                {item.title}
              </h3>
              <div>{item.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};