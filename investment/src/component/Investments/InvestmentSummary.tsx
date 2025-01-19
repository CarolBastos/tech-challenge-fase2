import React from "react";
import InvestmentCards from "./InvestmentCards";
import InvestmentHeader from "./InvestmentHeader";
import Statistics from "./Statistics";

export default function InvestmentSummary() {
  return (
    <div className="bg-neutral-300 p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <InvestmentHeader total="R$ 50.000,00" />
      <InvestmentCards rendaFixa="R$ 36.000,00" rendaVariavel="R$ 14.000,00" />
      <Statistics />
    </div>
  );
}
