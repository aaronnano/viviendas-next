'use client'

import { useCallback } from "react"
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"

interface CounterProps {
  title?: string
  subtitle?: string
  value?: number
  minValue?: number
  maxValue?: number
  onChange: (value: number) => void
}

export const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value = 1,
  minValue,
  maxValue,
  onChange
}) => {

  const rightDisabled = value === maxValue
  const leftDisabled = value === minValue
  const onAdd = useCallback(() => {
    if(rightDisabled) return

    onChange(value + 1)
  }, [onChange, value, rightDisabled])

  const onReduce = useCallback(() => {
    if(leftDisabled) return

    if(value === 0) {
      return
    }

    onChange(value - 1)

  }, [onChange, value])


  //Only Counter
  if(!title && !subtitle)
    return (
      <div className="flex flex-row items-center gap-4">
        <div
          onClick={onReduce}
          className={`
            w-10
            h-10
            rounded-full
            border-[1px]
            border-neutral-400
            flex
            items-center
            justify-center
            text-neutral-600
            hover:opacity-60
            transition
            ${leftDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}
            ${leftDisabled ? 'opacity-60' : ''}
          `}
        >
          <AiOutlineMinus />
        </div>
        <div 
          className="
            font-light 
            text-xl 
            text-neutral-600
          "
        >
            {value}
          </div>
        <div
          onClick={onAdd}
          className={`
            w-10
            h-10
            rounded-full
            border-[1px]
            border-neutral-400
            flex
            items-center
            justify-center
            text-neutral-600
            hover:opacity-60
            transition
            ${rightDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}
            ${rightDisabled ? 'opacity-60' : ''}
          `}
        >
          <AiOutlinePlus />
        </div>
      </div>
    )



  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-col">
        <div className="font-medium">
          {title}
        </div>
        <div className="font-light text-gray-600">
          {subtitle}
        </div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          onClick={onReduce}
          className="
            w-10
            h-10
            rounded-full
            border-[1px]
            border-neutral-400
            flex
            items-center
            justify-center
            text-neutral-600
            cursor-pointer
            hover:opacity-60
            transition
          "
        >
          <AiOutlineMinus />
        </div>
        <div 
          className="
            font-light 
            text-xl 
            text-neutral-600
          "
        >
            {value}
          </div>
        <div
          onClick={onAdd}
          className="
            w-10
            h-10
            rounded-full
            border-[1px]
            border-neutral-400
            flex
            items-center
            justify-center
            text-neutral-600
            cursor-pointer
            hover:opacity-60
            transition
          "
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  )
}
