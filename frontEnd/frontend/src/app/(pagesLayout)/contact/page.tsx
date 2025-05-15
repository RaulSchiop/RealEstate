"use client";
import Footer from "@/Components/Footer/Footer";
import MainBtn from "../../../Components/buttons/Mainbtn";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Contact() {
   const [valueE, setValueE] = useState("");
   const [valueN, setvalueN] = useState("");
   const [valueD, setvalueD] = useState("");
   const [valueP, setVlaueP] = useState("");

   const router = useRouter();

   function handleChangeNrPhone(e: React.ChangeEvent<HTMLInputElement>) {
      const val = e.target.value;

      if (val === "" || /^[0-9]+$/.test(val)) {
         setVlaueP(val);
      }
   }

   function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
      setValueE(e.target.value);
   }

   function handleChangeDescription(e: React.ChangeEvent<HTMLTextAreaElement>) {
      setvalueD(e.target.value);
   }

   function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
      setvalueN(e.target.value);
   }

   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const data = {
         email: valueE,
         name: valueN,
         problem: valueD,
         phoneNumber: Number(valueP),
      };

      const response = await fetch("http://localhost:8080/contact", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
      });

      if (response.ok) {
         router.push("/");
      }
   }

   return (
      <>
         <div className="w-full mt-40">
            <div className="mx-2 p-10 sm:mx-20 lg:mx-20 flex flex-col py-20 items-center justify-center gap-y-10 border-secondary border-2 rounded-[60px]">
               <h1 className="text-accent text-3xl">Contact Us</h1>
               <form
                  onSubmit={handleSubmit}
                  className="w-full flex flex-col justify-center items-center gap-5"
               >
                  <div className="flex lg:flex-row flex-col w-[80%] gap-3 mb-5">
                     <input
                        onChange={handleChangeEmail}
                        value={valueE}
                        className="lg:w-[50%]  h-5 p-4 outline-0 text-text border-secondary border-b-2"
                        placeholder="Email"
                     ></input>
                     <input
                        onChange={handleChangeName}
                        value={valueN}
                        className="lg:w-[50%] h-5 p-4 outline-0 text-text border-secondary border-b-2"
                        placeholder="Name"
                     ></input>
                  </div>
                  <div className="flex flex-col w-[80%]">
                     <textarea
                        onChange={handleChangeDescription}
                        value={valueD}
                        className=" p-4 outline-0 text-text border-secondary border-1 h-32"
                        placeholder="Describe your needs"
                     ></textarea>
                  </div>

                  <div className="flex w-[80%] justify-end items-center  gap-6">
                     <input
                        onChange={handleChangeNrPhone}
                        value={valueP}
                        className="lg:w-[100%] w-[50%] p-2 outline-0 text-text border-secondary  border-b-2"
                        placeholder="Phone Number"
                     ></input>
                     <div className="mt-5">
                        <MainBtn type="submit">Submit</MainBtn>
                     </div>
                  </div>
               </form>
            </div>
         </div>
         <Footer></Footer>
      </>
   );
}
