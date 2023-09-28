import React, { useState, useEffect } from "react";
import { XIcon, SearchIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom'; // Import Link from React Router
import { stocksData } from '../data/stocksData';

const Search = () => {
    const [input, setInput] = useState('')
    const [bestMatches, setBestMatches] = useState([])

    useEffect(() => {
        updateBestMatches(); // Update matches when input changes
    }, [input]);

    const clear = () => {
        setInput('')
        setBestMatches([])
    }

    const updateBestMatches = () => {
        if (input) {
            const matches = stocksData.filter(stock => stock.displaySymbol.includes(input.toUpperCase()));
            setBestMatches(matches);
        } else {
            setBestMatches([]);
        }
    };

    return (
        <div className="flex items-center my-4 border-2 rounded-md relative z-50 w-96 bg-white border-neutral-200">
            <input 
                type="text" 
                value={input} 
                className="w-full px-4 py-2 focus:outline-none rounded-md" 
                placeholder="Search Stocks"
                onChange={(event) => setInput(event.target.value)}
                list="stocks" // Link the input to the datalist
            />
            <datalist id="stocks">
                {stocksData.map(stock => (
                    <option key={stock.displaySymbol} value={stock.displaySymbol}>{stock.description}</option>
                ))}
            </datalist>

            {input && <button onClick={clear}> 
                <XIcon classname="h-4 w-4 fill-gray-500" />
            </button>}

            <button onClick={updateBestMatches} className="h-8 w-8 bg-indigo-600 rounded-md flex justify-center items-center m-1 p-2">
                <SearchIcon className="h-4 w-4 fill-gray-100" />
            </button>

            {input && bestMatches.length > 0 && (
                <div>
                    {bestMatches.map(stock => (
                        <Link key={stock.displaySymbol} to={`/stocks/${stock.displaySymbol}`}>
                            {stock.description} ({stock.displaySymbol})
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Search;