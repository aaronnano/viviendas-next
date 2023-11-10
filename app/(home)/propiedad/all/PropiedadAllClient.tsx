'use client'

import { PropiedadCard } from "@/app/components/propiedad/PropiedadCard"
import useQueryParams from "@/app/hooks/useQueryParams"
import { propiedades as propies } from "@/prisma/propiedades"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface PropiedadAllClientProps {
  currentUser?: any
  propiedades?: any //(typeof propies[0])[]
}

export const PropiedadAllClient: React.FC<PropiedadAllClientProps> = ({
  currentUser,
  propiedades = []
}) => {
  const router = useRouter()
  const { searchParams, pathname } = useQueryParams()
  const [isLoading, setIsLoading] = useState(false)



  return (
    <div className="">
      {/* Header */}
      <div className="
        flex flex-row justify-between items-center
        mb-8
      "> 
        <div className="
          text-[32px]
          font-bold
        ">
          Propiedades subidas
        </div>
      </div>

      <div className="flex flex-col gap-3 pr-32 mb-8">
        {propiedades.map((prop: any, i: number) => (
          <PropiedadCard
            key={i}
            data={prop}
            shape='rec'
          />
        ))}

      </div>
    </div>
  )
}
