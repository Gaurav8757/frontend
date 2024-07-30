import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import VITE_DATA from "../../config/config.jsx";
function AddSalary() {
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [monthsalary, setMonthsalary] = useState("");
  const [monthleave, setMonthleave] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState();

  useEffect(() => {
    // Fetch the list of employees when the component mounts
    axios.get(`${VITE_DATA}/api/employee-lists`).then((response) => {
      setEmployeeList(response.data);
    });
  }, []);

  const sortedAPIData = employeeList.slice().sort((a, b) => {
    const empidA = parseInt(a.empid.split('-')[1]);
    const empidB = parseInt(b.empid.split('-')[1]);
    return empidA - empidB;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(`${VITE_DATA}/api/salary/update/${selectedEmployeeId}`, {
        salary: monthsalary,
        leavemonth: monthleave,
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
    <section className="container-fluid relative  p-0 sm:ml-64 bg-white">
      <div className="container-fluid  justify-center px-2  border-gray-200 border-dashed rounded-lg  bg-white">
      <h1 className="font-semibold text-3xl py-2 text-orange-700 ">Add Salary</h1>
        <div className="relative w-full lg:w-full  p-0 rounded-xl shadow-xl text-2xl  items-center bg-slate-200">

          <div className="flex flex-wrap justify-between p-4">
            <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">Employee:</label>
              {/* // Render the dropdown in your form */}
              <select
                className="input-style rounded-lg text-base p-1"
                name="empadd"
                value={selectedEmployee}
                onChange={(e) => {
                  const selectedName = e.target.value;
                  setSelectedEmployee(selectedName); // Set the selected employee's name
                  // Find the employee object corresponding to the selected name and get its _id
                  const selectedEmployee = sortedAPIData.find(employee => employee.empname === selectedName);
                  if (selectedEmployee) {
                    setSelectedEmployeeId(selectedEmployee._id);
                  }
                }}
              >
                <option value="" className="text-base">
                   --------- Select Employee ----------
                </option>
                {sortedAPIData.map((employee) => (
                 
                  <option key={employee.empid} value={employee.empname} className="text-base">
                    {employee.empid} - {employee.empname}
                  </option>
                ))}
              </select>
            </div>
           
            <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">Monthly Salary:</label>
              <input
                className="input-style p-1 rounded-lg"
                type="number"
                min="0"
                name="monthsalary"
                value={monthsalary}
                onChange={(e) => setMonthsalary(e.target.value)}
                placeholder=""
              />
            </div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">Monthly Leave:</label>
              <input
                className="input-style p-1 rounded-lg"
                type="number"
                min="0"
                name="monthleave"
                value={monthleave || 0}
                onChange={(e) => setMonthleave(e.target.value)}
                placeholder=""
              />
            </div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/5"></div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/5"></div>
            {/* button */}
            <div className="w-full p-2 mt-7">
              <button
                className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded text-base px-3 py-2 text-center"
                onClick={handleSubmit}
                type="button">
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default AddSalary;