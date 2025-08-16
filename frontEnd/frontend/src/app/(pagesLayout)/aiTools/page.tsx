"use client";
import { motion, scale } from "motion/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function aiTools() {
   const [logged, setLogged] = useState(false);

   const router = useRouter();
   useEffect(() => {
      const localS = localStorage.getItem("logged");
      if (localS) {
         const parsed = JSON.parse(localS);
         setLogged(true);
      } else {
         router.push("/");
      }
   }, []);

   if (!logged) {
      return;
   }

   return (
      <div className="mt-30 px-20 mb-20 w-full h-screen ">
         <h1 className="text-2xl">
            Choose the <span className="text-secondary font-bold">Ai Tool</span>{" "}
            you need.
         </h1>
         <div className="mt-5 flex items-center justify-center">
            <div className="flex items-center justify-center flex-col gap-10  w-[50%] ">
               <motion.div
                  whileHover={{
                     scale: 1.1,
                     transition: { type: "spring", duration: 0.4 },
                  }}
                  whileTap={{
                     scale: 0.9,
                     transition: { type: "spring", duration: 0.4 },
                  }}
                  className="bg-[#F5F3EE]  h-80 flex items-center justify-center flex-col gap-10 rounded-2xl overflow-y-auto"
                  style={{ maxHeight: "350px" }}
               >
                  <h1 className="font-bold text-2xl text-secondary/80">
                     Mortgage & Affordability Calculator Ai
                  </h1>
                  <p className="w-[80%]">
                     An intelligent financial tool that helps you quickly
                     estimate your monthly mortgage payments, total loan costs,
                     and the home price you can comfortably afford—based on your
                     income, expenses, interest rates, and down payment.
                  </p>
               </motion.div>
               <motion.div
                  whileHover={{
                     scale: 1.1,
                     transition: { type: "spring", duration: 0.4 },
                  }}
                  whileTap={{
                     scale: 0.9,
                     transition: { type: "spring", duration: 0.4 },
                  }}
                  className="bg-[#F5F3EE]  h-80 flex items-center justify-center flex-col gap-5 rounded-2xl"
               >
                  <h1 className="font-bold text-2xl  text-secondary/80">
                     Compare Ai
                  </h1>
                  <p className="w-[80%]">
                     An AI-powered tool that helps homebuyers compare apartments
                     for sale based on utilities, location benefits, and
                     neighborhood character. Easily see differences in available
                     utilities (water, electricity, internet, heating) and
                     explore detailed, AI-generated profiles for each
                     area—covering safety, walkability, transport links, green
                     spaces, shops, and cultural hotspots. Designed for buyers
                     who care about lifestyle, convenience, and long-term
                     livability, Compare AI goes beyond property specs to show
                     you what it’s really like to live there.
                  </p>
               </motion.div>
            </div>

            <div className="flex items-center justify-center flex-col gap-10  w-[50%] ">
               <div>
                  <h1 className="text-3xl font-bold">👋 Welcome!</h1>
                  <p className="w-[400px] mt-2 text-muted-foreground">
                     Pick a tool from the left to explore. Your workspace will
                     appear here once you make a selection.
                  </p>
                  <p className="w-[400px] mt-4 text-sm text-muted-foreground">
                     Use <strong>Mortgage & Affordability Calculator AI</strong>{" "}
                     to understand your buying power, or try{" "}
                     <strong>Compare AI</strong> to explore apartments for sale
                     based on utilities, location benefits, and neighborhood
                     character. You can switch between tools anytime — your chat
                     and results will stay in this panel.
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}
