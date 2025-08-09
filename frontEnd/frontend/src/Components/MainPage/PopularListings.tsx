"use client";
import List from "../Utils/List";
import dummyphoto from "../../../public/Bed Outline Icon from Real Estate.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import Image from "next/image";

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

export default function PoluparListings() {
   const [polpularListings, setPopularListings] = useState<RealEstateList>([]);

   const [modalOpen, setModalOpen] = useState(false);
   const [selectedProduct, setSelectedProduct] = useState<RealEstateItem>();

   function handleModalClose() {
      setModalOpen(false);
   }

   function handleModalOpen(product: RealEstateItem) {
      setModalOpen(true);
      setSelectedProduct(product);
   }

   useEffect(() => {
      async function getPupularListings() {
         const response = await fetch(
            "http://localhost:8080/anunturi/anunturi4"
         );
         const data = await response.json();
         console.log(data);

         setPopularListings(data);
      }

      getPupularListings();
   }, []);

   return (
      <div className="mt-20  flex items-center justify-center flex-col">
         <div className="flex justify-between items-center px-20 x-full xl:w-full lg:gap-0 gap-3">
            <h1 className="lg:text-text lg:text-[28px]  ">Polpular listings</h1>
            <Link
               href={"/anunturi"}
               className="lg:text-secondary text-[28px] transition delay-150 duration-300 ease-in-out hover:scale-110"
            >
               See all
            </Link>
         </div>
         <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2   lg:grid-cols-4 mt-5 gap-5">
            {polpularListings.length > 0 ? (
               polpularListings.map((data, index) => {
                  const firstPhoto = data.pozes?.[0]?.path;

                  return (
                     <div
                        key={index || data.id}
                        onClick={() => handleModalOpen(data)}
                     >
                        <List
                           key={data.id || index}
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
                           <Modal show={modalOpen} onClose={handleModalClose}>
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
                                             {data.nrEtaje} building floors
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
                                             Outside {data.suprafataCurte} m2
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
      </div>
   );
}
