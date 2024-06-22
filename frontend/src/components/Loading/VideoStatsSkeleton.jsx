import React from "react";

function VideoStatsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="overflow-x-auto rounded-lg md:block hidden">
        <table className="w-full min-w-[1200px] border-collapse border text-white">
          <thead>
            <tr>
              {[...Array(4)].map((_, index) => (
                <th key={index} className="border-collapse border-b p-4">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(4)].map((_, rowIndex) => (
              <tr key={rowIndex} className="group border">
                <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none whitespace-nowrap">
                  <div className="flex justify-center">
                    <div className="w-12 h-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                  </div>
                </td>
                <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none whitespace-nowrap">
                  <div className="flex justify-center">
                    <div className="w-20 h-6 bg-gray-300 dark:bg-gray-700 rounded-2xl"></div>
                  </div>
                </td>
                <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-14 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32"></div>
                  </div>
                </td>
                <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none whitespace-nowrap">
                  <div className="flex justify-center">
                    <div className="w-16 h-6 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
                  </div>
                </td>
                <td className="text-center border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none whitespace-nowrap">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24 mx-auto"></div>
                </td>
                <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none whitespace-nowrap">
                  <div className="flex gap-4 justify-center">
                    <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden flex flex-wrap justify-between">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
            <div className="flex flex-col border-white border border-dashed rounded-lg shadow-md overflow-hidden">
              <div className="p-4 gap-3 flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="h-10 w-14 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32"></div>
                  </div>
                  <div className="w-12 h-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                </div>
                <div className="flex gap-3">
                  <div className="w-20 h-6 bg-gray-300 dark:bg-gray-700 rounded-2xl"></div>
                  <div className="w-16 h-6 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32"></div>
                  <div className="flex gap-4">
                    <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoStatsSkeleton;
