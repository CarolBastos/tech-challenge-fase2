export default function InvestmentCard({ title, value }: { title: string; value: string }) {
    return (
      <div className="bg-primary-500 text-white p-4 rounded-lg shadow-md w-1/2 text-center mx-1">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-lg">{value}</p>
      </div>
    );
  }
  