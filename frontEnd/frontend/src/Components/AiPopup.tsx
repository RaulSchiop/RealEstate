"use client";

import { body } from "motion/react-client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

export default function AiPopup() {
   const [open, setOpen] = useState(false);
   const [aiRes, setAiRes] = useState("");
   const [prompt, setPrompt] = useState("");
   const [loading, setLoading] = useState(false);

   function handleOnChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
      e.preventDefault();
      setPrompt(e.target.value);
   }
   const AIFunctionalities = [
      "Ai compare",
      "Mortgage & Affordability Calculator Ai",
   ];

   async function submmitPrompt(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      setLoading(true);
      const response = await fetch("http://localhost:8080/chat/Prompt", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ prompt }),
      });

      if (response.ok) {
         const data = await response.json();
         setLoading(false);
         setAiRes(data.response);
      } else {
         setAiRes("Failed to get AI response.");
      }
   }

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
               <p className="text-white mb-5">
                  The AI will not provide comparisons or numerical calculations.
                  If you want to do that, you can visit the AI Tools page by
                  clicking{" "}
                  <Link href="/aiTools" passHref>
                     <span className="text-white font-bold  cursor-pointer">
                        here
                     </span>
                  </Link>
                  .
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
               <form onSubmit={submmitPrompt}>
                  =
                  <textarea
                     onChange={handleOnChange}
                     value={prompt}
                     placeholder="Type your question..."
                     className="w-full border border-gray-300 bg-white text-black rounded-md p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-accent"
                     rows={3}
                  ></textarea>
                  <button
                     type="submit"
                     className="w-full bg-accent text-white py-2 rounded-md hover:scale-95 active:scale-90 transition-transform transform duration-200 "
                  >
                     Send
                  </button>
               </form>
               {loading && (
                  <h1 className="text-white animate-pulse">
                     Waiting for Ai to respond
                  </h1>
               )}
               {aiRes && (
                  <div className="w-full p-10 mt-5 rounded-md">
                     <h2 className="text-lg font-semibold mb-4 text-white">
                        AI Response
                     </h2>
                     <div className="max-h-40 overflow-y-auto overflow-x-hidden pr-2 whitespace-pre-wrap text-white">
                        <ReactMarkdown
                           components={{
                              a: ({ node, ...props }) => (
                                 <a
                                    {...props}
                                    className="text-blue-400  font-bold text-lg hover:text-blue-600"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                 />
                              ),
                           }}
                        >
                           {aiRes}
                        </ReactMarkdown>
                     </div>
                  </div>
               )}
            </div>
         )}
      </div>
   );
}
