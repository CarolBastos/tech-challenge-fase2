import dynamic from "next/dynamic";
import styles from "@/styles/Home.module.css";


export default function Home() {
  return (
    <>
      <main className={styles.main}>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Clique Aqui
      </button>
      </main>
    </>
  );
}
