import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";


export default function Header() {
  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-20">
        <div className="flex items-center">
          <div className="bg-blue-600 p-2 rounded-lg mr-3">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <div>
            <span className="text-2xl font-bold text-gray-900">Second Chance Foundation</span>
            <p className="text-sm text-gray-600">Empowering Young Women</p>
          </div>
        </div>
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1">
            Home
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">
            About
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium">
            Contact
          </Link>
          <Link to="/donate">
            <Button className="bg-blue-600 hover:bg-blue-700 px-6 py-2">Donate Now</Button>
          </Link>
        </div>
      </div>
    </div>
  </nav>
  )
}
