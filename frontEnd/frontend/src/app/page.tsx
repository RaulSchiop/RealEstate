import Header from "@/Components/Header/Header";
import ConnectWithUsSection from "@/Components/MainPage/ConnectWithUsSection";
import HeroSection from "@/Components/MainPage/HeroSection";
import PoluparListings from "@/Components/MainPage/PopularListings";
import SubscribeToNewsLetter from "@/Components/MainPage/SubscribeToNewsLatter";
import Image from "next/image";

export default function Home() {
   return (
      <>
         <Header></Header>
         <HeroSection></HeroSection>
         <PoluparListings></PoluparListings>
         <ConnectWithUsSection></ConnectWithUsSection>
         <SubscribeToNewsLetter></SubscribeToNewsLetter>
      </>
   );
}
