/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import VITE_DATA from "../../config/config.jsx";

function UpdateSalary({ salary, onUpdate, onClose }) {
   
    const [loading, setLoading] = useState(false);
    const [salaries, setSalaries] = useState({
        empname: "",
        salary: "",
        leavemonth: "",
    })

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
                `${VITE_DATA}/api/salary/update/${salary._id}`, // Update the URL with the correct endpoint
                salaries
            );
            
            toast.success(`${response.data.status}`)
            onUpdate();
            onClose();
           
        } catch (error) {
            toast.error(`${error}`)
            console.error("Error updating Salary:", error);
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
                    <div className="relative p-4 w-full max-w-3xl max-h-3xl mx-auto mt-64">
                        {/* <!-- Modal content --> */}
                        <div className="relative bg-gradient-to-r from-orange-700 to-orange-700 rounded-lg shadow dark:bg-slate-100">
                            {/* <!-- Modal header --> */}
                            <div className="flex items-center justify-between p-2 md:p-3 rounded-lg dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-100">
                                    Update Salary
                                </h3>
                                <button
                                    onClick={onClose}
                                    type="button"
                                    className=" bg-transparent hover:bg-red-100 text-slate-100  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  ">
                   <img src="/close.png" height={5} width={25} alt="close" className="hover:bg-red-100 rounded-full"/>
                                </button>
                            </div>
                            <section className="p-2 scroll-smooth hs-scroll-inside-viewport-modal rounded-lg bg-orange-600 max-h-auto text-justify overflow-y-auto ">
                                <form className="flex flex-wrap justify-between font-semibold rounded bg-orange-50">
                                    {/* ... other form elements ... */}
                                  
                                        <div className="flex flex-col  p-1 text-start w-full lg:w-1/3">
                                            <label className="text-base mx-1">  Employee:</label>
                                            {/* // Render the dropdown in your form */}
                                            <input type="text"
                                                className="input-style p-1 rounded-lg text-base"
                                                value={salaries.empname}
                                                onChange={handleInputChange}
                                                name="empName"/>
                                            
                                        </div>
                                        <div className="flex flex-col  p-1 text-start w-full lg:w-1/3">
                                            <label className="text-base mx-1">Monthly Leave:</label>
                                            <input
                                                className="input-style p-1 rounded-lg"
                                                type="number"
                                                min="0"
                                                value={salaries.leavemonth}
                                                onChange={handleInputChange}
                                                name="leavemonth"
                                            />
                                        </div>
                                   
                                        <div className="flex flex-col  p-1 text-start w-full lg:w-1/3">
                                            <label className="text-base mx-1">Monthly Salary:</label>
                                            <input
                                                className="input-style p-1 rounded-lg"
                                                type="number"
                                                min="0"

                                                value={salaries.salary}
                                                onChange={handleInputChange}
                                                name="salary"
                                            />
                                        </div>
                                   

                                    <div className="w-full p-1 my-4 justify-center flex">
                                        <button
                                            className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded text-sm px-3 py-2 text-center"
                                            onClick={updateSalaryAPI}
                                            type="button">
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

export default UpdateSalary;