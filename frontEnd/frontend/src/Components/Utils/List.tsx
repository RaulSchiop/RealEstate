import Image, { StaticImageData } from "next/image";
import camereImage from "../../../public/Bed Outline Icon from Real Estate.png";
import m2Logo from "../../../public/GIS Square PT.png";
import consIcon from "../../../public/Arcticons Price Converter.png";

type ListType = {
  photo: string | StaticImageData;
  camere: number;
  suprafata: number;
  pret: number;
};


export default function List({ photo, camere, suprafata, pret }: ListType) {
   return (
      <li className="bg-secondary h-[300px] w-[300px] flex items-center gap-6 flex-col justify-center rounded-[20px] p-4 transition-transform duration-300 hover:scale-110">
         <div className="w-full h-64 relative">
            <Image
               src={photo}
               alt="listing iamge"
               fill
               sizes="100%"
               className="object-cover"
            ></Image>
         </div>
         <div className="flex justify-between items-center w-full ">
            <div className="flex items-center justify-center gap-2">
               <Image width={24} height={24} src={camereImage} alt="camera logo"></Image>
               <p className="text-lightText text-[12px]">{camere} Rooms</p>
            </div>
            <div className="flex items-center justify-center gap-2">
               <Image width={13} height={13} src={m2Logo} alt="m2 logo"></Image>
               <p className="text-lightText text-[12px]">{suprafata} m2</p>
            </div>
            <div className="flex items-center justify-center gap-2">
               <Image width={17} height={17} src={consIcon} alt="bani logo"></Image>
               <p className="text-lightText text-[12px]">{pret} €</p>
            </div>
         </div>
      </li>
   );
}
