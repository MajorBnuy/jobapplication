import styles from "./layout.module.css"
import Link from "next/link";
import "./global.css"

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className={styles.header}>
          <nav className={styles.nav}>
            <Link href="/">Job Application</Link>
            <Link href="/job-application/new">New Application</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
