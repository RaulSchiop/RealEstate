import { ReactNode } from "react";

type ListingType = {
   id: number;
   titlu: string;
   locatie:string,

   children: ReactNode;
};

export default function ListListings({ id, titlu,locatie, children }: ListingType) {
   return (
      <li className="flex gap-5 items-center mt-10">
         <h1>id: {id}</h1>
         <h1>Titlu: {titlu}</h1>
         <h1>Locatie: {locatie}</h1>

         {children}
      </li>
   );
}
