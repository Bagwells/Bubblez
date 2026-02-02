
import { servicesData } from "@/utils/Services"
import { ServiceCard, ServiceProps } from "../ui/Card"


export const ServiceGrid =()=> {


    return(
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 group">
        {
            servicesData?.map((service: ServiceProps ) => (
                <ServiceCard key={service.title} {...service} />
            ))
        }
        </div>
    )
}