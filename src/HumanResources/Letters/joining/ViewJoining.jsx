import axios from "axios";
import { useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import TextLoader from "../../../loader/TextLoader.jsx";
import JoiningSeparate from "./JoiningSeparate.jsx";
import VITE_DATA from "../../../config/config.jsx";

function ViewJoining() {
  const [APIData, setAPIData] = useState([]);
  const [sendStaffId, setSendStaffId] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState();
  const [searchId, setSearchId] = useState("");
  const [searchBranch, setSearchBranch] = useState("");
  const [searchInsuredName, setSearchInsuredName] = useState("");
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const name = sessionStorage.getItem("name");
  // popup
  const staffSend = (_id) => {
    setSendStaffId(_id);
  };
  const handleUpdateClick = (id) => {
    setSelectedRowId(id);
    setShowUpdatePopup(true);
  };

  const handleClosePopup = () => {
    setSelectedRowId(null);
    setShowUpdatePopup(false);
  };
  
  useEffect(() => {
    setItemsPerPage(20);
  }, [])

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Not Authorized yet.. Try again! ");
    } else {
      // The user is authenticated, so you can make your API request here.
      axios
        .get(`${VITE_DATA}/letters/view/offer`, {
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
    const idLower = data.referenceno?.toLowerCase() || "";
    const designation = data.ofdesignation?.toLowerCase() || "";
    const empnameLower = data.ofname?.toLowerCase() || "";
    return (
      // Filter conditions using optional chaining and nullish coalescing
      (idLower.includes(searchId.toLowerCase()) || searchId === '') &&
      (designation.includes(searchInsuredName.toLowerCase()) || searchInsuredName === '') &&
      (empnameLower.includes(searchBranch.toLowerCase()) || searchBranch === '') &&
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
  const exportToExcel = () => {
    try {
      const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const fileExtension = '.xlsx';
      const fileName = name;
      // Include all sorted data
      const rowsToInclude = APIData.map(data => [
        data.referenceno,
        data.ofname,
        data.ofemail,
        data.ofmobile,
        data.ofaddress,
        data.ofdesignation,
        data.ofgrosalary,
        data.ofsalaryWords,
        data.ofvalidDate,
      ]);

      // Create worksheet
      const ws = XLSX.utils.aoa_to_sheet([[
        "Reference No",
        "Name",
        "Email ID",
        "Mobile No.",
        "Address",
        "Designation",
        "Gross Salary",
        "Salary in Words",
        "Valid Date"
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


  // ******************** Delete Functions *************************************/
  const onDeleteOffers = async (_id) => {
    try {
      await axios.delete(`${VITE_DATA}/letters/delete/offer/${_id}`);
      toast.warn("Offer Letter Deleted Successfully...!", { theme: "dark", position: "top-right" });
      setAPIData((prevData) => prevData.filter((data) => data._id !== _id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <section className="container-fluid relative p-0 sm:ml-64 bg-slate-200">
      <div className="container-fluid flex justify-center p-2  border-gray-200 border-dashed rounded-lg dark:border-gray-700  bg-orange-200">
        <div className="inline-block min-w-full w-full py-0 ">

          <div className="overflow-x-none w-xl flex mt-2 text-orange-700">
            <h1></h1>
            <h1 className="flex justify-center text-3xl w-full font-semibold">Joining Letter List&apos;s</h1>
            <button className="" onClick={handleExportClick}><img src="/excel.png" alt="download" className="w-10" /></button>
            <NavLink to="/hr/home/add/offer/letter" className="my-auto ml-2">
              <button type="button" className="text-white whitespace-nowrap justify-end bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded text-sm px-3 py-1 text-center ">Go Back</button>
            </NavLink>
          </div>
          <div className="flex-wrap  flex justify-between my-4 py-5   text-blue-500 max-w-auto mx-auto w-auto ">
            {/* date range filter */}
            <div className="flex my-auto justify-start p-0 text-start w-full lg:w-1/5">
              <label className="my-1 text-base whitespace-nowrap font-medium text-gray-900">DATE:</label>
              <input type="date" value={startDate} onChange={(e) => handleDateRangeChange(e, "start")} className="shadow input-style w-64 my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2" placeholder="From Date" />
              <span className='text-justify mx-1 my-1 '>to</span>
              <input type="date" value={endDate} onChange={(e) => handleDateRangeChange(e, "end")} className="shadow input-style w-64 my-0 py-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none  px-0 mb-2 " placeholder="To Date" />
            </div>
            <div className="my-1 mr-0.5 text-start w-full lg:w-1/4">
              <label className=" text-base whitespace-nowrap font-medium  text-gray-900">REFERENCE-ID:</label>
              <input
                type="search"
                onChange={(e) => setSearchId(e.target.value)}
                className="shadow  input-style w-52 my-auto ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0"
                placeholder="EMPID"
              />
            </div>
            <div className=" justify-start p-0 text-start  w-full lg:w-1/4">
              <label className="my-1 text-base font-medium text-gray-900">EMP-NAME:</label>
              <input
                type="search"
                onChange={(e) => setSearchBranch(e.target.value)}
                className="shadow input-style w-52 my-auto ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0"
                placeholder="Employee Name"
              />
            </div>
            <div className=" text-start my-1 justify-start w-full lg:w-1/4">
              <label className="my-1 text-base font-medium text-gray-900">DESIGNATION:</label>
              <input
                type="search"
                onChange={(e) => setSearchInsuredName(e.target.value)}
                className="shadow input-style w-52 my-auto ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 "
                placeholder="Designation"
              />
            </div>

          </div>
          <table className="min-w-full text-center text-sm font-light table bg-orange-200 ">
          {filteredData.length === 0 ? (<TextLoader />) : (<>
            <thead className="border-b  font-medium bg-slate-200  sticky top-16">
              <tr className="text-blue-700 sticky top-16">
                <th scope="col" className="px-1 py-0 border border-black sticky">
                  Reference No
                </th>
                <th scope="col" className="px-1 py-0 border border-black sticky">
                  Created Date
                </th>
                <th scope="col" className="px-1 py-0 border border-black sticky">
                  Joining Date
                </th>
                <th scope="col" className="px-1 py-0 border border-black sticky">
                  Name
                </th>
                <th scope="col" className="px-1 py-0 border border-black sticky">
                  Email ID
                </th>
                <th scope="col" className="px-1 py-0 border border-black sticky">
                  Mobile No.
                </th>
                <th scope="col" className="px-1 py-0 border border-black sticky">
                  Address
                </th>
                <th scope="col" className="px-1 py-0 border border-black sticky">
                  Designation
                </th>
                <th scope="col" className="px-1 py-0 border border-black sticky">
                  Gross Salary
                </th>
                <th scope="col" className="px-1 py-0 border border-black sticky">
                  Salary in Words
                </th>
                <th scope="col" className="px-1 py-0 border border-black sticky">
                  Basic Salary
                </th>
                <th scope="col" className="px-1 py-0 border border-black sticky">
                  View Letter
                </th>
                <th scope="col" className="px-1 py-0 border border-black sticky">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 overflow-y-hidden">
              {filteredData.reverse().slice(startIndex, endIndex).map((data) => {
                return (
                  <tr
                    className=":border-neutral-200 text-sm font-medium"
                    key={data._id}>

                    <td className="px-1 py-0 border border-black">
                      {data.referenceno}
                    </td>
                    <td className="px-1 py-0 border border-black">
                      {data.ofdate}
                    </td>
                    <td className="px-1 py-0 border border-black">
                      {data.joinempdate}
                    </td>
                    <td className="px-1 py-0 whitespace-nowrap border border-black">
                      {data.ofname}
                    </td>
                    <td className="px-1 py-0 border border-black">
                      {data.ofemail}
                    </td>
                    <td className="px-1 py-0 border border-black">
                      {data.ofmobile}
                    </td>
                    <td className="px-1 py-0  whitespace-nowrap border border-black">
                      {data.ofaddress}
                    </td>
                    <td className="px-0 py-0 border border-black">
                      {data.ofdesignation}
                    </td>
                    <td className="px-1 py-0 border whitespace-nowrap border-black">
                      {`₹ ${data.ofgrosalary}`}
                    </td>
                    <td className="px-1 py-0 border border-black">
                      {data.ofsalaryWords}
                    </td>
                    <td className="px-1 py-0 border whitespace-nowrap border-black">
                      {`₹ ${data.joinbasicSalary || 0}`}
                    </td>
                    <td className="px-1 py-0 border border-black">
                      <button onClick={() => handleUpdateClick(data)} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded text-sm px-3 py-1 my-0.5 text-center ">
                        View
                      </button>
                    </td>
                    <td className="px-1 py-0 border border-black">
                      {/* to enable delete from here */}
                      <button type="button" onClick={() => staffSend(data._id)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded text-sm px-2 py-1 my-1 text-center">Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            </>)}
          </table>
          {showUpdatePopup && selectedRowId && (
            <JoiningSeparate offers={selectedRowId} onClose={handleClosePopup} />
          )}
          {sendStaffId && (
            <div id="popup-modal" tabIndex="-1" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-4 rounded-lg ">
                <h2 className="text-lg font-semibold text-gray-800"> {`Are you sure you want to delete `}
                  <span className="text-red-600">{APIData.find(data => data._id === sendStaffId)?.name}</span>
                  {`?`}</h2>
                <div className="flex justify-end mt-10">
                  <button onClick={() => { onDeleteOffers(sendStaffId); setSendStaffId(null); }} className="text-white bg-red-600 hover:bg-red-800 focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-base px-4 mr-2">
                    Yes, I&apos;m sure
                  </button>
                  <button onClick={() => setSendStaffId(null)} className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-1 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-base font-medium px-4 py-2 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                    No, cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Pagination */}
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
    </section>
  );
}



export default ViewJoining;