/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import VITE_DATA from "../../../config/config.jsx";
function UpdateAdvisor({ advisor, onUpdate, onClose }) {
    const [loading, setLoading] = useState(false);
    const [advInfo, setAdvInfo] = useState({
        advisorname: "",
        advisoremail: "",
        advisormobile: "",
        advisorpassword: "",
        uniqueId: "",
        advisortype: ""
    })
 

    // show all data inside input tag
    useEffect(() => {
        setAdvInfo(advisor);
    }, [advisor]);

    // handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAdvInfo((prevData) => ({
            ...prevData,
            [name]: value.toUpperCase(),
        }));
    };

    const updateAdvisorAPI = async () => {
        try {
            setLoading(true);

            // Make an API call to update contact
            const response = await axios.put(
                `${VITE_DATA}/advisor/update/${advisor._id}`, // Update the URL with the correct endpoint
                advInfo
            );

            toast.success(`${response.data.status}`)
            // Close the modal after successful update
            onClose();
            onUpdate();
        } catch (error) {
            toast.error(`${error}`)
            console.error("Error updating Advisor:", error);
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
                    className="fixed top-0 right-0 left-0 bottom-0 inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
                >
                    <div className="relative p-4 w-full max-w-6xl max-h-5xl mx-auto my-20">
                        {/* <!-- Modal content --> */}
                        <div className="relative bg-gradient-to-r from-blue-700 to-blue-700 rounded-lg shadow pb-4 px-4">
                            {/* <!-- Modal header --> */}
                            <div className="flex items-center justify-between p-0 md:p-2 rounded-lg ">
                                <h3 className="text-xl font-semibold text-gray-100">
                                    Update Advisor Details
                                </h3>
                                <button
                                    onClick={onClose}
                                    type="button"
                                    className=" bg-transparent hover:bg-red-100 text-slate-100  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  ">
                                    <img src="/close.png" height={5} width={25} alt="close" className="hover:bg-red-100 rounded-full"/>
                                </button>
                            </div>
                            <section className="p-4 md:p-3 scroll-smooth hs-scroll-inside-viewport-modal rounded-lg max-h-auto text-justify overflow-y-auto bg-gradient-to-r from-slate-100 to-white">
                                <form className="flex flex-wrap font-semibold">
                                    {/* ... other form elements ... */}
                                    {/* <div className="w-full lg:w-1/2 p-2 text-start"> */}

                                    <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
                                        <label className="text-base mx-1">ID:</label>
                                        <input
                                            className="input-style p-1 rounded-lg"
                                            type="text"
                                            value={advInfo.uniqueId}
                                            onChange={handleInputChange}
                                            name="uniqueId"
                                            placeholder="Enter UniqueID"
                                        />
                                    </div>

                                    <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
                                        <label className="text-base mx-1">Name:</label>
                                        <input
                                            className="input-style p-1 rounded-lg"
                                            type="text"
                                            value={advInfo.advisorname}
                                            onChange={handleInputChange}
                                            name="advisorname"
                                            placeholder="Enter Name"
                                        />
                                    </div>
                                    <div className="flex flex-col  p-2 text-start w-full lg:w-1/4">
                                        <label className="text-base mx-1">Mobile No:</label>
                                        <input
                                            className="input-style p-1 rounded-lg"
                                            type="number"
                                            value={advInfo.advisormobile}
                                            onChange={handleInputChange}
                                            name="advisormobile"
                                            placeholder="+91"
                                        />
                                    </div>
                                    {/* </div> */}


                                    {/* part-2 */}
                                    {/* <div className="w-full lg:w-1/2 p-2 text-start"> */}
                                    <div className="flex flex-col  p-2 text-start w-full lg:w-1/4">
                                        <label className="text-base mx-1">Email ID:</label>
                                        <input
                                            className="input-style p-1 rounded-lg"
                                            type="email"
                                            value={advInfo.advisoremail}
                                            onChange={handleInputChange}
                                            name="advisoremail"
                                            placeholder="abc@gmail.com"
                                        />
                                    </div>
                                    <div className="flex flex-col my-4 p-2 text-start w-full lg:w-1/4">
                                        <label className="text-base mx-1">Advisor Payout Type:</label>
                                        <select
                                            className="input-style p-1 rounded-lg"
                                            type="text"
                                            value={advInfo.advisortype}
                                            name="advisortype"
                                            onChange={handleInputChange}>
                                            <option value="">------ Select Payout Type --------</option>
                                            <option value="DAILY">Daily Payout</option>
                                            <option value="MONTHLY">Monthly Payout</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col my-4 p-2 text-start w-full lg:w-1/4">
                                        <label className="text-base mx-1">Address:</label>
                                        <input
                                            className="input-style p-1 rounded-lg"
                                            type="text"
                                            value={advInfo.advisoraddress}
                                            onChange={handleInputChange}
                                            name="advisoraddress"
                                            placeholder=""
                                        />
                                    </div>




                                    <div className="w-full p-1 mt-2 justify-center flex">
                                        <button
                                            className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300  shadow-lg shadow-green-500/50 font-medium rounded text-sm px-4 py-2 text-center "
                                            onClick={updateAdvisorAPI}
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


    )
}

export default UpdateAdvisor;