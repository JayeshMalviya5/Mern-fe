import { Link } from 'react-router-dom';

const LandingPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
    <h2 className="text-4xl font-bold mb-4">Affordable Vehicle Rentals</h2>
    <p className="text-gray-600 mb-6">Rent Bikes, E‑Rickshaws and Bicycles easily</p>
    <div className="space-x-4">
      <Link to="/bikes" className="px-6 py-3 bg-blue-600 text-white rounded-lg">Explore Bikes</Link>
      <Link to="/bicycles" className="px-6 py-3 bg-green-600 text-white rounded-lg">Explore Bicycles</Link>
    </div>
  </div>
);

export default LandingPage