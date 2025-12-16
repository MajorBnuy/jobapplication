import { connect } from "@/lib/mongoose";
import { JobApplicationModel } from "../../models/JobApplicationSchema";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  if (!id) return Response.json({error: "No id found"})
  await connect()
  const JobApplication = await JobApplicationModel.findById(id)
  return Response.json(JobApplication)
}

export async function POST(request: Request) {
  const json = await request.json();
  const JobApplication = await JobApplicationModel.create(json);
  await connect()
  return Response.json(JobApplication);
}

export async function DELETE(request: Request) {
  const json = await request.json();
  await connect();
  await JobApplicationModel.findByIdAndDelete(json.id);
  return Response.json({
    ok: true,
  });
}

export async function PATCH(request: Request) {
  const json = await request.json()
  await connect()
  await JobApplicationModel.findByIdAndUpdate(json.id)  
  return Response.json({
    ok: true,
  });
}
