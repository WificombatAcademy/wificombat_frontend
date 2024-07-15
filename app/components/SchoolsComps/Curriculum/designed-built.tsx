export const DesignedAndBuilt = () => {
    return (
        <section className="w-[93%] md:w-[90%] lg:w-[88%] mx-auto">
            <div className="mt-20 md:mt-24">
            <h3 className="w-[90%] mx-auto text-center text-2xl md:text-4xl font-semibold">Designed & Built For Everyone </h3>
            <p className="mt-9 md:w-[80%] lg:w-[65%] mx-auto text-center md:text-xl">Lorem ipsum dolor sit amet consectetur. Cras 
                aliquam at tincidunt fermentum quis ultricies leo. Accumsan tortor nunc facilisi posuere sapien in massa felis 
                laoreet. Egestas accumsan in arcu integer ut quisque mollis et nec. Massa interdum  </p>
            </div>


            <div className="mt-10 md:mt-16 mb-20 flex flex-col gap-10 lg:gap-16 xl:gap-24 md:flex-row md:items-center md:justify-between">
                <div className="w-full md:basis-[50%]">
                    <div className="w-full h-[300px] rounded-2xl bg-primary-gray"></div>
                </div>

                <div className="w-full md:basis-[50%]">
                    <h3 className="md:w-[90%] font-semibold text-lg md:text-3xl">
                        Lorem ipsum dolor sit amet consectetur.
                    </h3>

                    <p className="mt-4 md:mt-6 md:w-[90%] lg:w-[85%] md:text-xl text-black-700 leading-8">
                    <span className="font-semibold">
                    Explore six dynamic career pathways in technology,
                    </span>{" "}
                    including AI for innovation, Robotics & IoT for automation,
                    Multimedia for creative expression, Coding for software mastery,
                    Software Engineering/DevOps for infrastructure optimization, and
                    Gaming for immersive entertainment. Each pathway offers unique
                    opportunities to innovate, create, and lead in their respective
                    fields. Start your journey today and shape the future of
                    technology
                    </p>
                </div>
            </div>
        </section>
    )
}