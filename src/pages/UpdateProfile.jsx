import { useEffect } from "react";
import { useState } from "react";
import { Fragment } from "react";
import AdminNav from "../components/AdminNav";
import Alert from "../components/Alert";
import useAuth from "../hooks/useAuth";

const UpdateProfile = () => {
    const {auth, updateProfile} = useAuth();
    const [profile, setProfile] = useState({});
    const [alert, setAlert] = useState({});

    useEffect(() => {
        setProfile(auth);
    }, [auth]);

    const handleSubmit = async event => {
        event.preventDefault();
        
        const {name, email} = profile;
        if ([name, email].includes('')) {
            setAlert({
                message: "Name and email fields are obligatory",
                error: true
            });
            return;
        }

        const result = await updateProfile(profile);
        setAlert(result);
    }

    const {message} = alert;

    return (
        <Fragment>
            <AdminNav />

            <h2 className="font-black text-3xl text-center mt-10">Update Profile</h2>
            <p className="text-xl mt-5 mb-10 text-center">
                Update your <span className="text-indigo-600 font-bold">Information here</span>
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
                            <label htmlFor="name" className="uppercase font-bold text-gray-600">Name</label>
                            <input 
                                type="text" 
                                id="name"
                                name="name"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                placeholder="Your name"
                                value={profile.name || ''}
                                onChange={event => setProfile({
                                    ...profile,
                                    [event.target.name]: event.target.value
                                })}
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="email" className="uppercase font-bold text-gray-600">Email</label>
                            <input 
                                type="email" 
                                id="email"
                                name="email"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                placeholder="Your email"
                                value={profile.email || ''}
                                onChange={event => setProfile({
                                    ...profile,
                                    [event.target.name]: event.target.value
                                })}
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="phone" className="uppercase font-bold text-gray-600">Phone Number</label>
                            <input 
                                type="number" 
                                id="phone"
                                name="phone"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                placeholder="Your phone number"
                                value={profile.phone || ''}
                                onChange={event => setProfile({
                                    ...profile,
                                    [event.target.name]: event.target.value
                                })}
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="web" className="uppercase font-bold text-gray-600">Website</label>
                            <input 
                                type="text" 
                                id="web"
                                name="web"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                placeholder="Your website"
                                value={profile.web || ''}
                                onChange={event => setProfile({
                                    ...profile,
                                    [event.target.name]: event.target.value
                                })}
                            />
                        </div>

                        <input 
                            type="submit" 
                            value="Save Changes" 
                            className="bg-indigo-700 px-10 py-3 mt-5 w-full rounded-lg text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-800"
                        />
                    </form>
                </div>
            </div>
        </Fragment>
    );
}

export default UpdateProfile;