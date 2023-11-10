import getCurrentUser from "@/app/actions/getCurrentUser"
import { redirect } from "next/navigation"
import { headers } from "next/headers";

export default async function PropiedadLayout({
  children 
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser()
  const pathname = headers().get('x-pathname')

  if(!currentUser || currentUser.id_tipo_usuario === 1) {
    if(pathname === '/propiedad/all') {
      return redirect('/') 
      
    }

    if(pathname === '/propiedad/create') {
      return redirect('/') 
    }
  }

  return (
    <>
      {children}
    </>
  
  )
}