import { useState } from "react";
import AdminNav from "../components/AdminNav";
import Alert from "../components/Alert";
import useAuth from "../hooks/useAuth";

const ChangePassword = () => {
    const {updatePassword} = useAuth();
    const [alert, setAlert] = useState({});
    const [password, setPassword] = useState({
        password: '',
        new_password: '',
        new_password_confirmation: ''
    });

    const handleSubmit = async event => {
        event.preventDefault();
        
        // Validations
        if (Object.values(password).some(field => field === '')) {
            setAlert({
                message: "All fields are obligatory",
                error: true
            });
            return;
        }

        if (password.new_password !== password.new_password_confirmation) {
            setAlert({
                message: "New passwords don't match", 
                error: true
            });
            return;
        }

        if (password.new_password.length < 6) {
            setAlert({
                message: "Your new password has to be at least 6 characters long", 
                error: true
            });
            return;
        }

        const result = await updatePassword(password);
        setAlert(result);
    };

    const {message} = alert;

    return (
        <>
            <AdminNav />

            <h2 className="font-black text-3xl text-center mt-10">Change Password</h2>
            <p className="text-xl mt-5 mb-10 text-center">
                Modify your <span className="text-indigo-600 font-bold">Access here</span>
            </p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                    { message && 
                        <Alert
                            alert={alert}
                        />
                    }
                    <form onSubmit={handleSubmit}>
                        <div className="my-3">
                            <label htmlFor="password" className="uppercase font-bold text-gray-600">Current Password</label>
                            <input 
                                type="password" 
                                id="password"
                                name="password"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                placeholder="Your current password"
                                onChange={event => setPassword({
                                    ...password,
                                    [event.target.name]: event.target.value
                                })}
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="new_password" className="uppercase font-bold text-gray-600">New Password</label>
                            <input 
                                type="password" 
                                id="new_password"
                                name="new_password"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                placeholder="Your new password"
                                onChange={event => setPassword({
                                    ...password,
                                    [event.target.name]: event.target.value
                                })}
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="new_password_confirmation" className="uppercase font-bold text-gray-600">Confirm Your Password</label>
                            <input 
                                type="password" 
                                id="new_password_confirmation"
                                name="new_password_confirmation"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                placeholder="Repeat your new password"
                                onChange={event => setPassword({
                                    ...password,
                                    [event.target.name]: event.target.value
                                })}
                            />
                        </div>

                        <input 
                            type="submit" 
                            value="Update Password" 
                            className="bg-indigo-700 px-10 py-3 mt-5 w-full rounded-lg text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-800"
                        />
                    </form>
                </div>
            </div>
        </>
    );
}

export default ChangePassword;