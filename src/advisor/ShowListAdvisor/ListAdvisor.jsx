import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import * as XLSX from 'xlsx';
import TextLoader from "../../loader/TextLoader.jsx";
import AdvisorUpdates from "./AdvisorUpdates.jsx";
import { toast } from "react-toastify";
import VITE_DATA from "../../config/config.jsx";

function ListAdvisor() {
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [itemsPerPage, setItemsPerPage] = useState();
    const [APIData, setAPIData] = useState([]);
    const [searchId, setSearchId] = useState("");
    const [advaddress, setAdvAddress] = useState("");
    const [searchAdv, setSearchAdv] = useState("");
    const [advemail, setAdvEmail] = useState("");
    const [showUpdatePopup, setShowUpdatePopup] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState(null);

    const name = sessionStorage.getItem('name');
    useEffect(() => {
        setItemsPerPage(100);
    }, []);

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
        if (!token) {
            toast.error("Not Authorized yet.. Try again! ");
        } else {
            axios
                .get(`${VITE_DATA}/advisor/all/lists`, {
                    headers: {
                        Authorization: `${token}`, // Send the token in the Authorization header
                    }, params: { branch: name }
                })
                .then((response) => {
                    setAPIData(response.data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [name]);

    // refreshing page after updating data
    const onUpdateAdvisor = async () => {
        try {
            const token = sessionStorage.getItem("token");
            if (!token) {
                toast.error("Not Authorized yet.. Try again!");
            } else {
                const response = await axios.get(
                    `${VITE_DATA}/advisor/all/lists`,
                    {
                        headers: {
                            Authorization: `${token}`,
                        }, params: { branch: name }
                    }
                );
                setAPIData(response.data);
            }
        } catch (error) {
            console.error("Error fetching updated Branch data:", error);
        }
    };

    // page number add
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const filteredData = APIData.filter(data => {
        // Check if data is defined
        if (!data) return false;
        // Filter conditions
        const idLower = data.uniqueId?.toLowerCase() || "";
        const advNameLower = data.advisorname?.toLowerCase() || "";
        const advLower = data.advisoraddress?.toLowerCase() || "";
        const policyLower = data.advisoremail?.toLowerCase() || "";
        return (
            // Filter conditions using optional chaining and nullish coalescing
            (idLower.includes(searchId.toLowerCase()) || searchId === '') &&
            (advNameLower.includes(searchAdv.toLowerCase()) || searchAdv === '') &&
            (advLower.includes(advaddress?.toLowerCase()) || advaddress === '') &&
            (policyLower.includes(advemail.toLowerCase()) || advemail === '')

        );
    });

    const totalItems = APIData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const exportToExcel = () => {
        try {
            const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
            const fileExtension = ".xlsx";
            const fileName = `${name}_Advisor_Lists`;
            // Map all data without filtering by current date
            const dataToExport = APIData.map(row => {
                return [
                    row.uniqueId,
                    row.advisorname,
                    row.advisoremail,
                    row.advisormobile,
                    row.advisoraddress,
                    row.advisortype
                ];
            });

            // Get all table headers in the same order
            const tableHeaders = [
                "ID",
                "Advisor Name",
                "Email ID",
                "Mobile No.",
                "Address",
                "Advisor Payout Type"
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
        <section className="container-fluid relative  p-0 sm:ml-48  bg-slate-200">
            <div className="container-fluid flex justify-center p-1  border-gray-200 border-dashed rounded-lg   bg-slate-200">
                <div className="inline-block min-w-full w-full py-0 ">
                    
                    <div className="flex justify-between">
                        <h1 className="mr-20"></h1>
                        <span className=" flex justify-center text-center text-orange-700 text-3xl font-semibold">Advisor&apos;s List</span>
                        <div className="flex">
                            <button className="text-end    font-semibold " onClick={handleExportClick}><img src="/excel.png" alt="download" className="w-10 " /></button>
                            <NavLink to="/branches/home/advisor/register" className="my-auto">
                                <button type="button" className="text-white  justify-end bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded text-sm px-2 py-1 text-center ">Go Back</button>
                            </NavLink>
                        </div>
                    </div>


                    <div className="flex-wrap flex my-auto mt-5 justify-between  text-blue-500  ">
                        <div className=" p-0  my-auto text-center  lg:w-1/5">
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
                            <label className="my-0 text-lg font-medium text-gray-900">Location:</label>
                            <input
                                type="search"
                                onChange={(e) => setAdvAddress(e.target.value)}
                                className="shadow input-style w-52 my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 ml-2"
                                placeholder="Location"
                            />
                        </div>

                        <div className="p-0  my-auto text-center  lg:w-1/4">
                            <label className="my-0 text-lg font-medium text-gray-900">Email:</label>
                            <input
                                type="search"
                                onChange={(e) => setAdvEmail(e.target.value)}
                                className="shadow input-style w-52 my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 ml-2"
                                placeholder="By Email"
                            />
                        </div>
                    </div>
                    {/* </div> */}

                    <table className="min-w-full mt-10 border text-center bg-slate-200 text-sm font-light">
                        {isLoading ? ( // Conditional rendering for loading state
                            <TextLoader />
                        ) : (
                            <div className="min-w-full  border text-center bg-slate-200 text-sm font-light table">
                                {filteredData.length === 0 ? ( // Conditional rendering when there are no policies
                                    <p className='mt-20 text-2xl font-bold flex  justify-center text-center'>No Advisor Found.</p>
                                ) : (<>
                                    <thead className="font-medium sticky bg-slate-200">
                                        <tr className="text-blue-700 sticky top-16 bg-slate-200">
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
                                    <tbody className="divide-y divide-gray-200 overflow-y-hidden">
                                        {filteredData.map((data) => {
                                            return (
                                                <tr key={data._id}
                                                    className="border-b  bg-slate-200 text-sm font-medium">
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
                                                        {data.advisoraddress}
                                                    </td>
                                                    <td className="whitespace-nowrap px-0.5 border border-black">
                                                        {data.advisortype}
                                                    </td>
                                                    <td className="whitespace-nowrap px-0.5 border border-black">
                                                        <button onClick={() => handleUpdateClick(data)} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded text-sm px-2 py-1 my-0.5 mx-0.5 text-center ">
                                                            Update
                                                        </button>

                                                    </td>
                                                    <td className="whitespace-nowrap px-0.5 border border-black">
                                                        <button type="button" onClick={() => onDeleteAdvisor(data._id)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded text-sm px-2 py-1 text-center ">Delete</button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </>)}
                            </div>)}

                    </table>

                </div>
            </div>

            <nav aria-label="Page navigation  flex example sticky">
                <ul className="flex space-x-2 mt-2 justify-end">
                    <li>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-3 py-1 text-blue-600 border border-blue-600 bg rounded-l hover:bg-blue-400 hover:text-white"
                        >
                            Previous
                        </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => {
                        // Display buttons for currentPage and a few surrounding pages
                        const showPage = i + 1 === 1 || i + 1 === currentPage || i + 1 === totalPages || Math.abs(i + 1 - currentPage) <= 2;
                        if (showPage) {
                            return (
                                <li key={i}>
                                    <button
                                        onClick={() => handlePageChange(i + 1)}
                                        className={`px-3 py-1 ${i + 1 === currentPage
                                            ? 'bg-green-700 text-white font-bold'
                                            : 'text-blue-600 hover:bg-blue-400 hover:text-white'
                                            } border border-blue-600`}
                                    >
                                        {i + 1}
                                    </button>
                                </li>
                            );
                        }
                        return null;
                    })}
                    <li>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 text-blue-600 border border-blue-600 rounded-r hover:bg-blue-400 hover:text-white"
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
            {showUpdatePopup && selectedRowId && (
                <AdvisorUpdates advisors={selectedRowId} onUpdates={onUpdateAdvisor} onClose={handleClosePopup} />
            )}
        </section>
    );
}


export default ListAdvisor;