import getCurrentUser from '@/app/actions/getCurrentUser';
import getPropiedadesByHost from '@/app/actions/getPropiedadesByHost';
import { Container } from '@/app/components/Container';
import { EmptyState } from '@/app/components/EmptyState';
import { PropiedadAllClient } from './PropiedadAllClient';
// import { PropiedadClient } from './PropiedadClient';

interface IParams {
}

export default async function PropiedadAllPage ({
}) {

  const currentUser = await getCurrentUser()

  const propiedades = await getPropiedadesByHost({
    hostId: currentUser?.id
  })

  return (
    <Container>
      <div className="
        pt-28
        lg:max-w-screen-lg
        2xl:max-w-screen-xl
        mx-auto
      ">
        <PropiedadAllClient
          propiedades={propiedades}
        />
      
      </div>

    </Container>
  )
}