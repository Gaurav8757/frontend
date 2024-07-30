import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import VITE_DATA from "../../../config/config.jsx";
function HrSalary() {
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [monthsalary, setMonthsalary] = useState("");
  const [monthleave, setMonthleave] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch the list of employees when the component mounts
    axios.get(`${VITE_DATA}/hr/lists`).then((response) => {
      setEmployeeList(response.data);
      
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post(`${VITE_DATA}/dashboard/hr/addsalary`, {
        hrname: selectedEmployee,
        hrmonthlySalary: monthsalary,
        hrmonthlyLeave: monthleave,
      });

      if (response.data) {
        toast.success("Salary Added Successfully!");
        // Reset the form and loading state on successful submission
        setSelectedEmployee("");
        setMonthsalary("");
        setMonthleave("");
        setLoading(false);
      } else {
        toast.error("Error Occurred. Try again!");
      }
    } catch (error) {
      console.error("Error during salary submission:", error.response);
      toast.error("Error Occurred. Try again!");
      setLoading(false);
    }
  };


  return (
    <section className="container-fluid relative h-screen p-0 sm:ml-48 bg-white">
      <div className="container-fluid flex justify-center p-2  border-gray-200 border-dashed rounded-lg dark:border-gray-700  bg-white">
        <div className="relative w-full lg:w-full  p-0 lg:p-4 rounded-xl shadow-xl text-2xl  items-center bg-slate-400">
          <h1 className="font-semibold text-3xl mb-8 text-white dark:text-black ">Add Salary</h1>
          <form className="flex flex-wrap">
            <div className="w-full lg:w-1/2 p-2 text-start">
              <div className="flex flex-col ">
                <label className="text-base mx-1">  Employee:</label>
                {/* // Render the dropdown in your form */}
                <select
              className="input-style rounded-lg text-base h-10"
              name="hrname"
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
            >
              <option value="" disabled className="text-base">
                ----- Select Employee -----
              </option>
              {employeeList.map((employee) => (
                <option key={employee.hrid} value={employee.hrname} className="text-base">
                  {employee.hrid} - {employee.hrname}
                </option>
              ))}
            </select>
              </div>
              <div className="flex flex-col py-5">
                <label className="text-base mx-1">Monthly Leave:</label>
                <input
                  className="input-style rounded-lg"
                  type="number"
                  min="0"
                  name="hrmonthlyLeave"
                  value={monthleave}
                  onChange={(e) => setMonthleave(e.target.value)}
                  placeholder=""
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2 p-2 text-start">

              <div className="flex flex-col">
                <label className="text-base mx-1">Monthly Salary:</label>
                <input
                  className="input-style rounded-lg"
                  type="number"
                  min="0"
                  name="hrmonthlySalary"
                  value={monthsalary}
                  onChange={(e) => setMonthsalary(e.target.value)}
                  placeholder=""
                />
              </div>
            </div>
            <div className="w-full p-2">
              <button
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2"
                onClick={handleSubmit}
                type="button"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
              <NavLink to="/dashboard/viewhrsalary" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-6 py-2 text-center me-2 mb-2">
              View
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default HrSalary;