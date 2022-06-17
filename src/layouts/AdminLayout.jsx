import { Fragment } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";

const AdminLayout = () => {
    const {auth, loading} = useAuth();
    console.log(auth);

    if (loading) {
        return;
    }

    return ( 
        <Fragment>
            <Header />
                {auth?._id ? (
                    <main className="container mx-auto mt-10">
                        <Outlet />
                    </main> ) : <Navigate to='/' />
                }
            <Footer />
        </Fragment>
        
    );
}
 
export default AdminLayout;