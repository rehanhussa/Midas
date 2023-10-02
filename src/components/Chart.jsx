import React, { useEffect, useState, useContext } from "react";
import {
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  AreaChart,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { mockHistoricalData } from "../data/mockData";
import {
  convertUnixTimestampToDate,
  convertDateToUnixTimestamp,
  createDate,
} from "../helpers/date-helper";
import StockContext from "../context/StockContext";
import { chartConfig } from "../data/config";
import { fetchHistoricalData } from "../api/stock-api";
import ChartFilter from "./ChartFilter";
import { getRelevantDates } from "../helpers/date-helper";


const Chart = ({ stockSymbol }) => {
  const [data, setData] = useState([]);
  const currentStockValue = data.length > 0 ? parseFloat(data[data.length - 1].value) : null;
  const minValue = data.length > 0 ? Math.min(...data.map(item => parseFloat(item.value))) : null;
  const difference = currentStockValue ? currentStockValue - minValue : 0;
  const domainMin = currentStockValue ? currentStockValue - difference : "dataMin";
  const domainMax = currentStockValue ? currentStockValue + difference : "dataMax";
  const [dates, setDates] = useState(( ) => getRelevantDates());
  useEffect (() => {
    console.log(dates)
  }, [dates])
  const formatData = (rawData) => {
    return rawData.c.map((item, index) => {
      return {
        value: item.toFixed(2),
        date: convertUnixTimestampToDate(rawData.t[index]),
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchHistoricalData(stockSymbol, "1", dates.oneWeekAgo, Math.floor(Date.now() / 1000)); // Replace this with your actual API call
        setData(result);
        console.log(result)
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      }
    };

    fetchData();
  }, [stockSymbol]);
  return (
    <div>
      <ul className="flex">
        {Object.keys(chartConfig).map((item) => (
          <li key={item}>
            <button>{item}</button>
          </li>
        ))}
      </ul>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[domainMin, domainMax]} />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;