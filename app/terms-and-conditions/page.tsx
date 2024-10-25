import {
  FaShieldAlt,
  FaUserSecret,
  FaFileContract,
  FaSyncAlt,
  FaEnvelope,
} from "react-icons/fa";

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-10">
        <h1 className="text-5xl font-bold text-black-800 text-center mb-8">
          Terms & Conditions
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12">
          Please read these terms and conditions carefully before using our app.
          By using our services, you agree to be bound by these terms.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card
            icon={<FaFileContract size={40} className="text-blue-500" />}
            title="Use of Service"
            description="Our app allows you to extract text from images for personal use. Unauthorized or commercial use is prohibited."
          />
          <Card
            icon={<FaUserSecret size={40} className="text-blue-500" />}
            title="User Data & Privacy"
            description="Your data is processed securely and not stored beyond your session unless saved explicitly."
          />
          <Card
            icon={<FaShieldAlt size={40} className="text-blue-500" />}
            title="Account Responsibility"
            description="You are responsible for safeguarding your account credentials and any activities under your account."
          />
          <Card
            icon={<FaSyncAlt size={40} className="text-blue-500" />}
            title="Changes to Terms"
            description="We may update these terms periodically. Continued use of the app indicates acceptance of the changes."
          />
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-3xl font-semibold text-blue-800 mb-4">
            Need Help?
          </h2>
          <p className="text-gray-600 mb-6">
            If you have any questions about these terms, feel free to{" "}
            <a href="/contact" className="text-blue-500 underline">
              contact us
            </a>
            .
          </p>
          <FaEnvelope size={40} className="mx-auto text-blue-500" />
        </div>
      </div>
    </div>
  );
}

// Card component for cleaner code
function Card({ icon, title, description }) {
  return (
    <div className="border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center space-x-4 mb-4">
        {icon}
        <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
