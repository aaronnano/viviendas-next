export const reservas = [
    {
        id: 1,
        pago_total: 400,
        start_date: '2023-11-10',
        end_date: '2023-11-12',
        estado_reserva: "Activo",
        huespedes: 3,
        propiedad: {
            id: 1,
            title: 'Finca Hoton',
            ubicacion: 'Uruguay, Colonia, Colonia del Sacramento, Barrio Histórico, Avenida Aparicio Saravia, 896',
            cant_ambientes: 3,
            servicios: ["Wifi", "Desayuno", "Estacionamiento"],
            image_propiedad: "https://res.cloudinary.com/dv6hd68lo/image/upload/v1698934578/viviendas/pt5fnzzb9odz6upjd1vu.jpg"
        },
    },
    {
        id: 2,
        pago_total: 350,
        start_date: '2023-11-20',
        end_date: '2023-11-25',
        estado_reserva: "Activo",
        huespedes: 2,
        propiedad: {
            id: 5,
            title: 'Casa de Playa en Florianópolis, Brasil',
            ubicacion: 'Brazil, Santa Catarina, Florianópolis, Avenida de la Playa, 456',
            cant_ambientes: 3,
            servicios: ["Wifi", "Aire acondicionado", "Acceso para personas con movilidad reducida"],
            image_propiedad: "https://res.cloudinary.com/dv6hd68lo/image/upload/v1698934576/viviendas/rcaqr0yujryc9kh60dpp.jpg"

        },
    },
    {
        id: 3,
        pago_total: 350,
        start_date: '2023-11-20',
        end_date: '2023-11-25',
        estado_reserva: "Activo",
        huespedes: 2,
        propiedad: {
            id: 5,
            title: 'Apartamento en la Quinta Avenida de Nueva York',
            ubicacion: 'United States, Nueva York, Manhattan, Quinta Avenida, 789',
            cant_ambientes: 3,
            servicios: ["Wifi", "Aire acondicionado", "Gimnasio"],
            image_propiedad: "https://res.cloudinary.com/dv6hd68lo/image/upload/v1698932525/viviendas/bukinyf4h1v2jllagzwk.webp"

        },
    }
]