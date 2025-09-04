import type { Metadata } from "next";
import "./globals.css";
import { CompareContextProvider } from "@/Components/context/compareContext";

export const metadata: Metadata = {};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body>
            <CompareContextProvider>{children}</CompareContextProvider>
         </body>
      </html>
   );
}
