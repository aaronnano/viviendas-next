import { PrismaClient } from '@prisma/client'
import data from './data.json'
import { propiedades } from './propiedades'
const prisma = new PrismaClient()

/* Data seeding */
const load = async () => {
  try {
    
    
    // // #### Servicios ####
    // await prisma.servicio.createMany({
    //     data: data.servicios.map((item => ({ servicio: item })))
    // })
    
    // // #### Tipo_usuario ####
    // await prisma.tipo_usuario.createMany({
    //     data: data.tipo_usuario.map((item => ({ tipo_usuario: item })))
    // })
    
    // // #### estado_reservas ####
    // await prisma.estado_reserva.createMany({
    //     data: data.estados_reserva.map((item => ({ estado: item })))
    // })
    
    // // #### estado_reclamo ####
    // await prisma.estado_reclamo.createMany({
    //     data: data.estados_reclamo.map((item => ({ estado: item })))
    // })

    // // #### estado_propiedad ####
    // await prisma.estado_propiedad.createMany({
    //     data: data.estados_propiedad.map((item => ({ estado: item })))
    // })

    // #### Propiedades ####
    // await prisma.propiedad.createMany({
    //   data: propiedades.map(p => ({
    //     title: p.title,
    //     description: p.description,
    //     ubicacion: p.ubicacion,
    //     location_code: p.location_code,
    //     cant_ambientes: p.cant_ambientes,
    //     max_personas: p.max_personas,
    //     precio_noche: p.precio_noche,    
    //     id_estado_propiedad: 1,
    //     id_user: p.user.id
    //   }))
    // })

    // ### Propiedad_image
    // propiedades.map(async p => {
    //   await prisma.image_propiedad.create({
    //     data: {
    //       image: p.image_propiedad,
    //       id_propiedad: p.id
    //     }
    //   })

    // })


    
    // // ### Propiedad_Servicios
    const servicios = await prisma.servicio.findMany({})

    propiedades.map(async p => {
      const res = servicios.filter(item => p.servicios.includes(item.servicio))

      await prisma.propiedad.update({
        where: {
          id: p.id
        },
        data: {
          servicios: {
            connect: res.map(item => ({id: item.id}))
          } 
        }
      })
    })




    console.log('Seeding ends successfully!')

  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}


load()