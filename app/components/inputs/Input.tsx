'use client'

import { useState } from "react"
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi"
import { IoPlaySkipForwardCircle } from "react-icons/io5";

interface InputProps {
  id: string;
  label: string;
  value?: string
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors
}

export const Input: React.FC<InputProps> = ({
  id,
  label,
  value,
  type = 'text',
  disabled,
  required,
  register,
  errors
}: any) => {

  /* Use for control label */
  const [hasValue, setHasValue] = useState(!!value)
  const [inputValue, setInputValue] = useState('')

  const isPrice = type === 'price'

  return (
    <div className="w-full relative" >
      {/*   PRICE   */}
      {isPrice && (
        <BiDollar
          size={18}
          className={`
            text-neutral-500
            absolute
            top-[50%]
            -translate-y-[50%]
            left-2
            ${errors[id] ? 'text-red-400' : 'text-zinc-400'}
          `}
        />
      )}

      {/*   INPUT   */}
      { type === 'text' || type === 'password' ? (
      <>
        <input 
          id={id}
          disabled={disabled}
          // value={inputValue}
          {...register(id, { required })}
          type={type}
          placeholder=" "
          onChange={({ target }) => {
            setHasValue(!!target.value)
          }}
          
          className={`
            peer
            block
            w-full
            p-4
            font-light
            bg-white
            border-[1.5px]
            rounded-md
            transition
            disabled:opacity-70
            disabled:cursor-not-allowed
            ${isPrice ? 'pl-9' : 'pl-4'}
            ${errors[id] ? 'border-red-400' : 'border-neutral-300'}
            ${errors[id] ? 'outline-red-400' : ''}
  
          `}
        />
        <label
          htmlFor={id}
          className={`
          absolute
          text-md
          duration-150
          z-10
          origin-[0_0]
          ${isPrice ? 'left-9' : 'left-4'}
          top-[50%]
          ${hasValue ? 'scale-75': ''}
          ${hasValue ? '-translate-y-[111%]': '-translate-y-[50%]'} 
          peer-focus:scale-75
          peer-focus:-translate-y-[110%]
          cursor-text
          
          ${errors[id] ? 'text-red-400' : 'text-zinc-400'}
        `}>
          {label}
        </label>
      </>
      ) : isPrice ? (
        <>
        <input 
          id={id}
          disabled={disabled}
          value={inputValue}
          {...register(id, { required })}
          placeholder=" "
          onChange={({ target }) => {
            setHasValue(!!target.value)

            if(isPrice && target.value.match(/^\d{1,}(\.\d{0,2})?$/)) {
              setInputValue(target.value)
            } else if(target.value === '') {
              setInputValue(target.value)
            }

          }}
          
          className={`
            peer
            w-full
            p-4
            font-light
            bg-white
            border-[1.5px]
            rounded-md
            transition
            disabled:opacity-70
            disabled:cursor-not-allowed
            ${isPrice ? 'pl-9' : 'pl-4'}
            ${errors[id] ? 'border-red-400' : 'border-neutral-300'}
            ${errors[id] ? 'outline-red-400' : ''}
  
          `}
        />
        <label
          htmlFor={id}
          className={`
          absolute
          text-md
          duration-150
          z-10
          origin-[0_0]
          ${isPrice ? 'left-9' : 'left-4'}
          top-[50%]
          ${hasValue ? 'scale-75': ''} 
          ${hasValue ? '-translate-y-[111%]': '-translate-y-[50%]'} 
          peer-focus:scale-75
          peer-focus:-translate-y-[110%]
          cursor-text
          
          ${errors[id] ? 'text-red-400' : 'text-zinc-400'}
        `}>
          {label}
        </label>
      </>

      ) : (
      <>
        <textarea
          id={id}
          type={type}
          disabled={disabled}
          {...register(id, { required })}
          placeholder=" "
          onChange={({ target }) => setHasValue(!!target.value)}
          rows={7}
          className={`
            peer
            block
            resize-none
            w-full
            p-4
            font-light
            bg-white
            border-[1.5px]
            rounded-md
            transition
            disabled:opacity-70
            disabled:cursor-not-allowed
            ${errors[id] ? 'border-red-400' : 'border-neutral-300'}
            ${errors[id] ? 'border-red-400' : 'border-neutral-300'}
          `}
        />
        <label
          htmlFor={id}
          className={`
          absolute
          text-md
          duration-150
          z-10
          origin-[0_0]
          ${isPrice ? 'left-9' : 'left-4'}
          top-[28px]
          ${hasValue ? 'scale-75': ''} 
          ${hasValue ? '-translate-y-[111%]': '-translate-y-[50%]'} 
          peer-focus:scale-75
          peer-focus:-translate-y-[110%]
          cursor-text
          
          ${errors[id] ? 'text-red-400' : 'text-zinc-400'}
        `}>
          {label}
        </label>
      </>
      )}
      


    </div>
  )
}
