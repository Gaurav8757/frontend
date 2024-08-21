import axios from "axios";
import UpdateGenSalary from "./UpdateGenSalary.jsx";
import SalaryViewPage from "./SalaryViewPage.jsx";
import { useState, useEffect } from "react";
import VITE_DATA from "../../config/config.jsx";
import * as XLSX from "xlsx";
import { NavLink } from "react-router-dom";
import { useMemo } from "react";
import { format, addMonths } from "date-fns";
import { toast } from "react-toastify";
import TextLoader from "../../loader/TextLoader.jsx";

export default function ViewGenPolicy() {
  const [APIData, setAPIData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [initialMonth, setInitialMonth] = useState(new Date());
  const [checkedState, setCheckedState] = useState({});
  // update by id popup
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  // view salary popup
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [selectedViewId, setSelectedViewId] = useState(null);
  const name = sessionStorage.getItem("name");
  let deductAmount;
  useEffect(() => {
    setInitialMonth(new Date()); // Store the initial month when the component mounts
  }, []);

  const handleUpdateClick = (id) => {
    setSelectedRowId(id);
    setShowUpdatePopup(true);
  };

  const handleClosePopup = () => {
    setSelectedRowId(null);
    setShowUpdatePopup(false);
  };

  const handleViewClick = (id) => {
    setSelectedViewId(id);
    setShowViewPopup(true);
  };

  const handleViewClosePopup = () => {
    setSelectedViewId(null);
    setShowViewPopup(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          toast.error("Not Authorized yet.. Try again!");
          return;
        }

        const response = await axios.get(`${VITE_DATA}/api/salaries-list`, {
          headers: {
            Authorization: token,
          },
        });

        const data = response.data;
        setAPIData(data);

        // Initialize checkedState based on retrieved data, defaulting to false
        const initialCheckedState = {};
        data.forEach((item) => {
          initialCheckedState[item._id] = item.flags || false;
        });
        setCheckedState(initialCheckedState);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleCheckboxChange = async (event, id) => {
    const isChecked = event.target.checked;
    setCheckedState((prevState) => ({
      ...prevState,
      [id]: isChecked,
    }));

    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        toast.error("Not Authorized yet.. Try again!");
        return;
      }

      const response = await axios.put(`${VITE_DATA}/api/salaries/${id}`, {
        flags: isChecked,
      });
      toast.success(`${response.data.status}`);
    } catch (error) {
      toast.error(
        `Error updating flags: ${
          error.response?.data?.message || error.message
        }`
      );
      console.error("Error updating flags:", error);
    }
  };

  APIData.map((data) => [
    (deductAmount = parseFloat(
      data.finalAmountSalary -
        ((data.otherDeduction || 0) +
          (data.emploanemi || 0) +
          (data.emppf || 0))
    )),
  ]);

  const updateGenSalary = async () => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        toast.error("Not Authorized yet.. Try again!");
      } else {
        const response = await axios.get(`${VITE_DATA}/api/salaries-list`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setAPIData(response.data);
        // Reinitialize the checkedState based on the new data
        const initialCheckedState = {};
        response.data.forEach((item) => {
          initialCheckedState[item._id] = item.flags || false;
        });
        setCheckedState(initialCheckedState);
      }
    } catch (error) {
      console.error("Error fetching Generated Salary data:", error);
    }
  };

  // const handleCheckboxChange = (event, id) => {
  //     const isChecked = event.target.checked;
  //     setCheckedState(prevState => ({
  //         ...prevState,
  //         [id]: isChecked,
  //     }));
  //     updateGenSalaryAPI(id, isChecked);
  // };

  // const updateGenSalaryAPI = async (id, isChecked) => {
  //     try {
  //         const response = await axios.put(
  //             `${VITE_DATA}/api/salaries/${id}`,
  //             { flags: isChecked }
  //         );
  //         toast.success(`${response.data.status}`);
  //     } catch (error) {
  //         toast.error(`${error}`);
  //         console.error("Error to sending salary Slip:", error);
  //     }
  // };

  const exportToExcel = () => {
    try {
      const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";
      const fileName = `${name}_salary`;
      const columnsToInclude = [
        "Employee Name",
        "Months",
        "Total Days",
        "Working Days",
        "Sunday's",
        "Holiday's",
        "Present Days",
        "Total Half Days",
        "Absent",
        "Gross Salary",
        "Salary(working)",
        "Basic Salary",
        "HRA",
        "DA",
        "Medical Allowance",
        "Tiffin Allowance",
        "Kit Allowance",
        "Additional Benefits",
        "Company PF",
        "ESI",
        "Incentive",
        "Fuel Expenses",
        "Other Expenses",
        "Arrear",
        "Final Amount",
        "Salary in Words",
        "Employee PF",
        "Loan EMI",
        "TDS",
        "Amount after Deduction",
        // Include other necessary columns here
      ];
      const rowsToInclude = APIData.map((data) => [
        data.empName,
        data.genMonths,
        data.totalMonthDays,
        data.totalDays,
        data.sundays,
        data.holidayCount,
        data.presentDays,
        data.totalHalfDays,
        data.totalAbsent,
        data.empgrossSalary,
        data.genSalary,
        data.empbasicSalary,
        data.emphra,
        data.empca,
        data.empmedical,
        data.emptiffin,
        data.kit,
        data.additional,
        data.empcompanyPf,
        data.empesi,
        data.incentive,
        data.fuelExpense,
        data.otherExpense,
        data.arrear,
        data.finalAmountSalary,
        data.inWords,
        data.emppf,
        data.emploanemi,
        data.otherDeduction,
        (deductAmount = parseFloat(
          data.finalAmountSalary -
            ((data.otherDeduction || 0) +
              (data.emploanemi || 0) +
              (data.emppf || 0))
        )),
        // Include other necessary data here
      ]);

      const ws = XLSX.utils.aoa_to_sheet([columnsToInclude, ...rowsToInclude]);
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

  // ******************** Delete Functions *************************************/
  const onGenSalaryDelete = async (_id) => {
    try {
      await axios.delete(`${VITE_DATA}/salaries/api/${_id}`);
      toast.warn("Generated Salary Deleted!", {
        theme: "dark",
        position: "top-right",
      });
      // Update state or perform any other necessary actions
    } catch (error) {
      console.error("Error deleting generated salary:", error);
    }
  };
  

  return (
    <section className="container-fluid relative h-screen p-0 sm:ml-64 bg-orange-100 ">
      <div className="container-fluid flex justify-center pt-4  border-gray-200 border-dashed rounded-lg   bg-orange-100">
        <div className=" relative  min-w-full w-full ">
          <div className="flex justify-between px-2 ">
            <div className="flex justify-center ">
              <select
                className="input-style rounded-lg text-base p-1"
                value={format(selectedMonth, "M/yyyy")} // Format date as 'MM/yyyy'
                onChange={handleMonthChange}
              >
                {Array.from({ length: 10 }).map((_, index) => {
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
              Employee Generate Salary Lists
            </h1>
            <div className="flex">
              <button
                className="flex justify-center mx-4"
                onClick={handleExportClick}
              >
                <img src="/excel.png" alt="download" className="w-10" />
              </button>
              <NavLink
                to="/hr/home/generate/salary"
                className="flex justify-center"
              >
                <button
                  type="button"
                  className="text-white justify-end bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-orange-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded text-sm px-3 py-1 text-center my-auto"
                >
                  Go Back
                </button>
              </NavLink>
            </div>
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
                        Select
                      </th>
                      <th scope="col" className="px-1 py-0 border border-black">
                        Update
                      </th>
                      <th scope="col" className="px-1 py-0 border border-black">
                        Employee Name
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
                        Additional Benefits
                      </th>
                      <th scope="col" className="px-1 py-0 border border-black">
                        Company PF
                      </th>
                      <th scope="col" className="px-1 py-0 border border-black">
                        ESI
                      </th>
                      <th scope="col" className="px-1 py-0 border border-black">
                        Incentive
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
                        Salary in Words
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
                      <th scope="col" className="px-1 py-0 border border-black">
                        View
                      </th>
                      <th
                        scope="col"
                        className="px-1 py-0 border border-black"
                      ></th>
                      <th scope="col" className="px-1 py-0 border border-black">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 overflow-y-hidden">
                    {filteredData.map((data) => {
                        
                      if (data.genMonths) {
                        deductAmount = parseFloat(
                          data.finalAmountSalary -
                            ((data.otherDeduction || 0) +
                              (data.emploanemi || 0) +
                              (data.emppf || 0))
                        );
                        return (
                          <tr
                            className="border-b dark:border-neutral-200 text-sm font-medium"
                            key={data._id}
                          >
                            <td className="whitespace-nowrap px-1 py-0 border border-black">
                              <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                                checked={checkedState[data._id] || false}
                                onChange={(e) =>
                                  handleCheckboxChange(e, data._id)
                                }
                              />
                            </td>
                            <td className="whitespace-nowrap px-1 py-0 border border-black">
                              <button
                                onClick={() => handleUpdateClick(data)}
                                type="button"
                                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded text-sm px-2 py-1 my-0.5 mx-0.5 text-center "
                              >
                                Update
                              </button>
                            </td>
                            <td className="whitespace-nowrap px-1 py-0 border border-black">
                              {data.empName}
                            </td>
                            {/* <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                        {`₹${data.monthsalary || 0}`}
                                                    </td> */}
                            {/* <td className="whitespace-nowrappx-1 py-0 border border-black">
                                                        {data.monthleave}
                                                    </td> */}
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
                              {`₹${data.additional || 0}`}
                            </td>
                            <td className="whitespace-nowrap px-1 py-0 border border-black">
                              {`₹${data.empcompanyPf || 0}`}
                            </td>
                            <td className="whitespace-nowrap px-1 py-0 border border-black">
                              {`₹${data.empesi || 0}`}
                            </td>
                            <td className="whitespace-nowrap px-1 py-0 border border-black">
                              {`₹${data.incentive || 0}`}
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
                            {/* <td className="whitespace-nowrap px-1 py-0 border border-black">
                              {data.inWords}
                            </td> */}
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

                            <td className="whitespace-nowrap px-1 py-0 border border-black">
                              <button
                                onClick={() => handleViewClick(data)}
                                type="button"
                                className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300  shadow-lg shadow-blue-500/50 font-medium rounded text-sm px-2 py-1 my-0.5 mx-0.5 text-center"
                              >
                                View
                              </button>
                            </td>
                            <td className="whitespace-nowrap px-5 py-0 border border-black "></td>
                            <td className="whitespace-nowrap px-1 py-0 border border-black">
                              <button
                                type="button"
                                onClick={() => onGenSalaryDelete(data._id)}
                                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded text-sm px-2 py-1 text-center my-0.5 "
                              >
                                Delete
                              </button>
                            </td>
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
      {showUpdatePopup && selectedRowId && (
        <UpdateGenSalary
          genSalaries={selectedRowId}
          onUpdate={updateGenSalary}
          onClose={handleClosePopup}
        />
      )}
      {showViewPopup && selectedViewId && (
        <SalaryViewPage data={selectedViewId} onClosed={handleViewClosePopup} />
      )}
    </section>
  );
}
