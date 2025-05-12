import type { Metadata } from "next";

import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";

export const metadata: Metadata = {};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <div>
         <main>
            <Header></Header>
            {children}
            
         </main>
      </div>
   );
}
