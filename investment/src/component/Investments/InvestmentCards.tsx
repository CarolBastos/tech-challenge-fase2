import React from "react";
import InvestmentCard from "./InvestmentCard";

export default function InvestmentCards({ rendaFixa, rendaVariavel }: { rendaFixa: string; rendaVariavel: string }) {
  return (
    <div className="flex justify-between mt-4">
      <InvestmentCard title="Renda Fixa" value={rendaFixa} />
      <InvestmentCard title="Renda Variável" value={rendaVariavel} />
    </div>
  );
}
