import prisma from '@/app/libs/prismadb'

interface IParams {
  id?: string
}

export default async function getPropiedadById(
  params: IParams
) {
  try {

    const { id } = params
    if(!id) return 

    let propiedad: any = await prisma.propiedad.findUnique({
      where: {
        id: +id,
      },
      include: {
        images_propiedad: true,
        servicios: true,
        estado_propiedad: true,
        user: true
      }
    })

    
    propiedad = {
      ...propiedad,
      precio_noche: +propiedad.precio_noche,
      image_propiedad: propiedad.images_propiedad[0].image,
      servicios: propiedad.servicios.map((p: any) => p.servicio),
      estado_propiedad: propiedad.estado_propiedad.estado,
    }

    delete propiedad.id_user
    delete propiedad.id_estado_propiedad
    delete propiedad.images_propiedad

    
    return propiedad
    
  } catch (error: any) {
    throw new Error(error)
  }
}