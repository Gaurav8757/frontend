import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import AddPolicyDetail from './AddPolicyDetail.jsx';
import * as XLSX from 'xlsx';
import TextLoader from '../../loader/TextLoader.jsx';
import VITE_DATA from '../../config/config.jsx';
// update policy
function EmpPolicy() {
    const [APIData, setAPIData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [searchBranch, setSearchBranch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState();
    const [searchId, setSearchId] = useState("");
    const [searchCompany, setSearchCompany] = useState("");
    const [searchInsuredName, setSearchInsuredName] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [showUpdatePopup, setShowUpdatePopup] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const empid = sessionStorage.getItem("employeeId");
    const name = sessionStorage.getItem("name");

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
            // The user is authenticated, so you can make your API request here.
            axios
                .get(`${VITE_DATA}/alldetails/viewdata/${empid}`, {
                    headers: {
                        Authorization: `${token}`, // Send the token in the Authorization header
                    },
                })
                .then((response) => {
                    //   console.log(response.data);
                    setAPIData(response.data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    toast.error(error);
                    console.error(error);
                });
        }
    }, [empid]);

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
        const idLower = data.policyrefno?.toLowerCase() || "";
        const insuredNameLower = data.insuredName?.toLowerCase() || "";
        const companyLower = data.company?.toLowerCase() || "";
        const contacNoLower = data.contactNo?.toLowerCase() || "";
        const branchLower = data.branch?.toLowerCase() || "";
        return (
            // Filter conditions using optional chaining and nullish coalescing
            (idLower.includes(searchId.toLowerCase()) || searchId === '') &&
            (insuredNameLower.includes(searchInsuredName.toLowerCase()) || searchInsuredName === '') &&
            (companyLower.includes(searchCompany.toLowerCase()) || searchCompany === '') &&
            (branchLower.includes(searchBranch.toLowerCase()) || searchBranch === '') &&
            (contacNoLower.includes(contactNo.toLowerCase()) || contactNo === '') &&
            // Ensure correct date filtering logic
            (startDate === "" || new Date(data.entryDate) >= new Date(startDate)) &&
            (endDate === "" || new Date(data.entryDate) <= new Date(endDate))
        );
    });

    // Calculate total number of pages
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);


    // Calculate starting and ending indexes of items to be displayed on the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    // refreshing page after updating data
    const onUpdatePolicy = async () => {
        try {
            const token = sessionStorage.getItem("token");

            if (!token) {
                toast.error("Not Authorized yet.. Try again!");
            } else {
                const response = await axios.get(
                    `${VITE_DATA}/alldetails/viewdata/${empid}`,
                    {
                        headers: {
                            Authorization: `${token}`,
                        },
                    }
                );
                setAPIData(response.data);
            }
        } catch (error) {
            console.error("Error fetching updated insurance data:", error);
        }
    };

    const exportToExcel = () => {
        try {
            const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            const fileExtension = '.xlsx';
            const fileName = name;

            // Include all sorted data
            const rowsToInclude = filteredData.map(data => [
                data.entryDate,
                data.currentTime,
                data.empTime,
                data.policyrefno,
                data.branch,
                data.insuredName,
                data.contactNo,
                data.staffName,
                data.company,
                data.category,
                data.policyType,
                data.policyNo,
                data.engNo,
                data.chsNo,
                data.odPremium,
                data.liabilityPremium,
                data.netPremium,
                data.taxes,
                data.rsa,
                data.finalEntryFields,
                data.odDiscount,
                data.ncb,
                data.policyPaymentMode,
                data.states,
                data.district,
            ]);

            // Create worksheet
            const ws = XLSX.utils.aoa_to_sheet([[
                "Entry Date",
                "Receive Time",
                "Update Time",
                "Reference ID",
                "Branch",
                "Insured Name",
                "Mobile No.",
                "Policy Made By",
                "Company",
                "Category",
                "Policy Type",
                "Policy No.",
                "Engine No.",
                "Chassis No",
                "OD Premium",
                "Liability Premium",
                "Net Premium",
                "GST in rupees",
                "RSA",
                "Final Amount",
                "OD Discount(%)",
                "NCB",
                "Policy Payment Mode",
                "State",
                "District"
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
    return (
        <section className="container-fluid    p-0 sm:ml-48 bg-slate-200">
            <div className="container-fluid flex justify-center p-1  border-gray-200 border-dashed rounded-lg   bg-orange-50">
                <div className="inline-block min-w-full w-full py-0">
                    <div className=" m-4 flex justify-between text-orange-700 max-w-auto mx-auto w-auto ">
                        <h1></h1>
                        <span className=" flex justify-center text-center  text-3xl font-semibold  ">View All Policies</span>
                        <button className="text-end  flex justify-end  text-3xl font-semibold " onClick={handleExportClick}><img src="/excel.png" alt="download" className="w-12" /></button>
                    </div>
                    <div className="min-w-full w-full py-0  block z-50">
                        <div className="flex-wrap mb-4 flex justify-between  text-blue-500  ">
                            {/* date range filter */}
                            <div className="flex p-0 text-start w-full lg:w-1/4">
                                <label className="my-1 text-base whitespace-nowrap font-medium text-gray-900">Date:</label>
                                <input type="date" value={startDate} onChange={(e) => handleDateRangeChange(e, "start")} className="shadow input-style w-52 my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2" placeholder="From Date" />
                                <span className='text-justify mx-1 my-1 '>to</span>
                                <input type="date" value={endDate} onChange={(e) => handleDateRangeChange(e, "end")} className="shadow input-style w-52 my-0 py-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none  px-0 mb-2 " placeholder="To Date" />
                            </div>

                            <div className="  p-0   w-full lg:w-1/4">
                                <label className="my-1 text-base font-medium text-gray-900">ID:</label>
                                <input
                                    type="search"
                                    onChange={(e) => setSearchId(e.target.value)}
                                    className="shadow p-0 text-start lg:w-1/2 input-style  my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                                    placeholder="ID"
                                />
                            </div>

                            <div className="flex justify-start p-0 text-end w-full  lg:w-1/4">
                                <label className="my-1 text-base font-medium text-gray-900">Company:</label>
                                <input
                                    type="search"
                                    onChange={(e) => setSearchCompany(e.target.value)}
                                    className="shadow p-0 text-start lg:w-1/2 input-style  my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                                    placeholder="Company Name"
                                />
                            </div>

                            <div className="flex justify-start p-0 text-start w-full  lg:w-1/4">
                                <label className="my-1 text-base font-medium text-gray-900">Insured Name:</label>
                                <input
                                    type="search"
                                    onChange={(e) => setSearchInsuredName(e.target.value)}
                                    className="shadow p-0 text-start lg:w-1/2 input-style  my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                                    placeholder="Insured Name"
                                />
                            </div>
                            <div className="flex justify-start mt-3  text-start w-full lg:w-1/4">
                                <label className="flex justify-start p-0 text-lg font-medium text-gray-900">Branch:</label>
                                <input
                                    type="search"
                                    onChange={(e) => setSearchBranch(e.target.value)}
                                    className="shadow p-0 text-start lg:w-1/2 input-style  my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                                    placeholder="Branch Name"
                                />
                            </div>
                            <div className="flex p-0 mt-3 text-center justify-start lg:w-1/4">
                                <label className="my-1 text-base font-medium whitespace-nowrap text-gray-900">Contact No:</label>
                                <input
                                    type="search"
                                    onChange={(e) => setContactNo(e.target.value)}
                                    className="shadow p-0 text-start lg:w-1/2 input-style  my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                                    placeholder="Contact Number"
                                /></div>
                            <div className="flex p-0 mt-3 text-center justify-start lg:w-1/4"></div>
                            <div className="flex p-0 mt-3 text-center justify-start lg:w-1/4"></div>
                            <div className="flex p-0 mt-3 text-center justify-start lg:w-1/4"></div>
                        </div>

                        <table className="min-w-full  border text-center bg-orange-50 text-xs font-light table">
                            {isLoading ? ( // Conditional rendering for loading state
                                <TextLoader />
                            ) : (
                                <div className="inline-block min-w-full w-full py-0 ">
                                    {APIData.length === 0 ? ( // Conditional rendering when there are no policies
                                        <p className='mt-20 text-2xl font-bold flex  justify-center text-center'>No policies found.</p>
                                    ) : (<>
                                        <thead className="   font-medium  bg-orange-100">
                                            <tr className="text-blue-700 font-bold border border-black bg-slate-200 sticky -top-1">
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    Update
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    Entry Date
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    Received Time
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    Updated Time
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    Reference ID
                                                </th>

                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    Branch
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    Insured Name
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    Contact No.
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    Policy Made By
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    Company
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    Category
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    Policy Type
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    Policy No.
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    State
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    District
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    Registration Number
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    Fuel Type
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    Engine No.
                                                </th>

                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    Chassis No
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    OD Premium
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    Liability Premium
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    Net Premium
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    GST in rupees
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    RSA
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    Final Amount
                                                </th>

                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    OD Discount(%)
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    NCB
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    Policy Payment Mode
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    Advisor Name
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-gray-200 overflow-y-hidden">
                                            {filteredData.reverse().slice(startIndex, endIndex).map((data) => {
                                                return (
                                                    <tr
                                                        className="border-b border-gray-200 dark:border-neutral-200 text-sm font-medium hover:bg-orange-200 "
                                                        key={data._id}>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            <button onClick={() => handleUpdateClick(data)} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded text-sm px-2 py-1 my-0.5 mx-0.5 text-center ">
                                                                Update
                                                            </button>
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.entryDate}
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.currentTime}
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.empTime}
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.policyrefno}
                                                        </td>

                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.branch}
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.insuredName}
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.contactNo}
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.staffName}
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.company}
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.category}
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.policyType}
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.policyNo}
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.states}
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.district}
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.vehRegNo}
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.fuel}
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.engNo}
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.chsNo}
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.odPremium}
                                                        </td>

                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.liabilityPremium}
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.netPremium}
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.taxes}
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.rsa}
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.finalEntryFields}
                                                        </td>

                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.odDiscount}
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.ncb}
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.policyPaymentMode}
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.advisorName}
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
            </div>


            <nav aria-label="Page navigation flex example sticky   ">
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
            {showUpdatePopup && selectedRowId && (
                <AddPolicyDetail insurance={selectedRowId} onUpdates={onUpdatePolicy} onClose={handleClosePopup} />
            )}
        </section>
    )
}

export default EmpPolicy;