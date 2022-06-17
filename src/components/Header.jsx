import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {
    const {logout} = useAuth();

    return (
        <header className="py-10 bg-indigo-600">
            <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
                <h1 className="font-bold text-2xl text-indigo-200 text-center">
                    <span className="text-white font-black">Veterinary</span> Patients Manager
                </h1>

                <nav className="flex flex-col items-center lg:flex-row gap-4 mt-5 lg:mt-0">
                    <Link to="/admin" className="text-white uppercase font-bold hover:text-yellow-300">Patients</Link> 
                    <Link to="/admin/profile" className="text-white uppercase font-bold hover:text-yellow-300">Profile</Link> 
                    <button 
                        type="button" 
                        className="text-white uppercase font-bold hover:text-yellow-300"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </nav>
            </div>
        </header>
    );
}

export default Header