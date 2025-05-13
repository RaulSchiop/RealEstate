"use client";
import List from "../Utils/List";
import dummyphoto from "../../../public/Bed Outline Icon from Real Estate.png";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PoluparListings() {
   const [polpularListings, setPopularListings] = useState<
      Array<{
         pozes: { path: string }[];
         camere: number;
         suprafataUtila: number;
         pret: number;
      }>
   >([]);

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
               className="lg:text-secondary text-[16px] transition delay-150 duration-300 ease-in-out hover:scale-110"
            >
               See all
            </Link>
         </div>
         <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2   lg:grid-cols-4 mt-5 gap-5">
            {polpularListings.length > 0 ? (
               polpularListings.map((data, index) => {
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
                     />
                  );
               })
            ) : (
               <p>No listings available</p>
            )}
         </ul>
      </div>
   );
}
