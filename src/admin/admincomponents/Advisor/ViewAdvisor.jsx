import axios from "axios";
import { useEffect, useState } from "react";
// import {  NavLink } from "react-router-dom";
import * as XLSX from 'xlsx';
import UpdateAdvisor from "./UpdateAdvisor.jsx";
import { toast } from "react-toastify";
import TextLoader from "../../../loader/TextLoader.jsx";
// import { TiArrowBack } from "react-icons/ti";
import VITE_DATA from "../../../config/config.jsx";

function ViewAdvisor() {
    const [APIData, setAPIData] = useState([]);
    const [searchId, setSearchId] = useState("");
    const [advaddress, setAdvAddress] = useState("");
    const [branch, setBranch] = useState("");
    const [searchAdv, setSearchAdv] = useState("");
    const [advemail, setAdvEmail] = useState("");
    const [showUpdatePopup, setShowUpdatePopup] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const handleUpdateClick = (id) => {
        setSelectedRowId(id);
        setShowUpdatePopup(true);
    };

    const handleClosePopup = () => {
        setSelectedRowId(null);
        setShowUpdatePopup(false);
    };

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        // const branch = sessionStorage.getItem("name");
        if (!token) {
            toast.error("Not Authorized yet.. Try again! ");
        } else {
            // The user is authenticated, so you can make your API request here.
            axios
                .get(`${VITE_DATA}/advisor/lists`, {
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

    const filteredData =  APIData.filter(data => {
        // Check if data is defined
        if (!data) return false;
        const idLower = data.uniqueId?.toLowerCase() || "";
        const advNameLower = data.advisorname?.toLowerCase() || "";
        const advLower = data.advisoraddress?.toLowerCase() || "";
        const policyLower = data.advisoremail?.toLowerCase() || "";
        const policyBranch = data.branch[0]?.toLowerCase() || "";
        return (
            // Filter conditions using optional chaining and nullish coalescing
            (idLower.includes(searchId.toLowerCase()) || searchId === '') &&
            (advNameLower.includes(searchAdv.toLowerCase()) || searchAdv === '') &&
            (advLower.includes(advaddress?.toLowerCase()) || advaddress === '') &&
            (policyLower.includes(advemail.toLowerCase()) || advemail === '') &&
            (policyBranch.includes(branch.toLowerCase()) || branch === '')
        );
    });
    // console.log(filteredData);

    const exportToExcel = () => {
        try {
            const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
            const fileExtension = ".xlsx";
            const fileName = `Advisor_Lists`;

            // Map all data without filtering by current date
            const dataToExport = APIData.map(row => {
                return [
                    row.uniqueId,
                    row.advisorname,
                    row.advisoremail,
                    row.advisormobile,
                    row.branch[0],
                    row.advisoraddress,
                ];
            });

            // Get all table headers in the same order
            const tableHeaders = [
                "ID",
                "Advisor Name",
                "Email ID",
                "Mobile No.",
                "Branch",
                "Address",
            ];
            // Create worksheet
            const ws = XLSX.utils.aoa_to_sheet([tableHeaders, ...dataToExport]);
            // Create workbook and export
            const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
            const excelBuffer = XLSX.write(wb, {
                bookType: "xlsx",
                type: "array",
            });
            const data = new Blob([excelBuffer], { type: fileType });
            const url = URL.createObjectURL(data);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", fileName + fileExtension);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error("Error exporting to Excel:", error);
            toast.error("Error exporting to Excel");
        }
    };

    const handleExportClick = () => {
        exportToExcel();
        // exportToPDF();
    };

    // refreshing page after updating data
    const onUpdateAdvisor = async () => {
        try {
            const token = sessionStorage.getItem("token");

            if (!token) {
                toast.error("Not Authorized yet.. Try again!");
            } else {
                const response = await axios.get(
                    `${VITE_DATA}/advisor/lists`,
                    {
                        headers: {
                            Authorization: `${token}`,
                        },
                    }
                );

                setAPIData(response.data);
            }
        } catch (error) {
            console.error("Error fetching updated Branch data:", error);
        }
    };

    // ******************** Delete Functions *************************************/
    const onDeleteAdvisor = async (_id) => {
        try {
            await axios.delete(`${VITE_DATA}/advisor/lists/${_id}`);
            toast.warn("Advisor Deleted Successfully.....!", { theme: "dark", position: "top-right" });
            setAPIData((prevData) => prevData.filter((data) => data._id !== _id));
        } catch (error) {
            console.error('Error deleting policy:', error);
        }
    };


    return (
        <section className="container-fluid relative  h-screen p-0 sm:ml-48 bg-slate-200">
            <div className="container-fluid flex justify-center p-2  border-gray-200 border-dashed rounded-lg   bg-slate-200">

                {/* <div className="sm:-mx-6 lg:-mx-8"> */}
                <div className="inline-block min-w-full w-full py-0 ">
                <div className="flex justify-between">
                            <h1 className="mr-20"></h1>
                            <span className=" flex justify-center text-center text-blue-700 text-3xl font-semibold">Advisor&apos;s List</span>
                            <div className="flex">
                                <button className="text-end text-3xl font-semibold" onClick={handleExportClick}><img src="/excel.png" alt="download" className="w-10 " /></button>   
                            </div>
                        </div>
                        <div className="flex-wrap flex mt-4 my-auto  justify-between  text-blue-500 ">
                            <div className=" p-0  my-4 text-center  lg:w-1/4">
                                <label className="my-0 text-lg font-medium text-gray-900">ID:</label>
                                <input
                                    type="search"
                                    onChange={(e) => setSearchId(e.target.value)}
                                    className="shadow input-style w-52 my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 ml-2"
                                    placeholder="ID"
                                />
                            </div>

                            <div className="p-0  my-auto text-center  lg:w-1/4">
                                <label className="my-0 text-lg font-medium text-gray-900">Advisor Name:</label>
                                <input
                                    type="search"
                                    onChange={(e) => setSearchAdv(e.target.value)}
                                    className="shadow input-style w-52 my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 ml-2"
                                    placeholder="By Name"
                                />
                            </div>
                            <div className=" p-0  my-auto text-center  lg:w-1/4">
                                <label className="my-0 text-lg font-medium text-gray-900">Branch:</label>
                                <input
                                    type="search"
                                    onChange={(e) => setBranch(e.target.value)}
                                    className="shadow input-style w-52 my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 ml-2"
                                    placeholder="Branch"
                                />
                            </div>

                            <div className=" p-0  my-auto text-center  lg:w-1/4">
                                <label className="my-0 text-lg font-medium text-gray-900">Location:</label>
                                <input
                                    type="search"
                                    onChange={(e) => setAdvAddress(e.target.value)}
                                    className="shadow input-style w-52 my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 ml-2"
                                    placeholder="Location"
                                />
                            </div>

                            <div className="fp-0  my-auto text-center  lg:w-1/4">
                                <label className="my-0 text-lg font-medium text-gray-900">Email:</label>
                                <input
                                    type="search"
                                    onChange={(e) => setAdvEmail(e.target.value)}
                                    className="shadow input-style w-52 my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 ml-2"
                                    placeholder="By Email"
                                />
                            </div>
                        </div>





                    <div className="inline-block min-w-full w-full py-0 overflow-x-auto">
                        <table className="min-w-full text-center text-sm font-light ">
                        {APIData.length <= 0 ? ( // Conditional rendering when there are no policies
                                    <TextLoader/>
                                ) : (<>
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr className="text-blue-700">
                                    <th scope="col" className="px-1 border border-black">
                                        ID
                                    </th>
                                    <th scope="col" className="px-1 border border-black">
                                        Advisor Name
                                    </th>
                                    <th scope="col" className="px-1 border border-black">
                                        Email ID
                                    </th>
                                    <th scope="col" className="px-1 border border-black">
                                        Mobile No.
                                    </th>
                                   
                                    <th scope="col" className="px-1 border border-black">
                                        Branch
                                    </th>
                                    <th scope="col" className="px-1 border border-black">
                                        Location
                                    </th>
                                    <th scope="col" className="px-1 border border-black">
                                        Payout Type
                                    </th>
                                    <th scope="col" className="px-1 border border-black">
                                        Update
                                    </th>
                                    <th scope="col" className="px-1 border border-black">
                                        Delete
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData
                                .sort((a, b) => {
                                    const idA = parseInt(a.uniqueId.split("-")[1]);
                                    const idB = parseInt(b.uniqueId.split("-")[1]);
                                    return idA - idB;
                                }).map((data) => {
                                    return (
                                        <tr key={data._id}
                                            className="border-b dark:border-neutral-200 text-sm font-medium">
                                            <td className="whitespace-nowrap px-0.5 border border-black">
                                                {data.uniqueId}
                                            </td>
                                            <td className="whitespace-nowrap px-0.5 border border-black">
                                                {data.advisorname}
                                            </td>
                                            <td className="whitespace-nowrap px-0.5 border border-black">
                                                {data.advisoremail}
                                            </td>
                                            <td className="whitespace-nowrap px-0.5 border border-black">
                                                {data.advisormobile}
                                            </td>
                                            <td className="whitespace-nowrap px-0.5 border border-black">
                                                {data.branch[0]}
                                            </td>
                                            <td className="whitespace-nowrap px-0.5 border border-black">
                                                {data.advisoraddress}
                                            </td>
                                            <td className="whitespace-nowrap px-0.5 border border-black">
                                            {data.advisortype}
                                           </td>
                                            <td htmlFor="update" className="whitespace-nowrap px-0.5 border border-black">
                                            <button id="update" onClick={() => handleUpdateClick(data)} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded text-sm px-2 py-1 my-0.5 mx-0.5 text-center ">
                                                            Update
                                                        </button>
                                            </td>
                                            <td htmlFor="del"  className="whitespace-nowrap px-0.5 border border-black">
                                                <button id="del" type="button" onClick={() => onDeleteAdvisor(data._id)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded text-sm px-2 py-1 text-center ">Delete</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            </> )}
                        </table>
                    </div>
                </div>
            </div>
            {showUpdatePopup && selectedRowId && (
                <UpdateAdvisor advisor={selectedRowId} onUpdate={onUpdateAdvisor} onClose={handleClosePopup} />
            )}
        </section>
    );
}
export default ViewAdvisor;