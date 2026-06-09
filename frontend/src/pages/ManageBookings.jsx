import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.is_admin) {
      navigate('/login');
      return;
    }
    fetchBookings();
  }, [user, navigate]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bookings', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/bookings/${bookingId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      fetchBookings();
    } catch (error) {
      console.error('Error updating booking status:', error);
      alert('Failed to update booking status');
    }
  };

  if (!user || !user.is_admin) {
    return null;
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/50">
            <i className="fa-solid fa-circle-check mr-1.5 text-[8px]"></i>{status}
          </span>
        );
      case 'Rejected':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200/50">
            <i className="fa-solid fa-circle-xmark mr-1.5 text-[8px]"></i>{status}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/50">
            <i className="fa-solid fa-circle-notch mr-1.5 text-[8px] animate-spin"></i>{status}
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-1 bg-white border border-zinc-200/80 p-6 rounded-2xl h-fit space-y-4 shadow-sm">
          <div className="pb-3 border-b border-zinc-100">
            <h3 className="font-bold text-zinc-400 text-[10px] uppercase tracking-wider">General Menu</h3>
          </div>
          <nav className="flex flex-col space-y-1.5">
            <Link 
              className="flex items-center space-x-2.5 px-3 py-2 text-sm font-medium rounded-xl text-zinc-600 hover:text-emerald-600 hover:bg-zinc-50/50 transition-colors" 
              to="/admin/dashboard"
            >
              <i className="fa-solid fa-chart-pie text-sm"></i>
              <span>Dashboard Overview</span>
            </Link>
            <Link 
              className="flex items-center space-x-2.5 px-3 py-2 text-sm font-medium rounded-xl text-zinc-600 hover:text-emerald-600 hover:bg-zinc-50/50 transition-colors" 
              to="/admin/packages"
            >
              <i className="fa-solid fa-map text-sm"></i>
              <span>Manage Packages</span>
            </Link>
            <Link 
              className="flex items-center space-x-2.5 px-3 py-2 text-sm font-semibold rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100" 
              to="/admin/bookings"
            >
              <i className="fa-solid fa-calendar-check text-sm"></i>
              <span>Manage Bookings</span>
            </Link>
          </nav>
        </aside>

        {/* Bookings Table Panel */}
        <main className="lg:col-span-3 space-y-6">
          <div className="border-b border-zinc-200 pb-4">
            <h1 className="text-2xl font-extrabold text-zinc-950">Manage Booking Requests</h1>
            <p className="text-zinc-500 text-sm">Review traveler bookings, change approval status, and message clients.</p>
          </div>

          <div className="bg-white border border-zinc-200/80 rounded-2xl shadow-sm overflow-x-auto">
            <table className="w-full text-left border-collapse text-zinc-600 text-sm">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200/60 font-semibold text-zinc-800 uppercase tracking-wider text-[10px]">
                  <th className="px-4 py-4 pl-6">ID</th>
                  <th className="px-4 py-4">User Details</th>
                  <th className="px-4 py-4">Destination Package</th>
                  <th className="px-4 py-4">Tour Date</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-150/60 font-light">
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-zinc-400 text-sm">
                      <span className="block text-2xl mb-1"><i className="fa-solid fa-calendar-xmark"></i></span>
                      No booking requests found in system database.
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-zinc-50/40 transition-colors">
                      <td className="px-4 py-4 pl-6 font-bold text-zinc-900">#{booking.id}</td>
                      <td className="px-4 py-4">
                        <div>
                          <div className="font-semibold text-zinc-900">{booking.user_name}</div>
                          <div className="text-xs text-zinc-400 mt-0.5">{booking.user_email}</div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-bold text-zinc-900 line-clamp-1">{booking.package_name}</div>
                        {booking.comments && (
                          <div className="text-xs text-zinc-400 mt-0.5 line-clamp-1 italic" title={booking.comments}>
                            "{booking.comments}"
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4 font-normal text-zinc-700">
                        {new Date(booking.booking_date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4">
                        {getStatusBadge(booking.status)}
                      </td>
                      <td className="px-4 py-4 pr-6 text-right space-x-2 whitespace-nowrap">
                        <div className="inline-block relative">
                          <select
                            value={booking.status}
                            onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                            className="pl-3 pr-8 py-1.5 text-xs font-semibold border border-zinc-200 rounded-lg focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 bg-zinc-50 hover:bg-zinc-100 transition-colors appearance-none cursor-pointer"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                          <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-zinc-400 text-[10px]">
                            <i className="fa-solid fa-chevron-down"></i>
                          </span>
                        </div>
                        <Link
                          to={`/conversation/${booking.id}`}
                          className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/50 rounded-lg transition-colors"
                        >
                          <i className="fa-solid fa-comments mr-1.5"></i>Chat
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManageBookings;
