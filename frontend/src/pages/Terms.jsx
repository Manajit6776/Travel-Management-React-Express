const Terms = () => {
  const sections = [
    {
      num: "1",
      title: "Booking and Payment",
      content: "All bookings are subject to availability and confirmation. Payment must be made in full at the time of booking unless otherwise specified. We accept various payment methods including credit cards, debit cards, and bank transfers."
    },
    {
      num: "2",
      title: "Cancellation Policy",
      content: "Cancellations must be made at least 30 days prior to the travel date for a full refund. Cancellations made between 15-30 days before travel will receive a 50% refund. Cancellations made less than 15 days before travel are non-refundable."
    },
    {
      num: "3",
      title: "Travel Documents",
      content: "It is the responsibility of the traveler to ensure they have valid passports, visas, and any other required travel documents. Voyage Vista is not responsible for any issues arising from invalid or missing documentation."
    },
    {
      num: "4",
      title: "Health and Safety",
      content: "Travelers are responsible for assessing their own health and fitness for travel. We recommend obtaining travel insurance and consulting with a healthcare provider before traveling, especially for international destinations."
    },
    {
      num: "5",
      title: "Liability",
      content: "Voyage Vista acts as an intermediary between travelers and service providers. While we strive to provide accurate information and high-quality services, we are not liable for any losses, injuries, or damages that may occur during travel."
    },
    {
      num: "6",
      title: "Changes to Itinerary",
      content: "We reserve the right to make changes to itineraries due to unforeseen circumstances such as weather conditions, transportation issues, or other factors beyond our control. In such cases, we will make every effort to provide suitable alternatives."
    },
    {
      num: "7",
      title: "Code of Conduct",
      content: "Travelers are expected to behave respectfully and adhere to local laws and customs at all destinations. Any behavior that disrupts the experience for others may result in termination of services without refund."
    },
    {
      num: "8",
      title: "Contact Information",
      content: "For any questions regarding these terms and conditions, please contact us at support@voyagevista.com."
    }
  ];

  return (
    <div className="flex flex-col space-y-16 pb-20 w-full">
      {/* Header section */}
      <section className="bg-zinc-900 text-white py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Terms & Conditions</h1>
          <p className="text-zinc-400 text-base max-w-xl mx-auto font-light">
            Please read these terms carefully before booking any tour package with Voyage Vista.
          </p>
        </div>
      </section>

      {/* Grid of Sections */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-6">
        {sections.map((section, idx) => (
          <div key={idx} className="bg-white border border-zinc-200/80 p-6 rounded-2xl shadow-sm flex items-start space-x-4">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 font-bold text-sm shrink-0">
              {section.num}
            </span>
            <div className="space-y-1.5">
              <h3 className="font-bold text-zinc-900 text-base">{section.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed font-light">{section.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Terms;
