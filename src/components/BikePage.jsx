import VehicleSectionPage from "./VehicleSectionPage";
import { vehiclesBySection } from "../data";

const BikePage = () => (
  <VehicleSectionPage title="Bike Rentals" vehicles={vehiclesBySection.bikes} />
);

export default BikePage;
