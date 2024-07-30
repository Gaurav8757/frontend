import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import VITE_DATA from "../../config/config.jsx";
function MonthViewLeger() {
  let balanceMonthly = 0;
  const [data, setData] = useState([]);
  const [uniqueNames, setUniqueNames] = useState([]);
  const [advisors, setAdvisors] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    advisorName: "",
    policyNo: "",
    insuredName: "",
    fromDate: "",
    toDate: ""
  });

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`${VITE_DATA}/alldetails/view/policies`);
            const responseData = response.data; // Assuming data is stored in response.data
            
            const branchName = sessionStorage.getItem("name");
            if (!branchName) {
                toast.error("Branch name not found");
                return;
            }

            // Filter data by branchName
            const filteredData = responseData.allList.filter(item => item.branch.includes(branchName));
            setData(filteredData);

            // Extract unique insured names from filtered data
            const uniqueNames = [...new Set(filteredData.map(item => item.insuredName))];
            setUniqueNames(uniqueNames);
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Error fetching data");
        }
    };
    fetchData();
}, []);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    // const branch = sessionStorage.getItem("name");
    if (!token) {
      toast.error("Not Authorized yet.. Try again! ");
    } else {
      const branchName = sessionStorage.getItem("name");
      if (!branchName) {
          toast.error("Branch name not found");
          return;
      }
      axios
        .get(`${VITE_DATA}/advisor/lists`, {
          headers: {
            Authorization: `${token}`, // Send the token in the Authorization header
          },
        })
        .then((response) => {
          const adv = response.data.filter((advisr) => advisr.advisortype === "MONTHLY").filter((advisr) => advisr.branch.includes(branchName));
          setAdvisors(adv);
          // setAdvisors(response.data);
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
        filterOptions.advisorName &&
        !item.advisorName?.includes(filterOptions.advisorName)
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
        new Date(item.entryDate) < new Date(filterOptions.fromDate)
      ) {
        match = false;
      }
      if (
        filterOptions.toDate &&
        new Date(item.entryDate) > new Date(filterOptions.toDate)
      ) {
        match = false;
      }
      return match;
    });
    setFilteredData(filteredData);
  };

  const clearFilters = () => {
    setFilterOptions({
      advisorName: "",
      policyNo: "",
      insuredName: "",
      fromDate: "",
      toDate: ""
    });
    setFilteredData([]);
  };
  

  const isFilterApplied = () => {
    return Object.values(filterOptions).some(option => option !== "");
  };

  return (
    <section className="container-fluid relative  p-0 sm:ml-48 bg-white">
      <div className="container-fluid  p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-white">
        <div className="flex justify-center">
          <h1 className="font-semibold text-3xl my-2  text-blue-700">Monthly Leger</h1>
        </div>
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
                placeholder="Advisor Name"
                value={filterOptions.advisorName}
                onChange={(e) => {
                  clearFilters(); // Clear other filters
                  setFilterOptions({ ...filterOptions, advisorName: e.target.value });
                }}
              >
                <option value="">-------- Select Advisor ----------</option>
                {advisors
                  .sort((a, b) => {
                    // Check if both a.branch and b.branch are strings before comparing
                    if (typeof a.branch === 'string' && typeof b.branch === 'string') {
                      return a.branch.localeCompare(b.branch);
                    } else {
                      // If one or both of them are not strings, return 0 to maintain the order
                      return 0;
                    }
                  })
                  .map((api, index) => (
                    <option
                      className={`${api.branch ? "font-semibold" : ""}`}
                      key={index}
                      value={api.advisorname}
                    >{`${api.branch} --  -- ${api.advisorname}`}</option>
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
              > <option value="">---- Select Insured Name -------</option>
                {
                  uniqueNames.sort().map((api, idx) => (
                    <option className={`${api ? "font-semibold" : ""}`} key={idx} value={api}>{api}</option>
                  ))} </select>
              <button className="text-white  mx-4 bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-1 focus:ring-blue-300 font-medium rounded text-base px-3 py-1 text-center  " onClick={handleFilter}>Filter</button>
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
                    <th scope="col" className="px-0 whitespace-nowrap py-3">Company</th>
                    <th scope="col" className="px-0 whitespace-nowrap py-3">Insured Name</th>
                    <th scope="col" className="px-0 whitespace-nowrap py-3">Final Prem.</th>
                    <th scope="col" className="px-4 whitespace-nowrap py-3 ">Payout</th>
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
                    const entryDate = new Date(item.entryDate);
                    const currentYear = new Date().getFullYear();
                    const startDate = new Date(`${currentYear}-01-01`);
                    const endDate = new Date(`${currentYear}-12-31`);
                    if (
                      item.advisorName === filterOptions.advisorName || filterOptions.insuredName || filterOptions.policyNo || filterOptions.fromDate || filterOptions.toDate //heck if the entry date year matches the current year
                    ) {
                      if (entryDate >= startDate && entryDate <= endDate) {
                        let debitMonthlyAmount;
                        debitMonthlyAmount = parseFloat(item.finalEntryFields - (item.advisorPayoutAmount || 0));
                        // Update the balance
                        if (debitMonthlyAmount === item.creditMonthlyAmount) {
                          balanceMonthly -= debitMonthlyAmount - (item.creditMonthlyAmount || 0);
                        } else {
                          balanceMonthly += debitMonthlyAmount - (item.creditMonthlyAmount || 0);
                        }
                        return (
                          <tr key={item._id} className="odd:bg-white text-sm even:bg-gray-100 border-b dark:border-gray-700 hover:bg-orange-100 ">
                            <td className="whitespace-nowrap">{item.entryDate}</td>
                            <td className="whitespace-wrap w-1/12">{item.policyNo}</td>
                            <td className="whitespace-wrap w-1/12">{item.company}</td>
                            <td>{item.insuredName}</td>
                            <td>{`₹ ${item.finalEntryFields.toFixed(0)}`}</td>
                            <td>{`₹ ${item.advisorPayoutAmount}`}</td>
                            <td>{`₹ ${item.company === "GO-DIGIT" ? debitMonthlyAmount.toFixed(2) : debitMonthlyAmount.toFixed(0)}`}</td>
                            <td>{item.paymentMonthlyDate}</td>
                            <td>{item.paymentMonthlyType}</td>
                            <td>{item.paymentMonthlyRefNo}</td>
                            <td>{item.creditMonthlyAmount}</td>
                            <td className={`whitespace-nowrap px-1 ${balanceMonthly > 0 ? 'text-green-600 font-bold' : (balanceMonthly < 0 ? 'text-red-600 font-bold' : 'text-black font-bold')}`} name="balanceMonthly">{`₹ ${item.company === "GO-DIGIT" ? balanceMonthly.toFixed(2) : balanceMonthly.toFixed(0)}`}</td>
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
      </div>
    </section>
  );
}
export default MonthViewLeger;