import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import clientAxios from "../config/axios";
import Alert from "../components/Alert";

const Login = () => {
    const {setAuth} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({});

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Validations
        if ([email, password].includes('')) {
            setAlert({
                message: "There are empty fields", 
                error: true
            });
            return;
        }

        // If no errors, set the alert to an empty object
        setAlert({});

        // Login
        try {
            const {data} = await clientAxios.post('/veterinarians/login', {email, password});
            localStorage.setItem('JWT', data.token);
            setAuth(data);
            
            navigate('/admin');
        } catch (error) {
            setAlert({
                message: error.response.data.msg,
                error: true
            });
        }
    }

    const {message} = alert;

    return ( 
        <Fragment>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Log In And Manage <span className="text-black">Your Patients</span>
                </h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                { message && 
                    <Alert 
                        alert={alert}
                    />
                }
                <form action="" onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                        <input 
                            type="email" 
                            id="email"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                            placeholder="Your email" 
                            value={email}
                            onChange={event => (setEmail(event.target.value))}
                        />
                    </div>
                    <div className="my-5">
                        <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Password</label>
                        <input 
                            type="password" 
                            id="password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                            placeholder="Your password" 
                            value={password}
                            onChange={event => (setPassword(event.target.value))}
                        />
                    </div>

                    <input 
                        type="submit" 
                        value="Log in" 
                        className="bg-indigo-700 w-full md:w-auto px-10 py-3 mt-5 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-800"
                    />
                </form>

                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link 
                        to="/register" 
                        className="block text-center my-5 text-gray-500 hover:text-indigo-700"
                    >
                        Don't have an account? Create one
                    </Link>
                    <Link 
                        to="/forgot" 
                        className="block text-center my-5 text-gray-500 hover:text-indigo-700"
                    >
                        Forgot your password?
                    </Link>
                </nav>
            </div>
        </Fragment>
    );
}
 
export default Login;