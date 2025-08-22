"use client";
import { motion } from "motion/react";
import { button } from "motion/react-client";
import { ReactNode } from "react";
type Props = {
   children: ReactNode;
   onClick?: () => void;
   type: "button" | "submit" | "reset";
   state?: boolean;
};
export default function MainBtn({
   children,
   onClick,
   type = "button",
   state,
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
         className={`w-[140px] h-[40px] bg-primary/90 rounded-[40px]  mb-10 lg:mb-0 text-lightText ${
            state && "#A89C92 animate-pulse"
         }`}
         disabled={state}
      >
         {children}
      </motion.button>
   );
}
