"use client";
import React, { useEffect, useState } from "react";
import { Timeline } from "@/components/ui/timeline";
import Image from "next/image";
import { ArrowLeft, MapPin, Sparkles } from "lucide-react";
import HotelCardItem from "./HotelCardItem";
import PlaceCardItem from "./PlaceCardItem";
import { useTripDetail } from "@/app/provider";
import { TripInfo } from "./ChatBox";
import { motion } from "motion/react";

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tripData.hotels?.map((hotel) => (
              <HotelCardItem key={hotel.hotel_name} hotel={hotel} />
            ))}
          </div>
        ),
      },
      ...(tripData.itinerary?.map((dayData) => ({
        title: `Day ${dayData.day}`,
        content: (
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Sparkles className="h-3.5 w-3.5" />
              Best time: {dayData.best_time_to_visit_day}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
    <div className="relative w-full h-[85vh] overflow-auto rounded-2xl border border-border bg-card/30 backdrop-blur-sm">
      {tripData ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Timeline data={data} tripData={tripData} />
        </motion.div>
      ) : (
        <div className="relative w-full h-full overflow-hidden rounded-2xl">
          {/* Background Image with Overlay */}
          <Image
            src="/travel.jpg"
            alt="Travel inspiration"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/20" />

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-end p-8 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center max-w-lg"
            >
              <motion.div
                animate={{ x: [-5, 5, -5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
              >
                <ArrowLeft className="h-5 w-5 text-primary" />
                <span className="text-white/90 text-sm font-medium">Chat with AI</span>
              </motion.div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                Getting to know you to build your{" "}
                <span className="linear-text">perfect trip</span>
              </h2>

              <p className="mt-4 text-white/70 text-sm md:text-base">
                Share your preferences with our AI assistant and watch your dream itinerary come to life
              </p>

              <div className="mt-6 flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="w-2 h-2 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: "0.2s" }} />
                <span className="w-2 h-2 rounded-full bg-primary/30 animate-pulse" style={{ animationDelay: "0.4s" }} />
              </div>
            </motion.div>
          </div>

          {/* Floating Cards Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute top-8 right-8 hidden lg:block"
          >
            <div className="flex gap-4">
              {[
                { icon: MapPin, label: "Hotels", count: "3+" },
                { icon: Sparkles, label: "Activities", count: "10+" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  className="px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white"
                >
                  <item.icon className="h-5 w-5 text-primary mb-1" />
                  <p className="text-xs opacity-70">{item.label}</p>
                  <p className="font-semibold">{item.count}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Itinerary;