import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import DonateModal from "./DonateModal";

import Logo from "@/assets/images/logo.jpg"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false); // Close mobile menu after navigation
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <img src={Logo } alt="logo" className="w-15 h-15" />
            <div>
              <span className="text-2xl font-bold text-gray-900 md:block hidden">2nd Chance Movement</span>
              <span className="text-xl font-bold text-gray-900 md:hidden">2nd Chance Movement</span>
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
            <button 
              onClick={() => scrollToSection('home')}
              className="text-gray-700 hover:text-pink-600 font-medium transition-colors duration-200"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-pink-600 font-medium transition-colors duration-200"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-pink-600 font-medium transition-colors duration-200"
            >
              Contact
            </button>
            <Button 
              onClick={() => setIsDonateModalOpen(true)}
              className="bg-pink-600 hover:bg-pink-700 px-6 py-2"
            >
              Donate Now
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button
                onClick={() => scrollToSection('home')}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50 w-full text-left"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50 w-full text-left"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50 w-full text-left"
              >
                Contact
              </button>
              <div className="px-3 py-2">
                <Button 
                  onClick={() => setIsDonateModalOpen(true)}
                  className="w-full bg-pink-600 hover:bg-pink-700 px-6 py-2"
                >
                  Donate Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Donate Modal */}
      <DonateModal 
        isOpen={isDonateModalOpen} 
        onClose={() => setIsDonateModalOpen(false)} 
      />
    </nav>
  );
}
