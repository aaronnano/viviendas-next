import data from './data.json'

const { servicios } = data

export const propiedades = [
    {
        id: 1,
        title: "Finca Hoton",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque minus maxime hic placeat iste, consectetur praesentium molestiae cumque in aut culpa nulla eum voluptatem officiis reprehenderit recusandae expedita odit corrupti! Nisi dolorum suscipit accusamus magnam quos in officiis delectus? At soluta error hic dolore sint quasi nisi accusantium ducimus ad provident mollitia voluptatibus, id illum illo! Consequatur dolorem laudantium ipsa!",
        ubicacion: "Uruguay, Colonia, Colonia del Sacramento, Barrio Histórico, Avenida Aparicio Saravia, 896",
        location_code: "-34.4562522, -57.8392277",
        cant_ambientes: 3,
        max_personas: 2,
        precio_noche: 100.45,
        user: {
            id: 1,
            fullname: "Olivia",
            image: ""
        },
        estado_propiedad: "Visible",
        servicios: ["Wifi", "Desayuno", "Estacionamiento"],
        image_propiedad: "https://res.cloudinary.com/dv6hd68lo/image/upload/v1698934578/viviendas/pt5fnzzb9odz6upjd1vu.jpg"
    },
    {
        id: 2,
        title: "Abbey Cottage",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque minus maxime hic placeat iste, consectetur praesentium molestiae cumque in aut culpa nulla eum voluptatem officiis reprehenderit recusandae expedita odit corrupti! Nisi dolorum suscipit accusamus magnam quos in officiis delectus? At soluta error hic dolore sint quasi nisi accusantium ducimus ad provident mollitia voluptatibus, id illum illo! Consequatur dolorem laudantium ipsa!",
        ubicacion: "Chile, Santiago Metropolitan Region, Provincia de Santiago, Conchalí, Alberto González, 3275",
        location_code: "-33.395508, -70.665023",
        cant_ambientes: 1,
        max_personas: 2,
        precio_noche: 51.12,
        user: {
            id: 1,
            fullname: "Olivia",
            image: ""
        },
        estado_propiedad: "Visible",
        servicios: ["Wifi", "Estacionamiento", "Aire acondicionado", "Pileta"],
        image_propiedad: "https://res.cloudinary.com/dv6hd68lo/image/upload/v1698934576/viviendas/it44bldty9pj9nessfh4.webp"
    },
    {
        id: 3,
        title: "Rose Villa",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque minus maxime hic placeat iste, consectetur praesentium molestiae cumque in aut culpa nulla eum voluptatem officiis reprehenderit recusandae expedita odit corrupti! Nisi dolorum suscipit accusamus magnam quos in officiis delectus? At soluta error hic dolore sint quasi nisi accusantium ducimus ad provident mollitia voluptatibus, id illum illo! Consequatur dolorem laudantium ipsa!",
        ubicacion: "Sweden, Gävleborg County, Gävle kommun, Gävle, Villastan, Runebergsvägen, 2",
        location_code: "60.671184, 17.130517",
        cant_ambientes: 1,
        max_personas: 6,
        precio_noche: 122.10,
        user: {
            id: 2,
            fullname: "Jose",
            image: ""
        },
        estado_propiedad: "Visible",
        servicios: ["Desayuno", "Estacionamiento", "Ascensor", "Permite Mascotas"],
        image_propiedad: "https://res.cloudinary.com/dv6hd68lo/image/upload/v1698934576/viviendas/x10xicedhmw4epqaewbd.jpg"
    },
    {
        id: 4,
        title: "Driftwood Villa",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque minus maxime hic placeat iste, consectetur praesentium molestiae cumque in aut culpa nulla eum voluptatem officiis reprehenderit recusandae expedita odit corrupti! Nisi dolorum suscipit accusamus magnam quos in officiis delectus? At soluta error hic dolore sint quasi nisi accusantium ducimus ad provident mollitia voluptatibus, id illum illo! Consequatur dolorem laudantium ipsa!",
        ubicacion: "Sweden, Stockholm County, Solna kommun, Stockholm, Tegnérgatan, 12",
        location_code: "59.34000, 18.06165",
        cant_ambientes: 3,
        max_personas: 2,
        precio_noche: 30.70,
        user: {
            id: 2,
            fullname: "Jose",
            image: ""
        },
        estado_propiedad: "Visible",
        servicios: ["Wifi","Desayuno", "Aire acondicionado", "Pileta", "Permite Mascotas"],
        image_propiedad: "https://res.cloudinary.com/dv6hd68lo/image/upload/v1698934580/viviendas/dhawa0sunxtxcakgjccl.png"
    },
    {
        id: 5,
        title: "The Golden Grotto",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque minus maxime hic placeat iste, consectetur praesentium molestiae cumque in aut culpa nulla eum voluptatem officiis reprehenderit recusandae expedita odit corrupti! Nisi dolorum suscipit accusamus magnam quos in officiis delectus? At soluta error hic dolore sint quasi nisi accusantium ducimus ad provident mollitia voluptatibus, id illum illo! Consequatur dolorem laudantium ipsa!",
        ubicacion: "France, Metropolitan France, Ile-de-France, Paris, Passage Choiseul, 92",
        location_code: "48.86882, 2.33596",
        cant_ambientes: 2,
        max_personas: 2,
        precio_noche: 80.10,
        user: {
            id: 3,
            fullname: "Alicia",
            image: ""
        },
        estado_propiedad: "Visible",
        servicios: ["Wifi","Estacionamiento","Ascensor","Pileta"],
        image_propiedad: "https://res.cloudinary.com/dv6hd68lo/image/upload/v1698934576/viviendas/rcaqr0yujryc9kh60dpp.jpg"
    },
    {
        id: 6,
        title: "Willow Whimsy",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque minus maxime hic placeat iste, consectetur praesentium molestiae cumque in aut culpa nulla eum voluptatem officiis reprehenderit recusandae expedita odit corrupti! Nisi dolorum suscipit accusamus magnam quos in officiis delectus? At soluta error hic dolore sint quasi nisi accusantium ducimus ad provident mollitia voluptatibus, id illum illo! Consequatur dolorem laudantium ipsa!",
        ubicacion: "Germany, Berlin, Mitte, Friedrichswerder, Schützenstraße, 11",
        location_code: "52.508704, 13.39265",
        cant_ambientes: 2,
        max_personas: 2,
        precio_noche: 95.5,
        user: {
            id: 3,
            fullname: "Alicia",
            image: ""
        },
        estado_propiedad: "Visible",
        servicios: ["Desayuno","Aire acondicionado","Ascensor"],
        image_propiedad: "https://res.cloudinary.com/dv6hd68lo/image/upload/v1698934576/viviendas/vc4a1hv3hov2uww3qbl3.jpg"
    },
    {
        id: 7,
        title: "Fortunate Fields",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque minus maxime hic placeat iste, consectetur praesentium molestiae cumque in aut culpa nulla eum voluptatem officiis reprehenderit recusandae expedita odit corrupti! Nisi dolorum suscipit accusamus magnam quos in officiis delectus? At soluta error hic dolore sint quasi nisi accusantium ducimus ad provident mollitia voluptatibus, id illum illo! Consequatur dolorem laudantium ipsa!",
        ubicacion: "Italy, Veneto, Venezia, Venice, Via Giosuè Carducci, 53",
        location_code: "45.49179, 12.23688",
        cant_ambientes: 4,
        max_personas: 2,
        precio_noche: 190.00,
        user: {
            id: 2,
            fullname: "Jose",
            image: ""
        },
        estado_propiedad: "Visible",
        servicios: ["Wifi","Estacionamiento","Pileta"],
        image_propiedad: "https://res.cloudinary.com/dv6hd68lo/image/upload/v1698934578/viviendas/ubpa8vr6t6p5a5n095c0.png"
    },
    {
        id: 8,
        title: "Casa de Playa en Florianópolis, Brasil",
        description: "Esta hermosa casa de playa en Florianópolis ofrece una escapada perfecta a la costa. Con capacidad para 8 personas, es ideal para familias y grupos. La casa cuenta con una piscina privada y acceso directo a la playa. Disfruta del sol y las olas en tu puerta. ¡Reserva ahora y vive unas vacaciones inolvidables en Brasil!",
        ubicacion: "Brazil, Santa Catarina, Florianópolis, Avenida de la Playa, 456",
        location_code: "-27.584, -48.550",
        cant_ambientes: 5,
        max_personas: 8,
        precio_noche: 280.50,
        user: {
            id: 3,
            fullname: "Alicia",
            image: ""
        },
        estado_propiedad: "Visible",
        servicios: ["Wifi", "Pileta", "Permite Mascotas"],
        image_propiedad: "https://res.cloudinary.com/dv6hd68lo/image/upload/v1698932523/viviendas/zyx1itcyxtm4lt9txmwq.jpg"
    },
    {
        id: 9,
        title: "Piso en el Barrio Gótico de Barcelona",
        description: "Este encantador piso en el Barrio Gótico de Barcelona es ideal para explorar la historia y la cultura de la ciudad. Con capacidad para 3 personas, es perfecto para parejas o amigos. El piso cuenta con techos altos y una ubicación céntrica. ¡Reserva ahora y sumérgete en la magia del Barrio Gótico!",
        ubicacion: "Spain, Cataluña, Barcelona, Calle Histórica, 123",
        location_code: "41.382, 2.176",
        cant_ambientes: 2,
        max_personas: 3,
        precio_noche: 160.00,
        user: {
            id: 1,
            fullname: "Olivia",
            image: ""
        },
        estado_propiedad: "Visible",
        servicios: ["Wifi", "Aire acondicionado", "Acceso para personas con movilidad reducida"],
        image_propiedad: "https://res.cloudinary.com/dv6hd68lo/image/upload/v1698932524/viviendas/euzzknztvqxx89dzxpci.jpg"
    },
    {
        id: 10,
        title: "Hermosa Casa de Playa en Punta del Este",
        description: "Esta espaciosa casa de playa en Punta del Este es el lugar perfecto para unas vacaciones en la costa. Con capacidad para 6 personas, es ideal para familias o grupos de amigos. La casa cuenta con una piscina privada y acceso directo a la playa. Relájate en la terraza con vistas al mar y disfruta de todas las comodidades. ¡Reserva ahora y vive la experiencia de Punta del Este!",
        ubicacion: "Uruguay, Maldonado, Punta del Este, Calle Arena, 456",
        location_code: "-34.943, -54.949",
        cant_ambientes: 4,
        max_personas: 6,
        precio_noche: 250.75,
        user: {
            id: 2,
            fullname: "Jose",
            image: ""
        },
        estado_propiedad: "Visible",
        servicios: ["Wifi", "Pileta", "Permite Mascotas"],
        image_propiedad: "https://res.cloudinary.com/dv6hd68lo/image/upload/v1698932523/viviendas/cczopq35xdng4ajnmmhz.jpg"
        
    },
    {
        id: 11,
        title: "Hermosa Casa en la Playa de Copacabana",
        description: "Encantadora casa en primera línea de la famosa playa de Copacabana. Disfruta de la brisa del mar y las impresionantes vistas al océano. La propiedad cuenta con 5 habitaciones, piscina privada y acceso directo a la playa. ¡Reserva ahora y experimenta la auténtica vida carioca!",
        ubicacion: "Brazil, Río de Janeiro, Copacabana, Av. Atlántica, 1234",
        location_code: "-22.9695, -43.1827",
        cant_ambientes: 5,
        max_personas: 10,
        precio_noche: 350.00,
        user: {
            id: 1,
            fullname: "Olivia",
            image: ""
        },
        estado_propiedad: "Visible",
        servicios: ["Wifi", "Pileta", "Aire acondicionado"],
        image_propiedad: "https://res.cloudinary.com/dv6hd68lo/image/upload/v1698932524/viviendas/owtcgwjqijpvzrdv7afk.jpg"
    },
    {
        id: 12,
        title: "Apartamento de Lujo en Manhattan",
        description: "Exquisito apartamento en el corazón de Manhattan. Este lujoso alojamiento ofrece vistas panorámicas de la ciudad, 4 habitaciones, y acceso a todas las atracciones de Nueva York. Disfruta de una estancia inolvidable en la Gran Manzana.",
        ubicacion: "United States, Nueva York, Manhattan, 5th Avenue, 789",
        location_code: "40.7625, -73.9733",
        cant_ambientes: 4,
        max_personas: 8,
        precio_noche: 500.00,
        user: {
            id: 3,
            fullname: "Alicia",
            image: ""
        },
        estado_propiedad: "Visible",
        servicios: ["Wifi", "Gimnasio", "Conserje"],
        image_propiedad: "https://res.cloudinary.com/dv6hd68lo/image/upload/v1698932524/viviendas/fteb3v72orya3fuajmk8.jpg"
    },
    {
        id: 13,
        title: "Casa Rural en los Viñedos de Mendoza",
        description: "Disfruta de la tranquilidad del campo en una casa rural rodeada de viñedos en Mendoza. La propiedad cuenta con una bodega privada, 3 habitaciones y hermosas vistas a la montaña. Ideal para amantes del vino y la naturaleza.",
        ubicacion: "Argentina, Mendoza, Luján de Cuyo, Ruta del Vino, 456",
        location_code: "-32.9354, -68.8258",
        cant_ambientes: 3,
        max_personas: 6,
        precio_noche: 220.00,
        user: {
            id: 3,
            fullname: "Alicia",
            image: ""
        },
        estado_propiedad: "Visible",
        servicios: ["Wifi", "Piscina", "Tour de vinos"],
        image_propiedad: "https://res.cloudinary.com/dv6hd68lo/image/upload/v1698932524/viviendas/t4uvls48ozegibm8odkb.jpg"
    },
    {
        id: 14,
        title: "Piso Moderno en el Centro de Madrid",
        description: "Moderno piso en pleno centro de Madrid. Totalmente equipado con todas las comodidades. A pocos pasos de la Puerta del Sol y la Gran Vía. Ideal para explorar la capital española.",
        ubicacion: "Spain, Madrid, Centro, Calle Mayor, 567",
        location_code: "40.4167, -3.7042",
        cant_ambientes: 2,
        max_personas: 4,
        precio_noche: 160.00,
        user: {
            id: 1,
            fullname: "Olivia",
            image: ""
        },
        estado_propiedad: "Visible",
        servicios: ["Wifi", "Aire acondicionado", "Ascensor"],
        image_propiedad: "https://res.cloudinary.com/dv6hd68lo/image/upload/v1698932524/viviendas/sozzhxzz11mssokurd0e.jpg"
    },
    {
        id: 15,
        title: "Casa de Playa en Portugal",
        description: "Hermosa casa de playa en la costa de Algarve, Portugal. La propiedad ofrece acceso directo a la playa, 4 dormitorios y una terraza con vistas al mar. Disfruta del clima soleado de Portugal y la brisa del océano.",
        ubicacion: "Portugal, Algarve, Praia da Rocha, Rua da Praia, 123",
        location_code: "37.1181, -8.5351",
        cant_ambientes: 4,
        max_personas: 8,
        precio_noche: 280.00,
        user: {
            id: 2,
            fullname: "Jose",
            image: ""
        },
        estado_propiedad: "Visible",
        servicios: ["Wifi", "Pileta", "Estacionamiento"],
        image_propiedad: "https://res.cloudinary.com/dv6hd68lo/image/upload/v1698932524/viviendas/f8xmajcvt8ep9v3mogmp.jpg"
    },
    {
        id: 16,
        title: "Casa Histórica en Sevilla",
        description: "Encantadora casa histórica en el casco antiguo de Sevilla. La propiedad cuenta con un patio andaluz, 3 habitaciones y está a poca distancia de la Giralda y la Catedral. Vive la esencia de Sevilla en este alojamiento único.",
        ubicacion: "Spain, Sevilla, Casco Antiguo, Calle Tradicional, 456",
        location_code: "37.3886, -5.9835",
        cant_ambientes: 3,
        max_personas: 6,
        precio_noche: 190.00,
        user: {
            id: 2,
            fullname: "Jose",
            image: ""
        },
        estado_propiedad: "Visible",
        servicios: ["Wifi", "Patio Andaluz", "Calefacción"],
        image_propiedad: "https://res.cloudinary.com/dv6hd68lo/image/upload/v1698932524/viviendas/xxvlijbkhcobu8ewrqor.jpg"
    },
    {
        id: 17,
        title: "Apartamento en la Quinta Avenida de Nueva York",
        description: "Elegante apartamento en la Quinta Avenida de Nueva York con vistas a Central Park. La propiedad cuenta con 2 dormitorios, decoración de lujo y está cerca de las mejores tiendas y restaurantes de la ciudad.",
        ubicacion: "United States, Nueva York, Manhattan, Quinta Avenida, 789",
        location_code: "40.7653, -73.9718",
        cant_ambientes: 2,
        max_personas: 4,
        precio_noche: 400.00,
        user: {
            id: 2,
            fullname: "Jose",
            image: ""
        },
        estado_propiedad: "Visible",
        servicios: ["Wifi", "Aire acondicionado", "Gimnasio"],
        image_propiedad: "https://res.cloudinary.com/dv6hd68lo/image/upload/v1698932525/viviendas/bukinyf4h1v2jllagzwk.webp"
    },
    {
        id: 18,
        title: "Casa de Playa en Florianópolis, Brasil",
        description: "Encantadora casa de playa en la isla de Florianópolis, Brasil. Disfruta de días soleados en la playa, 3 habitaciones, y una piscina privada. ¡Reserva tu paraíso en la playa ahora!",
        ubicacion: "Brazil, Santa Catarina, Florianópolis, Praia Mole, 123",
        location_code: "-27.6093, -48.4425",
        cant_ambientes: 3,
        max_personas: 6,
        precio_noche: 220.00,
        user: {
            id: 1,
            fullname: "Olivia",
            image: ""
        },
        estado_propiedad: "Visible",
        servicios: ["Wifi", "Pileta", "Barbacoa"],
        image_propiedad: "https://res.cloudinary.com/dv6hd68lo/image/upload/v1698932525/viviendas/dxczwfynl5hmyf8zubts.jpg"
    },
    {
        id: 19,
        title: "Piso Elegante en París",
        description: "Elegante piso en el corazón de París, a pocos pasos de la Torre Eiffel y los Campos Elíseos. La propiedad ofrece 2 habitaciones, decoración refinada y una vista impresionante. Vive la experiencia parisina en este alojamiento de lujo.",
        ubicacion: "France, París, Torre Eiffel, Rue de la Paix, 567",
        location_code: "48.8597, 2.2994",
        cant_ambientes: 2,
        max_personas: 4,
        precio_noche: 300.00,
        user: {
            id: 3,
            fullname: "Alicia",
            image: ""
        },
        estado_propiedad: "Visible",
        servicios: ["Wifi", "Ascensor", "Concierge"],
        image_propiedad: "https://res.cloudinary.com/dv6hd68lo/image/upload/v1698932522/viviendas/ihey8ckszygc6kmewkvj.jpg"
    },
    {
        id: 20,
        title: "Apartamento en el Centro de Montevideo",
        description: "Amplio y luminoso apartamento en una ubicación céntrica en Montevideo. Este apartamento cuenta con todas las comodidades necesarias para una estancia cómoda. Con capacidad para 4 personas, es perfecto para familias o grupos de amigos que desean explorar la ciudad. La ubicación céntrica permite acceder fácilmente a restaurantes, tiendas y atracciones locales. El edificio cuenta con estacionamiento y acceso a Wi-Fi. ¡Reserva ya tu estancia inolvidable en Montevideo!",
        ubicacion: "Uruguay, Montevideo, Centro, Calle Ejemplo, 123",
        location_code: "-34.907, -56.203",
        cant_ambientes: 3,
        max_personas: 4,
        precio_noche: 180.00,
        user: {
            id: 3,
            fullname: "Alicia",
            image: ""
        },
        estado_propiedad: "Visible",
        servicios: ["Wifi", "Estacionamiento", "Aire acondicionado"],
        image_propiedad: "https://res.cloudinary.com/dv6hd68lo/image/upload/v1698932483/viviendas/j3tah1sb1g47w5ok1qpa.jpg"
    },
    {
        id: 21,
        title: "Piso en el Corazón de Barcelona",
        description: "Elegante piso en el corazón de Barcelona. Este moderno apartamento es ideal para una escapada romántica o una estancia de lujo en la ciudad. Con capacidad para 2 personas, ofrece comodidades como aire acondicionado y acceso a Wi-Fi. La ubicación en la famosa Rambla de Barcelona te permite explorar la ciudad a pie y disfrutar de la vibrante vida nocturna. ¡Reserva este encantador piso ahora y disfruta de Barcelona!",
        ubicacion: "Spain, Cataluña, Barcelona, Rambla, 123",
        location_code: "41.383, 2.176",
        cant_ambientes: 2,
        max_personas: 2,
        precio_noche: 200.00,
        user: {
            id: 3,
            fullname: "Alicia",
            image: ""
        },
        estado_propiedad: "Visible",
        servicios: ["Wifi", "Ascensor", "Acceso para personas con movilidad reducida"],
        image_propiedad: "https://res.cloudinary.com/dv6hd68lo/image/upload/v1698932523/viviendas/rc1963juhhrhb2w66fox.jpg"
    },
    {
        id: 22,
        title: "Apartamento en Providencia, Santiago",
        description: "Acogedor apartamento en la animada zona de Providencia en Santiago. Este apartamento es perfecto para explorar la ciudad y disfrutar de la vida nocturna local. Con capacidad para 3 personas, es ideal para parejas o amigos que buscan una estancia cómoda. El apartamento cuenta con acceso a Wi-Fi y estacionamiento. ¡Reserva ahora y descubre Santiago desde esta ubicación central!",
        ubicacion: "Chile, Santiago, Providencia, Calle Principal, 456",
        location_code: "-33.426, -70.616",
        cant_ambientes: 3,
        max_personas: 3,
        precio_noche: 150.00,
        user: {
            id: 1,
            fullname: "Olivia",
            image: ""
        },
        estado_propiedad: "Visible",
        servicios: ["Wifi", "Pileta", "Estacionamiento"],
        image_propiedad: "https://res.cloudinary.com/dv6hd68lo/image/upload/v1698932523/viviendas/jjy2pclvqqjvfj5x0weu.jpg"
    },
    {
        id: 23,
        title: "Apartamento con Vistas al Río de la Plata",
        description: "Este moderno apartamento en Buenos Aires ofrece vistas impresionantes al Río de la Plata. Con capacidad para 4 personas, es ideal para familias o amigos. El apartamento cuenta con una amplia terraza y acceso a Wi-Fi. Disfruta de las vistas y explora la ciudad desde esta ubicación privilegiada. ¡Reserva este apartamento ahora y vive una experiencia única en Buenos Aires!",
        ubicacion: "Argentina, Buenos Aires, Puerto Madero, Avenida del Río, 789",
        location_code: "-34.614, -58.363",
        cant_ambientes: 3,
        max_personas: 4,
        precio_noche: 220.00,
        user: {
            id: 2,
            fullname: "Jose",
            image: ""
        },
        estado_propiedad: "Visible",
        servicios: ["Wifi", "Estacionamiento", "Aire acondicionado"],
        image_propiedad: "https://res.cloudinary.com/dv6hd68lo/image/upload/v1698937287/viviendas/zsuue8znaawgkald7lod.avif"
    },
    {
        id: 24,
        title: "Apartamento con Vista al Mar en Barcelona",
        description: "Este elegante apartamento en Barcelona ofrece impresionantes vistas al mar. Con capacidad para 4 personas, es ideal para familias o grupos que buscan una estancia de lujo. El apartamento cuenta con aire acondicionado y acceso a Wi-Fi. Disfruta de la brisa del mar desde la terraza y explora las playas cercanas. ¡Reserva este apartamento de ensueño ahora!",
        ubicacion: "Spain, Cataluña, Barcelona, Paseo Marítimo, 789",
        location_code: "41.382, 2.191",
        cant_ambientes: 3,
        max_personas: 4,
        precio_noche: 300.00,
        user: {
            id: 2,
            fullname: "Jose",
            image: ""
        },
        estado_propiedad: "Visible",
        servicios: ["Wifi", "Aire acondicionado", "Estacionamiento"],
        image_propiedad: "https://res.cloudinary.com/dv6hd68lo/image/upload/v1698937281/viviendas/wnb9x3drcvuvobd6gzdb.jpg"
    },
    {
        id: 25,
        title: "Casa Rural en los Andes Chilenos",
        description: "Esta encantadora casa rural en los Andes chilenos es el lugar perfecto para desconectar y disfrutar de la naturaleza. Con capacidad para 5 personas, es ideal para parejas o familias. La casa cuenta con una acogedora chimenea y una amplia terraza con vistas a las montañas. ¡Reserva ahora y vive una experiencia única en los Andes!",
        ubicacion: "Chile, Santiago, Cajón del Maipo, Calle Montaña, 789",
        location_code: "-33.648, -70.383",
        cant_ambientes: 3,
        max_personas: 5,
        precio_noche: 180.25,
        user: {
            id: 3,
            fullname: "Alicia",
            image: ""
        },
        estado_propiedad: "Visible",
        servicios: ["Wifi", "Estacionamiento", "Acceso para personas con movilidad reducida"],
        image_propiedad: "https://res.cloudinary.com/dv6hd68lo/image/upload/v1698932523/viviendas/d8bbnhwl2eaojyu0aony.jpg"
    },
    {
        id: 26,
        title: "Apartamento de Lujo en el Centro de Buenos Aires",
        description: "Este lujoso apartamento en el centro de Buenos Aires es perfecto para una estancia de alta gama en la ciudad. Con capacidad para 2 personas, ofrece comodidades como jacuzzi y acceso a Wi-Fi. La ubicación céntrica te permite explorar las atracciones locales y la vida nocturna. ¡Reserva este apartamento de lujo ahora!",
        ubicacion: "Argentina, Buenos Aires, Microcentro, Calle Elegante, 123",
        location_code: "-34.611, -58.372",
        cant_ambientes: 2,
        max_personas: 2,
        precio_noche: 220.00,
        user: {
            id: 3,
            fullname: "Alicia",
            image: ""
        },
        estado_propiedad: "Visible",
        servicios: ["Wifi", "Jacuzzi", "Aire acondicionado"],
        image_propiedad: "https://res.cloudinary.com/dv6hd68lo/image/upload/v1698932523/viviendas/gjfg1hleex7b2bua8ktx.jpg"
    },
]