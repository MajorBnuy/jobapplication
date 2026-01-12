"use client";
import styles from "./page.module.css"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function newApplication() {
  const [company, setCompany] = useState("");
  const [applicationDate, setApplicationDate] = useState("");
  const [homepage, setHomepage] = useState("");
  const [motivationLetter, setMotivationLetter] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter()

  return (
    <div className={styles.newmain}>
      <form className={styles.newform}
        onSubmit={async (event) => {
          event.preventDefault();
          const data = {
            company,
            applicationDate,
            homepage,
            motivationLetter,
          };
          try {
            setIsSubmitting(true);
            setError(null);
            const response = await fetch("/api", {
              method: "POST",
              headers: { accept: "application/json" },
              body: JSON.stringify(data),
            });
            const json = await response.json();
            console.log("json", json);
            router.refresh()
            setIsSubmitting(false);
          } catch (err) {
            setError(err as unknown as Error);
            setIsSubmitting(false);
          }
        }}
      >
        <h2 className={styles.hnew}>New Application</h2>
        <div>
          <label>
            <div>Company</div>
            <input
              type="text"
              placeholder="Amazon GmbH"
              name="company"
              required
              onChange={(event) => setCompany(event.target.value)}
              disabled={isSubmitting}
            />
          </label>
        </div>
        <div>
          <label>
            <div>Application Date</div>
            <input
              name="applicationDate"
              type="date"
              onChange={(event) => setApplicationDate(event.target.value)}
              disabled={isSubmitting}
            />
          </label>
        </div>
        <div>
          <label>
            <div>Homepage</div>
            <input
              name="homepage"
              type="url"
              placeholder="http://www.google.de"
              required
              onChange={(event) => setHomepage(event.target.value)}
              disabled={isSubmitting}
            />
          </label>
        </div>
        <div>
          <label>
            <div>Motivation Letter</div>
            <textarea
              name="motivationLetter"
              placeholder="Enter Text"
              onChange={(event) => setMotivationLetter(event.target.value)}
              disabled={isSubmitting}
            />
          </label>
        </div>
        {error && (
          <div>Error: {error.message}</div>
        )}
        <div>
          <button className={styles.newbutton} type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}
