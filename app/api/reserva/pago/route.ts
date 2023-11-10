import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import mp from "@/app/libs/mercadopago_config";
// import { Preference } from 'mercadopago'

const { MPAGO_HOST } = process.env

export async function POST(
  request: Request, 
) {
  const currentUser = await getCurrentUser();
  
  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json()
  console.log({body})


  // # Reserva Creation #
  const reserva = await prisma.reserva.create({
    data: {
      start_date: new Date(body.startDate),
      end_date: new Date(body.endDate),
      huespedes: body.huespedes,
      pago_total: body.pago_total,
      id_propiedad: body.propiedad.id,
      id_user: currentUser.id,
      id_estado_reserva: 4
    }
  })

  const res = await mp.preferences.create({
    items: [ 
      {
        id: `${reserva.id}`,
        title: body.propiedad.title,
        quantity: 1,
        currency_id: "ARS",
        unit_price: body.pago_total,
        
      }
    ],
    notification_url: MPAGO_HOST + '/api/reserva/webhook',
    back_urls: {
      success: MPAGO_HOST + '/reservas',
      failure: MPAGO_HOST + '/api/reserva/failure',
      
    }
  })

  // console.log({host: p})
  // console.log({res})

  return NextResponse.json(res);

}