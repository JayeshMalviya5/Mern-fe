import VehicleCard from "./utils/VehicleCard";

const BicyclePage = () => (
  <div className="p-8">
    <h2 className="text-3xl font-bold mb-6">Bicycles</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <VehicleCard title="Mountain Bike" />
      <VehicleCard title="City Bike" />
    </div>
  </div>
);

export default BicyclePage