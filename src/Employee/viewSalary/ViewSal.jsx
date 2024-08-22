import { useState, useEffect } from "react";
import VITE_DATA from "../../config/config.jsx";
import axios from "axios";
import SalaryViewPage from "../../HumanResources/GenerateSalary/SalaryViewPage.jsx";
import TextLoader from "../../loader/TextLoader.jsx";
import { useMemo } from "react";
import { format, addMonths } from "date-fns";
import { toast } from "react-toastify";
function ViewSal() {
  const [APIData, setAPIData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [initialMonth, setInitialMonth] = useState(new Date());
  // view salary popup
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [selectedViewId, setSelectedViewId] = useState(null);
  const employeeId = sessionStorage.getItem("employeeId");

  let deductAmount;
  useEffect(() => {
    setInitialMonth(new Date()); // Store the initial month when the component mounts
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
        .get(`${VITE_DATA}/api/salaries-list`, {
          headers: {
            Authorization: `${token}`, // Send the token in the Authorization header
          },
        })
        .then((response) => {
          // make true flags
          const filteredData = response.data.filter(
            (item) => item.empUniqueId === employeeId && item.flags === true
          );
          setAPIData(filteredData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [employeeId]);

  const handleMonthChange = (e) => {
    const [selectedMonthIndex, selectedYear] = e.target.value
      .split("/")
      .map(Number);
    setSelectedMonth(new Date(selectedYear, selectedMonthIndex - 1, 1)); // Set day to 1 to avoid timezone issues
  };

  const filterDataByMonth = (data, selectedMonth) => {
    const selectedYear = selectedMonth.getFullYear();
    const selectedMonthIndex = selectedMonth.getMonth() + 1; // January is 1, February is 2, etc.
    const selectedMonthString = `${
      selectedMonthIndex < 10 ? "0" : ""
    }${selectedMonthIndex}/${selectedYear}`;
    return data.filter((item) => {
      const [itemMonth, itemYear] = item.genMonths.split("/").map(Number);
      const formattedItemMonth = `${
        itemMonth < 10 ? "0" : ""
      }${itemMonth}/${itemYear}`;
      return formattedItemMonth === selectedMonthString;
    });
  };

  const filteredData = useMemo(
    () => filterDataByMonth(APIData, selectedMonth),
    [APIData, selectedMonth]
  );
  return (
    <section className="container-fluid relative h-screen p-0 sm:ml-48 bg-orange-100 ">
      <div className="container-fluid flex justify-center pt-4  border-gray-200 border-dashed rounded-lg   bg-orange-100">
        <div className=" relative  min-w-full w-full ">
          <div className="flex justify-between px-2 ">
            <div className="flex justify-center ">
              <select
                className="input-style rounded-lg text-base p-1"
                value={format(selectedMonth, "M/yyyy")} // Format date as 'MM/yyyy'
                onChange={handleMonthChange}
              >
                {Array.from({ length: 12 }).map((_, index) => {
                  const monthDate = addMonths(initialMonth, -index); // Subtract index to go back in time from the initial month
                  const formattedMonth = format(monthDate, "M/yyyy"); // Format date as 'MM/yyyy'
                  return (
                    <option key={index} value={formattedMonth}>
                      {formattedMonth}
                    </option>
                  );
                })}
              </select>
            </div>
            <h1 className="text-orange-700  font-semibold text-3xl w-auto mb-0 hidden sm:hidden md:block lg:block xl:block">
              Monthly Salary List&apos;s
            </h1>
            <h1></h1>
          </div>
          <div className="inline-block min-w-full w-full py-0  my-5 bg-orange-200">
            <table className="min-w-full text-center text-sm font-light table bg-orange-200">
              {filteredData.length === 0 ? (
                <TextLoader />
              ) : (
                <>
                  <thead className="border-b font-medium bg-slate-100 sticky top-0 ">
                    <tr className="text-orange-700 sticky top-0">
                      <th scope="col" className="px-1 py-0 border border-black">
                        View
                      </th>
                      <th scope="col" className="px-1 py-0 border border-black">
                        Employee Name
                      </th>
                      <th scope="col" className="px-1 py-0 border border-black">
                        Monthly Salary
                      </th>
                      <th scope="col" className="px-1 py-0 border border-black">
                        Monthly Leave
                      </th>
                      <th scope="col" className="px-1 py-0 border border-black">
                        Months
                      </th>
                      <th scope="col" className="px-1 py-0 border border-black">
                        Total Days
                      </th>
                      <th scope="col" className="px-1 py-0 border border-black">
                        Working Days
                      </th>
                      <th scope="col" className="px-1 py-0 border border-black">
                        Sunday&apos;s
                      </th>
                      <th scope="col" className="px-1 py-0 border border-black">
                        Holiday&apos;s
                      </th>
                      <th scope="col" className="px-1 py-0 border border-black">
                        Present Days
                      </th>
                      <th scope="col" className="px-1 py-0 border border-black">
                        Total Half Days
                      </th>
                      <th scope="col" className="px-1 py-0 border border-black">
                        Absent
                      </th>
                      <th scope="col" className="px-1 py-0 border border-black">
                        Gross Salary
                      </th>
                      <th
                        scope="col"
                        className="px-1 py-0 border border-black bg-green-200"
                      >
                        Salary (working)
                      </th>
                      <th scope="col" className="px-1 py-0 border border-black">
                        Basic Salary
                      </th>

                      <th scope="col" className="px-1 py-0 border border-black">
                        Incentive
                      </th>
                      {/* <th scope="col" className="px-1 py-0 border border-black bg-green-200">
                                    Salary + Incentive
                                </th> */}

                      <th scope="col" className="px-1 py-0 border border-black">
                        HRA
                      </th>
                      <th scope="col" className="px-1 py-0 border border-black">
                        DA
                      </th>
                      <th scope="col" className="px-1 py-0 border border-black">
                        Medical Allowance
                      </th>
                      <th scope="col" className="px-1 py-0 border border-black">
                        Tiffin Allowance
                      </th>
                      <th scope="col" className="px-1 py-0 border border-black">
                        Kit Allowance
                      </th>
                      <th scope="col" className="px-1 py-0 border border-black">
                        Company PF
                      </th>
                      <th scope="col" className="px-1 py-0 border border-black">
                        ESI
                      </th>
                      <th scope="col" className="px-1 py-0 border border-black">
                        Additional Benefits
                      </th>
                      <th scope="col" className="px-1 py-0 border border-black">
                        Fuel Expenses
                      </th>
                      <th scope="col" className="px-1 py-0 border border-black">
                        Other Expenses
                      </th>
                      <th scope="col" className="px-1 py-0 border border-black">
                        Arrear
                      </th>
                      <th
                        scope="col"
                        className="px-1 py-0 border border-black bg-green-200"
                      >
                        Final Amount
                      </th>
                      {/* <th scope="col" className="px-1 py-0 border border-black">
                                    Company PF
                                </th> */}
                      <th scope="col" className="px-1 py-0 border border-black">
                        Employee PF
                      </th>

                      <th scope="col" className="px-1 py-0 border border-black">
                        Loan EMI
                      </th>
                      <th scope="col" className="px-1 py-0 border border-black">
                        TDS
                      </th>

                      <th
                        scope="col"
                        className="px-1 py-0 border border-black bg-green-200"
                      >
                        Amount after Deduction
                      </th>

                      {/* <th scope="col" className="px-1 py-0 border border-black">
                                  Send Salary Email
                                </th> */}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 overflow-y-hidden">
                    {filteredData.map((data) => {
                      if (data.genMonths) {
                        deductAmount = parseFloat(
                          data.finalAmountSalary -
                            ((data.otherDeduction || 0) +
                              (data.emploanemi || 0) +
                              (data.empesi || 0) +
                              (data.emppf || 0) +
                              (data.fuelExpense || 0) +
                              (data.otherExpense || 0))
                        );
                        return (
                          <tr
                            className="border-b dark:border-neutral-200 text-sm font-medium"
                            key={data._id}
                          >
                            <td className="whitespace-nowrap px-1 py-0 border border-black">
                              <button
                                onClick={() => handleViewClick(data)}
                                type="button"
                                className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300  shadow-lg shadow-blue-500/50 font-medium rounded text-sm px-2 py-1 my-0.5 mx-0.5 text-center"
                              >
                                View
                              </button>
                            </td>
                            <td className="whitespace-nowrap px-1 py-0 border border-black">
                              {data.empName}
                            </td>
                            <td className="whitespace-nowrap px-1 py-0 border border-black">
                              {`₹${data.monthsalary || 0}`}
                            </td>
                            <td className="whitespace-nowrappx-1 py-0 border border-black">
                              {data.monthleave}
                            </td>
                            <td className="whitespace-nowrap px-1 py-0 border border-black">
                              {data.genMonths}
                            </td>
                            <td className="whitespace-nowrap px-1 py-0 border border-black">
                              {data.totalMonthDays}
                            </td>
                            <td className="whitespace-nowrap px-1 py-0 border border-black">
                              {data.totalDays}
                            </td>
                            <td className="whitespace-nowrap px-1 py-0 border border-black">
                              {data.sundays}
                            </td>
                            <td className="whitespace-nowrap px-1 py-0 border border-black">
                              {data.holidayCount}
                            </td>
                            <td className="whitespace-nowrap px-1 py-0 border border-black">
                              {data.presentDays}
                            </td>
                            <td className="whitespace-nowrap px-1 py-0 border border-black">
                              {data.totalHalfDays}
                            </td>
                            <td className="whitespace-nowrap px-1 py-0 border border-black">
                              {data.totalAbsent}
                            </td>
                            <td className="whitespace-nowrappx-1 py-0 border border-black">
                              {`₹${data.empgrossSalary || 0}`}
                            </td>
                            <td className="whitespace-nowrap px-1 py-0 border border-black">
                              {`₹${data.genSalary || 0}`}
                            </td>
                            <td className="whitespace-nowrap px-1 py-0 border border-black">
                              {`₹${data.empbasicSalary || 0}`}
                            </td>

                            <td className="whitespace-nowrap px-1 py-0 border border-black">
                              {`₹${data.incentive || 0}`}
                            </td>
                            {/* <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                
                                                {`₹${data.totalAmount || 0}`}
                                            </td> */}

                            <td className="whitespace-nowrap px-1 py-0 border border-black">
                              {`₹${data.emphra}`}
                            </td>
                            <td className="whitespace-nowrap px-1 py-0 border border-black">
                              {`₹${data.empca || 0}`}
                            </td>
                            <td className="whitespace-nowrap px-1 py-0 border border-black">
                              {`₹${data.empmedical || 0}`}
                            </td>
                            <td className="whitespace-nowrap px-1 py-0 border border-black">
                              {`₹${data.emptiffin || 0}`}
                            </td>
                            <td className="whitespace-nowrap px-1 py-0 border border-black">
                              {`₹${data.kit || 0}`}
                            </td>
                            <td className="whitespace-nowrap px-1 py-0 border border-black">
                              {`₹${data.empcompanyPf || 0}`}
                            </td>
                            <td className="whitespace-nowrap px-1 py-0 border border-black">
                              {`₹${data.empesi || 0}`}
                            </td>
                            <td className="whitespace-nowrap px-1 py-0 border border-black">
                              {`₹${data.additional || 0}`}
                            </td>
                            <td className="whitespace-nowrap px-1 py-0 border border-black">
                              {`₹${data.fuelExpense || 0}`}
                            </td>
                            <td className="whitespace-nowrap px-1 py-0 border border-black">
                              {`₹${data.otherExpense || 0}`}
                            </td>
                            <td className="whitespace-nowrap px-1 py-0 border border-black">
                              {`₹${data.arrear || 0}`}
                            </td>
                            <td className="whitespace-nowrap px-1 py-0 border border-black bg-green-100">
                              {`₹${data.finalAmountSalary || 0}`}
                            </td>

                            <td className="whitespace-nowrap px-1 py-0 border border-black">
                              {`₹${data.emppf || 0}`}
                            </td>

                            <td className="whitespace-nowrap px-1 py-0 border border-black">
                              {`₹${data.emploanemi || 0}`}
                            </td>
                            <td className="whitespace-nowrap px-1 py-0 border border-black">
                              {`₹${data.otherDeduction || 0}`}
                            </td>

                            <td className="whitespace-nowrap px-1 py-0 border border-black bg-green-100">
                              {`₹${deductAmount || 0}`}
                            </td>

                            {/* <td className="whitespace-nowrap px-1 py-0 border border-black">
                                        <button type="button" onClick={() => onGenSalaryDelete(data._id)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center my-1">Delete</button>
                                    </td> */}
                          </tr>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </tbody>
                </>
              )}
            </table>
          </div>
        </div>
      </div>

      {showViewPopup && selectedViewId && (
        <SalaryViewPage data={selectedViewId} onClosed={handleViewClosePopup} />
      )}
    </section>
  );
}

export default ViewSal;
