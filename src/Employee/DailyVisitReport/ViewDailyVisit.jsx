import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import VITE_DATA from "../../config/config.jsx";
import axios from "axios";
import * as XLSX from "xlsx";
import TextLoader from "../../loader/TextLoader.jsx";
import UpdateDailyVisit from "./UpdateDailyVisit.jsx";

function ViewDailyVisit() {
  const [APIData, setAPIData] = useState([]);
  // view salary popup
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [selectedViewId, setSelectedViewId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState();
  const [names, setNames] = useState("");
  const [categories, setCategories] = useState("");
  const [currdates, setCurrdates] = useState("");

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
    const branch = sessionStorage.getItem("branch");
    const id = sessionStorage.getItem("employeeId");
    if (!token) {
      toast.error("Not Authorized yet.. Try again! ");
    } else {
      // The user is authenticated, so you can make your API request here.
      axios
        .get(`${VITE_DATA}/dailyvisit/view/${branch}/${id}`, {
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

    return (
      (ptype.includes(categories.toLowerCase()) || categories === "") &&
      (idLower.includes(names.toLowerCase()) || names === "") &&
      (companyLower.includes(currdates.toLowerCase()) || currdates === "")
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

  const fetchData = async () => {
    try {
      const response = await axios.get(`${VITE_DATA}/dailyvisit/view`);
      const responseData = response.data; // Assuming data is stored in response.data
      setAPIData(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
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
        data.branch,
        data.mobile,
      ]);

      // Create worksheet
      const ws = XLSX.utils.aoa_to_sheet([
        ["S No.", "Date", "Name", "Category", "Address", "Branch", "Mobile No."],
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


  const isCurrentDate = (dateString) => {
    const today = new Date().toLocaleDateString('en-CA'); // Format: YYYY-MM-DD
    return dateString <= today;
  };

  return (
    <section className="container-fluid relative  p-0 sm:ml-48 bg-orange-100 ">
      <div className="container-fluid flex flex-col justify-center px-0.5   border-gray-200 border-dashed rounded-lg   bg-orange-100">
      <div className="flex justify-between">
      <h1></h1>
        <h1 className="text-2xl font-medium my-2 text-orange-900">DV Report&apos;s </h1>
        <span className="flex justify-end ">
            <button className="" onClick={handleExportClick}>
              <img src="/excel.png" alt="download" className="w-8 mr-2" />
            </button>
          </span>
      </div>
      <div className="flex flex-wrap justify-between  text-orange-600  ">
          <div className="flex flex-col  p-2 text-start sm:w-44 lg:w-44 w-1/3">
            <label htmlFor="currdate" className="text-sm font-medium mx-1 ">
              Date:
            </label>
            <input
              id="currdate"
              className="input-style p-0.5 ps-2  rounded"
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
              className="input-style p-0.5 ps-2  rounded"
              placeholder="Name"
            />
          </div>
          <div className="flex flex-col  p-2  text-start sm:w-44 lg:w-44 w-1/3">
            <label className="text-sm font-medium mx-1">Category:</label>
            <input
              type="search"
              onChange={(e) => setCategories(e.target.value)}
              className="input-style p-0.5 ps-2  rounded"
              placeholder="Category"
            />
          </div>
        </div>
        <table className="min-w-full text-center  text-sm font-light table bg-orange-200">
          {filteredData.length === 0 ? (
            <TextLoader />
          ) : (
            <>
              <thead className="border-b font-base  sticky top-0 bg-slate-200">
                <tr className="text-orange-700 sticky top-0 ">
                  <th scope="col" className="px-1 py-0.5 border border-black">
                    Update
                  </th>
                  <th scope="col" className="px-0.5 py-0.5 border border-black">
                    S.No
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
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 overflow-y-hidden  bg-orange-50">
                {filteredData.reverse().slice(startIndex, endIndex).map((item) => (
                  <tr
                    key={item.srNo}
                    className="text-black font-medium sticky top-0 hover:bg-orange-100"
                  >
                    <td className="px-1 py-0.5 border border-black">
                    {isCurrentDate(item.currdate) ? (
                        <button
                          onClick={() => handleViewClick(item)}
                          type="button"
                          className="text-white bg-gradient-to-r from-orange-600 via-orange-600 to-orange-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-orange-600 my-a shadow-lg shadow-orange-600/50 font-medium rounded text-xs px-1 py-1 text-center">
                          Update
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled
                          className="text-white bg-gradient-to-r from-gray-400 via-gray-400 to-gray-400  cursor-not-allowed shadow-lg shadow-gray-400/50 font-medium rounded text-xs px-1 py-1 text-center">
                          Update
                        </button>
                      )}
                     
                    </td>
                    <td className="px-0.5 py-0 border border-black">
                      {item.srNo}
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
                  </tr>
                ))}
              </tbody>
            </>
          )}
        </table>
      </div>
      <nav aria-label="Page navigation flex example sticky">
                <ul className="flex space-x-2 justify-end mt-4">
                    <li>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-3 py-0 text-orange-600 border border-orange-600 bg rounded-l hover:bg-orange-600 hover:text-white"
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
                                            : 'text-orange-600 hover:bg-orange-600 hover:text-white'
                                            } border border-orange-600`}
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
                            className="px-3 py-0 text-orange-600 border border-orange-600 rounded-r hover:bg-orange-600 hover:text-white"
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
      {showViewPopup && selectedViewId && (
        <UpdateDailyVisit
          data={selectedViewId}
          onClosed={handleViewClosePopup}
          fetchData = {fetchData}
        />
      )}
    </section>
  );
}

export default ViewDailyVisit;
