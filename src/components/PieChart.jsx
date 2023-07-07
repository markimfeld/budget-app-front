import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Card } from "react-bootstrap";

import { Pie } from "react-chartjs-2";
import { useQuery } from "react-query";

import { useBudgetContext } from "../hooks/useBudgetContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const { getBudgets } = useBudgetContext();

  const { data: budgets, isLoading } = useQuery({
    queryKey: ["budgets"],
    queryFn: getBudgets,
  });

  const data = {
    labels: budgets?.map((budget) => budget.name),
    datasets: [
      {
        label: "Gastado",
        data: budgets?.map((budget) => budget.spentAmount),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const thereIsNothing =
    data?.datasets[0]?.data?.reduce((prev, current) => prev + current) === 0;

  if (!isLoading && (budgets?.length === 0 || thereIsNothing)) {
    return <Card.Title>No hay datos</Card.Title>;
  }

  if (!isLoading && budgets?.length > 0) {
    return <Pie data={data} />;
  }
};

export default PieChart;
