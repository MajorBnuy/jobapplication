"use client"
import styles from "./logoutButton.module.css";

export default function LogoutButton({userId} : {userId: string}) {

  const handleClick = async () => {
    await fetch(`/api/logout`, {
      method: "POST",
      body: JSON.stringify({id: userId}),
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
    window.location.href = "/login"
  };
  return (
    <div>
      <button className={styles.button} type="button" onClick={handleClick}>
        Logout
      </button>
    </div>
  );
}
