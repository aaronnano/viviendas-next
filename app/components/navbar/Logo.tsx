'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"



export const Logo = () => {
    const router = useRouter()

    // <Image 
    //   alt="Logo"
    //   className="hidden md:block cursor-pointer"
    //   height='100px'
    //   width='100px'
    //   src=''
    // /> 
    return (
    <div 
      onClick={() => router.push('/')}
      className="
      text-2xl
      cursor-pointer
    ">
      Viviendas
      
    </div>
  )
}