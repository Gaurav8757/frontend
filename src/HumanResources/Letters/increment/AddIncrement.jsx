import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import VITE_DATA from "../../../config/config.jsx";

function AddIncrement() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [incdate, setIncDate] = useState("");
  const [incrementAmount, setIncrementAmount] = useState("");
  const [selectedEmployeeSalary, setSelectedEmployeeSalary] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Not Authorized yet.. Try again! ");
    } else {
      axios
        .get(`${VITE_DATA}/api/employee-list`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          setEmployees(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);
  function getFormattedDate() {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const date = getFormattedDate();
  useEffect(() => { setIncDate(date) }, [date]);


  // console.log(employees);
  const handleEmployeeChange = (e) => {
    const selectedId = e.target.value;
    setSelectedEmployeeId(selectedId);

    const selectedEmployee = employees.find(employee => employee._id === selectedId);
    if (selectedEmployee) {
     
      setSelectedEmployeeSalary(selectedEmployee.salary);
    }
  };

  const newSalary = parseFloat(selectedEmployeeSalary) + parseFloat(incrementAmount);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formSubmitted) {
      return;
    }

    try {
      const response = await axios.put(
        `${VITE_DATA}/api/salary/update/${selectedEmployeeId}`,
        {
          incmoney: incrementAmount,
          salary: newSalary,
          incdate
        }
      );
      if (response.data) {
        toast.success(`${response.data.status}`);
        setFormSubmitted(true);
        setSelectedEmployeeId("");
        setIncrementAmount("");
      } else {
        toast.error("Error Occurred. Try again...! ");
      }
    } catch (error) {
      console.error("Error during Increment", error.response);
    } finally {
      setFormSubmitted(false);
    }
  };

  return (
    <section className="container-fluid relative p-0 sm:ml-64 bg-white">
      <h1 className="font-semibold text-3xl py-1 ">Increment Letter</h1>
      <div className="container-fluid flex justify-center p-2 border-gray-200 border-dashed rounded-lg  bg-white">

        <div className="relative w-full  rounded-xl shadow-xl text-2xl items-center bg-slate-200">

          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap justify-between">
              <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
                <label className="text-base mx-1">Current Date</label>
                <input
                  className="input-style p-1 rounded-lg"
                  type="text"
                  value={incdate}
                  onChange={(e) => setIncDate(e.target.value)}
                  placeholder="Increment Date"
                  readOnly
                />
              </div>
              <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
                <label className="text-base mx-1">Select Employee</label>
                <select
                  className="input-style p-1 text-base rounded-lg"
                  value={selectedEmployeeId}
                  onChange={handleEmployeeChange}
                >
                  <option value="">--------- Select Employee --------</option>
                  {employees.map((employee) => (
                    <option key={employee._id} value={employee._id} >
                      {employee.empid} - {employee.empname}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
                <label className="text-base mx-1">Increment Amount</label>
                <input
                  className="input-style p-1 rounded-lg"
                  type="number"
                  value={incrementAmount}
                  onChange={(e) => setIncrementAmount(e.target.value)}
                  placeholder="Enter Increment Amount"
                />
              </div>
              <div className="flex flex-col p-2 text-start w-full lg:w-1/5"></div>
              <div className="flex flex-col p-2 text-start w-full lg:w-1/5"></div>
              <div className="flex flex-col p-2 text-start w-full lg:w-1/5"></div>
            </div>
            <div className="flex justify-center p-2 text-center w-full my-2 mt-10 gap-10">
              <button
                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded text-sm px-3 py-2 text-center"
                type="submit"
                disabled={formSubmitted}
              >
                {formSubmitted ? "Submitted" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}




export default AddIncrement;