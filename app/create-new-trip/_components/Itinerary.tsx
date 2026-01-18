"use client";
import React, { useEffect, useState } from "react";
import { Timeline } from "@/components/ui/timeline";
import Image from "next/image";
import { ArrowLeft, MapPin, Sparkles, Clock } from "lucide-react";
import HotelCardItem from "./HotelCardItem";
import PlaceCardItem from "./PlaceCardItem";
import { useTripDetail } from "@/app/provider";
import { TripInfo } from "./ChatBox";

function Itinerary() {
  const tripContext = useTripDetail();
  const tripDetailInfo = tripContext?.tripDetailInfo;
  const [tripData, setTripData] = useState<TripInfo | null>(null);

  useEffect(() => {
    if (tripDetailInfo) {
      setTripData(tripDetailInfo);
    }
  }, [tripDetailInfo]);

  const data = tripData
    ? [
      {
        title: "Hotels",
        content: (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {tripData.hotels?.map((hotel) => (
              <HotelCardItem key={hotel.hotel_name} hotel={hotel} />
            ))}
          </div>
        ),
      },
      ...(tripData.itinerary?.map((dayData) => ({
        title: `Day ${dayData.day}`,
        content: (
          <div className="space-y-3">
            <div className="badge badge-primary">
              <Clock className="h-3 w-3 mr-1" aria-hidden="true" />
              {dayData.best_time_to_visit_day}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {dayData.activities?.map((activity) => (
                <PlaceCardItem key={activity.place_name} activity={activity} />
              ))}
            </div>
          </div>
        ),
      })) || []),
    ]
    : [];

  return (
    <div className="h-full overflow-auto bg-background">
      {tripData ? (
        <div className="animate-fade-in">
          <Timeline data={data} tripData={tripData} />
        </div>
      ) : (
        <div className="relative w-full h-full overflow-hidden">
          {/* Background Image with Overlay */}
          <Image
            src="/travel.jpg"
            alt="Travel inspiration"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-end p-6 pb-12">
            <div className="text-center max-w-md animate-slide-up">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-md bg-card border border-border">
                <ArrowLeft className="h-4 w-4 text-primary" aria-hidden="true" />
                <span className="text-foreground text-xs font-medium">Chat with AI</span>
              </div>

              <h2 className="text-xl md:text-2xl font-semibold text-foreground leading-tight">
                Getting to know you to build your{" "}
                <span className="text-primary">perfect trip</span>
              </h2>

              <p className="mt-3 text-muted-foreground text-sm">
                Share your preferences with our AI assistant and watch your dream itinerary come to life
              </p>

              {/* Loading indicator */}
              <div className="loading-dots mt-5">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>

          {/* Stats preview - subtle */}
          <div className="absolute top-4 right-4 hidden lg:flex gap-2">
            {[
              { icon: MapPin, label: "Hotels", count: "3+" },
              { icon: Sparkles, label: "Activities", count: "10+" },
            ].map((item) => (
              <div
                key={item.label}
                className="panel px-3 py-2"
              >
                <item.icon className="h-4 w-4 text-primary mb-1" aria-hidden="true" />
                <p className="text-[10px] text-muted-foreground">{item.label}</p>
                <p className="text-sm font-medium text-foreground">{item.count}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Itinerary;