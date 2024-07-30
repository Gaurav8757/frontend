import axios from "axios";
import { useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import { NavLink } from "react-router-dom";
import UpdateEmployee from "./UpdateEmployee.jsx";
import TextLoader from "../../loader/TextLoader.jsx";
import { toast } from "react-toastify";
import VITE_DATA from "../../config/config.jsx";

export default function ViewEmployee() {
    const [APIData, setAPIData] = useState([]);
    const [sendStaffId, setSendStaffId] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showUpdatePopup, setShowUpdatePopup] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [itemsPerPage, setItemsPerPage] = useState();
    const [searchId, setSearchId] = useState("");
    const [searchBranch, setSearchBranch] = useState("");
    const [searchInsuredName, setSearchInsuredName] = useState("");
    // const [searchAccNumber, setSearchAccNumber] = useState();
    const name = sessionStorage.getItem("name");
    // popup
    const staffSend = (_id) => {
        setSendStaffId(_id);
    };

    useEffect(() => {
        setItemsPerPage(50);
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
            // The user is authenticated, so you can make your API request here.
            axios
                .get(`${VITE_DATA}/api/employee-list`, {
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

    // Handle date range filter change
    const handleDateRangeChange = (event, type) => {
        if (type === "start") {
            setStartDate(event.target.value);
        } else if (type === "end") {
            setEndDate(event.target.value);
        }
    };

    const filteredData = APIData.filter(data => {
        // Check if data is defined
        if (!data) return false;
        // Filter conditions
        const idLower = data.empid?.toLowerCase() || "";
        const insuredNameLower = data.staffType?.toLowerCase() || "";
        const empnameLower = data.empname?.toLowerCase() || "";

        return (
            // Filter conditions using optional chaining and nullish coalescing
            (idLower.includes(searchId.toLowerCase()) || searchId === '') &&
            (insuredNameLower.includes(searchInsuredName.toLowerCase()) || searchInsuredName === '') &&
            (empnameLower.includes(searchBranch.toLowerCase()) || searchBranch === '') &&
            // ((policyMadeByLower === parseInt(searchAccNumber)) || searchAccNumber === '') &&
            (startDate === "" || new Date(data.empjoiningdate) >= new Date(startDate)) &&
            (endDate === "" || new Date(data.empjoiningdate) <= new Date(endDate))
        );
    });

    // Calculate total number of pages
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Calculate starting and ending indexes of items to be displayed on the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    // refreshing page after updating data
    const onUpdateBranch = async () => {
        try {
            const token = sessionStorage.getItem("token");

            if (!token) {
                toast.error("Not Authorized yet.. Try again!");
            } else {
                const response = await axios.get(
                    `${VITE_DATA}/api/employee-list`,
                    {
                        headers: {
                            Authorization: `${token}`,
                        },
                    }
                );
                setAPIData(response.data);
            }
        } catch (error) {
            console.error("Error fetching updated Employee data:", error);
        }
    };

    const sortedData = [...filteredData].sort((a, b) => {
        const idA = a.empid.toUpperCase();
        const idB = b.empid.toUpperCase();

        if (idA === idB) return 0;
        if (idA.startsWith("EIPL-") && idB.startsWith("EIPL-")) {
            const numA = parseInt(idA.replace("EIPL-", ""), 10);
            const numB = parseInt(idB.replace("EIPL-", ""), 10);
            return numA - numB;
        } else if (idA.startsWith("EIPL-")) {
            return -1;
        } else if (idB.startsWith("EIPL-")) {
            return 1;
        } else {
            return idA.localeCompare(idB);
        }
    });


    const exportToExcel = () => {
        try {
            const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            const fileExtension = '.xlsx';
            const fileName = name;

            // Include all sorted data
            const rowsToInclude = sortedData.map(data => [
                data.empid,
                data.empname,
                data.empemail,
                data.empmobile,
                data.empdob,
                data.empgender,
                data.empaadharno,
                // data.empaadharfile,
                data.pan,
                // data.panno,
                data.accNumber,
                data.ifsc,
                data.bankName,
                data.empjoiningdate,
                data.empbranch,
                data.currentempaddress,
                data.permanentempaddress,
                data.staffType
            ]);

            // Create worksheet
            const ws = XLSX.utils.aoa_to_sheet([[
                "Employee ID",
                "Employee Name",
                "Email ID",
                "Mobile No.",
                "DOB",
                "Gender",
                "Aadhar No.",
                // "Aadhar Card",
                "PAN No.",
                "PAN Card",
                "Account Number",
                "IFSC Code",
                "Bank Name",
                "Joining Date",
                "Branch",
                "Current Address",
                "Permanent Address",
                "Designation"
            ], ...rowsToInclude]);

            // Create workbook and export
            const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
            const excelBuffer = XLSX.write(wb, {
                bookType: 'xlsx',
                type: 'array',
            });
            const data = new Blob([excelBuffer], { type: fileType });
            const url = URL.createObjectURL(data);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName + fileExtension);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error exporting to Excel:', error);
            toast.error('Error exporting to Excel');
        }
    };
    const handleExportClick = () => {
        exportToExcel();
        // exportToPDF();
    };



    const DisableUser = async (_id) => {
        try {
            const employee = APIData.find((data) => data._id === _id);
            const newFlags = !employee.flags; // Toggle flags

            const resp = await axios.put(`${VITE_DATA}/api/emp/update/${_id}`, { flags: newFlags });
            console.log(resp.data.message.updatedEmployee.empname);
            if (newFlags) {
                toast.success(`${resp.data.message.updatedEmployee.empname} Enabled to Work...!`, { theme: "dark", position: "top-right" });
            } else {
                toast.error(`${resp.data.message.updatedEmployee.empname} Employee Disabled...!`, { theme: "dark", position: "top-right" });
            }

            setAPIData((prevData) => prevData.map((data) =>
                data._id === _id ? { ...data, flags: newFlags } : data
            ));
        } catch (error) {
            console.error('Error updating employee status', error);
            toast.error('Failed to update employee status.', { theme: "dark", position: "top-right" });
        }
    };


    // const onDeleteEmployee = async (_id) => {
    //     try {
    //         await axios.delete(`${VITE_DATA}/emp/api/${_id}`);
    //         toast.warn("Employee Deleted.....!", { theme: "dark", position: "top-right" });
    //         setAPIData((prevData) => prevData.filter((data) => data._id !== _id));
    //     } catch (error) {
    //         console.error('Error deleting employee:', error);
    //     }
    // };

    return (
        <section className="container-fluid relative  h-screen p-0 sm:ml-64 bg-orange-100">
            <div className="container-fluid flex justify-center p-2  border-gray-200 border-dashed rounded-lg   bg-orange-100">
                <div className="inline-block min-w-full w-full py-0 ">
                    <div className="overflow-x-none w-xl flex mt-2 text-orange-700">
                        <h1></h1>
                        <h1 className="flex justify-center text-3xl w-full font-semibold">Employee List&apos;s</h1>
                        <button className="" onClick={handleExportClick}><img src="/excel.png" alt="download" className="w-10" /></button>
                        <NavLink to="/hr/home/addemployee" className="my-auto ml-2">
                            <button type="button" className="text-white whitespace-nowrap justify-end bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded text-sm px-3 py-1 text-center ">Go Back</button>
                        </NavLink>
                    </div>


                    <div className=" relative mt-2">
                        <div className="inline-block min-w-full w-full">
                            {/* <h1 className="text-start text-xl underline text-red-900 font-semibold">Filters</h1> */}
                            <div className="flex-wrap  flex justify-between my-4  text-blue-700 max-w-auto mx-auto w-auto ">
                                {/* date range filter */}

                                <div className="flex  justify-start p-0 text-start w-full lg:w-1/4">
                                    <label className="my-1 text-base whitespace-nowrap font-medium text-gray-900">DATE:</label>
                                    <input type="date" value={startDate} onChange={(e) => handleDateRangeChange(e, "start")} className="shadow input-style w-64 my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2" placeholder="From Date" />
                                    <span className='text-justify mx-1 my-1 '>to</span>
                                    <input type="date" value={endDate} onChange={(e) => handleDateRangeChange(e, "end")} className="shadow input-style w-64 my-0 py-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none  px-0 mb-2 " placeholder="To Date" />
                                </div>
                                <div className="flex p-0  justify-start text-center w-full lg:w-1/5">
                                    <label className="my-1 text-base font-medium text-gray-900">EMP-ID:</label>
                                    <input
                                        type="search"
                                        onChange={(e) => setSearchId(e.target.value)}
                                        className="shadow input-style w-52 my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                                        placeholder="EMPID"
                                    />
                                </div>
                                <div className="flex justify-start p-0 text-end w-full lg:w-1/4">
                                    <label className="my-1 text-base font-medium text-gray-900">EMP-NAME:</label>
                                    <input
                                        type="search"
                                        onChange={(e) => setSearchBranch(e.target.value)}
                                        className="shadow input-style w-52 my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                                        placeholder="Employee Name"
                                    />
                                </div>
                                <div className="flex text-center justify-start w-full lg:w-1/4">
                                    <label className="my-1 text-base font-medium text-gray-900">DESIGNATION:</label>
                                    <input
                                        type="search"
                                        onChange={(e) => setSearchInsuredName(e.target.value)}
                                        className="shadow input-style w-52 my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                                        placeholder="Designation"
                                    />
                                </div>
                            </div>
                            <table className="min-w-full text-center text-sm font-light table bg-orange-100 ">
                                {filteredData.length === 0 ? (<TextLoader />) : (<>
                                    <thead className="border-b  font-medium bg-slate-200  sticky top-16">
                                        <tr className="text-blue-700 sticky top-16">
                                            <th scope="col" className="px-1 py-0 border border-black sticky">
                                                Update
                                            </th>
                                            <th scope="col" className="px-1 py-0 border border-black">
                                                Employee ID
                                            </th>
                                            <th scope="col" className="px-1 py-0 border border-black sticky">
                                                Employee Name
                                            </th>
                                            <th scope="col" className="px-1 py-0 border border-black sticky">
                                                Email ID
                                            </th>
                                            <th scope="col" className="px-1 py-0 border border-black sticky">
                                                Mobile No.
                                            </th>
                                            <th scope="col" className="px-1 py-0 border border-black sticky">
                                                DOB.
                                            </th>
                                            <th scope="col" className="px-1 py-0 border border-black sticky">
                                                Gender
                                            </th>
                                            <th scope="col" className="px-1 py-0 border border-black sticky">
                                                Aadhar No.
                                            </th>

                                            <th scope="col" className="px-1 py-0 border border-black sticky">
                                                PAN No.
                                            </th>

                                            <th scope="col" className="px-1 py-0 border border-black sticky">
                                                Account Number
                                            </th>
                                            <th scope="col" className="px-1 py-0 border border-black sticky">
                                                IFSC Code
                                            </th>
                                            <th scope="col" className="px-1 py-0 border border-black sticky">
                                                Bank Name
                                            </th>
                                            <th scope="col" className="px-1 py-0 border border-black sticky">
                                                Joining Date
                                            </th>
                                            <th scope="col" className="px-1 py-0 border border-black sticky">
                                                Branch
                                            </th>
                                            <th scope="col" colSpan={3} className="px-1 py-0 border border-black sticky">
                                                Current Address
                                            </th>
                                            <th scope="col" colSpan={3} className="px-1 py-0 border border-black sticky">
                                                Permanent Address
                                            </th>
                                            <th scope="col" className="px-1 py-0 border border-black sticky">
                                                Designation
                                            </th>

                                            <th scope="col" className="px-1 py-0 border border-black sticky">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-orange-200 overflow-y-hidden">
                                        {sortedData.slice(startIndex, endIndex).map((data) => {
                                            return (
                                                <tr
                                                    className=":border-neutral-200 text-sm font-medium"
                                                    key={data.empid}>
                                                    <td className="px-1 py-0 border border-black">
                                                        <button onClick={() => handleUpdateClick(data)} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded text-sm px-2 py-1 my-0.5 text-center ">
                                                            Update
                                                        </button>
                                                    </td>
                                                    <td className="px-1 py-0 border border-black">
                                                        {data.empid}
                                                    </td>
                                                    <td className="px-1 py-0 whitespace-nowrap border border-black">
                                                        {data.empname}
                                                    </td>
                                                    <td className="px-1 py-0 border border-black">
                                                        {data.empemail}
                                                    </td>
                                                    <td className="px-1 py-0 border border-black">
                                                        {data.empmobile}
                                                    </td>
                                                    <td className="px-1 py-0 whitespace-nowrap border border-black">
                                                        {data.empdob}
                                                    </td>
                                                    <td className="px-1 py-0 border border-black">
                                                        {data.empgender}
                                                    </td>
                                                    <td className="px-1 py-0 border border-black">
                                                        {data.empaadharno}
                                                    </td>
                                                    <td className="px-1 py-0 border border-black">
                                                        {data.pan}
                                                    </td>
                                                    <td className="px-1 py-0 border border-black">
                                                        {data.accNumber}
                                                    </td>
                                                    <td className="px-1 py-0 border border-black">
                                                        {data.ifsc}
                                                    </td>
                                                    <td className="px-1 py-0 border whitespace-nowrap border-black">
                                                        {data.bankName}
                                                    </td>
                                                    <td className="px-1 py-0 border whitespace-nowrap border-black">
                                                        {data.empjoiningdate}
                                                    </td>
                                                    <td className="px-1 py-0 border border-black">
                                                        {data.empbranch}
                                                    </td>
                                                    <td colSpan={3} className="px-1 py-0 border border-black">
                                                        {data.currentempaddress}
                                                    </td>
                                                    <td colSpan={3} className="px-1 py-0 border  border-black">
                                                        {data.permanentempaddress}
                                                    </td>
                                                    <td className="px-1 py-0 border border-black">
                                                        {data.staffType}
                                                    </td>
                                                    <td className="px-1 py-0 border border-black ">
                                                        {/* to enable delete from here */}
                                                        <button type="button" onClick={(e) => {
                                                            e.stopPropagation();
                                                            staffSend(data._id);
                                                        }} className={`text-white font-medium rounded text-sm px-2 py-1 text-center  shadow-2xl
                                                                ${data.flags ? 'bg-green-500 hover:bg-green-600 ' : 'bg-red-500 hover:bg-red-600'}`}>{data.flags ? "Active" : "Deactive"}</button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </>)}
                            </table>
                        </div>
                    </div>
                    {showUpdatePopup && selectedRowId && (
                        <UpdateEmployee employee={selectedRowId} onUpdate={onUpdateBranch} onClose={handleClosePopup} />
                    )}

                    {sendStaffId && (
                        <div id="popup-modal" tabIndex="-1" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-4 rounded-lg ">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    {`Are you sure you want to ${APIData.find(data => data._id === sendStaffId)?.flags ? 'disable' : 'enable'}`}
                                    <span className={`${APIData.find(data => data._id === sendStaffId)?.flags ? 'text-red-600 ml-1' : 'text-green-600 ml-1'}`}>
                                        {APIData.find(data => data._id === sendStaffId)?.empname}
                                    </span>
                                    {`?`}
                                </h2>
                                <div className="flex justify-end mt-10">
                                    <button
                                        onClick={() => { DisableUser(sendStaffId); setSendStaffId(null); }}
                                        className={`text-white ${APIData.find(data => data._id === sendStaffId)?.flags ? 'bg-red-600 hover:bg-red-800 focus:ring-red-300 dark:focus:ring-red-800' : 'bg-green-600 hover:bg-green-800 focus:ring-green-300 dark:focus:ring-green-800'} focus:outline-none font-medium rounded text-sm px-2 py-0 mr-2`}
                                    >
                                        Yes, I&apos;m sure
                                    </button>
                                    <button
                                        onClick={() => setSendStaffId(null)}
                                        className="text-gray-500 bg-gray-100 hover:bg-gray-200 focus:ring-gray-300 rounded-lg border border-gray-900 text-sm font-medium px-2 py-1 hover:text-gray-900 focus:z-10"
                                    >
                                        No, cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
            {/* Pagination */}
            <nav aria-label="Page navigation flex example sticky">
                <ul className="flex space-x-2 justify-end">
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
        </section>
    );
}