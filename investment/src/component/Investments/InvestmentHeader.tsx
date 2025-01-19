import React from "react";

export default function InvestmentHeader({ total }: { total: string }) {
    return (
      <div>
        <h2 className="text-xl font-bold text-gray-800">Investimentos</h2>
        <p className="text-lg text-primary-500 mt-2">Total: {total}</p>
      </div>
    );
  }
  