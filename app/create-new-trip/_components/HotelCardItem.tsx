'use client';
import { Button } from "@/components/ui/button";
import { Star, Wallet2, MapPin, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Hotel } from "./ChatBox";
import axios from "axios";
import { motion } from "motion/react";

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
          src={imageError ? "/placeholder.jpg" : photoUrl}
          alt={hotel?.hotel_name || "Hotel"}
          className={`object-cover transition-all duration-500 group-hover:scale-110 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onLoad={() => setIsLoading(false)}
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-sm font-medium">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          {hotel.rating}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <h3 className="font-semibold text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {hotel.hotel_name}
        </h3>

        <p className="flex items-start gap-1.5 text-muted-foreground text-sm line-clamp-2">
          <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
          {hotel.hotel_address}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
            <Wallet2 className="h-4 w-4" />
            <span>{hotel.price_per_night}</span>
            <span className="text-xs text-muted-foreground font-normal">/night</span>
          </div>

          <Link
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.hotel_name)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5 border-primary/30 text-primary hover:bg-primary hover:text-white transition-all"
            >
              View
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default HotelCardItem;