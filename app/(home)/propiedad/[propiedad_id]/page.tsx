import getCurrentUser from '@/app/actions/getCurrentUser';
import getPropiedadById from '@/app/actions/getPropiedadById';
import getReservationsByPropiedad from '@/app/actions/getReservationsByPropiedad';
import { propiedades } from '@/prisma/propiedades';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { Container } from '../../../components/Container'
import { PropiedadClient } from './PropiedadClient';

interface IParams {
  propiedad_id?: string
}

export default async function PropiedadPage (
{ 
  params,
  searchParams
}: { 
  params: IParams,
  searchParams?: { [key: string]: string | string[] | undefined }; 
}) {

  if(!params.propiedad_id) {
    return null
  }

  const currentUser = await getCurrentUser()
  const propiedad = await getPropiedadById({ id: params.propiedad_id })
  const reservas = await getReservationsByPropiedad({ propiedadId: propiedad.id })

  console.log({reservas})

  // Funciona para Invitado y Cliente
  if(propiedad.estado_propiedad === 'Oculto' && propiedad.user.id !== currentUser?.id) {
    console.log('Tuki')
    return redirect('/')
  }
  
  // const propiedad = propiedades[parseInt(params.propiedad_id)-1]

  return (
    <PropiedadClient
      propiedad={propiedad}
      reservas={reservas}
      currentUser={currentUser}
    />
  )
}