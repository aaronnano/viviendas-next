'use client'

import { servicios as mainServicios } from "./servicios"

interface PropiedadServiciosProps {
  servicios: string[]
}

export const PropiedadServicios: React.FC<PropiedadServiciosProps> = ({
  servicios
}) => {

  return (
    <div className="
      grid
      grid-cols-2 gap-6
    ">
      {mainServicios.map((value, i) => {
        if(!servicios.includes(value.servicio)) return
        
        const Icon = value.icon
        
        return (
          <div key={i} className="
            flex flex-row gap-3 items-center
          ">
            <Icon size={25} />
            <div>{value.servicio}</div>

          </div>
        )
      })}
    </div>
  )

}