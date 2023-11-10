'use client'

import { Modal } from './Modal'
import { useCallback, useMemo, useState } from 'react'
import { useFilterModal } from '@/app/hooks/useFilterModal'
import { Heading } from '../Heading'
import toast from 'react-hot-toast'
import { useRouter,  } from 'next/navigation'
import { RangeInput } from '../inputs/RangeInput'
import { Counter } from '../inputs/Counter'
import { SelectGrid } from '../inputs/SelectGrid'
import { servicios as serv } from '@/app/(home)/propiedad/[propiedad_id]/servicios'
import queryString from 'query-string'
import useQueryParams from '@/app/hooks/useQueryParams'


export const FilterModal = () => {
  const router = useRouter()
  const { searchParams, pathname } = useQueryParams()
  const filterModal = useFilterModal()
  const [isLoading, setIsLoading] = useState(false)

  const servicios = serv.map(v => ({value: v.servicio, icon: v.icon}))

  const search = useMemo(() => {
    return {
      ubicacion: searchParams.ubicacion,
      huespedes: searchParams.huespedes,
      fecha_inicio: searchParams.fecha_inicio,
      fecha_salida: searchParams.fecha_salida
    }

  }, [searchParams])


  const [filters, setFilters] = useState({
    rangeValues: searchParams.rangeValues || [20,500],
    ambientes: searchParams.ambientes || 1,
    serviciosSelected: searchParams.serviciosSelected || [],
  })
  
  
  // console.log({searchParams, pathname})
  

  const onChangeFilters = (id: string, value: any) => {
    setFilters(v => ({
      ...v, [id]: value
    }))
  }

  
  const onSumbit = async () => {
    setIsLoading(true)
    
    
    const querySearch = queryString.stringify(search, { arrayFormat: 'comma' })
    let queryFilters = queryString.stringify(filters, { arrayFormat: 'comma' })
    
    if(filters.serviciosSelected.length === 1) queryFilters = queryFilters + ','


    filterModal.onClose()
    
    router.push(`${pathname}?${querySearch}&${queryFilters}`)
    toast.success('Filters Applied!')

    setIsLoading(false)
  }

  // const toggle = useCallback(() => {
  //   filterModal.onClose()
  // },[filterModal])

  const bodyContent = (
    <div className="
      flex flex-col gap-10 
      h-[55vh]
      overflow-y-auto
      px-6
    ">
      <div className="flex flex-col gap-3">
        <Heading 
          title="Rango de precios"
          subtitle='Precio por noche'
          
        />
        <RangeInput
          min={0}
          max={600}
          values={filters.rangeValues}
          onChange={(value) => onChangeFilters('rangeValues', value)}
        />
      </div>
      <div className="flex flex-col gap-3">
        <Heading 
          title="Ambientes"
          subtitle='Seleccione la cantidad de ambientes'
        />
        <div className="flex flex-row justify-center">
          <Counter
            value={filters.ambientes}
            onChange={(value) => onChangeFilters('ambientes', value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Heading
          title="Servicios"
          subtitle='Seleccione los servicios que le interesan'
        />
        <div className="flex flex-row justify-center">
          <SelectGrid
            values={servicios}
            selected={filters.serviciosSelected}
            onClick={(value) => onChangeFilters('serviciosSelected', value)}
          />
        </div>
      </div>
      {/*  Orden  */}
  
    </div>
  )



  return (
    <Modal
      disabled={isLoading}
      isOpen={filterModal.isOpen}
      title='Filter Options'
      actionLabel='Filtrar'
      onSubmit={onSumbit} //handleSubmit(onSumbit)
      onClose={filterModal.onClose}
      body={bodyContent}
      
    />
  )
}
