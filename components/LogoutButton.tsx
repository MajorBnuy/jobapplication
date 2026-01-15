"use client"

import { useRouter } from "next/navigation";

// import styles from "./logoutButton.module.css";

export default function LogoutButton({userId} : {userId: string}) {
  const router = useRouter()
  const handleClick = async () => {
    await fetch(`/api/logout`, {
      method: "POST",
      body: JSON.stringify({id: userId}),
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
    router.push('/login')
  };
  return (
    <div>
      <button type="button" onClick={handleClick}>
        Logout
      </button>
    </div>
  );
}
