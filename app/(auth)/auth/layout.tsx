import getCurrentUser from "@/app/actions/getCurrentUser"
import { redirect } from "next/navigation"
import { headers } from "next/headers";

export default async function RegisterLayout({
  children 
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser()
  const header = headers().get('x-pathname')
  
  if(currentUser) redirect('/') 

  return (
    <div className="
      flex
      justify-center
      items-center
      h-screen

    ">
      <div className="
        w-full
        md:w-3/6

      ">
        <div className="
          flex
          flex-col
          border border-black/10
          rounded-md
          p-6
        ">
          {children}
        </div>
      </div>
    </div>
  
  )
}