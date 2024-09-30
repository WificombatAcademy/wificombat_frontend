import Link from "next/link";
import AssessmentDesign from "../components/AssessmentComps/assessment-design";
import { merriweather } from "../fonts";
import Image from "next/image";

type LoaderProps = {
  isError?: boolean;
  isSessionExpired?: boolean;
  noDesign?: boolean;
};

const Loader = ({ isError = false, isSessionExpired = false, noDesign = false, }: LoaderProps) => {
  let displayMessage = "Loading...";
  let designSrc = "";
  let altText = "";
  let buttonText = "";
  let buttonLink = "";

  if (isError) {
    displayMessage = "Error loading data.";
    designSrc = "/assets/dashboard/no-access.svg";
    altText = "Error occurred";
    buttonText = "Go Back Home";
    buttonLink = "/";
  } else if (isSessionExpired) {
    displayMessage = "Session expired. Please log in again.";
    designSrc = "/assets/dashboard/expired.svg";
    altText = "Session expired";
    buttonText = "Proceed to Login";
    buttonLink = "/login";
  }

  return (
    <div className={`relative ${noDesign && "lg:left-[7%]"} flex flex-col justify-center items-center h-screen bg-white`}>
     {!noDesign &&  <AssessmentDesign />}
      
      {!isError && !isSessionExpired && (
        <div className="relative w-28 h-28 lg:w-40 lg:h-40 rounded-full">
          <div className="absolute top-0 left-0 w-full h-full rounded-full 
          border-[16px] border-t-transparent border-r-purple-600 border-b-blue-600 
          border-l-orange-400 animate-spin"></div>
        </div>
      )}

      {(isError || isSessionExpired) && (
        <div className="w-80 h-80 relative">
          <Image
            src={designSrc}
            alt={altText}
            layout="fill"  // Dynamically sizes the image
            objectFit="contain"  // Ensures it fits within the container
          />
        </div>
      )}

      <div className={`${merriweather.className} mt-5 text-2xl md:text-3xl font-bold`}>
        {displayMessage}
      </div>

      {(isError || isSessionExpired) && (
        <Link href={buttonLink}>
          <button
            className="mt-8 px-6 py-3 bg-black-500 hover:bg-purple-700 text-white 
            font-semibold rounded-md shadow-md transition-all cursor-pointer">
            {buttonText}
          </button>
        </Link>
      )}

    </div>
  );
};

export default Loader;