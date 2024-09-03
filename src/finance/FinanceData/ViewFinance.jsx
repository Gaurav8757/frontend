import axios from "axios";
import { useEffect, useState, Suspense } from "react";
import FinanceTable from "./FinanceTable.jsx";
import TextLoader from "../../loader/TextLoader.jsx";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import * as XLSX from 'xlsx';
import VITE_DATA from "../../config/config.jsx";
import Pagination from "./Paignation.jsx";
function ViewFinance() {
  const [allDetailsData, setAllDetailsData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [searchBranch, setSearchBranch] = useState("");
  const [totalPages, setTotalPages] = useState();
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState();
  const [error, setError] = useState("");
  const [searchId, setSearchId] = useState("");
  const [advs, setAdv] = useState("");
  const [searchCompany, setSearchCompany] = useState("");
  const [veh, setVeh] = useState("");
  const [searchInsuredName, setSearchInsuredName] = useState("");
  const [policyNo, setPolicyNo] = useState("");
  
  const name = sessionStorage.getItem('finname');


  useEffect(() => {
    const fetchData = async () => {
      try {
        // setLoading(true);
        const token = sessionStorage.getItem("token");
        const response = await axios.get(`${VITE_DATA}/alldetails/viewdata`, {
          headers: {
            Authorization: `${token}`,
          },
          params: {
            page: currentPage,
            limit: itemsPerPage
          }
        });
        setAllDetailsData(response.data.allList);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [currentPage, itemsPerPage]);// Include currentPage in the dependency array

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get('page')) || 1;
    const limit = parseInt(params.get('limit')) || 1000;
    setCurrentPage(page);
    setItemsPerPage(limit);
  }, []);

  // refreshing page after updating data
  const onUpdateInsurance = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        toast.error("Not Authorized yet.. Try again!");
      } else {
        const response = await axios.get(
          `${VITE_DATA}/alldetails/viewdata`,
          {
            headers: {
              Authorization: `${token}`,
            },
            params: {
              page: currentPage, // Send current page as a parameter

            }
          }
        );
        setAllDetailsData(response.data.allList);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error("Error fetching updated insurance data:", error);
    }
  };

  const handleDateRangeChange = (event, type) => {
    if (type === "start") {
      setStartDate(event.target.value);
    } else if (type === "end") {
      setEndDate(event.target.value);
    }
  };

  const filteredData = allDetailsData.filter(data => {
    // Check if data is defined

    if (!data) return false;
    // Filter conditions
    const idLower = data.policyrefno?.toLowerCase() || "";
    const insuredNameLower = data.insuredName?.toLowerCase() || "";
    const companyLower = data.company?.toLowerCase() || "";
    const policyLower = data.policyNo?.toLowerCase() || "";
    const branchLower = data.branch?.toLowerCase() || "";
    const adv = data.advisorName?.toLowerCase() || "";
    const vehRegLower = data.vehRegNo?.toLowerCase() || "";
    return (
      // Filter conditions using optional chaining and nullish coalescing
      (idLower.includes(searchId.toLowerCase()) || searchId === '') &&
      (adv.includes(advs.toLowerCase()) || advs === "") &&
      (branchLower.includes(searchBranch.toLowerCase()) || searchBranch === '') &&
      (insuredNameLower.includes(searchInsuredName.toLowerCase()) || searchInsuredName === '') &&
      (companyLower.includes(searchCompany.toLowerCase()) || searchCompany === '') &&
      (vehRegLower.includes(veh.toLowerCase()) || veh === '') &&
      // Update the state variable for company correctly
      (policyLower.includes(policyNo.toLowerCase()) || policyNo === '') &&
      // Ensure correct date filtering logic
      (startDate === "" || new Date(data.entryDate) >= new Date(startDate)) &&
      (endDate === "" || new Date(data.entryDate) <= new Date(endDate))
    );
  });

  // Calculate total number of pages
  const totalItems = filteredData.length;

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const exportToExcel = () => {
    try {
      const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";
      const fileName = `${name}_executive`;
      // Map all data without filtering by current date
      const dataToExport = filteredData.map(row => {
        return [
          row.entryDate,
          row.policyrefno,
          row.branch,
          row.insuredName,
          row.contactNo,
          row.staffName,
          row.currentTime,
          row.empTime,
          row.company,
          row.category,
          row.policyType,
          row.policyNo,
          row.engNo,
          row.chsNo,
          row.odPremium,
          row.liabilityPremium,
          row.netPremium,
          row.rsa,
          row.taxes,
          row.finalEntryFields,
          row.odDiscount,
          row.ncb,
          row.policyPaymentMode,
          row.states,
          row.district,
          row.vehRegNo,
          row.segment,
          row.sourcing,
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
          row.sitcapacity,
          row.cc,
          row.productCode,
          row.advisorName,
          row.subAdvisor,
          row.payoutOn,
          row.cvpercentage,
          row.advisorPayoutAmount,
          row.advisorPayableAmount,
          row.branchpayoutper,
          row.branchPayout,
          row.branchPayableAmount
        ];
      });

      // Get all table headers in the same order
      const tableHeaders = [
        "Entry Date",
        "Reference ID",
        "Branch",
        "Insured Name",
        "Contact No",
        "Policy Made By",
        "Policy Received Time",
        "Policy Update Time",
        "Company",
        "Category",
        "Policy Type",
        "Policy No",
        "Engine No",
        "Chassis No",
        "OD Premium",
        "Liability Premium",
        "Net Premium",
        "RSA",
        "GST Amount",
        "Final Amount",
        "OD Discount(%)",
        "NCB",
        "Policy Payment Mode",
        "State",
        "District",
        "Vehicle Reg No",
        "Segment",
        "Sourcing",
        "Policy Start Date",
        "Policy End Date",
        "OD Expiry",
        "TP Expiry",
        "IDV",
        "Body Type",
        "Make & Model",
        "MFG Year",
        "Registration Date",
        "Vehicle Age",
        "Fuel",
        "GVW",
        "Seating Capacity",
        "C.C",
        "Product Code",
        "Advisor Name",
        "Sub Advisor",
        "Payout On",
        "Advisor %",
        "Advisor Payout",
        "Advisor Payable Amount",
        "Branch %",
        "Branch Payout",
        "Branch Payable Amount"
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
  };




  


const exportAdvisorWiseReconData = () => {
    try {
        const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileExtension = ".xlsx";
        const fileName = `${name}_executive`;
        // Check if filteredData is not empty
        if (!filteredData.length) {
            throw new Error("No data available to export.");
        }

        // Prepare data to export
        const dataToExports = filteredData.map(row => [
            row.entryDate,
            row.company,
            row.policyNo,
            row.insuredName,
            row.vehRegNo,
            row.makeModel,
            row.productCode,
            row.branch,
            row.advId,
            row.advisorName,
            row.odPremium,
            row.liabilityPremium,
            row.netPremium,
            row.finalEntryFields,
            row.cvpercentage,
            row.advisorPayoutAmount,
            row.advisorPayableAmount,
            row.dr || "",
            row.cr || "",
            row.runningBalance || "",
            row.policyPaymentMode,
            row.payDate || "",
            row.remarks || ""
        ]);

        // Define table headers
        const tableHeaders = [
            [
                "Entry Date",
                "Company Name",
                "Policy No",
                "Insured Name",
                "Vehicle Reg No",
                "Make & Model",
                "Product Code",
                "Branch",
                "Advisor ID",
                "Advisor Name",
                "OD Premium",
                "Liability Premium",
                "Net Premium",
                "Final Amount",
                "Advisor Payout %",
                "Advisor Payout",
                "Advisor Payable Amount",
                "DR",
                "CR",
                "Running Balance",
                "Payment Mode",
                "Payment Date",
                "Remarks"
            ]
        ];
        // Create worksheet
        const ws = XLSX.utils.aoa_to_sheet([...tableHeaders, ...dataToExports]);
        // Auto-size columns based on content
        const colWidths = tableHeaders[0].map((_, i) => ({ wpx: Math.max(...dataToExports.map(row => row[i] ? row[i].toString().length : 0)) * 8 + 50 }));
        ws["!cols"] = colWidths;

        // Create workbook and export
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Data");
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        const url = URL.createObjectURL(data);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName + fileExtension);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Clean up
    } catch (error) {
        console.error("Error exporting to Excel:", error);
        toast.error("Error exporting to Excel");
    }
};

const handleAdvisorWiseReconData = () => {
    exportAdvisorWiseReconData();
};







  const exportMisToExcel = () => {
    try {
      const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";
      const fileName = `${name}_executive`;
      // Map all data without filtering by current date
      const dataToExports = filteredData.map(row => {
        return [
          row.entryDate,
          row.company,
          row.policyNo,
          row.insuredName,
          row.vehRegNo,
          row.makeModel,
          row.gvw,
          row.cc,
          row.ncb,
          row.odDiscount,
          row.sitcapacity,
          row.fuel,
          row.productCode,
          row.policyType,
          row.odPremium,
          row.liabilityPremium,
          row.netPremium,
          row.finalEntryFields,
          row.branch,
          row.advisorName,
          row.payoutOn,
          row.cvpercentage,
          row.advisorPayoutAmount,
          row.advisorPayableAmount,
          row.branchpayoutper,
          row.branchPayout,
          row.branchPayableAmount,
        ];
      });

      // Get all table headers in the same order
      const tableHeaders = [
        "Entry Date", // corresponds to row.entryDate
        "Company Name", // corresponds to row.company
        "Policy No", // corresponds to row.policyNo
        "Insured Name", // corresponds to row.insuredName
        "Vehicle Reg No", // corresponds to row.vehRegNo
        "Make & Model", // corresponds to row.makeModel
        "GVW", // corresponds to row.gvw
        "C.C", // corresponds to row.cc
        "NCB", // corresponds to row.ncb
        "OD Discount(%)", // corresponds to row.odDiscount
        "Seating Capacity", // corresponds to row.sitcapacity
        "Fuel Type", // corresponds to row.fuel
        "Product Code", // corresponds to row.productCode
        "Policy Type", // corresponds to row.policyType
        "OD Premium", // corresponds to row.odPremium
        "Liability Premium", // corresponds to row.liabilityPremium
        "Net Premium", // corresponds to row.netPremium
        "Final Amount", // corresponds to row.finalEntryFields
        "Branch Name", // corresponds to row.branch
        "Advisor Name", // corresponds to row.advisorName
        "Payout On", // corresponds to row.payoutOn
        "Advisor Percentage%", // corresponds to row.cvpercentage
        "Advisor Payout", // corresponds to row.advisorPayoutAmount
        "Advisor Payable Amount", // corresponds to row.advisorPayableAmount
        "Branch Percentage%", // corresponds to row.branchpayoutper
        "Branch Payout", // corresponds to row.branchPayout
        "Branch Payable Amount" // corresponds to row.branchPayableAmount
      ];

      // Create worksheet
      const ws = XLSX.utils.aoa_to_sheet([tableHeaders, ...dataToExports]);
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
  const handleMisExportClick = () => {
    exportMisToExcel();
  };
  if (error) return <div>Error: {error}</div>;

  // delete function
  // const onDeleteAllData = async (_id) => {
  //   try {
  //     await axios.delete(`https://eleedomimf.onrender.com/alldetails/deletedata/${_id}`);
  //     toast.warn("Insurance Data Deleted.....!", {
  //       theme: "dark",
  //       position: "top-right",
  //     });
  //     setAllDetailsData((prevData) => prevData.filter((data) => data._id !== _id));
  //   } catch (error) {
  //     toast.error('Error deleting Insurance');
  //     console.error("Error deleting Insurance :", error);
  //   }
  // };

  return (
    <section className="container relative  p-0 sm:ml-40 bg-slate-200">
      <div className="container-fluid flex justify-center p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-slate-200">
        <div className="inline-block min-w-full  w-full py-0 ">
          <div className=" m-2 flex justify-between text-blue-700 max-w-auto mx-auto w-auto ">
            <h1></h1>
            <span className=" flex justify-center text-center  text-3xl font-semibold  ">View All Policies</span>
            <div className="flex ">
              <button className="text-end  mr-1 flex justify-end  text-3xl font-semibold " onClick={handleExportClick}><img src="/excel.png" alt="download" height={50} width={40} /></button>
               {/* button 2 */}
               <button
                  className="text-end mx-0 flex justify-end  text-3xl mt-1 font-semibold"
                  onClick={handleAdvisorWiseReconData}
                >
                  <img src="/dwnd.png" alt="download" height={25} width={35} />
                </button>
              <button className="text-end   mr-1  justify-end  text-xl font-semibold " onClick={handleMisExportClick}>
              <Suspense fallback={<div>Loading...</div>}>
              <img src="/public/xls.png"  className="rounded-xl mx-0 my-0" height={50} width={40} alt="mis "/>
            </Suspense> 
              
              </button>
              <NavLink to={{
                pathname: "/finance/home/new",
                search: `?page=${currentPage}&limit=${itemsPerPage}`
              }} className="flex justify-center">
                <button type="button" className="text-white  mt-2 justify-end bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded text-sm px-2 py-1 text-center me-2 mb-2 ">Go Back</button>
              </NavLink></div>
          </div>
          <div className="flex-wrap flex justify-between  text-blue-500  ">
            {/* date range filter */}
            <div className="flex   p-0 text-start  lg:w-1/4">
              <label className="my-0 text-lg whitespace-nowrap font-medium text-gray-900">Date:</label>
              <input type="date" value={startDate} onChange={(e) => handleDateRangeChange(e, "start")} className="shadow input-style w-52 my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2" placeholder="From Date" />
              <span className='text-justify mx-1 my-1 '>to</span>
              <input type="date" value={endDate} onChange={(e) => handleDateRangeChange(e, "end")} className="shadow input-style w-52 my-0 py-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none  px-0 mb-2 " placeholder="To Date" />
            </div>
            <div className=" p-0   text-center  lg:w-1/4">
              <label className="my-0 text-lg font-medium text-gray-900">ID:</label>
              <input
                type="search"
                onChange={(e) => setSearchId(e.target.value)}
                className="shadow input-style w-52 my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                placeholder="ID"
              />
            </div>
            <div className="flex justify-start p-0 text-end  lg:w-1/4">
              <label className="my-0 text-lg font-medium text-gray-900">Company:</label>
              <input
                type="search"
                onChange={(e) => setSearchCompany(e.target.value)}
                className="shadow input-style w-52 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                placeholder="Company Name"
              />
            </div>
            <div className="text-start lg:w-1/4">
              <label className="my-0 text-lg font-medium text-gray-900">Insured Name:</label>
              <input
                type="search"
                onChange={(e) => setSearchInsuredName(e.target.value)}
                className="shadow input-style w-52 my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 ml-2"
                placeholder="Insured Name"
              />
            </div>
            <div className="flex justify-start my-3  text-start lg:w-1/4">
              <label className="my-0 text-lg font-medium text-gray-900">Branch:</label>
              <input
                type="search"
                onChange={(e) => setSearchBranch(e.target.value)}
                className="shadow input-style w-52 my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                placeholder="Branch Name"
              />
            </div>
            <div className="flex justify-start my-3  text-start lg:w-1/4">
              <label className="my-0 text-base whitespace-nowrap font-medium text-gray-900">Vehicle Reg. No.:</label>
              <input
                type="search"
                onChange={(e) => setVeh(e.target.value)}
                className="shadow input-style w-52 my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                placeholder="Vehicle Registration Number"
              />
            </div>
            {/* <div className="flex justify-start my-3  text-start lg:w-1/4"></div> */}
            <div className=" p-0 text-center mt-3 justify-start w-1/2 lg:w-1/4">
              <label className="my-0 text-lg font-medium text-gray-900">Policy No:</label>
              <input
                type="search"
                onChange={(e) => setPolicyNo(e.target.value)}
                className="shadow p-0 text-start w-52 lg:w-1/2 input-style  my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                placeholder="Policy Number"
              /></div>
            <div className=" p-0 text-center mt-3 justify-start w-1/2 lg:w-1/4">
              <label className="my-0 text-lg whitespace-nowrap font-medium text-gray-900">
                Advisor Name:
              </label>
              <input
                type="search"
                onChange={(e) => setAdv(e.target.value)}
                className="shadow p-0 text-start  lg:w-1/2 input-style  my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                placeholder="Search by Advisor"
              />
            </div>
          </div>

         
          {filteredData.length === 0 ? (
                <TextLoader />
            ) : (
              <FinanceTable filteredData = {filteredData} onUpdateInsurance = {onUpdateInsurance} totalItems = {totalItems}/>
            )}
         
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
}

export default ViewFinance;