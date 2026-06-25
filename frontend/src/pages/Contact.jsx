const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! Your message has been sent. Our team will get back to you shortly.');
  };

  return (
    <div className="flex flex-col space-y-16 pb-20 w-full">
      {/* Header section */}
      <section className="bg-zinc-900 text-white py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Contact Us</h1>
          <p className="text-zinc-400 text-base max-w-xl mx-auto font-light">
            Have questions about our packages or need help with a booking? Get in touch with us.
          </p>
        </div>
      </section>

      {/* Main split container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Info Column */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              Get in Touch
            </span>
            <h2 className="text-2xl font-extrabold text-zinc-950">We are here to assist</h2>
            <p className="text-zinc-500 text-sm font-light leading-relaxed">
              Whether you are planning a solo adventure, family vacation, or have general support inquiries, our team is happy to help. Fill out the contact form or reach us via our details.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex items-start p-4 bg-white border border-zinc-200/60 rounded-xl space-x-4">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600">
                <i className="fa-solid fa-envelope"></i>
              </span>
              <div>
                <h4 className="font-bold text-zinc-900 text-xs">Email Support</h4>
                <p className="text-zinc-500 text-xs mt-0.5">Demo Email</p>
              </div>
            </div>

            <div className="flex items-start p-4 bg-white border border-zinc-200/60 rounded-xl space-x-4">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600">
                <i className="fa-solid fa-phone"></i>
              </span>
              <div>
                <h4 className="font-bold text-zinc-900 text-xs">Phone Call</h4>
                <p className="text-zinc-500 text-xs mt-0.5">Demo Phone Number</p>
              </div>
            </div>

            <div className="flex items-start p-4 bg-white border border-zinc-200/60 rounded-xl space-x-4">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600">
                <i className="fa-solid fa-map-pin"></i>
              </span>
              <div>
                <h4 className="font-bold text-zinc-900 text-xs">Main Office</h4>
                <p className="text-zinc-500 text-xs mt-0.5">Demo Adress</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="bg-white border border-zinc-200/80 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
          <div>
            <h3 className="font-bold text-zinc-900 text-lg">Send us a Message</h3>
            <p className="text-zinc-400 text-xs mt-0.5">Our support agents typically reply within 24 hours.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-700">Full Name</label>
              <input
                type="text"
                required
                placeholder="Enter your name"
                className="w-full px-3.5 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 bg-zinc-50/50"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-700">Email Address</label>
              <input
                type="email"
                required
                placeholder="your@email.com"
                className="w-full px-3.5 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 bg-zinc-50/50"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-700">Message Content</label>
              <textarea
                required
                rows="4"
                placeholder="Type your message details here..."
                className="w-full px-3.5 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 bg-zinc-50/50"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center px-4 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all duration-300 shadow-sm"
            >
              Send Message<i className="fa-solid fa-paper-plane ml-2 text-xs"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
