import {createClient} from "@/utils/supabase/client";

const handler  = async (req, res) => {
    await createClient.auth.api.setAuthCookie(req,res)
}


export default handler()
