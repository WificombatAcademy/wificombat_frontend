import { CurriculumCard } from "./curriculum-card";
import { Onboarding } from "./onboarding";
import HeadingDesign from "../general/HeaderDesign";

type Props = {
  dontShowOnboarding: boolean;
}

export const SchoolCurriculum = ({dontShowOnboarding}: Props) => {
  return (
    <section className="relative">
      <HeadingDesign heading="Career Pathway school curriculum" />

      <div className="w-[93%] md:w-[90%] lg:w-[88%] mx-auto">
        <p className="md:w-[80%] lg:w-[70%] mx-auto mt-6 md:mt-9 lg:mt-12 text-center font-medium">
          Lorem ipsum dolor sit amet consectetur. Facilisis arcu adipiscing mi
          ullamcorper. A aliquet non pellentesque vulputate. Malesuada ac lacus
          commodo orci nunc nascetur ac sapien. Dignissim ut fames eros est
          volutpat. Eu in euismod elit dui. Arcu aliquet nunc ali.
        </p>

        <div className="mt-14 md:mt-24 mb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
          <CurriculumCard
            borderColor="border-purple-500"
            bgColor="bg-purple-50"
            title="Elementary"
          />
          <CurriculumCard
            borderColor="border-blue-500"
            bgColor="bg-blue-50"
            title="Junior High School"
          />
          <CurriculumCard
            borderColor="border-yellow-500"
            bgColor="bg-yellow-50"
            title="Senior High School"
          />
        </div>

        {!dontShowOnboarding && 
        <div className="">
          <Onboarding />
        </div>}
      </div>
    </section>
  );
};
