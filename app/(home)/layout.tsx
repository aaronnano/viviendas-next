import { RegisterModal } from '../components/modals/RegisterModal'
import { Navbar } from '../components/navbar/Navbar'
import { LoginModal } from '../components/modals/LoginModal'
import getCurrentUser from '../actions/getCurrentUser'
import { RentModal } from '../components/modals/RentModal'
import { FilterModal } from '../components/modals/FilterModal'
import { SearchModal } from '../components/modals/SearchModal'

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()
  // console.log({currentUser})
  return (
  <>
    <RentModal />
    {/* <LoginModal /> */}
    {/* <RegisterModal /> */}
    <SearchModal />
    <FilterModal />
    <Navbar currentUser={currentUser}  />
    
    {children}
  </>
  )
  }