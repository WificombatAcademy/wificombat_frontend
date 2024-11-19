import { merriweather } from '@/app/fonts';
import React, { useState } from 'react';
import SideBar from "@/app/components/Dashboard/SideBar";
import DashboardHeader from "@/app/components/Dashboard/DashboardHeader";
import { useMain } from "@/app/context/MainContext";
type Props = {}

const  SubmitAssignment = (props: Props) => {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [step, setStep] = useState(1); // Track the current step
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {toggleSidebar} = useMain();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleNextStep = () => {
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload a document.");
      return;
    }

    // Submission logic, such as sending data to an API
    console.log("Submitted description:", description);
    console.log("Submitted file:", file);

    alert("Assignment submitted successfully!");
  };

  return (

    <>
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative">
        {/* Static sidebar for desktop */}

        {/* header/ MAIN SECTION Start */}
        <div className={`${toggleSidebar ? "lg:pl-36" : "lg:pl-64"}
        transition-all duration-500 ease-in-out`}>
          
          <DashboardHeader setSidebarOpen={setSidebarOpen}/>

          <main className="pb-10">
            <div className="space-y-10">
            <form onSubmit={handleSubmit} className="mt-8">
           {/* File Upload and Description Page */}
           <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="file">
               Upload Document:
             </label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              className="border border-gray-300 rounded-lg p-2 w-full"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="description">
              Description:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              className="border border-gray-300 rounded-lg p-2 w-full h-32"
              placeholder="Describe your assignment..."
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black-500text-white font-semibold py-2 px-4 rounded-lg"
          >
            Submit
          </button>
        </form>
             
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default SubmitAssignment;



// import { merriweather } from '@/app/fonts';
// import React, { useState } from 'react';

// type Props = {}

// const AssignmentContent = (props: Props) => {
//   const [description, setDescription] = useState("");
//   const [file, setFile] = useState<File | null>(null);
//   const [step, setStep] = useState(1); // Track the current step

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setDescription(e.target.value);
//   };

//   const handleNextStep = () => {
//     setStep(2);
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!file) {
//       alert("Please upload a document.");
//       return;
//     }

//     // Submission logic, such as sending data to an API
//     console.log("Submitted description:", description);
//     console.log("Submitted file:", file);

//     alert("Assignment submitted successfully!");
//   };

//   return (
//     <div
//       className="w-full md:w-[80%] mx-auto h-auto bg-white 
//       mt-4 lg:mt-9 py-9 px-6 text-black-500 rounded-3xl"
//     >
//       <h2 className={`${merriweather.className} text-xl lg:text-2xl font-semibold text-center`}>
//         Assignment
//       </h2>

//       {step === 1 && (
//         <div className="mt-8">
//           {/* Assignment Question Page */}
//           <div className="mb-6">
//             <h3 className="text-lg font-semibold">Assignment Question:</h3>
//             <p className="mt-2 text-gray-700">
//               Please complete the following assignment by providing a description and uploading your document.
//             </p>
//           </div>
          
//           <button
//             onClick={handleNextStep}
//             className="w-full bg-black-500  text-white font-semibold py-2 px-4 rounded-lg mt-6"
//           >
//             Submit
//           </button>
//         </div>
//       )}

//       {step === 2 && (
//         <form onSubmit={handleSubmit} className="mt-8">
//           {/* File Upload and Description Page */}
//           <div className="mb-6">
//             <label className="block text-gray-700 font-semibold mb-2" htmlFor="file">
//               Upload Document:
//             </label>
//             <input
//               type="file"
//               id="file"
//               onChange={handleFileChange}
//               className="border border-gray-300 rounded-lg p-2 w-full"
//               required
//             />
//           </div>

//           <div className="mb-6">
//             <label className="block text-gray-700 font-semibold mb-2" htmlFor="description">
//               Description:
//             </label>
//             <textarea
//               id="description"
//               value={description}
//               onChange={handleDescriptionChange}
//               className="border border-gray-300 rounded-lg p-2 w-full h-32"
//               placeholder="Describe your assignment..."
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-black-500text-white font-semibold py-2 px-4 rounded-lg"
//           >
//             Submit
//           </button>
//         </form>
//       )}
//       {step === 2 && (
//         <form onSubmit={handleSubmit} className="mt-8">
//           {/* File Upload and Description Page */}
//           <div className="mb-6">
//             <label className="block text-gray-700 font-semibold mb-2" htmlFor="file">
//               Upload Document:
//             </label>
//             <input
//               type="file"
//               id="file"
//               onChange={handleFileChange}
//               className="border border-gray-300 rounded-lg p-2 w-full"
//               required
//             />
//           </div>

//           <div className="mb-6">
//             <label className="block text-gray-700 font-semibold mb-2" htmlFor="description">
//               Description:
//             </label>
//             <textarea
//               id="description"
//               value={description}
//               onChange={handleDescriptionChange}
//               className="border border-gray-300 rounded-lg p-2 w-full h-32"
//               placeholder="Describe your assignment..."
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-black-500text-white font-semibold py-2 px-4 rounded-lg"
//           >
//             Submit
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }
