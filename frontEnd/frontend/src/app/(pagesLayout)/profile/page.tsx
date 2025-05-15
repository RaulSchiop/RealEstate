"use client";
import MainBtn from "@/Components/buttons/Mainbtn";
import List from "@/Components/Utils/List";
import pozaD from "../../../../public/Arcticons Price Converter.png";
import { useState } from "react";
import Modal from "@/Components/Modal/Modal";
import { image } from "motion/react-client";

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


   function handleOpenModalListings() {
      setModalListings(true);
   }

   function handleModalCloseListings() {
      setModalListings(false);
   }

   return (
      <>
         <div className="mt-40 lg:px-5 flex flex-col justify-center ">
            <div className="flex items-center justify-between">
               <h1 className="text-4xl font-bold">Schiop Raul</h1>
               <MainBtn onClick={handleOpenModal} type="button">
                  Add Listing
               </MainBtn>
               <Modal show={modalAdd} onClose={handleModalClose}>
                  <div className="w-full ">
                     <div className="mx-2 p-10 sm:mx-20 lg:mx-20 flex flex-col py-20 items-center justify-center gap-y-10 border-primary border-2 rounded-[60px] bg-bg">
                        <h1 className="text-accent text-3xl">Add Listing</h1>
                        <form className="w-full flex flex-col justify-center items-center gap-5">
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
               <List
                  photo={pozaD}
                  camere={3}
                  suprafata={70}
                  pret={110000}
                  locatie={"timisoara"}
               ></List>
               <List
                  photo={pozaD}
                  camere={3}
                  suprafata={70}
                  pret={110000}
                  locatie={"timisoara"}
               ></List>
               <List
                  photo={pozaD}
                  camere={3}
                  suprafata={70}
                  pret={110000}
                  locatie={"timisoara"}
               ></List>
               <List
                  photo={pozaD}
                  camere={3}
                  suprafata={70}
                  pret={110000}
                  locatie={"timisoara"}
               ></List>
               <List
                  photo={pozaD}
                  camere={3}
                  suprafata={70}
                  pret={110000}
                  locatie={"timisoara"}
               ></List>
               <List
                  photo={pozaD}
                  camere={3}
                  suprafata={70}
                  pret={110000}
                  locatie={"timisoara"}
               ></List>
               <List
                  photo={pozaD}
                  camere={3}
                  suprafata={70}
                  pret={110000}
                  locatie={"timisoara"}
               ></List>
            </ul>
         </div>
      </>
   );
}
