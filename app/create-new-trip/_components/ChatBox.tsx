"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Ellipsis, Send, Mic, MicOff } from "lucide-react";
import React, { useEffect, useState, useCallback } from "react";
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

  const SaveTripDetail = useMutation(api.tripDetail.CreateTripDetail)
  const { userDetail, setUserDetail } = useUserDetail()
  // @ts-ignore
  const { tripDetailInfo, setTripDetailInfo } = useTripDetail()

  // Map context integration
  const { focusOnDestination, addMarker, clearMarkers, setMarkers } = useMap();

  // Voice input integration
  const {
    isListening,
    transcript,
    interimTranscript,
    error: voiceError,
    isSupported: isVoiceSupported,
    toggleListening,
    clearTranscript,
  } = useVoiceInput({
    onTranscript: (text) => {
      // When voice transcription completes, set it as user input
      setUserInput((prev) => (prev ? prev + " " + text : text));
    },
  });

  // Combine user input with interim voice transcript for display
  const displayValue = isListening && interimTranscript
    ? (userInput || "") + (userInput ? " " : "") + interimTranscript
    : userInput || "";

  // Function to detect and focus on destination from user input
  const detectAndFocusDestination = useCallback((text: string) => {
    const lowerText = text.toLowerCase();

    // Check for known destinations
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

    // Add hotel markers
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

    // Add activity markers
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

    // Detect destination from user input and focus globe
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

      // Populate map with trip data
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

  const RenderGenerativeUi = (ui: string) => {
    if (ui == "budget") {
      // render budget ui compoenet
      return (
        <BudgetUi
          onSelectedOption={(v: string) => {
            setUserInput(v);
            onSend();
          }}
        />
      );
    } else if (ui == "groupSize") {
      // render group size ui component
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
    <div className="h-[85vh] flex flex-col border shadow-xl hover:shadow-primary rounded-2xl p-3 sm:p-5">
      {messages.length == 0 && (
        <EmptyBoxState
          onSelectOption={(v: string) => {
            setUserInput(v);
            onSend();
          }}
        />
      )}

      {/* display message */}
      <section className="flex-1 overflow-y-auto p-2 sm:p-4">
        {messages.map((msg: Message, index) =>
          msg.role == "user" ? (
            <div className="flex justify-end mt-2" key={index}>
              <div className="max-w-[85%] sm:max-w-md md:max-w-lg bg-primary text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base">
                {msg.content}
              </div>
            </div>
          ) : (
            <div className="flex justify-start mt-2" key={index}>
              <div className="max-w-[85%] sm:max-w-md md:max-w-lg bg-gray-300 text-black px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base">
                {msg.content}
                {RenderGenerativeUi(msg.ui ?? "")}
              </div>
            </div>
          )
        )}

        {loading && (
          <div className="flex justify-start mt-2">
            <div className="max-w-[85%] sm:max-w-md md:max-w-lg bg-transparent text-black px-3 sm:px-4 py-2 rounded-lg">
              <Ellipsis className="animate-bounce " />
            </div>
          </div>
        )}
      </section>

      {/* user input */}
      <section>
        <div className="border rounded-2xl p-3 sm:p-4 relative w-full">
          {/* Voice listening indicator */}
          {isListening && (
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-medium text-primary">Listening...</span>
              <div className="flex items-center gap-0.5">
                {[...Array(4)].map((_, i) => (
                  <span
                    key={i}
                    className="w-0.5 bg-primary rounded-full animate-pulse"
                    style={{
                      height: `${8 + Math.sin(i) * 4}px`,
                      animationDelay: `${i * 100}ms`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Voice error message */}
          {voiceError && (
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-destructive/90 text-destructive-foreground text-xs">
              {voiceError}
            </div>
          )}

          <Textarea
            placeholder={isListening ? "Listening... speak now" : "Start Conversation with AI To 'Create New Trip'"}
            className="w-full min-h-60px sm:min-h-80px md:min-h-100px bg-transparent border-none focus-visible:ring-0 shadow-none resize-y text-sm sm:text-base pr-24"
            onChange={(event) => setUserInput(event.target.value)}
            value={displayValue}
          />

          {/* Action buttons */}
          <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex items-center gap-2">
            {/* Microphone button */}
            {isVoiceSupported && (
              <Button
                type="button"
                size="icon"
                variant={isListening ? "default" : "ghost"}
                onClick={toggleListening}
                aria-label={isListening ? "Stop voice input" : "Start voice input"}
                aria-pressed={isListening}
                className={`relative cursor-pointer transition-all duration-200 ${isListening ? "bg-primary text-primary-foreground" : "hover:bg-primary/10"
                  }`}
              >
                {isListening ? (
                  <MicOff className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <Mic className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
                {isListening && (
                  <span className="absolute inset-0 rounded-md animate-ping bg-primary/30" />
                )}
              </Button>
            )}

            {/* Send button */}
            <Button
              size="icon"
              className="cursor-pointer"
              onClick={() => onSend()}
              disabled={loading}
            >
              <Send className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>

  );
};

export default ChatBox;
