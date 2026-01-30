import VehicleCard from "./utils/VehicleCard";

const ERickshawPage = () => (
  <div className="p-8">
    <h2 className="text-3xl font-bold mb-6">E‑Rickshaws</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <VehicleCard title="E‑Rickshaw Model A" />
      <VehicleCard title="E‑Rickshaw Model B" />
    </div>
  </div>
);

export default ERickshawPage