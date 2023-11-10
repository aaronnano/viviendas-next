'use client'

import { Badge } from "@/app/components/Badge"
import useQueryParams from "@/app/hooks/useQueryParams"
import { reservas } from "@/prisma/reservas"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface ReservaCardProps {
  data: (typeof reservas[0])

}

export const ReservaCard: React.FC<ReservaCardProps> = ({
  data
}) => {

  const router = useRouter()
  const { searchParams, pathname } = useQueryParams()

  let title = `#0${data.id} \u00b7 ${data.propiedad.title} \u00b7 `
  const location = data.propiedad.ubicacion.split(', ').slice(0,3).join(', ')
  // const fechas = ``

  return (
    <div
      className="
      col-span-1 group
    ">
      <div className="
        relative
        flex flex-col gap-2
        p-4
        border-[1.5px] border-neutral-200
        --hover:border-black
        rounded-md
        transition

      ">
        {/* Title */}
        <div 
          className="w-[85%] truncate cursor-pointer hover:underline"
          onClick={() => router.push(`/propiedad/${data.propiedad.id}`)}
        >
          <span className="text-[21px] font-bold">
            {title}
          </span>
          <span className="text-lg text-neutral-900">
            {location}
          </span>
        </div>

        {/* Body */}
        <div className="flex flex-row gap-8">

          <div className="
            relative
            --aspect-square
            w-[24vh]
            h-[18vh]
            rounded-lg
            overflow-hidden
          ">
            <Image
              fill
              alt="propiedad"
              src={data.propiedad.image_propiedad}
              priority
              className="
                object-cover
                h-full
                w-full
              "
            />
          </div>
          

          <div className="flex-1 flex flex-row gap-5">

            <div className="flex flex-col font-semibold text-neutral-500 ">
              <div className="">
                Fechas: 
              </div>
              <div className="">
                Ambientes:
              </div>
              <div className="">
                Huespedes:
              </div>
              <div className="">
                Servivios:
              </div>
            </div>

            <div className="flex flex-col font-bold text-neutral-400 w-[60%]">
              <div className="text-neutral-800">
                {data.start_date}&nbsp;&nbsp;   -   &nbsp;&nbsp;{data.end_date}
              </div>
              <div className="">
                {data.propiedad.cant_ambientes}
              </div>
              <div className="">
                {data.huespedes}
              </div>
              <div className="">
                {data.propiedad.servicios.join(' \u00A0\u2022\u00A0 ')}
              </div>
            </div>

          </div>



        </div>

        <div className="
          absolute
          right-3
          top-3
        ">
          <Badge
            title={data.estado_reserva}
            color={data.estado_reserva === "Activo" ? 'green' : 'yellow'}
            size={2}
            // onClick={}
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
          {/* <FaTrash size={15} /> */}
          <div className="text-sm font-semibold" onClick={() => console.log('hola')}>
            Cancelar
          </div>
        </div>

      </div>
    </div>
  )
}