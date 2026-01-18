'use client';
import { Button } from "@/components/ui/button";
import { Clock, ExternalLink, Ticket, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Activity } from "./ChatBox";
import axios from "axios";
import { motion } from "motion/react";

type Props = {
  activity: Activity;
};

function PlaceCardItem({ activity }: Props) {
  const [photoUrl, setPhotoUrl] = useState<string>("/placeholder.png");
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchPhoto = async () => {
      if (!activity?.place_name) return;

      try {
        setIsLoading(true);
        const result = await axios.post('/api/google-place-detail', {
          placeName: `${activity.place_name}:${activity.place_address}`
        });

        if (result.data && typeof result.data === 'string' && result.data.startsWith('http')) {
          setPhotoUrl(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch place image:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhoto();
  }, [activity?.place_name, activity?.place_address]);

  const handleImageError = () => {
    setImageError(true);
    setPhotoUrl("/placeholder.png");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden card-hover h-full"
    >
      {/* Image Container */}
      <div className="relative w-full h-48 overflow-hidden bg-muted">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        )}
        <Image
          src={imageError ? "/placeholder.png" : photoUrl}
          alt={activity?.place_name || "Activity"}
          className={`object-cover transition-all duration-500 group-hover:scale-110 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onLoad={() => setIsLoading(false)}
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Best Time Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/90 backdrop-blur-sm text-white text-xs font-medium">
          <Clock className="h-3 w-3" />
          {activity.best_time_to_visit}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="font-semibold text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {activity.place_name}
        </h3>

        <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
          {activity.place_details}
        </p>

        {/* Info Tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-medium">
            <Ticket className="h-3 w-3" />
            {activity.ticket_pricing}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-medium">
            <MapPin className="h-3 w-3" />
            {activity.time_travel_each_location}
          </span>
        </div>

        {/* View Button */}
        <div className="mt-auto pt-3">
          <Link
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity?.place_name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button
              size="sm"
              variant="outline"
              className="w-full gap-1.5 border-primary/30 text-primary hover:bg-primary hover:text-white transition-all"
            >
              Explore Location
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default PlaceCardItem;