import getCurrentUser from '@/app/actions/getCurrentUser';
import { Container } from '@/app/components/Container';
import { EmptyState } from '@/app/components/EmptyState';
import { PropiedadCreateClient } from './PropiedadCreateClient';
// import { PropiedadClient } from './PropiedadClient';

interface IParams {
}

export default async function PropiedadCreatePage ({
}) {

  const currentUser = await getCurrentUser()
  
  

  return (
    <Container>
      <div className="
        pt-28
        lg:max-w-screen-lg
        --2xl:max-w-screen-xl
        mx-auto
      ">
        <PropiedadCreateClient
          currentUser={currentUser}
        />
      
      </div>

    </Container>
  )
}