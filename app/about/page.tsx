export default function AboutUs() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-500 to-teal-500 h-96 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">About Us</h1>
          <p className="text-lg max-w-2xl mx-auto">
            We are passionate about building solutions that connect and empower
            people around the globe.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 px-8 lg:px-32 text-center">
        <h2 className="text-4xl font-semibold mb-6">Our Mission & Vision</h2>
        <p className="text-lg max-w-3xl mx-auto mb-8">
          Our mission is to create innovative, reliable, and impactful solutions
          for our customers. We believe in a future where technology bridges
          gaps and makes life better for everyone.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-100 p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Mission</h3>
            <p>
              To empower individuals and organizations by delivering robust and
              sustainable digital solutions.
            </p>
          </div>
          <div className="bg-gray-100 p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Vision</h3>
            <p>
              To be a global leader in technology, inspiring change and enabling
              growth for future generations.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 py-16 px-8 lg:px-32">
        <h2 className="text-4xl font-semibold text-center mb-12">
          Meet Our Team
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="text-center p-6 bg-white rounded-lg shadow-lg"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-medium">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-teal-500 to-blue-500 py-16 text-white text-center">
        <h2 className="text-4xl font-semibold mb-4">Join Us on This Journey</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Be a part of our story and help us shape the future with technology
          and innovation.
        </p>
        <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-md hover:bg-gray-100">
          Contact Us
        </button>
      </section>
    </div>
  );
}

// Dummy data for team members
const teamMembers = [
  {
    name: "Alice Johnson",
    role: "CEO & Founder",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Bob Smith",
    role: "CTO",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Charlie Brown",
    role: "Lead Developer",
    image: "https://via.placeholder.com/150",
  },
];
