import Image from "next/image";
import { StartCodingToday } from "../components/CodingPathwayComps/today-comp";
import Footer from "../components/general/Footer";
import GeneralNavbar from "../components/general/GeneralNavbar";
import Link from "next/link";
import RecommendationDesign from "../components/AssessmentComps/recommendation-design";

const reasons = [
  {
    title: "Pathway Highlights",
    desc:
      "Coding is like building with blocks, but with computers! You can make games, apps, and even robots come to life. Imagine the fun!",
  },
  {
    title: "Skill Alignment",
    desc:
      "You love [specific skill]? That's awesome! It's just like a super power for coding! You're going to be amazing!",
  },
  {
    title: "Coding Career Outlook",
    desc:
      "Coders create amazing things! Imagine building video games, designing websites, or even helping robots learn new tricks. With coding skills, you can solve problems, be creative, and make a difference in the world!",
  },
  {
    title: "Next Step",
    desc:
      "Ready to start coding? Let's go! Try our fun coding games, solve puzzles, or work on projects to build something awesome!",
    buttonText: "Get Started",
    linkTo: "/registration",
  },
];

const alt_paths = ["Gaming", "AI"];

export default function Page() {
  return (
    <div className="mx-auto relative container w-full max-w-[2000px]">
      <GeneralNavbar />
      <div className="w-full relative">
        {/* SUMMARY */}
        <RecommendationDesign />

        <div className="relative z-[5] w-[90%] md:w-[70%] lg:w-[65%] mx-auto">
          <h1 className="pt-14 md:pt-20 lg:pt-28 text-center font-semibold text-xl md:text-2xl lg:text-3xl">
            Hi Jimmy, your assessment indicates a strong aptitude for logical
            thinking and problem-solving, which are essential for a successful
            coding career.
          </h1>
        </div>
        {/* SUMMARY */}

        {/* PATHWAY */}
        <div className="relative z-[5] mt-16 md:mt-24 w-full bg-blue-50 py-12">
          <div
            className="w-[93%] md:w-[90%] mx-auto
                    flex flex-col md:flex-row md:items-center gap-10 md:gap-14 lg:gap-20 text-black-500"
          >
            <div className="w-full md:basis-[50%]">
              <Image
                src={"/hero-1.png"}
                alt={"pathway"}
                width={500}
                height={500}
                className="w-full h-full object-cover border-none"
              />
            </div>

            <div className="w-full md:basis-[50%]">
              <h2 className="text-blue-500 font-semibold text-xl md:text-2xl lg:text-4xl">
                Coding Pathway
              </h2>

              <p className="mt-4 text-lg md:text-xl">
                Master programming languages, build web and mobile applications,
                and become a proficient software developer.
              </p>

              <p className="mt-4 text-lg md:text-xl text-black-700 font-semibold">
                Key Skills: Python, JavaScript, HTML, CSS, Databases
              </p>

              <div className="mt-8 lg:mt-12">
                <Link
                  href="/registration"
                  className={`bg-[#131314] text-white focus-visible:outline-black
                                        rounded-lg px-16 py-5 font-medium  shadow-sm hover:bg-opacity-80 
                                        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 `}
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* PATHWAY */}

        {/* REASONS */}
        <div className="relative z-[5] w-[90%] mx-auto py-12 md:py-16">
          <h2 className="font-semibold text-xl md:text-2xl lg:text-4xl">
            Reasons For Recommendation
          </h2>

          <div className="mt-12 md:mt-16 w-full grid grid-cols-1 md:grid-cols-2 gap-16">
            {reasons.map((reason, index) => (
              <div key={index}>
                <h3 className="font-semibold text-xl md:text-2xl lg:text-3xl">
                  {reason.title}
                </h3>
                <p className="mt-4 text-lg md:text-xl">{reason.desc}</p>

                {reason.buttonText && (
                  <div className="mt-8">
                    <Link
                      href={reason.linkTo}
                      className={`bg-[#131314] xl:text-lg text-white focus-visible:outline-black 
                                                rounded-lg px-16 py-5 font-medium  shadow-sm hover:bg-opacity-80 
                                                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 `}
                    >
                      {reason.buttonText}
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* REASONS */}

        {/* ALTERNATIVE PATHS */}
        <div className="relative z-[5] mt-12 mb-12 w-[90%] mx-auto">
          <h3 className="font-semibold text-xl md:text-2xl lg:text-3xl">
            Alternative Paths
          </h3>

          <p className="mt-4 text-lg md:text-xl">
            If you&apos;re also interested in game development or AI, you might
            consider exploring those pathways as well.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            {alt_paths.map((path, index) => (
              <div
                key={index}
                className="font-semibold px-4 py-[10px] border border-black-500 max-md:text-sm rounded-lg cursor-pointer"
              >
                {path} Pathway
              </div>
            ))}
          </div>
        </div>
        {/* ALTERNATIVE PATHS */}
      </div>

      <StartCodingToday />
      <Footer />
    </div>
  );
}
