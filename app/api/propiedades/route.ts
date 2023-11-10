import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
  request: Request, 
) {
  const currentUser = await getCurrentUser();
  
  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json()
  const {
    title,
    description,
    ubicacion,
    location_code,
    cant_ambientes,
    image_propiedad,
    max_personas,
    precio_noche,
    userId,
    estado_propiedadId,
    servicios
  } = body

  let serviciosDB = await prisma.servicio.findMany({})
  const res = serviciosDB.filter(item => servicios.includes(item.servicio)).map(item => ({id: item.id}))

  const propiedad = await prisma.propiedad.create({
    data: {
      title,
      description,
      ubicacion,
      location_code,
      cant_ambientes,
      max_personas,
      precio_noche,
      id_user: userId,
      id_estado_propiedad: estado_propiedadId,
      images_propiedad: {
        create: {
          image: image_propiedad
        }
      },
      servicios: {
        connect: res
      }
    }
  })

  return NextResponse.json(propiedad);
}