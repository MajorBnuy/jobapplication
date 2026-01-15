"use client";
import { useState } from "react";
import style from "./register.module.css";
import "../global.css"
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter()
  const [info, setInfo] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [confirmPassword, setConfirmPassword] = useState<string | null>();
  const [status, setStatus] = useState<
    "init" | "loading" | "success" | "error"
  >("init");
  if (status === "success") {
    router.push('/login')
  }
  if (status === "error") {
    return alert("Register fehlgeschlagen")
  }

  return (
    <div className={style.registermain}>
      <form
        className={style.registerform}
        onSubmit={(e) => {
          setStatus("loading");
          e.preventDefault();
          fetch("/api/register", {
            method: "POST",
            body: JSON.stringify(info),
          })
            .then((res) => res.json())
            .then(() => {
              console.log("registered");
              setStatus("success");
            })
            .catch(() => {
              setStatus("error");
            });
        }}
      >
        <h2 className={style.hregister}>Register</h2>
        <label>
          <div>E-Mail</div>
          <input
            type="email"
            required
            onChange={(e) => {
              setInfo((curr) => ({
                ...curr,
                email: e.target.value,
              }));
            }}
          />
        </label>
        <label>
          <div>Password</div>
          <input
            type="password"
            required
            onChange={(e) => {
              setInfo((curr) => ({
                ...curr,
                password: e.target.value,
              }));
            }}
          />
        </label>
        <label>
          <div>Password Confirmation</div>
          <input
            type="password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <div>
          <button
            className={style.registerbutton}
            type="submit"
            disabled={
              !info.email ||
              !info.password ||
              info.password !== confirmPassword ||
              status === "loading"
            }
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
