import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const linkClass = (path) =>
    `px-4 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-600 hover:bg-blue-100"
    }`;

  return (
    <nav className="flex justify-center gap-6 py-4 bg-white shadow-sm sticky top-0 z-10">
      <Link to="/" className={linkClass("/")}>Home</Link>
      <Link to="/crypto" className={linkClass("/crypto")}>Crypto</Link>
      <Link to="/stocks" className={linkClass("/stocks")}>Stocks</Link>
    </nav>
  );
}

export default Navbar;