"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Modal from "../../../../Components/Modal/Modal";

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
   nrTel: string;
   locatie: string;
};

type ParamsType = { id: string };

export default function AnuntPage({ params }: { params: Promise<ParamsType> }) {
   const unwrappedParams = React.use(params);
   const id = unwrappedParams.id;

   const [data, setData] = useState<RealEstateItem | null>(null);
   const [loading, setLoading] = useState(true);
   const [modalOpen, setModalOpen] = useState(false);

   function handleModalClose() {
      setModalOpen(false);
   }

   useEffect(() => {
      async function fetchAnunt() {
         setLoading(true);
         try {
            const response = await fetch(
               `http://localhost:8080/anunturi/anunt/${id}`
            );
            if (!response.ok) throw new Error("Failed to fetch");
            const data = await response.json();
            setData(data);
            console.log(data);
         } catch (error) {
            console.error(error);
            setData(null);
         } finally {
            setLoading(false);
         }
      }
      fetchAnunt();
   }, [id]);

   if (loading) return <div className="text-lightText p-8">Loading...</div>;
   if (!data) return <div className="text-lightText p-8">Anunt not found.</div>;

   return (
      <div className="w-full max-w-none mx-auto p-0 bg-white rounded-none mt-0 shadow-none pt-30">
         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 border-b pb-6 px-8 pt-8">
            <h1 className="text-4xl font-bold text-[#4B2E05] mb-2 md:mb-0">
               {data.titlu}
            </h1>
            <div className="flex items-center gap-4">
               <span className="text-3xl font-semibold text-[#4B2E05]">
                  {data.pret} €
               </span>
               <button className="bg-[#3C6E47] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#2E5C37] transition shadow-md">
                  Contact Seller
               </button>
            </div>
         </div>

         <div className="flex flex-col md:flex-row gap-8 mb-8 px-8">
            <div className="relative w-full h-[400px] rounded-xl overflow-hidden border bg-[#F5F3EE]">
               {modalOpen && (
                  <Modal show={modalOpen} onClose={handleModalClose}>
                     <Image
                        src={`http://localhost:8080/images/${data.pozes?.[0]?.path}`}
                        alt="listing image"
                        fill
                        style={{ objectFit: "contain" }}
                        className="rounded-xl"
                     />
                  </Modal>
               )}
               {data.pozes?.[0]?.path ? (
                  <div className="group">
                     <Image
                        src={`http://localhost:8080/images/${data.pozes?.[0]?.path}`}
                        alt="listing image"
                        fill
                        sizes="100%"
                        style={{ objectFit: "cover", cursor: "pointer" }}
                        className="rounded-xl group-hover:opacity-90"
                        onClick={() => setModalOpen(true)}
                     />
                     <div className="absolute inset-0 justify-center items-center flex lg:hidden group-hover:flex ">
                        <h1 className="sm:text-2xl lg:text-4xl bg-[#EDE6DD] rounded-xl p-3 ">
                           Press to see the full image
                        </h1>
                     </div>
                  </div>
               ) : (
                  <div className="flex items-center justify-center h-full text-[#4B2E05]">
                     No image available
                  </div>
               )}
            </div>
         </div>

         {/* Features Bar */}
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-8 px-8">
            <div className="bg-[#EDE6DD] p-4 rounded-xl flex flex-col items-center shadow-sm">
               <span className="text-lg text-[#4B2E05] font-semibold">
                  Rooms
               </span>
               <span className="text-2xl text-[#3C6E47] font-bold">
                  {data.camere}
               </span>
            </div>
            <div className="bg-[#EDE6DD] p-4 rounded-xl flex flex-col items-center shadow-sm">
               <span className="text-lg text-[#4B2E05] font-semibold">
                  Usable Area
               </span>
               <span className="text-2xl text-[#3C6E47] font-bold">
                  {data.suprafataUtila} m²
               </span>
            </div>
            <div className="bg-[#EDE6DD] p-4 rounded-xl flex flex-col items-center shadow-sm">
               <span className="text-lg text-[#4B2E05] font-semibold">
                  Year Built
               </span>
               <span className="text-2xl text-[#3C6E47] font-bold">
                  {data.anConstructie}
               </span>
            </div>
            <div className="bg-[#EDE6DD] p-4 rounded-xl flex flex-col items-center shadow-sm">
               <span className="text-lg text-[#4B2E05] font-semibold">
                  Floor
               </span>
               <span className="text-2xl text-[#3C6E47] font-bold">
                  {data.etaj > 0 ? data.etaj : "-"}
               </span>
            </div>
            <div className="bg-[#EDE6DD] p-4 rounded-xl flex flex-col items-center shadow-sm">
               <span className="text-lg text-[#4B2E05] font-semibold">
                  Building Floors
               </span>
               <span className="text-2xl text-[#3C6E47] font-bold">
                  {data.nrEtaje > 0 ? data.nrEtaje : "-"}
               </span>
            </div>
         </div>

         <div className="flex flex-wrap gap-4 mb-8 px-8">
            {data.suprafataCurte > 0 && (
               <div className="bg-[#F5F3EE] px-4 py-2 rounded-xl text-[#3C6E47] font-medium shadow-sm">
                  Outside Area: {data.suprafataCurte} m²
               </div>
            )}
            <div className="bg-[#F5F3EE] px-4 py-2 rounded-xl text-[#3C6E47] font-medium shadow-sm">
               Location: {data.locatie}
            </div>
         </div>

         <div className="mb-8 px-8">
            <h2 className="text-2xl text-[#4B2E05] font-semibold mb-2">
               Description
            </h2>
            <p className="text-[#3C6E47] leading-relaxed">{data.descriere}</p>
         </div>

         <div className="bg-[#3C6E47] p-4 rounded-xl w-max mb-4 mx-8 shadow-md">
            <p className="text-[20px] text-white">Phone number: {data.nrTel}</p>
         </div>
      </div>
   );
}
