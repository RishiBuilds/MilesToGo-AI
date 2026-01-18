"use client";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Send, Mic, MicOff, Loader2 } from "lucide-react";
import React, { useEffect, useState, useCallback, useRef } from "react";
import EmptyBoxState from "./EmptyBoxState";
import GroupSizeUi from "./GroupSizeUi";
import BudgetUi from "./BudgetUi";
import SelectDaysUi from "./SelectDaysUi";
import FinalUi from "./FinalUi";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useTripDetail, useUserDetail } from "@/app/provider";
import { useMap } from "@/context/MapContext";
import { useVoiceInput } from "@/hooks/useVoiceInput";
import { v4 as uuidv4 } from 'uuid'

type Message = {
  role: string;
  content: string;
  ui?: string;
};

export type TripInfo = {
  budget: string,
  destination: string,
  duration: string,
  group_size: string,
  origin: string,
  hotels: Hotel[],
  itinerary: Itinerary[]
}


export type Hotel = {
  hotel_name: string;
  hotel_address: string;
  price_per_night: string;
  hotel_image_url: string;
  geo_coordinates: {
    latitude: number;
    longitude: number;
  };
  rating: number;
  description: string;
}

export type Activity = {
  place_name: string;
  place_details: string;
  place_image_url: string;
  geo_coordinates: {
    latitude: number;
    longitude: number;
  };
  place_address: string;
  ticket_pricing: string;
  time_travel_each_location: string;
  best_time_to_visit: string;
};

export type Itinerary = {
  day: number;
  day_plan: string;
  best_time_to_visit_day: string;
  activities: Activity[];
};

// Common destination coordinates for quick focus
const DESTINATION_COORDS: Record<string, { lat: number; lng: number }> = {
  "paris": { lat: 48.8566, lng: 2.3522 },
  "london": { lat: 51.5074, lng: -0.1278 },
  "new york": { lat: 40.7128, lng: -74.0060 },
  "tokyo": { lat: 35.6762, lng: 139.6503 },
  "dubai": { lat: 25.2048, lng: 55.2708 },
  "singapore": { lat: 1.3521, lng: 103.8198 },
  "rome": { lat: 41.9028, lng: 12.4964 },
  "barcelona": { lat: 41.3851, lng: 2.1734 },
  "los angeles": { lat: 34.0522, lng: -118.2437 },
  "bangkok": { lat: 13.7563, lng: 100.5018 },
  "sydney": { lat: -33.8688, lng: 151.2093 },
  "mumbai": { lat: 19.0760, lng: 72.8777 },
  "delhi": { lat: 28.6139, lng: 77.2090 },
  "bali": { lat: -8.4095, lng: 115.1889 },
  "maldives": { lat: 3.2028, lng: 73.2207 },
  "switzerland": { lat: 46.8182, lng: 8.2275 },
  "amsterdam": { lat: 52.3676, lng: 4.9041 },
  "istanbul": { lat: 41.0082, lng: 28.9784 },
  "cairo": { lat: 30.0444, lng: 31.2357 },
  "cape town": { lat: -33.9249, lng: 18.4241 },
  "rio de janeiro": { lat: -22.9068, lng: -43.1729 },
  "hawaii": { lat: 19.8968, lng: -155.5828 },
  "las vegas": { lat: 36.1699, lng: -115.1398 },
  "santorini": { lat: 36.3932, lng: 25.4615 },
  "prague": { lat: 50.0755, lng: 14.4378 },
  "vienna": { lat: 48.2082, lng: 16.3738 },
  "berlin": { lat: 52.5200, lng: 13.4050 },
  "madrid": { lat: 40.4168, lng: -3.7038 },
  "lisbon": { lat: 38.7223, lng: -9.1393 },
  "athens": { lat: 37.9838, lng: 23.7275 },
};

