import { Link, NavLink, useNavigate } from "react-router-dom";

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
      <Link to={isLoggedIn ? "/" : "/login"} className="text-xl font-bold">
        Rent Your Ride
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
      ) : (
        <div className="flex gap-3 text-sm">
          <NavLink to="/login" className="hover:text-gray-300">Login</NavLink>
          <NavLink to="/signup" className="hover:text-gray-300">Signup</NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
