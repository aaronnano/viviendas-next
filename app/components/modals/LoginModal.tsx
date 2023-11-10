'use client'

import { Modal } from './Modal'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useCallback, useState } from 'react'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { useLoginModal } from '@/app/hooks/useLoginModal'
import { Heading } from '../Heading'
import { Input } from '../inputs/Input'
import toast from 'react-hot-toast'
import { Button } from '../Button'
import { useRegisterModal } from '@/app/hooks/useRegisterModal'
import { useRouter } from 'next/navigation'



export const LoginModal = () => {
  const router = useRouter()
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const [isLoading, setIsLoading] = useState(false)
  
  const {
    register,
    handleSubmit,
    setValue,
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
  
  const onSumbit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)

    if(data?.autoLogin === 'google') {
      return signIn('google')
    }
    
    const res = await signIn('credentials', {
      ...data,
      redirect: false
    })

    if(res?.error) {
      toast.error(res.error)
    }
    else {
      //console.log('onSubmit')
      loginModal.onClose()
      toast.success('Logged in')
      router.refresh()
    }

    setIsLoading(false)
  }

  const toggle = useCallback(() => {
    loginModal.onClose()
    registerModal.onOpen()
  },[loginModal, registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-3">
      <Heading 
        title="Welcome back"
        subtitle='Login to your account'
        
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
            First time using this site?
          </div>
          <div
            onClick={toggle}
            className="
          text-neutral-800
            cursor-pointer
            hover:underline
          ">
            Create an account
          </div>
        </div>
      </div>
    </div>
  )


  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title='Login'
      actionLabel='Continue'
      onSubmit={handleSubmit(onSumbit)}
      onClose={loginModal.onClose}
      body={bodyContent}
      footer={footerContent}
    />
  )
}
