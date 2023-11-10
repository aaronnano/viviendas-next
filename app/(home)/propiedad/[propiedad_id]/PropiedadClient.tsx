'use client'

import { Container } from "@/app/components/Container"
import { Heading } from "@/app/components/Heading"
import { Propiedad } from "@prisma/client"
import useLocation from '@/app/hooks/useLocation'
import { differenceInDays, eachDayOfInterval, format, parseISO } from 'date-fns';
import { useMemo, useState } from "react"
import Image from "next/image"
import { Avatar } from "@/app/components/Avatar"
import { PropiedadServicios } from "./PropiedadServicios"
import dynamic from "next/dynamic"
import { Counter } from "@/app/components/inputs/Counter"
import { Button } from "@/app/components/Button"
import { propiedades } from '../../../../prisma/propiedades'
import useQueryParams from "@/app/hooks/useQueryParams"
import { DatePicker as Calendar } from "@/app/components/inputs/Calendar"
import axios from "axios"
import { useRouter } from "next/navigation"
import { reservas as rev } from "@/prisma/reservas"

const Map = dynamic(() => import('../../../components/map/Map'), { 
  ssr: false 
})


interface PropiedadClientProps {
  propiedad: any //(typeof propiedades[0])
  currentUser?: any
  reservas: typeof rev
}

