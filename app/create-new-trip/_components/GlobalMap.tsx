// app/create-new-trip/_components/GlobalMap.tsx
"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { useMap, MapMarker } from "@/context/MapContext";

// ✅ Load Globe client-side only
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

type Props = {
  className?: string;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  // Optional overrides for standalone usage (backward compatibility)
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

  // Use external props if provided, otherwise use context
  const markers = externalMarkers ?? contextMarkers;
  const focusLocation = externalFocus ?? contextFocus;

  // ✅ Fetch country borders
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
    )
      .then((res) => res.json())
      .then((data) => setCountries(data.features));
  }, []);

  // ✅ Responsive resizing
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

  // ✅ Controls setup (rotate, zoom, pan)
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

  // ✅ Handle focus location changes - animate to location
  useEffect(() => {
    const globe = globeRef.current;
    if (!globe || !focusLocation || !isGlobeReady) return;

    // Stop auto-rotation when focusing
    const controls = globe.controls();
    if (controls) {
      controls.autoRotate = false;
    }

    // Animate to the focused location
    globe.pointOfView(
      {
        lat: focusLocation.lat,
        lng: focusLocation.lng,
        altitude: focusLocation.altitude ?? 1.5,
      },
      1000 // Animation duration in ms
    );

    hasAnimatedRef.current = true;
  }, [focusLocation, isGlobeReady]);

  // ✅ Handle globe ready state
  const handleGlobeReady = useCallback(() => {
    setIsGlobeReady(true);
    if (setMapReady) {
      setMapReady(true);
    }
  }, [setMapReady]);

  // ✅ Transform markers to points data for the globe
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
      className={`w-full h-full min-h-[300px] rounded-2xl overflow-hidden bg-black/90 ${className}`}
    >
      <Globe
        ref={globeRef}
        onGlobeReady={handleGlobeReady}
        width={dims.width}
        height={dims.height}
        backgroundColor="rgba(0,0,0,0)"
        showAtmosphere
        atmosphereColor="#ec4899"
        atmosphereAltitude={0.2}
        // 🌍 High-resolution Earth textures
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        // 🌍 Country borders
        polygonsData={countries}
        polygonCapColor={() => "rgba(0,0,0,0)"} // transparent land
        polygonSideColor={() => "rgba(0,0,0,0)"} // no shading
        polygonStrokeColor={() => "#444444"} // subtle borders
        polygonLabel={(d: any) => `
          <div style="padding:6px 10px;background:rgba(0,0,0,0.8);border-radius:8px;border:1px solid rgba(236,72,153,0.3);max-width:180px">
            <strong style="color:#ec4899">${d.properties.name}</strong>
          </div>
        `}
        // 🎯 Markers/Points
        pointsData={pointsData}
        pointLat={(d: any) => d.lat}
        pointLng={(d: any) => d.lng}
        pointColor={(d: any) => d.color}
        pointAltitude={0.01}
        pointRadius={(d: any) => d.size}
        pointLabel={(d: any) => `
          <div style="padding:8px 12px;background:rgba(0,0,0,0.9);border-radius:10px;border:1px solid ${d.color};box-shadow:0 4px 20px rgba(0,0,0,0.5)">
            <div style="display:flex;align-items:center;gap:6px">
              <span style="width:8px;height:8px;border-radius:50%;background:${d.color}"></span>
              <strong style="color:#fff;font-size:13px">${d.label}</strong>
            </div>
            <span style="color:${d.color};font-size:11px;text-transform:capitalize;margin-left:14px">${d.type}</span>
          </div>
        `}
      />

      {/* Loading overlay */}
      {!isGlobeReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-white/70 text-sm">Loading globe...</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper functions for marker styling
function getMarkerColor(type: MapMarker["type"]): string {
  switch (type) {
    case "destination":
      return "#ec4899"; // Primary magenta
    case "hotel":
      return "#3b82f6"; // Blue
    case "activity":
      return "#22c55e"; // Green
    case "origin":
      return "#f59e0b"; // Amber
    default:
      return "#ec4899";
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