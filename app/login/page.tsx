"use client"
import style from "./login.module.css"
import "../global.css"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [info, setInfo] = useState<{
    email?: string;
    password?: string;
  }>({});
  const router = useRouter()

  return (
    <div className={style.loginmain}>
      <form className={style.loginform} onSubmit={async (e) => {
         e.preventDefault()
         const res = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(info),
            headers: { 'Content-Type': 'application/json' }
         })
         if (res.ok){
          const data = await res.json()
          router.push('/')
         } else {
          alert("Login fehlgeschlagen")
         }
      }}>
        <h2 className={style.hlogin}>Login</h2>
        <label>
          <div>E-Mail</div>
          <input type="email" onChange={(e) => 
            setInfo((prev) => ({
               ...prev,
               email: e.target.value
            }))
          }/>
        </label>
        <label>
          <div>Password</div>
          <input type="password" onChange={(e) => 
            setInfo((prev) => ({
               ...prev,
               password: e.target.value
            }))
          }/>
        </label>
        <div>
         <button className={style.loginbutton} type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}
