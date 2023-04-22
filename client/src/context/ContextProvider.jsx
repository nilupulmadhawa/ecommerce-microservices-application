import { createContext, useContext, useState, useEffect } from "react";
import Loading from 'react-fullscreen-loading';

const StateContext = createContext({
    currentUser: null,
    token: null,
    notification: null,
    setUser: () => { },
    setToken: () => { },
    setNotification: () => { }
})

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [notification, _setNotification] = useState('');
    const [loading, setLoading] = useState(false);
    const setToken = (token) => {
        _setToken(token)
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    const setNotification = message => {
        _setNotification(message);

        setTimeout(() => {
            _setNotification('')
        }, 5000)
    }
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    return (
        <StateContext.Provider value={{
            user,
            setUser,
            token,
            setToken,
            notification,
            setNotification,
            setLoading,
            loading
        }}>

            <Loading loading={loading} background="#ffffffb8" loaderColor="#45b0c9" />
            {children}
        </StateContext.Provider>
    );
}

export const useStateContext = () => useContext(StateContext);
