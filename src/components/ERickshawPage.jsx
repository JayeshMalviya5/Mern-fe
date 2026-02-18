import VehicleSectionPage from "./VehicleSectionPage";
import { vehiclesBySection } from "../data";

const ERickshawPage = () => (
  <VehicleSectionPage title="E-Rickshaw Rentals" vehicles={vehiclesBySection["e-rickshaw"]} />
);

export default ERickshawPage;
