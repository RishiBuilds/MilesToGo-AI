"use client";
import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type MapMarker = {
    id: string;
    lat: number;
    lng: number;
    label: string;
    type: "destination" | "hotel" | "activity" | "origin";
    color?: string;
};

export type MapFocus = {
    lat: number;
    lng: number;
    altitude?: number; // Globe altitude for zoom level
};

export type MapContextType = {
    markers: MapMarker[];
    setMarkers: React.Dispatch<React.SetStateAction<MapMarker[]>>;
    addMarker: (marker: MapMarker) => void;
    removeMarker: (id: string) => void;
    clearMarkers: () => void;
    focusLocation: MapFocus | null;
    setFocusLocation: (focus: MapFocus | null) => void;
    focusOnDestination: (lat: number, lng: number, label?: string) => void;
    isMapReady: boolean;
    setMapReady: (ready: boolean) => void;
};

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider = ({ children }: { children: ReactNode }) => {
    const [markers, setMarkers] = useState<MapMarker[]>([]);
    const [focusLocation, setFocusLocation] = useState<MapFocus | null>(null);
    const [isMapReady, setMapReady] = useState(false);

    const addMarker = useCallback((marker: MapMarker) => {
        setMarkers((prev) => {
            // Avoid duplicates by id
            const exists = prev.some((m) => m.id === marker.id);
            if (exists) {
                return prev.map((m) => (m.id === marker.id ? marker : m));
            }
            return [...prev, marker];
        });
    }, []);

    const removeMarker = useCallback((id: string) => {
        setMarkers((prev) => prev.filter((m) => m.id !== id));
    }, []);

    const clearMarkers = useCallback(() => {
        setMarkers([]);
    }, []);

    const focusOnDestination = useCallback((lat: number, lng: number, label?: string) => {
        // Set focus with smooth transition altitude
        setFocusLocation({ lat, lng, altitude: 1.5 });

        // If label provided, add a destination marker
        if (label) {
            addMarker({
                id: `destination-${lat}-${lng}`,
                lat,
                lng,
                label,
                type: "destination",
                color: "#ec4899", // Primary magenta color
            });
        }
    }, [addMarker]);

    return (
        <MapContext.Provider
            value={{
                markers,
                setMarkers,
                addMarker,
                removeMarker,
                clearMarkers,
                focusLocation,
                setFocusLocation,
                focusOnDestination,
                isMapReady,
                setMapReady,
            }}
        >
            {children}
        </MapContext.Provider>
    );
};

export const useMap = (): MapContextType => {
    const context = useContext(MapContext);
    if (context === undefined) {
        throw new Error("useMap must be used within a MapProvider");
    }
    return context;
};

export default MapContext;
