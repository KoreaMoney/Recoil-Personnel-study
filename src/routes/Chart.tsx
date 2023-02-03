import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "./api";
import ApexCharts from "react-apexcharts";
import { useTheme } from "styled-components";

interface chartProps {
  coinId: string;
}
interface IHistoryData {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

const Chart = ({ coinId }: chartProps) => {
  const { isLoading, data } = useQuery<IHistoryData[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  let validData = data ?? [];
  if ("error" in validData) {
    validData = [];
  }
  const theme = useTheme();
  return (
    <div>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <>
          <ApexCharts
            type="line"
            series={[
              {
                name: "Price",
                data: validData?.map((price) => parseFloat(price.close)),
              },
            ]}
            options={{
              theme: {
                mode: "dark",
              },
              chart: {
                height: 300,
                width: 500,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              grid: {
                show: false,
              },
              stroke: {
                curve: "smooth",
                width: 4,
              },
              xaxis: {
                axisTicks: { show: false },
                labels: {
                  show: false,
                },

                categories: data?.map((price) =>
                  new Date(price.time_close * 1000).toISOString()
                ),
              },
              yaxis: {
                show: false,
              },
              fill: {
                type: "gradient",
                gradient: { gradientToColors: ["#03fc99"], stops: [0, 100] },
              },
              colors: ["blue"],
              tooltip: {
                y: {
                  formatter: (value) => `${value.toFixed(2)}`,
                },
              },
            }}
          />
          <ApexCharts
            type="candlestick"
            series={[
              {
                name: "시세",
                data: validData.map((price) => ({
                  x: price.time_close * 1000,
                  y: [
                    parseFloat(price.open),
                    parseFloat(price.high),
                    parseFloat(price.low),
                    parseFloat(price.close),
                  ],
                })),
              },
            ]}
            width="100%"
            height="160px"
            options={{
              noData: {
                text: "",
              },
              plotOptions: {
                candlestick: {
                  colors: {
                    upward: "red",
                    downward: "blue",
                  },
                  wick: {
                    useFillColor: true,
                  },
                },
              },
              chart: {
                toolbar: {
                  show: false,
                },
                background: "transparent",
                width: 500,
                height: 300,
              },
              grid: {
                show: false,
              },
              tooltip: {
                y: {
                  formatter: (value) => `$${value.toFixed(2)}`,
                },
              },

              xaxis: {
                labels: {
                  show: true,
                  style: {
                    fontSize: "12px",
                    colors: "white",
                  },
                },

                type: "datetime",
                categories: validData.map((price) => price.time_close * 1000),
                axisTicks: {
                  show: false,
                },
                axisBorder: {
                  show: false,
                },
                tooltip: {
                  enabled: false,
                },
              },
              yaxis: {
                labels: {
                  show: false,
                },
              },
              stroke: {
                width: 2,
              },
            }}
          />
        </>
      )}
    </div>
  );
};

export default Chart;
