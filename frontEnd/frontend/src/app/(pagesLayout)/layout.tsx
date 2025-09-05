import type { Metadata } from "next";

import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import AiPopup from "@/Components/AiPopup";
import { CompareContextProvider } from "@/Components/context/compareContext";

export const metadata: Metadata = {};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <div>
         <main>
            <CompareContextProvider>
               <Header></Header>
               {children}
            </CompareContextProvider>
            <AiPopup></AiPopup>
         </main>
      </div>
   );
}
