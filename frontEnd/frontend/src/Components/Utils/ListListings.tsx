import { ReactNode } from "react";

type ListingType = {
   id: number;
   titlu: string;
   locatie:string,
   user_id:number
   children: ReactNode;
};

export default function ListListings({ id, titlu,locatie,user_id, children }: ListingType) {
   return (
      <li className="flex gap-5 items-center mt-10">
         <h1>id: {id}</h1>
         <h1>Titlu: {titlu}</h1>
         <h1>Locatie: {locatie}</h1>
         <h1>User ID {user_id}</h1>
         {children}
      </li>
   );
}
