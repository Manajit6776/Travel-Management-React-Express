import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const USD_TO_INR = 84;

const Book = () => {
  const { id } = useParams();
  const [packageData, setPackageData] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [comments, setComments] = useState('');
  const [message, setMessage] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.is_admin) {
      alert('Admins are not allowed to book tours.');
      navigate('/');
      return;
    }
    if (!user) {
      navigate('/login');
      return;
    }
    fetchPackage();
  }, [id, user, navigate]);

  const fetchPackage = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/packages/${id}`);
      setPackageData(response.data);
    } catch (error) {
      console.error('Error fetching package:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/bookings',
        {
          package_id: id,
          booking_date: bookingDate,
          comments
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setMessage(`Your booking for "${packageData.package_name}" has been submitted successfully! An administrator will review it and coordinate shortly.`);
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.message || 'Booking failed'));
    }
  };

  if (!packageData) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 w-full flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-emerald-200 border-t-emerald-600 animate-spin"></div>
        <p className="mt-4 text-sm text-zinc-500 font-medium">Loading details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="bg-white border border-zinc-200/80 shadow-sm rounded-3xl p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="border-b border-zinc-100 pb-4 space-y-2">
          <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-950">Book Your Trip</h1>
          <p className="text-zinc-500 text-sm">
            Configure your tour dates and details for <span className="font-semibold text-emerald-600">"{packageData.package_name}"</span>.
          </p>
        </div>

        {message ? (
          <div className="space-y-6 text-center py-8">
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 mb-2">
              <i className="fa-solid fa-circle-check text-3xl"></i>
            </span>
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-xl max-w-lg mx-auto leading-relaxed">
              {message}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/my-bookings" className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-sm transition-all duration-300">
                View My Bookings
              </Link>
              <Link to="/packages" className="w-full sm:w-auto px-6 py-2.5 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 font-semibold text-sm border border-zinc-200 rounded-xl transition-colors">
                Explore More Tours
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Package preview card */}
            <div className="flex items-center space-x-4 p-4 bg-zinc-50 rounded-2xl border border-zinc-200/40">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-200 shrink-0">
                <img
                  className="w-full h-full object-cover"
                  src={packageData.image ? `http://localhost:5000/uploads/${packageData.image}` : '/placeholder.jpg'}
                  alt={packageData.package_name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80";
                  }}
                />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-zinc-900 text-sm line-clamp-1">{packageData.package_name}</h4>
                <p className="text-zinc-500 text-xs mt-0.5"><i className="fa-solid fa-location-dot mr-1"></i>{packageData.location}</p>
                <p className="text-emerald-700 font-extrabold text-xs mt-1">₹{(packageData.price * USD_TO_INR).toLocaleString('en-IN')}</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider">
                Booking Date
              </label>
              <input
                className="w-full px-3.5 py-2.5 text-sm border border-zinc-200 rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 bg-zinc-50/50"
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                required
                min={new Date().toISOString().split('T')[0]}
              />
              <p className="text-[10px] text-zinc-400 font-medium">Select the date you wish to start the tour.</p>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider">
                Comments / Special Requests
              </label>
              <textarea
                className="w-full px-3.5 py-2.5 text-sm border border-zinc-200 rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 bg-zinc-50/50"
                placeholder="List dietary requirements, flight arrival details, room setup preferences, or general questions..."
                rows="4"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              ></textarea>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button 
                className="w-full sm:flex-1 inline-flex items-center justify-center px-4 py-3.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all duration-300 shadow-sm"
                type="submit"
              >
                Submit Booking Request<i className="fa-solid fa-circle-arrow-right ml-2 text-xs"></i>
              </button>
              <Link 
                to={`/package/${id}`} 
                className="w-full sm:w-auto px-6 py-3.5 text-center text-sm font-semibold text-zinc-600 hover:text-zinc-950 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-xl transition-colors"
              >
                Cancel
              </Link>
            </div>

          </form>
        )}
      </div>
    </div>
  );
};

export default Book;
