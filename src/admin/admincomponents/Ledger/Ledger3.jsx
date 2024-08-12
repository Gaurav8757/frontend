import axios from "axios";
import { toast } from "react-toastify";
import * as XLSX from 'xlsx';
import { useState, useEffect } from "react";
import VITE_DATA from "../../../config/config.jsx";
function Ledger3() {
  let balance = 0;
  const [data, setData] = useState([]);
  const [comp, setCompany] = useState([]);
  const [paymentMode, setPaymentMode] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    // advisorName: "",
    policyNo: "",
    insuredName: "",
    fromDate: "",
    toDate: "",
    company: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${VITE_DATA}/alldetails/view/policies`);
        const responseData = response.data; // Assuming data is stored in response.data
        setData(responseData.allList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${VITE_DATA}/alldetails/view/policies`);
      const responseData = response.data; // Assuming data is stored in response.data
      setData(responseData.allList);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Not Authorized yet.. Try again! ");
    } else {
      // The user is authenticated, so you can make your API request here.
      axios
        .get(`${VITE_DATA}/view/payment/mode`, {
          headers: {
            Authorization: `${token}`, // Send the token in the Authorization header
          },
        })
        .then((response) => {
          setPaymentMode(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);


  useEffect(() => {
    const token = sessionStorage.getItem("token");
    // const branch = sessionStorage.getItem("name");
    if (!token) {
      toast.error("Not Authorized yet.. Try again! ");
    } else {
      // The user is authenticated, so you can make your API request here.
      axios
        .get(`${VITE_DATA}/view/company/lists`, {
          headers: {
            Authorization: `${token}`, // Send the token in the Authorization header
          },
        })
        .then((response) => {
          setCompany(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const handleFilter = () => {
    let filteredData = data.filter((item) => {
      let match = true;
      if (
        filterOptions.company &&
        !item.company?.includes(filterOptions.company)
      ) {
        match = false;
      }
      else if (
        filterOptions.policyNo &&
        !item.policyNo?.includes(filterOptions.policyNo)
      ) {
        match = false;
      }
      else if (
        filterOptions.insuredName &&
        !item.insuredName.toLowerCase().includes(filterOptions.insuredName.toLowerCase())
      ) {
        match = false;
      }
      else if (
        filterOptions.fromDate &&
        item.entryDate < filterOptions.fromDate
      ) {
        match = false;
      }
      if (
        filterOptions.toDate &&
        item.entryDate > filterOptions.toDate
      ) {
        match = false;
      }
      return match;
    });
    setFilteredData(filteredData);
  };

  const clearFilters = () => {
    setFilterOptions({
      // advisorName: "",
      policyNo: "",
      insuredName: "",
      fromDate: "",
      toDate: "",
      company: ""
    });
    setFilteredData([]);
  };

  // Function to handle credit input change for a specific item
  const handleCreditChange = (itemId, value) => {
    setFilteredData(prevData =>
      prevData.map(item =>
        item._id === itemId ? { ...item, creditCompanyAmount: value, } : item
      )
    );
  };

  // Function to handle credit input change for a specific item
  const handleDatesChange = (itemId, value) => {
    setFilteredData(prevData =>
      prevData.map(item =>
        item._id === itemId ? { ...item, paymentCompanyDate: value, } : item
      )
    );
  };

  const handlePayTypeChange = (itemId, value) => {
    setFilteredData(prevData =>
      prevData.map(item =>
        item._id === itemId ? { ...item, paymentCompanyType: value, } : item
      )
    );
  };

  const handlePayRefChange = (itemId, value) => {
    setFilteredData(prevData =>
      prevData.map(item =>
        item._id === itemId ? { ...item, paymentCompanyRefNo: value, } : item
      )
    );
  };

  const uniqueNames = [...new Set(data.map(api => api.insuredName))];

  const isFilterApplied = () => {
    return Object.values(filterOptions).some(option => option !== "");
  };

  const handleSubmit = async () => {
    try {
      const modifiedData = filteredData.filter(item => (
        item.paymentCompanyDate || item.paymentCompanyType || item.paymentCompanyRefNo || item.creditCompanyAmount
      ));
      if (modifiedData.length === 0) {
        toast.info("Please make changes to submit.");
        return;
      }

      let totalBalance = 0;
      const dataToSave = modifiedData.map(item => {
        const currentYear = new Date().getFullYear();
        const startDate = new Date(`${currentYear}-01-01`);
        const endDate = new Date(`${currentYear}-12-31`);
        const entryDate = new Date(item.entryDate);
        let debitCompanyAmount = 0;

        if (entryDate >= startDate && entryDate <= endDate) {
          debitCompanyAmount = parseFloat(item.finalEntryFields) || 0;
        }

        const paymentCompanyDate = item.paymentCompanyDate || '';
        const paymentCompanyType = item.paymentCompanyType || '';
        const paymentCompanyRefNo = item.paymentCompanyRefNo || '';
        const creditCompanyAmount = parseFloat(item.creditCompanyAmount) || 0;

        if (debitCompanyAmount === creditCompanyAmount) {
          totalBalance -= debitCompanyAmount - creditCompanyAmount;
        } else {
          totalBalance += debitCompanyAmount - creditCompanyAmount;
        }
        debitCompanyAmount = item.company === "GO-DIGIT" ? debitCompanyAmount.toFixed(2) : debitCompanyAmount.toFixed(0)


        return {
          _id: item._id, // Assuming _id is the unique identifier for each item
          advId: item.advId,
          insuredName: item.insuredName,
          advisorName: item.advisorName,
          policyNo: item.policyNo,
          entryDate: item.entryDate,
          debitCompanyAmount,
          company: item.company,
          paymentCompanyDate,
          paymentCompanyType,
          paymentCompanyRefNo,
          creditCompanyAmount,
          balanceCompany: totalBalance
        };
      });

      // Send the modified data to the backend API
      const response = await axios.put(`${VITE_DATA}/leger/daily/update`, dataToSave);
      if (response.status === 200) {
        toast.success(`Company Ledger Updated Successfully...!`);
        fetchData();
        // Optionally, clear filtered data after submission
        setFilteredData([]);
      }
    } catch (error) {
      console.error('Error saving data:', error.response?.data?.message || error.message);
      toast.error(`${error.response ? error.response.data.message : error.message}`);
    }
  };



  function getCurrentDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    return dd + '-' + mm + '-' + yyyy;
  }

  const currentDate = getCurrentDate();

  const exportToExcel = () => {
    try {
      const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";
      const fileName = `${currentDate}_Company_Leger`;

      // Map all data without filtering by current date
      const dataToExport = filteredData.map((row) => {
        if (row.company === filterOptions.company || filterOptions.insuredName || filterOptions.policyNo || filterOptions.fromDate || filterOptions.toDate) {

          return [
            row.entryDate,
            row.policyNo,
            row.company,
            row.insuredName,
            row.finalEntryFields,
            row.advisorPayoutAmount,
            row.debitCompanyAmount,
            row.paymentCompanyDate,
            row.paymentCompanyType,
            row.paymentCompanyRefNo,
            row.creditCompanyAmount,
            row.balanceCompany
          ]
        }
      })
      // console.log(dataToExport);
      // Get all table headers in the same order
      const tableHeaders = [
        "Entry Date",
        "Policy No",
        "Company",
        "Insured Name",
        "Final Premium",
        "Payout",
        "DR",
        "Payment Date",
        "Payment Type",
        "Payment Ref. No",
        "CR",
        "Balance"
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

  return (
    <section className="container-fluid relative  p-0 sm:ml-48 bg-white">
      <div className="container-fluid  p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-white">
        <div className="flex justify-between">
          <h1></h1>
          <h1 className="font-semibold text-3xl my-auto text-blue-700">Company Leger</h1>
          <button
            className=" text-white my-auto font-medium rounded-full text-base px-3 py-1 text-center"
            onClick={handleExportClick}
            type="button"
          >
            <img src="/excel.png" alt="download" className="w-12" />
          </button></div>
        <div className="relative w-full lg:w-full p-0 lg:p-1 rounded-xl shadow-xl text-2xl items-center bg-slate-200">
          <div className="flex justify-between flex-col">
            <div className="flex  justify-evenly my-4">
              <input
                type="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 w-1/6 ps-2 p-1"
                placeholder="From Date"
                value={filterOptions.fromDate}
                onChange={(e) =>
                  setFilterOptions({ ...filterOptions, fromDate: e.target.value })
                }
              />
              <input
                type="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 w-1/6 ps-2 p-1"
                placeholder="To Date"
                value={filterOptions.toDate}
                onChange={(e) =>
                  setFilterOptions({ ...filterOptions, toDate: e.target.value })
                }
              /><span className="text-sm my-auto">OR</span>
              <select
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 w-1/6 ps-2 p-1"
                placeholder="company"
                value={filterOptions.company}
                onChange={(e) => {
                  clearFilters(); // Clear other filters
                  setFilterOptions({ ...filterOptions, company: e.target.value });
                }}
              >
                <option value="">-------- Select Company -------</option>
                {comp
                  .sort((a, b) => {
                    // Check if both a.branch and b.branch are strings before comparing
                    if (typeof a.c_type === 'string' && typeof b.c_type === 'string') {
                      return a.c_type.localeCompare(b.c_type);
                    } else {
                      // If one or both of them are not strings, return 0 to maintain the order
                      return 0;
                    }
                  })
                  .map((api, index) => (
                    <option
                      className={`${api.c_type ? "font-semibold" : ""}`}
                      key={index}
                      value={api.c_type}
                    >{`${api.c_type}`}</option>
                  ))}

              </select> <span className="text-sm my-auto">OR</span>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 w-1/6 ps-2 p-1"
                placeholder="Policy Number"
                value={filterOptions.policyNo}
                onChange={(e) => setFilterOptions({ ...filterOptions, policyNo: e.target.value })}
              /><span className="text-sm my-auto">OR</span>
              <select
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 w-1/6 ps-2 p-1"
                placeholder="Insured Name"
                value={filterOptions.insuredName}
                onChange={(e) => {
                  clearFilters(); // Clear other filters
                  setFilterOptions({ ...filterOptions, insuredName: e.target.value });
                }}
              > <option value="">---- Select Insured Name --------</option>
                {
                  uniqueNames.sort().map((api, idx) => (
                    <option className={`${api ? "font-semibold" : ""}`} key={idx} value={api}>{api}</option>
                  ))} </select>
              <button className="text-white  mx-4 bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-300 font-medium rounded text-base px-3 py-1 text-center  " onClick={handleFilter}>Filter</button>
              <button className="text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-300 font-medium rounded text-base px-3 py-1 text-center  " onClick={clearFilters}>Clear</button>
            </div>
          </div>
          {isFilterApplied() && filteredData.length > 0 && (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-xs  text-center text-black border">
                <thead className="text-xs uppercase bg-blue-700 text-white">
                  <tr>
                    <th scope="col" className="px-0 whitespace-nowrap py-3">Entry Date</th>
                    <th scope="col" className="px-0 whitespace-nowrap py-3">Policy Number</th>
                    <th scope="col" className="px-0 whitespace-nowrap py-3">Advisor Name</th>
                    <th scope="col" className="px-0 whitespace-nowrap py-3">Insured Name</th>
                    <th scope="col" className="px-0 whitespace-nowrap py-3">Final Prem.</th>
                    {/* <th scope="col" className="px-4 whitespace-nowrap py-3 ">Payout</th> */}
                    <th scope="col" className="px-0 whitespace-nowrap py-3">Debit Amount</th>
                    <th scope="col" className="px-0 whitespace-nowrap py-3">Payment Date</th>
                    <th scope="col" className="px-0 whitespace-nowrap py-3">Payment Type</th>
                    <th scope="col" className="px-0 whitespace-nowrap py-3">Payment Ref. No.</th>
                    <th scope="col" className="px-0 whitespace-nowrap py-3">Credit Amount</th>
                    <th scope="col" className="px-0 whitespace-nowrap py-3">Balance</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredData.map((item) => {

                    if (item.company === filterOptions.company || filterOptions.insuredName || filterOptions.policyNo || filterOptions.fromDate || filterOptions.toDate) {
                      let debitCompanyAmount;
                      const currentYear = new Date().getFullYear();
                      const startDate = new Date(`${currentYear}-01-01`);
                      const endDate = new Date(`${currentYear}-12-31`);
                      const entryDate = new Date(item.entryDate);
                      if (entryDate >= startDate && entryDate <= endDate) {
                        debitCompanyAmount = parseFloat(item.finalEntryFields);
                        // Update the balance
                        if (debitCompanyAmount === item.creditCompanyAmount) {
                          balance -= item.finalEntryFields - (item.creditCompanyAmount || 0);
                        } else {
                          balance += item.finalEntryFields - (item.creditCompanyAmount || 0);
                        }
                        return (
                          <tr key={item._id} className="odd:bg-white text-sm even:bg-gray-100 border-b dark:border-gray-700 hover:bg-orange-200 ">
                            <td className="whitespace-nowrap">{item.entryDate}</td>
                            <td className="whitespace-wrap w-1/8">{item.policyNo}</td>
                            <td className="whitespace-wrap w-1/8">{item.advisorName}</td>
                            <td >{item.insuredName}</td>
                            <td >{`₹ ${item.finalEntryFields}`}</td>
                            {/* <td>{`₹ ${item.advisorPayoutAmount}`}</td> */}
                            <td className="whitespace-wrap w-1/4">{`₹ ${item.company === "GO-DIGIT" ? debitCompanyAmount.toFixed(2) : debitCompanyAmount.toFixed(0)}`}</td>
                            <td className="">
                              <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-32 ps-2 p-1"
                                type="date"
                                name="paymentCompanyDate"
                                value={item.paymentCompanyDate}
                                onChange={(e) => handleDatesChange(item._id, e.target.value)}
                              />
                            </td>
                            <td className="">
                              <select
                                className="bg-gray-50 mx-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-40 ps-2 p-1"
                                type="text"
                                value={item.paymentCompanyType}
                                name="paymentCompanyType"
                                onChange={(e) => handlePayTypeChange(item._id, e.target.value)}>
                                <option value="">------ Select Payment Mode ------</option>
                                {
                                  paymentMode.map((pm) => (
                                    <option key={pm._id} value={pm.paymentmode}>{pm.paymentmode}</option>
                                  ))
                                }
                              </select>
                            </td>
                            <td>
                              <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-32 ps-2 p-1"
                                type="text"
                                value={item.paymentCompanyRefNo}
                                onChange={(e) => handlePayRefChange(item._id, e.target.value)}
                              />
                            </td>
                            <td>
                              <input
                                className="bg-gray-50 border mx-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-32 ps-2 p-1"
                                type="number"
                                min="0"
                                value={item.creditCompanyAmount}
                                onChange={(e) => handleCreditChange(item._id, e.target.value)}
                              />
                            </td>
                            <td className={`whitespace-nowrap px-1 ${balance > 0 ? 'text-green-600 font-bold' : (balance < 0 ? 'text-red-600 font-bold' : 'text-black font-bold')}`}>{`₹ ${item.company === "GO-DIGIT" ? balance.toFixed(2) : balance.toFixed(0)}`}</td>

                          </tr>
                        );
                      }
                    }
                  })}
                </tbody>

              </table>
            </div>
          )}
        </div>
        <button className="text-white my-5 bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-300 font-medium rounded text-base px-3 py-1 text-center" onClick={handleSubmit} type="submit">Submit</button>
      </div>
    </section>
  );
}

export default Ledger3;