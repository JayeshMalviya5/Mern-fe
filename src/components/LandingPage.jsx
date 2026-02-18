import { Link } from "react-router-dom";
import { vehicleSections } from "../data";

const LandingPage = () => (
  <section className="min-h-[calc(100vh-72px)] bg-gradient-to-b from-white to-gray-100 px-6 py-12 overflow-y-auto">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-900 mb-3">Welcome to Rent Your Ride</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose the vehicle category you need, compare pricing and availability, and rent in minutes.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {vehicleSections.map((section) => (
          <Link
            key={section.id}
            to={section.route}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-lg hover:-translate-y-1 transition"
          >
            <span className={`${section.accent} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
              Category
            </span>
            <h3 className="text-2xl font-bold text-gray-900 mt-4">{section.title}</h3>
            <p className="text-gray-600 mt-2">{section.subtitle}</p>
            <p className="mt-5 font-semibold text-gray-900">Explore vehicles →</p>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default LandingPage;
