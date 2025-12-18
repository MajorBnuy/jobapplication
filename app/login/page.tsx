"use client";
import { useState } from "react";

export default function LoginPage() {
  const [info, setInfo] = useState<{
    email?: string;
    password?: string;
  }>({});

  return (
    <div>
      <form onSubmit={(e) => {
         e.preventDefault()
         fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(info)
         })
         .then((res) => res.json())
         .then(()=> {
            console.log('login success');
         })
      }}>
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
         <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}
