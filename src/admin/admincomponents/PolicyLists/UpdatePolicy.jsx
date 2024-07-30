/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CgCloseR } from "react-icons/cg";
import VITE_DATA from "../../../config/config.jsx";
function UpdatePolicy({ policy, onUpdate }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        addpolicytype: "",
        addpolicytitle: "",
        addpolicydesc: "",
        addpolicyimage: "",
        addpolicycname: "",
        addpolicylogo: "",
    });

    // OPEN MODAL
    const openModal = () => {
        setIsModalOpen(true);
    };

    // CLOSE MODAL
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // show all data inside input tag
    useEffect(() => {
        setData(policy);
    }, [policy]);

    // handle input change
    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
    
        if (type === "file") {
          // Handle file uploads
          const file = e.target.files[0];
          setData((prevData) => ({
            ...prevData,
            [name]: file,
          }));
        } else {
          setData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        }
      };

    const updatePolicyAPI = async () => {
        try {
            setLoading(true);

            // Make an API call to update contact
            const response = await axios.put(
                `${VITE_DATA}/policies/update/${policy._id}`, // Update the URL with the correct endpoint
                data
            );
            toast.success(`${response.data.status}`)
            // Close the modal after successful update
            closeModal();
            onUpdate();
        } catch (error) {
            toast.error(`${error}`)
            console.error("Error updating Generated Salary:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={openModal}
                type="button"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2"
            >
                Edit
            </button>

            {isModalOpen && (
                <div
                    id="static-modal"
                    data-modal-backdrop="static"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed top-0 right-0 left-0 bottom-0 inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
                >
                    <div className="relative p-4 w-full max-w-6xl max-h-5xl mx-auto my-20">
                        {/* <!-- Modal content --> */}
                        <div className="relative bg-gradient-to-r from-blue-200 to-cyan-200 rounded-lg shadow dark:bg-slate-100">
                            {/* <!-- Modal header --> */}
                            <div className="flex items-center justify-between p-2 md:p-3 rounded-lg dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-black">
                                    Update Policy
                                </h3>
                                <button
                                    onClick={closeModal}
                                    type="button"
                                    className=" bg-transparent hover:text-red-500 text-slate-500  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                >
                                    <CgCloseR size={25} />
                                </button>
                            </div>
                            <section className="p-4 md:p-3 scroll-smooth hs-scroll-inside-viewport-modal rounded-lg max-h-auto text-justify overflow-y-auto bg-gradient-to-r from-slate-100 to-white">
                                <form className="flex flex-wrap ">
                                    {/* ... other form elements ... */}
                                    <div className="w-full lg:w-1/2 p-2 text-start">
                                        <div className="flex flex-col ">
                                            <label className="text-base mx-1">Policy Type:</label>
                                            <select
                                                className="input-style rounded-lg"
                                                type="text"
                                                value={data.addpolicytype}
                                                onChange={handleInputChange}
                                                name="addpolicytype"
                                            >
                                                <option value={data.addpolicytype}>
                                                    {data.addpolicytype}
                                                </option>

                                            </select>
                                        </div>
                                        <div className="flex flex-col my-5">
                                            <label className="text-base mx-1">Description:</label>
                                            <textarea
                                                className="input-style rounded-lg"
                                                type="text"
                                                rows="2"
                                                cols="4"
                                                value={data.addpolicydesc}
                                                onChange={handleInputChange}
                                                name="addpolicydesc"
                                            />
                                        </div>
                                        <div className="flex flex-col my-5">
                                            <label className="text-base mx-1">Company Name:</label>
                                            <input
                                                className="input-style rounded-lg"
                                                type="text"
                                                value={data.addpolicycname}
                                                onChange={handleInputChange}
                                                name="addpolicycname"
                                                placeholder="Enter Name"
                                            />
                                        </div>
                                    </div>


                                    {/* part-2 */}
                                    <div className="w-full lg:w-1/2 p-2 text-start">
                                        <div className="flex flex-col">
                                            <label className="text-base mx-1 ">Title:</label>
                                            <input
                                                className="input-style rounded-lg"
                                                type="text"
                                                value={data.addpolicytitle}
                                                onChange={handleInputChange}
                                                name="addpolicytitle"
                                                placeholder="Enter Title"
                                            />
                                        </div>
                                        <div className="flex flex-col my-6">
                                            <label className="text-base mx-1">Upload Image:</label>
                                            <input
                                                className="input-style border w-full h-12 items-center rounded-lg"
                                                type="file"
                                                accept="image/*"
                                                
                                                onChange={handleInputChange}
                                                name="addpolicyimage"
                                            />
                                        </div>
                                        <div className="flex flex-col my-6">
                                            <label className="text-base mx-1">Company Logo:</label>
                                            <input
                                                className="input-style border w-full h-12 items-center rounded-lg"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleInputChange}
                                                name="addpolicylogo"
                                            />
                                        </div>
                                    </div>


                                    <div className="w-full p-1 mt-2 justify-center flex">
                                        <button
                                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                            onClick={updatePolicyAPI}
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
            )}

        </>
    )
}

export default UpdatePolicy;