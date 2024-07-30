/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import VITE_DATA from "../../../config/config.jsx";
function UpdateHrSalary({ salary, onUpdate }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [salaries, setSalaries] = useState({
        hrname: "",
        salmonth: "",
        hrmonthlyLeave: "",
    })

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
        setSalaries(salary);
    }, [salary]);

    // handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSalaries((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const updateSalaryAPI = async () => {
        try {
            setLoading(true);

            // Make an API call to update contact
            const response = await axios.put(
                `${VITE_DATA}/dashboard/hr/update/salary/${salary._id}`, // Update the URL with the correct endpoint
                salaries
            );

            toast.success(`${response.data.status}`)
            // Close the modal after successful update
            closeModal();
            onUpdate();
        } catch (error) {
            toast.error(`${error}`)
            console.error("Error updating Salary:", error);
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
                    <div className="relative p-4 w-full max-w-6xl max-h-5xl mx-auto my-20">
                        {/* <!-- Modal content --> */}
                        <div className="relative bg-gradient-to-r from-blue-200 to-cyan-200 rounded-lg shadow dark:bg-slate-100">
                            {/* <!-- Modal header --> */}
                            <div className="flex items-center justify-between p-2 md:p-3 rounded-lg dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-black">
                                    Update HR Salary
                                </h3>
                                <button
                                    onClick={closeModal}
                                    type="button"
                                    className=" bg-transparent hover:bg-red-100 text-slate-100  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  ">
                                    <img src="/close.png" height={5} width={25} alt="close" className="hover:bg-red-100 rounded-full"/>
                                </button>
                            </div>
                            <section className="p-4 md:p-3 scroll-smooth hs-scroll-inside-viewport-modal rounded-lg max-h-auto text-justify overflow-y-auto bg-gradient-to-r from-slate-100 to-white">
                                <form className="flex flex-wrap ">
                                    {/* ... other form elements ... */}
                                    <div className="w-full lg:w-1/2 p-2 text-start">
                                        <div className="flex flex-col ">
                                            <label className="text-base mx-1">Employee:</label>
                                            {/* // Render the dropdown in your form */}
                                            <select
                                                className="input-style rounded-lg text-base h-10"
                                                value={salaries.hrname}
                                                onChange={handleInputChange}
                                                name="hrname">

                                                <option value={salaries.hrname} className="text-base">
                                                    {salaries.hrname}
                                                </option>

                                            </select>
                                        </div>


                                        <div className="flex flex-col my-5">
                                            <label className="text-base mx-1">Monthly Leave:</label>
                                            <input
                                                className="input-style rounded-lg"
                                                type="number"
                                                min="0"
                                                value={salaries.hrmonthlyLeave}
                                                onChange={handleInputChange}
                                                name="hrmonthlyLeave"

                                            />
                                        </div>
                                    </div>

                                    {/* part-2 */}
                                    <div className="w-full lg:w-1/2 p-2 text-start">
                                        <div className="flex flex-col">
                                            <label className="text-base mx-1">Monthly Salary:</label>
                                            <input
                                                className="input-style rounded-lg"
                                                type="number"
                                                min="0"

                                                value={salaries.hrmonthlySalary}
                                                onChange={handleInputChange}
                                                name="hrmonthlySalary"

                                            />
                                        </div>

                                    </div>


                                    <div className="w-full p-1 mt-2 justify-center flex">
                                        <button
                                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                            onClick={updateSalaryAPI}
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

export default UpdateHrSalary;