'use client'

import { Container } from "@/app/components/Container"
import { useRouter } from 'next/navigation'
import useQueryParams from "@/app/hooks/useQueryParams"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { Input } from "@/app/components/inputs/Input"
import { useMemo, useState } from "react"
import { ImageUpload } from "@/app/components/inputs/ImageUpload"
import { Counter } from "@/app/components/inputs/Counter"
import { SelectGrid } from "@/app/components/inputs/SelectGrid"
import { servicios as serv } from '@/app/(home)/propiedad/[propiedad_id]/servicios'
import { Heading } from "@/app/components/Heading"
import dynamic from "next/dynamic"
import useLocation from "@/app/hooks/useLocation"
import { Button } from "@/app/components/Button"
import axios from "axios"
import toast from 'react-hot-toast'
import { User } from "@prisma/client"


// reservations?: SafeReservation[];
//http://localhost:3000/search?ubicacion=Italia&fecha_inicio=2023-01-01&fecha_salida=2023-01-10&huespedes=2&ambientes=1&rangeValues=22,165&serviciosSelected=Wifi,Estacionamiento

const errorsMsg = {
  title: 'Se requiere un titulo',
  description: 'Se requiere un descripcion',
  location: 'Se require la ubicacion del lugar',
  image_propiedad: 'Se requiere una imagen',
  precio_noche: 'Se requiere el precio',
  cant_ambientes: '',
  max_personas: '',
  servicios: "Se requiere seleccionar al menos un servicio"
}

interface PropiedadCreateClientProps {
  currentUser?: any
}

export const PropiedadCreateClient: React.FC<PropiedadCreateClientProps> = ({
  currentUser
}) => {
  const router = useRouter()
  const { searchParams, pathname } = useQueryParams()
  const [isLoading, setIsLoading] = useState(false)

  const servicios = serv.map(v => ({value: v.servicio, icon: v.icon}))
  console.log({currentUser})

  const Map = useMemo(() => dynamic(() => import('../../../components/map/Map'), { 
    ssr: false 
  }), []);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: {
      errors, 
    },
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      description: '',
      location: '',
      image_propiedad: '',
      precio_noche: '',
      cant_ambientes: 1,
      max_personas: 1,
      servicios: []
    }
  })

  const values = getValues()

  const onChangeForm = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }

  // console.log(errors)

  const { locationDesc, displayName } = useLocation(values.location)

  // ## Para obtener city y address
  const city_address = useMemo(() => {
    if(!locationDesc?.city) return 
    
    let res = `${locationDesc?.city}, `
    if(locationDesc?.city2 !== '')
      res = res + locationDesc?.city2 + ', '
    
    res = res + `${locationDesc?.road}, ${locationDesc?.house_number}`

    return res

  }, [locationDesc])


  console.log({loc: values.location})

  const onSubmit: SubmitHandler<FieldValues> = async(data) => {
    setIsLoading(true);

    //# Validate Values
    if(data.location === '' ||
      data.image_propiedad === '' ||
      data.servicios.length === 0
    ) {
      return toast.error("1. Falta seleccionar algunos campos")
    }
    

    //# Image
    const dataImage = new FormData()
    dataImage.append('file', data.image_propiedad)
    dataImage.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string)
    dataImage.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string)
    dataImage.append('folder', 'viviendas')


    let secure_url = ''
    try {
      const res = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, dataImage)

      secure_url = res.data.secure_url

      //console.log({cloud: res})
      
    } catch (error) {
      console.log({cloud: error})
    }


    
    const dataPropiedad = {
      title: data.title,
      description: data.description,
      ubicacion: displayName,
      location_code: data.location.join(', '),
      cant_ambientes: +data.cant_ambientes,
      image_propiedad: secure_url,
      max_personas: +data.max_personas,
      precio_noche: +data.precio_noche,
      userId: currentUser.id,
      estado_propiedadId: 1,
      servicios: data.servicios
    }

    console.log({dataPropiedad})
    try {
      await axios.post('/api/propiedades', dataPropiedad)

      toast.success('Nueva Propiedad Creada!')
      

    } catch (error) {
      toast.error('Error: No se pudo sibir la propiedad')
    }

    
    setIsLoading(false);
  }

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
          Sube una nueva Propiedad
        </div>
      </div>

      <div className="flex flex-col gap-3 --pr-32">
        <div className="flex flex-col gap-3">
          <Heading
            title="Titulo"
          />
          <Input
            id="title"
            label="Title"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          
        </div>
        <div className="flex flex-col gap-3">
          <Heading
            title="Imagen de Propiedad"
          />
          <ImageUpload 
            onChange={({file}) => onChangeForm('image_propiedad', file)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <Heading
            title="Descripcion"
          />
          <Input
            id="description"
            type="multiple"
            label="Description"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <Heading
              title="Precio por noche"
            />
            <Input
              id="precio_noche"
              label="Precio"
              type="price"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
          </div>
          <div className="flex flex-col gap-3">
            <Heading
              title="Ambientes"
            />
            <Counter
              minValue={1}
              maxValue={10}
              value={values.cant_ambientes}
              onChange={(value) => onChangeForm('cant_ambientes', value)}
            /> 
          </div>
          <div className="flex flex-col gap-3">
            <Heading
              title="Huespedes"
            />
            <Counter
              minValue={1}
              maxValue={6}
              value={values.max_personas}
              onChange={(value) => onChangeForm('max_personas', value)}
            /> 
          </div>
        </div>

        <div className="flex flex-col gap-5 mt-3">
          <Heading
            title="Servicios"
          />
          <div className="flex flex-row justify-center">
            <div className="w-[80%]">
              <SelectGrid
                values={servicios}
                selected={values.servicios}
                onClick={(value) => onChangeForm('servicios', value)}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <Heading
            title="Ubicacion"
          />
          <div className="
            flex flex-col
            border-l-[5px] border-black 
            bg-neutral-50
            p-4
          ">
            {!locationDesc?.country ? (
              <div className="font-bold">
                Marque un lugar
              </div>
            ) : (
              <>
                <div>
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
                {
                  city_address ? 
                  <div>
                    <span className="text-base font-light text-neutral-800">
                      {city_address}
                    </span>
                  </div> : null
                }
                
              </>
            )}
          </div>
          <Map
            onPickLocation={(value) => {onChangeForm('location', value.latlng)}}
            className="h-[50vh] rounded-lg"
          />
        </div>

        <div className="grid grid-cols-2 my-8">
          <div className=""></div>
          <Button
            label="Publicar"
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
          />
        </div>



      </div>

  </div>
  )
}