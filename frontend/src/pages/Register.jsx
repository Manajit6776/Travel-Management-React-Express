import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(name, email, password);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md space-y-3 text-center">
        <Link to="/" className="inline-flex items-center space-x-2 text-2xl font-extrabold tracking-tight text-zinc-900">
          <span className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/10">
            <i className="fa-solid fa-compass"></i>
          </span>
          <span>Voyage Vista</span>
        </Link>
        <h2 className="text-3xl font-extrabold text-zinc-950">Create Account</h2>
        <p className="text-zinc-500 text-sm">
          Join thousands of travelers planning their journeys with Voyage Vista.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 border border-zinc-200/80 shadow-sm sm:rounded-2xl sm:px-10 space-y-6">
          
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-start space-x-2 relative">
              <span className="mt-0.5"><i className="fa-solid fa-circle-exclamation"></i></span>
              <span className="flex-1">{error}</span>
              <button onClick={() => setError('')} className="text-red-500 hover:text-red-700 text-sm font-bold ml-2">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-400">
                  <i className="fa-solid fa-user text-xs"></i>
                </span>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-zinc-200 rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 bg-zinc-50/50"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-400">
                  <i className="fa-solid fa-envelope text-xs"></i>
                </span>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-zinc-200 rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 bg-zinc-50/50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-400">
                  <i className="fa-solid fa-lock text-xs"></i>
                </span>
                <input
                  type="password"
                  required
                  placeholder="Minimum 6 characters"
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-zinc-200 rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 bg-zinc-50/50"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <p className="text-[10px] text-zinc-400 font-medium">Must be at least 6 characters long.</p>
            </div>

            <div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-4 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all duration-300 shadow-sm"
              >
                Create Account<i className="fa-solid fa-user-plus ml-2 text-xs"></i>
              </button>
            </div>
          </form>

          <div className="relative flex items-center justify-center pt-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-100"></div>
            </div>
            <span className="relative bg-white px-4 text-xs text-zinc-400 font-medium">Already have an account?</span>
          </div>

          <div>
            <Link
              to="/login"
              className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-bold text-zinc-700 bg-zinc-50 border border-zinc-200 rounded-xl hover:bg-zinc-100 transition-colors"
            >
              Sign In Instead
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;
