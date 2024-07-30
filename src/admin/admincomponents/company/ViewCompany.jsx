import UpdateCompanyModal from "./updateCompany";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import * as XLSX from 'xlsx';
import { toast } from "react-toastify";
import VITE_DATA from "../../../config/config.jsx";
import TextLoader from "../../../loader/TextLoader.jsx";

export default function ViewCompany() {
    const [APIData, setAPIData] = useState([]);
    const [search, setSearch] = useState("");
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
        if (!token) {
            toast.error("Not Authorized yet.. Try again! ");
        } else {
            // The user is authenticated, so you can make your API request here.
            axios
                .get(`${VITE_DATA}/api/company/company-list`, {
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
    const onUpdateCompany = async () => {
        try {
            const token = sessionStorage.getItem("token");

            if (!token) {
                toast.error("Not Authorized yet.. Try again!");
            } else {
                const response = await axios.get(
                    `${VITE_DATA}/api/company/company-list`,
                    {
                        headers: {
                            Authorization: `${token}`,
                        },
                    }
                );
                setAPIData(response.data);
            }
        } catch (error) {
            console.error("Error fetching updated company data:", error);
        }
    };
    const exportToExcel = () => {
        try {
            const fileType =
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
            const fileExtension = ".xlsx";
            const fileName = "all_company_lists";

            // Get all table headers and rows
            const tableHeaders = document.querySelectorAll(".table th");
            const tableRows = document.querySelectorAll(".table tbody tr");

            // Include only the first 26 columns and all rows
            const columnsToInclude = Array.from(tableHeaders).slice(0, 3);
            const rowsToInclude = Array.from(tableRows).map(row => {
                const cells = Array.from(row.querySelectorAll("td")).slice(0, 3);
                return cells.map(cell => cell.textContent);
            });

            // Create worksheet
            const ws = XLSX.utils.aoa_to_sheet([Array.from(columnsToInclude).map(header => header.textContent), ...rowsToInclude]);

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
    const onDeleteCompany = async (_id) => {
        try {
            await axios.delete(`${VITE_DATA}/company/api/${_id}`);
            toast.warn("Company Removed.....!", { theme: "dark", position: "top-right" });
            setAPIData((prevData) => prevData.filter((data) => data._id !== _id));
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    return (
        <section className="container-fluid relative  h-screen p-0 sm:ml-48 bg-slate-200">
            <div className="container-fluid flex justify-center p-1   rounded-lg   bg-slate-200">
                <div className="flex flex-col min-w-full w-full py-0 ">
                    <div className=" m-2 flex justify-between text-blue-700 max-w-full mx-auto w-full ">
                        <form className="flex justify-center">
                            <label className=" my-2  text-xl font-medium text-gray-900" > Filter:</label>
                            <input type="search" onChange={(e) => setSearch(e.target.value)} className="shadow input-style w-52  ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-0 px-0 mb-2 ml-2" placeholder="ID Date Branch InsuredName" />
                        </form>
                        <span className=" flex justify-center text-center  text-3xl font-semibold  ">Hompage Company Details</span>
                        <div className="flex ">
                            <button className="text-end  mx-4 flex justify-end  text-3xl font-semibold " onClick={handleExportClick}><img src="/excel.png" alt="download" className="w-12" /></button>
                            <NavLink to="/dashboard/addcompanies" className="flex justify-center">
                                <button type="button" className="text-white  mt-2 justify-end bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded text-sm px-3 py-1 text-center me-2 mb-2 ">Go Back</button>
                            </NavLink></div>
                    </div>


                    <div className="inline-block min-w-full w-full py-0">
                        <table className="min-w-full text-center text-sm font-light table">
                        {APIData.length === 0 ? ( // Conditional rendering when there are no policies
                                    <TextLoader/>
                                ) : (<>
                            <thead className="border-b font-medium bg-slate-300 sticky top-2">
                                <tr className="text-blue-700 bg-slate-300 border border-black sticky top-2">

                                    <th scope="col" className="px-1 border border-black sticky">
                                        Company Name
                                    </th>
                                    <th scope="col" className="px-1 border border-black sticky">
                                        Insurance Type
                                    </th>
                                    <th scope="col" className="px-1 border border-black sticky">
                                        Category
                                    </th>
                                    <th scope="col" className="px-1 border border-black sticky">
                                        Files
                                    </th>
                                    <th scope="col" className="px-1 border border-black sticky">
                                        Update
                                    </th>
                                    <th scope="col" className="px-1 border border-black sticky">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {APIData.filter((data) => {
                                    const searchLower = search.toLowerCase();
                                    const cnameLower = data.comp_insurance.toLowerCase();
                                    return searchLower === '' ? true : cnameLower.includes(searchLower);

                                }).map((data) => {

                                    return (
                                        <tr key={data._id}
                                            className="border-b dark:border-neutral-200 text-sm font-medium">
                                            <td className="whitespace-nowrap px-1 border border-black">
                                                {data.comp_cname}
                                            </td>
                                            <td className="whitespace-nowrap px-1 border border-black">
                                                {data.comp_insurance}
                                            </td>
                                            <td className="whitespace-nowrap px-1 border border-black">
                                                {data.comp_categories}
                                            </td>
                                            <td className="px-1 border border-black">
                                                <NavLink to={data.comp_cfiles} >
                                                    <img src={data.comp_cfiles} alt="file" />
                                                </NavLink>
                                            </td>
                                            <td className=" px-1 border border-black">
                                            <button onClick={() => handleUpdateClick(data)} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded text-sm px-2 py-1 my-0.5 mx-0.5 text-center ">
                                                            Update
                                                        </button>
                                               
                                            </td>
                                            <td className=" px-1 border border-black">
                                                <button type="button" onClick={() => onDeleteCompany(data._id)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded text-sm px-5 py-2 text-center my-1">Delete</button>
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
                <UpdateCompanyModal datas={selectedRowId} onUpdates={onUpdateCompany} onClose={handleClosePopup} />
            )}
        </section>
    );
}