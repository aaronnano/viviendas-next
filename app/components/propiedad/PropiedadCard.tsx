'use client'

import useCountries from "@/app/hooks/useCountries"
import useQueryParams from "@/app/hooks/useQueryParams"
import { propiedades } from "@/prisma/propiedades"
import { User } from "@prisma/client"
import { format } from "date-fns"
import Image from "next/image"
import { useRouter } from "next/navigation"
import queryString from "query-string"
import React, { useCallback, useMemo, useState } from "react"
import { Button } from "../Button"
import { Heading } from "../Heading"
import { HeartButton } from "../heartButton"
import { FaTrash } from 'react-icons/fa'
import { Badge } from "../Badge"
import axios from "axios"
import toast from "react-hot-toast"


interface PropiedadCardProps {
  data: (typeof propiedades[0])
//   reservation?: Reservation
  onAction?: (id: string) => void
  disabled?: boolean
  actionLabel?: string
  actionId?: string 
  currentUser?: User | null
  shape?: string
}

export const PropiedadCard: React.FC<PropiedadCardProps> = ({
  data,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
  shape = 'square'
}) => {

  const router = useRouter()
  const { searchParams, pathname } = useQueryParams()
  
  const [propiedad, setPropiedad] = useState(data)

  const search = {
    ubicacion: searchParams.ubicacion,
    huespedes: searchParams.huespedes,
    fecha_inicio: searchParams.fecha_inicio,
    fecha_salida: searchParams.fecha_salida
  }

  const querySearch = queryString.stringify(search)

  const ubicacion = propiedad.ubicacion.split(', ').slice(0,3).join(', ') 

  const onChangeState = async(e: any) => {
    e.stopPropagation()
    try {
      const res = await axios.post(`/api/propiedades/${propiedad.id}`, { estado_propiedad: propiedad.estado_propiedad })

      setPropiedad( v => ({
        ...v,
        estado_propiedad: res.data.estado_propiedad 
        
      }))

      toast.success('Estado modificado!')

    } catch (error) {
      console.log(error)
      // toast.error('Ocurrio un error.')
    }

  }


  let content;
  if(shape === 'square') {
    content = (
      <div className="flex flex-col gap-1 w-full">
        <div className="
          aspect-square
          relative
          overflow-hidden
          rounded-lg
          w-full
          --h-[500px]
        ">
          <Image
            fill
            alt="propiedad"
            src={propiedad.image_propiedad}
            priority
            
            className="
              object-cover
              h-full
              w-full
              --group-hover:scale-110
              --transition
            "
          />
        </div>
        <div className="text-lg font-semibold">
          {propiedad.title}
        </div>
        <div className="font-light text-neutral-500">
          {propiedad.cant_ambientes} Ambientes
        </div>
        <div>
        <span className="font-semibold">
          $ {propiedad.precio_noche} USD
        </span>
        <span className="text-sm font-semibold">
          &nbsp;/noche
        </span>

        </div>
      </div>
    )
  }

  if(shape === 'rec') {
    content = (
      <div className="
        relative
        flex flex-row gap-3
        p-4
        border-[1.5px] border-neutral-200
        --hover:border-black
        rounded-md
        transition
      ">

        <div className="
          col-span-2
          relative
          --aspect-square
          w-[27vh]
          h-[20vh]
          rounded-lg
          overflow-hidden
        ">
          <Image
            fill
            alt="propiedad"
            src={propiedad.image_propiedad}
            priority
            className="
              object-cover
              h-full
              w-full
            "
          />
        </div>

        <div className="flex flex-col justify-between">
          {/* Title */}
          <div className="flex flex-col">
            <div className="text-2xl font-bold">
              {propiedad.title}
            </div>
            <div className=" text-neutral-600">
              {ubicacion}
            </div>
          </div>

          {/* Precio */}
          <div className="flex flex-col">
            <div className="fon-light text-neutral-600">
                {propiedad.cant_ambientes} Ambientes
            </div>
            <div>
              <span className="text-lg font-semibold">
                $ {propiedad.precio_noche} USD
              </span>
              <span className="text-base font-semibold">
                &nbsp;/noche
              </span>
            </div>
          </div>

        </div>


        <div className="
          absolute
          right-3
          top-3
        ">
          <Badge 
            title={propiedad.estado_propiedad}
            color={propiedad.estado_propiedad === "Visible" ? 'green' : 'yellow'}
            size={2}
            onClick={onChangeState}
            allowHover
          />
        </div>

        <div className="
          absolute
          right-3
          bottom-3
          py-2 px-4
          rounded-md
          bg-red-200
          text-red-800
          cursor-pointer
          flex flex-row items-center gap-2
          hover:bg-red-700
          hover:text-white
          transition
        ">
          <FaTrash size={15} />
          <div className="text-sm font-semibold" onClick={() => console.log('hola')}>
            Borrar
          </div>
        </div>


      </div>
    )
  }

  return (
    <div
      onClick={() => router.push(`/propiedad/${propiedad.id}?${querySearch}`)}
      className="
      col-span-1 cursor-pointer group
    ">
      {content}
    </div>
  )
}
