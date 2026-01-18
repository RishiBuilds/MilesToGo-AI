'use client';
import { Button } from "@/components/ui/button";
import HeroVideoDialog from "@/components/magic ui/hero-video-dialog";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { ArrowDown, Globe2, Plane, Sparkles, MapPin, Compass } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { motion } from "motion/react";

export const suggestions = [
  {
    title: "Create New Trip",
    icon: <Globe2 className="h-5 w-5" />,
    gradient: "from-[oklch(0.58_0.22_335)] to-[oklch(0.52_0.2_350)]",
    hoverGradient: "group-hover:from-[oklch(0.54_0.22_335)] group-hover:to-[oklch(0.48_0.2_350)]",
  },
  {
    title: "Inspire me where to go",
    icon: <Compass className="h-5 w-5" />,
    gradient: "from-emerald-500 to-teal-600",
    hoverGradient: "group-hover:from-emerald-600 group-hover:to-teal-700",
  },
  {
    title: "Discover Hidden gems",
    icon: <MapPin className="h-5 w-5" />,
    gradient: "from-orange-500 to-amber-600",
    hoverGradient: "group-hover:from-orange-600 group-hover:to-amber-700",
  },
  {
    title: "Adventure Destination",
    icon: <Plane className="h-5 w-5" />,
    gradient: "from-rose-500 to-pink-600",
    hoverGradient: "group-hover:from-rose-600 group-hover:to-pink-700",
  },
];

function Hero() {
  const { user } = useUser();
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const onSend = () => {
    if (!user) {
      router.push('/sign-in');
      return;
    }
    router.push('/create-new-trip');
  };

  return (
    <div className="min-h-screen hero-gradient pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center space-y-6"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium"
          >
            <Sparkles className="h-4 w-4" />
            AI-Powered Travel Planning
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            Hey, I'm your personal{" "}
            <span className="gradient-text">Trip Planner</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Tell me what you want, and I'll handle the rest: Flights, Hotels, Trip
            Planner — all in seconds
          </motion.p>

          {/* Input Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8"
          >
            <div
              className={`relative rounded-2xl border-2 transition-all duration-300 ${isFocused
                ? 'border-primary shadow-lg shadow-primary/20'
                : 'border-border hover:border-primary/50'
                } bg-card/80 backdrop-blur-sm p-4`}
            >
              <Textarea
                placeholder="e.g., Create a trip for Paris from New York for 5 days..."
                className="w-full min-h-100px bg-transparent border-none focus-visible:ring-0 shadow-none resize-none text-base"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              <div className="flex justify-between items-center mt-3">
                <p className="text-xs text-muted-foreground hidden sm:block">
                  Press Enter or click Send to start planning
                </p>
                <Button
                  size="default"
                  variant="ghost"
                  className="gap-2"
                  onClick={onSend}
                >
                  <Sparkles className="h-4 w-4" />
                  Start Planning
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Suggestion Chips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mt-6"
          >
            {suggestions.map((suggestion, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={onSend}
                className={`group flex items-center gap-2 px-4 py-2.5 rounded-full border border-border bg-card/60 backdrop-blur-sm hover:border-transparent transition-all duration-300 card-hover`}
              >
                <span className={`p-1.5 rounded-full bg-linear-to-br ${suggestion.gradient} ${suggestion.hoverGradient} text-white transition-all duration-300`}>
                  {suggestion.icon}
                </span>
                <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                  {suggestion.title}
                </span>
              </motion.button>
            ))}
          </motion.div>

          {/* See How It Works */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex items-center justify-center flex-col mt-12"
          >
            <p className="text-muted-foreground flex items-center gap-2">
              Not sure where to start?{" "}
              <span className="font-semibold text-foreground">See how it works</span>
              <motion.span
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown className="h-5 w-5 text-primary" />
              </motion.span>
            </p>
          </motion.div>

          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-8"
          >
            <HeroVideoDialog
              className="rounded-2xl overflow-hidden shadow-2xl"
              animationStyle="from-center"
              videoSrc="https://www.youtube.com/embed/dQw4w9WgXcQ"
              thumbnailSrc="https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=2531&auto=format&fit=crop"
              thumbnailAlt="Watch how MilesToGo AI works"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Hero;
