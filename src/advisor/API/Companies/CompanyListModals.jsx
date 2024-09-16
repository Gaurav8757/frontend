import { useState } from "react";
import { useNavigate } from "react-router-dom";
/* eslint-disable react/prop-types */
function CompanyListModals({ closeModal, insuranceName, logos, categories }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    // Set subcategories based on the selected category passed from props
    const subCats = categories[category];
    // Redirect to the new page with the subcategories and selected category
    navigate(`/advisor/${insuranceName}/${category}`, {
      state: { subCategories: subCats, logos, insuranceName },
    });
  };
  
  if (!closeModal) return null;

  return (
    <>
      <div className="fixed inset-0 sm:ml-48 backdrop-blur-lg  flex items-center justify-center bg-gray-800 bg-opacity-75">
        <div className="relative p-1 w-full max-w-7xl max-h-full ">
          <div className="relative flex flex-col bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-3 px-4 md:p-1 md:px-6 border-b rounded-t">
              <div className="flex my-auto items-center">
                <img
                  className="md:w-16 md:h-14 w-8 h-8 me-2 md:me-3 rounded-sm hover:shadow-inner"
                  src={logos}
                  alt={insuranceName}/>
                <h3 className="text-sm md:text-xl uppercase tracking-wider font-bold font-sans text-gray-900">
                  {insuranceName}
                </h3>
              </div>

              {/* <div>
                Select Your Desired Insurance
              </div> */}
              <div>
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-400 bg-transparent hover:bg-blue-200 hover:text-gray-900 rounded-lg text-sm h-10 w-10 ms-auto inline-flex justify-center items-center"
                >
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="blue"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
            </div>

            <div className="p-3 md:p-3 capitalize">
              <div className="mb-4 flex justify-between  text-xl font-bold font-mono text-black list-none mx-2">
                <div
                  className={`cursor-pointer  w-48 md:w-64 lg:w-64 ml-4 md:ml-0 h-32 md:h-64 lg:h-64 rounded-full bg-white hover:shadow-2xl hover:shadow-black hover:-translate-y-1 active:-translate-y-4  transition-all duration-300`}
                  onClick={() => handleCategorySelect("motor")}>
                  <img
                    className={`w-auto ${
                      selectedCategory === "motor"
                        ? "text-blue-700 border-b-2 border-red-600"
                        : "border-b-2 border-transparent"
                    } rounded-full h-auto hover:shadow-inner`}
                    src="/motor.png"
                    alt="motor"
                  />
                </div>
                <div
                  className={`cursor-pointer  w-48 md:w-64 lg:w-64  ml-4 md:ml-0 h-32 md:h-64 lg:h-64 rounded-full bg-white   hover:shadow-2xl hover:shadow-black hover:-translate-y-1 active:-translate-y-4 transition-all duration-300`}
                  onClick={() => handleCategorySelect("nonmotor")}
                >
                  <img
                    className={`w-auto  ${
                      selectedCategory === "nonnotor"
                        ? "text-blue-700 border-b-2 border-red-600"
                        : "border-b-2 border-transparent"
                    } rounded-full h-auto hover:shadow-inner `}
                    src="/nonmotors.png"
                    alt="nonmotor"
                  />
                </div>
                <div
                  className={`cursor-pointer w-48 md:w-64 lg:w-64 ml-4 md:ml-0  h-32 md:h-64 lg:h-64 rounded-full bg-white hover:shadow-2xl hover:shadow-black hover:-translate-y-1 active:-translate-y-4 transition-all duration-300`}
                  onClick={() => handleCategorySelect("health")}
                >
                  <img
                    className={`w-auto  ${
                      selectedCategory === "health"
                        ? "text-blue-700 border-b-2 border-blue-600"
                        : "border-b-2 border-transparent"
                    } rounded-full h-auto hover:shadow-inner`}
                    src="/healths.png"
                    alt="health"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CompanyListModals;
