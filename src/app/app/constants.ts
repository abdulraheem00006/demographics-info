import IncomeRange from "./interfaces/income_range";
import { LayerSpecification } from "maplibre-gl";

export const INCOME_RANGES: IncomeRange[] = [
  { color: "#F2F12D", value: 0 },
  { color: "#E6B71E", value: 35000 },
  { color: "#B86B25", value: 70000 },
  { color: "#A25626", value: 105000 },
  { color: "#A25626", value: 140000 },
  { color: "#A25626", value: 175000 },
  { color: "#A25626", value: 210000 },
  { color: "#A25626", value: 245000 },
  { color: "#A25626", value: 280000 },
  { color: "#A25626", value: 350000 },
];


export const INCOME_PAINT_FILL = {
  "fill-color": [
    "interpolate",
    ["linear"],
    ["get", "Total income: Average amount ($)"],
    ...INCOME_RANGES.flatMap((income) => [income.value, income.color]),
  ],
  "fill-opacity": 0.75,
} as LayerSpecification["paint"];

export const AVERAGE_INCOME_PROPERTY = "Total income: Average amount ($)";
