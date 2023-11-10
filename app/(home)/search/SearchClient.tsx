'use client'

import { Container } from "@/app/components/Container"
// import { propiedades as propies } from "@/prisma/propiedades"
import { PropiedadCard } from "@/app/components/propiedad/PropiedadCard"
import { useFilterModal } from "@/app/hooks/useFilterModal"
import { BiFilterAlt } from 'react-icons/bi'
import { useRouter } from 'next/navigation'
import useQueryParams from "@/app/hooks/useQueryParams"


// reservations?: SafeReservation[];
//http://localhost:3000/search?ubicacion=Italia&fecha_inicio=2023-01-01&fecha_salida=2023-01-10&huespedes=2&ambientes=1&rangeValues=22,165&serviciosSelected=Wifi,Estacionamiento

interface SearchClientProps {
  propiedades?: any[] //(typeof propies[0])[]
  
}

export const SearchClient: React.FC<SearchClientProps> = ({
  propiedades = []
}) => {
  const router = useRouter()
  const filterModal = useFilterModal()
  const { searchParams, pathname } = useQueryParams()


  const existFilter = !!searchParams.ambientes

  const propiedadesFiltered = existFilter ? propiedades.filter(prop => 
    prop.cant_ambientes === searchParams.ambientes &&
    prop.precio_noche >= searchParams.rangeValues[0] && prop.precio_noche <= searchParams.rangeValues[1] && (
    searchParams.serviciosSelected ? searchParams.serviciosSelected.every((v:string) => prop.servicios.includes(v)) : true)
  ) : propiedades



  return (
    <Container>
      <div className="
        pt-28
        lg:max-w-screen-lg
        2xl:max-w-screen-xl
        mx-auto
      ">
        {/* Header */}
        <div className="
          flex flex-row justify-between items-center
          mb-8
        ">
          <div className="
            text-[32px]
            font-bold
          ">
            Resultados de <br />busqueda
          </div>
          <div 
            onClick={filterModal.onOpen}
            className="
            text-md fond-semibold
            rounded-md
            cursor-pointer
            transition
            hover:bg-neutral-200
            bg-neutral-100
            px-6
            py-3
            flex flex-row items-center gap-3
          ">
            <BiFilterAlt size={18} />
            <div>
              Filtros
            </div>
            
          </div>

        </div>

        {/* Cards */}
        <div className="
          grid
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-3
          xl:grid-cols-4
          gap-5
        ">
          {propiedadesFiltered.map((prop, i) => (
            <PropiedadCard
              key={prop.id}
              data={prop}
            />
          ))}
        </div>
      
      </div>

  </Container>
  )
}