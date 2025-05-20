"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import { useRouter } from "next/navigation";

type logInType = {
   email: string;
   password: string;
};

type register = {
   email: string;
   password: string;
   name: string;
};

export default function Auth() {
   const [change, setChange] = useState(true);
   const router = useRouter();
   const [logIn, setLogIn] = useState<logInType>({
      email: "",
      password: "",
   });
   const [error, setError] = useState(false);
   const [register, setRegister] = useState<register>({
      name: "",
      email: "",
      password: "",
   });
   const [emailTouched, setEmailTouched] = useState(false);
   const [emailValid, setEmailValid] = useState(true);

   function handleLayoutChange() {
      setChange(!change);
      setError(false);
      setEmailTouched(false);
   }

   function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
      const { name, value } = e.target;
      setLogIn((prev) => ({
         ...prev,
         [name]: value,
      }));
      setError(false);
   }

   function handleRegisterChange(e: React.ChangeEvent<HTMLInputElement>) {
      const { name, value } = e.target;

      setRegister((prev) => ({
         ...prev,
         [name]: value,
      }));

      if (name === "email") {
         setEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
      }
   }

   async function handleSubbmitR(e: React.FormEvent) {
      e.preventDefault();
      console.log(logIn);

      const response = await fetch("http://localhost:8080/auth/Register", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            name: register.name,
            email: register.email,
            password: register.password,
         }),
      });

      if (!response.ok) {
         setError(true);
      }

      setChange(true);
   }

   async function handleSubbmit(e: React.FormEvent) {
      e.preventDefault();
      console.log(logIn);

      const response = await fetch("http://localhost:8080/auth/login", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            email: logIn.email,
            password: logIn.password,
         }),
      });

      if (!response.ok) {
         setError(true);
      } else {
         const data = await response.json();

         localStorage.setItem("logged", JSON.stringify(data));
         router.push("/");
      }
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
                        onSubmit={handleSubbmit}
                        className="flex flex-col gap-3"
                     >
                        <h1 className="text-Text text-3xl">Log in</h1>
                        <input
                           placeholder={`${error === true ? "Enter a valid Email" : "Email"}`} 
                           name="email"
                           type="email"
                           onChange={handleInputChange}
                           value={logIn.email}
                           required
                           className={`  placeholder-Text border  rounded px-4 py-2 focus:outline-none  ${
                              error && "text-red-500 border-red-500"
                           } `}
                        />
                        <input
                           placeholder={`${error === true ? "Enter a valid password" : "Password"}`}  
                           name="password"
                           type="password"
                           onChange={handleInputChange}
                           value={logIn.password}
                           required
                           className={`  placeholder-Text border  rounded px-4 py-2 focus:outline-none ${
                              error && " text-red-500 border-red-500"
                           } `}
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
                        onSubmit={handleSubbmitR}
                     >
                        <h1 className="text-Text text-3xl">Register</h1>
                        <input
                           placeholder="Name"
                           name="name"
                           type="text"
                           onChange={handleRegisterChange}
                           value={register.name}
                           required
                           className="text-Text  placeholder-Text border  rounded px-4 py-2 focus:outline-none"
                        />
                        <input
                           placeholder={`${emailTouched && !emailValid ? "Enter a valid Email":"Email"}`}
                           name="email"
                           type="email"
                           onChange={handleRegisterChange}
                           onBlur={() => setEmailTouched(true)}
                           value={register.email}
                           required
                           className={`placeholder-Text border rounded px-4 py-2 focus:outline-none ${
                              emailTouched && !emailValid
                                 ? "text-red-500 border-red-500"
                                 : ""
                           }`}
                        />
                        <input
                           placeholder="Password"
                           name="password"
                           type="password"
                           onChange={handleRegisterChange}
                           value={register.password}
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
