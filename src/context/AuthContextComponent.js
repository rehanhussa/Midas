import React, { createContext, useEffect, useState } from 'react';
import { isTokenValid } from '../api/auth';

export const AuthContext = createContext(null);

// export default function Button({ children }) {
export default function AuthContextComponent({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        console.log("adding data")
      }, [user]);

    useEffect( () => {
        // Check if the user's token is valid and update the state
        const func = async () => {
            if (!localStorage.getItem("token")) return;
            await isTokenValid()
                .then((response) => {
                    console.log(response)
                    setIsLoggedIn(response.valid);
                    // If you want to set user data, you can do it here
                    setUser(response.user);
                    console.log(response.user)
                    // localStorage.setItem('user', response.user);
                })
                .catch((error) => {
                    console.error("Error checking token validity:", error);
                    setIsLoggedIn(false); // Optionally set to false on error
                });
        }
        func()
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user }}>
            {children}
        </AuthContext.Provider>
    );
}