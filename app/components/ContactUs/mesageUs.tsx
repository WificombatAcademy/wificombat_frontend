import HeadingDesign from "../general/HeaderDesign"


export const MessageUs = () => {
    return (
        <>
        <HeadingDesign heading="MESSAGE US"/>
        <div className="py-10 md:py-14 lg:py-20">
          <div className="mt-16">
            <div>
              <form className="space-y-6">
                <>
                <div className="">
                  <div className="w-full">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Your name
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        type="email"
                        placeholder="your name"
                        className="block outline-none w-60 rounded-md border border-gray-600 py-2 px-2 shadow-sm ring-1 
                          ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset 
                          focus:ring-purple-600 sm:text-sm sm:leading-6"
                       
                      />
                    
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email Address
                    </label>
                    <div className="mt-2 relative">
                     
                      <input
                        placeholder="email address"
                        className="block outline-none w-60 rounded-md border border-gray-600 py-2 px-2 shadow-sm ring-1 
                          ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset 
                          focus:ring-purple-600 sm:text-sm sm:leading-6"
                       
                      />
        
                    
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone Number (option)
                    </label>
                    <div className="mt-2 relative">
                     
                      <input
                        placeholder="Mobile number"
                        type="number"
                        className="block outline-none w-60 rounded-md border border-gray-600 py-2 px-2 shadow-sm ring-1 
                          ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset 
                          focus:ring-purple-600 sm:text-sm sm:leading-6"
                       
                      />
        
                    
                    </div>
                  </div>
  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Your message
                    </label>
                    <div className="mt-2 relative">
                     
                      <input
                        placeholder="Enter a description"
                        className="block outline-none w-96 rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 
                          ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset 
                          focus:ring-purple-600 sm:text-sm sm:leading-6"
                       
                      />
                    </div>
                  </div>



                  <div className="mt-14">
                    <button
                      type="submit"
                      className="bg-black text-white p-3 rounded"
                     >

                    Leave us a message
                
                    </button>
                  </div>
                </>
              </form>

           
            </div>
          </div>
        </div>
       </>
    )
}