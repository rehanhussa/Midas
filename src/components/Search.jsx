import React, { useState, useEffect } from "react";
import { XIcon, SearchIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom';
import { stocksData } from '../data/stocksData';

const Search = () => {
    const [input, setInput] = useState('')
    const [bestMatches, setBestMatches] = useState([])

    useEffect(() => {
        updateBestMatches();
    }, [input]);

    const clear = () => {
        setInput('')
        setBestMatches([])
    }

    const updateBestMatches = () => {
        if (input) {
            const matches = stocksData.filter(stock => stock.displaySymbol.includes(input.toUpperCase()));
            setBestMatches(matches.slice(0, 5)); // Limiting the results to the first five matches
        } else {
            setBestMatches([]);
        }
    };

    return (
        <div className="flex items-center my-4 border-2 rounded-md relative z-50 w-96 border-neutral-200">
            <input 
                type="text" 
                value={input} 
                className="w-full px-4 py-2 focus:outline-none rounded-md bg-white text-black" // Set background to white and text to black
                placeholder="Search Stocks"
                onChange={(event) => setInput(event.target.value)}
                list="stocks"
            />
            <datalist id="stocks">
                {stocksData.map(stock => (
                    <option key={stock.displaySymbol} value={stock.displaySymbol}>{stock.description}</option>
                ))}
            </datalist>

            {input && <button onClick={clear}> 
                <XIcon className="h-4 w-4" />
            </button>}

            <button onClick={updateBestMatches} className="h-8 w-8 bg-indigo-600 rounded-md flex justify-center items-center m-1 p-2">
                <SearchIcon className="h-4 w-4 orange" />
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
