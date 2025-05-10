"use client";
import Image from "next/image";
import profileIcon from "../../../public/Real Estate Iconamoon Profile Light.png";
import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
   const [logged, isLogged] = useState(false);
    const router=useRouter();
   function handleRedirect(){
    router.push("/auth");

   }


   return (
      <>
         <motion.div
            initial={{ y: -1000 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", duration: 1 }}
              className="absolute top-0 left-0 w-full  flex justify-center mt-10"
         >
            <div className="flex justify-center gap-2 sm:gap-20   xl:gap-80 rounded-[60px] items-center lg:w-[1000px] xl:w-[1189px] w-full bg-accent/40 py-2 px-4 shadow-inner">
               <h1 className="font-bold text-[14px]  sm:text-2xl text-text">HOMEYO</h1>
               <div className="flex justify-center gap-5 lg:gap-[90px] items-center">
                  <Link href={"/"} className="text-[16px] text-text ">
                     <motion.p
                        whileHover={{
                           scale: 1.1,
                           transition: { type: "spring", duration: 0.4 },
                        }}
                        whileTap={{
                           scale: 0.9,
                           transition: { type: "spring", duration: 0.4 },
                        }}
                     >
                        Home
                     </motion.p>
                  </Link>
                  <Link href={"/anunturi"} className="text-[16px] text-text ">
                     <motion.p
                        whileHover={{
                           scale: 1.1,
                           transition: { type: "spring", duration: 0.4 },
                        }}
                        whileTap={{
                           scale: 0.9,
                           transition: { type: "spring", duration: 0.4 },
                        }}
                     >
                        Anunturi
                     </motion.p>
                  </Link>
                  <Link href={"/contact"} className="text-[16px] text-text ">
                     <motion.p
                        whileHover={{
                           scale: 1.1,
                           transition: { type: "spring", duration: 0.4 },
                        }}
                        whileTap={{
                           scale: 0.9,
                           transition: { type: "spring", duration: 0.4 },
                        }}
                     >
                        Contact
                     </motion.p>
                  </Link>
               </div>

               {logged === false ? (
                     <motion.button 
                     onClick={handleRedirect}
                        className="text-lightText bg-primary/90 lg:text-[16px] lg:p-0 text-[14px] p-1  lg:h-10 lg:w-36 rounded-[40px]"
                        whileHover={{
                           scale: 1.1,
                           transition: { type: "spring", duration: 0.4 },
                        }}
                        whileTap={{
                           scale: 0.9,
                           transition: { type: "spring", duration: 0.4 },
                        }}
                     >
                        Log In
                     </motion.button>
               ) : (
                  <Link href={"/profile"}>
                     <motion.div
                        whileHover={{
                           scale: 1.1,
                           transition: { type: "spring", duration: 0.4 },
                        }}
                        whileTap={{
                           scale: 0.9,
                           transition: { type: "spring", duration: 0.4 },
                        }}
                     >
                        <Image
                           src={profileIcon}
                           width={34}
                           height={34}
                           alt="profile page"
                        ></Image>
                     </motion.div>
                  </Link>
               )}
            </div>
         </motion.div>
      </>
   );
}
