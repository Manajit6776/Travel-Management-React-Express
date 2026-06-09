import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AllPackages = () => {
  const [packages, setPackages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [maxPrice, setMaxPrice] = useState(10000);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/packages');
      setPackages(response.data);
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  // Extract unique package types for filtering
  const packageTypes = ['All', ...new Set(packages.map(pkg => pkg.package_type).filter(Boolean))];

  // Client-side search and filter
  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.package_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pkg.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (pkg.features && pkg.features.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = selectedType === 'All' || pkg.package_type === selectedType;
    const matchesPrice = pkg.price <= maxPrice;

    return matchesSearch && matchesType && matchesPrice;
  });

  return (
    <div className="flex flex-col space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-zinc-900 text-white py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Our Tour Packages</h1>
          <p className="text-zinc-400 text-base max-w-xl mx-auto font-light">
            Browse through our wide selection of handpicked travel experiences. Filter by location, budget, or type to find your dream vacation.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1 bg-white border border-zinc-200/80 p-6 rounded-2xl h-fit space-y-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
            <h3 className="font-bold text-zinc-900 text-base">Filter Search</h3>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedType('All');
                setMaxPrice(10000);
              }}
              className="text-xs text-zinc-400 hover:text-emerald-600 font-semibold"
            >
              Reset All
            </button>
          </div>

          {/* Search bar */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Destination / Keywords</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-400">
                <i className="fa-solid fa-magnifying-glass text-xs"></i>
              </span>
              <input
                type="text"
                placeholder="Search location, name..."
                className="w-full pl-9 pr-4 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 bg-zinc-50/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Package Type Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Category</label>
            <div className="relative">
              <select
                className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 bg-zinc-50/50 appearance-none"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {packageTypes.map((type, i) => (
                  <option key={i} value={type}>{type}</option>
                ))}
              </select>
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-zinc-400 text-xs">
                <i className="fa-solid fa-chevron-down"></i>
              </span>
            </div>
          </div>

          {/* Max Price Filter */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-zinc-500">
              <span>Max Budget</span>
              <span className="text-emerald-600">USD {maxPrice}</span>
            </div>
            <input
              type="range"
              min="200"
              max="10000"
              step="100"
              className="w-full accent-emerald-600 bg-zinc-200 rounded-lg cursor-pointer h-1.5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
            />
            <div className="flex justify-between text-[10px] text-zinc-400">
              <span>USD 200</span>
              <span>USD 10,000</span>
            </div>
          </div>
        </aside>

        {/* Packages Grid */}
        <main className="lg:col-span-3 space-y-6">
          <div className="flex justify-between items-center text-sm text-zinc-500">
            <p>Showing <span className="font-semibold text-zinc-900">{filteredPackages.length}</span> packages</p>
          </div>

          {filteredPackages.length === 0 ? (
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-16 text-center space-y-4 shadow-sm">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-zinc-50 text-zinc-400">
                <i className="fa-solid fa-map-location-dot text-2xl animate-bounce"></i>
              </span>
              <h3 className="text-lg font-bold text-zinc-950">No Packages Found</h3>
              <p className="text-zinc-500 text-sm max-w-sm mx-auto">
                We couldn't find any packages that match your search filters. Try adjusting your destination name, budget slider, or category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPackages.map((pkg) => (
                <div 
                  key={pkg.id} 
                  className="group bg-white rounded-2xl border border-zinc-200/80 overflow-hidden hover-card-trigger"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      src={pkg.image ? `http://localhost:5000/uploads/${pkg.image}` : '/placeholder.jpg'}
                      alt={pkg.package_name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80";
                      }}
                    />
                    <span className="absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-zinc-800 shadow-sm backdrop-blur-sm border border-white/20">
                      <i className="fa-solid fa-map-pin text-emerald-600 mr-1 text-[10px]"></i>
                      {pkg.location.split(',')[0]}
                    </span>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block">
                        {pkg.package_type}
                      </span>
                      <h3 className="text-lg font-bold text-zinc-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
                        {pkg.package_name}
                      </h3>
                    </div>
                    
                    <p className="text-zinc-500 text-sm line-clamp-2 leading-relaxed">
                      {pkg.description || "Embark on an unforgettable vacation package curated for luxury and relaxation."}
                    </p>

                    <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-zinc-400 font-medium">Starting at</span>
                        <span className="text-lg font-black text-zinc-900">USD {pkg.price}</span>
                      </div>
                      <Link 
                        className="inline-flex items-center justify-center px-4.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-sm" 
                        to={`/package/${pkg.id}`}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AllPackages;
