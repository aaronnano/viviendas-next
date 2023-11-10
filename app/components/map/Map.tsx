'use client'

import L from 'leaflet'
import { MapContainer, TileLayer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { MapMarker } from './MapMarker';
import { useEffect, useState } from 'react';
import useLocation from '@/app/hooks/useLocation';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
})

interface MapProps {
  center?: number[]
  zoom?: number
  onPickLocation?: (location: { latlng: number[] }) => void
  draggable?: boolean
  allowClick?: boolean
  className?: string
}
const Map: React.FC<MapProps> = ({
  center = [-34.596353, -58.403906],
  zoom = 7,
  onPickLocation = () => {},
  draggable = true,
  allowClick = true,
  className = "h-[40vh] rounded-lg"
}) => {

  return (
    <MapContainer
      // center={center as L.LatLngExpression || [51, -0.09]} 
      center={center as L.LatLngExpression}
      zoom={zoom} 
      scrollWheelZoom={true} 
      className={className}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapMarker
        onChange={(pos) => onPickLocation({ latlng: pos as number[]})}
        center={center as number[]}
        draggable={draggable}
        allowClick={allowClick}
        
      />
    </MapContainer>
  )
}


export default Map