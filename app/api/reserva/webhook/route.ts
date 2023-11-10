import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import mp from "@/app/libs/mercadopago_config";

const { HOST } = process.env

export async function POST(
  request: Request,
) {
//   const currentUser = await getCurrentUser();
  
//   if (!currentUser) {
//     return NextResponse.error();
//   }

  console.log('# Webhook')
  const { searchParams } = new URL(request.url);
  
  const id = searchParams.get('data.id') as string
  const type = searchParams.get('type')

  console.log({id, type})
  if(type !== 'payment') {
    return new Response(null, { status: 204 })
  }

  const data = await mp.payment.findById(+id)
  const order = data.body.order

  const merch_order = await mp.merchant_orders.findById(order.id)

  const item = merch_order.body.items[0]

  // # Confirm Reserva  #
  await prisma.reserva.update({
    where: {
      id: +item.id,
    },
    data: {
      id_estado_reserva: 1
    }
  })

  return new Response(null, { status: 204 })

}