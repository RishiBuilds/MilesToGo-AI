'use client'
import React from 'react'
import ChatBox from './_components/ChatBox'
import GlobalMap from './_components/GlobalMap'
import Itinerary from './_components/Itinerary'
import { useTripDetail } from '../provider'
import { useMap } from '@/context/MapContext'
import { AnimatePresence, motion } from 'motion/react'
import { Globe, MessageSquare, Map, MapPin } from 'lucide-react'

function CreateNewTrip() {
  const tripContext = useTripDetail()
  const tripDetailInfo = tripContext?.tripDetailInfo
  const hasTripData = !!tripDetailInfo?.destination

  return (
    <div className='min-h-screen bg-background pt-14'>
      {/* Main Layout: Chat + Map/Itinerary - Two column desktop */}
      <div className='layout-split h-chat-viewport'>
        {/* Left Panel - AI Chat */}
        <div className="order-2 lg:order-1 flex flex-col border-r border-border">
          {/* Panel header */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-card/50">
            <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              AI Trip Planner
            </span>
          </div>

          {/* Chat content */}
          <div className="flex-1 overflow-hidden">
            <ChatBox />
          </div>
        </div>

        {/* Right Panel - Map / Itinerary */}
        <div className="order-1 lg:order-2 flex flex-col bg-background">
          {/* Panel header */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-card/50">
            {hasTripData ? (
              <>
                <Map className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Your Itinerary
                </span>
              </>
            ) : (
              <>
                <Globe className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Interactive Globe
                </span>
              </>
            )}
          </div>

          {/* Content - Map or Itinerary */}
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              {hasTripData ? (
                <motion.div
                  key="itinerary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  <Itinerary />
                </motion.div>
              ) : (
                <motion.div
                  key="globe"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="h-full relative"
                >
                  <MapSection />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

// Separated MapSection component to properly use hooks
function MapSection() {
  const { focusLocation, markers } = useMap()

  return (
    <div className="h-full relative bg-card">
      {/* Globe container */}
      <GlobalMap
        autoRotate={!focusLocation}
        autoRotateSpeed={0.3}
      />

      {/* Marker info overlay - subtle, functional */}
      <AnimatePresence>
        {markers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-4 left-4 right-4"
          >
            <div className="panel px-3 py-2">
              <div className="flex items-center gap-2 text-foreground">
                <span className="status-dot status-dot-active" />
                <span className="text-sm font-medium">
                  {markers.length} location{markers.length !== 1 ? 's' : ''} highlighted
                </span>
              </div>
              {markers.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {markers.slice(0, 4).map((marker) => (
                    <span
                      key={marker.id}
                      className="badge badge-primary"
                    >
                      <MapPin className="h-3 w-3 mr-1" />
                      {marker.label}
                    </span>
                  ))}
                  {markers.length > 4 && (
                    <span className="badge badge-primary">
                      +{markers.length - 4} more
                    </span>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CreateNewTrip