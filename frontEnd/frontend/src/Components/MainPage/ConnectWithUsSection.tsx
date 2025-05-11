"use client";
import Image from "next/image";
import shapes from "../../../public/Real Estate Group 15.svg";
import shape2 from "../../../public/Real Estate Blob.svg";
import Link from "next/link";
import MainBtn from "../buttons/Mainbtn";
import MainBtnLight from "../buttons/MainbtnLight";
import { useRouter } from "next/navigation";

export default function ConnectWithUsSection() {
   const route = useRouter();
   function handleRedirect() {
      route.push("/contact");
   }

   return (
      <div className="mt-20 px-20 lg:px-30 flex flex-col justify-center lg:gap-40 gap-20 items-center lg:flex-row">
         <div className="flex flex-col  w-[360px]">
            <h1 className="text-[38px] w-[360px] text-text font-bold mb-10">
               Get in touch with one of our{" "}
               <a className="text-secondary">AGENTS</a>
            </h1>
            <Image src={shapes} alt="" width={300} height={80}></Image>
            <div className="flex pl-10 gap-10">
               <div className="flex flex-col justify-center ">
                  <h1 className="text-text font-bold text-[21px]">20k</h1>
                  <p className="text-text text-[14px]">Clients</p>
               </div>
               <div className="flex flex-col justify-center ">
                  <h1 className="text-text font-bold text-[21px]">5k+</h1>
                  <p className="text-text text-[14px]">Listings</p>
               </div>
               <div className="flex flex-col justify-center ">
                  <h1 className="text-text font-bold text-[21px]">4.5</h1>
                  <p className="text-text text-[14px]">Rating</p>
               </div>
            </div>
         </div>
         <div>
            <div className="relative  flex justify-center items-center ">
               <Image src={shape2} alt="Shape" />
               <div className="absolute inset-0 flex justify-center ml-30 flex-col ">
                  <h1 className="text-lightText text-[28px]">Let Us Help</h1>
                  <p className="text-lightText w-[300px]">
                     Let’s find the perfect home together. From first visits to
                     final contracts.
                  </p>
                  <MainBtnLight onClick={handleRedirect}>Contact Us</MainBtnLight>
               </div>
            </div>
         </div>
      </div>
   );
}
