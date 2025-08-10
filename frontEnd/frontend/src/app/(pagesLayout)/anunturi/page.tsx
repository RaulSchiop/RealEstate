"use client";
import List from "../../../Components/Utils/List";
import dummyphoto from "../../../../public/Bed Outline Icon from Real Estate.png";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Modal from "@/Components/Modal/Modal";
import Image from "next/image";
import MainBtn from "@/Components/buttons/Mainbtn";

type RealEstateItem = {
   id: number;
   pozes: { path: string }[];
   camere: number;
   suprafataUtila: number;
   pret: number;
   titlu: string;
   descriere: string;
   etaj: number;
   nrEtaje: number;
   anConstructie: number;
   suprafataCurte: number;
   nrTel: number;
   locatie: string;
};

type RealEstateList = RealEstateItem[];
export default function Anunturi() {
   const [valueS, setValueS] = useState<number>(0);
   const [valueP, setValueP] = useState<number>(0);
   const [valueLoc, setValueLoc] = useState("");
   const [listings, setListings] = useState<RealEstateList>([]);
   const [modalOpen, setModalOpen] = useState(false);
   const [selectedProduct, setSelectedProduct] = useState<RealEstateItem>();
   const [clicked, setClicked] = useState(false);

   function toggleClicked() {
      setClicked(!clicked);
   }

   function handleModalClose() {
      setModalOpen(false);
   }

   function handleModalOpen(product: RealEstateItem) {
      setModalOpen(true);
      setSelectedProduct(product);
   }

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
                 {/* <div>
                     <MainBtn type="button" onClick={toggleClicked}>Change theme</MainBtn>
                  </div> */}
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
                           <div
                              key={data.id}
                              onClick={() => handleModalOpen(data)}
                           >
                              <List
                                 clicked={clicked}
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
                              {modalOpen && selectedProduct === data && (
                                 <Modal
                                    show={modalOpen}
                                    onClose={handleModalClose}
                                 >
                                    <div className="bg-secondary h-[700px] flex items-center gap-2 flex-col justify-center rounded-[20px] p-4 ">
                                       <div className="flex items-center justify-between w-full">
                                          <h1 className="text-[30px] font-bold text-lightText">
                                             {data.titlu}
                                          </h1>
                                          <h1 className="text-[20px] text-lightText">
                                             {data.pret} €
                                          </h1>
                                       </div>
                                       <div className="relative w-full h-[700px] rounded-xl overflow-hidden">
                                          <Image
                                             src={`http://localhost:8080/images/${firstPhoto}`}
                                             alt="listing image"
                                             layout="fill"
                                             objectFit="cover"
                                             className="rounded-xl"
                                          />
                                       </div>

                                       <div className="grid lg:grid-cols-5 lg:grid-rows-2 md:grid-cols-2 md:grid-rows-2 gap-4 mt-6 w-full">
                                          <div className="bg-accent p-1 rounded-xl flex items-center justify-center">
                                             <p className="text-[20px] text-lightText">
                                                {data.camere} rooms
                                             </p>
                                          </div>
                                          {data.etaj > 0 && (
                                             <div className="bg-accent p-1 rounded-xl flex items-center justify-center">
                                                <p className="text-[20px] text-lightText">
                                                   at floor {data.etaj}
                                                </p>
                                             </div>
                                          )}
                                          {data.nrEtaje > 0 && (
                                             <div className="bg-accent p-1 rounded-xl flex items-center justify-center">
                                                <p className="text-[15px] text-lightText">
                                                   {data.nrEtaje} building
                                                   floors
                                                </p>
                                             </div>
                                          )}
                                          <div className="bg-accent p-1 rounded-xl flex items-center justify-center">
                                             <p className="text-[20px] text-lightText">
                                                {data.suprafataUtila} m2
                                             </p>
                                          </div>
                                          {data.suprafataCurte > 0 && (
                                             <div className="bg-accent p- rounded-xl flex items-center justify-center">
                                                <p className="text-[20px] text-lightText">
                                                   Outside {data.suprafataCurte}{" "}
                                                   m2
                                                </p>
                                             </div>
                                          )}

                                          {data.etaj > 0 && (
                                             <div className="bg-accent p-1 rounded-xl flex items-center justify-center">
                                                <p className="text-[20px] text-lightText">
                                                   {data.etaj} flors
                                                </p>
                                             </div>
                                          )}
                                       </div>
                                       <h1 className="text-2xl text-lightText ">
                                          Description{" "}
                                       </h1>
                                       <p className="text-lightText">
                                          {data.descriere}
                                       </p>
                                       <div className="bg-accent p-2 rounded-xl">
                                          <p className="text-[20px] text-lightText">
                                             Phone number: {data.nrTel}
                                          </p>
                                       </div>
                                    </div>
                                 </Modal>
                              )}
                           </div>
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
