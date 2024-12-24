import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext()

export const AuthProvider = ({children}) =>{
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('mentorship-user')) ||null)
    const navigation = useNavigate()

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('mentorship-user')) || null
        setAuthUser(userData)
    }, [])

    useEffect(() => {
        if (authUser) {
            localStorage.setItem('mentorship-user', JSON.stringify(authUser))
        } else {
            localStorage.removeItem('mentorship-user')
        }
    }, [authUser])

    const signin = async (username, password) => {
        try {
            const response = await axios.post('/api/v1/signin', {
                username,
                password
            }, {withCredentials: true,  headers: {
                "Content-Type": "application/json",
              },})
            const userData = {id: response.data.id, token: response.data.token}
            localStorage.setItem('mentorship-user', JSON.stringify(userData))
            setAuthUser(userData)
            alert("Your account has been created");
            navigation("/")
        } catch (error) {
            console.error("Sign up failed", error);
            alert("Failed to create account. Please try again.");
        }
    }

    const signup = async (username, password) => {
        try {
            const response = await axios.post('/api/v1/signup', {
                username,
                password
            }, {withCredentials: true,  headers: {
                "Content-Type": "application/json",
              },})
            const userData = {id: response.data.id, token: response.data.token}
            localStorage.setItem('mentorship-user', JSON.stringify(userData))
            setAuthUser(userData)
            alert("You are logged in");
            navigation("/")
        } catch (error) {
            console.error("Login failed", error);
            alert("Login failed. Please try again.");
        }
    }

    const logout = async() => {
        try {
            const response  = await axios.get('/api/v1/logout', {}, {withCredentials:true})
            localStorage.removeItem('mentorship-user')
            setAuthUser(null)
            alert("your successfully logout!")
            // navigation("/api/v1/signup")
        } catch (error) {
            console.log("logout failed", error)
        }
    }

    return (
        <AuthContext.Provider value={{authUser, signin, signup, logout, setAuthUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)