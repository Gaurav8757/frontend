import axios from "axios";
import { useEffect, useState, Suspense } from "react";
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';
import VITE_DATA from "../../config/config.jsx";
import TextLoader from "../../loader/TextLoader.jsx";

function MasterView() {
  const [allDetailsData, setAllDetailsData] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState();
  const [searchId, setSearchId] = useState("");
  const [searchCompany, setSearchCompany] = useState("");
  const [searchInsuredName, setSearchInsuredName] = useState("");
  const [searchPolicyMadeBy, setSearchPolicyMadeBy] = useState("");
  const [policies, setPolicies] = useState("");
  const [adv, setAdv] = useState("");

  const name = sessionStorage.getItem('name');
  useEffect(() => {
    setItemsPerPage(100);
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!name) {
          console.error('Branch information not found in sessionStorage');
          return;
        }
        const response = await axios.get(
          `${VITE_DATA}/alldetails/viewdata/branch/hpur`,
          { params: { branch: name } }
        );
        const fetchedData = response.data;
        setAllDetailsData(fetchedData);
        // setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [name]);

  const handleDateRangeChange = (event, type) => {
    if (type === "start") {
      setStartDate(event.target.value);
    } else if (type === "end") {
      setEndDate(event.target.value);
    }
  };

  const filteredData = allDetailsData?.filter(data => {
    if (!data) return false;
    const idLower = data.policyrefno?.toLowerCase() || "";
    const numbers = data.policyNo?.toLowerCase() || "";
    const insuredNameLower = data.insuredName?.toLowerCase() || "";
    const companyLower = data.company?.toLowerCase() || "";
    const advisor = data.advisorName?.toLowerCase() || "";
    const policyMadeByLower = data.policyMadeBy?.toLowerCase() || "";
    return (
      (idLower.includes(searchId.toLowerCase()) || searchId === '') &&
      (numbers.includes(policies.toLowerCase()) || policies === '') &&
      (advisor.includes(adv.toLowerCase()) || adv === '') &&
      (insuredNameLower.includes(searchInsuredName.toLowerCase()) || searchInsuredName === '') &&
      (companyLower.includes(searchCompany.toLowerCase()) || searchCompany === '') &&
      (policyMadeByLower.includes(searchPolicyMadeBy.toLowerCase()) || searchPolicyMadeBy === '') &&
      (startDate === "" || new Date(data.entryDate) >= new Date(startDate)) &&
      (endDate === "" || new Date(data.entryDate) <= new Date(endDate))
    );
  });

  const totalItems = filteredData?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const calculateAdvisorPayoutAmount = (finalEntryFields, percentage) => {
    return finalEntryFields * (percentage / 100);
  };

  const calculateAdvisorPayableAmount = (finalEntryFields, advisorPayout) => {
    return finalEntryFields - advisorPayout;
  };

  const handleNumericInput = (e) => {
    const input = e.target.innerText;
    const numericInput = input.replace(/[^\d.]/g, ''); // Remove any non-numeric characters
    if (input !== numericInput) {
      e.target.innerText = numericInput; // Update the contentEditable element with numeric value
    }
  };

  const handleInputChange = async (itemId, value) => {
    try {
      // Find the item in the current data state
      const itemToUpdate = allDetailsData.find(item => item._id === itemId);
      if (!itemToUpdate) {
        throw new Error(`Item with ID ${itemId} not found.`);
      }

      // Parse the input value to a float
      const parsedPercentage = parseFloat(value) || 0;

      // Check if cvpercentage is not 0 and is different from the current value
      if (parsedPercentage === itemToUpdate.cvpercentage) {
        // If not different or is zero, return without updating
        return;
      }

      // Calculate advisorPayout and advisorPayable based on the updated cvpercentage
      let advisorPayout, advisorPayable;

      if (
        itemToUpdate.policyType === 'COMP' &&
        itemToUpdate.productCode === 'PVT-CAR' &&
        itemToUpdate.payoutOn === 'OD'
      ) {
        advisorPayout = calculateAdvisorPayoutAmount(parseFloat(itemToUpdate.odPremium), parsedPercentage);
        advisorPayable = calculateAdvisorPayableAmount(parseFloat(itemToUpdate.finalEntryFields), advisorPayout);
      } else {
        advisorPayout = calculateAdvisorPayoutAmount(parseFloat(itemToUpdate.netPremium), parsedPercentage);
        advisorPayable = calculateAdvisorPayableAmount(parseFloat(itemToUpdate.finalEntryFields), advisorPayout);
      }

      // Create updated item data with only necessary changes
      const updatedItem = {
        ...itemToUpdate,
        cvpercentage: parsedPercentage,
        advisorPayoutAmount: parseFloat(advisorPayout.toFixed(2)),
        advisorPayableAmount: parseFloat(advisorPayable.toFixed(2)),
      };

      // Update the state with the new calculated values
      const updatedData = allDetailsData.map(item =>
        item._id === itemId ? updatedItem : item
      );
      setAllDetailsData(updatedData);

      // Call the API to save the changes
      await updateInsuranceAPI(
        itemId,
        updatedItem.cvpercentage,
        updatedItem.advisorPayoutAmount,
        updatedItem.advisorPayableAmount
      );

    } catch (error) {
      console.error("Error handling advisor payout change:", error);
      toast.error("Failed to handle advisor payout change. Please try again.");
    }
  };



  const updateInsuranceAPI = async (itemId, cvpercentage, advisorPayoutAmount, advisorPayableAmount) => {
    try {
      const resp = await axios.put(`${VITE_DATA}/alldetails/updatedata/${itemId}`, {
        cvpercentage,
        advisorPayoutAmount,
        advisorPayableAmount
      });

      // Assuming the backend returns a success message in resp.data.status
      toast.success(`${resp.data.status}`, {
        position: "top-center",
        autoClose: 1000, // Adjusted autoClose time to 1 second (1000 ms)
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Optionally trigger a data refresh after update
      // await onUpdateInsurance();
    } catch (error) {
      console.error("Error updating insurance details:", error);
      toast.error("Failed to update insurance details. Please try again.");
    }
  };




  const exportToExcel = () => {
    try {
      const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";
      const fileName = `${name}_BRANCH`;
      // Map all data without filtering by current date
      const dataToExport = filteredData.map(row => {
        return [
          row.policyrefno, // "Reference ID"
          row.entryDate, // "Entry Date"
          row.branch, // "Branch"
          row.insuredName, // "Insured Name"
          row.contactNo, // "Contact No"
          row.staffName, // "Policy Made By"
          row.states, // "State"
          row.district, // "District"
          row.vehRegNo, // "Vehicle Reg No"
          row.segment, // "Segment"
          row.sourcing, // "Sourcing"
          row.company, // "Company"
          row.category, // "Category"
          row.policyType, // "Policy Type"
          row.productCode, // "Product Code"
          row.policyNo, // "Policy No"
          row.engNo, // "Engine No"
          row.chsNo, // "Chassis No"
          row.odPremium, // "OD Premium"
          row.liabilityPremium, // "Liability Premium"
          row.netPremium, // "Net Premium"
          row.rsa, // "RSA"
          row.taxes, // "GST(in Amount)"
          row.finalEntryFields, // "Final Amount"
          row.odDiscount, // "OD Discount(%)"
          row.ncb, // "NCB"
          row.policyPaymentMode, // "Policy Payment Mode"
          row.policyStartDate, // "Policy Start Date"
          row.policyEndDate, // "Policy End Date"
          row.odExpiry, // "OD Expiry"
          row.tpExpiry, // "TP Expiry"
          row.idv, // "IDV"
          row.bodyType, // "Body Type"
          row.makeModel, // "Make & Model"
          row.mfgYear, // "MFG Year"
          row.registrationDate, // "Registration Date"
          row.vehicleAge, // "Vehicle Age"
          row.fuel, // "Fuel Type"
          row.gvw, // "GVW"
          row.cc, // "C.C"
          row.advisorName, // "Advisor Name"
          row.subAdvisor, // "Sub Advisor"
          row.payoutOn, // "Payout On"
          row.cvpercentage, // "Adivsor %"
          row.advisorPayoutAmount, // "Advisor Payout"
          row.advisorPayableAmount, // "Advisor Payable Amount"
          row.branchpayoutper, // "Branch Payout %"
          row.branchPayout, // "Branch Payout"
          row.branchPayableAmount // "Branch Payable Amount"
        ];
      });

      // Get all table headers in the same order
      const tableHeaders = [
        "Reference ID",
        "Entry Date",
        "Branch",
        "Insured Name",
        "Contact No",
        "Policy Made By",
        "State",
        "District",
        "Vehicle Reg No",
        "Segment",
        "Sourcing",
        "Company",
        "Category",
        "Policy Type",
        "Product Code",
        "Policy No",
        "Engine No",
        "Chassis No",
        "OD Premium",
        "Liability Premium",
        "Net Premium",
        "RSA",
        "GST(in Amount)",
        "Final Amount",
        "OD Discount(%)",
        "NCB",
        "Policy Payment Mode",
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
        "Fuel Type",
        "GVW",
        "C.C",
        "Advisor Name",
        "Sub Advisor",
        "Payout On",
        "Adivsor %",
        "Advisor Payout",
        "Advisor Payable Amount",
        "Branch Payout %",
        "Branch Payout",
        "Branch Payable Amount",
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
  return (
    <section className="container-fluid  p-0 sm:ml-48 bg-slate-200">
      <div className="inline-block min-w-full w-full py-0">
        <div className="my-4  flex justify-between text-blue-700 max-w-auto mx-auto w-auto ">
          <h1></h1>
          <span className=" flex justify-center text-center  text-3xl font-semibold  ">View All Policies</span>
          <div className="flex ">
            <button className="text-end  flex justify-end  text-3xl font-semibold " onClick={handleExportClick}><img src="/excel.png" alt="download" className="w-10" /></button>
            <button className="text-end   mr-0.5  justify-end  text-xl font-semibold  my-auto" onClick={handleMisExportClick}>  <Suspense fallback={<div>Loading...</div>}>
              <img src="/public/xls.png" className="rounded-xl mx-0 my-auto" height={50} width={40} alt="mis " />
            </Suspense>
            </button>
          </div>
        </div>
        <div className=" relative mt-2">
          <div className="min-w-full w-full py-0  block z-50">
            <div className="flex-wrap flex justify-between  text-blue-500  ">
              {/* date range filter */}
              <div className="flex   p-0 text-start w-full lg:w-1/4">
                <label className="my-auto  text-base whitespace-nowrap font-medium text-gray-900">Date:</label>
                <input type="date" value={startDate} onChange={(e) => handleDateRangeChange(e, "start")} className="shadow input-style w-52 my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0  ml-2" placeholder="From Date" />
                <span className='text-justify mx-1 my-1 '>to</span>
                <input type="date" value={endDate} onChange={(e) => handleDateRangeChange(e, "end")} className="shadow input-style w-52 my-0 py-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none  px-0  " placeholder="To Date" />
              </div>
              <div className=" p-0 justify-start text-center my-auto  lg:w-1/5">
                <label className="my-auto  text-base font-medium text-gray-900">ID:</label>
                <input
                  type="search"
                  onChange={(e) => setSearchId(e.target.value)}
                  className="shadow p-0 text-start lg:w-1/2 input-style  my-auto  ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0  ml-2"
                  placeholder="ID"
                />
              </div>


              <div className=" flex text-start my-auto  justify-start  lg:w-1/5">
                <label className="my-auto  text-base font-medium text-gray-900">Company:</label>
                <input
                  type="search"
                  onChange={(e) => setSearchCompany(e.target.value)}
                  className="shadow p-0 text-start lg:w-1/2 input-style  my-auto  ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 ml-2"
                  placeholder="Company Name"
                />
              </div>
              <div className="flex text-start my-auto justify-start  lg:w-1/5">
                <label className="my-auto text-base   font-medium text-gray-900">Insured Name:</label>
                <input
                  type="search"
                  onChange={(e) => setSearchInsuredName(e.target.value)}
                  className="shadow p-0 text-start lg:w-1/2 input-style  my-auto ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0  ml-2"
                  placeholder="Insured Name"
                />
              </div>
              <div className=" flex justify-start p-0 text-end my-auto  w-full lg:w-1/5">
                <label className="my-auto  text-base font-medium text-gray-900">Policy No.:</label>
                <input
                  type="search"
                  onChange={(e) => setPolicies(e.target.value)}
                  className="shadow p-0 text-start lg:w-1/2 input-style  my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 ml-2"
                  placeholder="Policy No."
                />
              </div>
              <div className=" flex justify-start p-0 text-end my-auto  w-full lg:w-1/5">
                <label className="my-auto  text-base font-medium text-gray-900">Advisor Name:</label>
                <input
                  type="search"
                  onChange={(e) => setAdv(e.target.value)}
                  className="shadow p-0 text-start lg:w-1/2 input-style  my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 ml-2"
                  placeholder="AdvisorName"
                />
              </div>


              <div className="flex text-start my-5   justify-start  lg:w-1/5">
                <label className="my-auto  text-base font-medium whitespace-nowrap text-gray-900">Policy Made By:</label>
                <input
                  type="search"
                  onChange={(e) => setSearchPolicyMadeBy(e.target.value)}
                  className="shadow p-0 text-start lg:w-1/2 input-style  my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0  ml-2"
                  placeholder="Policy Made By"
                /></div>
            </div>

            <table className="min-w-full text-center text-xs font-light table  bg-white border border-gray-200 divide-y divide-gray-200  ">

              <div className="min-w-full  border text-center bg-slate-200 text-sm font-light table">
                {filteredData?.length === 0 ? ( // Conditional rendering for loading state
                  <TextLoader />
                ) : (<>
                  <thead className=" font-medium  bg-slate-300 sticky top-16 border border-black">
                    <tr className="text-blue-700 sticky top-16 border border-black ">
                      {/* <th scope="col" className=" border border-black">Update</th> */}
                      <th scope="col" className="px-1 pt-2 sticky border border-black">Reference ID</th>
                      <th scope="col" className="px-1 pt-2 sticky border border-black">Entry Date</th>
                      <th scope="col" className="px-1 pt-2 sticky border border-black">Branch</th>
                      <th scope="col" className="px-1 pt-2 sticky border border-black">Insured Name</th>
                      <th scope="col" className="px-1 pt-2 sticky border border-black">Contact No</th>
                      <th scope="col" className="px-1 pt-2 sticky border border-black">Policy Made By</th>
                      <th scope="col" className="px-1 pt-2 sticky border border-black">State</th>
                      <th scope="col" className="px-1 pt-2 sticky border border-black">District</th>
                      <th scope="col" className="px-1 pt-2 sticky border border-black">Vehicle Reg No</th>
                      <th scope="col" className="px-1 pt-2 sticky border border-black">Company</th>
                      <th scope="col" className="px-1 pt-2 sticky border border-black">Category</th>
                      <th scope="col" className="px-1 pt-2 sticky border border-black">Policy Type</th>
                      <th scope="col" className="px-1 pt-2 sticky border border-black">Segment</th>
                      <th scope="col" className="px-1 pt-2 sticky border border-black">Product Code</th>
                      <th scope="col" className="px-1 pt-2 sticky border border-black">Sourcing</th>
                      <th scope="col" className="px-1 pt-2 sticky border border-black">Policy No</th>
                      <th scope="col" className="px-1 pt-2 sticky border border-black">Engine No.</th>
                      <th scope="col" className="px-1 pt-2 sticky border border-black">Chassis No</th>
                      <th scope="col" className="px-1 pt-2 sticky border border-black">OD Premium</th>
                      <th scope="col" className="px-1 pt-2 sticky border border-black">Liability Premium</th>
                      <th scope="col" className="px-1 pt-2 sticky border border-black">Net Premium</th>
                      <th scope="col" className="px-1 pt-2 sticky border border-black">RSA</th>
                      <th scope="col" className="px-1 pt-2 sticky border border-black">GST(in Amount)</th>
                      <th scope="col" className="px-1 pt-2 sticky border border-black">Final Amount</th>
                      <th scope="col" className="px-1 pt-2 sticky border border-black">OD Discount(%)</th>
                      <th scope="col" className="px-1 pt-2 sticky border border-black">NCB(%)</th>
                      <th scope="col" className="px-1 pt-2 sticky border border-black">Policy Payment Mode</th>
                      <th scope="col" className="px-1 pt-2 sticky border border-black">Policy Start Date</th>
                      <th scope="col" className="px-1 pt-2 sticky border border-black">Policy End Date</th>
                      <th scope="col" className="px-1 pt-2 sticky border border-black">OD Expiry</th>
                      <th scope="col" className="px-1 pt-2 sticky border border-black">TP Expiry</th>
                      <th scope="col" className="px-1 pt-2 sticky border border-black">IDV</th>
                      <th scope="col" className="px-1 pt-2 sticky border border-black">Body Type</th>
                      <th scope="col" className="px-1 pt-2 sticky border border-black">Make & Model</th>
                      <th scope="col" className="px-1 pt-2 whitespace-nowrap sticky border border-black">MFG Year</th>
                      <th scope="col" className="px-1 pt-2 sticky border border-black">Registration Date</th>
                      <th scope="col" className="px-1 pt-2 sticky border border-black">Vehicle Age</th>
                      <th scope="col" className="px-1 pt-2 whitespace-nowrap sticky border border-black">Fuel Type</th>
                      <th scope="col" className="px-1 pt-2 sticky border border-black">GVW</th>
                      <th scope="col" className="px-1 pt-2 sticky border border-black">C.C.</th>
                      <th scope="col" className="px-1 pt-2 sticky border border-black">Advisor</th>
                      <th scope="col" className="px-1 pt-2 sticky border border-black">Sub Advisor</th>
                      <th scope="col" className="px-1  pt-2 sticky border border-black">
                        Payout On
                      </th>
                      <th scope="col" className="px-1  pt-2 sticky border border-black">
                        Advisor Payout %
                      </th>
                      <th scope="col" className="px-1  pt-2 sticky border border-black">
                        Advisor Payout
                      </th>
                      <th scope="col" className="px-1  pt-2 sticky border border-black">
                        Advisor Payable Amount
                      </th>
                      <th scope="col" className="px-1  pt-2 sticky border border-black">
                        Branch Payout %
                      </th>
                      <th scope="col" className="px-1  pt-2 sticky border border-black">
                        Branch Payout
                      </th>
                      <th scope="col" className="px-1 pt-2 sticky border border-black">
                        Branch Payable Amount
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 overflow-y-hidden ">
                    {filteredData?.map((data) => (
                      <tr key={data._id} className="border-b dark:border-neutral-200 text-sm font-medium hover:bg-orange-100">
                        <td className="whitespace-nowrap px-1 py-0 border border-black">{data.policyrefno}</td>
                        <td className="whitespace-nowrap px-1 py-0 border border-black">{data.entryDate}</td>
                        <td className="whitespace-nowrap px-1 py-0 border border-black">{data.branch}</td>
                        <td className="whitespace-nowrap px-1 py-0 border border-black">{data.insuredName}</td>
                        <td className="whitespace-nowrap px-1 py-0 border border-black">{data.contactNo}</td>
                        <td className="whitespace-nowrap px-1 py-0 border border-black">{data.staffName}</td>
                        <td className="whitespace-nowrap px-1 py-0 border border-black">{data.states}</td>
                        <td className="whitespace-nowrap px-1 py-0 border border-black">{data.district}</td>
                        <td className="whitespace-nowrap px-1 py-0 border border-black">{data.vehRegNo}</td>
                        <td className="whitespace-nowrap px-1 py-0 border border-black">{data.company}</td>
                        <td className="whitespace-nowrap px-1 py-0 border border-black">{data.category}</td>
                        <td className="whitespace-nowrap px-1 py-0 border border-black">{data.policyType}</td>
                        <td className="whitespace-nowrap px-1 py-0 border border-black">{data.segment}</td>
                        <td className="whitespace-nowrap px-1 py-0 border border-black">{data.productCode}</td>
                        <td className="whitespace-nowrap px-1 py-0 border border-black">{data.sourcing}</td>
                        <td className="whitespace-nowrap px-1 py-0 border border-black">{data.policyNo}</td>
                        <td className="whitespace-nowrap px-1 py-0 border border-black">{data.engNo}</td>
                        <td className="whitespace-nowrap px-1 py-0 border border-black">{data.chsNo}</td>
                        <td className="whitespace-nowrap px-1 py-0 border border-black">{data.odPremium}</td>
                        <td className="whitespace-nowrap px-1 py-0 border border-black">{data.liabilityPremium}</td>
                        <td className="whitespace-nowrap px-1 py-0 border border-black">{data.netPremium}</td>
                        <td className="whitespace-nowrap px-1 py-0 border border-black">{data.rsa}</td>
                        <td className="whitespace-nowrap px-1 py-0 border border-black">{data.taxes}</td>
                        <td className="whitespace-nowrap px-1 py-0 border border-black">{data.finalEntryFields}</td>
                        <td className="whitespace-nowrap px-1 py-0 border border-black">{data.odDiscount}</td>
                        <td className="whitespace-nowrap px-1 py-0 border border-black">{data.ncb}</td>
                        <td className="whitespace-nowrap px-1 py-1 border border-black">{data.policyPaymentMode}</td>
                        <td className="whitespace-nowrap px-1 py-0 border border-black">{data.policyStartDate}</td>
                        <td className="whitespace-nowrap px-1 py-0 border border-black">{data.policyEndDate}</td>
                        <td className="whitespace-nowrap px-1 py-0 border border-black">{data.odExpiry}</td>
                        <td className="whitespace-nowrap px-1 py-0 border border-black">{data.tpExpiry}</td>
                        <td className="whitespace-nowrap px-1 py-0 border border-black">{data.idv}</td>
                        <td className="whitespace-nowrap px-1 py-0 border border-black">{data.bodyType}</td>
                        <td className="whitespace-nowrap px-1 py-0 border border-black">{data.makeModel}</td>
                        <td className="whitespace-nowrap px-1 py-0 border border-black">{data.mfgYear}</td>
                        <td className="whitespace-nowrap px-1 py-0 border border-black">{data.registrationDate}</td>
                        <td className="whitespace-nowrap px-1 py-0 border border-black">{data.vehicleAge}</td>
                        <td className="whitespace-nowrap px-1 py-0 border border-black">{data.fuel}</td>
                        <td className="whitespace-nowrap px-1 py-0 border border-black">{data.gvw}</td>
                        <td className="whitespace-nowrap px-1 py-0 border border-black">{data.cc}</td>
                        <td className="whitespace-nowrap px-1 py-0 border border-black">{data.advisorName}</td>
                        <td className="whitespace-nowrap px-1 py-0 border border-black">{data.subAdvisor}</td>
                        <td className="whitespace-nowrap px-1  py-0 border border-black">
                          {data.payoutOn}
                        </td>
                        <td
                          contentEditable={true}
                          className="whitespace-nowrap px-0.5 w-20 h-10 py-0 border border-black text-center"
                          dir="ltr"
                          onInput={(e) => handleNumericInput(e)}
                          onBlur={(e) => handleInputChange(data._id, e.target.innerText)}
                          name="cvpercentage"
                        >
                          {data.cvpercentage}
                        </td>

                        <td className="whitespace-nowrap px-1 py-0  border border-black">{`₹${data.advisorPayoutAmount || 0}`}</td>
                        <td className="whitespace-nowrap px-1 py-0  border border-black">{`₹${data.advisorPayableAmount || 0}`}</td>
                        <td className="whitespace-nowrap px-1  py-0 border border-black">
                          {data.branchpayoutper}
                        </td>
                        <td className="whitespace-nowrap px-1 py-0  border border-black">{`₹${data.branchPayout}`}</td>
                        <td className="whitespace-nowrap px-1 py-0  border border-black">{`₹${data.branchPayableAmount}`}</td>
                      </tr>
                    ))}
                  </tbody>
                </>)}
              </div>
            </table>
          </div>
        </div>
      </div>
      {/* Pagination */}
      <nav aria-label="Page navigation  flex example sticky   ">
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
      {/* <button type="submit" onClick={handleSubmit}></button> */}
    </section>
  );
}
export default MasterView;