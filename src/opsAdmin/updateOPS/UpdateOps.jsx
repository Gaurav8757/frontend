/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import VITE_DATA from "../../config/config.jsx";
// import { CgCloseR } from "react-icons/cg";

function UpdateOps({ UpdateOps, update, APIData }) {
    // console.log(UpdateOps);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState(getFormattedTime());
    const [allDetails, setAllDetails] = useState({
        entryDate: '',
        branch: '',
        insuredName: '',
        contactNo: '',
        staffName: '',
        currentTime: '',
        employee_id: ''
    });

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false)

    function getFormattedTime() {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(getFormattedTime());
        }, 100);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        setAllDetails(UpdateOps);
    }, [UpdateOps]);

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     const selectedEmployee = APIData.find(emp => emp.empname === value);
    //     console.log(selectedEmployee);
    //     setAllDetails((prevData) => ({
    //         ...prevData,
    //         employee_id: selectedEmployee ? selectedEmployee._id : '',
    //         currentTime: currentTime,
    //         [name]: value,
    //     }));

    // };

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     const selectedEmployee = APIData.find(emp => emp.empname === value) || {};

    //     setAllDetails((prevData) => ({
    //         ...prevData,
    //         employee_id: selectedEmployee._id || '',
    //         currentTime: currentTime,
    //         [name]: value,
    //     }));
    // };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let updatedDetails = {
            ...allDetails,
            currentTime: currentTime,
            [name]: value,
        };

        if (name === "staffName") {
            const selectedEmployee = APIData.find(emp => emp.empname === value) || {};
            updatedDetails.employee_id = selectedEmployee._id || '';
        }

        setAllDetails(updatedDetails);
    };

    const updateInsuranceAPI = async () => {
        try {
            const resp = await axios.put(`${VITE_DATA}/alldetails/updatedata/${UpdateOps._id}`, allDetails);
            toast.success(`${resp.data.status}`);
            update();
            closeModal();
        } catch (error) {
            console.error("Error updating policy details:", error);
            toast.error("Failed to update policy details");
        }
    };


    return (
        <>
            <button onClick={openModal} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded text-sm px-2 py-1 text-center m-1">
                Update
            </button>

            {isModalOpen && (
                <div
                    id="static-modal"
                    data-modal-backdrop="static"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed top-0 right-0 left-0 bottom-0 inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
                >
                    <div className="relative p-1 w-full max-w-6xl max-h-7xl mx-auto mt-40">
                        <div className="relative bg-gradient-to-r from-orange-800 to-orange-800 rounded-lg shadow">
                            <div className="flex items-center justify-between p-2 md:p-3 rounded-lg dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-100">
                                    Update Policy Details
                                </h3>
                                <button
                                    onClick={closeModal}
                                    type="button"
                                    className=" bg-transparent hover:bg-red-100 text-slate-100  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  ">
                                    <img src="/close.png" height={5} width={25} alt="close" className="hover:bg-red-100 rounded-full" />
                                </button>
                            </div>
                            <section className="p-4 md:p-3 scroll-smooth hs-scroll-inside-viewport-modal rounded-lg max-h-auto text-justify overflow-y-auto bg-gradient-to-r from-orange-800 to-orange-800">
                                <div className="container-fluid flex justify-center p-1 border-gray-200 border-dashed rounded-lg bg-white">
                                    <div className="relative w-full lg:w-full p-4 lg:p-1 rounded-xl shadow-xl text-2xl items-center bg-slate-200">
                                        <div className="flex flex-wrap justify-between">
                                            <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
                                                <label className="text-base mx-1">Entry Date:</label>
                                                <input
                                                    className="input-style p-1 text-base rounded-lg"
                                                    type="date"
                                                    value={allDetails.entryDate}
                                                    onChange={handleInputChange}
                                                    name="entryDate"
                                                />
                                            </div>
                                            <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
                                                <label className="text-base mx-1">Branch:</label>
                                                <input
                                                    className="input-style p-1 text-base rounded-lg"
                                                    type="text"
                                                    value={allDetails.branch}
                                                    onChange={handleInputChange}
                                                    name="branch"
                                                />
                                            </div>
                                            <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
                                                <label className="text-base mx-1">Insured Name:</label>
                                                <input
                                                    className="input-style p-1 text-base rounded-lg"
                                                    type="text"
                                                    value={allDetails.insuredName}
                                                    onChange={handleInputChange}
                                                    name="insuredName"
                                                />
                                            </div>
                                            <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
                                                <label className="text-base mx-1">Contact No:</label>
                                                <input
                                                    className="input-style p-1 text-base rounded-lg"
                                                    type="text"
                                                    value={allDetails.contactNo}
                                                    onChange={handleInputChange}
                                                    name="contactNo"
                                                    placeholder="Enter Contact No"
                                                />
                                            </div>
                                            <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
                                                <label className="text-base mx-1">Policy Made By:</label>
                                                <select
                                                    className="input-style p-1 text-base rounded-lg cursor-pointer"
                                                    type="text"
                                                    name="staffName"
                                                    value={allDetails.staffName}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="">--- Select ---</option>
                                                    {APIData
                                                        .filter(emp => emp.staffType === "OPS Executive" || emp.staffType === "OPS EXECUTIVE")
                                                        .map((emp) => (
                                                            <option key={emp._id} value={emp.empname}>
                                                                {emp.empid} - {emp.empname}
                                                            </option>
                                                        ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-span-2 p-2 mt-10 flex justify-center">
                                            <button
                                                className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded text-sm px-3 py-2 text-center"
                                                onClick={updateInsuranceAPI}
                                                type="button"
                                            >
                                                Update
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default UpdateOps;
