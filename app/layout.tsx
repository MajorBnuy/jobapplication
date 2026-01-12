"use client";
import styles from "./layout.module.css";
import Link from "next/link";
import "./global.css";
import LogoutButton from "@/components/LogoutButton";
import { useEffect, useState } from "react";
import { createBrowserClient } from "@/lib/supabase/createBrowserCient";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createBrowserClient();
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data?.user?.id ?? null);
      setUser(data?.user?.email ?? null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUserId(session?.user?.id ?? null);
      }
    );
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <html lang="en">
      <body>
        <header className={styles.header}>
          <nav className={styles.nav}>
            <div>
              <Link href="/">Job Application</Link>
              <span>||</span>
              <Link href="/job-application/new">New Application</Link>
            </div>
            <div className="layout_login">
              {!userId ? (
                <>
                  <Link href="/register">Register</Link>
                  <span>||</span>
                  <Link href="/login">Login</Link>{" "}
                </>
              ) : (
                <>
                  <span>{user}</span>
                  <span>||</span>
                  <LogoutButton userId={userId} />
                </>
              )}
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
