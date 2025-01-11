import dynamic from "next/dynamic";
import styles from "@/styles/Home.module.css";


export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <nav>
          <h2>dashboard Menu</h2>
        </nav>
        
        <footer>dashboard Footer</footer>
      </main>
    </>
  );
}
