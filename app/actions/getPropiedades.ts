import prisma from '@/app/libs/prismadb'

interface IParams {
  ubicacion: string
  fecha_inicio: string
  fecha_salida: string
  huespedes: number
}

export default async function getPropiedades(
  params: IParams
) {
  try {

    const {
      ubicacion,
      fecha_inicio,
      fecha_salida,
      huespedes
    } = params

    let query: any = {}

    const propiedades = await prisma.propiedad.findMany({
      where: {
        id_estado_propiedad: 1,
        NOT: {
          reservas: {
            some: {
              OR: [
                {
                  start_date: { lte: new Date(fecha_inicio) },
                  end_date: { gte: new Date(fecha_inicio)  }
                },
                {
                  start_date: { lte: new Date(fecha_salida) },
                  end_date: { gte: new Date(fecha_salida)  }
                }
              ]
            }
          }
        }
      },
      include: {
        images_propiedad: true,
        servicios: true,
        estado_propiedad: true,
        user: true
      }
    })

    let propiedadesFiltered: any = propiedades
      .filter(p => p.ubicacion.split(', ')[0] === ubicacion && p.max_personas >= huespedes)
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

    
    
    return propiedadesFiltered
    
  } catch (error: any) {
    throw new Error(error)
  }
}