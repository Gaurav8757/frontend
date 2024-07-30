import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import VITE_DATA from "../../config/config.jsx";

function LeaveBalance() {
  const [leavetype, setLeaveType] = useState('');
  const [APIData, setAPIData] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [restleave, setRestLeave] = useState();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Not Authorized yet.. Try again! ");
    } else {
      // The user is authenticated, so you can make your API request here.
      axios
        .get(`${VITE_DATA}/leave/type/show`, {
          headers: {
            Authorization: `${token}`, // Send the token in the Authorization header
          },
        })
        .then((response) => {
          setAPIData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [formSubmitted]);

  const handleSubmit = async () => {
    setFormSubmitted(true);
    try {
      // Check if a valid attendance status is selected
      if (!leavetype) {
        toast.error('Please Enter Leave Type....!');
        return;
      }
      // Make a POST request to mark attendance
      const resp = await axios.post(`${VITE_DATA}/leave/type/add`, {
        leavetype,
        restleave
      });
      // Handle success (e.g., show a success message)
      toast.success(`${resp.data.message.newStaff.leavetype} Added Successfully.....!`);
      setLeaveType("");
      setRestLeave("");
    } catch (error) {
      // Handle error (e.g., show an error message)
      toast.error(`${error.resp ? error.resp.data.message : error.message}`);
      console.error(
        'Error to Adding Leave Type',
        error.resp ? error.resp.data.message : error.message
      );
    } finally {
      setFormSubmitted(false);
    }
  }

  // Delete Functions
  // const deleteLeaveTypes = async (_id) => {
  //     try {
  //         await axios.delete(`${VITE_DATA}/leave/delete/${_id}`);
  //         toast.error("Leave Type Deleted Successfully.....!", { theme: "dark", position: "top-right" });
  //         setAPIData((prevData) => prevData.filter((data) => data._id !== _id));
  //     } catch (error) {
  //         console.error('Error to Deleting Leave Type', error);
  //     } 
  // };


  return (

    <section className="container-fluid relative w-1/2 p-0 sm:ml-64 bg-white">
      <div className="container-fluid flex-col  flex justify-center p-2 border-gray-100 border-dashed rounded-lg  bg-white">
        <span className="text-2xl p-2 tracking-wider text-green-900 font-medium">Add Leave Type</span>
        <div className="relative flex w-full lg:w-full p-5 lg:p-4 rounded-xl shadow-xl text-2xl items-center bg-slate-200">
          {/* <h1 className="font-semibold text-3xl mb-3">Add Leave Type</h1> */}
          <div className="flex  whitespace-nowrap p-2 text-center w-full lg:w-1/2 ">
            <label className="text-base mx-1 mb-2">Leave Type:<span className="text-red-600 font-bold">*</span> </label>
            <input
              className="input-style p-1 rounded-lg"
              type="text"
              name="leavetype"
              value={leavetype}
              onChange={(e) => setLeaveType(e.target.value.toUpperCase())}
              placeholder="Add Leave Type"
            />
          </div>

          <div className="flex  whitespace-nowrap  p-2 text-start w-full lg:w-1/2">
            <label className="text-base mx-1 my-1">Leave Balance:</label>
            <input
              type="number"
              className="input-style w-full p-1  rounded-lg"
              value={restleave}
              onChange={(e) => setRestLeave(e.target.value)}
              name="restleave"
            />
          </div>

          <div className="flex justify-center p-2 text-center w-full lg:w-1/2">
            <button
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center "
              onClick={handleSubmit}
              type="button"
              disabled={formSubmitted}>
              {formSubmitted ? "Submitted" : "Submit"}
            </button>
          </div>
        </div>
        <div className="inline-block my-6 min-w-full w-full py-0  overflow-x-auto">
          <h1 className="font-semibold text-2xl mb-1">Leave Type Lists</h1>
          <table className="min-w-full text-center text-base font-light table">
            <thead className="border-b font-medium dark:border-neutral-200 ">
              <tr className="text-blue-700">
                <th scope="col" className="px-1 border border-black">
                  Leave Type
                </th>
                <th scope="col" className="px-1 border border-black">
                  Leave Balance
                </th>
                {/* <th scope="col" className="px-1 border border-black">
                                Delete
                            </th> */}
              </tr>
            </thead>
            <tbody>
              {APIData.map((data) => {
                return (
                  <tr
                    className="border-b dark:border-neutral-200 text-sm font-medium"
                    key={data._id}
                  >
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.leavetype}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.restleave}
                    </td>
                    {/* <td className="whitespace-nowrap px-1 border border-black">
                                        <button 
                                            type="button" 
                                            // _ID MADE TO DELETE
                                            onClick={() => deleteLeaveTypes(data._id)} 
                                            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-3 py-2 text-center my-1">
                                            Delete
                                        </button>
                                    </td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>



  )
}



export default LeaveBalance;