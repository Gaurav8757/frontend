import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import * as XLSX from 'xlsx';
import TextLoader from "../../loader/TextLoader.jsx";
import VITE_DATA from "../../config/config.jsx";

function InsuranceLists() {
  const [allDetailsData, setAllDetailsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState();
  const name = sessionStorage.getItem("name");
  // const name = "PRASHANT JI JAMUI"

  useEffect(() => {
    setItemsPerPage(200);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${VITE_DATA}/api/advpolicy?advisorName=${encodeURIComponent(name)}`
        );
        setAllDetailsData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [name]);





  // page number add
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalItems = allDetailsData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  const exportToExcel = () => {
    try {
      const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";
      const fileName = `${name}_policy_lists`;

      // Map all data without filtering by current date
      const dataToExport = allDetailsData.map(row => {
        return [
          row.policyrefno,
          row.entryDate,
          row.branch,
          row.company,
          row.category,
          row.segment,
          row.sourcing,
          row.policyNo,
          row.insuredName,
          row.contactNo,
          row.states,
          row.district,
          row.vehRegNo,
          row.policyStartDate,
          row.policyEndDate,
          row.odExpiry,
          row.tpExpiry,
          row.idv,
          row.bodyType,
          row.makeModel,
          row.mfgYear,
          row.registrationDate,
          row.vehicleAge,
          row.fuel,
          row.gvw,
          row.cc,
          row.engNo,
          row.chsNo,
          row.policyType,
          row.productCode,
          row.odPremium,
          row.liabilityPremium,
          row.netPremium,
          row.finalEntryFields,
          row.odDiscount,
          row.ncb,
          row.advisorName,
          row.subAdvisor,
          row.payoutOn,
          row.advisorPayoutAmount,
          row.advisorPayableAmount
        ];
      });

      // Get all table headers in the same order
      const tableHeaders = [
        "Reference ID",
        "Entry Date",
        "Branch",
        "Company",
        "Category",
        "Segment",
        "Sourcing",
        "Policy No",
        "Insured Name",
        "Contact No",
        "State",
        "District",
        "Vehicle Reg No",
        "Policy Start Date",
        "Policy End Date",
        "OD Expiry",
        "TP Expiry",
        "IDV",
        "Body Type",
        "Make & Model",
        "MFG Year",
        "Registration Year",
        "Vehicle Age",
        "Fuel",
        "GVW",
        "C.C",
        "Engine No",
        "Chassis No",
        "Policy Type",
        "Product Code",
        "OD Premium",
        "Liability Premium",
        "Net Premium",
        "Final Amount",
        "OD Discount(%)",
        "NCB",
        "Advisor Name",
        "Sub-Advisor Name",
        "PayoutOn",
        "Advisor Payout",
        "Advisor Payable Amount",
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


  return (
    <section className="container-fluid relative h-screen p-0 sm:ml-64 bg-slate-200">
      <div className="container-fluid flex justify-center p-2 border-gray-200 border-dashed rounded-lg  bg-slate-200">
        <div className="inline-block min-w-full  w-full py-0 ">
          <div className=" mb-4 mt-2 flex justify-between text-orange-700 ">
            <h1 className="mr-20"></h1>
            <span className=" flex justify-center text-center text-3xl font-semibold">Policy&apos;s List</span>
            <div className="flex">
              <button className="text-end  mx-4 flex justify-end  text-3xl font-semibold " onClick={handleExportClick}><img src="/excel.png" alt="download" className="w-12" /></button>
              <NavLink to="/advisor/home" className="flex justify-center">
                <button type="button" className="text-white  mt-1 justify-end bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded text-sm px-3 py-1 text-center me-2 mb-2 ">Go Back</button>
              </NavLink>
            </div>
          </div>
          <div className="inline-block min-w-full w-full py-0   relative">
            <table className="min-w-full text-center text-sm font-light sticky top-16">
              {isLoading ? ( // Conditional rendering for loading state
                <TextLoader />
              ) : (
                <div className="min-w-full  border text-center bg-slate-200 text-sm font-light table">
                  {allDetailsData.length === 0 ? ( // Conditional rendering when there are no policies
                    <p className='mt-20 text-2xl font-bold flex  justify-center text-center'>No Advisor Found.</p>
                  ) : (<>
                    <thead className="border-b font-medium sticky top-16">
                      <tr className="text-blue-700 bg-slate-200">
                        <th scope="col" className="px-1 border border-black">Reference ID</th>
                        <th scope="col" className="px-1 border border-black">Entry Date</th>
                        <th scope="col" className="px-1 border border-black">Branch</th>
                        <th scope="col" className="px-1 border border-black">Company</th>
                        <th scope="col" className="px-1 border border-black">Category</th>
                        <th scope="col" className="px-1 border border-black">Segment</th>
                        <th scope="col" className="px-1 border border-black">Sourcing</th>
                        <th scope="col" className="px-1 border border-black">Policy No</th>
                        <th scope="col" className="px-1 border border-black">Insured Name</th>
                        <th scope="col" className="px-1 border border-black">Contact No</th>
                        <th scope="col" className="px-1 border border-black">State</th>
                        <th scope="col" className="px-1 border border-black">District</th>
                        <th scope="col" className="px-1 border border-black">Vehicle Reg No</th>
                        <th scope="col" className="px-1 border border-black">Policy Start Date</th>
                        <th scope="col" className="px-1 border border-black">Policy End Date</th>
                        <th scope="col" className="px-1 border border-black">OD Expiry</th>
                        <th scope="col" className="px-1 border border-black">TP Expiry</th>
                        <th scope="col" className="px-1 border border-black">IDV</th>
                        <th scope="col" className="px-1 border border-black">Body Type</th>
                        <th scope="col" className="px-1 border border-black">Make & Model</th>
                        <th scope="col" className="px-1 border border-black">MFG Year</th>
                        <th scope="col" className="px-1 border border-black">Registration Date</th>
                        <th scope="col" className="px-1 border border-black">Vehicle Age</th>
                        <th scope="col" className="px-1 border border-black">Fuel</th>
                        <th scope="col" className="px-1 border border-black">GVW</th>
                        <th scope="col" className="px-1 border border-black">C.C</th>
                        <th scope="col" className="px-1 border border-black">Engine No</th>
                        <th scope="col" className="px-1 border border-black">Chassis No</th>
                        <th scope="col" className="px-1 border border-black">Policy Type</th>
                        <th scope="col" className="px-1 border border-black">Product Code</th>
                        <th scope="col" className="px-1 border border-black">OD Premium</th>
                        <th scope="col" className="px-1 border border-black">Liability Premium</th>
                        <th scope="col" className="px-1 border border-black">Net Premium</th>
                        <th scope="col" className="px-1 border border-black">Final Amount</th>
                        <th scope="col" className="px-1 border border-black">OD Discount</th>
                        <th scope="col" className="px-1 border border-black">NCB</th>
                        <th scope="col" className="px-1 border border-black">Advisor Name</th>
                        <th scope="col" className="px-1 border border-black">Sub Advisor</th>
                        <th scope="col" className="px-1 border border-black">Payout On</th>
                        <th scope="col" className="px-1 border border-black">Advisor Payout</th>
                        <th scope="col" className="px-1 border border-black">Advisor Payable Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 overflow-y-hidden">
                      {allDetailsData.reverse().slice(startIndex, endIndex).map((data) => (
                        <tr
                          className="border-b  bg-slate-200 text-sm font-medium"
                          key={data._id}>
                          <td className="whitespace-nowrap px-1 border border-black">{data.policyrefno}</td>
                          <td className="whitespace-nowrap px-1 border border-black">{data.entryDate}</td>
                          <td className="whitespace-nowrap px-1 border border-black">{data.branch}</td>
                          <td className="whitespace-nowrap px-1 border border-black">{data.company}</td>
                          <td className="whitespace-nowrap px-1 border border-black">{data.category}</td>
                          <td className="whitespace-nowrap px-1 border border-black">{data.segment}</td>
                          <td className="whitespace-nowrap px-1 border border-black">{data.sourcing}</td>
                          <td className="whitespace-nowrap px-1 border border-black">{data.policyNo}</td>
                          <td className="whitespace-nowrap px-1 border border-black">{data.insuredName}</td>
                          <td className="whitespace-nowrap px-1 border border-black">{data.contactNo}</td>
                          <td className="whitespace-nowrap px-1 border border-black">{data.states}</td>
                          <td className="whitespace-nowrap px-1 border border-black">{data.district}</td>
                          <td className="whitespace-nowrap px-1 border border-black">{data.vehRegNo}</td>
                          <td className="whitespace-nowrap px-1 border border-black">{data.policyStartDate}</td>
                          <td className="whitespace-nowrap px-1 border border-black">{data.policyEndDate}</td>
                          <td className="whitespace-nowrap px-1 border border-black">{data.odExpiry}</td>
                          <td className="whitespace-nowrap px-1 border border-black">{data.tpExpiry}</td>
                          <td className="whitespace-nowrap px-1 border border-black">{data.idv}</td>
                          <td className="whitespace-nowrap px-1 border border-black">{data.bodyType}</td>
                          <td className="whitespace-nowrap px-1 border border-black">{data.makeModel}</td>
                          <td className="whitespace-nowrap px-1 border border-black">{data.mfgYear}</td>
                          <td className="whitespace-nowrap px-1 border border-black">{data.registrationDate}</td>
                          <td className="whitespace-nowrap px-1 border border-black">{data.vehicleAge}</td>
                          <td className="whitespace-nowrap px-1 border border-black">{data.fuel}</td>
                          <td className="whitespace-nowrap px-1 border border-black">{data.gvw}</td>
                          <td className="whitespace-nowrap px-1 border border-black">{data.cc}</td>
                          <td className="whitespace-nowrap px-1 border border-black">{data.engNo}</td>
                          <td className="whitespace-nowrap px-1 border border-black">{data.chsNo}</td>
                          <td className="whitespace-nowrap px-1 border border-black">{data.policyType}</td>
                          <td className="whitespace-nowrap px-1 border border-black">{data.productCode}</td>
                          <td className="whitespace-nowrap px-1 border border-black">{data.odPremium}</td>
                          <td className="whitespace-nowrap px-1 border border-black">{data.liabilityPremium}</td>
                          <td className="whitespace-nowrap px-1 border border-black">{data.netPremium}</td>
                          <td className="whitespace-nowrap px-1 border border-black">{data.finalEntryFields}</td>
                          <td className="whitespace-nowrap px-1 border border-black">{data.odDiscount}</td>
                          <td className="whitespace-nowrap px-1 border border-black">{data.ncb}</td>
                          <td className="whitespace-nowrap px-1 border border-black">{data.advisorName}</td>
                          <td className="whitespace-nowrap px-1 border border-black">{data.subAdvisor}</td>
                          <td className="whitespace-nowrap px-1 border border-black">{data.payoutOn}</td>
                          <td className="whitespace-nowrap px-1 border border-black">{`₹${data.advisorPayoutAmount}`}</td>
                          <td className="whitespace-nowrap px-1 border border-black">{`₹${data.advisorPayableAmount}`}</td>
                        </tr>
                      ))}
                    </tbody>
                  </>)}
                </div>)}
            </table>
          </div>

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
export default InsuranceLists;
