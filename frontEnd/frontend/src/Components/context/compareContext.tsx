"use client";
import { createContext, useState, useContext, ReactNode } from "react";

type CompareContextType = {
   id: number[];
   addCompare: (id: number) => void;
   deleteCompare: (id: number) => void;
};

export const compareContext = createContext<CompareContextType>({
   id: [],
   addCompare: () => {},
   deleteCompare: () => {},
});
export function useCompareContxt() {
   return useContext(compareContext);
}

type CompareProviderProps = {
   children: ReactNode;
};

export function CompareContextProvider({ children }: CompareProviderProps) {
   const [id, setId] = useState<number[]>([]);
   function addCompare(id: number) {
      setId((prev) => Array.from(new Set([...prev, id])));
   }

   function deleteCompare(id: number) {
      setId((prev) => prev.filter((item) => item !== id));
   }

   return (
      <compareContext.Provider value={{ id, addCompare, deleteCompare }}>
         {children}
      </compareContext.Provider>
   );
}
