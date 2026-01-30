import VehicleCard from "./utils/VehicleCard";

const BikePage = () => (
  <div className="p-8">
    <h2 className="text-3xl font-bold mb-6">Bikes</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <VehicleCard title="Royal Enfield" />
      <VehicleCard title="Pulsar" />
      <VehicleCard title="Apache" />
    </div>
  </div>
);

export default BikePage