import prisma from '@/app/libs/prismadb'

interface IParams {
  hostId?: number
}

export default async function getPropiedadesByHost(
  params: IParams
) {
  try {

    const { hostId } = params

    if(!hostId) return 

    let propiedades: any = await prisma.propiedad.findMany({
      where: {
        id_user: hostId
      },
      include: {
        images_propiedad: true,
        servicios: true,
        estado_propiedad: true,
        user: true
      }
    })

    propiedades = propiedades
    .map((p: any) => {
      const prop = {
        ...p,
        precio_noche: +p.precio_noche,
        image_propiedad: p.images_propiedad[0].image,
        servicios: p.servicios.map((p: any) => p.servicio),
        estado_propiedad: p.estado_propiedad.estado,
      }

      delete prop.id_user
      delete prop.id_estado_propiedad
      delete prop.images_propiedad
      
      return prop
    })

    
    return propiedades
    
  } catch (error: any) {
    throw new Error(error)
  }
}