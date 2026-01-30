const VehicleCard = ({ title }) => (
  <div className="bg-white rounded-xl shadow p-6">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">Starting from ₹299/day</p>
    <button className="bg-gray-900 text-white px-4 py-2 rounded">Rent Now</button>
  </div>
);

export default VehicleCard