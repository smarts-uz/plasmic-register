import '@/styles/globals.css'
import { PlasmicRootProvider } from "@plasmicapp/react-web";
import {useEffect} from "react";
import { createClient } from '@/utils/supabase/client'
export default function MyApp({ Component, pageProps }) {
   // Step 1, subscribe to onAuthStateChange
    useEffect(() => {
        const supabase = createClient();
        const {data: authListener} = supabase.auth.onAuthStateChange((event, session) =>{
            updateSupabaseCookie(event,session)
        } )
        return () =>{
            authListener?.unsubscribe();
        }
    });
    async function updateSupabaseCookie(event, session) {
        let apiUrl = "api/auth/set"
        if (event === "SIGNED_OUT") {
            apiUrl = "api/auth/remove"
        }
        await fetch(apiUrl, {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
                credentials: "same-origin",
                body: JSON.stringify({event, session})
            })
        })
    }
    // step 2, update the supabase auth cookie on server

  return (
    <PlasmicRootProvider >
      <Component {...pageProps} />
    </PlasmicRootProvider>
  );
}
// ---------------------------------------------------------------------------------------------------------
// import '@/styles/globals.css'
// import { PlasmicRootProvider } from "@plasmicapp/react-web";
// import Head from "next/head";
//
// export default function MyApp({ Component, pageProps }) {
//     return (
//         <PlasmicRootProvider Head={Head}>
//             <Component {...pageProps} />
//         </PlasmicRootProvider>
//     );
// }
