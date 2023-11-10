import prisma from '@/app/libs/prismadb'
import { format } from 'date-fns'

interface IParams {
  userId?: number
}

export default async function getReservasByUser(
  params: IParams
) {
  try {

    const { userId } = params
    let query: any = {}

    let reservas: any = await prisma.reserva.findMany({
      where: {
        NOT: {
          id_estado_reserva: 4
        },
        id_user: userId
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
        start_date: format(res.start_date, 'yyyy-MM-dd'),
        end_date: format(res.end_date, 'yyyy-MM-dd'),
        estado_reserva: res.estado_reserva.estado,
        propiedad: {
          ...res.propiedad,
          servicios: res.propiedad.servicios.map((p: any) => p.servicio),
          image_propiedad: res.propiedad.images_propiedad[0].image,
        }
      }

      delete item.id_user
      delete item.id_estado_reserva
      
      return item
    })

    
    
    return reservas
    
  } catch (error: any) {
    throw new Error(error)
  }
}