import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-blue-600 text-white flex justify-between items-center px-6 py-4 shadow-md">
    <h1 className="text-xl font-bold">My Hobbies App</h1>
    <div className="flex space-x-6 text-lg">
      <Link to="/" className="hover:text-gray-200">Home</Link>
      <Link to="/hobbies" className="hover:text-gray-200">Hobbies</Link>
      <Link to="/about" className="hover:text-gray-200">About</Link>
    </div>
  </nav>
);

export default Navbar;
