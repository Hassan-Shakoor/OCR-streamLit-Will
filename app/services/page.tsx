const services = [
  {
    title: "OCR Text Extraction",
    description:
      "Extract text seamlessly from book pages, handwritten notes, and PDFs using our advanced OCR technology.",
    icon: "📖",
  },
  {
    title: "Multi-Language Support",
    description:
      "Recognize text in multiple languages, making it easier for users to scan and understand content from different sources.",
    icon: "🌍",
  },
  {
    title: "Export Notes & Summaries",
    description:
      "Convert extracted text into organized notes and summaries that you can export as PDFs or text files.",
    icon: "📝",
  },
  {
    title: "Privacy & Data Security",
    description:
      "Your data is processed securely, with no unauthorized sharing of information.",
    icon: "🔒",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-5xl px-8 py-16 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          Our Services
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-4xl">{service.icon}</div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {service.title}
                </h2>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
