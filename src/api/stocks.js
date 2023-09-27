import api from './apiConfig'

const ROOT = process.env.REACT_APP_STOCK_API_ROOT;
const token = process.env.REACT_APP_API_KEY;

// Get Stock Data

export async function getStockData(id) {
    try {
        const response = await fetch(`${ROOT}quote?symbol=${id}&token=${token}`);
        const data = await response.json();
        // console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching stock data:", error);
        return null;
    }
}

// Search Stocks

// searchStock

// Buy Stock

export async function purchaseStock(id, amount, cost) {    
    const data = {
        stockId: id,
        amount: amount,
        cost: cost
    };

    console.log(data)

    const response = await api.post(`/stocks/${id}`, data);
    return response.data;
}

// Sell Stock

export async function sellSomeStocks(id, amount, cost) {
    const data = {
        stockId: id,
        amount: amount,
        cost: cost
    };

    const response = await api.put(`/stocks/${id}`, data);
    return response.data;
}

// Sell All Stocks

export async function sellAllStocks(id) {
    const data = {
        stockId: id
    };
    
    const response = await api.delete(`/stocks/${id}`, data);
    return response.data;
}

// Get a specific UserStock by ID

export async function getUserStockById(id) {
    
}