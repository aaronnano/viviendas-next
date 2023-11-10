'use client'

import useQueryParams from "@/app/hooks/useQueryParams"
import { reservas as rev } from "@/prisma/reservas"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ReservaCard } from "./ReservaCard"



interface ReservasClientProps {
  reservas?: typeof rev
}

export const ReservasClient: React.FC<ReservasClientProps> = ({
  reservas
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
          Reservas
        </div>
      </div>

      <div className="flex flex-col gap-3 pr-32 mb-8">
        {reservas?.map((item, i) => (
          <ReservaCard
            key={i}
            data={item}
            // shape='rec'
          />
        ))}

      </div>
    </div>
  )
}
  