const VehicleCard = ({ vehicle }) => (
  <article className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition">
    <div className="flex justify-between items-start gap-4">
      <h3 className="text-xl font-semibold text-gray-900">{vehicle.title}</h3>
      <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
        {vehicle.availability}
      </span>
    </div>

    <div className="text-sm text-gray-600 mt-3 grid grid-cols-2 gap-2">
      <p><span className="font-semibold text-gray-800">Type:</span> {vehicle.type}</p>
      <p><span className="font-semibold text-gray-800">Seats:</span> {vehicle.seats}</p>
      <p><span className="font-semibold text-gray-800">Transmission:</span> {vehicle.transmission}</p>
      <p><span className="font-semibold text-gray-800">Rating:</span> ⭐ {vehicle.rating}</p>
      <p className="col-span-2"><span className="font-semibold text-gray-800">Pickup:</span> {vehicle.location}</p>
    </div>

    <ul className="mt-4 space-y-1 text-sm text-gray-700 list-disc list-inside">
      {vehicle.features.map((feature) => (
        <li key={feature}>{feature}</li>
      ))}
    </ul>

    <div className="mt-5 flex justify-between items-end gap-3">
      <div>
        <p className="text-2xl font-bold text-gray-900">₹{vehicle.pricePerDay}/day</p>
        <p className="text-xs text-gray-500">Deposit: ₹{vehicle.securityDeposit}</p>
      </div>
      <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-black transition">
        Rent Now
      </button>
    </div>
  </article>
);

export default VehicleCard;
