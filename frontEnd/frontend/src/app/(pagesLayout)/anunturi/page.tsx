"use client";
import List from "../../../Components/Utils/List";
import dummyphoto from "../../../../public/Bed Outline Icon from Real Estate.png";
import Link from "next/link";
import MainBtnB from "../../../Components/buttons/MainBtnG";
import Footer from "@/Components/Footer/Footer";
import { useState } from "react";
import { motion } from "motion/react";

export default function Anunturi() {
   const [valueS, setValueS] = useState("");
   const [valueP, setValueP] = useState("");
   const [valueLoc, setValueLoc] = useState("");

   function handleChangeSize(e: React.ChangeEvent<HTMLInputElement>) {
      const val = e.target.value;

      if (val === "" || /^[0-9]+$/.test(val)) {
         setValueS(val);
      }
   }
   function handleChangePrice(e: React.ChangeEvent<HTMLInputElement>) {
      const val = e.target.value;

      if (val === "" || /^[0-9]+$/.test(val)) {
         setValueP(val);
      }
   }
   function handleChangeLoc(e: React.ChangeEvent<HTMLInputElement>) {
      setValueLoc(e.target.value);
   }

   function handleSubbmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();

      const formData = new FormData();
      formData.append("locFilter", valueLoc);
      formData.append("sizeFilter", valueS);
      formData.append("priceFilter", valueP);

      console.log(formData);
   }

   return (
      <>
         <motion.div
            initial={{ opacity: 0, x: 1000 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="pt-[120px] flex items-center justify-center flex-col"
         >
            <form
               onSubmit={handleSubbmit}
               className="flex lg:w-[90%] flex-col md:flex-row justify-between  items-center p-5 "
            >
               <div>
                  <h1 className="text-text">LOCATION</h1>
                  <input
                     onChange={handleChangeLoc}
                     value={valueLoc}
                     className="text-accent/80 border-b-1 border-accent/80 focus:outline-none"
                     placeholder="Enter a City"
                  ></input>
               </div>
               <div>
                  <h1 className="text-text">Apartament Size</h1>
                  <input
                     onChange={handleChangeSize}
                     value={valueS}
                     className="text-accent/80 border-b-1 border-accent/80 focus:outline-none "
                     placeholder="Enter Min Size in m2"
                  ></input>
               </div>
               <div>
                  <h1 className="text-text">Max Price</h1>
                  <input
                     onChange={handleChangePrice}
                     value={valueP}
                     className="text-accent/80 border-b-1 border-accent/80 focus:outline-none"
                     placeholder="Enter Max Price"
                  ></input>
               </div>
               <div className="flex items-center justify-center">
                  <MainBtnB type="submit">Search</MainBtnB>
               </div>
            </form>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mt-5 gap-10">
               <List
                  photo={dummyphoto}
                  camere={2}
                  suprafata={50}
                  pret={20000}
               ></List>
               <List
                  photo={dummyphoto}
                  camere={2}
                  suprafata={50}
                  pret={20000}
               ></List>
               <List
                  photo={dummyphoto}
                  camere={2}
                  suprafata={50}
                  pret={20000}
               ></List>
               <List
                  photo={dummyphoto}
                  camere={2}
                  suprafata={50}
                  pret={20000}
               ></List>
               <List
                  photo={dummyphoto}
                  camere={2}
                  suprafata={50}
                  pret={20000}
               ></List>

               <List
                  photo={dummyphoto}
                  camere={2}
                  suprafata={50}
                  pret={20000}
               ></List>
               <List
                  photo={dummyphoto}
                  camere={2}
                  suprafata={50}
                  pret={20000}
               ></List>
               <List
                  photo={dummyphoto}
                  camere={2}
                  suprafata={50}
                  pret={20000}
               ></List>
               <List
                  photo={dummyphoto}
                  camere={2}
                  suprafata={50}
                  pret={20000}
               ></List>
               <List
                  photo={dummyphoto}
                  camere={2}
                  suprafata={50}
                  pret={20000}
               ></List>
               <List
                  photo={dummyphoto}
                  camere={2}
                  suprafata={50}
                  pret={20000}
               ></List>
            </ul>
         </motion.div>
         <Footer></Footer>
      </>
      
   );
}
