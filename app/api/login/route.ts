import { createServerClient } from "@/lib/supabase/createServerClient";

export async function POST(request:Request) {
   try {
      const json = await request.json()
      const supabase = await createServerClient()
      const {data, error} = await supabase.auth.signInWithPassword({
         email: json.email,
         password: json.password
      })
      if(error) {
         throw error
      }
      console.log('user login', data);
      return Response.json({message: "Login success"}, {status:201})
   } catch (error) {
      console.error('An error occured while login', error)
      return Response.json({error: "login error"}, {status: 500})
   }
}