import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-zinc-400 mt-auto border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Column */}
          <div className="flex flex-col space-y-4">
            <Link to="/" className="flex items-center space-x-2 text-xl font-extrabold tracking-tight text-white">
              <span>Voyage Vista</span>
            </Link>
            <p className="text-sm text-zinc-400 max-w-sm">
              Your trusted travel partner. Designing bespoke packages, flexible itineraries, and seamless journeys around the globe.
            </p>
          </div>

          {/* Navigation Links Column */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/packages" className="hover:text-emerald-500 transition-colors">Explore Packages</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-emerald-500 transition-colors">Our Story (About)</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-500 transition-colors">Support & Contact</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-emerald-500 transition-colors">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          {/* Socials & Info Column */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-emerald-600 transition-all duration-300">
                <i className="fa-brands fa-facebook-f text-sm"></i>
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-emerald-600 transition-all duration-300">
                <i className="fa-brands fa-twitter text-sm"></i>
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-emerald-600 transition-all duration-300">
                <i className="fa-brands fa-instagram text-sm"></i>
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-emerald-600 transition-all duration-300">
                <i className="fa-brands fa-youtube text-sm"></i>
              </a>
            </div>
            <p className="text-xs text-zinc-500">
              © {new Date().getFullYear()} Voyage Vista. All rights reserved. Made with love for global travelers.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
