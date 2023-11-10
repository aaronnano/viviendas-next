'use client'

import { File } from 'buffer'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { useCallback, useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'

declare global {
  var cloudinary: any
}

interface ImageUploadProps {
  value?: string   
  onChange: (value: any) => void
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
}) => {

  const [preview, setPreview] = useState('')

  // console.log({preview})
  return (
    <div className="
      w-full
      flex items-center justify-center
    ">
      <label htmlFor='file_id' className="
        flex flex-col items-center justify-center
        border-2 border-dashed
        rounded-md
        border-neutral-300
        bg-neutral-50
        text-neutral-500
        hover:text-neutral-800
        cursor-pointer
        --py-20
        w-full
        h-[218px]

        relative
        overflow-hidden
      ">
        { !preview ? 
        <>
          <AiOutlineCloudUpload size={30} />
          <div className="text-base font-semibold">
            Haga Click para subir una imagen
          </div>
        </>
        :
        <Image 
          src={preview || ''}
          alt="Test"
          fill
          className='
            object-cover
            
          '
        />
        }

        <input 
          id='file_id'
          type="file" 
          className='hidden'
          onChange={({ target }) => {
            const file = target.files?.[0]
            setPreview(URL.createObjectURL(file as any))
            onChange({
              file,
              src: URL.createObjectURL(file as any)
            })
          }}
        />
      </label>
    </div>
  )
}