import AssessmentDesign from "../components/AssessmentComps/assessment-design";
import { merriweather } from "../fonts";

const Loader = () => {
  return (
    <div className="relative flex flex-col justify-center items-center h-screen bg-white">
        <AssessmentDesign />

        <div className="relative w-28 h-28 lg:w-40 lg:h-40 rounded-full">
            <div className="absolute top-0 left-0 w-full h-full rounded-full 
            border-[16px] border-t-transparent border-r-purple-600 border-b-blue-600 
            border-l-orange-400 animate-spin"></div>
        </div>

        <div className={`${merriweather.className} mt-5 text-2xl md:text-3xl font-bold`}>Loading...</div>
    </div>
  );
};

export default Loader;