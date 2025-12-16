import styles from "./page.module.css";
import "./global.css"
import Link from "next/link";
import { connect } from "@/lib/mongoose";
import { DeleteJobButton } from "../components/DeleteJobButton";
import { JobApplicationModel } from "../models/JobApplicationSchema";


function Timestamp({ date }: { date: Date }) {
  return date.toLocaleDateString();
}

export default async function JobApplicationList() {

  await connect();
  const applications = await JobApplicationModel.find({});
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
          ({
            _id,
            company,
            homepage,
            status,
            applicationDate,
            motivationLetter,
          },
        index) => (
              <tbody key={_id.toString()}>
                <tr className={styles.dataTable}>
                  <th>{index +1}</th>
                  <th >
                    <a href={homepage} target="_blank">
                      {company}
                    </a>
                  </th>
                  <th>
                    {applicationDate && <Timestamp date={applicationDate} />}
                  </th>
                  <th>{status}</th>
                  <th>Motivation Letter {motivationLetter ? "written" : "missing"}.</th>
                  <th>
                    <Link href={`/job-application/${_id}`}>EDIT</Link>
                  </th>
                </tr>
                <tr>
                  <th colSpan={6} className={styles.buttonTab}>
                    <span className={styles.buttonGroup}>
                      <DeleteJobButton id={_id.toString()} />
                    </span>
                  </th>
                </tr>
              </tbody>
          )
        )}
      </table>
    </div>
  );
}
