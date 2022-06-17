import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import clientAxios from "../config/axios";
import Alert from "../components/Alert";

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [alert, setAlert] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Validations
        if ([name, email, password, passwordConfirmation].includes('')) {
            setAlert({
                message: "There are empty fields", 
                error: true
            });
            return;
        }

        if (password !== passwordConfirmation) {
            setAlert({
                message: "Passwords don't match", 
                error: true
            });
            return;
        }

        if (password.length < 6) {
            setAlert({
                message: "Your password has to be at least 6 characters long", 
                error: true
            });
            return;
        }

        // If no errors, set the alert to an empty object
        setAlert({});

        // Create user
        try {
            await clientAxios.post('/veterinarians', {name, email, password});
            setAlert({
                message: "Registered successfully. Check your email inbox to confirm your account.",
                error: false
            });
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
                    Create An Account And Manage <span className="text-black">Your Patients</span>
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
                        <label htmlFor="name" className="uppercase text-gray-600 block text-xl font-bold">Name</label>
                        <input 
                            type="text" 
                            id="name"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                            placeholder="Your name" 
                            value={name}
                            onChange={event => setName(event.target.value)}
                        />
                    </div>
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
                        <label htmlFor="password2" className="uppercase text-gray-600 block text-xl font-bold">Confirm Password</label>
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
                        value="Register" 
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
 
export default Register;