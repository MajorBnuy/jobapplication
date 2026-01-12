import { createServerClient } from "@/lib/supabase/createServerClient";
import fs from "fs"
import path from "path"

function getMarkdownPath(id: string) {
  return path.join(process.cwd(),'job_applications_md', `${id}.md`)
}

function saveJobApplicationAsMarkdown(data:any) {
  const markdown = `
  # Job Application

  **ID** ${data._id}
  **Company** ${data.company}
  **Homepage** ${data.homepage}
  **Date** ${data.applicationDate}

  ## Motivation Letter
  ${data.motivationLetter}
  `
  const dir = path.join(process.cwd(), 'job_applications_md')
  fs.mkdirSync(dir, {recursive: true})
  fs.writeFileSync(getMarkdownPath(data._id), markdown, 'utf8')
}

function deteleJobApplicationMarkdown(id:string) {
  const filePath = getMarkdownPath(id)
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
}

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
  if( JobApplication && JobApplication.id) {
    saveJobApplicationAsMarkdown({
      _id: JobApplication.id,
      company: JobApplication.company_id,
      homepage: JobApplication.homepage,
      applicationDate: JobApplication.application_date,
      motivationLetter: JobApplication.motivation_letter
    })
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
  deteleJobApplicationMarkdown(json.id)

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
    if( JobApplication && JobApplication.id) {
    saveJobApplicationAsMarkdown({
      _id: JobApplication.id,
      company: JobApplication.company_id,
      homepage: JobApplication.homepage,
      applicationDate: JobApplication.application_date,
      motivationLetter: JobApplication.motivation_letter
    })
  }
  return Response.json(JobApplication);
}
