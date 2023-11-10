'use client'

import { useState } from "react";
import { IconType } from "react-icons";

interface SelectGridProps {
  values: any[]
  selected?: string[];
  onClick: (value: string[]) => void;
}


export const SelectGrid: React.FC<SelectGridProps> = ({
  values,
  selected = [],
  onClick
}) => {


  return (
    <div className={`
			grid
			grid-cols-2
			gap-3
  	`}>
			{values.map((value, i) => {
				const Icon = value.icon
				const isSelected = selected.includes(value.value)

				return (
          <div
            key={i}
            onClick={() => {
              if(isSelected) {
                onClick(selected.filter(v => v !== value.value))
              } else {
                onClick([...selected, value.value])
              }
            }}
            className={`
              group
              flex
              flex-col
              gap-3
              rounded-xl
              border-2
              p-4
              hover:border-black
              transition
              cursor-pointer
              active:scale-95

              ${isSelected ? 'border-black' : 'border-neutral-200'}
          `}
          >
            <Icon size={30} />
            <div className="">
              {value.value}
            </div>
          </div>
			  )})}
    
    </div>
  )
}
