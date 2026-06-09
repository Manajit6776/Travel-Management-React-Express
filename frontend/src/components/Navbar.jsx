import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path) => {
    return location.pathname === path
      ? "text-emerald-600 font-semibold"
      : "text-zinc-600 hover:text-emerald-600 hover:bg-emerald-50/50 md:hover:bg-transparent";
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2 text-xl font-extrabold tracking-tight text-zinc-900 group">
              {/* <span className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
                <i className="fa-solid fa-compass text-lg"></i>
              </span> */}
              <span className="bg-gradient-to-r from-zinc-900 to-zinc-700 bg-clip-text text-transparent">Voyage Vista</span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link className={`text-sm font-medium transition-colors ${isActive('/')}`} to="/">Home</Link>
            <Link className={`text-sm font-medium transition-colors ${isActive('/packages')}`} to="/packages">Packages</Link>
            <Link className={`text-sm font-medium transition-colors ${isActive('/about')}`} to="/about">About</Link>
            <Link className={`text-sm font-medium transition-colors ${isActive('/contact')}`} to="/contact">Contact</Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                {user.is_admin && (
                  <Link 
                    className={`text-sm font-medium px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors ${isActive('/admin/dashboard')}`} 
                    to="/admin/dashboard"
                  >
                    <i className="fa-solid fa-user-shield mr-1.5"></i>Admin Panel
                  </Link>
                )}
                <Link className={`text-sm font-medium transition-colors ${isActive('/my-bookings')}`} to="/my-bookings">
                  My Bookings
                </Link>
                <div className="h-4 w-px bg-zinc-200"></div>
                <div className="flex items-center space-x-3">
                  <div className="flex flex-col text-right">
                    <span className="text-xs font-semibold text-zinc-700">{user.name}</span>
                    <span className="text-[10px] text-zinc-400 font-medium">Logged In</span>
                  </div>
                  <button 
                    onClick={logout}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-zinc-900 transition-colors"
                    title="Logout"
                  >
                    <i className="fa-solid fa-right-from-bracket text-sm"></i>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  className="text-sm font-medium text-zinc-600 hover:text-zinc-950 px-3 py-2 transition-colors" 
                  to="/login"
                >
                  Sign In
                </Link>
                <Link 
                  className="text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-xl shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300" 
                  to="/register"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger menu button */}
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-xl text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 focus:outline-none transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <i className="fa-solid fa-xmark text-xl"></i>
              ) : (
                <i className="fa-solid fa-bars text-xl"></i>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen border-b border-zinc-200' : 'max-h-0'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
          <Link 
            onClick={() => setIsOpen(false)}
            className={`block px-3 py-2 rounded-xl text-base font-medium transition-colors ${isActive('/')}`} 
            to="/"
          >
            Home
          </Link>
          <Link 
            onClick={() => setIsOpen(false)}
            className={`block px-3 py-2 rounded-xl text-base font-medium transition-colors ${isActive('/packages')}`} 
            to="/packages"
          >
            Packages
          </Link>
          <Link 
            onClick={() => setIsOpen(false)}
            className={`block px-3 py-2 rounded-xl text-base font-medium transition-colors ${isActive('/about')}`} 
            to="/about"
          >
            About
          </Link>
          <Link 
            onClick={() => setIsOpen(false)}
            className={`block px-3 py-2 rounded-xl text-base font-medium transition-colors ${isActive('/contact')}`} 
            to="/contact"
          >
            Contact
          </Link>

          {user && user.is_admin && (
            <Link 
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-xl text-base font-medium bg-amber-50 text-amber-700 border border-amber-100 ${isActive('/admin/dashboard')}`} 
              to="/admin/dashboard"
            >
              <i className="fa-solid fa-user-shield mr-2"></i>Admin Panel
            </Link>
          )}

          {user && (
            <Link 
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-xl text-base font-medium transition-colors ${isActive('/my-bookings')}`} 
              to="/my-bookings"
            >
              My Bookings
            </Link>
          )}

          <div className="pt-4 pb-2 border-t border-zinc-100">
            {user ? (
              <div className="px-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-zinc-800">{user.name}</div>
                    <div className="text-xs text-zinc-400">{user.email}</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="px-3 flex flex-col space-y-2">
                <Link 
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-4 py-2 text-sm font-semibold text-zinc-700 bg-zinc-50 border border-zinc-200 rounded-xl hover:bg-zinc-100 transition-colors" 
                  to="/login"
                >
                  Sign In
                </Link>
                <Link 
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-4 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-all duration-300" 
                  to="/register"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
