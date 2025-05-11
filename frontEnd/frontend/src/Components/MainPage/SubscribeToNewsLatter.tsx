import MainBtn from "../buttons/Mainbtn";
import Image from "next/image";
import imageNews from "../../../public/Real Estate Image 2.png";
export default function SubscribeToNewsLetter() {
   return (
      <div className="flex items-center justify-center w-full mt-30 ">
         <div className="flex flex-col md:mx-20 md:flex-row items-center justify-center bg-accent/80  rounded-[20px] gap-10 ">
            <div className="object-cover relative">
               <Image src={imageNews} alt="house iamge"></Image>
            </div>
            <div className="flex flex-col items-center justify-center p-6">
               <h1 className=" font-bold text-[28px] ">
                  Subscribe To Our Newsletter
               </h1>
               <p className="text-[21px]">
                  Be the first that gets our new real estate deals!
               </p>
               <input className="bg-bg text-accent text-center px-4 py-1 w-full mt-2 outline-0 rounded-[10px]" placeholder="enter your email address"></input>
               <MainBtn>Subscribe</MainBtn>
            </div>
         </div>
      </div>
   );
}
