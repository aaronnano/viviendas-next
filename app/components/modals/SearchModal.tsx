'use client'
import { useSearchModal } from '@/app/hooks/useSearchModal'
import { Modal } from './Modal'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Heading } from '../Heading'
import { categories } from '../navbar/Categories'
import { CategoryInput } from '../inputs/CategoryInput'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { CountrySelect, CountrySelectValue } from '../inputs/CountrySelect'
import dynamic from 'next/dynamic'
import { Counter } from '../inputs/Counter'
import { ImageUploadCld } from '../inputs/ImageUploadCld'
import { DatePicker as Calendar } from '../inputs/Calendar'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Range } from 'react-date-range';
import useLocation from '@/app/hooks/useLocation'
import { format } from 'date-fns'
import queryString from 'query-string'
import useQueryParams from '@/app/hooks/useQueryParams'

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

interface ISearchValues {
  location: any
  dateRange: any
  huespedes: number
}

export const SearchModal = () => {
  const searchModal = useSearchModal()
  const router = useRouter()
  const [step, setStep] = useState(STEPS.LOCATION)
  const [isLoading, setIsLoading] = useState(false)

  const { searchParams } = useQueryParams()  // Obtener los params para inicializar el Moda
  
  const [searchValues, setSearchValues] = useState<ISearchValues>({
    location: '',
    dateRange: {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    },
    huespedes: 1
  })

  // console.log({l: searchValues.location?.latlng})
  const onChangeSearch = (id: string, value: any) => {
    setSearchValues(v => ({
      ...v, [id]: value
    }))
  }

  const Map = useMemo(() => dynamic(() => import('../map/Map'), { 
    ssr: false 
  }), [searchValues.location]);


  const onBack = () => {
    setStep(v => v - 1)
  }
  const onNext = () => {
    setStep(v => v + 1)
  }

  const onSubmit = async() => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    if(searchValues.location === '') {
      return toast.error('1. Falta seleccionar la ubicacion')
    }
    
    setIsLoading(true);

    const query = {
      ubicacion: searchValues.location?.label,
      fecha_inicio: format(searchValues.dateRange?.startDate, 'yyyy-MM-dd'), 
      fecha_salida: format(searchValues.dateRange?.endDate, 'yyyy-MM-dd'), 
      huespedes: searchValues.huespedes
    }

    // console.log({query})

    const url = '/search?' + queryString.stringify(query)

    // console.log({url})

    searchModal.onClose();
    router.push(url);

    setIsLoading(false);

  }

  const actionLabel = useMemo(() => {
    if(step === STEPS.INFO) {
      return 'Search'
    }

    return 'Next'
  }, [step])

  const secActionLabel = useMemo(() => {
    if(step === STEPS.LOCATION) {
      return undefined
    }

    return 'Back'
  }, [step])

  let bodyContent = (
    <div className="flex flex-col gap-8 px-6">
      <Heading
        title='A donde desea ir?'
        subtitle='Elija el destino que prefiera'
      /> 
      <CountrySelect 
        value={searchValues.location}
        onChange={(value) => 
          onChangeSearch('location', value)}
      />
      <Map
        center={searchValues.location?.latlng}
        draggable={false}
        allowClick={false}
        zoom={4}
      />
    </div>
  )

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-5 px-6">
        <Heading
          title="Para que fechas es la estadia?"
          subtitle="Elija el rango de fechas"
        />
        <div className="flex flex-row justify-center">
          <Calendar
            onChange={(value) => onChangeSearch('dateRange', value.selection)}
            value={searchValues.dateRange}
          />
        </div>
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8 px-6">
        <Heading
          title="Cuantos huespedes viajaran?"
          subtitle="Selecciona el valor"
        />
        <div className="flex flex-row justify-center">
          <Counter 
            onChange={(value) => onChangeSearch('huespedes', value)}
            value={searchValues.huespedes}
            minValue={1}
            maxValue={6}
          />
        </div>
      </div>
    )
  }


  return (
    <Modal 
      title='Search'
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      disabled={isLoading}
      onSubmit={onSubmit}
      actionLabel={actionLabel}
      secLabel={secActionLabel}
      secAction={onBack}
      body={bodyContent}
    />
  )
}
