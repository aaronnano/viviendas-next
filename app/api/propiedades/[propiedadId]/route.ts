import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  propiedadId?: string;
}

export async function POST(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();
  
  if (!currentUser) {
    return NextResponse.error();
  }

  const { propiedadId } = params
  if(!propiedadId) return

  const body = await request.json()
  const {
    estado_propiedad
  } = body


  let data: any = await prisma.propiedad.update({
    where: {
      id: +propiedadId
    },
    data: {
      id_estado_propiedad: estado_propiedad === 'Visible' ? 2 : 1
    },
    include: {
      estado_propiedad: true
    }
  })

  data.estado_propiedad = data.estado_propiedad.estado


  // let serviciosDB = await prisma.servicio.findMany({})
  // const res = serviciosDB.filter(item => servicios.includes(item.servicio)).map(item => ({id: item.id}))

  // const propiedad = await prisma.propiedad.create({
  //   data: {
  //     title,
  //     description,
  //     ubicacion,
  //     location_code,
  //     cant_ambientes,
  //     max_personas,
  //     precio_noche,
  //     id_user: userId,
  //     id_estado_propiedad: estado_propiedadId,
  //     images_propiedad: {
  //       create: {
  //         image: image_propiedad
  //       }
  //     },
  //     servicios: {
  //       connect: res
  //     }
  //   }
  // })

  return NextResponse.json(data);
}

export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {

  const currentUser = await getCurrentUser();
  
  if (!currentUser) {
    return NextResponse.error();
  }

  const { propiedadId } = params
  if(!propiedadId) return

  // return NextResponse.json();
}