import React, { useState, useEffect } from 'react';
import { Box, Typography, useTheme, List, ListItem, Divider } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { getUserTrades } from '../../api/users';

const Investment = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [userTrades, setUserTrades] = useState({});
    const [userBalance, setUserBalance] = useState(parseFloat(localStorage.getItem('userBalance')) || 0);

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
    
        trades.forEach(trade => {
            if (groupedTrades[trade.symbol]) {
                // Adjust quantity based on trade type (buy or sell)
                if (trade.type) { // Buy
                    groupedTrades[trade.symbol].quantity += trade.quantity;
                    groupedTrades[trade.symbol].stake += trade.stake;
                } else { // Sell
                    groupedTrades[trade.symbol].quantity -= trade.quantity;
                    groupedTrades[trade.symbol].stake -= trade.stake;
                }
            } else {
                groupedTrades[trade.symbol] = { ...trade };
            }
        });
    
        return Object.values(groupedTrades);
    };
    
 // Calculate the total stake from all trades
 const totalStake = userTrades.userTrades ? userTrades.userTrades.reduce((acc, trade) => acc + trade.stake, 0) : 0;

 // Calculate cash value
 const cashValue = userBalance - totalStake;

 return (
    <Box m="20px">
        <Header title="Investment Portfolio" subtitle="Your Stocks and Balance" />
        <Box my={3}>
            <Typography variant="h5" color={colors.primary}>
                Total portfolio value: ${userBalance.toFixed(2)}
            </Typography>
        </Box>
        <Box my={3}>
            <Typography variant="h5" color={colors.secondary}>
                Brokerage Cash: ${cashValue.toFixed(2)}
            </Typography>
        </Box>
        <Typography variant="h6">Stocks:</Typography>
        <List>
            {userTrades.userTrades && userTrades.userTrades.map(trade => (
                <div key={trade.symbol}>
                    <ListItem>
                        <Typography>
                            <strong>Symbol:</strong> {trade.symbol} | 
                            <strong>Quantity:</strong> {trade.quantity} | 
                            <strong>Equity:</strong> ${trade.stake.toFixed(2)}
                        </Typography>
                    </ListItem>
                    <Divider />
                </div>
            ))}
        </List>
    </Box>
);
}

export default Investment;

