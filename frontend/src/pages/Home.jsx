import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const USD_TO_INR = 84;

const Home = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/packages/limited?limit=6');
      setPackages(response.data);
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  return (
    <>
    <div className="flex flex-col space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative bg-zinc-950 text-white py-32 px-4 overflow-hidden">
        {/* Background Image / Pattern overlay */}
        <div className="absolute inset-0 opacity-90">
          <img 
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80" 
            alt="Travel background" 
            className="w-full h-full object-cover"
          />
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent z-0"></div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          {/* <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 backdrop-blur-sm animate-pulse">
            <i className="fa-solid fa-compass mr-1.5"></i>Start Your Adventure Today
          </span> */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Explore the World’s <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Most Beautiful</span> Places
          </h1>
          <p className="text-zinc-300 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Discover handpicked tour packages designed to give you unique cultural experiences, breathtaking views, and lifelong memories.
          </p>
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-zinc-950 font-bold bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:scale-105 transition-all duration-300 text-center" 
              to="/packages"
            >
              Explore Packages
            </Link>
            <Link 
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold border border-zinc-700 bg-zinc-900/50 hover:bg-zinc-900 text-zinc-200 hover:text-white transition-all duration-300 text-center" 
              to="/about"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Packages Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl font-extrabold text-zinc-950">Trending Destinations</h2>
          <div className="w-12 h-1 bg-emerald-500 mx-auto rounded-full"></div>
          <p className="text-zinc-500 max-w-md mx-auto text-sm">
            Check out some of our most highly-rated and popular holiday experiences booked by fellow travelers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div 
              key={pkg.id} 
              className="group bg-white rounded-2xl border border-zinc-200/80 overflow-hidden hover-card-trigger"
            >
              {/* Card Image Wrapper */}
              <div className="relative h-56 overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
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

              {/* Card Content */}
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
                    <span className="text-xl font-black text-zinc-900">₹{(pkg.price * USD_TO_INR).toLocaleString('en-IN')}</span>
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

        <div className="text-center mt-12">
          <Link 
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-sm font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/50 transition-colors duration-300" 
            to="/packages"
          >
            Browse All Packages<i className="fa-solid fa-arrow-right ml-2 text-xs"></i>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-zinc-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center space-y-3 mb-16">
            <h2 className="text-3xl font-extrabold text-zinc-950">Voyage Vista by the Numbers</h2>
            <div className="w-12 h-1 bg-emerald-500 mx-auto rounded-full"></div>
            <p className="text-zinc-500 max-w-sm mx-auto text-sm">
              Our passion is connecting travelers with experiences, and the results speak for themselves.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-zinc-200/50 text-center space-y-3 shadow-sm hover:shadow-md transition-shadow">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 mb-2">
                <i className="fa-solid fa-circle-question text-xl"></i>
              </span>
              <h3 className="text-3xl font-black text-zinc-900">80,000+</h3>
              <p className="text-sm font-medium text-zinc-500">Travel Enquiries Handled</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-zinc-200/50 text-center space-y-3 shadow-sm hover:shadow-md transition-shadow">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 mb-2">
                <i className="fa-solid fa-users text-xl"></i>
              </span>
              <h3 className="text-3xl font-black text-zinc-900">1,900+</h3>
              <p className="text-sm font-medium text-zinc-500">Registered Happy Customers</p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-zinc-200/50 text-center space-y-3 shadow-sm hover:shadow-md transition-shadow">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 mb-2">
                <i className="fa-solid fa-plane-departure text-xl"></i>
              </span>
              <h3 className="text-3xl font-black text-zinc-900">70M+</h3>
              <p className="text-sm font-medium text-zinc-500">Total Bookings Completed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-3xl font-extrabold text-zinc-950">Why Choose Us?</h2>
          <div className="w-12 h-1 bg-emerald-500 mx-auto rounded-full"></div>
          <p className="text-zinc-500 max-w-sm mx-auto text-sm">
            We are dedicated to providing you with the best possible travel planning support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4">
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600">
              <i className="fa-solid fa-shield-halved text-2xl"></i>
            </span>
            <h3 className="text-xl font-bold text-zinc-900">Easy and Reliable Travel</h3>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs mx-auto">
              We provide seamless travel options and ensure a smooth, worry-free journey for all our customers.
            </p>
          </div>

          <div className="space-y-4">
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600">
              <i className="fa-solid fa-calendar-check text-2xl"></i>
            </span>
            <h3 className="text-xl font-bold text-zinc-900">Flexible Booking</h3>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs mx-auto">
              Our dynamic booking system allows you to easily manage and request modifications to your travel dates.
            </p>
          </div>

          <div className="space-y-4">
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600">
              <i className="fa-solid fa-headset text-2xl"></i>
            </span>
            <h3 className="text-xl font-bold text-zinc-900">24/7 Customer Support</h3>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs mx-auto">
              Our dedicated support team is always available to help you before, during, and after your trip.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-zinc-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center space-y-3 mb-16">
            <h2 className="text-3xl font-extrabold text-white">What Our Travelers Say</h2>
            <div className="w-12 h-1 bg-emerald-500 mx-auto rounded-full"></div>
            <p className="text-zinc-400 max-w-sm mx-auto text-sm">
              Read real stories from real adventurers who explore the globe with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-800/50 border border-zinc-800 p-8 rounded-2xl space-y-4 relative">
              <span className="text-emerald-500 text-5xl font-serif absolute top-4 right-6 opacity-30">“</span>
              <div className="flex text-emerald-400 text-xs gap-1">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <p className="text-zinc-300 text-sm italic font-light leading-relaxed">
                "Voyage Vista made planning our honeymoon stress-free and magical. The hotels and guides were absolutely top-tier. Highly recommend!"
              </p>
              <div className="pt-2">
                <p className="font-semibold text-white text-sm">— Vivek Sharma</p>
                <p className="text-zinc-500 text-[10px]">Verified Couple Traveler</p>
              </div>
            </div>

            <div className="bg-zinc-800/50 border border-zinc-800 p-8 rounded-2xl space-y-4 relative">
              <span className="text-emerald-500 text-5xl font-serif absolute top-4 right-6 opacity-30">“</span>
              <div className="flex text-emerald-400 text-xs gap-1">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <p className="text-zinc-300 text-sm italic font-light leading-relaxed">
                "Great customer support and curated packages. I loved the transparency and response times from the team. I'll definitely book again."
              </p>
              <div className="pt-2">
                <p className="font-semibold text-white text-sm">— Raj Mehta</p>
                <p className="text-zinc-500 text-[10px]">Verified Business Traveler</p>
              </div>
            </div>

            <div className="bg-zinc-800/50 border border-zinc-800 p-8 rounded-2xl space-y-4 relative">
              <span className="text-emerald-500 text-5xl font-serif absolute top-4 right-6 opacity-30">“</span>
              <div className="flex text-emerald-400 text-xs gap-1">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <p className="text-zinc-300 text-sm italic font-light leading-relaxed">
                "I planned a solo trip to the Himalayas, and Voyage Vista made it unforgettable. Clear communication and safe travel throughout."
              </p>
              <div className="pt-2">
                <p className="font-semibold text-white text-sm">— Siddharth Bansal</p>
                <p className="text-zinc-500 text-[10px]">Verified Solo Adventurer</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </>
  );
};

export default Home;
