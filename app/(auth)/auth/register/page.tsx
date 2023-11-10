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
import { FcGoogle } from 'react-icons/fc'
import { useRouter } from 'next/navigation'

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
      firstname: '',
      lastname: '',
      name: '',
      email: '',
      password: '',
      tipo_usuario: 1
    }
  })

  const tipo_usuario = getValues().tipo_usuario
  console.log({tipo_usuario})

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }
  
  const onSumbit = async (data: any) => {
    setIsLoading(true)

    if(data?.autoLogin === 'google') {
      return signIn('google', {
        callbackUrl: '/'
      })
      
    }

    const dataRegister = {
      fullname: data.firstname + ' ' + data.lastname,
      name: data.name,
      email: data.email,
      password: data.password,
      tipo_usuario: data.tipo_usuario
    }

    try {
      await axios.post('/api/register', dataRegister)

      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false
      })

      if(res?.error) {
        throw new Error(res.error)
      }


      router.push('/')
      router.refresh()
      toast.success('Login!');
      
    } catch (error) {
      toast.error('Something Went wrong.')
    }

    setIsLoading(false)
    reset()
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
          Register
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 mb-5">
        <Heading 
          title="Bienvenido!"
          subtitle='Cree una cuenta'
          
        />
        <div className="grid grid-cols-2 gap-3">
          <Input 
            id="firstname"
            label="Nombre"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            
          />
          <Input 
            id="lastname"
            label="Apellido"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            
          />
        </div>
        <Input 
          id="name"
          label="Username"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          
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
        <div className="
          flex flex-row gap-3
          items-center
        ">
          <Heading
            subtitle='Quiere ser Cliente o Propietario?'
          /> 
          <Switch
            checked={tipo_usuario === 1 ? true : false}
            onChange={(checked) => setCustomValue('tipo_usuario', checked ? 1 : 2)}
            uncheckedIcon={false}
            checkedIcon={false}
            className="translate-x-[30p] scale-125"
            onColor='#000'
            offColor='#000'
          />
          <div className="
            text-lg fond-bold
          ">
            { tipo_usuario == 1 ? "Cliente" : "Propietario" }
          </div>

          </div>
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
              onClick={() => router.push('/auth/login')}
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

   </div>
  )
}