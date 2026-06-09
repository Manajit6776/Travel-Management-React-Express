import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="flex flex-col space-y-16 pb-20 w-full">
      {/* Header section */}
      <section className="bg-zinc-900 text-white py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">About Voyage Vista</h1>
          <p className="text-zinc-400 text-base max-w-xl mx-auto font-light">
            Discover our mission, our values, and why we are trusted by thousands of global travelers.
          </p>
        </div>
      </section>

      {/* Intro and Mission */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-xs uppercase font-bold tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            Our Identity
          </span>
          <h2 className="text-3xl font-extrabold text-zinc-950 leading-tight">
            Your Trusted Travel Partner
          </h2>
          <p className="text-zinc-500 text-sm leading-relaxed font-light">
            Voyage Vista is dedicated to creating unforgettable travel experiences for adventurers, families, and solo travelers alike. With years of expertise in the travel industry, we curate exceptional tour packages that combine comfort, adventure, and cultural immersion.
          </p>
          <div className="p-5 border-l-4 border-emerald-500 bg-emerald-50/50 rounded-r-xl">
            <h3 className="font-bold text-zinc-900 text-sm mb-1">Our Core Mission</h3>
            <p className="text-zinc-600 text-xs leading-relaxed font-light">
              To provide seamless, reliable, and enriching travel experiences that create lasting memories for our customers. We believe travel is not just about visiting new places, but about discovering new perspectives and building connections.
            </p>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-md shadow-zinc-200/60 aspect-[4/3] bg-zinc-100 border border-zinc-200/50">
          <img 
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80" 
            alt="Travel map and sunglasses" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Offerings Grid */}
      <section className="bg-zinc-100 py-16 w-full">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-extrabold text-zinc-950">What We Offer</h2>
            <div className="w-12 h-1 bg-emerald-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-zinc-200/40 space-y-3 shadow-sm">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600">
                <i className="fa-solid fa-map-location-dot"></i>
              </span>
              <h3 className="font-bold text-zinc-900 text-sm">Curated Packages</h3>
              <p className="text-zinc-500 text-xs leading-relaxed">
                Tour packages designed by industry specialists to destinations worldwide.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-zinc-200/40 space-y-3 shadow-sm">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600">
                <i className="fa-solid fa-calendar-check"></i>
              </span>
              <h3 className="font-bold text-zinc-900 text-sm">Flexible Bookings</h3>
              <p className="text-zinc-500 text-xs leading-relaxed">
                Seamless booking options customizable to fit your schedule.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-zinc-200/40 space-y-3 shadow-sm">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600">
                <i className="fa-solid fa-headset"></i>
              </span>
              <h3 className="font-bold text-zinc-900 text-sm">24/7 Support</h3>
              <p className="text-zinc-500 text-xs leading-relaxed">
                Dedicated support team standing by to assist you at every step of your trip.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-zinc-200/40 space-y-3 shadow-sm">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600">
                <i className="fa-solid fa-hand-holding-dollar"></i>
              </span>
              <h3 className="font-bold text-zinc-900 text-sm">Competitive Pricing</h3>
              <p className="text-zinc-500 text-xs leading-relaxed">
                Guaranteed high-quality stays and tours at competitive rates.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-zinc-200/40 space-y-3 shadow-sm">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600">
                <i className="fa-solid fa-sliders"></i>
              </span>
              <h3 className="font-bold text-zinc-900 text-sm">Personalization</h3>
              <p className="text-zinc-500 text-xs leading-relaxed">
                Custom tours tailored specifically to your group preferences.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-zinc-200/40 space-y-3 shadow-sm flex flex-col justify-center items-center text-center bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
              <h3 className="font-bold text-white text-base">Ready for travel?</h3>
              <p className="text-emerald-100 text-[10px] mb-4">Book your dream trip today</p>
              <Link to="/packages" className="px-4 py-2 bg-white text-emerald-700 font-bold text-xs rounded-lg hover:scale-105 transition-transform duration-300">
                Browse Tours
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
