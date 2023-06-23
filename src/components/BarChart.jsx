import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// custom hooks
import { useExpenseContext } from "../hooks/useExpenseContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const days = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sáb"];

  const { allExpenses } = useExpenseContext();

  const subDays = (fecha, dias) => {
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  };

  const lastSevenDay = subDays(new Date(), -7);

  const today = new Date();
  const yesterday = subDays(new Date(), -1);
  const lastTwoDay = subDays(new Date(), -2);
  const lastThreeDay = subDays(new Date(), -3);
  const lastFourDay = subDays(new Date(), -4);
  const lastFiveDay = subDays(new Date(), -5);
  const lastSixDay = subDays(new Date(), -6);

  const lastSevenDayExpenses = allExpenses.filter(
    (expense) => new Date(expense.createdAt).getTime() > lastSevenDay.getTime()
  );

  const spentToday = lastSevenDayExpenses
    .map((expense) => {
      if (new Date(expense.createdAt).getDate() === today.getDate()) {
        return expense.amount;
      }
      return 0;
    })
    .reduce((acc, currentValue) => acc + currentValue, 0);

  const spentYesterday = lastSevenDayExpenses
    .map((expense) => {
      if (new Date(expense.createdAt).getDate() === yesterday.getDate()) {
        return expense.amount;
      }
      return 0;
    })
    .reduce((acc, currentValue) => acc + currentValue, 0);

  const spentlastTwoDay = lastSevenDayExpenses
    .map((expense) => {
      if (new Date(expense.createdAt).getDate() === lastTwoDay.getDate()) {
        return expense.amount;
      }
      return 0;
    })
    .reduce((acc, currentValue) => acc + currentValue, 0);

  const spentlastThreeDay = lastSevenDayExpenses
    .map((expense) => {
      if (new Date(expense.createdAt).getDate() === lastThreeDay.getDate()) {
        return expense.amount;
      }
      return 0;
    })
    .reduce((acc, currentValue) => acc + currentValue, 0);

  const spentlastFourDay = lastSevenDayExpenses
    .map((expense) => {
      if (new Date(expense.createdAt).getDate() === lastFourDay.getDate()) {
        return expense.amount;
      }
      return 0;
    })
    .reduce((acc, currentValue) => acc + currentValue, 0);

  const spentlastFiveDay = lastSevenDayExpenses
    .map((expense) => {
      if (new Date(expense.createdAt).getDate() === lastFiveDay.getDate()) {
        return expense.amount;
      }
      return 0;
    })
    .reduce((acc, currentValue) => acc + currentValue, 0);

  const spentlastSixDay = lastSevenDayExpenses
    .map((expense) => {
      if (new Date(expense.createdAt).getDate() === lastSixDay.getDate()) {
        return expense.amount;
      }
      return 0;
    })
    .reduce((acc, currentValue) => acc + currentValue, 0);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Gastos - Últimos 7 días",
      },
    },
  };

  const labels = [
    `${days[lastSixDay.getDay()]} ${lastSixDay.getDate()}`,
    `${days[lastFiveDay.getDay()]} ${lastFiveDay.getDate()}`,
    `${days[lastFourDay.getDay()]} ${lastFourDay.getDate()}`,
    `${days[lastThreeDay.getDay()]} ${lastThreeDay.getDate()}`,
    `${days[lastTwoDay.getDay()]} ${lastTwoDay.getDate()}`,
    `${days[yesterday.getDay()]} ${yesterday.getDate()}`,
    `${days[today.getDay()]} ${today.getDate()}`,
  ];

  const data = {
    labels,
    datasets: [
      {
        data: [
          spentlastSixDay,
          spentlastFiveDay,
          spentlastFourDay,
          spentlastThreeDay,
          spentlastTwoDay,
          spentYesterday,
          spentToday,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(80, 69, 100, 0.2)",
        ],
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default BarChart;
