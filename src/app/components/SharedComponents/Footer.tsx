"use client";

import Link from "next/link";
import styles from "@/app/styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          Twitter
        </Link>
        <Link href="https://docs.delphi.com" target="_blank" rel="noopener noreferrer">
          Docs
        </Link>
        <Link href="https://store.delphi.com" target="_blank" rel="noopener noreferrer">
          Store
        </Link>
      </div>
      <p className={styles.credit}>
        Powered by <Link href="/">Yeti-Apes & Vesta</Link>
      </p>
    </footer>
  );
}