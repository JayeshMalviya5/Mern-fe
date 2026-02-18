import { useMemo, useState } from "react";
import VehicleCard from "./utils/VehicleCard";

const VehicleSectionPage = ({ title, vehicles }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("price-asc");

  const filteredVehicles = useMemo(() => {
    const filtered = vehicles.filter((vehicle) =>
      vehicle.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      if (sortBy === "price-asc") return a.pricePerDay - b.pricePerDay;
      if (sortBy === "price-desc") return b.pricePerDay - a.pricePerDay;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [searchTerm, sortBy, vehicles]);

  return (
    <section className="p-6 md:p-8 bg-gray-50 min-h-[calc(100vh-72px)] overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
            <p className="text-gray-600 mt-1">Compare available vehicles and book instantly.</p>
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search vehicle"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border rounded-lg bg-white"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border rounded-lg bg-white"
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {filteredVehicles.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        ) : (
          <div className="bg-white border rounded-xl p-8 text-center text-gray-600">
            No vehicles found for your search.
          </div>
        )}
      </div>
    </section>
  );
};

export default VehicleSectionPage;
