import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer () {
  return (
      <footer className="bg-gray-900 text-white py-8 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 sm:col-span-2">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="bg-blue-500 p-2 rounded-lg mr-3">
                  <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-bold">Second Chance Foundation</span>
                  <p className="text-sm sm:text-base text-gray-400">Empowering Young Women</p>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 leading-relaxed">
                Dedicated to empowering young girls through education, skills training, and opportunities to build a
                better future for themselves and their families.
              </p>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Quick Links</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <Link to="/" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/donate" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">
                    Donate
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Contact Info</h3>
              <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-400">
                <p>info@secondchancefoundation.org</p>
                <p>+1 (555) 123-4567</p>
                <p>
                  123 Hope Street
                  <br />
                  Community Center Building
                  <br />
                  Your City, State 12345
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-gray-400">
            <p>&copy; 2024 Second Chance Foundation. All rights reserved.</p>
          </div>
        </div>
      </footer>
  )
}
