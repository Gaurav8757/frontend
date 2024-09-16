import CompanyListModals from "./CompanyListModals";
import {NavLink} from "react-router-dom";
import Data from "../Data";
import { useState } from "react";
function AllCompanyName() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInsurance, setSelectedInsurance] = useState({
    name: "",
    categories: [],
    image: ""
  });

  const toggleModal = (insuranceName, categories, image) => {
    setSelectedInsurance({ name: insuranceName, categories: categories, image: image });
    setIsModalOpen(!isModalOpen);
  };
  return (
    // <div className="flex justify-center lg:p-8 p-2 md:p-6 flex-wrap gap-2 md:gap-6 lg:gap-10 ">
    //   {Data.GeneralInsurance.map((item, index) => (
    //     <NavLink to={item.links}
    //       key={index}
    //       className="w-48 md:w-64 lg:w-72  h-48 md:h-64 lg:h-72  bg-white border border-gray-200 rounded-md hover:shadow-2xl hover:shadow-black active:-translate-y-6 duration-150">
    //       <div className="flex justify-center hover:shadow-inner items-center">
    //         <img
    //           className="w-auto h-auto hover:shadow-inner"
    //           src={item.image}
    //           alt={item.name}
    //         />
    //       </div>
    //     </NavLink>
    //   ))}
    // </div>
    <div className="flex sm:ml-48 bg-slate-100  mx-auto justify-evenly">
      {/* General Insurance */}
      <div className="">
        <h2 className="text-lg md:py-4 text-start px-7 md:text-2xl lg:text-3xl font-mono py-1 font-bold">
          General Insurance
        </h2>
        <div className="flex justify-center lg:p-0.5 p-2 md:p-6 flex-wrap gap-6 md:gap-6 lg:gap-12">
          {Data.GeneralInsurance.map((item, index) => (
            <button
              onClick={() => toggleModal(item.name, item.categories, item.image)}
              key={index}
              className="w-48 md:w-64 lg:w-64  h-48 md:h-64 lg:h-64  bg-white  rounded-md hover:shadow-2xl hover:shadow-black hover:-translate-y-1 active:-translate-y-4 duration-150"
            >
              <img
                className="w-auto rounded-md h-auto hover:shadow-inner"
                src={item.image}
                alt={item.name}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Health Insurance */}
      {/* <div className="my-5">
        <h2 className="text-lg text-start md:py-4 px-7  md:text-2xl lg:text-3xl font-mono py-1 font-bold">
          Health Insurance
        </h2>
        <div className="flex justify-center  lg:p-0.5 p-2 md:p-6 flex-wrap gap-6 md:gap-6 lg:gap-12">
          {Data.HealthInsurance.map((item, index) => (
            <div
              key={index}
              className="w-48 md:w-64 lg:w-72  h-48 md:h-64 lg:h-72 bg-white  border-gray-200 rounded-md hover:shadow-2xl hover:shadow-black  hover:-translate-y-1 active:-translate-y-4 duration-150"
            >
              <img
                className="w-auto h-auto rounded-md hover:shadow-inner"
                src={item.image}
                alt={item.name}
              />
            </div>
          ))}
        </div>
      </div> */}

      {/* Life Insurance */}
      <div className="">
        <h2 className="text-lg text-start px-6 xl:px-20 md:text-2xl lg:text-3xl font-mono md:py-4 py-1 font-bold">
          Life Insurance
        </h2>
        <div className="flex justify-center lg:p-0.5 px-6 py-2 md:p-6 flex-wrap gap-6 md:gap-6 lg:gap-10">
          {Data.LifeInsurance.map((item, index) => (
            <NavLink
             to= {item.links}
             target="_blank"
              key={index}
              className="w-48 md:w-64 lg:w-64  h-48 md:h-64 lg:h-64 bg-white  border-gray-200 rounded-md hover:shadow-2xl hover:shadow-black  hover:-translate-y-1 active:-translate-y-4 duration-150"
            >
              <img
                className="w-auto h-auto rounded-md hover:shadow-inner"
                src={item.image}
                alt={item.name}
              />
            </NavLink>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <CompanyListModals
          insuranceName={selectedInsurance.name}
          logos= {selectedInsurance.image}
          categories={selectedInsurance.categories}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default AllCompanyName;
