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
         <div className="mt-40 px-20 mb-20">
            <h1 className="text-[40px] text-bold">Admin Page</h1>
            <div className="flex  gap-10">
               <div>
                  <h1 className="text-[20px]">Users</h1>
                  <ul>
                     {users.length > 0 ? (
                        users.map((user, index) => (
                           <div key={user.id}>
                              <ListUsers
                                 id={user.id}
                                 name={user.name}
                                 role={user.role}
                                 email={user.email}
                              >
                                 <MainBtn type="submit">Modify</MainBtn>
                                 <MainBtn type="submit">Delete</MainBtn>
                              </ListUsers>
                           </div>
                        ))
                     ) : (
                        <p>no users</p>
                     )}
                  </ul>
               </div>

               <div>
                  <h1 className="text-[20px]">Listings</h1>
                  <ul>
                     {listings.length > 0 ? (
                        listings.map((listing, index) => (
                           <div key={listing.id}>
                              <ListListings
                                 id={listing.id}
                                 titlu={listing.titlu}
                                 locatie={listing.locatie}
                              >
                                 <MainBtn type="submit">Delete</MainBtn>
                              </ListListings>
                           </div>
                        ))
                     ) : (
                        <p>no listings</p>
                     )}
                  </ul>
               </div>
            </div>
         </div>
      </>
   );
}
