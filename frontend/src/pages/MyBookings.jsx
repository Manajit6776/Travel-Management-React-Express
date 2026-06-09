import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bookings/my-bookings', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-50 text-red-600">
          <i className="fa-solid fa-circle-exclamation text-2xl"></i>
        </span>
        <h3 className="text-lg font-bold text-zinc-950">Access Denied</h3>
        <p className="text-zinc-500 text-sm">Please sign in to your traveler account to view your bookings.</p>
        <Link to="/login" className="inline-flex px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl">
          Sign In
        </Link>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/50">
            <i className="fa-solid fa-circle-check mr-1.5 text-[8px]"></i>{status}
          </span>
        );
      case 'Rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200/50">
            <i className="fa-solid fa-circle-xmark mr-1.5 text-[8px]"></i>{status}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/50">
            <i className="fa-solid fa-circle-notch mr-1.5 text-[8px] animate-spin"></i>{status}
          </span>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-8">
      {/* Header */}
      <div className="border-b border-zinc-200 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950">My Bookings</h1>
          <p className="text-zinc-500 text-sm mt-0.5">Track your travel requests, approvals, and message details.</p>
        </div>
        <Link to="/packages" className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-sm transition-all duration-300 w-fit">
          Book New Tour
        </Link>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-16 text-center space-y-4 shadow-sm">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-zinc-50 text-zinc-400">
            <i className="fa-solid fa-suitcase text-2xl"></i>
          </span>
          <h3 className="text-lg font-bold text-zinc-950">No Bookings Yet</h3>
          <p className="text-zinc-500 text-sm max-w-sm mx-auto">
            You don't have any booked tours in your history. Click the button above to browse destinations!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div 
              key={booking.id} 
              className="bg-white border border-zinc-200/80 rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row items-stretch hover:shadow-md transition-shadow"
            >
              {/* Thumbnail image */}
              <div className="w-full md:w-56 h-40 md:h-auto bg-zinc-100 relative shrink-0">
                <img
                  className="w-full h-full object-cover"
                  src={booking.image ? `http://localhost:5000/uploads/${booking.image}` : '/placeholder.jpg'}
                  alt={booking.package_name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80";
                  }}
                />
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-bold text-zinc-900 leading-tight">
                      {booking.package_name}
                    </h3>
                    {getStatusBadge(booking.status)}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-zinc-500 font-light">
                    <p>
                      <strong className="font-semibold text-zinc-700">Booking Date:</strong>{' '}
                      {new Date(booking.booking_date).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <p>
                      <strong className="font-semibold text-zinc-700">Amount Charged:</strong>{' '}
                      USD {booking.price}
                    </p>
                  </div>

                  {booking.comments && (
                    <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100 text-xs text-zinc-600 italic">
                      <strong className="font-semibold text-zinc-700 not-italic block mb-0.5">Your Request:</strong>
                      "{booking.comments}"
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                  <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">Booking ID: #{booking.id}</span>
                  <Link 
                    className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/50 rounded-xl transition-colors" 
                    to={`/conversation/${booking.id}`}
                  >
                    <i className="fa-solid fa-comments mr-1.5"></i>Chat with Admin
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
