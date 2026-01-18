// app/create-new-trip/_components/GlobalMap.tsx
"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { useMap, MapMarker } from "@/context/MapContext";
import { Loader2 } from "lucide-react";

// Load Globe client-side only
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

type Props = {
  className?: string;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  externalMarkers?: MapMarker[];
  externalFocus?: { lat: number; lng: number; altitude?: number } | null;
};

const GlobalMap: React.FC<Props> = ({
  className = "",
  autoRotate = true,
  autoRotateSpeed = 0.4,
  externalMarkers,
  externalFocus,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const globeRef = useRef<any>(null);
  const hasAnimatedRef = useRef(false);

  const [dims, setDims] = useState({ width: 600, height: 400 });
  const [countries, setCountries] = useState<any[]>([]);
  const [isGlobeReady, setIsGlobeReady] = useState(false);

  // Try to use context, but gracefully handle when not available
  let contextMarkers: MapMarker[] = [];
  let contextFocus: { lat: number; lng: number; altitude?: number } | null = null;
  let setMapReady: ((ready: boolean) => void) | null = null;

  try {
    const mapContext = useMap();
    contextMarkers = mapContext.markers;
    contextFocus = mapContext.focusLocation;
    setMapReady = mapContext.setMapReady;
  } catch {
    // Context not available, use external props
  }

  const markers = externalMarkers ?? contextMarkers;
  const focusLocation = externalFocus ?? contextFocus;

  // Fetch country borders
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
    )
      .then((res) => res.json())
      .then((data) => setCountries(data.features));
  }, []);

  // Responsive resizing
  useEffect(() => {
    if (!containerRef.current) return;

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const cr = entry.contentRect;
        setDims({
          width: Math.max(320, Math.floor(cr.width)),
          height: Math.max(260, Math.floor(cr.height)),
        });
      }
    });

    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Controls setup (rotate, zoom, pan)
  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;

    const controls = globe.controls();
    if (!controls) return;

    controls.autoRotate = autoRotate && !focusLocation;
    controls.autoRotateSpeed = autoRotateSpeed;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.minDistance = 150;
    controls.maxDistance = 1500;
  }, [autoRotate, autoRotateSpeed, focusLocation]);

  // Handle focus location changes - animate to location
  useEffect(() => {
    const globe = globeRef.current;
    if (!globe || !focusLocation || !isGlobeReady) return;

    const controls = globe.controls();
    if (controls) {
      controls.autoRotate = false;
    }

    globe.pointOfView(
      {
        lat: focusLocation.lat,
        lng: focusLocation.lng,
        altitude: focusLocation.altitude ?? 1.5,
      },
      800 // Animation duration in ms
    );

    hasAnimatedRef.current = true;
  }, [focusLocation, isGlobeReady]);

  // Handle globe ready state
  const handleGlobeReady = useCallback(() => {
    setIsGlobeReady(true);
    if (setMapReady) {
      setMapReady(true);
    }
  }, [setMapReady]);

  // Transform markers to points data for the globe
  const pointsData = useMemo(() => {
    return markers.map((marker) => ({
      lat: marker.lat,
      lng: marker.lng,
      label: marker.label,
      color: marker.color || getMarkerColor(marker.type),
      size: getMarkerSize(marker.type),
      type: marker.type,
    }));
  }, [markers]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full min-h-[300px] overflow-hidden bg-card ${className}`}
    >
      <Globe
        ref={globeRef}
        onGlobeReady={handleGlobeReady}
        width={dims.width}
        height={dims.height}
        backgroundColor="rgba(13,17,23,1)"
        showAtmosphere
        atmosphereColor="#58a6ff"
        atmosphereAltitude={0.15}
        // Earth textures
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        // Country borders - subtle
        polygonsData={countries}
        polygonCapColor={() => "rgba(0,0,0,0)"}
        polygonSideColor={() => "rgba(0,0,0,0)"}
        polygonStrokeColor={() => "#30363d"}
        polygonLabel={(d: any) => `
          <div style="padding:6px 10px;background:rgba(22,27,34,0.95);border-radius:6px;border:1px solid #30363d;font-family:system-ui,-apple-system,sans-serif">
            <span style="color:#e6edf3;font-size:12px;font-weight:500">${d.properties.name}</span>
          </div>
        `}
        // Markers/Points
        pointsData={pointsData}
        pointLat={(d: any) => d.lat}
        pointLng={(d: any) => d.lng}
        pointColor={(d: any) => d.color}
        pointAltitude={0.01}
        pointRadius={(d: any) => d.size}
        pointLabel={(d: any) => `
          <div style="padding:8px 12px;background:rgba(22,27,34,0.95);border-radius:6px;border:1px solid ${d.color};font-family:system-ui,-apple-system,sans-serif">
            <div style="display:flex;align-items:center;gap:6px">
              <span style="width:6px;height:6px;border-radius:50%;background:${d.color}"></span>
              <span style="color:#e6edf3;font-size:12px;font-weight:500">${d.label}</span>
            </div>
            <span style="color:#8b949e;font-size:10px;text-transform:capitalize;margin-left:12px">${d.type}</span>
          </div>
        `}
      />

      {/* Loading overlay - minimal */}
      {!isGlobeReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-card">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-5 w-5 text-primary animate-spin" aria-hidden="true" />
            <span className="text-xs text-muted-foreground">Loading globe...</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper functions for marker styling - using theme colors
function getMarkerColor(type: MapMarker["type"]): string {
  switch (type) {
    case "destination":
      return "#58a6ff"; // Primary blue
    case "hotel":
      return "#a371f7"; // Purple
    case "activity":
      return "#3fb950"; // Success green
    case "origin":
      return "#d29922"; // Warning amber
    default:
      return "#58a6ff";
  }
}

function getMarkerSize(type: MapMarker["type"]): number {
  switch (type) {
    case "destination":
      return 0.8;
    case "hotel":
      return 0.5;
    case "activity":
      return 0.4;
    case "origin":
      return 0.6;
    default:
      return 0.5;
  }
}

export default GlobalMap;