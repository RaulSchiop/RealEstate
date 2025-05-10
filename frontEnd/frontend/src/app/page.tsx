import Header from "@/Components/Header/Header";
import HeroSection from "@/Components/MainPage/HeroSection";
import PoluparListings from "@/Components/MainPage/PopularListings";
import Image from "next/image";

export default function Home() {
   return (
      <>
         <Header></Header>
         <HeroSection></HeroSection>
         <PoluparListings></PoluparListings>
      </>
   );
}
