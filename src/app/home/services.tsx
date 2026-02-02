import { ServiceGrid } from "@/components/layout/serviceGrid"

export const Services =() => {

  return(
    <div className="bg-white font-jakarta w-full py-16 px-4 sm:px-8 md:px-16 xl:px-24 2xl:px-32 text-center">
      <h3 className="font-semibold text-2xl lg:text-[40px] mb-8">
        Our Services
      </h3>
      <ServiceGrid />
    </div>
  )
}