'use client'


import { useSearchModal } from "@/app/hooks/useSearchModal";
import { BiSearch } from "react-icons/bi";

interface SearchProps {
  label1?: string
  label2?: string
  label3?: string
}

export const Search: React.FC<SearchProps> = ({
  label1 = 'Lugar',
  label2 = 'Fechas',
  label3 = 'Huespedes'
}) => {
  const searchModal = useSearchModal();


  return (
    <div 
      onClick={searchModal.onOpen}
      className="
      w-full
      md:w-auto
      border-[1.5px] border-neutral-300
      py-2
      rounded-md
      hover:border-black
      cursor-pointer
      transition
       
    ">
      <div className="
        w-full
        flex
        flex-row
        items-center
        justify-between
      ">
        {/* <div className="
          w-full
          flex flex-row
          items-center
          justify-center
          --text-center
          --px-2
          text-sm
          font-semibold
        ">
          <div className="px-6">
            Lugar
          </div>
          <div className="px-6  border-x-2">
            Fechas
          </div>
          <div className="px-6">
            Huespedes
          </div>

        </div> */}
        <div className="
          w-full
          grid
          grid-cols-3
          divide-x-2 divide-neutral-200
          text-sm text-center
          font-semibold
        ">
          <div className="px-8">
            {label1}
          </div>
          <div className="px-8">
            {label2}
          </div>
          <div className="px-8">
            {label3}
          </div>

        </div>
        <div className="px-6 py-2">
          <BiSearch size={18} />
        </div>
      </div>
    </div>
  )
}
