'use client'



export const MenuItem = ({ onClick, label }: any) => {
  return (
    <div
      onClick={onClick}
      className="
      px-4
      py-3
      hover:bg-gray-100
      transition
      font-semibold
    ">
      {label}
    </div>
  )
}
