import React, {createContext, useEffect, useState,} from "react";
import {useHistory} from "react-router-dom";
import jwt_decode from  'jwt-decode';
import axios from "axios";

export const AuthContext = createContext(null);

function AuthContextProvider ({ children }) {
    const [auth, toggleAuth] = useState ({
        isAuth: false,
        user: null,
        status: 'pending',
    });
    const history = useHistory ();


    useEffect ( () => {
        // is er een token? En zo ja, is deze nog geldig?
        const token = localStorage.getItem ( 'token' );

        if (token) {
            // Zo ja, haal opnieuw de gebruikersdata op en zet deze in de state
            async function getUserData() {
                const decodedToken = jwt_decode ( token );

                try {
                    const response = await axios.get (`http://localhost:3000/600/users/${decodedToken.sub}`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    });

                    toggleAuth({
                        isAuth: true,
                        user: {
                            email: response.data.email,
                            username: response.data.username,
                            id: response.data.id,
                        },
                        status: 'done',
                    })
                } catch (e) {
                    toggleAuth({
                        ...auth,
                        status: 'done',
                    });
                    console.error(e);
                    // voor de zekerheid de eventuele token uit de localStorage halen
                    console.error(e);
                }
            }

            getUserData ();
        } else {
            // Zo nee, dan hoef je verder niets te doen.
            toggleAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }, [] );

    function login(token) {
        console.log(token);
        // De token decode om te kijken wanneer hij verloopt en welke info erin zit
        const decodedToken = jwt_decode (token);
        console.log (decodedToken);

        // 1. Zet de token in de localStorage
        localStorage.setItem ( 'token', token );
        // 2. Indien nodig de gebruikersgegevens uit de backend halen op:
        // async function getData() {
        // };

        // 3. De gebruikersgegevens niet in de JWT in de context state zetten:
        toggleAuth ({
            ...auth,
            isAuth: true,
            user: {
                email: decodedToken.email,
                id: decodedToken.sub,
            },
            status: 'done'
        });

        console.log ( 'De gebruiker is ingelogd!' );
        history.push ( '/profile' );
    }

    function logout() {
        console.log ( 'De gebruiker is uitgelogd!' );
        toggleAuth ({
            isAuth: false,
            user: null,
            status: 'done',
        });

        history.push ( '/' );
    }

    const contextData = {
        isAuth: auth.isAuth,
        user: auth.user,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {/*auth.status === 'done'? children: <p>Loading...</p>*/}
            {auth.status === 'done' && children}
            {auth.status === 'pending' && <p>Loading...</p>}
            {auth.status === 'error' && <p>Error! Refresh de pagina!</p>}

        </AuthContext.Provider>
    );
}

export default AuthContextProvider;




