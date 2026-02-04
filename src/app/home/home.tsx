import { About } from "./about"
import { Hero } from "./hero"
import { Process } from "./process"
import { Services } from "./services"

export const HomeScreen =()=> {
  return (
    <div className="bg-white w-full min-h-screen overflow-hidden">
      <Hero/>
      <Services/>
      <div className="py-40 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32 ">
        <About/>
      </div>
      <Process/>
    </div>
  )
}