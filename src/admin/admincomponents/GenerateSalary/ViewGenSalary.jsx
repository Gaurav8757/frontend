import axios from "axios";
import UpdateGenSalary from "./UpdateGenSalary.jsx";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import { toast } from "react-toastify";
import VITE_DATA from "../../../config/config.jsx";
export default function ViewGenPolicy() {
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Not Authorized yet.. Try again! ");
        } else {
            // The user is authenticated, so you can make your API request here.
            axios
                .get(`${VITE_DATA}/dashboard/hr/viewgen/salary`, {
                    headers: {
                        Authorization: `${token}`, // Send the token in the Authorization header
                    },
                })
                .then((response) => {

                    setAPIData(response.data);

                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);

    // refreshing page after updating data
    const updateGenHrSalary = async () => {
        try {
            const token = sessionStorage.getItem("token");

            if (!token) {
                toast.error("Not Authorized yet.. Try again!");
            } else {
                const response = await axios.get(
                    `${VITE_DATA}/dashboard/hr/viewgen/salary`,
                    {
                        headers: {
                            Authorization: `${token}`,
                        },
                    }
                );

                setAPIData(response.data);
            }
        } catch (error) {
            console.error("Error fetching Generated Salary data:", error);
        }
    };
    // ******************** Delete Functions *************************************/
    const onGenHrSalaryDelete = async (_id) => {
        try {
            await axios.delete(`${VITE_DATA}/dashboard/hr/deletegen/salary/${_id}`);
            toast.warn("HR Salary Deleted!", { theme: "dark", position: "top-right" });
            // Update state or perform any other necessary actions
        } catch (error) {
            console.error('Error deleting HR salary:', error);
        }
    };


    return (
        <section className="container-fluid relative  h-screen p-0 sm:ml-48 bg-slate-200">
            <div className="container-fluid flex justify-center p-2  border-gray-200 border-dashed rounded-lg dark:border-gray-700  bg-slate-200">

                {/* <div className="sm:-mx-6 lg:-mx-8"> */}
                <div className="inline-block min-w-full w-full py-0 sm:px-6 lg:px-8">
                    <div className="overflow-x-auto w-xl  text-blue-500"
                    ><NavLink to="/dashboard/generate/salary" className="flex justify-end text-red-700"> <TiArrowBack size={30} /></NavLink>
                        <h1 className="flex justify-center text-4xl w-full mb-8"> HR Generate Salary Lists</h1><hr></hr>
                    </div>
                    <div className="inline-block min-w-full w-full py-0 sm:px-6 lg:px-8 overflow-x-auto">
                        <table className="min-w-full text-center text-sm font-light ">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr className="text-blue-700">
                                    <th scope="col" className="px-5 py-4">
                                        Name
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Monthly Salary
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Monthly Leave
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Months
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Total Days
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Present Days
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Total Half Days
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Absent
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Salary
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Incentive
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Gross Salary
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Basic Salary
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                       HRA
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        CA
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                       Medical Allowance
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                    Tiffin Allowance
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                    Company PF
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                       Employee PF
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                   ESI
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                    Loan EMI
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Total Amount
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Edit
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Delete
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {APIData.map((data) => {
                                    
                                    return (
                                        <tr
                                            className="border-b dark:border-neutral-200 text-sm font-medium"
                                            key={data._id}
                                        >
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.hrname}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.hrmonthlySalary}
                                            </td>
                                            <td className="whitespace-nowrap px4 py-4">
                                                {data.hrmonthlyLeave}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.genHrMonths}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.totalhrDays}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.presenthrDays}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.totalhrHalfDays}
                                            </td>

                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.totalhrAbsent}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.genhrSalary}
                                            </td>

                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.hrincentive}
                                            </td>



                                            <td className="whitespace-nowrap px4 py-4">
                                                {data.grossSalary}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.basicSalary}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.hra}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.ca}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.medical}
                                            </td>

                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.tiffin}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.companyPf}
                                            </td>

                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.pf}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.esi}
                                            </td>

                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.loanemi}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.totalhrAmount}
                                            </td>

                                            <td className="whitespace-nowrap px-4 py-4">
                                                <UpdateGenSalary genHrSalaries = {data} onUpdate={updateGenHrSalary} />
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                <button type="button" onClick={() => onGenHrSalaryDelete(data._id)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">Delete</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </section>
    );
}