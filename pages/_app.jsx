import '@/styles/globals.css'
import { PlasmicRootProvider } from "@plasmicapp/react-web";
import Head from "next/head";
import {useEffect} from "react";

import { createClient } from '@/utils/supabase/client'
import {headers} from "next/headers";
export default function MyApp({ Component, pageProps }) {
   // Step 1, subscribe to onAuthStateChange
    useEffect(() => {
        const {data: authListener} = createClient.auth.onAuthStateChange((event, session) =>{
            updateSupabaseCookie(event,session)
        } )
        return () =>{
            authListener?.unsubscribe()
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
    <PlasmicRootProvider Head={Head}>
      <Component {...pageProps} />
    </PlasmicRootProvider>
  );
}
