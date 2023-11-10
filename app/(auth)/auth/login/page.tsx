'use client'

import { Button } from '@/app/components/Button'
import { Heading } from '@/app/components/Heading'
import { Input } from '@/app/components/inputs/Input'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Container } from '../../../components/Container'
import Switch from 'react-switch'
import { useRouter } from "next/navigation";
import { FcGoogle } from 'react-icons/fc'

export default function RegisterPage() {  
  const router = useRouter()
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
      email: '',
      password: '',
    }
  })

  // const setCustomValue = (id: string, value: any) => {
  //   setValue(id, value, {
  //     shouldValidate: true,
  //     shouldDirty: true,
  //     shouldTouch: true
  //   })
  // }
  
  const onSumbit = async (data: any) => {
    setIsLoading(true)

    if(data?.autoLogin === 'google') {
      return signIn('google', {
        callbackUrl: '/'
      })
    }

    const res = await signIn('credentials', {
      ...data,
      redirect: false
    })
    console.log({res})
    if(res?.error) {
      toast.error(res.error)
    }
    else {
      //console.log('onSubmit')
      toast.success('Logged in')
      router.push('/')
      router.refresh()
    }

    setIsLoading(false)
    // reset()
  }

  return (
    <div className="">
      
      {/* Header */}
      <div className="
        flex
        justify-center
        items-center
      ">
        <div className="text-[27px] font-semibold">
          Login
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 mb-5">
        <Heading 
          title="Bienvenido de vuelta!"
          subtitle='Inicie sesion'
          
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

      {/* Footer */}
      <div className="
        flex flex-col gap-3
      ">
        <Button
          disabled={isLoading}
          label="Continue"
          onClick={handleSubmit(onSumbit)}
        />
        <hr />
        <Button 
          outline
          disabled={isLoading}
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
              onClick={() => router.push('/auth/register')}
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

   </div>
  )
}