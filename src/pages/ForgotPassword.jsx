import { useState } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import clientAxios from "../config/axios";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [alert, setAlert] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (email === '') {
            setAlert({message: "Email field is obligatory", error: true});
            return;
        }

        try {
            const {data} = await clientAxios.post('/veterinarians/forgot', {email});
            setAlert({
                message: data.msg,
                error: false
            });
        } catch (error) {
            setAlert({message: error.response.data.msg, error: true});
            return;
        }
    }

    const {message} = alert;

    return ( 
        <Fragment>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Recover Your Access And Don't Lose <span className="text-black">Your Patients</span>
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
                            onChange={event => setEmail(event.target.value.trim())}
                        />
                    </div>

                    <input 
                        type="submit" 
                        value="Send Instructions" 
                        className="bg-indigo-700 w-full md:w-auto px-10 py-3 mt-5 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-800"
                    />
                </form>

                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link 
                        to="/" 
                        className="block text-center my-5 text-gray-500 hover:text-indigo-700"
                    >
                        Already have an account? Log in
                    </Link>
                    <Link 
                        to="/register" 
                        className="block text-center my-5 text-gray-500 hover:text-indigo-700"
                    >
                        Don't have an account? Create one
                    </Link>
                </nav>
            </div>
        </Fragment>
     );
}
 
export default ForgotPassword;