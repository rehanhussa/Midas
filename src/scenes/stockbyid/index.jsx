import { Box, Button, IconButton, Typography, useTheme, TextField, Paper, Grid } from "@mui/material";
import { tokens } from "../../theme";
import { purchaseStock, sellSomeStocks, sellAllStocks, getStockData, getHistoricalStockData, getUserStockById } from '../../api/stocks';
import { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContextComponent'
import LineCharts from "../../components/LineCharts";

const Stock = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { id } = useParams();

    const [data, setData] = useState({});
    const [amount, setAmount] = useState(0);
    const [cost, setCost] = useState(0);

    useEffect(() => {
        const fetchStock = async () => {
            try {
                const stockData = await getHistoricalStockData(id);
                setData(stockData);
            } catch (error) {
                console.error("Error setting stock data in state:", error);
            }
        };
        fetchStock();
    }, []);

    useEffect(() => {
        if (data.c) {
            setCost(amount * data.c);
        }
    }, [amount, data.c]);

    async function handleBuySubmit(e) {
        e.preventDefault();
        await purchaseStock(id, amount, cost);
    }

    async function handleSellSubmit(e) {
        e.preventDefault();
        // Handle sell logic here
    }

    return (
        <Box p={3}>
            <Paper elevation={3} style={{ padding: '16px' }}>
                <Typography variant="h5" gutterBottom>
                    Stock Details
                </Typography>
                <LineCharts data={data} />
                <Box mt={2}>
                    <Typography variant="h6">{id}</Typography>
                    <Typography>Latest Price: {data.c}</Typography>
                </Box>
            </Paper>

            <Box mt={3}>
                <Paper elevation={3} style={{ padding: '16px' }}>
                    <Typography variant="h6" gutterBottom>
                        Buy Stocks
                    </Typography>
                    <form onSubmit={handleBuySubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Amount"
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="subtitle1">Cost: {cost}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" type="submit">
                                    Buy
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Box>

            <Box mt={3}>
                <Paper elevation={3} style={{ padding: '16px' }}>
                    <Typography variant="h6" gutterBottom>
                        Sell Stocks
                    </Typography>
                    <form onSubmit={handleSellSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Amount"
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="subtitle1">Cost: {cost}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="secondary" type="submit">
                                    Sell
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Box>
        </Box>
    );
};

export default Stock;
