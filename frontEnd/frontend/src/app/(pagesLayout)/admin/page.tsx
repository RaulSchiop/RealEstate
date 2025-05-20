"use client";
import { useEffect, useState } from "react";
import MainBtn from "@/Components/buttons/Mainbtn";
import ListListings from "@/Components/Utils/ListListings";
import ListUsers from "@/Components/Utils/ListUsers";
import Modal from "@/Components/Modal/Modal";
import { pre } from "motion/react-client";

type UserType = {
   id: number;
   name: string;
   email: string;
   role: "ADMIN" | "CLIENT";
   password: string;
   oldEmail: string;
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
   const [modal, setModal] = useState(false);
   const [modifyUser, setModifyUser] = useState({
      id: 0,
      name: "",
      email: "",
      role: "",
      oldEmail: "",
      password: "",
   });
   
    

   function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const { name, value } = e.target;
      

      setModifyUser((prev) => ({
         ...prev,
         [name]: value,
      }));
   }

   function handleOpenModal(user: UserType) {
      setModifyUser({
         id: user.id,
         name: user.name,
         email: user.email,
         role: user.role,
         oldEmail: user.email,
         password: user.password,
      });
      setModal(true);
   }

   function handleModalClose() {
      setModal(false);
   }

   useEffect(() => {
      const localS = localStorage.getItem("logged");
      if (!localS) return;

      const parsed = JSON.parse(localS);
      const token = parsed.message;
      const id = parsed.id;
      async function fechUsers() {
         const response = await fetch("http://localhost:8080/admin/users", {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });

         const data = await response.json();
         setUsers(data);
         console.log(data);
      }

      async function fechListings() {
         const response = await fetch(
            "http://localhost:8080/admin/getAnunturi",
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         );
         const data = await response.json();
         setListings(data);
         console.log(data);
      }
      fechUsers();
      fechListings();
   }, []);

   async function deleteAnunt(id: number) {
      const localS = localStorage.getItem("logged");
      if (!localS) return;
      const parsed = JSON.parse(localS);
      const token = parsed.message;

      const response = await fetch(
         `http://localhost:8080/admin/deleteAnunt/${id}`,
         {
            method: "DELETE",
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
      );
      window.location.reload();
   }

   async function deleteUser(id: number) {
      const localS = localStorage.getItem("logged");
      if (!localS) return;
      const parsed = JSON.parse(localS);
      const token = parsed.message;

      const response = await fetch(
         `http://localhost:8080/admin/deleteUser/${id}`,
         {
            method: "DELETE",
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
      );
      window.location.reload();
   }
   async function submitModify(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();

      const localS = localStorage.getItem("logged");
      if (!localS) return;
      const parsed = JSON.parse(localS);
      const token = parsed.message;

      const response = await fetch(
         "http://localhost:8080/admin/modificareUtilizator",
         {
            method: "POST",
            headers: {
               Authorization: `Bearer ${token}`,
               "Content-Type": "application/json",
            },
            body: JSON.stringify(modifyUser),
         }
      );

      if (response.ok) {
         setModal(false);
         window.location.reload();
      }
   }

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
                                 <MainBtn
                                    type="button"
                                    onClick={() => handleOpenModal(user)}
                                 >
                                    Modify
                                 </MainBtn>
                                 {modal && (
                                    <Modal
                                       show={modal}
                                       onClose={handleModalClose}
                                    >
                                       <div>
                                          <h1 className="text-[30px] text-lightText">
                                             Modify user
                                          </h1>
                                          <form
                                             onSubmit={submitModify}
                                             className="flex flex-col gap-5"
                                          >
                                             <input
                                                name="name"
                                                onChange={handleChange}
                                                value={modifyUser.name}
                                                className="lg:w-[50%]  h-5 p-4 outline-0 text-lightText border-lightText border-b-2"
                                                placeholder="Name"
                                             ></input>
                                             <input
                                                name="email"
                                                onChange={handleChange}
                                                value={modifyUser.email}
                                                className="lg:w-[50%] h-5 p-4 outline-0 text-lightText border-lightText border-b-2"
                                                placeholder="Email"
                                                type="email"
                                             ></input>
                                             <input
                                                name="role"
                                                onChange={handleChange}
                                                value={modifyUser.role}
                                                className="lg:w-[50%] h-5 p-4 outline-0 text-lightText border-lightText border-b-2"
                                                placeholder="Role"
                                             ></input>
                                             <MainBtn type="submit">
                                                Modify
                                             </MainBtn>
                                          </form>
                                       </div>
                                    </Modal>
                                 )}
                                 <MainBtn
                                    type="button"
                                    onClick={() => deleteUser(user.id)}
                                 >
                                    Delete
                                 </MainBtn>
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
                                 <MainBtn
                                    type="button"
                                    onClick={() => deleteAnunt(listing.id)}
                                 >
                                    Delete
                                 </MainBtn>
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
