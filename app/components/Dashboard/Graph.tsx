import { useMediaQuery } from 'react-responsive';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "Monday", Gaming: 18, "UI/UX Design": 98 , Pathway: 0},
  { name: "Tuesday", Gaming: 80, "UI/UX Design": 80 , Pathway: 0 },
  { name: "Wednesday", Gaming: 10, "UI/UX Design": 62 , Pathway: 0 },
  { name: "Thursday", Gaming: 23, "UI/UX Design": 58 , Pathway: 0 },
  { name: "Friday", Gaming: 42, "UI/UX Design": 61 , Pathway: 0 },
  { name: "Saturday", Gaming: 42, "UI/UX Design": 60 , Pathway: 0 },
  { name: "Sunday", Gaming: 21, "UI/UX Design": 40 , Pathway: 0 },
];

function SimpleLineChart() {
  const is2xlScreen = useMediaQuery({ minWidth: 1536 });
  const chartWidth = is2xlScreen ? 1000 : 700;
  return (
    <LineChart
      width={chartWidth}
      height={360}
      data={data}
      margin={{ top: 45, right: 30, left: 15, bottom: 5 }}
      className="w-full object-cover"
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      
      <Line
        type="monotone"
        dataKey="Pathway"
        stroke="#BC00DD"
        activeDot={{ r: 8 }}
      />
      {/* <Line type="monotone" dataKey="Gaming" stroke="#BC00DD" /> */}
    </LineChart>
  );
}

export default SimpleLineChart;
