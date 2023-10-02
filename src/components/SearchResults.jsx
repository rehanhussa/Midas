import React, { useContext } from 'react'
import StockContext from "../context/StockContext"

const SearchResults = ({results}) => {
    const {setStockSymbol} = useContext(StockContext)
    return (
        <ul className="absolute top-12 w-full bg-white border-2 border-neutral-200 rounded-md h-64 overflow-y-scroll custom-scrollbar">
            {results.map((item) => {
                return (
                    <li key={item.symbol} className="" onClick={() => {setStockSymbol(item.symbol)}}>
                        <span>{item.symbol}</span>
                        <span>{item.description}</span>
                    </li>
                );
            })}
        </ul>
    );
};

export default SearchResults