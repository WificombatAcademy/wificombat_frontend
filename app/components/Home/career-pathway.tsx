import { Design } from "../general/header-design"

export const CareerPathway = () => {
    return (
        <section className="relative">
           <Design title={"CAREER PATHWAYS"}/>

           <div className="mt-12 md:mt-16 lg:mt-20 xl:mt-[5.5rem] w-[93%] md:w-[90] mx-auto">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 lg:gap-16">
                    <div className="w-full md:basis-[50%]">
                        <h3 className="font-semibold text-lg md:text-3xl">
                            Career Pathway for Tech: Empowering Kids to Find Their Path in Technology
                        </h3>

                        <p className="mt-4 md:text-xl text-black-700">
                        <span className="font-semibold">Explore six dynamic career pathways in technology,</span> including AI for innovation, Robotics 
                        & IoT for automation, Multimedia for creative expression, Coding for software mastery, 
                        Software Engineering/DevOps for infrastructure optimization, and Gaming for immersive 
                        entertainment. Each pathway offers unique opportunities to innovate, create, and lead 
                        in their respective fields. Start your journey today and shape the future of technology
                        </p>
                    </div>

                    <div className="w-full md:basis-[50%]">
                        <div className="w-full h-[300px] bg-primary-gray rounded-2xl">

                        </div>
                    </div>
                </div>
           </div>
        </section>
    )
}