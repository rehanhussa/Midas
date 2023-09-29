import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
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
    // console.log('ID', id);

    // const { user } = useContext(AuthContext) 

    console.log(localStorage.getItem('user'));
    
    const [data, setData] = useState({});
    const [amount, setAmount] = useState(0);
    const [cost, setCost] = useState(0);

    // If a user's stock array has this stock's ID, then render the user's stock data using getUserStockById

    useEffect(() => {
        const fetchStock = async () => {
            try {
                const stockData = await getHistoricalStockData(id);
                setData(stockData);
                console.log("STOCK DATA", stockData)
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
        e.preventDefault()
        await purchaseStock(id, amount, cost)
    }

    async function handleSellSubmit(e) {
        e.preventDefault()
        /* if (user.balance -= cost < 0) {
            Insufficient amount of stocks
        } else if (user.balance -= cost > 0) {
            sellSomeStocks
        } else {
            sellAllStocks
        }
        } */
    }

console.log(data)
    return (
        <div>
            <div className="price-container b-2">

            {/* {data && Object.entries(data).map(([key, value]) => (
                <div key={key}>
                    <p>{key}: {value}</p>
                </div>
            ))} */}
            <LineCharts data={data} />

                <div key={data.symbol}>
                    <p>{id}</p>
                    <p>latestprice: {data.c}</p>
                </div>
            </div>
            <form className="buy-form" onSubmit={handleBuySubmit}>
                <div>
                    {/* Amount */}
                    <div>
                        <label>Amount</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                        />
                    </div>

                    {/* Cost */}
                    <div>
                        <label>Cost</label>
                        <p>{cost}</p>
                    </div>
                </div>

                <button>Submit</button>
            </form>
            <form className="sell-form" onSubmit={handleSellSubmit}>
                <div>
                    {/* Amount */}
                    <div>
                        <label>Amount</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                        />
                    </div>

                    {/* Cost */}
                    <div>
                        <label>Cost</label>
                        <p>{cost}</p>
                    </div>
                </div>

                <button>Submit</button>
            </form>
        </div>
    );
};

export default Stock;
