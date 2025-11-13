// import Header from "./components/Header";
// import Navbar from "./components/Navbar";
// import Providers from "./providers";
// import { ClerkProvider } from "@clerk/nextjs";
// import "./globals.css";

// export default function RootLayout({ children }) {

  
//   return (
//     <ClerkProvider
//     >
//     <html lang="en">
//       <body>     
//         <Navbar/>
//        <Header/>
//        <Providers>{children}</Providers>
//       </body>
//     </html>
//     </ClerkProvider>
//   );
// }
"use client";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

import Providers from "./providers";
import { useState } from "react";
import "./globals.css";
import { supabaseClient } from "./lib/supabase/client";
export default function RootLayout({ children }) {

    const [supabase] = useState(() => supabaseClient);

  return (
   
    <html lang="en">
      <body>     
        
        <Navbar/>
       <Header/>
       <Providers>{children}</Providers>       
      </body>
    </html>
    
  );
}
