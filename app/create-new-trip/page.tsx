'use client'
import React, { useEffect, useRef } from 'react'
import ChatBox from './_components/ChatBox'
import GlobalMap from './_components/GlobalMap'
import Itinerary from './_components/Itinerary'
import { useTripDetail } from '../provider'
import { useMap } from '@/context/MapContext'
import { motion, AnimatePresence } from 'motion/react'
import { Globe, MessageSquare, Map } from 'lucide-react'

function CreateNewTrip() {
  const tripContext = useTripDetail()
  const tripDetailInfo = tripContext?.tripDetailInfo
  const hasTripData = !!tripDetailInfo?.destination

  return (
    <div className='min-h-screen px-4 py-6 sm:px-6 md:px-10 lg:px-12 xl:px-16'>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className='font-bold text-2xl sm:text-3xl lg:text-4xl flex items-center gap-3'>
          <span className="p-2 rounded-xl bg-primary/10">
            <Globe className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
          </span>
          Create New Trip
        </h1>
        <p className="mt-2 text-muted-foreground text-sm sm:text-base">
          Chat with AI to plan your perfect adventure
        </p>
      </motion.div>

      {/* Main Layout: Chat + Map/Itinerary */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6'>
        {/* Left Panel - Chat */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="order-2 lg:order-1"
        >
          <div className="sticky top-4">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">AI Trip Planner</span>
            </div>
            <ChatBox />
          </div>
        </motion.div>

        {/* Right Panel - Map / Itinerary */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="order-1 lg:order-2"
        >
          <div className="sticky top-4">
            <AnimatePresence mode="wait">
              {hasTripData ? (
                <motion.div
                  key="itinerary"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Map className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-muted-foreground">Your Itinerary</span>
                  </div>
                  <Itinerary />
                </motion.div>
              ) : (
                <motion.div
                  key="globe"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Globe className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-muted-foreground">Interactive Globe</span>
                  </div>
                  <MapSection />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Separated MapSection component to properly use hooks
function MapSection() {
  const { focusLocation, markers } = useMap()

  return (
    <div className="h-[85vh] rounded-2xl border border-border/50 overflow-hidden shadow-xl bg-black/5 relative">
      {/* Globe container */}
      <GlobalMap
        autoRotate={!focusLocation}
        autoRotateSpeed={0.3}
      />

      {/* Overlay info when markers exist */}
      <AnimatePresence>
        {markers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 left-4 right-4"
          >
            <div className="bg-black/80 backdrop-blur-md rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 text-white/90">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium">
                  {markers.length} location{markers.length !== 1 ? 's' : ''} highlighted
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {markers.slice(0, 3).map((marker) => (
                  <span
                    key={marker.id}
                    className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/80"
                  >
                    {marker.label}
                  </span>
                ))}
                {markers.length > 3 && (
                  <span className="px-2 py-1 text-xs rounded-full bg-primary/20 text-primary">
                    +{markers.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-transparent" />
    </div>
  )
}

export default CreateNewTrip