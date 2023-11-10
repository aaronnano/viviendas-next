import Image from "next/image";
import getCurrentUser from "../actions/getCurrentUser";
import { Container } from "../components/Container";
import { EmptyState } from "../components/EmptyState";
import { Heading } from "../components/Heading";
import { ListingCard } from "../components/listings/ListingCard";
import { Search } from "../components/navbar/Search";



export default async function Home() {
  const currentUser = await getCurrentUser()


  return (
    <Container>
      <div className="
        pt-32
        lg:max-w-screen-lg
        2xl:max-w-screen-xl
        mx-auto
      ">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <div className="text-[35px] font-bold">
              Bienvenido! <br />
              Encuentra el mejor lugar para viajar
              {/* Eventos, pasatiempos */}
            </div>
            <div className="text-[20px] font-semibold text-neutral-400">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. <br /> 
              Fugiat debitis perferendis nisi iusto sapiente soluta, totam <br />
              itaque minima dolor facere veritatis quae 
            </div>
          </div>
          <div className="px-10">
            <Search />

          </div>
          <div className="flex flex-row justify-center items-end gap-10">
            <Image
              src="/images/t_1.png"
              alt="image"
              width="0"
              height="0"          
              sizes="100vw"
              className="w-[370px] h-auto"
            />
            <Image
              src="/images/t_2.png"
              alt="image"
              width="0"
              height="0"          
              sizes="100vw"
              className="w-[400px] h-auto"
            />
          </div>
          
        </div>
      </div>
    </Container>
  )
}