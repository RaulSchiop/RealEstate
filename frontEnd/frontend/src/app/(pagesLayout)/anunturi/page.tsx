"use client";
import List from "../../../Components/Utils/List";
import dummyphoto from "../../../../public/Bed Outline Icon from Real Estate.png";
import Link from "next/link";
import MainBtnB from "../../../Components/buttons/MainBtnG";
import Footer from "@/Components/Footer/Footer";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function Anunturi() {
   const [valueS, setValueS] = useState<number>(0);
   const [valueP, setValueP] = useState<number>(0);
   const [valueLoc, setValueLoc] = useState("");
   const [listings, setListings] = useState<
      Array<{
         id: number;
         titlu: string;
         descriere: string;
         anConstructie: Date;
         pozes: { path: string }[];
         camere: number;
         etaj: number;
         locatie: string;
         nrEtaje: number;
         nrTel: number;
         suprafataCurte: string;
         suprafataUtila: number;
         pret: number;
      }>
   >([]);

   function handleChangeSize(e: React.ChangeEvent<HTMLInputElement>) {
      const val = e.target.value;

      if (val === "" || /^[0-9]+$/.test(val)) {
         setValueS(val === "" ? 0 : Number(val));
      }
   }

   function handleChangePrice(e: React.ChangeEvent<HTMLInputElement>) {
      const val = e.target.value;

      if (val === "" || /^[0-9]+$/.test(val)) {
         setValueP(val === "" ? 0 : Number(val));
      }
   }

   function handleChangeLoc(e: React.ChangeEvent<HTMLInputElement>) {
      setValueLoc(e.target.value);
   }

   function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();

      const formData = new FormData();
      formData.append("locFilter", valueLoc);
      formData.append("sizeFilter", valueS.toString());
      formData.append("priceFilter", valueP.toString());

      console.log(formData);
   }

   useEffect(() => {
      async function fechAllAnunturi() {
         const response = await fetch("http://localhost:8080/anunturi");
         const data = await response.json();
         console.log(data);
         setListings(data);
      }
      fechAllAnunturi();
   }, []);

   return (
      <>
         <motion.div
            initial={{ opacity: 0, x: 1000 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="pt-[120px] flex items-center justify-center flex-col"
         >
            <form
               onSubmit={handleSubmit}
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
            
            </form>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mt-5 gap-5">
               {listings.length > 0 ? (
                  listings
                     .filter((data) => {
                        return (
                           data.locatie
                              .toLowerCase()
                              .includes(valueLoc.toLowerCase()) &&
                           (valueS ? data.suprafataUtila >= valueS : true) && 
                           (valueP ? data.pret <= valueP : true)
                        );
                     })
                     .map((data, index) => {
                        const firstPhoto = data.pozes?.[0]?.path;

                        return (
                           <List
                              key={index}
                              photo={
                                 firstPhoto
                                    ? `http://localhost:8080/images/${firstPhoto}`
                                    : dummyphoto.src
                              }
                              camere={data.camere}
                              suprafata={data.suprafataUtila}
                              pret={data.pret}
                              locatie={data.locatie}
                           />
                        );
                     })
               ) : (
                  <p>No listings available</p>
               )}
            </ul>
         </motion.div>
        
      </>
   );
}
