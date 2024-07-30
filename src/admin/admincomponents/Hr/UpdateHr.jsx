/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CgCloseR } from "react-icons/cg";
import VITE_DATA from "../../../config/config.jsx";
function UpdateHr({ hr, onUpdate }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        hrid: "",
        hrname: "",
        hremail: "",
        hrmobile: "",
        hrgender: "",
        hrdob: "",
        hrjoiningdate: "",
        empbranch: "",
        permanenthraddress: "",
        currenthraddress: "",
        hraadharno: "",
        hrdesignation: "",
        hraadharfile: ""
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
        setData(hr);
    }, [hr]);

    // handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const updateHRAPI = async () => {
        try {
            setLoading(true);

            // Make an API call to update contact
            const response = await axios.put(
                `${VITE_DATA}/hr/update/${hr._id}`, // Update the URL with the correct endpoint
                data
            );

            toast.success(`${response.data.status}`)
            // Close the modal after successful update
            closeModal();
            onUpdate();
        } catch (error) {
            toast.error(`${error}`)
            console.error("Error updating HR:", error);
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
                                    Update HR Details
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
                                        <div className="flex flex-col">
                                            <label className="text-base mx-1 ">Name:</label>
                                            <input
                                                className="input-style rounded-lg"
                                                type="text"
                                                value={data.hrname}
                                                onChange={handleInputChange}
                                                name="hrname"
                                                placeholder="Enter Name"
                                            />
                                        </div>

                                        <div className="flex flex-col my-5">
                                            <label className="text-base mx-1">DOB:</label>
                                            <input
                                                className="input-style rounded-lg"
                                                type="date"
                                                value={data.hrdob}
                                                onChange={handleInputChange}
                                                name="hrdob"
                                                placeholder="Enter Branch Code"
                                            />
                                        </div>

                                        <div className="flex flex-col my-5">
                                            <label className="text-base mx-1">Mobile No:</label>
                                            <input
                                                className="input-style rounded-lg"
                                                type="number"
                                                min="1"
                                                value={data.hrmobile}
                                                onChange={handleInputChange}
                                                name="hrmobile"
                                                placeholder="+91"
                                            />
                                        </div>

                                        <div className="flex flex-col my-5">
                                            <label className="text-base mx-1">Aadhar No.:</label>
                                            <input
                                                className="input-style rounded-lg"
                                                type="text"
                                                value={data.hraadharno}
                                                onChange={handleInputChange}
                                                name="hraadharno"
                                                placeholder=""
                                            />
                                        </div>

                                        <div className="flex flex-col my-5">
                                            <label className="text-base mx-1">Joining Date:</label>
                                            <input
                                                className="input-style rounded-lg"
                                                type="date"
                                                value={data.hrjoiningdate}
                                                onChange={handleInputChange}
                                                name="hrjoiningdate"
                                                placeholder=""
                                            />
                                        </div>

                                        <div className="flex flex-col my-5">
                                            <label className="text-base mx-1">Current Address:</label>
                                            <textarea
                                                className="input-style rounded-lg"
                                                type="text"
                                                rows={2}
                                                name="currenthraddress"
                                                value={data.currenthraddress}
                                                onChange={handleInputChange}
                                                placeholder="Enter Your Address"
                                            />
                                        </div>

                                       


                                    </div>


                                    {/* part-2 */}
                                    <div className="w-full lg:w-1/2 p-2 text-start">
                                        <div className="flex flex-col ">
                                            <label className="text-base mx-1">Gender:</label>
                                            <select
                                                className="input-style rounded-lg"
                                                type="text"
                                                value={data.hrgender}
                                                onChange={handleInputChange}
                                                name="hrgender"
                                                placeholder="Enter Your District Name"
                                            >
                                                <option value="">----- Select Gender -----</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Others">Others</option>
                                            </select>

                                        </div>

                                        <div className="flex flex-col my-5">
                                            <label className="text-base mx-1">Email ID:</label>
                                            <input
                                                className="input-style rounded-lg"
                                                type="email"
                                                name="hremail"
                                                value={data.hremail}
                                                onChange={handleInputChange}
                                                placeholder="abc@gmail.com"
                                            />
                                        </div>
                                        {/* <div className="flex flex-col my-5">
                                            <label className="text-base mx-1">HR Id:</label>
                                            <input
                                                className="input-style rounded-lg"
                                                type="text"
                                                name="hrid"
                                                value={data.hrid}
                                                onChange={handleInputChange}
                                                placeholder="s-12"
                                            />
                                        </div> */}

                                        <div className="flex flex-col my-5">
                                            <label className="text-base mx-1">Update Aadhar Card:</label>
                                            <input
                                                className="input-style border w-full h-10 items-center rounded-lg"
                                                type="file"
                                                accept="/*" //accepting all type of images
                                                onChange={handleInputChange}
                                                name="hraadharfile"
                                            />
                                        </div>

                                        <div className="flex flex-col ">
                                            <label className="text-base mx-1">  Branch:</label>
                                            <select
                                                className="input-style rounded-lg"
                                                type="text"
                                                value={data.empbranch}
                                                onChange={handleInputChange}
                                                name="hrbranch"
                                                placeholder="Enter Branch Name"
                                            >
                                                {/* {data.map((branchItem) => ( */}
                                                    <option value={data.hrbranch}>
                                                        {data.hrbranch}
                                                    </option>
                                                {/* ))} */}
                                            </select>
                                        </div>
                                        <div className="flex flex-col my-5">
                                            <label className="text-base mx-1">Designation:</label>
                                            <input
                                                className="input-style rounded-lg"
                                                type="text"

                                                value={data.hrdesignation}
                                                onChange={handleInputChange}
                                                name="hrdesignation"
                                                placeholder=""
                                            />
                                        </div>
                                        <div className="flex flex-col my-5">
                                            <label className="text-base mx-1">Permanent Address:</label>
                                            <textarea
                                                className="input-style rounded-lg"
                                                type="text"
                                                rows={2}
                                                value={data.permanenthraddress}
                                                onChange={handleInputChange}
                                                name="permanenthraddress"
                                                placeholder="Enter Your Address"
                                            />
                                        </div>
                                    </div>


                                    <div className="w-full p-1 mt-2 justify-center flex">
                                        <button
                                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                            onClick={updateHRAPI}
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


export default UpdateHr;