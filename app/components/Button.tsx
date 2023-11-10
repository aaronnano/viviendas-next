'use client'

export const Button = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  Icon

}: any) => {



  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`
      relative
      disabled:opacity-70
      disabled:cursor-not-allowed
      rounded-lg
      hover:opacity-80
      transition
      w-full

      ${outline ? 'bg-white' : 'bg-black'}
      ${outline ? 'border-black' : 'border-black'}
      ${outline ? 'text-black' : 'text-white'}
      ${small ? 'py-1' : 'py-3'}
      ${small ? 'text-sm' : 'text-md'}
      ${small ? 'font-light' : 'font-semibold'}
      ${small ? 'border-[1px]' : 'border-2'}

    `}>
      {Icon && (
        <Icon 
          size={24}
          className="
            absolute
            left-4
            top-3 
          "
        />
      )}

      {label}
    </button>
  )
}
