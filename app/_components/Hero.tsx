'use client';
import { Button } from "@/components/ui/button";
import HeroVideoDialog from "@/components/magic ui/hero-video-dialog";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { ArrowDown, Globe2, Plane, Sparkles, MapPin, Compass } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const suggestions = [
  {
    title: "Create New Trip",
    icon: <Globe2 className="h-4 w-4" />,
  },
  {
    title: "Inspire me where to go",
    icon: <Compass className="h-4 w-4" />,
  },
  {
    title: "Discover Hidden gems",
    icon: <MapPin className="h-4 w-4" />,
  },
  {
    title: "Adventure Destination",
    icon: <Plane className="h-4 w-4" />,
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Hero Content */}
        <div className="text-center space-y-6 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            AI-Powered Travel Planning
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground">
            Hey, I'm your personal{" "}
            <span className="text-primary">Trip Planner</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
            Tell me what you want, and I'll handle the rest: Flights, Hotels, Trip
            Planner — all in seconds
          </p>

          {/* Input Box */}
          <div className="mt-8">
            <div
              className={`input-bar relative p-3 ${isFocused ? 'border-primary' : ''
                }`}
            >
              <Textarea
                placeholder="e.g., Create a trip for Paris from New York for 5 days..."
                className="w-full min-h-[80px] bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 resize-none text-sm text-foreground placeholder:text-muted-foreground"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={handleKeyDown}
                aria-label="Trip description"
              />
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-border">
                <span className="text-xs text-muted-foreground hidden sm:block">
                  Press <kbd className="px-1 py-0.5 rounded bg-accent text-foreground font-mono text-[10px]">Enter</kbd> to send
                </span>
                <Button
                  size="sm"
                  onClick={onSend}
                  className="gap-1.5"
                >
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  Start Planning
                </Button>
              </div>
            </div>
          </div>

          {/* Suggestion Chips */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={onSend}
                className="card-interactive flex items-center gap-2 px-3 py-2 group"
              >
                <span
                  className="text-muted-foreground group-hover:text-primary transition-colors"
                  aria-hidden="true"
                >
                  {suggestion.icon}
                </span>
                <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">
                  {suggestion.title}
                </span>
              </button>
            ))}
          </div>

          {/* See How It Works */}
          <div className="flex items-center justify-center flex-col mt-12">
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              Not sure where to start?{" "}
              <span className="font-medium text-foreground">See how it works</span>
              <ArrowDown className="h-4 w-4 text-primary" aria-hidden="true" />
            </p>
          </div>

          {/* Video Section */}
          <div className="mt-6">
            <HeroVideoDialog
              className="rounded-lg overflow-hidden border border-border"
              animationStyle="from-center"
              videoSrc="https://www.youtube.com/embed/dQw4w9WgXcQ"
              thumbnailSrc="https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=2531&auto=format&fit=crop"
              thumbnailAlt="Watch how Miles2Go AI works"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
