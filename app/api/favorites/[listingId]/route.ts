import { NextResponse } from 'next/server'
import getCurrentUser from '@/app/actions/getCurrentUser'
import prisma from '@/app/libs/prismadb'

interface IParams {
    listingId?: string
}

export const POST = async(
    request: Request,
    { params }: { params: IParams }
) => {
    const currentUser = getCurrentUser()
    if(!currentUser) {
        return NextResponse.error()
    }

    const { listingId } = params
    
}

