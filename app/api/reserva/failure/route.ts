import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import mp from "@/app/libs/mercadopago_config";

const { HOST } = process.env

export async function GET(
  request: Request,
) {
//   const currentUser = await getCurrentUser();
  
//   if (!currentUser) {
//     return NextResponse.error();
//   }

  const { searchParams } = new URL(request.url);
  
  console.log('failure')
  console.log({urL: request.url})


  return NextResponse.json("Mercado");

}