import React, { useState, useEffect } from 'react';

const InvestmentCard = React.lazy(() => import('Investment/Investment'));

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Setar o estado como true após a renderização do lado do cliente
    setIsClient(true);
  }, []);

  return (
    <div className="w-full bg-tertiary-400 max-[1023px]:pb-9">
      {/* Apenas renderiza Suspense e o componente Welcome no lado do cliente */}
      {isClient ? (
        <React.Suspense fallback='Loading...'>
          <InvestmentCard />
        </React.Suspense>
      ) : (
        <div>Carregando...</div>
      )}
    </div>
  );
}