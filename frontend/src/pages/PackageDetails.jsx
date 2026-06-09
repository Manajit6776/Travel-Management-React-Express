import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const PackageDetails = () => {
  const { id } = useParams();
  const [packageData, setPackageData] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPackage();
  }, [id]);

  const fetchPackage = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/packages/${id}`);
      setPackageData(response.data);
    } catch (error) {
      console.error('Error fetching package:', error);
    }
  };

  const handleBook = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.is_admin) {
      alert('Admins are not allowed to book tours.');
      return;
    }
    navigate(`/book/${id}`);
  };

  if (!packageData) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 w-full flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-emerald-200 border-t-emerald-600 animate-spin"></div>
        <p className="mt-4 text-sm text-zinc-500 font-medium">Fetching details...</p>
      </div>
    );
  }

  // Parse comma separated features
  const featuresList = packageData.features 
    ? packageData.features.split(',').map(f => f.trim()).filter(Boolean)
    : ["Free Breakfast", "Free Wi-Fi", "Complimentary Sightseeing", "Airport Transfers"];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <Link 
        to="/packages" 
        className="inline-flex items-center text-sm font-semibold text-zinc-500 hover:text-emerald-600 mb-8 transition-colors"
      >
        <i className="fa-solid fa-arrow-left mr-2"></i>Back to Packages
      </Link>

      <div className="bg-white rounded-3xl border border-zinc-200/80 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 p-6 sm:p-8">
        
        {/* Left Column: Image */}
        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-zinc-100 border border-zinc-200/40">
          <img
            className="w-full h-full object-cover"
            src={packageData.image ? `http://localhost:5000/uploads/${packageData.image}` : '/placeholder.jpg'}
            alt={packageData.package_name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80";
            }}
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm border border-white/20">
            <span className="text-xs font-black text-emerald-700 uppercase tracking-wider">USD {packageData.price}</span>
          </div>
        </div>

        {/* Right Column: Content */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                <i className="fa-solid fa-tag mr-1 text-[10px]"></i>
                {packageData.package_type}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-700 border border-zinc-200/40">
                <i className="fa-solid fa-location-dot mr-1 text-[10px]"></i>
                {packageData.location}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 leading-tight">
              {packageData.package_name}
            </h1>

            <p className="text-zinc-600 text-sm leading-relaxed font-light">
              {packageData.description || "Indulge in a premium holiday experience designed to give you unique cultural sights, breathtaking scenery, and absolute relaxation. Travel arrangements are completely taken care of by our service experts."}
            </p>
          </div>

          {/* Features check list */}
          <div className="space-y-3 pt-4 border-t border-zinc-100">
            <h3 className="font-bold text-zinc-900 text-sm uppercase tracking-wider">Package Highlights</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {featuresList.map((feature, i) => (
                <li key={i} className="flex items-start text-zinc-600 text-xs">
                  <span className="text-emerald-500 mr-2.5 mt-0.5">
                    <i className="fa-solid fa-circle-check"></i>
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action button */}
          <div className="pt-6 border-t border-zinc-100 flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-xs text-zinc-400 font-medium">Pricing Quote</span>
              <span className="text-2xl font-black text-zinc-900">USD {packageData.price}</span>
            </div>
            <button 
              onClick={handleBook}
              className="flex-1 max-w-xs inline-flex items-center justify-center px-6 py-3.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all duration-300 shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/20 hover:scale-[1.02]"
            >
              Book This Tour<i className="fa-solid fa-arrow-right ml-2 text-xs"></i>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
