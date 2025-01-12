import DoughnutChart from "../doughnut-chart/DoughnutChart";

export default function Statistics() {
    return (
        <div className="mt-14">
            <h3 className="text-lg">Estatísticas</h3>
            <div className="bg-primary-500 text-white p-6 mt-6 rounded-lg shadow-md">
                <div className="mt-4 flex justify-center">
                    <DoughnutChart />
                </div>
            </div>
        </div>
    );
}
