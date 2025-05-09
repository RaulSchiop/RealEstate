import Link from "next/link";
import HomeIcon from "../../../public/Home Outline Icon - Real Estate.png";
import Image from "next/image";


export default function HeroSection() {
   return (
      <>
         <div className="w-[100%] h-[850px] flex flex-col justify-center items-center px-34">
            <h1 className="font-bold text-[200px] text-secondary tracking-[25%]">
               HOMEYO
            </h1>
            <div className="flex items-center justify-between w-full">
               <div className="w-[200px]">
                  <p>Start your journey towards your perfect home!</p>
                  <button className="w-[140px] h-[40px] bg-primary/90 rounded-[40px] mt-5 text-lightText">
                     <Link href={"/anunturi"}>Get started</Link>
                  </button>
               </div>
               <div className="flex flex-col items-center gap-1 justify-center">
                  <div className="flex items-center justify-center gap-1">
                     <div className="w-[35px] h-[35px] flex items-center justify-center border-1 rounded-4xl">
                        <Image src={HomeIcon} alt="homr icon"></Image>
                     </div>
                     <button className="h-[35px] w-[136px] text-center border-1 rounded-4xl">
                        3 camere
                     </button>
                  </div>
                  <div className="flex gap-1">
                  <button className="h-[35px] w-[73px] text-center border-1 rounded-4xl">
                       etaj 1
                     </button>
                     <button className="h-[35px] w-[93px] text-center border-1 rounded-4xl">
                     etaj 2
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
