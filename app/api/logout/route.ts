import { createServerClient } from "@/lib/supabase/createServerClient";

export async function POST(request:Request) {
   try {
      const supabase = await createServerClient()
      let { error } = await supabase.auth.signOut()
      if(error) {
         throw error
      }
      return Response.json({message: "Logout success"}, {status:201})
   } catch (error) {
      console.error('An error occured while logout', error)
      return Response.json({error: "logout error"}, {status: 500})
   }
}