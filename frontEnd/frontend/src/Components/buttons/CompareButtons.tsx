"use client";
import { motion } from "motion/react";
import { button } from "motion/react-client";
import { ReactNode } from "react";
type Props = {
   children: ReactNode;
   onClick?: () => void;
   type: "button" | "submit" | "reset";
   clasName?: string;
};
export default function Compare({
   children,
   onClick,
   type = "button",
   clasName,
}: Props) {
   return (
      <motion.button
         onClick={onClick}
         type={type}
         whileHover={{
            scale: 1.1,
            transition: { type: "spring", duration: 0.4 },
         }}
         whileTap={{
            scale: 0.9,
            transition: { type: "spring", duration: 0.4 },
         }}
         className={`py-2 px-4  bg-white rounded-[15px]  mb-10 lg:mb-0 text-black ${clasName}`}
      >
         {children}
      </motion.button>
   );
}
