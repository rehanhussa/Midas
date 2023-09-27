import React, { createContext, useEffect, useState } from 'react';
import { isTokenValid } from '../api/auth';

export const AuthContext = createContext(null);

export default function AuthContextComponent({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        // Check if the user's token is valid and update the state
        isTokenValid()
            .then((response) => {
                setIsLoggedIn(response.valid);
                // If you want to set user data, you can do it here
                // setUser(response.user);
            })
            .catch((error) => {
                console.error("Error checking token validity:", error);
                setIsLoggedIn(false); // Optionally set to false on error
            });
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user }}>
            {children}
        </AuthContext.Provider>
    );
}
