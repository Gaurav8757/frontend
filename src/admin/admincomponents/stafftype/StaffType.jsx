import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ListStaffType from "./ListStaffType.jsx";
import VITE_DATA from "../../../config/config.jsx";
function StaffType() {
  const [type, setType] = useState("");


  const handleStaffType = async () => {
    try {
      // Check if a valid attendance status is selected
      if (!type) {
        toast.error('Please select a valid staff type.');
        return;
      }
      // Make a POST request to mark attendance
      await axios.post(`${VITE_DATA}/add/staff`, {
        s_type: type,
      });
      // Handle success (e.g., show a success message)
      toast.success('Staff Type Added Successfully!');
      setType("");
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error(
        'Error marking Staff Type',
        error.response ? error.response.data.message : error.message
      );

    }
  }

  return (
    <section className="container-fluid flex relative  p-0 sm:ml-48 bg-white">
      <div className="container-fluid w-full lg:w-1/2  justify-center p-2  border-gray-200 border-dashed rounded-lg dark:border-gray-700  bg-white">
      <h1 className="font-semibold text-2xl my-2 text-blue-700">Employee Type </h1>
        <div className="relative  p-0 lg:p-4 mt-4 rounded-xl shadow-xl text-2xl  items-center bg-gradient-to-r from-slate-200 to-slate-200">
          <div className="flex flex-col  p-2 text-start w-full lg:w-1/2">
            <label className="text-base  my-2">Employee Type:</label>
            <input
              className="input-style p-1 rounded-lg "
              type="text"
              value={type}
              name="type"
              onChange={(e) => setType(e.target.value.toUpperCase())}
              placeholder="Enter Employee Type"
            />
          </div>

          <div className="flex justify-center p-2 text-center w-full my-2 mt-10 gap-10">
            <button
              className="text-white hover:text-black bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 shadow-lg shadow-green-500/50  font-medium rounded text-sm px-4 py-2 text-center"
              onClick={handleStaffType}
              type="button">
              Submit
            </button>
          </div>
        </div>
      </div>
      <ListStaffType/>
    </section>
  )
}

export default StaffType;