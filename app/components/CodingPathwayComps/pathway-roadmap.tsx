import HeadingDesign from "../general/HeaderDesign"

type Props = {
    title: string;
}

export const PathwayRoadmap = ({title}: Props) => {
    return (
        <section>
            <HeadingDesign heading={`${title} pathway roadmap`} />

            <div className="py-20 w-[93%] md:w-[90%] lg:w-[88%] text-black-500 mx-auto">
                <div className="w-full flex flex-col ">
                    <div className="w-full flex flex-row gap-4">
                        <div className="relative border-2">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-[5px] border-dashed bg-black-100 h-full"></div>
                            </div>
                            <div
                            className={`mt-1 relative w-[6rem] h-[7rem] `}>
                                <div className={` polygon w-full h-full flex items-center justify-center bg-purple-50 border `}>
                                    <div className="text-2xl font-bold">
                                        1
                                    </div>
                                </div>
                            </div>
                            
                        </div>

                        <div className="w-full py-6 px-8 bg-white border border-purple-500 rounded-3xl">
                            <div className="space-y-3">
                                <h1 className="text-3xl font-semibold">Key Stage 1</h1>
                                <h2 className="text-2xl">Primary 1-3</h2>
                                <h2 className="text-2xl">50 Courses, 120 Lessons, 20 Projects</h2>
                            </div>
                        </div>
                    </div>


                    <div className="w-full flex flex-row gap-4">
                        <div className="relative border-2">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-[5px] border-dashed bg-black-100 h-full"></div>
                            </div>
                            <div
                            className={`mt-1 relative w-[6rem] h-[7rem] `}>
                                <div className={` polygon w-full h-full flex items-center justify-center bg-purple-50 border `}>
                                    <div className="text-2xl font-bold">
                                        1
                                    </div>
                                </div>
                            </div>
                            
                        </div>

                        <div className="w-full py-6 bg-white border border-purple-500 rounded-3xl">

                        </div>
                    </div>

                    <div className="w-full flex flex-row gap-4">
                        <div className="relative border-2">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-[5px] border-dashed bg-black-100 h-full"></div>
                            </div>
                            <div
                            className={`mt-1 relative w-[6rem] h-[7rem] `}>
                                <div className={` polygon w-full h-full flex items-center justify-center bg-purple-50 border `}>
                                    <div className="text-2xl font-bold">
                                        1
                                    </div>
                                </div>
                            </div>
                            
                        </div>

                        <div className="w-full py-6 bg-white border border-purple-500 rounded-3xl">

                        </div>
                    </div>

                    <div className="w-full flex flex-row gap-4">
                        <div className="relative border-2">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-[5px] border-dashed bg-black-100 h-full"></div>
                            </div>
                            <div
                            className={`mt-1 relative w-[6rem] h-[7rem] `}>
                                <div className={` polygon w-full h-full flex items-center justify-center bg-purple-50 border `}>
                                    <div className="text-2xl font-bold">
                                        1
                                    </div>
                                </div>
                            </div>
                            
                        </div>

                        <div className="w-full py-6 bg-white border border-purple-500 rounded-3xl">

                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    )
}