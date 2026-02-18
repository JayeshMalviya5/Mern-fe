import VehicleSectionPage from "./VehicleSectionPage";
import { vehiclesBySection } from "../data";

const CarPage = () => (
  <VehicleSectionPage title="Car Rentals" vehicles={vehiclesBySection.cars} />
);

export default CarPage;
