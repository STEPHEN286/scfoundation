
import Logo from "@/assets/images/logo.jpg"
import OneSolutionLogo from "@/assets/images/one_solution.png"

export default function Footer () {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
      <footer className="bg-gray-900 text-white py-8 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 sm:col-span-2">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="bg-pink-500  rounded-lg mr-3">
                  <img src={Logo } alt="logo" className="w-15 h-15" />
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-bold">2nd Chance Foundation</span>
                  <p className="text-sm sm:text-base text-gray-400">Empowering Young Women</p>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 leading-relaxed">
                The Second Chance Foundation is a nonprofit organization dedicated to empowering young girls who have dropped out of school due to various circumstances, including teenage pregnancy, financial difficulties, or lack of family support.
              </p>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Quick Links</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <button 
                    onClick={() => scrollToSection('home')}
                    className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('about')}
                    className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Contact
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Donate
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Contact Info</h3>
              <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-400">
                <p>johnsonblessings56@gmail.com</p>
                <p>+233269472383</p>
                <p>+233502187357</p>
                <p>
                  Sierra Leone, Bo
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Second Chance Foundation. All rights reserved.</p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="text-gray-400">Powered by</span>
              <a href="https://onesolution-profile.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:opacity-90">
                <img src={OneSolutionLogo} alt="One Solution Ghana" className="h-10 w-auto" />
              </a>
            </div>
          </div>
        </div>
      </footer>
  )
}
