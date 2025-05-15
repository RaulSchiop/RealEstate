import MainBtn from "@/Components/buttons/Mainbtn";
import List from "@/Components/Utils/List";
import pozaD from "../../../../public/Arcticons Price Converter.png";
export default function Profile() {
   return (
      <>
         <div className="mt-40 lg:px-5 flex flex-col justify-center ">
            <div className="flex items-center justify-between">
               <h1 className="text-4xl font-bold">Schiop Raul</h1>
               <MainBtn type="button">Add Listing</MainBtn>
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
