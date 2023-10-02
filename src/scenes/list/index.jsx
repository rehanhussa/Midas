import React, { useState, useEffect } from "react";
import { getUserTrades } from "../../api/users";


const StocksList = () => {
  const [userTrades, setUserTrades] = useState({});
  useEffect(() => {
    const fetchUserTrades = async () => {
      try {
        const fetchedTrades = await getUserTrades();
        const processedTrades = processTrades(fetchedTrades.userTrades);
        setUserTrades({ ...fetchedTrades, userTrades: processedTrades });
      } catch (error) {
        console.error("Error setting Trades in state:", error);
      }
    };
    fetchUserTrades();
  }, []);
  const processTrades = (trades) => {
    const groupedTrades = {};
    trades.forEach((trade) => {
      if (groupedTrades[trade.symbol]) {
        if (trade.type) {
          // Buy
          groupedTrades[trade.symbol].quantity += trade.quantity;
          groupedTrades[trade.symbol].stake += trade.stake;
        } else {
          // Sell
          groupedTrades[trade.symbol].quantity -= trade.quantity;
          groupedTrades[trade.symbol].stake -= trade.stake;
        }
      } else {
        groupedTrades[trade.symbol] = { ...trade };
      }
    });
    return Object.values(groupedTrades);
  };
  return (
    <div>
      <h2>Your Stocks:</h2>
      <ul>
        {userTrades.userTrades &&
          userTrades.userTrades.map((trade) => (
            <li key={trade.symbol}>
              <strong>Symbol:</strong> {trade.symbol} |
              <strong>Quantity:</strong> {trade.quantity} |
              <strong>Stake:</strong> ${trade.stake.toFixed(2)}
            </li>
          ))}
      </ul>
    </div>
  );
};
export default StocksList;
