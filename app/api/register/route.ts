import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"
import bcrypt from 'bcrypt'

export const POST = async(request: Request
) => {
    const body = await request.json()
    const {
        fullname,
        email,
        name,
        password,
        tipo_usuario
    } = body

    /* 1. Hash the password */
    const hashedPassword = await bcrypt.hash(password, 12)
    
    const user = await prisma.user.create({
        data: {
            fullname,
            email,
            name,
            hashedPassword,
            id_tipo_usuario: tipo_usuario
        }
    })

    return NextResponse.json('user')

}
