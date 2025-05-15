"use client";
import MainBtn from "@/Components/buttons/Mainbtn";
import List from "@/Components/Utils/List";
import pozaD from "../../../../public/Arcticons Price Converter.png";
import { useEffect, useState } from "react";
import Modal from "@/Components/Modal/Modal";
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
   anConstructie: Date;
   suprafataCurte: number;
   nrTel: number;
   locatie: string;
};

type RealEstateList = RealEstateItem[];

export default function Profile() {
   const [modalAdd, setModalAdd] = useState(false);
   const [modalListings, setModalListings] = useState(false);
   const [formData, setFormData] = useState({
      titlu: "",
      pret: "",
      descriere: "",
      camere: "",
      suprafataUtila: "",
      nrEtaje: "",
      etaj: "",
      anConstructie: "",
      suprafataCurte: "",
      locatie: "",
      nrTel: "",
   });

   const [images, setImages] = useState<FileList | null>(null);

   const [listings, setListings] = useState<RealEstateList>([]);
   const [selectedProduct, setSelectedProduct] = useState<RealEstateItem>();

   useEffect(() => {
      const localS = localStorage.getItem("logged");
      if (!localS) return;

      const parsed = JSON.parse(localS);
      const token = parsed.message;
      const id = parsed.id;
      console.log("Using token:", token);

      async function getAnunturi() {
         try {
            const res = await fetch(`http://localhost:8080/anunturi/${id}`, {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            });

            if (!res.ok) {
               const errorText = await res.text();
               console.error("Server returned error:", res.status, errorText);
               return;
            }

            const data = await res.json();
            setListings(data);
         } catch (err) {
            console.error("Error fetching listings", err);
         }
      }

      getAnunturi();
   }, []);

   function handleInputChange(
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   ) {
      const { name, value } = e.target;
      setFormData((prev) => ({
         ...prev,
         [name]: value,
      }));
   }
   function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
      if (e.target.files && e.target.files.length > 0) {
         setImages(e.target.files);
      }
   }

   function handleOpenModal() {
      setModalAdd(true);
   }

   function handleModalClose() {
      setModalAdd(false);
   }

   function handleOpenModalListings(product: RealEstateItem) {
      setModalListings(true);
      setSelectedProduct(product);
   }

   function handleModalCloseListings() {
      setModalListings(false);
   }

   async function handleSubbmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const localS = localStorage.getItem("logged");
      if (!localS) return;

      const parsed = JSON.parse(localS);
      const token = parsed.message;
      const id = parsed.id;

      const formDataToSend = new FormData();

      formDataToSend.append("titlu", formData.titlu);
      formDataToSend.append("descriere", formData.descriere);
      formDataToSend.append("etaj", formData.etaj);
      formDataToSend.append("nrEtaje", formData.nrEtaje);
      formDataToSend.append("anConstructie", formData.anConstructie);
      formDataToSend.append("pret", formData.pret);
      formDataToSend.append("camere", formData.camere);
      formDataToSend.append("suprafataUtila", formData.suprafataUtila);
      formDataToSend.append("suprafataCurte", formData.suprafataCurte);
      formDataToSend.append("nrTel", formData.nrTel);
      formDataToSend.append("locatie",formData.locatie)
      formDataToSend.append("userId", id);

      if (images) {
         for (let i = 0; i < images.length; i++) {
            formDataToSend.append("poze", images[i]);
         }
      }

      fetch("http://localhost:8080/anunturi/adaugareAnunt", {
         method: "POST",
         headers: {
            Authorization: `Bearer ${token}`, 
         },
         body: formDataToSend,
      });
   }

   return (
      <>
         <div className="mt-40 lg:px-5 flex flex-col justify-center ">
            <div className="flex items-center justify-between">
               <h1 className="text-4xl font-bold">Welcome</h1>
               <MainBtn onClick={handleOpenModal} type="button">
                  Add Listing
               </MainBtn>
               <Modal show={modalAdd} onClose={handleModalClose}>
                  <div className="w-full ">
                     <div className="mx-2 p-10 sm:mx-20 lg:mx-20 flex flex-col py-20 items-center justify-center gap-y-10 border-primary border-2 rounded-[60px] bg-bg">
                        <h1 className="text-accent text-3xl">Add Listing</h1>
                        <form
                           onSubmit={handleSubbmit}
                           className="w-full flex flex-col justify-center items-center gap-5"
                        >
                           <div className="flex lg:flex-row flex-col w-[80%] gap-3 mb-5">
                              <input
                                 name="titlu"
                                 className="lg:w-[50%]  h-5 p-4 outline-0 text-text border-secondary border-b-2"
                                 placeholder="Title"
                                 onChange={handleInputChange}
                                 value={formData.titlu}
                              ></input>
                              <input
                                 name="pret"
                                 className="lg:w-[50%] h-5 p-4 outline-0 text-text border-secondary border-b-2"
                                 placeholder="Pice"
                                 type="number"
                                 onChange={handleInputChange}
                                 value={formData.pret}
                              ></input>
                           </div>
                           <div className="flex flex-col w-[80%]">
                              <textarea
                                 name="descriere"
                                 className=" p-4 outline-0 text-text border-secondary border-1 h-32"
                                 placeholder="Description"
                                 onChange={handleInputChange}
                                 value={formData.descriere}
                              ></textarea>
                              <input
                                 name="camere"
                                 className="lg:w-[100%] w-[50%] p-2 outline-0 text-text border-secondary  border-b-2"
                                 placeholder="Rooms"
                                 onChange={handleInputChange}
                                 value={formData.camere}
                              ></input>
                              <input
                                 name="suprafataUtila"
                                 className="lg:w-[100%] w-[50%] p-2 outline-0 text-text border-secondary  border-b-2"
                                 placeholder="Interior Space"
                                 type="number"
                                 onChange={handleInputChange}
                                 value={formData.suprafataUtila}
                              ></input>
                              <input
                                 name="nrEtaje"
                                 className="lg:w-[100%] w-[50%] p-2 outline-0 text-text border-secondary  border-b-2"
                                 placeholder="Building floors"
                                 type="number"
                                 onChange={handleInputChange}
                                 value={formData.nrEtaje}
                              ></input>
                              <input
                                 name="etaj"
                                 className="lg:w-[100%] w-[50%] p-2 outline-0 text-text border-secondary  border-b-2"
                                 placeholder="Floor of the building"
                                 type="number"
                                 onChange={handleInputChange}
                                 value={formData.etaj}
                              ></input>
                              <input
                                 className="lg:w-[100%] w-[50%] p-2 outline-0 text-text border-secondary  border-b-2"
                                 placeholder="Construction date"
                                 name="anConstructie"
                                 value={formData.anConstructie}
                                 onChange={handleInputChange}
                                 type="Date"
                              ></input>
                              <input
                                 name="suprafataCurte"
                                 className="lg:w-[100%] w-[50%] p-2 outline-0 text-text border-secondary  border-b-2"
                                 placeholder="Outside Space"
                                 onChange={handleInputChange}
                                 value={formData.suprafataCurte}
                                 type="number"
                              ></input>
                              <input
                                 name="locatie"
                                 className="lg:w-[100%] w-[50%] p-2 outline-0 text-text border-secondary  border-b-2"
                                 onChange={handleInputChange}
                                 value={formData.locatie}
                                 placeholder="Location"
                              ></input>
                           </div>

                           <div className="flex w-[80%] justify-end items-center  gap-6">
                              <input
                                 className="lg:w-[100%] w-[50%] p-2 outline-0 text-text border-secondary  border-b-2"
                                 placeholder="Phone Number"
                              ></input>
                              <input
                                 onChange={handleFileChange}
                                 type="file"
                                 name="images"
                                 multiple
                                 accept="image/*"
                              />
                              <div className="mt-5">
                                 <MainBtn type="submit">Submit</MainBtn>
                              </div>
                           </div>
                        </form>
                     </div>
                  </div>
               </Modal>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2   lg:grid-cols-4 mt-5 gap-5">
               {listings.length > 0 ? (
                  listings.map((data, index) => (
                     <div
                        key={data.id}
                        onClick={() => handleOpenModalListings(data)}
                     >
                        <List
                           photo={`http://localhost:8080/images/${data.pozes?.[0]?.path}`}
                           camere={data.camere}
                           suprafata={data.suprafataUtila}
                           pret={data.pret}
                           locatie={data.locatie}
                        ></List>
                        {modalListings && selectedProduct === data && (
                           <Modal
                              show={modalListings}
                              onClose={handleModalCloseListings}
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
                                       src={`http://localhost:8080/images/${data.pozes?.[0]?.path}`}
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
                  ))
               ) : (
                  <p>no listings</p>
               )}
            </ul>
         </div>
      </>
   );
}
