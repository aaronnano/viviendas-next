import prisma from '@/app/libs/prismadb'
import { format, formatISO, addDays } from 'date-fns'

interface IParams {
  propiedadId?: number
}

export default async function getReservationsByPropiedad(
  params: IParams
) {
  try {

    const { propiedadId } = params
    let query: any = {}

    let reservas: any = await prisma.reserva.findMany({
      where: {
        NOT: {
          id_estado_reserva: 4
        },
        id_propiedad: propiedadId
      },
      include: {
        estado_reserva: true,
        propiedad: {
          include: {
            servicios: true,
            images_propiedad: true,
          }
        },
      }
    })
      
    reservas = reservas.map((res: any) => {
      const item = {
        ...res,
        pago_total: +res.pago_total,
        start_date: format(addDays(res.start_date, 1), 'yyyy-MM-dd'),
        end_date: format(addDays(res.end_date,1), 'yyyy-MM-dd'),
        estado_reserva: res.estado_reserva.estado,
        propiedad: {
          ...res.propiedad,
          servicios: res.propiedad.servicios.map((p: any) => p.servicio),
          image_propiedad: res.propiedad.images_propiedad[0].image,
        }
      }
      delete item.propiedad.precio_noche
      delete item.id_user
      delete item.id_estado_reserva
      
      return item
    })

  
  
  return reservas
    
  } catch (error: any) {
    throw new Error(error)
  }
}