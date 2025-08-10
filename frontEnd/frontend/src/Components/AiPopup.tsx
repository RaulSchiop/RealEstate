"use client";

import { useState } from "react";

export default function AiPopup() {
   const [open, setOpen] = useState(false);
   const [aiRes, setAiRes] = useState("");
   const [prompt, setPrompt] = useState("");

   function handleOnChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
      e.preventDefault();
      setPrompt(e.target.value);
   }
   const AIFunctionalities = [
      "Ai compare",
      "Mortgage & Affordability Calculator",
   ];

   return (
      <div className="fixed bottom-6 right-6 z-50">
         <button
            onClick={() => setOpen(!open)}
            className="w-14 h-14 rounded-full bg-accent flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
         >
            <span className="text-white font-bold ">AI</span>
         </button>

         {open && (
            <div className="absolute bottom-16 right-0 w-150 max-h-500  bg-primary rounded-lg shadow-xl p-4">
               <h2 className="text-lg font-semibold mb-2 text-white">
                  🔍 Search smarter with AI
               </h2>
               <p className="text-white mb-5">
                  Tell me what you’re looking for and I’ll help you discover
                  properties, answer your real estate questions, and give you
                  insights tailored to your needs.
               </p>
               <p className="text-white  font-bold">
                  You can see more functionalities on the ai functionalities
                  page like:
               </p>
               <div className="flex items-center gap-2 mt-2 mb-4">
                  {AIFunctionalities.map((func, idx) => (
                     <div
                        className="px-2 py-1 border rounded-lg bg-lightText"
                        key={idx}
                     >
                        <p>{func}</p>
                     </div>
                  ))}
               </div>
               <textarea
                  onChange={handleOnChange}
                  value={prompt}
                  placeholder="Type your question..."
                  className="w-full border border-gray-300 bg-white text-black rounded-md p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-accent"
                  rows={3}
               ></textarea>
               <button className="w-full bg-accent text-white py-2 rounded-md hover:bg-accent-dark transition-colors">
                  Send
               </button>
               {aiRes && (
                  <div className="w-full p-10 mt-5 rounded-md">
                     <h2 className="text-lg font-semibold mb-4 text-white">
                        AI Response
                     </h2>
                     <div className="max-h-40 overflow-y-auto overflow-x-hidden pr-2">
                        <p className="whitespace-pre-wrap text-white">
                           {aiRes}
                        </p>
                     </div>
                  </div>
               )}
            </div>
         )}
      </div>
   );
}
