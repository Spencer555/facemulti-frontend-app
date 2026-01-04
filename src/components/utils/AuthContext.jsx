import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const host = "https://facemulti-backend-app.vercel.app/";

    useEffect(() => {
        const rawUser = localStorage.getItem("user");

        if (rawUser && rawUser !== "undefined") {
            try {
                setUser(JSON.parse(rawUser));
            } catch (err) {
                console.error("Invalid user in localStorage", err);
                localStorage.removeItem("user");
            }
        }

        setLoading(false);
    }, []);

    const login = async (credentials) => {
        setLoading(true);

        try {
            const response = await axios.post(`${host}signin/`, credentials);

            const userData = {
                id: response.data.id,
                username: response.data.username,
                email: response.data.email,
                entries: response.data.entries
            };
            console.log(response)
            localStorage.setItem("access_token", response?.data?.access);
            localStorage.setItem("refresh_token", response?.data?.refresh);


            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));

            setLoading(false);
            return response;
        } catch (err) {

            setLoading(false);
            return err;
        }
    };

    const register = async (credentials) => {
        setLoading(true)

        try {
            const response = await axios.post(`${host}register/`, credentials);
            setLoading(false);
            return response
        }
        catch (err) {
            setLoading(false)
            return err
        }
    }


    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/signin", { replace: true });
    };


const  faceDetection = async (image_url) => {


    const response = await axios.post(`${host}handle_api/`,{image_url}, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
        }
    });

    return response

}


    return (
        <AuthContext.Provider value={{ user, loading, login, logout, register, faceDetection }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
