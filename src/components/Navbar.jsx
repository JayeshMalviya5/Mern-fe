import { Link, NavLink, useNavigate } from "react-router-dom";
import { Car } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center h-[72px]">
      <Link to={isLoggedIn ? "/" : "/login"} className="flex items-center gap-2 group">
        <div className="bg-cyan-500/20 p-2 rounded-lg group-hover:bg-cyan-500/30 transition-colors">
          <Car className="w-6 h-6 text-cyan-400" />
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          RentYourRide
        </span>
      </Link>

      {isLoggedIn ? (
        <div className="flex items-center gap-5">
          <div className="hidden md:flex gap-4 text-sm text-gray-200">
            <NavLink to="/bikes" className="hover:text-white">Bikes</NavLink>
            <NavLink to="/cars" className="hover:text-white">Cars</NavLink>
            <NavLink to="/e-rickshaw" className="hover:text-white">E-Rickshaw</NavLink>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-700 hover:bg-red-600 px-4 py-2 rounded font-semibold transition"
          >
            Logout
          </button>
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
