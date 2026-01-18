"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Play, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type AnimationStyle =
  | "from-bottom"
  | "from-center"
  | "from-top"
  | "from-left"
  | "from-right"
  | "fade"
  | "top-in-bottom-out"
  | "left-in-right-out";

interface HeroVideoProps {
  animationStyle?: AnimationStyle;
  videoSrc: string;
  thumbnailSrc: string;
  thumbnailAlt?: string;
  className?: string;
}

const animationVariants = {
  "from-bottom": {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "from-center": {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 },
  },
  "from-top": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
  },
  "from-left": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  },
  "from-right": {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  "top-in-bottom-out": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "left-in-right-out": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
};

export default function HeroVideoDialog({
  animationStyle = "from-center",
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
  className,
}: HeroVideoProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const selectedAnimation = animationVariants[animationStyle];

  const handleClose = useCallback(() => {
    setIsVideoOpen(false);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        handleClose();
      }
    },
    [handleClose]
  );

  return (
    <div className={cn("relative", className)}>
      {/* Thumbnail Button */}
      <button
        type="button"
        aria-label="Play video"
        className="group relative w-full cursor-pointer border-0 bg-transparent p-0 rounded-2xl overflow-hidden shadow-2xl"
        onClick={() => setIsVideoOpen(true)}
      >
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
          {isImageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <div className="w-10 h-10 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          )}
          <Image
            src={thumbnailSrc}
            alt={thumbnailAlt}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className={cn(
              "object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-90",
              isImageLoading ? "opacity-0" : "opacity-100"
            )}
            onLoad={() => setIsImageLoading(false)}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
        </div>

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl scale-150" />
            <div className="relative flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-linear-to-br from-primary to-purple-600 shadow-lg shadow-primary/30 transition-transform duration-300 group-hover:scale-110">
              <Play className="h-6 w-6 md:h-8 md:w-8 fill-white text-white ml-1" />
            </div>
          </motion.div>
        </div>
      </button>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onClick={handleClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          >
            <motion.div
              {...selectedAnimation}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute -top-12 right-0 flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                aria-label="Close video"
              >
                <span className="text-sm">Close</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                  <X className="h-4 w-4" />
                </div>
              </button>

              {/* Video Container */}
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                <iframe
                  src={videoSrc}
                  title="Video player"
                  className="absolute inset-0 h-full w-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}