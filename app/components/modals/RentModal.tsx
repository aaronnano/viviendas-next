'use client'
import { useRentModal } from '@/app/hooks/useRentModal'
import { Modal } from './Modal'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Heading } from '../Heading'
import { categories } from '../navbar/Categories'
import { CategoryInput } from '../inputs/CategoryInput'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { CountrySelect } from '../inputs/CountrySelect'
import dynamic from 'next/dynamic'
import { Counter } from '../inputs/Counter'
import { ImageUploadCld } from '../inputs/ImageUploadCld'
import { Input } from '../inputs/Input'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import useLocation from '@/app/hooks/useLocation'

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

export const RentModal = () => {
  const rentModal = useRentModal()
  const [step, setStep] = useState(STEPS.CATEGORY)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: '',
      guestCount: 1,
      roomCount: 1,
      bathCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: ''
    }
  })

  const category = watch('category')
  const location = getValues().location
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathCount = watch('bathCount');
  const imageSrc = watch('imageSrc');

  console.log({location})

  const { locationDesc } = useLocation(location)

  let city_address = `${locationDesc?.city}, `

  if(locationDesc?.city2 !== '')
    city_address = city_address + locationDesc?.city2 + ', '
  
  city_address = city_address + `${locationDesc?.road}, ${locationDesc?.house_number}`

  //Chile, Santiago Metropolitan Region, Provincia de Santiago, Conchalí, Alberto González, 3275
  //Uruguay, Colonia, Colonia del Sacramento, Barrio Histórico, Avenida Aparicio Saravia, 896",
  const Map = useMemo(() => dynamic(() => import('../map/Map'), { 
    ssr: false 
  }), []); // [location]

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }

  const onBack = () => {
    setStep(v => v - 1)
  }
  const onNext = () => {
    setStep(v => v + 1)
  }

  const onSubmit: SubmitHandler<FieldValues> = async(data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }
    
    setIsLoading(true);

    try {
      await axios.post('/api/listings', data)
      toast.success('Listing created!');
      router.refresh();
      reset();
      setStep(STEPS.CATEGORY)
      rentModal.onClose();  

    } catch (error) {
      toast.error('Something went wrong.');
    }

    setIsLoading(false);

  }

  const actionLabel = useMemo(() => {
    if(step === STEPS.PRICE) {
      return 'Create'
    }

    return 'Next'
  }, [step])

  const secActionLabel = useMemo(() => {
    if(step === STEPS.CATEGORY) {
      return undefined
    }

    return 'Back'
  }, [step])

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title='Which best describes your place'
        subtitle='Pick a category'
      /> 
      <div className="
        grid
        grid-cols-2
        gap-3
        max-h-[50vh]
        overflow-y-auto
      ">
        {categories.map((item) => (
            <div key={item.label} >
              <CategoryInput
                onClick={(category) => 
                  setCustomValue('category', category)}
                selected={category === item.label}
                icon={item.icon}
                label={item.label}
              />
            </div>
        ))}
      </div>
    </div>
  )

  if(step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title='Cual es la ubicacion?'
        />
        
        {!locationDesc?.country ? (
          <div className="flex flex-col justify-center items-center py-3 border border-black border-[2] rounded-md">
            <div className="text-md">
              Empty
            </div>
          </div>
        ) : (
        <div className="flex flex-col px-3 py-3 border border-black border-[2] rounded-md">
          <div className="">
            <span className="text-xl">
              {locationDesc?.country},&nbsp;
            </span>
            <span className="text-base">
              {locationDesc?.state},&nbsp;
            </span>
            <span className="text-base">
              {locationDesc?.state_district}
            </span>
          </div>
          <div className="">
            <span className="text-base font-light text-neutral-800">
              {city_address}
            </span>
          </div>
        </div>
        )}
        
        <Map
          onPickLocation={(value) => {setCustomValue('location', value.latlng)}}
        />
      </div>
    )
  }

  if(step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
      <Heading
        title='Share some basics about your place'
        subtitle='What amenities do you have'
      />
      <Counter
        onChange={(value) => setCustomValue('guestCount', value)}      
        title="Guests" 
        subtitle="How many guests do you allow?"
        value={guestCount}
      />
      <hr />
      <Counter 
        onChange={(value) => setCustomValue('roomCount', value)}
        value={roomCount}
        title="Rooms" 
        subtitle="How many rooms do you have?"
      />
      <hr />
      <Counter 
        onChange={(value) => setCustomValue('bathCount', value)}
        value={bathCount}
        title="Bathrooms" 
        subtitle="How many bathrooms do you have?"
      />
      </div>
    )
  }

  if(step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like"
        />
        <ImageUploadCld
          value={imageSrc}
          onChange={(value) => setCustomValue('imageSrc', value)}
        />
      </div>
    )
  }

  if(step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title='How would you describe your place'
          subtitle='Short and sweet works best'
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

      </div>
    )
  }

  if(step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle='How mucho do you charge per night'
        />
        <Input
          id="price"
          label="Price"
          type="price"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }

  return (
    <Modal 
      title='Airbnb home'
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secLabel={secActionLabel}
      secAction={secActionLabel ? onBack : undefined}
      body={bodyContent}
    />
  )
}
