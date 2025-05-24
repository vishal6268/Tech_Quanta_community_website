import React from "react";
import Maintenance from "../components/ui/error";
// import maintenanceImg from "../assets/maintenance.png"; // Your image here

const MaintenancePage = () => {
    const maintenanceimage='/Maintenance.gif'
  return (
    <Maintenance
      imageSrc={maintenanceimage}
      altText="Maintenance Illustration"
      heading="Oops! We're undergoing maintenance."
      message="We're making improvements to serve you better. Please check back soon!"
    />
  );
};

export default MaintenancePage;
