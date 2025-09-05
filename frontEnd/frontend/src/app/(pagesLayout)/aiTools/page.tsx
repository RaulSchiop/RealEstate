"use client";
import MainBtn from "@/Components/buttons/Mainbtn";
import Modal from "@/Components/Modal/Modal";
import { motion, scale } from "motion/react";
import { form } from "motion/react-client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useCompareContxt } from "@/Components/context/compareContext";

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

   type MortgageResult = {
      mode: "Aggressive" | "Moderate" | "Conservative";
      mortgage_affordable: number;
      monthly_payment: number;
      apartment_price: number;
      dos?: string[];
      donts?: string[];
      apartamentType: string;
   };

   const { id } = useCompareContxt();
   const [jwt, setJwt] = useState("");
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
   const [morgageAiResponse, setMorgageAiResponse] =
      useState<MortgageResult[]>();
   const [loading, setLoading] = useState(false);
   const [modal, setModalOpen] = useState(false);

   const router = useRouter();
   useEffect(() => {
      const localS = localStorage.getItem("logged");
      if (localS) {
         const parsed = JSON.parse(localS);
         setJwt(parsed.message);
         setLogged(true);
      } else {
         router.push("/");
      }
   }, []);

   if (!logged) {
      return;
   }
   function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const { name, value } = e.target;

      if (name === "city") {
         setInputChange((prev) => ({ ...prev, city: value }));
      } else {
         if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
            setInputChange((prev) => ({
               ...prev,
               [name]: value === "" ? 0 : Number(value),
            }));
         }
      }
   }

   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      setLoading(true);

      const formData = new FormData();
      formData.append("income", inputsChange.income.toString());
      formData.append("downPayment", inputsChange.downPayment.toString());
      formData.append("rate", inputsChange.rate.toString());
      formData.append("years", inputsChange.years.toString());
      formData.append(
         "monthlyExpenses",
         inputsChange.monthlyExpenses.toString()
      );
      formData.append("maxDebtRatio", inputsChange.maxDebtRatio.toString());
      formData.append("city", inputsChange.city);

      try {
         const response = await fetch("http://localhost:8080/chat/MorgageAi", {
            headers: {
               Authorization: `Bearer ${jwt}`,
            },
            method: "POST",
            body: formData,
         });

         if (response.ok) {
            setMorgageAiResponse(await response.json());
         } else {
            throw new Error("error");
         }
      } catch (err) {
         console.log(err);
      } finally {
         setLoading(false);
      }
      console.log(inputsChange);
   }

   console.log(morgageAiResponse);

   function handleOnClose() {
      setModalOpen(false);
   }

   function handleOpenModal() {
      setModalOpen(true);
   }

   console.log(id);
   return (
      <div className="mt-30 px-20 mb-20 w-full h-screen ">
         <Modal show={modal} onClose={handleOnClose}>
            <div className="w-full h-full flex flex-col items-center justify-center p-2 md:p-8">
               <h1 className="text-3xl font-bold text-white mb-6">
                  🏦 Mortgage AI Calculator
               </h1>
               <div className="w-full  flex flex-col gap-8">
                  {morgageAiResponse?.map((morg, idx) => (
                     <div
                        key={idx}
                        className="bg-[#F5F3EE] rounded-xl shadow-lg border border-[#EDE6DD] p-6 mb-2 flex flex-col gap-4"
                     >
                        <div className="flex flex-col md:flex-row md:gap-8 gap-2">
                           <div className="flex-1">
                              <h2 className="text-xl font-bold text-[#3C6E47] mb-2">
                                 Type:{" "}
                                 <span className="font-normal text-secondary">
                                    {morg.mode}
                                 </span>
                              </h2>
                              <p className="text-lg text-[#4B2E05] mb-1">
                                 💰 Affordability:{" "}
                                 <span className="font-bold">
                                    {morg.mortgage_affordable.toLocaleString(
                                       undefined,
                                       { maximumFractionDigits: 2 }
                                    )}{" "}
                                    €
                                 </span>
                              </p>
                              <p className="text-lg text-[#4B2E05] mb-1">
                                 📆 Monthly Payment:{" "}
                                 <span className="font-bold">
                                    {morg.monthly_payment.toLocaleString(
                                       undefined,
                                       { maximumFractionDigits: 2 }
                                    )}{" "}
                                    €
                                 </span>
                              </p>
                              <p className="text-lg text-[#4B2E05] mb-1">
                                 🏠 Apartment Price:{" "}
                                 <span className="font-bold">
                                    {morg.apartment_price.toLocaleString(
                                       undefined,
                                       { maximumFractionDigits: 2 }
                                    )}{" "}
                                    €
                                 </span>
                              </p>
                           </div>
                           <div className="flex-1">
                              <h2 className="text-lg font-semibold text-[#3C6E47] mb-2">
                                 🏷️ Apartment Type
                              </h2>
                              <p className="text-[#4B2E05]">
                                 {morg.apartamentType}
                              </p>
                           </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                           <div>
                              <h3 className="text-md font-bold text-[#3C6E47] mb-2">
                                 ✅ Dos
                              </h3>
                              <ul className="list-disc ml-5 text-[#4B2E05]">
                                 {morg.dos?.map((dos, i) => (
                                    <li key={i} className="mb-1">
                                       {dos}
                                    </li>
                                 ))}
                              </ul>
                           </div>
                           <div>
                              <h3 className="text-md font-bold text-[#A94442] mb-2">
                                 🚫 Don'ts
                              </h3>
                              <ul className="list-disc ml-5 text-[#A94442]">
                                 {morg.donts?.map((donts, i) => (
                                    <li key={i} className="mb-1">
                                       {donts}
                                    </li>
                                 ))}
                              </ul>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </Modal>
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
               <div className="flex items-center justify-center flex-col gap-10  w-[50%] h-screen lg:mt-150 ">
                  {" "}
                  <h1 className="text-2xl font-bold mt-5">Ai Morgage 🏦</h1>
                  <form
                     onSubmit={handleSubmit}
                     className="flex flex-col items-start justify-center mt-5 w-[80%]"
                  >
                     <label className="w-full mb-3">
                        <span className="block mb-1 font-medium text-secondary">
                           Income
                        </span>
                        <input
                           onChange={handleChange}
                           className="px-2 py-4 bg-[#F5F3EE] w-full rounded"
                           type="number"
                           name="income"
                           placeholder="ex:2000"
                        />
                     </label>

                     <label className="w-full mb-3">
                        <span className="block mb-1 font-medium text-secondary">
                           Down Payment
                        </span>
                        <input
                           onChange={handleChange}
                           className="px-2 py-4 bg-[#F5F3EE] w-full rounded"
                           type="number"
                           name="downPayment"
                           placeholder="ex:20000"
                        />
                     </label>

                     <label className="w-full mb-3">
                        <span className="block mb-1 font-medium text-secondary">
                           Interest Rate
                        </span>
                        <input
                           onChange={handleChange}
                           className="px-2 py-4 bg-[#F5F3EE] w-full rounded"
                           type="number"
                           step="0.10"
                           name="rate"
                           placeholder="ex:6.2"
                        />
                     </label>

                     <label className="w-full mb-3">
                        <span className="block mb-1 font-medium text-secondary">
                           Mortgage Period (Years)
                        </span>
                        <input
                           onChange={handleChange}
                           className="px-2 py-4 bg-[#F5F3EE] w-full rounded"
                           type="number"
                           name="years"
                           placeholder="ex:30"
                        />
                     </label>

                     <label className="w-full mb-3">
                        <span className="block mb-1 font-medium text-secondary">
                           Monthly Expenses
                        </span>
                        <input
                           onChange={handleChange}
                           className="px-2 py-4 bg-[#F5F3EE] w-full rounded"
                           type="number"
                           name="monthlyExpenses"
                           placeholder="ex:1000"
                        />
                     </label>

                     <label className="w-full mb-3">
                        <span className="block mb-1 font-medium text-secondary">
                           Max Debt Ratio (%)
                        </span>
                        <input
                           onChange={handleChange}
                           className="px-2 py-4 bg-[#F5F3EE] w-full rounded"
                           type="number"
                           step="0.1"
                           name="maxDebtRatio"
                           placeholder="ex:50"
                        />
                     </label>

                     <label className="w-full mb-5">
                        <span className="block mb-1 font-medium text-secondary">
                           City
                        </span>
                        <input
                           onChange={handleChange}
                           className="px-2 py-4 bg-[#F5F3EE] w-full rounded"
                           type="text"
                           name="city"
                           placeholder="ex:London"
                        />
                     </label>
                     {morgageAiResponse ? (
                        <MainBtn type="button" onClick={handleOpenModal}>
                           See Ai Response
                        </MainBtn>
                     ) : loading ? (
                        <MainBtn type="submit" state={true}>
                           Loading
                        </MainBtn>
                     ) : (
                        <MainBtn type="submit">Submit</MainBtn>
                     )}
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
