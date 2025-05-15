import { ReactNode } from "react";

type UsersType = {
   id: number;
   name: string;
   email: string;
   children: ReactNode;
   role: "ADMIN" | "CLIENT";
};

export default function ListUsers({
   name,
   email,
   role,
   id,
   children,
}: UsersType) {
   return (
      <li className="flex gap-5 items-center mt-10">
         <h1>id: {id}</h1>
         <h1>Name: {name}</h1>
         <h1>Email: {email}</h1>
         <h1>Role: {role}</h1>
         {children}
      </li>
   );
}
