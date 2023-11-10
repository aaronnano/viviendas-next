import getCurrentUser from '@/app/actions/getCurrentUser';
import { Container } from '@/app/components/Container';
import { EmptyState } from '@/app/components/EmptyState';
import { headers } from 'next/headers';
import { ReservasClient } from './ReservasClient';
import { redirect } from "next/navigation"
import getReservasByUser from '@/app/actions/getReservasByUser';

// import { PropiedadClient } from './PropiedadClient';

interface IParams {
}

export default async function ReservasPage ({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined }; 
}) {

  const currentUser = await getCurrentUser()
  const reservas = await getReservasByUser({ userId: currentUser?.id})
  const pathname = headers().get('x-pathname')

  if(Object.keys(searchParams as any).length !== 0) {
    return redirect(pathname as string)
  }

  if(!currentUser) {
    return redirect('/')
  }


  return (
    <Container>
      <div className="
        pt-28
        lg:max-w-screen-lg
        2xl:max-w-screen-xl
        mx-auto
      ">
        <ReservasClient
          reservas={reservas}
        />
      
      </div>

    </Container>
  )
}