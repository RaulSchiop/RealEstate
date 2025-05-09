"use client";
import Link from "next/link";
import HomeIcon from "../../../public/Home Outline Icon - Real Estate.png";
import HouseImage from "../../../public/ChatGPT Image Apr 4 2025.png";
import bgHouse from "../../../public/Real Estate Background Hero.png";
import Image from "next/image";
import { motion } from "motion/react";

export default function HeroSection() {
   return (
      <>
         <div className="w-[100%] z-0 h-[850px]  flex flex-col justify-center items-center px-34">
            <Image
               src={bgHouse}
               alt="background"
               fill
               priority
               className="object-cover z-[-1] max-h-[900px]"
            />
            <motion.h1
               initial={{
                  x: -1000,
                  opacity: 0,
               }}
               animate={{
                  x: 0,
                  opacity: 1,
               }}
               transition={{
                  duration: 1,
                  type: "spring",
               }}
               className="font-bold text-[190px] text-secondary tracking-[25%] h-30"
            >
               HOMEYO
            </motion.h1>

            <div className="flex items-center justify-between w-full ">
               <motion.div
                  initial={{
                     x: -1000,
                     opacity: 0,
                  }}
                  animate={{
                     x: 0,
                     opacity: 1,
                  }}
                  transition={{
                     duration: 2,
                     type: "spring",
                  }}
                  className="w-[250px]"
               >
                  <p>Start your journey towards your perfect home!</p>
                  <Link href={"/anunturi"}>
                     <motion.button
                        whileHover={{
                           scale: 1.1,
                           transition: { type: "spring", duration: 0.4 },
                        }}
                        whileTap={{
                           scale: 0.9,
                           transition: { type: "spring", duration: 0.4 },
                        }}
                        className="w-[140px] h-[40px] bg-primary/90 rounded-[40px] mt-5 text-lightText"
                     >
                        Get started
                     </motion.button>
                  </Link>
               </motion.div>
               <motion.div
                  initial={{
                     y: 1000,
                  }}
                  animate={{
                     y: 0,
                  }}
                  transition={{
                     duration: 2,
                     type: "spring",
                  }}
               >
                  <Image
                     src={HouseImage}
                     height={1000}
                     width={1000}
                     alt="home iamge"
                  ></Image>
               </motion.div>
               <motion.div
                  initial={{
                     x: 1000,
                     opacity: 0,
                  }}
                  animate={{
                     x: 0,
                     opacity: 1,
                  }}
                  transition={{
                     duration: 2,
                     type: "spring",
                  }}
                  className="flex flex-col items-center gap-1 justify-center"
               >
                  <div className="flex items-center justify-center gap-1">
                     <motion.div
                        whileHover={{
                           scale: 1.1,
                           transition: { type: "spring", duration: 0.4 },
                        }}
                        whileTap={{
                           scale: 0.9,
                           transition: { type: "spring", duration: 0.4 },
                        }}
                        className="w-[35px] h-[35px] flex items-center justify-center border-1 rounded-4xl"
                     >
                        <Image src={HomeIcon} alt="homr icon"></Image>
                     </motion.div>
                     <motion.button
                        whileHover={{
                           scale: 1.1,
                           transition: { type: "spring", duration: 0.4 },
                        }}
                        whileTap={{
                           scale: 0.9,
                           transition: { type: "spring", duration: 0.4 },
                        }}
                        className="h-[35px] w-[136px] text-center border-1 rounded-4xl"
                     >
                        3 camere
                     </motion.button>
                  </div>
                  <div className="flex gap-1">
                     <motion.button
                        whileHover={{
                           scale: 1.1,
                           transition: { type: "spring", duration: 0.4 },
                        }}
                        whileTap={{
                           scale: 0.9,
                           transition: { type: "spring", duration: 0.4 },
                        }}
                        className="h-[35px] w-[73px] text-center border-1 rounded-4xl"
                     >
                        etaj 1
                     </motion.button>
                     <motion.button
                        whileHover={{
                           scale: 1.1,
                           transition: { type: "spring", duration: 0.4 },
                        }}
                        whileTap={{
                           scale: 0.9,
                           transition: { type: "spring", duration: 0.4 },
                        }}
                        className="h-[35px] w-[93px] text-center border-1 rounded-4xl"
                     >
                        etaj 2
                     </motion.button>
                  </div>
               </motion.div>
            </div>
         </div>
      </>
   );
}
