import {createContext, useEffect, useState } from "react";

export const authContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null)
    console.log("hello from Auth");

   
    useEffect(function () {
        console.log("hello from Auth IF");

        if (localStorage.getItem('tkn') !== null) {
            console.log("dsfdf");
            setToken(localStorage.getItem('tkn'))
        }
    }, [])

    return <authContext.Provider value= {{token, setToken}}>
        {children}
    </ authContext.Provider>
}