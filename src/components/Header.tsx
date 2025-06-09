import { Heart, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1" : "text-gray-700 hover:text-blue-600 font-medium"
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/about"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1" : "text-gray-700 hover:text-blue-600 font-medium"
              }
            >
              About
            </NavLink>
            <NavLink 
              to="/contact"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1" : "text-gray-700 hover:text-blue-600 font-medium"
              }
            >
              Contact
            </NavLink>
            <Button disabled className="bg-blue-600 hover:bg-blue-700 px-6 py-2">Donate Now</Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </NavLink>
              <div className="px-3 py-2">
                <Button disabled className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-2">Donate Now</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
