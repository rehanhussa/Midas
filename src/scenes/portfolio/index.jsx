import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { getStockData, getAllUserStocks } from '../../api/stocks';
import { useState, useEffect } from "react";

const Portfolio = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        const fetchUserStocks = async () => {
            try {
                const userStocks = await getAllUserStocks();
                if (Array.isArray(userStocks)) {
                    setStocks(userStocks);
                } else {
                    console.error("Expected an array but received:", userStocks);
                }
            } catch (error) {
                console.error("Error fetching user stocks:", error);
            }
        };
        fetchUserStocks();
    }, []);

    return (
        <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
        >
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                colors={colors.grey[100]}
                p="15px"
            >
                <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                    Portfolio
                </Typography>
            </Box>
            {Array.isArray(stocks) && stocks.map((stock, i) => (
                <Box
                    key={i}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom={`4px solid ${colors.primary[500]}`}
                    p="15px"
                >
                    <Box>
                        <Typography
                            color={colors.greenAccent[500]}
                            variant="h5"
                            fontWeight="600"
                        >
                            {stock.stockId}
                        </Typography>
                        <Typography color={colors.grey[100]}>
                            {stock.amount} shares
                        </Typography>
                    </Box>
                    <Box color={colors.grey[100]}>
                        ${stock.cost}
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default Portfolio;
