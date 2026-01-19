'use client'
import GlobalMap from '@/app/create-new-trip/_components/GlobalMap';
import Itinerary from '@/app/create-new-trip/_components/Itinerary';
import { Trip } from '@/app/my-trips/page';
import { useTripDetail, useUserDetail } from '@/app/provider'
import { api } from '@/convex/_generated/api';
import { useMap } from '@/context/MapContext';
import { useConvex } from 'convex/react';
import { motion } from 'motion/react';
import { useParams } from 'next/navigation'
import React, { useEffect, useState, useCallback } from 'react'
import { TripInfo } from '@/app/create-new-trip/_components/ChatBox';
import { Globe, Map, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function ViewTrip() {
    const { tripid } = useParams()
    const { userDetail } = useUserDetail();
    const convex = useConvex();

    const [tripData, setTripData] = useState<Trip>()
    //@ts-ignore
    const { tripDetailInfo, setTripDetailInfo } = useTripDetail()

    // Map context integration
    const { addMarker, clearMarkers, setFocusLocation } = useMap();

    // Function to populate map with trip data
    const populateMapWithTripData = useCallback((trip: TripInfo) => {
        clearMarkers();

        let focusLat: number | null = null;
        let focusLng: number | null = null;

        // Add hotel markers
        trip.hotels?.forEach((hotel, index) => {
            if (hotel.geo_coordinates?.latitude && hotel.geo_coordinates?.longitude) {
                if (focusLat === null) {
                    focusLat = hotel.geo_coordinates.latitude;
                    focusLng = hotel.geo_coordinates.longitude;
                }
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
                    if (focusLat === null) {
                        focusLat = activity.geo_coordinates.latitude;
                        focusLng = activity.geo_coordinates.longitude;
                    }
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

        // Focus on first location
        if (focusLat !== null && focusLng !== null) {
            setFocusLocation({
                lat: focusLat,
                lng: focusLng,
                altitude: 1.5,
            });
        }
    }, [addMarker, clearMarkers, setFocusLocation]);

    useEffect(() => {
        userDetail && GetTrip()
    }, [userDetail])

    const GetTrip = async () => {
        const result = await convex.query(api.tripDetail.GetTripById, {
            uid: userDetail?._id,
            tripid: tripid + ""
        })
        setTripData(result)
        setTripDetailInfo(result?.tripDetail)

        // Populate map with trip markers
        if (result?.tripDetail) {
            populateMapWithTripData(result.tripDetail);
        }
    }

    return (
        <div className='min-h-screen px-4 py-6 lg:px-8'>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 flex items-center justify-between"
            >
                <div>
                    <Link
                        href="/my-trips"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to My Trips
                    </Link>
                    <h1 className='font-bold text-2xl sm:text-3xl lg:text-4xl flex items-center gap-3'>
                        <span className="p-2 rounded-xl bg-primary/10">
                            <Map className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                        </span>
                        {tripData?.tripDetail?.destination || 'Trip Details'}
                    </h1>
                    {tripData?.tripDetail && (
                        <p className="mt-2 text-muted-foreground text-sm sm:text-base">
                            {tripData.tripDetail.duration} • {tripData.tripDetail.group_size} • {tripData.tripDetail.budget} budget
                        </p>
                    )}
                </div>
            </motion.div>

            {/* Main Content */}
            <div className='grid grid-cols-1 lg:grid-cols-5 gap-6'>
                {/* Left Panel - Itinerary */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className='lg:col-span-3'
                >
                    <Itinerary />
                </motion.div>

                {/* Right Panel - Map */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className='lg:col-span-2'
                >
                    <div className="sticky top-4">
                        <div className="flex items-center gap-2 mb-3">
                            <Globe className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium text-muted-foreground">Trip Map</span>
                        </div>
                        <div className="h-500px lg:h-[calc(100vh-200px)] rounded-2xl border border-border/50 overflow-hidden shadow-xl bg-black/5">
                            <GlobalMap autoRotate={false} />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default ViewTrip