import { useState, useEffect } from "react";
import { Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import clientAxios from "../config/axios";
import Alert from "../components/Alert";

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [alert, setAlert] = useState({});
    const [validToken, setValidToken] = useState(false);
    const [updatedPassword, setUpdatedPassword] = useState(false);

    // Get URL parameters
    const params = useParams();
    const {token} = params;

    useEffect(() => {
        const verifyToken = async () => {
            try {
                await clientAxios.get(`/veterinarians/forgot/${token}`);
                setAlert({
                    message: "Enter your new password",
                    error: false
                });
                setValidToken(true);
            } catch (error) {
                setAlert({
                    message: "Invalid link.",
                    error: true
                });
            }
        };

        verifyToken();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Validations
        if ([password, passwordConfirmation].includes('')) {
            setAlert({message: "There are empty fields", error: true});
            return;
        }

        if (password !== passwordConfirmation) {
            setAlert({message: "Passwords don't match", error: true});
            return;
        }

        if (password.length < 6) {
            setAlert({message: "Your password has to be at least 6 characters long", error: true});
            return;
        }

        // If no errors, set the alert to an empty object
        setAlert({});

        // Create user
        try {
            const url = `/veterinarians/forgot/${token}`;
            const {data} = await clientAxios.post(url, {password});
            setAlert({
                message: data.msg,
                error: false
            });
            setUpdatedPassword(true);
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
                    Reset Your Password And Don't Lose Access To <span className="text-black">Your Patients</span>
                </h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                { message && 
                    <Alert 
                        alert={alert}
                    />
                }
                {validToken && (
                    <Fragment>
                        <form action="" onSubmit={handleSubmit}>
                            <div className="my-5">
                                <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Password</label>
                                <input 
                                    type="password" 
                                    id="password"
                                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                                    placeholder="Your password" 
                                    value={password}
                                    onChange={event => setPassword(event.target.value)}
                                />
                            </div>
                            <div className="my-5">
                                <label htmlFor="password2" className="uppercase text-gray-600 block text-xl font-bold">
                                    Confirm Password
                                </label>
                                <input 
                                    type="password" 
                                    id="password2"
                                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                                    placeholder="Repeat your password" 
                                    value={passwordConfirmation}
                                    onChange={event => setPasswordConfirmation(event.target.value)}
                                />
                            </div>

                            <input 
                                type="submit" 
                                value="Save new password" 
                                className="bg-indigo-700 w-full md:w-auto px-10 py-3 mt-5 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-800"
                            />
                        </form>

                        {updatedPassword && 
                            <Link 
                                to="/" 
                                className="block text-center my-5 text-gray-500 hover:text-indigo-700"
                            >
                                Log in
                            </Link>
                        }
                    </Fragment>
                )}
            </div>
        </Fragment>
    );
}
 
export default ResetPassword;