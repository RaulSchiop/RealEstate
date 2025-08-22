"use client";
import MainBtn from "@/Components/buttons/Mainbtn";
import { motion, scale } from "motion/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function aiTools() {
   type AiToolSelect = {
      tool: "MORGAGE" | "COMPARE" | "";
   };

   type MorgageInput = {
      income: number;
      downPayment: number;
      rate: number;
      years: number;
      monthlyExpenses: number;
      maxDebtRatio: number;
      city: string;
   };

   const [logged, setLogged] = useState(false);
   const [aiToolsSelect, setAiToolsSelect] = useState<AiToolSelect>({
      tool: "",
   });
   const [inputsChange, setInputChange] = useState<MorgageInput>({
      income: 0,
      downPayment: 0,
      rate: 0,
      years: 0,
      monthlyExpenses: 0,
      maxDebtRatio: 0,
      city: "",
   });

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

   function handleIncomeChange(e: React.ChangeEvent<HTMLInputElement>) {
      const val = e.target.value;

      if (val === "" || /^[0-9]+$/.test(val)) {
         setInputChange((prev) => ({
            ...prev,
            income: val === "" ? 0 : Number(val),
         }));
      }
   }

   function handleDownPaymentChange(e: React.ChangeEvent<HTMLInputElement>) {
      const val = e.target.value;

      if (val === "" || /^[0-9]+$/.test(val)) {
         setInputChange((prev) => ({
            ...prev,
            downPayment: val === "" ? 0 : Number(val),
         }));
      }
   }

   function handleRateChange(e: React.ChangeEvent<HTMLInputElement>) {
      const val = e.target.value;

      if (val === "" || /^[0-9]+$/.test(val)) {
         setInputChange((prev) => ({
            ...prev,
            rate: val === "" ? 0 : Number(val),
         }));
      }
   }

   function handleYearsCahnge(e: React.ChangeEvent<HTMLInputElement>) {
      const val = e.target.value;

      if (val === "" || /^[0-9]+$/.test(val)) {
         setInputChange((prev) => ({
            ...prev,
            years: val === "" ? 0 : Number(val),
         }));
      }
   }

   function handleMonthlyExpensesChange(
      e: React.ChangeEvent<HTMLInputElement>
   ) {
      const val = e.target.value;

      if (val === "" || /^[0-9]+$/.test(val)) {
         setInputChange((prev) => ({
            ...prev,
            monthlyExpenses: val === "" ? 0 : Number(val),
         }));
      }
   }

   function handleMaxDebtRatioChange(e: React.ChangeEvent<HTMLInputElement>) {
      const val = e.target.value;

      if (val === "" || /^[0-9]+$/.test(val)) {
         setInputChange((prev) => ({
            ...prev,
            maxDebtRatio: val === "" ? 0 : Number(val),
         }));
      }
   }

   function handleCityChange(e: React.ChangeEvent<HTMLInputElement>) {
      const val = e.target.value;

      setInputChange((prev) => ({
         ...prev,
         city: val,
      }));
   }

   return (
      <div className="mt-30 px-20 mb-20 w-full h-screen ">
         <h1 className="text-2xl">
            Choose the <span className="text-secondary font-bold">Ai Tool</span>{" "}
            you need.
         </h1>
         <div className="flex items-center justify-center h-screen">
            <div className="flex items-center justify-center flex-col gap-10  w-[50%] ">
               <motion.div
                  onClick={() => setAiToolsSelect({ tool: "MORGAGE" })}
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
                  onClick={() => setAiToolsSelect({ tool: "COMPARE" })}
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

            {aiToolsSelect.tool === "" ? (
               <div className="flex items-center justify-center flex-col gap-10 w-[50%] ">
                  <div>
                     <h1 className="text-3xl font-bold">👋 Welcome!</h1>
                     <p className="w-[400px] mt-2 text-muted-foreground">
                        Pick a tool from the left to explore. Your workspace
                        will appear here once you make a selection.
                     </p>
                     <p className="w-[400px] mt-4 text-sm text-muted-foreground">
                        Use{" "}
                        <strong>Mortgage & Affordability Calculator AI</strong>{" "}
                        to understand your buying power, or try{" "}
                        <strong>Compare AI</strong> to explore apartments for
                        sale based on utilities, location benefits, and
                        neighborhood character. You can switch between tools
                        anytime — your chat and results will stay in this panel.
                     </p>
                  </div>
               </div>
            ) : aiToolsSelect.tool === "COMPARE" ? (
               <div className="flex items-center justify-center flex-col gap-10  w-[50%] ">
                  {" "}
                  <h1 className="text-2xl font-bold">Ai Compare ⚖️</h1>{" "}
               </div>
            ) : (
               <div className="flex items-center justify-center flex-col gap-10  w-[50%] h-screen lg:mt-80 ">
                  {" "}
                  <h1 className="text-2xl font-bold mt-5">Ai Morgage 🏦</h1>
                  <form className="flex flex-col items-end justify-center mt-5 w-[80%]">
                     <input
                        className="px-2 py-4 bg-[#F5F3EE] w-full rounded mb-3"
                        placeholder="Income"
                        type="number"
                     ></input>
                     <input
                        className="px-2 py-4 bg-[#F5F3EE] w-full rounded mb-3"
                        placeholder="Down Payment"
                        type="number"
                     ></input>
                     <input
                        className="px-2 py-4 bg-[#F5F3EE] w-full rounded mb-3"
                        placeholder="Interest rate"
                        type="number"
                     ></input>
                     <input
                        className="px-2 py-4 bg-[#F5F3EE] w-full rounded mb-3"
                        placeholder="Morgage Period"
                        type="number"
                     ></input>
                     <input
                        className="px-2 py-4 bg-[#F5F3EE] w-full rounded mb-3"
                        placeholder="Monthly Expenses"
                        type="number"
                     ></input>
                     <input
                        className="px-2 py-4 bg-[#F5F3EE] w-full rounded mb-3"
                        placeholder="Max Debt Ratio"
                        type="number"
                     ></input>
                     <input
                        className="px-2 py-4 bg-[#F5F3EE] w-full rounded mb-3"
                        placeholder="City"
                     ></input>
                     <MainBtn type="submit">Submit</MainBtn>
                  </form>
                  <div className="flex flex-col items-end justify-center mt-5 w-[80%]">
                     <div className="w-full  mb-5">
                        <h1 className="text-xl font-bold">💰 Income</h1>
                        <p className="text-secondary/80">
                           Your monthly net income (after taxes and deductions).
                        </p>
                     </div>
                     <div className="w-full  mb-5">
                        <h1 className="text-xl font-bold">🏦 Down Payment</h1>
                        <p className="text-secondary/80">
                           The amount of money you can pay upfront for the
                           property.
                        </p>
                     </div>
                     <div className="w-full  mb-5">
                        <h1 className="text-xl font-bold">📉 Interest Rate</h1>
                        <p className="text-secondary/80">
                           Annual interest rate offered by the bank (e.g., 5%).
                        </p>
                     </div>
                     <div className="w-full  mb-5">
                        <h1 className="text-xl font-bold">
                           📅 Mortgage Period
                        </h1>
                        <p className="text-secondary/80">
                           The loan repayment period in years (e.g., 20 or 30
                           years).
                        </p>
                     </div>
                     <div className="w-full  mb-5">
                        <h1 className="text-xl font-bold">
                           🧾 Monthly Expenses
                        </h1>
                        <p className="text-secondary/80">
                           Your regular monthly expenses (bills, food, debts,
                           etc.).
                        </p>
                     </div>
                     <div className="w-full  mb-5">
                        <h1 className="text-xl font-bold">📊 Max Debt Ratio</h1>
                        <p className="text-secondary/80">
                           The maximum percentage of your income that can go
                           toward loan repayment (e.g., 35%).
                        </p>
                     </div>
                     <div className="w-full  mb-5">
                        <h1 className="text-xl font-bold">🏙️ City</h1>
                        <p className="text-secondary/80">
                           The city where you plan to buy the apartment (affects
                           property prices).
                        </p>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}
