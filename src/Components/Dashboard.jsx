import { Link, Outlet, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 to-orange-500 p-3 sm:p-6">

      {/* Title */}
      <h1 className="text-3xl sm:text-5xl font-extrabold mb-6 sm:mb-8 
                     text-cyan-900 drop-shadow-md tracking-wide text-center sm:text-left">
        Mark Wave Dashboard
      </h1>

      {/* Navigation Bar */}
      <nav className="flex flex-col sm:flex-row sm:justify-between sm:items-center 
                      gap-4 bg-white shadow-xl rounded-3xl p-4 mb-6 border border-gray-200">

        {/* Links */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-8">
          <Link to="referral" className="nav-link text-cyan-700 hover:text-cyan-900 hover:scale-110 transition-all duration-300 hover:rounded-4xl hover:bg-fuchsia-200 hover:p-2">Referral</Link>
          <Link to="verified" className="nav-link text-cyan-700 hover:text-cyan-900 hover:scale-110 transition-all duration-300 hover:rounded-4xl hover:bg-fuchsia-200 hover:p-2">Verified Users</Link>
          <Link to="tree" className="nav-link text-cyan-700 hover:text-cyan-900 hover:scale-110 transition-all duration-300 hover:rounded-4xl hover:bg-fuchsia-200 hover:p-2">Buffalo Tree</Link>
          <Link to="product" className="nav-link  text-cyan-700 hover:text-cyan-900 hover:scale-110 transition-all duration-300 hover:rounded-4xl hover:bg-fuchsia-200 hover:p-2 ">Products</Link>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-5 py-2 rounded-2xl font-semibold
                     shadow-lg hover:bg-red-700 transition-all duration-300
                     w-full sm:w-auto"
        >
          Logout
        </button>
      </nav>

      {/* Content */}
      <div className="bg-white shadow-2xl p-4 sm:p-8 rounded-2xl border border-gray-300">
        <Outlet />
      </div>

    </div>
  );
}

export default Dashboard;
