import { createServerClient } from "@/lib/supabase/createServerClient";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return Response.json({ error: "No id found" });
  const supabase = await createServerClient();
  const { data: JobApplication, error } = await supabase
    .from("job_application")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    return Response.json({ error: error.message });
  }
  return Response.json(JobApplication);
}

export async function POST(request: Request) {
  const json = await request.json();
  const supabase = await createServerClient();

  const { data: JobApplication, error } = await supabase
    .from("job_application")
    .insert({
      company_id: json.company,
      homepage: json.homepage,
      motivation_letter: json.motivationLetter,
      application_date: json.applicationDate
    })
    .select()
    .single();

  if (error) {
    return Response.json({ error: error.message });
  }
  return Response.json(JobApplication);
}

export async function DELETE(request: Request) {
  const json = await request.json();
  const supabase = await createServerClient();
  const { error } = await supabase
    .from("job_application")
    .delete()
    .eq("id", json.id);

  if (error) {
    return Response.json({ error: error.message });
  }
  return Response.json({
    ok: true,
  });
}

export async function PATCH(request: Request) {
const json = await request.json();
  const supabase = await createServerClient();
  
  const { data: JobApplication, error } = await supabase
    .from("job_application")
    .update({
      company_id: json.company,
      homepage: json.homepage,
      motivation_letter: json.motivationLetter,
      application_date: json.applicationDate,
      status: json.status
    })
    .eq("id", json.id)
    .select()
    .single();

  if (error) {
    return Response.json({ error: error.message });
  }
  return Response.json(JobApplication);
}
