"use client";
import Image, { StaticImageData } from "next/image";
import camereImage from "../../../public/Bed Outline Icon from Real Estate.png";
import m2Logo from "../../../public/GIS Square PT.png";
import consIcon from "../../../public/Arcticons Price Converter.png";
import Compare from "../buttons/CompareButtons";

type ListType = {
   photo: string | StaticImageData;
   camere: number;
   suprafata: number;
   pret: number;
   locatie?: string;
   onToggle?: () => void;
   clicked?: boolean;
};

export default function List({
   photo,
   camere,
   suprafata,
   pret,
   locatie,
   clicked,
   onToggle,
}: ListType) {
   return (
      <li
         onClick={onToggle}
         className={`w-[350px] rounded-[20px] overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer bg-white relative`}
      >
         {/* Image Section */}
         <div className="relative h-[200px] w-full">
            <Image
               src={photo}
               alt="Listing image"
               fill
               sizes="100%"
               className="object-cover"
            />
            <div className="absolute top-2 right-2 z-10">
               <Compare type="button" clasName="">
                  Add to AI Compare
               </Compare>
            </div>
         </div>

         {/* Details Section */}
         <div className="p-4 bg-secondary">
            <div className="flex justify-between items-center ">
               <div className="flex items-center gap-2">
                  <Image width={20} height={20} src={camereImage} alt="rooms" />
                  <p className="text-lightText text-sm">{camere} Rooms</p>
               </div>
               <div className="flex items-center gap-2">
                  <Image width={14} height={14} src={m2Logo} alt="m2" />
                  <p className="text-lightText text-sm">{suprafata} m²</p>
               </div>

               <div className="flex items-center gap-2">
                  <Image width={16} height={16} src={consIcon} alt="price" />
                  <p className="text-lightText text-sm font-semibold">
                     {pret} €
                  </p>
               </div>
               {locatie && (
                  <p className="text-lightText text-xs w-[50px] truncate" title={locatie}>{locatie}</p>
               )}
            </div>
         </div>
      </li>
   );
}
