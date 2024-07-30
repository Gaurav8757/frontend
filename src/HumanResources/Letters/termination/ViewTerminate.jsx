import axios from "axios";
import { useEffect, useState } from "react";
import TerminationLetter from "./TerminationLetter.jsx";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import TextLoader from "../../../loader/TextLoader.jsx";
import VITE_DATA from "../../../config/config.jsx";

function ViewTerminate() {
  const [APIData, setAPIData] = useState([]);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);


  const handleUpdateClick = (id) => {
    setSelectedRowId(id);
    setShowUpdatePopup(true);
  };

  const handleClosePopup = () => {
    setSelectedRowId(null);
    setShowUpdatePopup(false);
  };


  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Not Authorized yet.. Try again! ");
    } else {
      // The user is authenticated, so you can make your API request here.
      axios
        .get(`${VITE_DATA}/api/employee-list`, {
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
  }, []);
  const sortedData = [...APIData].sort((a, b) => {
    const idA = a.empid.toUpperCase();
    const idB = b.empid.toUpperCase();

    if (idA === idB) return 0;
    if (idA.startsWith("EIPL-") && idB.startsWith("EIPL-")) {
      const numA = parseInt(idA.replace("EIPL-", ""), 10);
      const numB = parseInt(idB.replace("EIPL-", ""), 10);
      return numA - numB;
    } else if (idA.startsWith("EIPL-")) {
      return -1;
    } else if (idB.startsWith("EIPL-")) {
      return 1;
    } else {
      return idA.localeCompare(idB);
    }
  });

  // ******************** Delete Functions *************************************/
  // const onDeleteEmployeeSalary = async (_id) => {
  //     try {
  //         await axios.delete(`https://eleedomimf.onrender.com/salary/api/${_id}`);
  //         toast.warn("Employee Salary Removed!", { theme: "dark", position: "top-right" });
  //         setAPIData((prevData) => prevData.filter((data) => data._id !== _id));
  //     } catch (error) {
  //         console.error('Error removing employee salary:', error);
  //     }
  // };

  return (
    <section className="container-fluid relative p-0 sm:ml-64 bg-slate-200">
      <div className="container-fluid flex justify-center p-0.5 border-gray-200 border-dashed rounded-lg dark:border-gray-700  bg-orange-100">
        <div className="inline-block min-w-full w-full py-0 ">

          <div className=" w-xl flex justify-center text-orange-700">
            <h1></h1>
            <h1 className="flex justify-center text-3xl font-semibold w-full py-2">Termination Employee List&apos;s</h1>
            <NavLink to="/hr/home/add/terminate/letter" className="flex justify-end my-auto text-red-700">
              <button type="button" className="text-white whitespace-nowrap justify-end bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-orange-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded text-sm px-3 py-2 text-center  ">Go Back</button>
            </NavLink>
          </div>

          <div className="inline-block min-w-full w-full py-0 mt-2 ">
            <table className="min-w-full text-center  text-sm font-light ">
            {sortedData.length === 0 ? (<TextLoader />) : (<>
              <thead className="border-b font-medium bg-slate-200 sticky top-16">
                <tr className="text-orange-700 sticky text-base top-16">
                  <th scope="col" className="px-0 py-1 border border-black">
                    Employee ID
                  </th>
                  <th scope="col" className="px-0 py-1 border border-black">
                    Employee Name
                  </th>
                  <th scope="col" className="px-0 py-1 border border-black">
                    Current Date
                  </th>
                  <th scope="col" className="px-0 py-1 border border-black">
                    Termination Date
                  </th>
                  <th scope="col" className="px-0 py-1 border border-black">
                    View Termination Letter
                  </th>
                </tr>
              </thead>
              {/* body */}
              <tbody className="divide-y divide-gray-200 bg-orange-200">
                {sortedData.map((data) => {
                  return (
                    <tr
                      className="border-b dark:border-neutral-200 text-sm font-medium"
                      key={data._id}>
                      <td className="px-0 py-0  border border-black">
                        {data.empid}
                      </td>
                      <td className="px-0 py-0  border border-black">
                        {data.empname}
                      </td>
                      <td className="px-0 py-0  border border-black">
                        {data.currDate}
                      </td>
                      <td className="px-0 py-0  border border-black">
                        {data.terminatedate}
                      </td>
                      <td className="px-0 py-1  border border-black">
                       
                        <button onClick={() => handleUpdateClick(data)} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded text-sm px-3 py-1 my-0.5 text-center ">
                        View
                      </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              </>)}
            </table>
          </div>
        </div>
      </div>
      {showUpdatePopup && selectedRowId && (
            <TerminationLetter terminate={selectedRowId} onClose={handleClosePopup} />
          )}
    </section>
  );
}
export default ViewTerminate;