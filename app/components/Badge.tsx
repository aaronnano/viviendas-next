

export const Badge = (
{ 
  title,
  color = 'yellow',
  size = 1,
  allowHover = false,
  onClick
}
: { 
  title: string,
  color?: string
  size?: number
  onClick?: (e: any) => void
  allowHover?: boolean
}) => {

  const sizeClass = `
  ${size === 1 ? 'px-2 py-1 text-xs font-medium ' : ''}  
  ${size === 2 ? 'px-3 py-1 text-[13px] font-medium ' : ''}  
  ${size === 3 ? 'px-4 py-2 text-base font-medium ' : ''}  
  ` 

  const hover = `
  ${allowHover ? 'transition hover:scale-105 origin-[0]' : ''}
  `

  const list = {
    green: `flex 
    items-center rounded-lg 
    ${sizeClass}

    bg-green-50 
    text-green-700 ring-1 ring-inset
    ring-green-500
    ${hover}
    `,

    yellow: `inline-flex 
    items-center rounded-lg 
    ${sizeClass}

    bg-yellow-50 
    text-yellow-500 ring-1 ring-inset
    ring-yellow-500 
    ${hover}
    `
  }

  return (
    //@ts-ignore
    <span className={list[color]} onClick={onClick}>
      {title}
    </span>
  )
}