export const PropiedadClient: React.FC<PropiedadClientProps> = ({
  propiedad,
  currentUser,
  reservas
}) => {
  const { searchParams, pathname } = useQueryParams()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  // True: Show Reservar - False: Not Shor Reservar
  const existParams = Object.keys(searchParams).length !== 0
  
  const hostName = propiedad.user.id === currentUser?.id ? 'ti' : propiedad.user?.fullname

  console.log({propiedad})

  const location_code = useMemo(() => {
    return propiedad.location_code.split(', ').map((loc: string) => parseFloat(loc))
  }, [propiedad])
  const location = propiedad.ubicacion.split(', ')

  const disabledDates = useMemo(() => {
    let dates: Date[] = []
    reservas.map(rev => {
      const range = eachDayOfInterval({
        start: new Date(rev.start_date+' '),
        end: new Date(rev.end_date+' ')
      })

      console.log({range})

      dates = [...dates, ...range]

    })

    return dates
  }, [reservas])


  const [reserva, setReserva] = useState({
    dateRange: {
      startDate: existParams ? new Date(searchParams.fecha_inicio + ' ') : new Date(),
      endDate: existParams ? new Date(searchParams.fecha_salida + ' ') : new Date(),
      key: 'selection'
    },
    max_huespedes: searchParams.huespedes
  })
  const onChangeReserva = (id: string, value: any) => {
    setReserva((reserva) => ({
      ...reserva,
      [id]: value
    }))
  }


  const totalPrice = useMemo(() => {
    const dayCount = differenceInDays(
      reserva.dateRange.endDate,
      reserva.dateRange.startDate,
    ) + 1


    return +(dayCount * propiedad.precio_noche).toFixed(2)
    
  }, [reserva])


  const makeReserva = async() => {
    setIsLoading(true)

    if(!currentUser) {
      setIsLoading(false)
      return router.push('/auth/login')
    }

    const data = {
      startDate: format(reserva.dateRange.startDate, 'yyyy-MM-dd'),
      endDate: format(reserva.dateRange.endDate, 'yyyy-MM-dd'),
      huespedes: reserva.max_huespedes,
      pago_total: totalPrice,
      propiedad

    }
    console.log({data})

    try {
      const res = await axios.post('/api/reserva/pago', data)
      console.log(res.data)
      const pagoUrl = res.data.body.init_point
      router.push(pagoUrl)

    } catch (error) {
      // console.log(error)
    }

    setIsLoading(false)
  }


  let rightSideBody
  if(existParams) {
    rightSideBody = (
      <>
        {/* Fechas */}
        <div className="py-3">
          <div className="
            text-lg font-bold
          ">
            Fechas
          </div>
          <div className="
            flex flex-row justify-center gap-16
          ">
            <div className="
              flex flex-col
            ">
              <div className="text-sm font-bold">
                Inicio
              </div>
              <div className="">
                {format(reserva.dateRange.startDate, 'dd/MM/yyyy') }
              </div>
            </div>
            <div className="
              flex flex-col
            ">
              <div className="text-sm font-bold">
                Salida
              </div>
              <div className="">
                {format(reserva.dateRange.endDate, 'dd/MM/yyyy')}
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center">
            <Calendar
              onChange={(value) => onChangeReserva('dateRange', value.selection)}
              value={reserva.dateRange}
              months={1}
              disabledDates={disabledDates}
            />
          </div>
        </div>

        <hr />


        {/* Huespedes */}
        <div className="
          py-3
        ">
          <div className="
            text-lg font-bold
          ">
            Huespedes
          </div>
          {/* flex flex-row justify-between items-center */}
          <div className="
            grid grid-cols-2 items-center
          ">
            <div className="text-sm font-bold">
              Cantidad
            </div>
            <Counter 
              value={reserva.max_huespedes}
              minValue={1}
              maxValue={propiedad.max_personas}
              onChange={(value) => onChangeReserva('max_huespedes', value)}
            />
          </div>
          
        </div>

        {/* Button */}
        <div className="mt-3">
          <Button
            disabled={isLoading}
            label="Reservar"
            onClick={makeReserva}
          />
        </div>
        <div className="
          flex
          flex-row
          justify-between
          text-lg font-semibold
          mt-3
        ">
          <div className="
          ">
            Total a pagar
          </div>
          <div className="
          ">
            $ {totalPrice} USD
          </div>
          
        </div>
      </>
    )
  }



  return (
    <Container>
      <div className="
        pt-28
        max-w-screen-lg
        mx-auto
      ">
        <div className="
          flex flex-col gap-6
        ">
          {/* Title */}
          <Heading
            title={propiedad.title}
            subtitle={`${location[0]}, ${location[1]}, ${location[2]}`}
          />
          {/* Image */}
          <div className="
            relative
            overflow-hidden
            rounded-xl
            w-full
            h-[60vh]
          ">
            <Image
              src={propiedad.image_propiedad}
              fill
              className="object-cover w-full"
              alt="Image"
            />

          </div>


          <div className="
            grid
            md:grid-cols-7
            md:gap-10
            mt-2
          ">
            {/* Left: Info */}
            <div className="
              col-span-4 flex flex-col gap-8
            ">
              
              <div className="
                flex flex-col gap-2 mb-20
              ">
                {/* Host & Image */}
                <div className="
                  text-xl 
                  font-semibold 
                  flex 
                  flex-row 
                  items-center
                  gap-4
                ">
                  <div>Hosteado por {hostName}</div>
                  <Avatar src={propiedad.user?.image} />
                </div>

                {/* Numbers */}
                <div className="
                  flex 
                  flex-row 
                  items-center 
                  gap-2
                  font-light
                  text-neutral-500
                ">
                  <div> {propiedad.cant_ambientes} Ambientes </div>
                  <div>&#183;</div>
                  <div> {propiedad.max_personas} Huespedes </div>
                </div>
                
                <hr />

                {/* Descripcion */}
                <div className="
                  flex flex-col gap-2 py-2
                ">
                  <div className="
                    text-xl font-semibold
                  ">
                    Descripcion
                  </div>
                  <div className="
                    text-lg font-light text-neutral-500
                  ">
                    {propiedad.description}
                  </div>  

                </div>

                <hr />

                <div className="
                  flex flex-col gap-2 py-2
                ">
                  <div className="
                    text-xl font-semibold mb-3
                  ">
                    ¿Que ofrece este lugar?
                  </div>
                  <PropiedadServicios
                    servicios={propiedad.servicios}
                  />
                </div>

                <hr />

                <div className="
                  flex flex-col gap-3 py-2
                ">
                  <div className="
                    text-xl font-semibold
                  ">
                    ¿Donde esta ubicado?
                  </div>

                  <div className="
                    flex flex-col
                    border-l-[5px] border-black 
                    bg-neutral-50
                    p-4
                  ">
                    <div>
                      <span className="text-base">
                        {location[0]},&nbsp;
                      </span>
                      <span className="text-base">
                        {location[1]},&nbsp;
                      </span>
                      <span className="text-base">
                        {location[2]}
                      </span>
                    </div>
                    <div>
                      <span className="text-base font-light text-neutral-800">
                        {location.slice(3).join(', ')}
                      </span>
                    </div> 

                  </div>

                  <Map
                    onPickLocation={() => {}}
                    center={location_code}
                    zoom={5}
                    draggable={false}
                    allowClick={false}
                  />
                </div>

              </div>
            </div>

            {/* Right: Reserva */}
            <div className="
              col-span-3 flex flex-col gap-8
            ">
              <div className="
                rounded-xl
                border-neutral-200
                border-[1px]
                flex flex-col gap-1
                p-4
              ">
                {/* Precio */}
                <div>
                  <span className="
                    text-xl font-bold
                  ">
                    $ {propiedad.precio_noche} USD
                  </span>
                  <span className="text-sm font-semibold">
                      &nbsp;/ noche
                  </span>
                </div>

                {/* RightBody */}
                {rightSideBody}

              </div>
            </div>

            
          </div>
        </div>
      </div>
  </Container>
  )
}