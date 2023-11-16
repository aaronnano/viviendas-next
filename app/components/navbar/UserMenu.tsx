'use client'

import { AiOutlineMenu } from 'react-icons/ai'
import { Avatar } from '../Avatar'
import { useCallback, useState } from 'react'
import { MenuItem } from './MenuItem'
import { useRegisterModal } from '@/app/hooks/useRegisterModal'
import { useLoginModal } from '@/app/hooks/useLoginModal'
import { User } from '@prisma/client'
import { signOut } from 'next-auth/react'
import { useRentModal } from '@/app/hooks/useRentModal'
import { useRouter } from 'next/navigation'
import { Badge } from '../Badge'
import { Button } from '../Button'
import {
  AiOutlinePlus
} from 'react-icons/ai'
import {
  BsCircleFill
} from 'react-icons/bs'

interface UserMenuProps {
  currentUser: User | null 
}

export const UserMenu: React.FC<UserMenuProps> = ({
  currentUser
}) => {
  const router = useRouter()
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const rentModal = useRentModal()
  const [isOpen, setIsOpen] = useState(false)

  //@ts-ignore
  const tipoUsuario = currentUser?.tipo_usuario?.tipo_usuario

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value)
  }, [])

  const onRent = useCallback(() => {
    if(!currentUser) {
      return loginModal.onOpen()
    }

    rentModal.onOpen()

  }, [currentUser, loginModal, rentModal])

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        {tipoUsuario === 'Propietario' ? (
          <div
            onClick={() => router.push('/propiedad/create')}
            className="
            relative
            lg:hidden
            xl:flex flex-row items-center gap-2
            text-md
            font-bold
            py-3
            pr-5
            pl-4
            rounded-md
            hover:bg-neutral-100
            cursor-pointer
            transition
          ">
            <div className="block font-bold">
              <AiOutlinePlus size={16}/>
            </div>
            <div className="">Propiedad</div>

            <div className="
              absolute 
              right-2
              top-2
              text-yellow-300
            ">
              <BsCircleFill size={10}/>
            </div>

          </div>

        ) : !currentUser  ? (
          <div 
            onClick={() => router.push('/auth/login')}
            className="
            text-sm
            font-bold
            py-2
            px-5
            rounded-md
            cursor-pointer
            border-[1px]
            border-black
            hover:border-neutral-500
            hover:text-neutral-500
            transition

          ">
            Log in
          </div>
          
         ) : null}
        <div 
          onClick={toggleOpen}
          className="
          relative
          px-4
          py-2
          flex
          flex-row
          items-center
          gap-3
          rounded-full
          hover:shadow-md
          --border-[1.5px] --border-neutral-200
          cursor-pointer
          transition

        ">
          { currentUser ? (
          <>
            <Badge
              title={tipoUsuario}
              color={tipoUsuario === 'Cliente' ?  'green' : 'yellow'}
            />
            <div className="text-sm capitalize">
              {currentUser.fullname}
            </div>
          </>
           ) : null}
          
          <div className="">
            <Avatar src={currentUser?.image} />
          </div>


          {/* {isOpen && ( */}
            <div className={`
              ${isOpen ? 'opacity-100': 'opacity-0'}
              ${isOpen ? '': 'invisible'}
              absolute
              rounded-xl
              shadow-md
              w-[40vw]
              md:w-[167px]
              bg-white
              overflow-hidden
              right-0
              top-12
              text-sm
              transition
            `}>
              <div className="flex flex-col cursor-pointer">
                {tipoUsuario === 'Propietario' ? (
                <>
                  {/* <MenuItem 
                    onClick={onRent}
                    label='Test'
                  /> */}
                  <MenuItem 
                    onClick={() => router.push('/propiedad/all')}
                    label='Mis Propiedades'
                  />
                  <MenuItem 
                    onClick={() => router.push('/reservas')}
                    label='Mis Reservas'
                  />
                  <MenuItem 
                    onClick={() => {}}
                    label='Configuracion'
                  />
                  <hr />
                  <MenuItem 
                    onClick={() => signOut()}
                    label='Logout'
                  />
                </>
                ): tipoUsuario === 'Cliente' ? (
                <>
                  {/* <MenuItem 
                    onClick={onRent}
                    label='Test'
                  /> */}
                  <MenuItem 
                    onClick={() => router.push('/reservas')}
                    label='Mis Reservas'
                  />
                  <MenuItem 
                    onClick={() => {}}
                    label='Configuracion'
                  />
                  <hr />
                  <MenuItem 
                    onClick={() => signOut()}
                    label='Logout'
                  />
                </>
                ):(
                <>
                  <MenuItem 
                    onClick={() => router.push('/auth/login')}
                    label='Login'
                  />
                  <MenuItem 
                    onClick={() => router.push('/auth/register')}
                    label='Sign Up'
                  />
                </>
                )}
              </div>
            </div>
          {/* )} */}


        </div>
      </div>
    </div>
    
  )
}
