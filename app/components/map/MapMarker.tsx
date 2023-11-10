import { Marko_One } from "next/font/google"
import { useCallback, useEffect, useRef, useState } from "react"
import { Marker, useMapEvents } from "react-leaflet"
import L from 'leaflet'

interface MapMarkerProps {
  onChange: (pos: L.LatLngExpression) => void
  center: number[]
  draggable?: boolean
  allowClick?: boolean
}

export const MapMarker: React.FC<MapMarkerProps> = ({
  onChange,
  center,
  draggable,
  allowClick
}) => {
  const [position, setPosition] = useState(center)
  const markerRef = useRef<L.Marker>(null)

  // console.log('MapMarker')
  const onChangePosition = useCallback((pos:  L.LatLngExpression) => {
    onChange(pos)
  }, [onChange])

  useMapEvents({
    click(e) {
      if(!allowClick) return
      
      const pos = [e.latlng.lat, e.latlng.lng]
      setPosition(pos)
      onChangePosition(pos as L.LatLngExpression)
    },
  })


  
  return (
    <Marker
      position={position as L.LatLngExpression}
      draggable={draggable}
      ref={markerRef}
      eventHandlers={{
        dragend() {
          const marker = markerRef.current
          if (!marker) return
          
          const pos = [marker.getLatLng().lat, marker.getLatLng().lng]
          setPosition(pos)
          onChangePosition(pos as L.LatLngExpression)
        }
      }}
      
    />
    
  )
}
