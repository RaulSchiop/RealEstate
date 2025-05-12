'use client'
import {motion} from 'motion/react'
import { ReactNode } from 'react';
type Props = {
  children: ReactNode;
 onClick?: () => void;
 type:"button" | "submit" | "reset"
};
export default function MainBtnG({children,onClick,type="button"}:Props) {
   return (
      <motion.button onClick={onClick} type={type}
         whileHover={{
            scale: 1.1,
            transition: { type: "spring", duration: 0.4 },
         }}
         whileTap={{
            scale: 0.9,
            transition: { type: "spring", duration: 0.4 },
         }}
         className="w-[140px] h-[40px] bg-secondary rounded-[40px] mt-5 mb-10 lg:mb-0 text-lightText"
      >
         {children}
      </motion.button>
   );
}
