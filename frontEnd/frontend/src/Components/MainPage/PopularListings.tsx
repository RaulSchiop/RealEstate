"use client";
import List from "../Utils/List";
import dummyphoto from "../../../public/Bed Outline Icon from Real Estate.png";
import Link from "next/link";
import { useInView, motion } from "motion/react";
import { useRef } from "react";

export default function PoluparListings() {
   const ref = useRef(null);
   const isInView = useInView(ref, {
      once: true,
      amount: 0.2,
   });

   return (
      <motion.div
         ref={ref}
         initial={{ opacity: 0, x: -500 }}
         animate={isInView ? { opacity: 1, x: 0 } : {}}
         className="mt-20  flex items-center justify-center flex-col"
      >
         <div className="flex justify-between items-center px-20 w-full lg:gap-0 gap-3">
            <h1 className="lg:text-text lg:text-[28px]  ">Polpular listings</h1>
            <Link href={"/anunturi"} className="lg:text-secondary text-[16px] transition delay-150 duration-300 ease-in-out hover:scale-110">
               See all
            </Link>
         </div>
         <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mt-5 gap-10">
            <List
               photo={dummyphoto}
               camere={2}
               suprafata={50}
               pret={20000}
            ></List>
            <List
               photo={dummyphoto}
               camere={2}
               suprafata={50}
               pret={20000}
            ></List>
            <List
               photo={dummyphoto}
               camere={2}
               suprafata={50}
               pret={20000}
            ></List>
            <List
               photo={dummyphoto}
               camere={2}
               suprafata={50}
               pret={20000}
            ></List>
         </ul>




      </motion.div>
   );
}
