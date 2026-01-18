'use client';
import { Star, Wallet2, MapPin, ExternalLink, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Hotel } from "./ChatBox";
import axios from "axios";

type Props = {
  hotel: Hotel;
};

function HotelCardItem({ hotel }: Props) {
  const [photoUrl, setPhotoUrl] = useState<string>("/placeholder.png");
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchPhoto = async () => {
      if (!hotel?.hotel_name) return;

      try {
        setIsLoading(true);
        const result = await axios.post('/api/google-place-detail', {
          placeName: hotel.hotel_name
        });

        if (result.data && typeof result.data === 'string' && result.data.startsWith('http')) {
          setPhotoUrl(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch hotel image:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhoto();
  }, [hotel?.hotel_name]);

  const handleImageError = () => {
    setImageError(true);
    setPhotoUrl("/placeholder.jpg");
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
          src={imageError ? "/placeholder.jpg" : photoUrl}
          alt={hotel?.hotel_name || "Hotel"}
          className={`object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onLoad={() => setIsLoading(false)}
          onError={handleImageError}
        />

        {/* Rating Badge */}
        <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded bg-card/90 border border-border text-xs font-medium text-foreground">
          <Star className="h-3 w-3 fill-warning text-warning" aria-hidden="true" />
          {hotel.rating}
        </div>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col gap-2 flex-1 border-t border-border">
        <h3 className="font-medium text-sm text-foreground line-clamp-1">
          {hotel.hotel_name}
        </h3>

        <p className="flex items-start gap-1 text-muted-foreground text-xs line-clamp-2">
          <MapPin className="h-3 w-3 shrink-0 mt-0.5" aria-hidden="true" />
          {hotel.hotel_address}
        </p>

        {/* Price and action */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-border">
          <div className="flex items-center gap-1 text-success font-medium text-sm">
            <Wallet2 className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{hotel.price_per_night}</span>
            <span className="text-[10px] text-muted-foreground font-normal">/night</span>
          </div>

          <Link
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.hotel_name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="action-icon !p-1.5"
            aria-label={`View ${hotel.hotel_name} on Google Maps`}
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HotelCardItem;