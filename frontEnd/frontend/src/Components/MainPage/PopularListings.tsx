"use client";
import List from "../Utils/List";
import dummyphoto from "../../../public/Real Estate Image 2.png";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

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
   const router = useRouter();

   const [selectedProduct, setSelectedProduct] = useState<RealEstateItem>();

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
                        onClick={() => router.push(`/anunturi/${data.id}`)}
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
