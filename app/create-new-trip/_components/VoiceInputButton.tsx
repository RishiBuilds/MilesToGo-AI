"use client";

import React from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VoiceInputState } from "@/hooks/useVoiceInput";

interface VoiceInputButtonProps {
    isListening: boolean;
    state: VoiceInputState;
    isSupported: boolean;
    error: string | null;
    onToggle: () => void;
    className?: string;
}

export function VoiceInputButton({
    isListening,
    state,
    isSupported,
    error,
    onToggle,
    className,
}: VoiceInputButtonProps) {
    if (!isSupported) {
        return null; // Don't render if not supported
    }

    const getAriaLabel = () => {
        if (state === "listening") return "Stop voice input";
        if (state === "processing") return "Processing voice input";
        if (state === "error") return "Voice input error, click to retry";
        return "Start voice input";
    };

    const getIcon = () => {
        if (state === "processing") {
            return <Loader2 className="h-4 w-4 animate-spin" />;
        }
        if (state === "error") {
            return <MicOff className="h-4 w-4" />;
        }
        return <Mic className="h-4 w-4" />;
    };

    return (
        <div className={cn("relative", className)}>
            <Button
                type="button"
                size="icon"
                variant={isListening ? "default" : "ghost"}
                onClick={onToggle}
                aria-label={getAriaLabel()}
                aria-pressed={isListening}
                className={cn(
                    "relative transition-all duration-200 cursor-pointer",
                    isListening && "bg-primary text-primary-foreground",
                    state === "error" && "text-destructive hover:text-destructive"
                )}
            >
                {getIcon()}

                {/* Pulsing ring animation when listening */}
                {isListening && (
                    <>
                        <span className="absolute inset-0 rounded-md animate-ping bg-primary/30" />
                        <span className="absolute inset-0 rounded-md animate-pulse bg-primary/20" />
                    </>
                )}
            </Button>

            {/* Listening indicator dots */}
            {isListening && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
            )}

            {/* Error tooltip */}
            {error && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 text-xs rounded-md bg-destructive/90 text-destructive-foreground backdrop-blur-sm">
                    {error}
                </div>
            )}
        </div>
    );
}

// Waveform visualization component for enhanced listening state
export function VoiceWaveform({ isActive }: { isActive: boolean }) {
    if (!isActive) return null;

    return (
        <div className="flex items-center justify-center gap-0.5 h-4">
            {[...Array(5)].map((_, i) => (
                <span
                    key={i}
                    className="w-0.5 bg-primary rounded-full animate-pulse"
                    style={{
                        height: `${Math.random() * 12 + 4}px`,
                        animationDelay: `${i * 100}ms`,
                        animationDuration: "0.5s",
                    }}
                />
            ))}
        </div>
    );
}

export default VoiceInputButton;
