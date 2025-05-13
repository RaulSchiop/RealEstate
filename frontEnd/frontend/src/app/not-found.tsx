"use client";
import Link from "next/link";
import { motion } from "motion/react";

export default function Notfound() {
   return (
      <div className="h-screen w-screen flex items-center justify-center bg-background ">
         <div>
            <motion.p
               initial={{ opacity: 0, x: -1000 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 1, type: "spring" }}
               className="text-accent text-6xl font-bold"
            >
               404
            </motion.p>
            <motion.h1
               initial={{ opacity: 0, x: 1000 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 1, type: "spring" }}
               className="text-5xl text-text font-bold"
            >
               Page not found
            </motion.h1>
            <motion.p
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 4 }}
               className="text-text mt-1"
            >
               Sorry, we couldn't find the page you're looking for.
            </motion.p>
            <Link href={"/"}>
               <motion.div
                  initial={{ opacity: 0 ,x:-1000}}
                  animate={{ opacity: 1,x:0}}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring" ,  duration: 1  }}
                  className="mt-5 bg-secondary p-2 rounded-md text-lightText w-40 text-center"
               >
                  <h1> Go back home</h1>
               </motion.div>
            </Link>
         </div>
      </div>
   );
}