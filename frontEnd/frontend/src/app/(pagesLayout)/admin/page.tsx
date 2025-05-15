"use client";
import { useEffect, useState } from "react";
import MainBtn from "@/Components/buttons/Mainbtn";
import ListListings from "@/Components/Utils/ListListings";
import ListUsers from "@/Components/Utils/ListUsers";

type UserType = {
   id: number;
   name: string;
   email: string;
   role: "ADMIN" | "CLIENT";
};

type UsersType = UserType[];

type ListingType = {
   id: number;
   titlu: string;
   locatie: string;
   user_id: number;
};

type ListingsType = ListingType[];

export default function Admin() {
   const [users, setUsers] = useState<UsersType>([]);
   const [listings, setListings] = useState<ListingsType>([]);

   useEffect(() => {
      async function fechUsers() {
         const response = await fetch("http://localhost:8080/admin/users");

         const data = await response.json();
         setUsers(data);
         console.log(data);
      }

      async function fechListings() {
         const response = await fetch(
            "http://localhost:8080/admin/getAnunturi"
         );
         const data = await response.json();
         setListings(data);
         console.log(data);
      }
      fechUsers();
      fechListings();
   }, []);

   return (
      <>
         <div className="mt-40 px-20">
            <h1 className="text-[40px] text-bold">Admin Page</h1>
            <div className="flex items-center gap-10">
               <div>
                  <h1 className="text-[20px]">Users</h1>
                  <ul>
                     <ListUsers id={1} name="da" role="ADMIN" email="asdasd">
                        <MainBtn type="submit">Modify</MainBtn>
                        <MainBtn type="submit">Delete</MainBtn>
                     </ListUsers>
                     <ListUsers id={2} name="da" role="ADMIN" email="asdasd">
                        <MainBtn type="submit">Delete</MainBtn>{" "}
                     </ListUsers>
                     <ListUsers id={3} name="da" role="ADMIN" email="asdasd">
                        <MainBtn type="submit">Delete</MainBtn>
                     </ListUsers>
                     <ListUsers id={4} name="da" role="ADMIN" email="asdasd">
                        <MainBtn type="submit">Delete</MainBtn>
                     </ListUsers>
                  </ul>
               </div>

               <div>
                  <h1>Listings</h1>
                  <ul>
                     <ListListings
                        id={10}
                        titlu="asdasd"
                        user_id={2}
                        locatie="timisora"
                     >
                        {" "}
                        <MainBtn type="submit">Delete</MainBtn>
                     </ListListings>
                     <ListListings
                        id={10}
                        titlu="asdasd"
                        user_id={2}
                        locatie="timisora"
                     >
                        {" "}
                        <MainBtn type="submit">Delete</MainBtn>
                     </ListListings>
                     <ListListings
                        id={10}
                        titlu="asdasd"
                        user_id={2}
                        locatie="timisora"
                     >
                        {" "}
                        <MainBtn type="submit">Delete</MainBtn>
                     </ListListings>
                     <ListListings
                        id={10}
                        titlu="asdasd"
                        user_id={2}
                        locatie="timisora"
                     >
                        {" "}
                        <MainBtn type="submit">Delete</MainBtn>
                     </ListListings>
                  </ul>
               </div>
            </div>
         </div>
      </>
   );
}
