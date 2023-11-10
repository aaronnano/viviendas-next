'use client'

import { User } from "@prisma/client"
import { Container } from "../Container"
import { Logo } from "./Logo"
import { Search } from "./Search"
import { UserMenu } from "./UserMenu"
import useQueryParams from "@/app/hooks/useQueryParams";
import { useMemo } from "react"
import { differenceInDays } from "date-fns"

interface NavbarProps {
  currentUser: User | null 
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser
}) => {
  const { searchParams, pathname } = useQueryParams()

  // const search = {
  //   ubicacion: searchParams.ubicacion,
  //   huespedes: searchParams.huespedes,
  //   fecha_inicio: searchParams.fecha_inicio,
  //   fecha_salida: searchParams.fecha_salida
  // }

  const search = useMemo(() => {
    let res = {
      ubicacion: 'Lugar',
      dias: 'Fechas',
      huespedes: 'Huespedes'
    }

    if(searchParams.ubicacion){
      res.ubicacion = searchParams.ubicacion
    }
    if(searchParams.fecha_inicio && searchParams.fecha_salida){
      const diff = differenceInDays(
        new Date(searchParams.fecha_salida),
        new Date(searchParams.fecha_inicio)
      ) + 1

      res.dias =`${diff} Dias`
    }
    if(searchParams.huespedes){
      res.huespedes = `${searchParams.huespedes} Huespedes`
    }    

    return res

  }, [searchParams])  


  return (
    <div className="
      fixed 
      w-full
      bg-white
      z-10
      shadow-sm
    ">
      <div className="
        py-4
        border-b-[1px]
      ">
          <Container>
            <div className="
              lg:max-w-screen-lg
              2xl:max-w-screen-xl
              mx-auto
              flex
              flex-row
              items-center
              justify-between
              --gap-3
              --md:gap-32
            ">
              <Logo />
              {
                pathname !== '/' ? 
                  <div className="">
                    <Search
                      label1={search.ubicacion}
                      label2={search.dias}
                      label3={search.huespedes}
                    /> 
                  </div>
                : null
              }
              
              <UserMenu currentUser={currentUser}  />
            </div>
          </Container>
      </div>
        
    </div>
  )
}

