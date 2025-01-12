import styles from "@/styles/Home.module.css";
import WelcomeLayout from "./Layout/WelcomeLayout";



export default function Home() {
  return (
    <>
      <main className="w-full bg-tertiary-400 max-[1023px]:pb-9">
        <body>
        <WelcomeLayout />
        </body>
      </main>
    </>
  );
}
