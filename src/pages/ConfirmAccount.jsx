import clientAxios from "../config/axios";
import { Fragment, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Alert from "../components/Alert";

const ConfirmAccount = () => {
    const [confirmedAccount, setConfirmedAccount] = useState(false);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({});

    // Get URL parameters
    const params = useParams();
    const {token} = params;
    
    useEffect(() => {
        const confirmAccount = async () => {
            try {
                const url = `veterinarians/confirm/${token}`;
                const{data} = await clientAxios.get(url);

                setConfirmedAccount(true);
                setAlert({
                    message: data.msg,
                    error: false
                });
            } catch (error) {
                setAlert({
                    message: error.response.data.msg,
                    error: true
                });
            }

            setLoading(false);
        };

        confirmAccount();
    }, []);

    return ( 
        <Fragment>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Confirm Your Account And Start Managing <span className="text-black">Your Patients</span>
                </h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                { !loading && 
                    <Alert
                        alert={alert}
                    />
                }
                { confirmedAccount &&
                    <Link 
                        to="/" 
                        className="block text-center my-5 text-gray-500 hover:text-indigo-700"
                    >
                        Log in
                    </Link>
                }
            </div>
        </Fragment>
    );
}
 
export default ConfirmAccount;