const ChatBox = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [isFinal, setIsFinal] = useState(false);
  const [tripDetail, setTripDetail] = useState<TripInfo>()
  const [lastDetectedDestination, setLastDetectedDestination] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const SaveTripDetail = useMutation(api.tripDetail.CreateTripDetail)
  const { userDetail } = useUserDetail()
  // @ts-ignore
  const { tripDetailInfo, setTripDetailInfo } = useTripDetail()

  // Map context integration
  const { focusOnDestination, addMarker, clearMarkers } = useMap();

  // Voice input integration
  const {
    isListening,
    transcript,
    interimTranscript,
    error: voiceError,
    isSupported: isVoiceSupported,
    toggleListening,
  } = useVoiceInput({
    onTranscript: (text) => {
      setUserInput((prev) => (prev ? prev + " " + text : text));
    },
  });

  // Combine user input with interim voice transcript for display
  const displayValue = isListening && interimTranscript
    ? (userInput || "") + (userInput ? " " : "") + interimTranscript
    : userInput || "";

  // Auto-scroll to bottom when messages change
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  // Function to detect and focus on destination from user input
  const detectAndFocusDestination = useCallback((text: string) => {
    const lowerText = text.toLowerCase();

    for (const [city, coords] of Object.entries(DESTINATION_COORDS)) {
      if (lowerText.includes(city) && city !== lastDetectedDestination) {
        setLastDetectedDestination(city);
        focusOnDestination(coords.lat, coords.lng, city.charAt(0).toUpperCase() + city.slice(1));
        return true;
      }
    }
    return false;
  }, [focusOnDestination, lastDetectedDestination]);

  // Function to populate map with trip data
  const populateMapWithTripData = useCallback((trip: TripInfo) => {
    clearMarkers();

    trip.hotels?.forEach((hotel, index) => {
      if (hotel.geo_coordinates?.latitude && hotel.geo_coordinates?.longitude) {
        addMarker({
          id: `hotel-${index}`,
          lat: hotel.geo_coordinates.latitude,
          lng: hotel.geo_coordinates.longitude,
          label: hotel.hotel_name,
          type: "hotel",
        });
      }
    });

    trip.itinerary?.forEach((day) => {
      day.activities?.forEach((activity, index) => {
        if (activity.geo_coordinates?.latitude && activity.geo_coordinates?.longitude) {
          addMarker({
            id: `activity-${day.day}-${index}`,
            lat: activity.geo_coordinates.latitude,
            lng: activity.geo_coordinates.longitude,
            label: activity.place_name,
            type: "activity",
          });
        }
      });
    });
  }, [addMarker, clearMarkers]);

  const onSend = async () => {
    if (!userInput?.trim()) return;
    setLoading(true);

    detectAndFocusDestination(userInput);

    setUserInput("");
    const newMsg: Message = {
      role: "user",
      content: userInput ?? '',
    };
    setMessages((prev: Message[]) => [...prev, newMsg]);

    const result = await axios.post("/api/aimodel", {
      messages: [...messages, newMsg],
      isFinal: isFinal
    });

    console.log("Trip: ", result.data);


    !isFinal && setMessages((prev: Message[]) => [
      ...prev,
      {
        role: "assistant",
        content: result?.data?.resp,
        ui: result?.data?.ui,
      },
    ]);

    if (isFinal) {
      const tripPlan = result?.data?.trip_plan;
      setTripDetail(tripPlan);
      setTripDetailInfo(tripPlan);

      if (tripPlan) {
        populateMapWithTripData(tripPlan);
      }

      const tripId = uuidv4()
      await SaveTripDetail({
        tripDetail: tripPlan,
        tripId: tripId,
        uid: userDetail?._id
      })
    }
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const RenderGenerativeUi = (ui: string) => {
    if (ui == "budget") {
      return (
        <BudgetUi
          onSelectedOption={(v: string) => {
            setUserInput(v);
            onSend();
          }}
        />
      );
    } else if (ui == "groupSize") {
      return (
        <GroupSizeUi
          onSelectedOption={(v: string) => {
            setUserInput(v);
            onSend();
          }}
        />
      );
    } else if (ui === "tripDuration") {
      return (
        <SelectDaysUi
          onSelectedOption={(v: string) => {
            setUserInput(v);
            onSend();
          }}
        />
      );
    } else if (ui === "final") {
      return <FinalUi viewTrip={() => console.log()}
        disable={!tripDetail}
      />;
    }
    return null;
  };

  useEffect(() => {
    const lastMsg = messages[messages.length - 1]
    if (lastMsg?.ui == 'final') {
      setIsFinal(true)
      setUserInput("Ok, Great!")
    }
  }, [messages])

  useEffect(() => {
    if (isFinal && userInput) {
      onSend()
    }
  }, [isFinal])

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Empty state */}
      {messages.length === 0 && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <EmptyBoxState
            onSelectOption={(v: string) => {
              setUserInput(v);
              onSend();
            }}
          />
        </div>
      )}

      {/* Messages area - flat panels with borders, no bubbles */}
      {messages.length > 0 && (
        <section className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="divide-y divide-border">
            {messages.map((msg: Message, index) => (
              <div
                key={index}
                className={`chat-message ${msg.role === "user" ? "chat-message-user" : "chat-message-assistant"
                  }`}
              >
                {/* Role indicator */}
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {msg.role === "user" ? "You" : "Assistant"}
                  </span>
                </div>

                {/* Message content */}
                <div className="text-sm text-foreground leading-relaxed">
                  {msg.content}
                </div>

                {/* Generative UI */}
                {msg.ui && (
                  <div className="mt-3">
                    {RenderGenerativeUi(msg.ui)}
                  </div>
                )}
              </div>
            ))}

            {/* Loading state - subtle */}
            {loading && (
              <div className="chat-message chat-message-assistant">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Assistant
                  </span>
                </div>
                <div className="loading-dots py-2">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </section>
      )}

      {/* Input bar - minimal, keyboard-first, sticky at bottom */}
      <section className="border-t border-border bg-card p-3 sm:p-4">
        {/* Voice listening indicator */}
        {isListening && (
          <div className="flex items-center gap-2 mb-2 px-2 py-1 rounded bg-primary/10 border border-primary/20 w-fit">
            <span className="status-dot status-dot-pending" />
            <span className="text-xs font-medium text-primary">Listening...</span>
          </div>
        )}

        {/* Voice error message */}
        {voiceError && (
          <div className="flex items-center gap-2 mb-2 px-2 py-1 rounded bg-danger-muted border border-danger/20 w-fit">
            <span className="text-xs text-danger">{voiceError}</span>
          </div>
        )}

        <div className="input-bar flex items-end gap-2 p-2">
          <Textarea
            placeholder={isListening ? "Speak now..." : "Message AI assistant..."}
            className="flex-1 min-h-[40px] max-h-[120px] bg-transparent border-none resize-none text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
            onChange={(event) => setUserInput(event.target.value)}
            onKeyDown={handleKeyDown}
            value={displayValue}
            rows={1}
            aria-label="Message input"
          />

          {/* Action icons */}
          <div className="flex items-center gap-1">
            {/* Microphone button - icon only */}
            {isVoiceSupported && (
              <button
                type="button"
                onClick={toggleListening}
                aria-label={isListening ? "Stop voice input" : "Start voice input"}
                aria-pressed={isListening}
                className={`action-icon ${isListening ? "!bg-primary !text-primary-foreground" : ""}`}
              >
                {isListening ? (
                  <MicOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Mic className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            )}

            {/* Send button - icon only */}
            <button
              type="button"
              onClick={() => onSend()}
              disabled={loading || !userInput?.trim()}
              aria-label="Send message"
              className="action-icon !bg-primary !text-primary-foreground hover:!bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <Send className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Keyboard hint */}
        <div className="mt-2 px-2">
          <span className="text-xs text-muted-foreground">
            Press <kbd className="px-1 py-0.5 rounded bg-accent text-foreground font-mono text-[10px]">Enter</kbd> to send, <kbd className="px-1 py-0.5 rounded bg-accent text-foreground font-mono text-[10px]">Shift+Enter</kbd> for new line
          </span>
        </div>
      </section>
    </div>
  );
};

export default ChatBox;
