import * as React from 'react';
import { PlasmicCanvasHost, registerComponent } from '@plasmicapp/react-web/lib/host';
import {LoginForm} from "@/components/LoginForm";
import { registerGlobalContext } from "@plasmicapp/react-web/lib/host";
import { createClient } from '@/utils/supabase/client'

registerGlobalContext(createClient,{
  name :"createClient",
  importPath : "@/utils/supabase/client"
})



registerComponent(LoginForm, {
  name: "LoginForm",
  props:{
    name: {
      type: "string",
      defaultValue : "Dude"
    }
  },
  importPath: "@/components/LoginForm"
})

export default function PlasmicHost() {
  return <PlasmicCanvasHost />;
}
