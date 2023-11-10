import getPropiedades from '@/app/actions/getPropiedades';
import { EmptyState } from '@/app/components/EmptyState';
import { SearchClient } from './SearchClient';
// import { PropiedadClient } from './PropiedadClient';

interface IParams {
}

export default async function SearchPage (
{ 
  params,
  searchParams
}: { 
  params: IParams,
  searchParams?: { [key: string]: string | string[] | undefined }; 
}) {

  console.log({searchParams})

  if(!searchParams?.ubicacion || !searchParams?.fecha_inicio || !searchParams?.fecha_salida || !searchParams?.huespedes){
    return (
      <EmptyState
        title="No has iniciado a una busqueda"
        subtitle="Empieza con una nueva!"
        redirect='/'
        // redirect='/search?ubicacion=Italia&fecha_inicio=2023-01-01&fecha_salida=2023-01-10&huespedes=2'
      />
    )
  }

  const propiedades = await getPropiedades({
    ubicacion: searchParams.ubicacion as string,
    huespedes: +searchParams.huespedes,
    fecha_inicio: searchParams.fecha_inicio as string,
    fecha_salida: searchParams.fecha_salida as string
  })

  console.log({propiedades})
  // console.log({propiedades[0]})

  return (
    <SearchClient
      propiedades={propiedades}
    />
    
  )
}