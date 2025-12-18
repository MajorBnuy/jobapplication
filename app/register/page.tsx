"use client";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [info, setInfo] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [confirmPassword, setConfirmPassword] = useState<string | null>();
  const [status, setStatus] = useState<'init' | 'loading' | 'success' | 'error'>('init')
  if(status === "success"){
   return (
      <Link href="/login">Login</Link>
   )
  }
  if(status === "error"){
   return <div>Something went wrong. </div>
  }

  return (
    <div>
      <form onSubmit={(e) => {
         setStatus('loading')
         e.preventDefault()
         fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify(info)
         })
         .then((res) => res.json())
         .then(() => {
            console.log('registered');
            setStatus('success')
         })
         .catch(() => {
            setStatus('error')
         })
      }}>
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
            type="submit"
            disabled={
              !info.email || !info.password || info.password !== confirmPassword || status === 'loading'
            }
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
