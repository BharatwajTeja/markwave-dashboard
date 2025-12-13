import { Link, Outlet, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data if you stored during login
    localStorage.removeItem("authUser");
    sessionStorage.clear();

    navigate("/login");  // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 to-orange-500 p-6">

      {/* Title */}
      <h1 className="text-5xl font-extrabold mb-8 text-cyan-900 drop-shadow-md tracking-wide">
        Mark Wave Dashboard
      </h1>

      {/* Navigation Bar */}
      <nav className="flex justify-between items-center bg-white shadow-xl rounded-4xl p-4 mb-8 border border-gray-200">

      
        <div className="flex gap-8">
          <Link
            to="referral"
            className="text-lg font-semibold text-cyan-700 hover:text-cyan-900 hover:scale-110 transition-all duration-300 hover:rounded-4xl hover:bg-fuchsia-200 hover:p-2"
          >
            Referral
          </Link>

          <Link
            to="verified"
            className="text-lg font-semibold text-cyan-700 hover:text-cyan-900 hover:scale-110 transition-all duration-300 hover:rounded-4xl hover:bg-fuchsia-200 hover:p-2"
          >
            Verified Users
          </Link>

          <Link
            to="tree"
            className="text-lg font-semibold text-cyan-700 hover:text-cyan-900 hover:scale-110 transition-all duration-300 hover:rounded-4xl hover:bg-fuchsia-200 hover:p-2"
          >
            Buffalo Tree
          </Link>

          <Link
            to="product"
            className="text-lg font-semibold text-cyan-700 hover:text-cyan-900 hover:scale-110 transition-all duration-300 hover:rounded-4xl hover:bg-fuchsia-200 hover:p-2"
          >
            Products
          </Link>
        </div>

        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-5 py-2 rounded-2xl font-semibold
                     shadow-lg hover:bg-red-700 hover:scale-105 transition-all duration-300 "
        >
          Logout
        </button>
      </nav>

      {/* Content Box  display the data what we give in the respectively components*/}
      <div className="bg-white shadow-2xl p-8 rounded-2xl border border-gray-300 animate-fadeIn">
        <Outlet />
      </div>

    </div>
  );
}

export default Dashboard;
