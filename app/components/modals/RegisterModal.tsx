'use client'

import { Modal } from './Modal'
import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useCallback, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useRegisterModal } from '@/app/hooks/useRegisterModal'
import { Heading } from '../Heading'
import { Input } from '../inputs/Input'
import toast from 'react-hot-toast'
import { Button } from '../Button'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useLoginModal } from '@/app/hooks/useLoginModal'



export const RegisterModal = () => {
  const router = useRouter()
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })
  
  const onSumbit = async (data: any) => {
    setIsLoading(true)

    if(data?.autoLogin === 'google') {
      return signIn('google')
    }

    data.tipo_usuario = 1

    try {
      await axios.post('/api/register', data)
      toast.success('Registered!');
      registerModal.onClose()
      
    } catch (error) {
      toast.error('Something Went wrong.')
    }

    setIsLoading(false)
    reset()
  }

  const toggle = useCallback(() => {
    registerModal.onClose()
    loginModal.onOpen()
  },[loginModal, registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-3">
      <Heading 
        title="Welcome to living places"
        subtitle='Create an account'
        
      />
      <Input 
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        
      />
      <Input 
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        
      />
      <Input 
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        
      />
  
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button 
        outline 
        label="Continue with Google"
        Icon={FcGoogle}
        onClick={() => onSumbit({ autoLogin: 'google' })}
      />
      <div className="
        text-neutral-500
        mt-4
        font-light
      ">
        <div className="
          flex
          flex-row
          justify-center
          items-center
          gap-2
        ">
          <div className="">
            Alredy have an account?
          </div>
          <div 
            onClick={toggle}
            className="
          text-neutral-800
            cursor-pointer
            hover:underline
          ">
            Log In
          </div>
        </div>
      </div>
    </div>
  )


  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title='Register'
      actionLabel='Continue'
      onSubmit={handleSubmit(onSumbit)}
      onClose={registerModal.onClose}
      body={bodyContent}
      footer={footerContent}
    />
  )
}
