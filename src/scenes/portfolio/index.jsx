import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { getStockData, getUserStockData } from '../../api/stocks';
import { useState, useEffect } from "react";

const Portfolio = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [data, setData] = useState();

    useEffect(() => {
        const fetchStock = async () => {
            try {
                const stockData = await getStockData();
                setData(stockData);
            } catch (error) {
                console.error("Error setting stock data in state:", error);
            }
        };
        fetchStock();
    }, []);
    
    return (
        <div>
            {data && Object.entries(data).map(([key, value]) => (
                <div key={key}>
                    <p>{key}: {value}</p>
                </div>
            ))}
        </div>
    );
};

export default Portfolio;

// assume I have getAllUserStocks / 