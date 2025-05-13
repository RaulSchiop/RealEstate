import MainBtn from "../buttons/Mainbtn";
import Image from "next/image";
import imageNews from "../../../public/Real Estate Image 2.png";
export default function SubscribeToNewsLetter() {
   return (
      <div className="flex items-center justify-center w-full mt-30 ">
         <div className="flex flex-col mx-5 md:mx-10 md:flex-row items-center justify-center  rounded-[20px] gap-10 w-full ">
            <div className="object-cover  relative rounded-[100px]">
               <Image src={imageNews} className="rounded-l-[400px] rounded-tl-[300px] rounded-tr-[300px] rounded-br-[100px]" alt="house iamge"></Image>
            </div>
            <form className="flex flex-col items-center justify-center p-6">
               <h1 className=" font-bold text-[28px] ">
                  Subscribe To Our Newsletter
               </h1>
               <p className="text-[21px]">
                  Be the first that gets our new real estate deals!
               </p>
               <input type="email" className="bg-bg text-accent text-center px-4 py-1 w-full mt-2 outline-0 rounded-[10px] border-1" placeholder="enter your email address"></input>
               <MainBtn type="submit">Subscribe</MainBtn>
            </form>
         </div>
      </div>
   );
}
