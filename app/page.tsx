import styles from "./page.module.css";
import "./global.css";
import Link from "next/link";
import { DeleteJobButton } from "../components/DeleteJobButton";
import { createServerClient } from "@/lib/supabase/createServerClient";

function Timestamp({ date }: { date: Date }) {
  return date.toLocaleDateString("de-DE");
}

export default async function JobApplicationList() {
  const supabase = await createServerClient();

  const { data: applications, error } = await supabase
    .from("job_application")
    .select("*");

  if (error) {
    return <div>Some error happend</div>;
  }
  if (!applications?.length) {
    return (
      <div>
        No applications yet
        <Link href="/job-application/new">Add your first application</Link>
      </div>
    );
  }

  return (
    <div className={styles.listMain}>
      <table className={styles.mainTable}>
        <thead>
          <tr>
            <th>Count</th>
            <th>Company</th>
            <th>Date</th>
            <th>Status</th>
            <th>Motivation Letter</th>
            <th>Edit</th>
          </tr>
        </thead>

        {applications.map(
          (
            {
              id,
              homepage,
              status,
              application_date,
              motivation_letter,
              company_id
            },
            index
          ) => (
            <tbody key={id}>
              <tr className={styles.dataTable}>
                <th className={styles.tableId}><span>{index + 1}</span></th>
                <th className={styles.tableHomepage}>
                  <a href={homepage} target="_blank">
                    {company_id}
                  </a>
                </th>
                <th>
                  {application_date && <Timestamp date={new Date(application_date)} />}
                </th>
                <th>{status}</th>
                <th>
                  Motivation Letter {motivation_letter ? "written" : "missing"}.
                </th>
                <th>
                  <div className={styles.tableEdit}>
                    <Link href={`/job-application/${id}`}>EDIT</Link>
                    <DeleteJobButton id={id} />
                  </div>
                </th>
              </tr>
            </tbody>
          )
        )}
      </table>
    </div>
  );
}
