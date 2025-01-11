import dynamic from "next/dynamic";
import styles from "@/styles/Home.module.css";

const ModuleA = dynamic(() => import("header/ModuleA"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <ModuleA />
        <nav>
          <h2>Welcome Menu</h2>
        </nav>
        
        <footer>Welcome Footer</footer>
      </main>
    </>
  );
}
