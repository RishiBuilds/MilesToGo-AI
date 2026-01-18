'use client';
import { Clock, ExternalLink, Ticket, MapPin, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Activity } from "./ChatBox";
import axios from "axios";

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
    <div className="card-interactive flex flex-col overflow-hidden h-full animate-fade-in">
      {/* Image Container */}
      <div className="relative w-full h-36 overflow-hidden bg-card">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-5 w-5 text-primary animate-spin" aria-hidden="true" />
          </div>
        )}
        <Image
          src={imageError ? "/placeholder.png" : photoUrl}
          alt={activity?.place_name || "Activity"}
          className={`object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onLoad={() => setIsLoading(false)}
          onError={handleImageError}
        />

        {/* Best Time Badge */}
        <div className="absolute top-2 left-2 badge badge-primary">
          <Clock className="h-3 w-3 mr-1" aria-hidden="true" />
          {activity.best_time_to_visit}
        </div>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col gap-2 flex-1 border-t border-border">
        <h3 className="font-medium text-sm text-foreground line-clamp-1">
          {activity.place_name}
        </h3>

        <p className="text-muted-foreground text-xs line-clamp-2 leading-relaxed">
          {activity.place_details}
        </p>

        {/* Info Tags */}
        <div className="flex flex-wrap gap-1.5 mt-1">
          <span className="badge badge-primary">
            <Ticket className="h-3 w-3 mr-1" aria-hidden="true" />
            {activity.ticket_pricing}
          </span>
          <span className="badge badge-warning">
            <MapPin className="h-3 w-3 mr-1" aria-hidden="true" />
            {activity.time_travel_each_location}
          </span>
        </div>

        {/* View Button */}
        <div className="mt-auto pt-2 border-t border-border">
          <Link
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity?.place_name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 w-full py-1.5 rounded-md text-xs font-medium text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
            aria-label={`Explore ${activity.place_name} on Google Maps`}
          >
            Explore Location
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PlaceCardItem;