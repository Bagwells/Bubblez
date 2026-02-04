import { ServicesHero } from "./hero";
import { Reason } from "./reason";
import { ServicesSection } from "./servicesSection";

const Services = () => {
  return (
    <div className="bg-white w-full min-h-screen overflow-hidden">
        <ServicesHero/>
        <ServicesSection/>
        <div className="py-40 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32 ">
          <Reason/>
        </div>
    </div>
  )
};

export default Services;
