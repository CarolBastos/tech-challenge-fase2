import styles from "@/styles/Home.module.css";
import { useRouter } from 'next/router';
import WelcomeLayout from './Layout/WelcomeLayout';
import dynamic from 'next/dynamic';
import { Suspense } from "react";

// Carregamento dinâmico do componente Dashboard
const Dashboard = dynamic(() => import('dashboard/index'), {
  ssr: false, // Desabilitar SSR se não precisar da renderização do lado servidor
});

export default function Home() {
  const { pathname } = useRouter();

  return (
    <>
      <main className="w-full bg-tertiary-400 max-[1023px]:pb-9">
          <Suspense fallback={<div>Loading...</div>}>
        <Dashboard /> {/* Componente carregado dinamicamente */}
      </Suspense>
      </main>
    </>
  );
}
