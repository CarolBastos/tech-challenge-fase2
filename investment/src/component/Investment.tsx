import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    hoverOffset: number;
  }[];
}

const InvestmentCard: React.FC = () => {
  const totalInvestimentos= 50000;
  const rendaFixa= 36000;
  const rendaVariavel= 14000;

  const formataValores = (valor: number) => {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
  }
  
  const chartData: ChartData = {
    labels: ['Fundo de Investimento', 'Tesouro Direto', 'Previdência Privada', 'Bolsa de Valores'],
    datasets: [
      {
        label: 'Distribuição dos Investimentos',
        data: [30, 40, 20, 10], 
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverOffset: 4,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: 'right' as const, 
        labels: {
          boxWidth: 20, 
          padding: 10,
          color: 'white',
          font:{
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="bg-card-pattern bg-cover bg-center bg-no-repeat p-6 rounded-lg shadow-md max-w-md">
      <h2 className="text-2xl font-semibold text-center mb-4">Investimentos</h2>
      
      <div className="text-center mb-4">
        <h3 className="text-xl font-semibold text-center mb-4">
          Total: <span className="font-bold text-blue-500">{formataValores(totalInvestimentos)}</span>
        </h3>
      </div>
      
      <div className="flex justify-between mb-4 h-[20%]">
        <div className="cardColor p-4 rounded-lg w-1/2 text-center">
          <h4 className="text-lg font-medium">Renda Fixa</h4>
          <p className="text-xl">{formataValores(rendaFixa)}</p>
        </div>
        
        <div className="cardColor p-4 rounded-lg w-1/2 text-center">
          <h4 className="text-lg font-medium">Renda Variável</h4>
          <p className="text-xl">{formataValores(rendaVariavel)}</p>
        </div>
      </div>

      <h4 className="text-xl font-semibold text-center mb-4">Estatísticas</h4>
      <div className="cardColor p-6 rounded-lg h-[40rem]">
        <Doughnut data={chartData} options={chartOptions}/>
      </div>
    </div>
  );
};


export default InvestmentCard;