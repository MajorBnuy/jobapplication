"use client";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useState, use, useEffect } from "react";
import SaveJobButton from "../../../components/SaveJobButton"

export default function editApplication(props: {
  params: Promise<{ id: string }>;
}) {
  const [company, setCompany] = useState("");
  const [applicationDate, setApplicationDate] = useState("");
  const [homepage, setHomepage] = useState("");
  const [id, setId] = useState("")
  const [motivationLetter, setMotivationLetter] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  const params = use(props.params);

  async function getFetch(id: string) {
    try {
      setIsSubmitting(true);
      setError(null);
      const response = await fetch(`/api?id=${id}`, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Fehler beim Laden");
      const json = await response.json();

      setCompany(json.companies?.name || "");
      setHomepage(json.homepage || "");
      setMotivationLetter(json.motivation_letter || "");
      setApplicationDate(json.application_date || "");
    } catch (err) {
      setError(err as unknown as Error);
    } finally {
      setIsSubmitting(false);
    }
  }
  useEffect(() => {
    const id = params.id;
    setId(id)
    getFetch(id);
  }, [params.id]);

  return (
    <form
      className={styles.formMain}
      onSubmit={async (event) => {
        event.preventDefault();

        const data = {
          id,
          company,
          applicationDate,
          homepage,
          motivationLetter,
        };

        try {
          setIsSubmitting(true);
          setError(null);

          const response = await fetch("/api", {
            method: "PATCH",
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
      <div>
        <div>
          <label>
            <div>Company</div>
            <input
              type="text"
              value={company}
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
              value={applicationDate}
              type="text"
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
              value={homepage}
              type="url"
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
              value={motivationLetter}
              onChange={(event) => setMotivationLetter(event.target.value)}
              disabled={isSubmitting}
            />
          </label>
        </div>
      </div>
      <div>
        <button type="submit">Yoink</button>
      </div>
    </form>
  );
}
