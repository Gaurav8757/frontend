/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CgCloseR } from "react-icons/cg";
import VITE_DATA from "../../../config/config.jsx";
function UpdateGenSalary({ genHrSalaries, onUpdate }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        hrname: "",
        presenthrDays: "",
        totalhrHalfDays: "",
        totalhrAbsent: "",
        genhrSalary: "",
        // hrmonthlySalary: "",
        genHrMonths: "",
        // hrmonthlyLeave: "",
        totalhrDays: "",
        hrincentive: "",
        totalhrAmount: "",
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
        setData(genHrSalaries);
    }, [genHrSalaries]);

    // handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const updateGenSalaryAPI = async () => {
        try {
            setLoading(true);

            // Make an API call to update contact
            const response = await axios.put(
                `${VITE_DATA}/dashboard/hr/updategen/salary/${genHrSalaries._id}`, // Update the URL with the correct endpoint
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
                                    Update Generated Salary
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
                                            <label className="text-base mx-1">Employee Name</label>
                                            <select
                                                className="input-style rounded-lg text-base h-10" value={data.empName} onChange={handleInputChange} name="empName">
                                                <option value={data.hrname} className="text-base">
                                                    {data.hrname}
                                                </option>
                                            </select>
                                        </div>

                                        {/* <div className="flex flex-col my-5 ">
                                            <label className="text-base mx-1">Monthly Leave:</label>
                                            <input
                                                className="input-style rounded-lg"
                                                type="number"
                                                min="0"
                                                max="12"
                                                value={data.hrmonthlyLeave}
                                                onChange={handleInputChange}
                                                name="hrmonthlyLeave"
                                            />
                                        </div> */}

                                        <div className="flex flex-col my-5">
                                            <label className="text-base mx-1">Total Days:</label>
                                            <input
                                                className="input-style rounded-lg"
                                                type="number"
                                                min="0"
                                                value={data.totalhrDays}
                                                onChange={handleInputChange}
                                                name="totalhrDays"
                                            />
                                        </div>

                                        <div className="flex flex-col my-5">
                                            <label className="text-base mx-1">Total Half Days:</label>
                                            <input
                                                className="input-style rounded-lg"
                                                type="number"
                                                min="0"
                                                value={data.totalhrHalfDays}
                                                onChange={handleInputChange}
                                                name="totalhrHalfDays"
                                            />
                                        </div>

                                        <div className="flex flex-col my-5">
                                            <label className="text-base mx-1">Salary:</label>
                                            <input
                                                className="input-style rounded-lg"
                                                type="number"
                                                min="0"
                                                value={data.genhrSalary}
                                                onChange={handleInputChange}
                                                name="genhrSalary"
                                            />
                                        </div>

                                        <div className="flex flex-col my-5">
                                            <label className="text-base mx-1">Total Amount:</label>
                                            <input
                                                className="input-style rounded-lg"
                                                type="number"
                                                min="0"
                                                value={data.totalhrAmount}
                                                onChange={handleInputChange}
                                                name="totalhrAmount"
                                            />
                                        </div>
                                    </div>


                                    {/* part-2 */}
                                    <div className="w-full lg:w-1/2 p-2 text-start">
                                        {/* <div className="flex flex-col">
                                            <label className="text-base mx-1">Monthly Salary:</label>
                                            <input
                                                className="input-style rounded-lg"
                                                type="number"
                                                min="0"
                                                value={data.hrmonthlySalary}
                                                onChange={handleInputChange}
                                                name="hrmonthlySalary"
                                                placeholder=""
                                                readOnly
                                            />
                                        </div> */}




                                        <div className="flex flex-col ">
                                            <label className="text-base mx-1">Months:</label>
                                            <select
                                                className="input-style rounded-lg"
                                                type="text"
                                                value={data.genHrMonths}
                                                onChange={handleInputChange}
                                                name="genHrMonths"
                                            >

                                                <option key="0" value="" disabled>----- Select Month&apos;s -----</option>
                                                <option key="1" value={"January"}>January</option>
                                                <option key="2" value={"Febuary"}>Febuary</option>
                                                <option key="3" value={"March"}>March</option>
                                                <option key="4" value={"April"}>April</option>
                                                <option key="5" value={"May"}>May</option>
                                                <option key="6" value={"June"}>June</option>
                                                <option key="7" value={"July"}>July</option>
                                                <option key="8" value={"August"}>August</option>
                                                <option key="9" value={"September"}>September</option>
                                                <option key="10" value={"October"}>October</option>
                                                <option key="11" value={"November"}>November</option>
                                                <option key="12" value={"December"}>December</option>
                                            </select>
                                        </div>


                                        <div className="flex flex-col my-5">
                                            <label className="text-base mx-1">Present Days:</label>
                                            <input
                                                className="input-style rounded-lg"
                                                type="number"
                                                min="0"
                                                value={data.presenthrDays}
                                                onChange={handleInputChange}
                                                name="presenthrDays"
                                            />
                                        </div>

                                        <div className="flex flex-col my-5">
                                            <label className="text-base mx-1">Total Absent:</label>
                                            <input
                                                className="input-style rounded-lg"
                                                type="number"
                                                min="0"
                                                value={data.totalhrAbsent}
                                                onChange={handleInputChange}
                                                name="totalhrAbsent"
                                            />
                                        </div>

                                        <div className="flex flex-col my-5">
                                            <label className="text-base mx-1">Incentive:</label>
                                            <input
                                                className="input-style rounded-lg"
                                                type="number"
                                                min="0"
                                                value={data.hrincentive}
                                                onChange={handleInputChange}
                                                name="hrincentive"
                                                placeholder="₹"
                                            />
                                        </div>
                                    </div>


                                    <div className="w-full p-1 mt-2 justify-center flex">
                                        <button
                                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                            onClick={updateGenSalaryAPI}
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

export default UpdateGenSalary;