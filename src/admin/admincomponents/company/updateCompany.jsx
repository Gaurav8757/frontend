/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
// import {useParams} from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import VITE_DATA from "../../../config/config.jsx";
let homesection = [
  {
    title: "Health Insurance",
    images: "/health.png",
    links: "/healthinsurance",
    subItems: [
      {
        subtitle: "Health Insurance",
        image: "/heart.png",
        link: "/healthinsurance",
      },
      {
        subtitle: "Employee Group Health Insurance",
        image: "/group.png",
        link: "/grouphealthinsurance",
      },
      {
        subtitle: "Family Health Insurance",
        image: "/family.png",
        link: "/familyhealthinsurance",
      },
      // Add more subItems as needed
    ],
  },
  {
    title: "Motor Insurance",
    images: "/Motor-Insurance.png",
    links: "/motorinsurance",
    subItems: [
      {
        subtitle: "Car Insurance",
        image: "/car.png",
        link: "/carinsurance",
      },
      {
        subtitle: "2 Wheeler Insurance",
        image: "/bike.png",
        link: "/twowheelinsurance",
      },
      {
        subtitle: "Commercial Vehicle Insurance",
        image: "/tempo.png",
        link: "/commercialinsurance",
      },
      // Add more subItems as needed
    ],
  },
  {
    title: "Non-motor Insurance",
    images: "/nonmotor.png",
    links: "/nonmotorinsurance",
    subItems: [
      {
        subtitle: "Travel Insurance",
        image: "/flight.png",
        link: "/travelinsurance",
      },
      {
        subtitle: "Home Insurance",
        image: "/home.png",
        link: "/homeinsurance",
      },
      {
        subtitle: "Business Insurance",
        image: "/money.png",
        link: "/businessinsurance",
      }, {
        subtitle: "Marine Insurance",
        image: "/marine.png",
        link: "/marineinsurance",
      },
      // Add more subItems as needed
    ],
  },
]

function UpdateCompanyModal({ datas, onUpdate, onClose }) {
  const [loading, setLoading] = useState(false);
  const [companyData, setCompanyData] = useState({
    comp_cname: "",
    comp_insurance: "",
    comp_categories: "",
    // comp_establishment: "",
    comp_cfiles: null
  });

  


  const handleInputChange = (e) => {
    const { name, value,files } = e.target;
    if (name === 'comp_cfiles' && files && files.length > 0) {
      // If it's a file input, handle it separately
      setCompanyData((prevData) => ({
        ...prevData,
        [name]: files[0],  // Set the file directly
      }));
    }
    
    else {
      setCompanyData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  }


    // show all data inside input tag
    useEffect(() => {
      setCompanyData(datas);
    }, [datas]);



    const updateCompanyData = async () => {
      // e.preventDefault();
      try {
        setLoading(true);
        const formData = new FormData();

        // Append all fields to FormData
        Object.entries(companyData).forEach(([key, value]) => {
          formData.append(key, value);
        });
        // Use the selected category ID in the patch method
        const resp = await axios.put(`${VITE_DATA}/api/company/updatecomp/${datas._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(resp.data);
        toast.success(`${resp.data.status}`)
        onClose(); // Close the modal after successful submissi
        onUpdate();
      } catch (error) {
        console.error("Error updating company:", error);
      } finally {
        setLoading(false);
      }
    };

    return (
      <>
      
          <div
            id="static-modal"
            data-modal-backdrop="static"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed top-0 right-0 left-0 bottom-0 inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-6xl max-h-5xl mx-auto my-20">
              {/* <!-- Modal content --> */}
              <div className="relative bg-gradient-to-r from-blue-700 to-blue-700 rounded-lg shadow ">
                {/* <!-- Modal header --> */}
                <div className="flex items-center justify-between p-2 md:p-3 rounded-lg dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-blue-700">
                    Update Homepage Company Details
                  </h3>
                  <button
                    onClick={onClose}
                    type="button"
                    className=" bg-transparent hover:bg-red-100 text-slate-100  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  ">
                    <img src="/close.png" height={5} width={25} alt="close" className="hover:bg-red-100 rounded-full"/>
                  </button>
                </div>



                {/* <!-- Modal body --> */}
                <section className="p-4 md:p-3 scroll-smooth hs-scroll-inside-viewport-modal rounded-lg max-h-auto text-justify overflow-y-auto bg-gradient-to-r from-orange-800 to-orange-800  ">
                  <form className="flex flex-wrap" method="post" encType="multipart/form-data">
                    <div className="w-full lg:w-1/2 p-2 text-start">

                      <div className="flex flex-col ">
                        <label className="text-base mx-1">Insurance Type:</label>
                        <select
                          className="input-style rounded-lg"
                          type="text"
                          name="comp_insurance"
                          value={companyData.comp_insurance}
                          onChange={handleInputChange}
                        >
                          <option value="" disabled>
                            ----- Select Insurance Type-----
                          </option>
                          {homesection.map((ins, idx) => (
                            <option key={idx}>
                              {ins.title}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex flex-col my-5">
                        <label className="text-base mx-1">Company Name:</label>
                        <input
                          className="input-style rounded-lg"
                          type="text"
                          name="comp_cname"
                          value={companyData.comp_cname}
                          onChange={handleInputChange}
                          placeholder="Enter Company Name"

                        />
                      </div>

                      {/* <div className="flex flex-col my-5">
                        <label className="text-base mx-1">Establishment Year:</label>
                        <input
                          className="input-style rounded-lg"
                          type="date"
                          name="comp_establishment"
                          value={companyData.comp_establishment}
                          onChange={handleInputChange}
                        />
                      </div> */}
                    </div>
                    {/* part-2 */}
                    <div className="w-full lg:w-1/2 p-2 text-start">
                      <div className="flex flex-col ">
                        <label className="text-base mx-1">Category:</label>
                        <select
                          className="input-style rounded-lg"
                          type="text"
                          name="comp_categories"
                          value={companyData.comp_categories}
                          onChange={handleInputChange}
                        >
                          <option value="" disabled>
                            ----- Select Category -----
                          </option>
                          {/* Map categories based on selected insurance type */}
                          {companyData.comp_insurance &&
                            homesection
                              .find((ins) => ins.title === datas.comp_insurance)
                              ?.subItems.map((subItem, idx) => (
                                <option key={idx} value={subItem.subtitle}>
                                  {subItem.subtitle}
                                </option>
                              ))}
                        </select>
                      </div>

                      <div className="flex flex-col my-5">
                        <label className="text-base mx-1">Plan:</label>
                        <input
                          className="input-style border w-full h-10 items-center rounded-lg"
                          type="file"
                          name="comp_cfiles"
                          accept="/*"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="w-full flex justify-center p-2">
                      <button
                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2"
                        onClick={updateCompanyData}
                        type="button"
                      >
                        {loading ? "Submitting..." : "Submit"}
                      </button>
                    </div>
                  </form>
                </section>
              </div>
            </div>
          </div>
       
      </>
    );
  }
  export default UpdateCompanyModal;
