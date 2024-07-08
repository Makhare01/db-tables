import { Box, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <Box
        p={2}
        bgcolor="background.paper"
        borderRadius={2}
        border={1}
        borderColor="divider"
      >
        <Typography variant="body2">
          Table:{" "}
          <Typography component="span" fontWeight={700}>
            {label}
          </Typography>
        </Typography>
        <Typography variant="body2">
          Documents count:{" "}
          <Typography component="span" fontWeight={700}>
            {payload[0].value}
          </Typography>
        </Typography>
      </Box>
    );
  }

  return null;
};

type Props = {
  data: Array<{ name: string; count: number }>;
};

export const StatisticsChart = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip cursor={{ fill: "transparent" }} content={<CustomTooltip />} />
        <Legend />
        <Bar
          dataKey="count"
          fill="#cfd8ff"
          stroke="#869EFE"
          barSize={70}
          activeBar={<Rectangle fill="#869EFE" stroke="#cfd8ff" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
