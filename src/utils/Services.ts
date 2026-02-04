import { ServiceProps } from "@/components/ui/Card";


export const servicesData: ServiceProps[] = [
    {
        title: "Commercial",
        description: "Professional cleaning for offices, retail spaces, and businesses.",
        price: 1200,
        duration: "Custom",
        features: [
            "Offices, retail spaces, and showrooms",
            "Restrooms & break rooms sanitization",
            "Scheduled weekly / bi-weekly visits",
            "Custom cleaning plans available",
        ],
        customPrice: undefined
    },
    {
        title: "Residential",
        description: "Reliable home cleaning tailored to your lifestyle and schedule.",
        price: 800,
        duration: "2-4 Hours",
        features: [
            "Regular & deep cleaning options",
            "Move-in/Move-out cleaning",
            "Kitchens, bathrooms, and bedrooms",
            "Eco-Friendly products available"
        ],
        customPrice: undefined
    },
    {
        title: "Post-Construction",
        description: "Detailed cleaning after renovations or construction.",
        price: 12500,
        duration: "4-6 Hours",
        features: [
            "Heavy dust & debris removal",
            "Scrubbing floors, windows, and fixtures",
            "Final detailed cleaning for handover"
        ],
        customPrice: undefined
    },
    {
        title: "Specialty & Individual",
        description: "Customized cleaning solutions for specific needs and requests.",
        customPrice: [
            {
                title: "Trash Can Cleaning",
                price: "120",
            },
            {
                title: "Carpet Cleaning",
                price: "150 per room",

            },
            {
                title: "Window Cleaning",
                price: "100 per window",
            }, 
            { 
                title: "3D carpets cleaning",
                price: "Starts from R350",
            },
            {
                title: "Persian, Egyptian etc. carpets cleaning",
                price: "Starts from R500",
            }

        ], 
        price: 0,
        duration: "Custom",
        features: [],
    }
]