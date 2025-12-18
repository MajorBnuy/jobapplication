import { createServerClient } from "@/lib/supabase/createServerClient";

export async function POST(request:Request) {
   try {
      const json = await request.json()
      const supabase = await createServerClient()
      const {data, error} = await supabase
      .auth
      .signUp({
         email: json.email,
         password: json.password
      })
      if(error) {
         throw error
      }
      console.log('created user', data);

      return Response.json({message: 'OK'}, {status: 201})
   } catch(error) {
      console.error('An error occured while registing', error)
      return Response.json({error: "Cannot register"}, {status: 500})
   }
}