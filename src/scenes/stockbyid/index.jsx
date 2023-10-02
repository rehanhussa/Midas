import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, useTheme, Button, Paper, Grid } from "@mui/material";
import { useParams } from 'react-router-dom';
import Overview from "../../components/Overview";
import Details from "../../components/Details";
import Chart from "../../components/Chart";
import Header from "../../components/Header";
import StockContext from "../../context/StockContext";
import { fetchQuote, fetchStockDetails } from "../../api/stock-api";
import { createStock, deleteStock, editStock, getUserById, getStockData } from "../../api/stocks";

const Stock = () => {
    const theme = useTheme();
    const currentMode = theme.palette.mode;
    const { id } = useParams();
    const { stockSymbol } = useContext(StockContext);

    const [stockDetails, setStockDetails] = useState({});
    const [quote, setQuote] = useState({});
    const [data, setData] = useState({});
    const [buyAmount, setBuyAmount] = useState(0);
    const [sellAmount, setSellAmount] = useState(0);
    const [cost, setCost] = useState(0);
    const [balance, setBalance] = useState(localStorage.getItem('userBalance'));
    const [userQuantity, setUserQuantity] = useState(0);
    const [isBuying, setIsBuying] = useState(true);

    useEffect(() => {
        const fetchStock = async () => {
            try {
                const stockData = await getStockData(id);
                setData(stockData);
            } catch (error) {
                console.error("Error setting stock data in state:", error);
            }
        };
        fetchStock();
    }, [id]);

    useEffect(() => {
        const fetchStock = async () => {
            try {
                const stockData = await fetchStockDetails(id);
                setStockDetails(stockData);
            } catch (error) {
                console.error("Error setting stock data in state:", error);
            }
        };
        fetchStock();
    }, [id]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getUserById(id);
                setBalance(user.balance);
                const matchingStock = user.stocks.find(stock => stock.symbol === id);

                if (matchingStock) {
                    setUserQuantity(matchingStock.quantity);
                } else {
                    console.log('Stock with the given symbol not found in user stocks.');
                }
            } catch (err) {
                console.error("Error setting user data in state:", err);
            }
        };
        fetchUser();
    }, [id]);

    useEffect(() => {
        if (data.c) {
            setCost(buyAmount * data.c);
        }
    }, [buyAmount, data.c]);

    useEffect(() => {
        if (data.c) {
            setCost(sellAmount * data.c);
        }
    }, [sellAmount, data.c]);

    async function handleBuySubmit(e) {
        e.preventDefault();
        const userBalance = parseFloat(balance);
        if (userBalance - cost < 0) {
            console.log('Insufficient funds');
            return;
        }
        const newBalance = userBalance - cost;
        localStorage.setItem('userBalance', newBalance);
        if (userQuantity === 0) {
            const response = await createStock(id, buyAmount, cost, newBalance, 1);
            setBalance(response.balance)
        } else {
            await editStock(id, buyAmount, cost, userBalance, 1);
        }
    }

    async function handleSellSubmit(e) {
        e.preventDefault();
        if (userQuantity - sellAmount > 0) {
            await editStock(id, sellAmount, cost, balance, 0);
        } else if (userQuantity - sellAmount === 0) {
            await deleteStock(id, sellAmount, cost, balance);
        } else {
            console.log('Insufficient owned stock amount')
        }
    }

    return (
        <div>
            {/* Portfolio Component */}
            <div className={`h-screen grid ...`}>
                <div className="col-span-1 ...">
                    <Header name={stockDetails.name} />
                </div>
                <div className="md:col-span-2">
                    <Chart stockSymbol={id} />
                </div>
                <div>
                    <Overview
                        symbol={stockSymbol}
                        price={quote.pc}
                        change={quote.d}
                        changePercent={quote.dp}
                        currency={stockDetails.currency}
                    />
                </div>
                <div className="row-span-2 ...">
                    <Details details={stockDetails} />
                </div>
            </div>

            {/* Stock Component */}
            <Box p={3}>
                <h1>{balance}</h1>
                <Paper elevation={3} style={{ padding: '16px' }}>
                    <Typography variant="h5" gutterBottom>
                        Stock Details
                    </Typography>
                    <Box mt={2} maxWidth="95%" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <Typography variant="h6">{id}</Typography>
                        <Typography noWrap>Latest Price: {data.c}</Typography>
                    </Box>
                </Paper>

                <Box mt={3}>
                    <form className="buy-form" onSubmit={handleBuySubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <label>Amount</label>
                                <input
                                    type="number"
                                    value={buyAmount}
                                    onChange={(e) => {setBuyAmount(parseInt(e.target.value)); console.log(e.target.value)}}
                                    style={{ color: currentMode === 'dark' ? '#e0e0e0' : '#141414' }}
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
                </Box>

                <Box mt={3}>
                    <form className="sell-form" onSubmit={handleSellSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <label>Amount</label>
                                <input
                                    type="number"
                                    value={sellAmount}
                                    onChange={(e) => {setSellAmount(parseInt(e.target.value)); console.log(e.target.value)}}
                                    style={{ color: currentMode === 'dark' ? '#e0e0e0' : '#141414' }}
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
                </Box>
            </Box>
        </div>
    );
};

export default Stock;
    
    
    