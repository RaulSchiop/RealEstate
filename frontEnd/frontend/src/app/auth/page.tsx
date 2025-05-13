"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import { useRouter } from "next/navigation";

export default function Auth() {
   const [change, setChange] = useState(true);
   const router = useRouter();

   function handleLayoutChange() {
      setChange(!change);
     
   }

   return (
      <div>
         <AnimatePresence mode="wait">
            {change === true ? (
               <motion.div
                  className="flex h-screen w-full items-center justify-center lg:gap-36 flex-wrap bg-bg sm:gap-10"
                  key="logInView"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
               >
                  <motion.div
                     key="LogIn"
                     initial={{ y: 500, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     exit={{ y: -500, opacity: 0 }}
                     transition={{ duration: 0.5 }}
                  >
                     <form
                        onSubmit={() => console.log("ads")}
                        className="flex flex-col gap-3"
                     >
                        <h1 className="text-Text text-3xl">Log in</h1>
                        <input
                           placeholder="Email"
                           name="Email"
                           type="email"
                           required
                           className="text-Text  placeholder-Text border  rounded px-4 py-2 focus:outline-none"
                        />
                        <input
                           placeholder="Password"
                           name="Password"
                           type="password"
                           required
                           className="text-Text  placeholder-Text border  rounded px-4 py-2 focus:outline-none"
                        />
                        <motion.button
                           whileHover={{
                              scale: 1.1,
                              transition: { type: "spring", duration: 0.4 },
                           }}
                           whileTap={{
                              scale: 0.9,
                              transition: { type: "spring", duration: 0.4 },
                           }}
                           className="h-10 bg-primary/90 rounded-[40px] mt-5 mb-10 lg:mb-0 text-lightText"
                        >
                           Log In
                        </motion.button>
                     </form>
                  </motion.div>

                  <motion.div
                     key="signIn"
                     initial={{ y: 500, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     exit={{ y: 500, opacity: 0 }}
                     transition={{ duration: 0.5 }}
                     className="flex flex-col gap-3"
                  >
                     <h1 className="text-Text text-3xl">Create Account</h1>
                     <p className="text-Text">
                        Register with your details to use our site
                     </p>
                     <motion.button
                        onClick={handleLayoutChange}
                        whileHover={{
                           scale: 1.1,
                           transition: { type: "spring", duration: 0.4 },
                        }}
                        whileTap={{
                           scale: 0.9,
                           transition: { type: "spring", duration: 0.4 },
                        }}
                        className="h-10 bg-primary/90 rounded-[40px] mt-5 mb-10 lg:mb-0 text-lightText"
                     >
                        Create new account
                     </motion.button>
                  </motion.div>
               </motion.div>
            ) : (
               <motion.div
                  key="registerView"
                  className="flex h-screen w-full items-center justify-center lg:gap-36 flex-wrap bg-bg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
               >
                  <motion.div
                     key="Register"
                     initial={{ y: 500, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     exit={{ y: -500, opacity: 0 }}
                     transition={{ duration: 0.5 }}
                  >
                     <form
                        className="flex flex-col gap-3"
                        onSubmit={() => console.log("sda")}
                     >
                        <h1 className="text-Text text-3xl">Register</h1>
                        <input
                           placeholder="Name"
                           name="name"
                           type="text"
                           required
                           className="text-Text  placeholder-Text border  rounded px-4 py-2 focus:outline-none"
                        />
                        <input
                           placeholder="Email"
                           name="Email"
                           type="email"
                           required
                           className="text-Text  placeholder-Text border  rounded px-4 py-2 focus:outline-none"
                        />
                        <input
                           placeholder="Password"
                           name="Password"
                           type="password"
                           required
                           className="text-Text placeholder-Text border  rounded px-4 py-2 focus:outline-none"
                        />
                        <motion.button
                           onClick={() => console.log("sda")}
                           whileHover={{
                              scale: 1.1,
                              transition: { type: "spring", duration: 0.4 },
                           }}
                           whileTap={{
                              scale: 0.9,
                              transition: { type: "spring", duration: 0.4 },
                           }}
                           className="h-10 bg-primary/90 rounded-[40px] mt-5 mb-10 lg:mb-0 text-lightText"
                        >
                           Register
                        </motion.button>
                     </form>
                  </motion.div>

                  <motion.div
                     className="flex flex-col gap-3"
                     key="signInAlt"
                     initial={{ y: 500, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     exit={{ y: 500, opacity: 0 }}
                     transition={{ duration: 0.5 }}
                  >
                     <h1 className="text-Text text-3xl">Log In</h1>
                     <p className="text-Text">Log in if you have an account</p>

                     <motion.button
                        onClick={handleLayoutChange}
                        whileHover={{
                           scale: 1.1,
                           transition: { type: "spring", duration: 0.4 },
                        }}
                        whileTap={{
                           scale: 0.9,
                           transition: { type: "spring", duration: 0.4 },
                        }}
                        className="h-10 bg-primary/90 rounded-[40px] mt-5 mb-10 lg:mb-0 text-lightText"
                     >
                        Log In
                     </motion.button>

                     <div></div>
                  </motion.div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
}
