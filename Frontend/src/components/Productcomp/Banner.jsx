import React from 'react';

const Banner = () => {
  return (
    <>
      
      <div className="relative w-full px-48 py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* Left : Image */}
            <div className="flex justify-center h-[600px]">
              <div className="w-full h-full bg-gray-300 rounded-2xl animate-pulse">
                <div className="w-full h-full bg-gray-300 rounded-2xl"></div>
              </div>
            </div>

            {/* Right : Details */}
            <div className="flex flex-col justify-between m-10">
              <div className=" mb-4">
                <div className="h-10 bg-gray-200 rounded-full max-w-[400px] mb-4 animate-pulse"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-[500px] mb-2.5 animate-pulse"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-[460px] mb-2.5 animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded-full max-w-[380px] mb-2.5 animate-pulse"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-[460px] animate-pulse"></div>
                
              </div>

              <div className="mt-6 space-y-4">
                <div className="h-2 bg-gray-200 rounded-full max-w-[460px] mb-2.5 animate-pulse"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-[450px] mb-2.5 animate-pulse"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-[460px] mb-2.5 animate-pulse"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-[500px] mb-2.5 animate-pulse"></div>
              </div>

              <span className="sr-only">Loading...</span>
            </div>
          </div>
          <div className="mt-6 space-y-4 ">
                <div className="h-2 bg-gray-200 rounded-full max-w-full mb-2.5 animate-pulse"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-full mb-2.5 animate-pulse"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-full mb-2.5 animate-pulse"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-full mb-2.5 animate-pulse"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-full mb-2.5 animate-pulse"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-full mb-2.5 animate-pulse"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-full mb-2.5 animate-pulse"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-full mb-2.5 animate-pulse"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-full mb-2.5 animate-pulse"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-full mb-2.5 animate-pulse"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-full mb-2.5 animate-pulse"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-full mb-2.5 animate-pulse"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-full mb-2.5 animate-pulse"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-full mb-2.5 animate-pulse"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-full mb-2.5 animate-pulse"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-full mb-2.5 animate-pulse"></div>
                
                
              </div>

              <span className="sr-only">Loading...</span>
        </div>
        
      </div>
    </>
  );
}

export default Banner;
