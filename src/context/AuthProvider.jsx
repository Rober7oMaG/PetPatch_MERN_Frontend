import { createContext, useEffect, useState } from "react";
import clientAxios from "../config/axios";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const authenticateUser = async () => {
            const token = localStorage.getItem('JWT');
            if (!token) {
                setLoading(false);
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const {data} = await clientAxios('/veterinarians/profile', config);
                setAuth(data);
            } catch (error) {
                setAuth({});
            }

            setLoading(false);
        }

        authenticateUser();
    }, []);

    const logout = () => {
        localStorage.removeItem('JWT');
        setAuth({});
    }

    const updateProfile = async profile => {
        const token = localStorage.getItem('JWT');
        if (!token) {
            setLoading(false);
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarians/profile/${profile._id}`;
            await clientAxios.put(url, profile, config);

            return {
                message: "Updated Successfully"
            };
        } catch (error) {
            return {
                message: error.response.data.msg,
                error: true
            };
        }
    }

    const updatePassword = async (password) => {
        const token = localStorage.getItem('JWT');
        if (!token) {
            setLoading(false);
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = '/veterinarians/change-password';
            const {data} = await clientAxios.put(url, password, config);
            console.log(data);

            return {
                message: data.msg
            };
        } catch (error) {
            return {
                message: error.response.data.msg,
                error: true
            };
        }
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                loading,
                logout,
                updateProfile,
                updatePassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext;