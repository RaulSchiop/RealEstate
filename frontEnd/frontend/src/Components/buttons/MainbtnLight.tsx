'use client'
import {motion} from 'motion/react'
import { ReactNode } from 'react';
type Props = {
  children: ReactNode;
 onClick?: () => void;
};
export default function MainBtnLight({children,onClick}:Props) {
   return (
      <motion.button onClick={onClick}
         whileHover={{
            scale: 1.1,
            transition: { type: "spring", duration: 0.4 },
         }}
         whileTap={{
            scale: 0.9,
            transition: { type: "spring", duration: 0.4 },
         }}
         className="w-[140px] h-[40px] bg-bg rounded-[40px] mt-5 mb-10 lg:mb-0 text-text"
      >
         {children}
      </motion.button>
   );
}
