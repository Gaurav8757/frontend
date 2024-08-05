import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import axios from "axios";
import VITE_DATA from "../../../config/config.jsx";
import TextLoader from "../../../loader/TextLoader.jsx";
import UpdateVisitDaily from "./UpdateVisitDaily.jsx";
function VisitReport() {
  const [APIData, setAPIData] = useState([]);
  // view salary popup
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [selectedViewId, setSelectedViewId] = useState(null);
  const [deletingStaffId, setDeletingStaffId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState();
  const [names, setNames] = useState("");
  const [categories, setCategories] = useState("");
  const [currdates, setCurrdates] = useState("");
  const [branch, setBranch] = useState("");

  const deleteStaff = (_id) => {
    // Show modal confirmation dialog
    setDeletingStaffId(_id);
  };
  useEffect(() => {
    setItemsPerPage(1000);
}, []);

  const handleViewClick = (id) => {
    setSelectedViewId(id);
    setShowViewPopup(true);
  };

  const handleViewClosePopup = () => {
    setSelectedViewId(null);
    setShowViewPopup(false);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Not Authorized yet.. Try again! ");
    } else {
      // The user is authenticated, so you can make your API request here.
      axios
        .get(`${VITE_DATA}/dailyvisit/view`, {
          headers: {
            Authorization: `${token}`, // Send the token in the Authorization header
          },
        })
        .then((response) => {
          const data = response.data;
          setAPIData(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const filteredData = APIData.filter((data) => {
    // Check if data is defined
    if (!data) return false;
    // Filter conditions
    const idLower = data.name?.toLowerCase() || "";
    const ptype = data.category?.toLowerCase() || "";
    const companyLower = data.currdate?.toLowerCase() || "";
    const branchfilter = data.branch?.toLowerCase() || "";

    return (
      (ptype.includes(categories.toLowerCase()) || categories === "") &&
      (idLower.includes(names.toLowerCase()) || names === "") &&
      (companyLower.includes(currdates.toLowerCase()) || currdates === "") &&
      (branchfilter.includes(branch.toLowerCase()) || branch === "")
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

  const fetchDataByAdmin = async () => {
    try {
      const response = await axios.get(`${VITE_DATA}/dailyvisit/view`);
      const responseData = response.data; // Assuming data is stored in response.data
      setAPIData(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deletedvr = async (_id) => {
    try {
      const resp = await axios.delete(`${VITE_DATA}/dailyvisit/delete/${_id}`);
      toast.error(`${resp.data.message}`, {
        theme: "dark",
        position: "top-right",
      });
      setAPIData((prevData) => prevData.filter((data) => data._id !== _id));
    } catch (error) {
      console.error("Error to Delete Cancelation ", error);
    }
  };

  const exportToExcel = () => {
    try {
      const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";
      const fileName = `${new Date().toLocaleDateString()} `;
      // Include all sorted data
      const rowsToInclude = filteredData.map((data) => [
        data.srNo,
        data.currdate,
        data.name,
        data.category,
        data.address,
        data.mobile,
      ]);

      // Create worksheet
      const ws = XLSX.utils.aoa_to_sheet([
        ["S No.", "Date", "Name", "Category", "Address", "Mobile No."],
        ...rowsToInclude,
      ]);

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
  };

  return (
    <section className="container-fluid relative  p-0 sm:ml-48 bg-slate-100 ">
      <div className="container-fluid flex flex-col justify-center px-0.5   border-gray-200 border-dashed rounded-lg   bg-slate-100">
        <div className="flex justify-between">
          <h1></h1>
          <h1 className="text-2xl font-medium my-2 text-blue-800">
            Daily Visit Reports{" "}
          </h1>
          <span className="flex justify-end ">
            <button className="" onClick={handleExportClick}>
              <img src="/excel.png" alt="download" className="w-8 mr-2" />
            </button>
          </span>
        </div>
        <div className="flex flex-wrap justify-between  text-blue-500  ">
          <div className="flex flex-col  p-2 text-start sm:w-44 lg:w-44 w-1/3">
            <label htmlFor="currdate" className="text-sm font-medium mx-1 ">
              Date:
            </label>
            <input
              id="currdate"
              className="input-style p-0.5 ps-2 rounded"
              type="date"
              name="currdate"
              onChange={(e) => setCurrdates(e.target.value)}
              placeholder=" Date"
            />
          </div>
          <div className="flex flex-col  p-2 text-start sm:w-44 lg:w-44 w-1/3">
            <label className="text-sm font-medium mx-1">Name:</label>
            <input
              type="search"
              onChange={(e) => setNames(e.target.value)}
              className="input-style p-0.5 ps-2 rounded"
              placeholder="Name"
            />
          </div>
          <div className="flex flex-col  p-2 text-start sm:w-44 lg:w-44 w-1/3">
            <label className="text-sm font-medium mx-1">Branch:</label>
            <input
              type="search"
              onChange={(e) => setBranch(e.target.value)}
              className="input-style p-0.5 ps-2 rounded"
              placeholder="Branch"
            />
          </div>
          <div className="flex flex-col  p-2 text-start sm:w-44 lg:w-44 w-1/3">
            <label className="text-sm font-medium mx-1">Category:</label>
            <input
              type="search"
              onChange={(e) => setCategories(e.target.value)}
              className="input-style p-0.5 ps-2 rounded"
              placeholder="Category"
            />
          </div>
        </div>
        <table className="min-w-full text-center  text-sm font-light table bg-orange-200">
          {filteredData.length === 0 ? (
            <TextLoader />
          ) : (
            <>
              <thead className="border-b font-sm  sticky top-0 bg-slate-200">
                <tr className="text-blue-700 sticky top-0 ">
                  <th scope="col" className="px-0.5 py-0.5 border border-black">
                    S.No
                  </th>
                  <th scope="col" className="px-0.5 py-0 border border-black">
                    Branch
                  </th>
                  <th scope="col" className="px-0.5 py-0 border border-black">
                    Date
                  </th>
                  <th scope="col" className="px-0.5 py-0 border border-black">
                    Name
                  </th>  
                  <th scope="col" className="px-0.5 py-0 border border-black">
                    Category
                  </th>
                  <th scope="col" className="px-0.5 py-0 border border-black">
                    Address
                  </th>
                  <th scope="col" className="px-0.5 py-0 border border-black">
                    Mobile No.
                  </th>
                  <th scope="col" className="px-1 py-0.5 border border-black">
                    Update
                  </th>
                  <th scope="col" className="px-0.5 py-0 border border-black">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 overflow-y-hidden  bg-slate-100">
                {filteredData.reverse().slice(startIndex, endIndex).map((item) => (
                  <tr
                    key={item.srNo}
                    className="text-black font-medium sticky top-0 hover:bg-orange-100"
                  >
                   
                    <td className="px-0.5 py-0 border border-black">
                      {item.srNo}
                    </td>
                    <td className="px-0.5 py-0 border border-black">
                      {item.branch}
                    </td>
                    <td className="px-0.5 py-0 border whitespace-nowrap border-black">
                      {item.currdate}
                    </td>
                    <td className="px-0.5 py-0 border border-black">
                      {item.name}
                    </td>
                   
                    <td className="px-0.5 py-0 border border-black">
                      {item.category}
                    </td>
                    <td className="px-0.5 py-0 border border-black">
                      {item.address}
                    </td>
                    <td className="px-0.5 py-0 border border-black">
                      {item.mobile}
                    </td>
                    <td className="px-1 py-0.5 border border-black">
                      <button
                        onClick={() => handleViewClick(item)}
                        type="button"
                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 my-a  shadow-lg shadow-blue-500/50 font-medium rounded text-xs px-1 py-1  text-center"
                      >
                        Update
                      </button>
                    </td>
                    <td className="px-0.5 py-0 border border-black">
                      <button
                        type="button"
                        onClick={() => deleteStaff(item._id)}
                        className="text-white bg-gradient-to-r from-red-600 via-red-600 to-red-600 hover:bg-red-700 focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded text-sm px-2 py-0.5 text-center my-0.5"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          )}
        </table>
      </div>
      {deletingStaffId && (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white p-2 rounded-md ">
            <h2 className="text-sm font-semibold text-gray-800">
              {`Are you sure you want to delete `}
              <span className="text-red-600">
                {APIData.find((data) => data._id === deletingStaffId)?.name}
              </span>
              {`?`}
            </h2>
            <div className="flex  justify-end mt-8">
              <button
                onClick={() => {
                  deletedvr(deletingStaffId);
                  setDeletingStaffId(null);
                }}
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-0 focus:outline-none focus:ring-red-300  rounded text-xs px-2 font-medium mx-2 py-1"
              >
                Yes, I&apos;m sure
              </button>
              <button
                onClick={() => setDeletingStaffId(null)}
                className="text-gray-100 bg-slate-400 hover:bg-gray-400 focus:ring-1 focus:outline-none focus:ring-gray-500 rounded border border-gray-800 text-xs font-medium px-2 py-1 hover:text-gray-900 focus:z-10 "
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <nav aria-label="Page navigation flex example sticky">
                <ul className="flex space-x-2 justify-end mt-4">
                    <li>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-3 py-0 text-blue-600 border border-blue-600 bg rounded-l hover:bg-blue-400 hover:text-white"
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
                                        className={`px-3 py-0 ${i + 1 === currentPage
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
                            className="px-3 py-0 text-blue-600 border border-blue-600 rounded-r hover:bg-blue-400 hover:text-white"
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
      {showViewPopup && selectedViewId && (
        <UpdateVisitDaily
          data={selectedViewId}
          onClosed={handleViewClosePopup}
          fetchDataByAdmin={fetchDataByAdmin}
        />
      )}
    </section>
  );
}

export default VisitReport;
