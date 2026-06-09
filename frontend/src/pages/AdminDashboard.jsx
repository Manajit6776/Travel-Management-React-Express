import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    packagesCount: 0,
    bookingsCount: 0,
    pendingCount: 0
  });

  useEffect(() => {
    if (user && user.is_admin) {
      fetchDashboardStats();
    }
  }, [user]);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('token');
      // Fetch packages
      const pkgRes = await axios.get('http://localhost:5000/api/packages', {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Fetch bookings
      const bookRes = await axios.get('http://localhost:5000/api/bookings', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const pending = bookRes.data.filter(b => b.status === 'Pending').length;

      setStats({
        packagesCount: pkgRes.data.length,
        bookingsCount: bookRes.data.length,
        pendingCount: pending
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  if (!user || !user.is_admin) {
    return <Navigate to="/login" />;
  }

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
              className="flex items-center space-x-2.5 px-3 py-2 text-sm font-semibold rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100" 
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
              className="flex items-center space-x-2.5 px-3 py-2 text-sm font-medium rounded-xl text-zinc-600 hover:text-emerald-600 hover:bg-zinc-50/50 transition-colors" 
              to="/admin/bookings"
            >
              <i className="fa-solid fa-calendar-check text-sm"></i>
              <span>Manage Bookings</span>
            </Link>
          </nav>
        </aside>

        {/* Dashboard Content */}
        <main className="lg:col-span-3 space-y-8">
          {/* Welcome Banner */}
          <div className="p-6 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-3xl shadow-sm space-y-2">
            <h1 className="text-xl sm:text-2xl font-extrabold">Welcome back, {user.name}!</h1>
            <p className="text-emerald-100 text-xs font-light max-w-lg leading-relaxed">
              This is your administrative management dashboard. Review incoming reservations, edit packages, and coordinate support chats with travelers.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white border border-zinc-200/80 p-6 rounded-2xl shadow-sm flex items-center space-x-4">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600">
                <i className="fa-solid fa-map text-lg"></i>
              </span>
              <div>
                <h4 className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Active Packages</h4>
                <p className="text-2xl font-black text-zinc-900 mt-0.5">{stats.packagesCount}</p>
              </div>
            </div>

            <div className="bg-white border border-zinc-200/80 p-6 rounded-2xl shadow-sm flex items-center space-x-4">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600">
                <i className="fa-solid fa-calendar-check text-lg"></i>
              </span>
              <div>
                <h4 className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Total Bookings</h4>
                <p className="text-2xl font-black text-zinc-900 mt-0.5">{stats.bookingsCount}</p>
              </div>
            </div>

            <div className="bg-white border border-zinc-200/80 p-6 rounded-2xl shadow-sm flex items-center space-x-4">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-50 text-amber-600 border border-amber-100/10">
                <i className="fa-solid fa-clock-rotate-left text-lg"></i>
              </span>
              <div>
                <h4 className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Pending Approvals</h4>
                <p className="text-2xl font-black text-zinc-900 mt-0.5">{stats.pendingCount}</p>
              </div>
            </div>
          </div>

          {/* Action shortcuts widgets */}
          <div className="bg-white border border-zinc-200/85 p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="font-bold text-zinc-900 text-sm">Administrative Tools Quick Access</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link 
                to="/admin/packages" 
                className="flex items-start p-4 border border-zinc-200/60 rounded-xl hover:border-emerald-300 hover:bg-emerald-50/10 transition-all duration-300 space-x-3 text-left"
              >
                <span className="text-emerald-500 mt-0.5"><i className="fa-solid fa-circle-plus"></i></span>
                <div>
                  <h4 className="font-bold text-zinc-950 text-xs">Add New Package</h4>
                  <p className="text-zinc-500 text-[10px] mt-0.5">Configure itinerary details, locations, pricing, features, and uploads.</p>
                </div>
              </Link>

              <Link 
                to="/admin/bookings" 
                className="flex items-start p-4 border border-zinc-200/60 rounded-xl hover:border-emerald-300 hover:bg-emerald-50/10 transition-all duration-300 space-x-3 text-left"
              >
                <span className="text-emerald-500 mt-0.5"><i className="fa-solid fa-envelope-open-text"></i></span>
                <div>
                  <h4 className="font-bold text-zinc-950 text-xs">Manage Bookings</h4>
                  <p className="text-zinc-500 text-[10px] mt-0.5">Approve, reject, or comment on customer bookings. Start help chat.</p>
                </div>
              </Link>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
