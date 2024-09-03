import axios from "axios";
import { useEffect, useState, startTransition, Suspense } from "react";
import TextLoader from "../../../loader/TextLoader.jsx";
import TableData from "./TableData.jsx";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

import * as XLSX from "xlsx";
import VITE_DATA from "../../../config/config.jsx";
import PaginationAdmin from "./PaginationAdmin.jsx";
function ViewMasterForm() {
  const [allDetailsData, setAllDetailsData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [totalPages, setTotalPages] = useState();
  const [endDate, setEndDate] = useState("");
  const [years, setYears] = useState("");
  const [currentPage, setCurrentPage] = useState();
  const [itemsPerPage, setItemsPerPage] = useState();
  const [searchId, setSearchId] = useState("");
  const [searchBranch, setSearchBranch] = useState("");
  const [searchCompany, setSearchCompany] = useState("");
  const [searchInsuredName, setSearchInsuredName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [productcodes, setPcodes] = useState("");
  const [policyMade, setPolicyMade] = useState("");
  const [payon, setPayon] = useState("");
  const [payoutSlab, setPayoutSlab] = useState([]);
  const [ptypess, setPtypes] = useState("");
  const [advs, setAdv] = useState("");
  const [recalculate, setRecalculate] = useState(false);
  const [counts, setCounts] = useState(0);

  const name = sessionStorage.getItem("email");

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        toast.error("Not Authorized yet.. Try again! ");
      } else {
        try {
          const response = await axios.get(`${VITE_DATA}/alldetails/viewdata`, {
            headers: {
              Authorization: `${token}`, // Send the token in the Authorization header
            },
            params: {
              page: currentPage,
              limit: itemsPerPage,
            },
          });
          startTransition(() => {
            setAllDetailsData(response.data.allList);
            setTotalPages(response.data.totalPages);
          });
        } catch (error) {
          console.error("Policy calulation by ID Catched Error");
        }
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage]);

  // payout slab list api
  useEffect(() => {
    const fetchPayoutSlab = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        toast.error("Not Authorized yet.. Try again! ");
      } else {
        try {
          const response = await axios.get(
            `${VITE_DATA}/company/grid/slab/view`,
            {
              headers: {
                Authorization: `${token}`, // Send the token in the Authorization header
              },
            }
          );
          startTransition(() => {
            setPayoutSlab(response.data);
          });
        } catch (error) {
          console.error("Payout Grid Catched Error");
        }
      }
    };

    fetchPayoutSlab();
  }, []);

  const onUpdateInsurance = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        toast.error("Not Authorized yet.. Try again!");
      } else {
        const response = await axios.get(`${VITE_DATA}/alldetails/viewdata`, {
          headers: {
            Authorization: `${token}`,
          },
          params: {
            page: currentPage,
            // limit: itemsPerPage, // Uncomment if you need to use itemsPerPage
          },
        });

        startTransition(() => {
          setAllDetailsData(response.data.allList);
          setTotalPages(response.data.totalPages);
        });
      }
    } catch (error) {
      console.error("Error fetching updated insurance data");
    }
  };

  const handleDateRangeChange = (event, type) => {
    if (type === "start") {
      setStartDate(event.target.value);
    } else if (type === "end") {
      setEndDate(event.target.value);
    }
  };

  useEffect(() => {
    const updateData = async (data, paydata) => {
      try {
        const response = await axios.put(
          `${VITE_DATA}/alldetails/updatedata/${data._id}`,
          paydata,
          { headers: { "Content-Type": "application/json" } }
        );

        if (response.status !== 200) {
          console.error(`Error updating data for policy ID ${data._id}`);
        } else if (response.status === 200) {
          setCounts((prevCounts) => prevCounts + 1);
          console.log("Data updated successfully");
        }
      } catch (error) {
        console.error(`Error updating data of od net for policy ID`, error);
      }
    };

    allDetailsData.forEach(async (data) => {
      let paydata;
      if (data.policyType === "COMP" && data.productCode === "PVT-CAR") {
        paydata = { payoutOn: "OD" };
      } else {
        paydata = { payoutOn: "NET" };
      }

      updateData(data, paydata);
    });
  }, [allDetailsData]);

  const filteredData = allDetailsData.filter((data) => {
    // Check if data is defined
    if (!data) return false;
    // Filter conditions
    const idLower = data.policyrefno?.toLowerCase() || "";
    const insuredNameLower = data.insuredName?.toLowerCase() || "";
    const companyLower = data.company?.toLowerCase() || "";
    const contacNoLower = data.policyNo?.toLowerCase() || "";
    const policyLower = data.staffName?.toLowerCase() || "";
    const branchLower = data.branch?.toLowerCase() || "";
    const product = data.productCode?.toLowerCase() || "";
    const payouts = data.payoutOn?.toLowerCase() || "";
    const year = data.vehRegNo?.toLowerCase() || "";
    const adv = data.advisorName?.toLowerCase() || "";
    const type = data.policyType?.toLowerCase() || "";

    return (
      // Filter conditions using optional chaining and nullish coalescing

      (idLower.includes(searchId.toLowerCase()) || searchId === "") &&
      (type.includes(ptypess.toLowerCase()) || ptypess === "") &&
      (adv.includes(advs.toLowerCase()) || advs === "") &&
      (branchLower.includes(searchBranch.toLowerCase()) ||
        searchBranch === "") &&
      (insuredNameLower.includes(searchInsuredName.toLowerCase()) ||
        searchInsuredName === "") &&
      (policyLower.includes(policyMade.toLowerCase()) || policyMade === "") &&
      (companyLower.includes(searchCompany.toLowerCase()) ||
        searchCompany === "") &&
      // Update the state variable for company correctly
      (contacNoLower.includes(contactNo.toLowerCase()) || contactNo === "") &&
      (year.includes(years.toLowerCase()) || years === "") &&
      (product.includes(productcodes.toLowerCase()) || productcodes === "") &&
      (payouts.includes(payon.toLowerCase()) || payon === "") &&
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

  // const calculateAdvisorPayableAmount = (finalEntryFields, advisorPayout) => finalEntryFields - advisorPayout;
  // const calculateAdvisorPayoutAmount = (finalEntryFields, percentage) => finalEntryFields * (percentage / 100);
  const calculateBranchPayableAmount = (finalEntryFields, branchPayout) =>
    finalEntryFields - branchPayout;
  const calculateBranchPayoutAmount = (finalEntryFields, branchpayoutper) =>
    finalEntryFields * (branchpayoutper / 100);
  const calculateCompanyPayoutAmount = (finalEntryFields, companypayoutper) =>
    finalEntryFields * (companypayoutper / 100);

  useEffect(() => {
    // Check if there are matching CSLabs and allDetailsData is not empty
    if (payoutSlab.length > 0 && allDetailsData.length > 0) {
      payoutSlab?.forEach((matchingCSLab) => {
        // const percentage = matchingCSLab.cvpercentage || 0;
        const branchpercent = matchingCSLab.branchpayoutper || 0;
        const companypercent = matchingCSLab.companypayoutper || 0;
        allDetailsData?.forEach((data) => {
          const vehicleAge1 = parseInt(data.vehicleAge);
          const vehicleAgeNormalized =
            data.vehicleAge === "0 years" ||
            data.vehicleAge === "0" ||
            data.vehicleAge1 === 0
              ? 0
              : 1;
          const isMatching =
            (matchingCSLab.vage === "NEW" && vehicleAgeNormalized === 0) ||
            (matchingCSLab.vage === "OLD" && vehicleAgeNormalized !== 0);
          if (
            matchingCSLab.cnames === data.company &&
            matchingCSLab.catnames === data.category &&
            matchingCSLab.policytypes === data.policyType &&
            matchingCSLab.states === data.states &&
            (matchingCSLab.vfuels === data.fuel ||
              matchingCSLab.vfuels === "ALL" ||
              !matchingCSLab.vfuels ||
              (matchingCSLab.vfuels === "OTHER THAN DIESEL" &&
                data.fuel !== "DIESEL")) &&
            (!matchingCSLab.vncb ||
              matchingCSLab.vncb === data.ncb ||
              ["BOTH", "NO"].includes(matchingCSLab.vncb)) &&
            matchingCSLab.pcodes === data.productCode &&
            (matchingCSLab.districts === data.district ||
              matchingCSLab.districts === "All" ||
              matchingCSLab.districts === "ALL") &&
            matchingCSLab.payoutons === data.payoutOn &&
            (matchingCSLab.sitcapacity === data.sitcapacity ||
              matchingCSLab.sitcapacity === "All" ||
              matchingCSLab.sitcapacity === "ALL" ||
              matchingCSLab.sitcapacity === "" ||
              !matchingCSLab.sitcapacity ||
              matchingCSLab.sitcapacity === null ||
              matchingCSLab.sitcapacity === undefined) &&
            matchingCSLab.segments === data.segment &&
            (matchingCSLab.voddiscount === data.odDiscount ||
              !matchingCSLab.voddiscount) &&
            // (matchingCSLab.advisorName === data.advisorName || matchingCSLab.advisorName === "" )&&
            (isMatching ||
              (matchingCSLab.vage === "1-7 YEARS" &&
                vehicleAge1 >= 1 &&
                vehicleAge1 <= 7) ||
              (matchingCSLab.vage === "MORE THAN 7 YEARS" &&
                vehicleAge1 > 7)) &&
            (matchingCSLab.vcc === data.cc ||
              ["ALL", "", null, undefined].includes(matchingCSLab.vcc))
          ) {
            const netPremium = parseFloat(data.netPremium);
            const finalEntryFields = parseFloat(data.finalEntryFields);
            const odPremium = parseFloat(data.odPremium);

            let branchPayout, companyPayout;
            let branchPayable, profitLoss;

            if (
              data.policyType === "COMP" &&
              data.productCode === "PVT-CAR" &&
              data.payoutOn === "OD"
            ) {
              // advisorPayout = calculateAdvisorPayoutAmount(odPremium, percentage);
              // advisorPayable = calculateAdvisorPayableAmount(finalEntryFields, advisorPayout);
              branchPayout = calculateBranchPayoutAmount(
                odPremium,
                branchpercent
              );
              branchPayable = calculateBranchPayableAmount(
                finalEntryFields,
                branchPayout
              );
              companyPayout = calculateCompanyPayoutAmount(
                odPremium,
                companypercent
              );
              profitLoss = companyPayout - branchPayout;
            } else {
              // Default calculation functions
              // advisorPayout = calculateAdvisorPayoutAmount(netPremium, percentage);
              // advisorPayable = calculateAdvisorPayableAmount(finalEntryFields, advisorPayout);
              branchPayout = calculateBranchPayoutAmount(
                netPremium,
                branchpercent
              );
              branchPayable = calculateBranchPayableAmount(
                finalEntryFields,
                branchPayout
              );
              companyPayout = calculateCompanyPayoutAmount(
                netPremium,
                companypercent
              );
              profitLoss = companyPayout - branchPayout;
            }
            // Check if data needs an update
            // if (
            //   !data.branchPayableAmount ||
            //   !data.branchPayout ||
            //   !data.companyPayout ||
            //   !data.profitLoss
            // ) {

            // Prepare data for API request
            const postData = {
              // advisorPayoutAmount: parseFloat(advisorPayout),
              // advisorPayableAmount: parseFloat(advisorPayable.toFixed(2)),
              branchPayableAmount: parseFloat(branchPayable.toFixed(2)),
              branchPayout: parseFloat(branchPayout.toFixed(2)),
              companyPayout: parseFloat(companyPayout.toFixed(2)),
              profitLoss: parseFloat(profitLoss.toFixed(2)),
              // cvpercentage: matchingCSLab.cvpercentage,
              branchpayoutper: matchingCSLab.branchpayoutper,
              companypayoutper: matchingCSLab.companypayoutper,
            };
            try {
              // Send data to API
              const response = axios.put(
                `${VITE_DATA}/alldetails/updatedata/${data._id}`,
                postData,
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              // Handle response status
              if (response.status !== 200) {
                console.error(
                  `Error updating data for policy ID ${data.policyrefno}`
                );
              } else {
                // if (response.status === 200) {
                //   setCounts(prevCounts => prevCounts + 1);
                console.log("Data updated successfully");
              }
            } catch (error) {
              console.error(`Error updating data for policy ID:`);
              // }
            }
          }
        });
      });
    }
  }, [allDetailsData, payoutSlab, recalculate]);

  const handleRecalculate = () => {
    setRecalculate((prev) => !prev);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get("page")) || 1;
    const limit = parseInt(params.get("limit")) || 1000;
    startTransition(() => {
      setCurrentPage(page);
      setItemsPerPage(limit);
    });
  }, []);

  const exportToExcel = () => {
    try {
      const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";
      const fileName = `${name}`;
      // Map all data without filtering by current date
      const dataToExport = filteredData.map((row) => {
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
          // row.payoutOn,
          // row.advisorPayout,
          // row.cvpercentage,
          // row.advisorPayableAmount,
          // row.branchpayoutper,
          // row.branchPayout,
          // row.branchPayableAmount,
          // row.companypayoutper,
          // row.companyPayout,
          // row.profitLoss,
          // row.na,
          // row.chqNoRefNo,
          // row.bankName,
          // row.chqPaymentDate,
          // row.chqStatus,
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
        // "Payout On",
        // "Adivsor %",
        // "Advisor Payout",
        // "Advisor Payable Amount",
        // "Branch Payout %",
        // "Branch Payout",
        // "Branch Payable Amount",
        // "Company Payout %",
        // "Company Payout",
        // "Profit/Loss",
        // " ",
        // "CHQ No / Ref No",
        // "Bank Name",
        // "CHQ / Payment Date",
        // "CHQ Status",
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
      const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";
      const fileName = `${name}_executive`;
      // Map all data without filtering by current date
      const dataToExports = filteredData.map((row) => {
        return [
          row.entryDate,
          row.company,
          row.policyNo,
          row.insuredName,
          row.vehRegNo,
          row.makeModel,
          row.gvw,
          row.cc,
          row.vehicleAge,
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
          row.branchpayoutper,
          row.branchPayout,
          row.branchPayableAmount,
          row.companypayoutper,
          row.companyPayout,
          row.profitLoss,
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
        "Vehicle Age",
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
        "Branch Percentage%", // corresponds to row.branchpayoutper
        "Branch Payout", // corresponds to row.branchPayout
        "Branch Payable Amount", // corresponds to row.branchPayableAmount
        "Company Payout %",
        "Company Payout",
        "Profit/Loss",
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


  // delete function
  const onDeleteAllData = async (_id) => {
    try {
      await axios.delete(`${VITE_DATA}/alldetails/deletedata/${_id}`);
      toast.warn("Insurance Data Deleted.....!", {
        theme: "dark",
        position: "top-right",
      });
      setAllDetailsData((prevData) =>
        prevData.filter((data) => data._id !== _id)
      );
    } catch (error) {
      toast.error("Error deleting Insurance");
      console.error("Error deleting Insurance :", error);
    }
  };
  return (
    <>
      <section className="container-fluid relative h-screen p-0 sm:ml-48 bg-slate-100">
        <div className="container-fluid flex justify-center p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-slate-200">
          <div className="inline-block min-w-full  w-full py-0">
            <div className=" mb-4 mt-2 flex  justify-between max-w-auto mx-auto w-auto">
              <h1 className="bg-blue-500 hover:bg-blue-700 p-1 my-auto px-2 rounded">
                <button
                  className="text-white my-auto"
                  onClick={handleRecalculate}
                >
                  Recal
                </button>
              </h1>
              <span className=" flex text-blue-700 justify-center text-center text-2xl font-semibold">
                All Policy List&apos;s
              </span>
              <div className="flex">
                {/* button 1 */}
                <button
                  className="text-end mx-0 flex justify-end  text-3xl font-semibold"
                  onClick={handleExportClick}
                >
                  <img src="/excel.png" alt="download" height={30} width={40} />
                </button>
                {/* button 2 */}
                <button
                  className="text-end mx-0 flex justify-end  text-3xl mt-1 font-semibold"
                  onClick={handleAdvisorWiseReconData}
                >
                  <img src="/dwnd.png" alt="download" height={25} width={35} />
                </button>
                {/* button 3 */}
                <button
                  className="text-end   mr-1  justify-end  text-xl font-semibold "
                  onClick={handleMisExportClick}
                >
                  <Suspense fallback={<div>Loading...</div>}>
                    <img
                      src="/xls.png"
                      className="rounded-xl mx-0 my-0"
                      height={30}
                      width={40}
                      alt="mis "
                    />
                    {/* <span className="text-base">MIS</span> */}
                  </Suspense>
                </button>

                <NavLink
                  to="/dashboard/masterform"
                  className="flex justify-center my-auto"
                >
                  <button
                    type="button"
                    className="text-white  mt-0 justify-end bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded text-sm px-2 py-1 text-center"
                  >
                    Go Back
                  </button>
                </NavLink>
              </div>
            </div>
            <div className="flex-wrap mb-4 flex justify-between  text-blue-500 max-w-auto mx-auto w-auto ">
              {/* date range filter */}
              <div className="flex justify-between items-center  p-0 text-start w-full lg:w-1/4">
                <label className="my-auto text-sm whitespace-nowrap font-medium text-gray-900">
                  Date:
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => handleDateRangeChange(e, "start")}
                  className="shadow input-style w-32 my-auto ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                  placeholder="From Date"
                />
                <span className="text-justify mx-1 my-auto">to</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => handleDateRangeChange(e, "end")}
                  className="shadow input-style  w-32 my-auto  ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 "
                  placeholder="To Date"
                />
              </div>

              <div className="flex p-0 justify-center  text-end w-full lg:w-1/4">
                <label className="my-auto  text-sm whitespace-nowrap font-medium text-gray-900">
                  ID:
                </label>
                <input
                  type="search"
                  onChange={(e) => setSearchId(e.target.value)}
                  className="shadow input-style my-auto ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                  placeholder="ID"
                />
              </div>

              <div className="flex justify-start p-0 text-end w-full lg:w-1/4">
                <label className="my-auto text-sm font-medium text-gray-900">
                  Company:
                </label>
                <input
                  type="search"
                  onChange={(e) => setSearchCompany(e.target.value)}
                  className="shadow input-style  my-auto ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                  placeholder="Company Name"
                />
              </div>
              <div className="flex justify-start  text-start w-full lg:w-1/4">
                <label className="my-auto text-sm font-medium text-gray-900">
                  Insured Name:
                </label>
                <input
                  type="search"
                  onChange={(e) => setSearchInsuredName(e.target.value)}
                  className="shadow input-style  my-auto ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                  placeholder="Insured Name"
                />
              </div>
              <div className="flex justify-start mt-4  text-start w-full lg:w-1/4">
                <label className="my-0 text-sm font-medium text-gray-900">
                  Branch:
                </label>
                <input
                  type="search"
                  onChange={(e) => setSearchBranch(e.target.value)}
                  className="shadow input-style w-52 my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                  placeholder="Branch Name"
                />
              </div>
              <div className="flex text-center justify-start mt-4  lg:w-1/4">
                <label className="my-0 text-sm whitespace-nowrap font-medium text-gray-900">
                  Policy No:
                </label>
                <input
                  type="search"
                  onChange={(e) => setContactNo(e.target.value)}
                  className="shadow p-0 text-start  lg:w-1/2 input-style  my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                  placeholder="Policy Number"
                />
              </div>
              <div className="flex text-center justify-start mt-4  lg:w-1/4">
                <label className="my-0 text-sm whitespace-nowrap font-medium text-gray-900">
                  Policy Made By:
                </label>
                <input
                  type="search"
                  onChange={(e) => setPolicyMade(e.target.value)}
                  className="shadow p-0 text-start  lg:w-1/2 input-style  my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                  placeholder="Policy Made By"
                />
              </div>
              <div className="flex text-center justify-start mt-4  lg:w-1/4">
                <label className="my-0 text-sm whitespace-nowrap font-medium text-gray-900">
                  Product Code:
                </label>
                <input
                  type="search"
                  onChange={(e) => setPcodes(e.target.value)}
                  className="shadow p-0 text-start  lg:w-1/2 input-style  my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                  placeholder="Search by Product Code"
                />
              </div>

              <div className="flex text-center justify-start mt-4  lg:w-1/4">
                <label className="my-0 text-sm whitespace-nowrap font-medium text-gray-900">
                  Policy Type:
                </label>
                <input
                  type="search"
                  onChange={(e) => setPtypes(e.target.value)}
                  className="shadow p-0 text-start  lg:w-1/2 input-style  my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                  placeholder="Policy Type"
                />
              </div>

              <div className="flex text-center justify-start mt-4  lg:w-1/4">
                <label className="my-0 text-sm whitespace-nowrap font-medium text-gray-900">
                  PayoutOn:
                </label>
                <input
                  type="search"
                  onChange={(e) => setPayon(e.target.value)}
                  className="shadow p-0 text-start  lg:w-1/2 input-style  my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                  placeholder="Search by PayoutOn"
                />
              </div>
              <div className="flex text-center justify-start mt-4  lg:w-1/4">
                <label className="my-0 text-sm whitespace-nowrap font-medium text-gray-900">
                  Vehicle No.:
                </label>
                <input
                  type="search"
                  onChange={(e) => setYears(e.target.value)}
                  className="shadow p-0 text-start  lg:w-1/2 input-style  my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                  placeholder="Vehicle Registration No."
                />
              </div>
              <div className="flex text-center justify-start mt-4  lg:w-1/4">
                <label className="my-0 text-sm whitespace-nowrap font-medium text-gray-900">
                  Advisor Name:
                </label>
                <input
                  type="search"
                  onChange={(e) => setAdv(e.target.value)}
                  className="shadow p-0 text-start  lg:w-1/2 input-style  my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                  placeholder="Search by Advisor"
                />
              </div>
              <div className="flex text-center justify-start mt-4  lg:w-1/4"></div>
            </div>

            <div className="inline-block min-w-full w-full py-0 relative">
              <>
                {filteredData.length === 0 ? (
                  <TextLoader />
                ) : (
                  <>
                    <TableData
                      filteredData={filteredData}
                      onUpdateInsurance={onUpdateInsurance}
                      onDeleteAllData={onDeleteAllData}
                      totalItems={totalItems}
                    />
                  </>
                )}
              </>
            </div>
            <div className="flex z-50 w-16 h-16 inset-x-2 inset-y-0 bottom-0 right-0  justify-end items-end">
              <div className="sticky top-0 w-16 h-16 font-bold rounded-full bg-[green]/80 flex items-center shadow-2xl shadow-red-900 justify-center">
                <span className="absolute text-white">{counts}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <PaginationAdmin
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </>
  );
}
export default ViewMasterForm;
