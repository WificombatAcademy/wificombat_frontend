import AssessmentForm from "../components/AssessmentComps/assessment-form";
import GeneralNavbar from "../components/general/GeneralNavbar";
export default function Page () {
   return (
     <div className="relative mx-auto container max-w-[2000px]">
        <GeneralNavbar/>
        <AssessmentForm />
    </div>
   )
}