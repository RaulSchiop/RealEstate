import Image from "next/image";
import camereImage from "../../../public/Bed Outline Icon from Real Estate.png"
import m2Logo from "../../../public/GIS Square PT.png"
import consIcon from "../../../public/Arcticons Price Converter.png"

type ListType = {
   photo: string;
   camere: string;
   suprafata: number;
   pret: number;
};

export default function List({ photo, camere, suprafata, pret }: ListType) {
   return (
      <li className="bg-black flex gap-3 flex-col justify-end rounded-xl p-4 transition-transform duration-300 hover:scale-110">
         <div className="w-full h-64 relative">
            <Image src={photo} alt="listing iamge"></Image>
         </div>
         <div className="flex justify-between items-center">
            <div>
                <Image src={camereImage} alt="camera logo"></Image>
               <p>{camere} camere</p>
            </div>
            <div>
                <Image src={m2Logo} alt="m2 logo"></Image>
               <p>{suprafata} m2</p>
            </div>
            <div>
                <Image src={consIcon} alt="bani logo"></Image>
               <p>{pret} €</p>
            </div>
         </div>
      </li>
   );
}
