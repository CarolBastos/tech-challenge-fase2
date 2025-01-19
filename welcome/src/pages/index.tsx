import { useRouter } from "next/router";
import WelcomeLayout from "./Layout/WelcomeLayout";
import { Suspense } from "react";

export default function Home() {
  const { pathname } = useRouter();

  return (
    <>
      <main className="w-full bg-tertiary-400 max-[1023px]:pb-9">
          <Suspense fallback={<div>Loading...</div>}>
        <WelcomeLayout /> {/* Componente carregado dinamicamente */}
      </Suspense>
      </main>
    </>
  );
}
