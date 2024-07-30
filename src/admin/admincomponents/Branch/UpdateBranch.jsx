/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import VITE_DATA from "../../../config/config.jsx";
// eslint-disable-next-line react/prop-types
function UpdateBranch({ branch, onUpdate, onClose }) {
    const [loading, setLoading] = useState(false);

    const [allDetails, setAllDetails] = useState({
        _id: "",
        branchid: "",
        concernperson: "",
        branchname: "",
        branchcode: "",
        branchemail: "",
        branchmobile: "",
        branchphone: "",
        branchaddress: "",
        branchdistrict: "",
        branchstate: "",
        branchpincode: "",
        password: ""
    });

    

    // show all data inside input tag
    useEffect(() => {
        setAllDetails(branch);
    }, [branch]);

    // handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAllDetails((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const updateBranchAPI = async () => {
        try {
            setLoading(true);

            // Make an API call to update contact
            const response = await axios.put(
                `${VITE_DATA}/api/branch/update/${branch._id}`, // Update the URL with the correct endpoint
                allDetails
            );

            toast.success(`${response.data.status}`)
            // Close the modal after successful update
            onClose();
            onUpdate();
        } catch (error) {
            toast.error(`${error}`)
            console.error("Error updating contact:", error);
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
                        <div className="relative bg-blue-700 rounded-lg shadow pb-4 px-4">
                            {/* <!-- Modal header --> */}
                            <div className="flex items-center justify-between p-2 md:p-3 rounded-lg ">
                                <h3 className="text-xl font-semibold text-gray-100">
                                    Update Branch
                                </h3>
                                <button
                                    onClick={onClose}
                                    type="button"
                                    className=" bg-transparent hover:bg-red-100 text-slate-100  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  "
                                >
                                    <img src="/close.png" className=" rounded-xl bg-clip-image text-transparent" height={5} width={25} alt="report"/>
                                </button>
                            </div>
                            <section className="p-4 md:p-3 scroll-smooth hs-scroll-inside-viewport-modal rounded-lg max-h-auto text-justify overflow-y-auto bg-gradient-to-r from-slate-100 to-white">
                                <form className="flex flex-wrap justify-between ">
                                
                                        <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
                                            <label className="text-base mx-1">Branch Code:</label>
                                            <input
                                                className="input-style p-1 rounded-lg"
                                                type="text"
                                                value={allDetails.branchcode.toUpperCase()}
                                                onChange={handleInputChange}
                                                name="branchcode"
                                                placeholder="Enter Branch Code"
                                            />
                                        </div>
                                        <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
                                            <label className="text-base  mx-1">Email ID:</label>
                                            <input
                                                className="input-style p-1 rounded-lg"
                                                type="email"
                                                value={allDetails.branchemail}
                                                onChange={handleInputChange}
                                                name="branchemail"
                                                placeholder="abc@gmail.com"
                                            />
                                        </div>
                                        <div className="flex flex-col  p-2 text-start w-full lg:w-1/4">
                                            <label className="text-base mx-1">Phone No:</label>
                                            <input
                                                className="input-style p-1 rounded-lg"
                                                type="number"
                                                value={allDetails.branchphone}
                                                onChange={handleInputChange}
                                                name="branchphone"
                                                placeholder=""
                                            />
                                        </div>
                                        <div className="flex flex-col  p-2 text-start w-full lg:w-1/4">
                                            <label className="text-base mx-1">District:</label>
                                            <input
                                                className="input-style p-1 rounded-lg"
                                                type="text"
                                                value={allDetails.branchdistrict}
                                                onChange={handleInputChange}
                                                name="branchdistrict"
                                                placeholder="Enter Your District Name"
                                            />
                                        </div>
                                        <div className="flex flex-col  p-2 text-start w-full lg:w-1/4">
                                            <label className="text-base mx-1">State:</label>
                                            <input
                                                className="input-style p-1 rounded-lg"
                                                type="text"
                                                value={allDetails.branchstate}
                                                onChange={handleInputChange}
                                                name="branchstate"
                                                placeholder="Enter Your State Name"
                                            />
                                        </div>
               
                                        <div className="flex flex-col  p-2 text-start w-full lg:w-1/4">
                                            <label className="text-base mx-1">Branch Name:</label>
                                            <input
                                                className="input-style p-1 rounded-lg"
                                                type="text"
                                                value={allDetails.branchname}
                                                onChange={handleInputChange}
                                                name="branchname"
                                                placeholder="Enter Branch Name"
                                            />
                                        </div>
                                        <div className="flex flex-col  p-2 text-start w-full lg:w-1/4">
                                            <label className="text-base mx-1">Mobile No:</label>
                                            <input
                                                className="input-style p-1 rounded-lg"
                                                type="number"
                                                value={allDetails.branchmobile}
                                                onChange={handleInputChange}
                                                name="branchmobile"
                                                placeholder="+91"
                                            />
                                        </div>
                                        <div className="flex flex-col  p-2 text-start w-full lg:w-1/4">
                                            <label className="text-base mx-1">Pincode:</label>
                                            <input
                                                className="input-style p-1 rounded-lg"
                                                type="text"
                                                value={allDetails.branchpincode}
                                                onChange={handleInputChange}
                                                name="branchpincode"
                                                placeholder="805110"
                                            />
                                        </div>
                                        <div className="flex flex-col  p-2 text-start w-full lg:w-1/4">
                                            <label className="text-base mx-1">Concern Person:</label>
                                            <input
                                                className="input-style p-1 rounded-lg"
                                                type="text"
                                                value={allDetails.concernperson}
                                                onChange={handleInputChange}
                                                name="concernperson"
                                                placeholder="Enter Name"
                                            />
                                        </div>
                                        <div className="flex flex-col  p-2 text-start w-full lg:w-1/2">
                                            <label className="text-base mx-1">Address:</label>
                                            <textarea
                                                className="input-style rounded-lg"
                                                type="text"
                                                rows={2}
                                                value={allDetails.branchaddress}
                                                onChange={handleInputChange}
                                                name="branchaddress"
                                                placeholder="Enter Your Address"
                                            />
                                        </div>
                                        <div className="flex flex-col  p-2 text-start w-full lg:w-1/4"></div>
                                    <div className="w-full p-1 mt-2 justify-center flex">
                                        <button
                                            className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded text-sm px-5 py-2 my-2 text-center"
                                            onClick={updateBranchAPI}
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

export default UpdateBranch;
