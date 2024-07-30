import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import TextLoader from "../../../loader/TextLoader.jsx";
import IncrementLetter from "./IncrementLetter.jsx";
import VITE_DATA from "../../../config/config.jsx";

function ViewIncrement() {
  const [APIData, setAPIData] = useState([]);
  // const [ofletter, setOfletter] = useState([]);
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

  // useEffect(() => {
  //   const token = sessionStorage.getItem("token");
  //   if (!token) {
  //     toast.error("Not Authorized yet.. Try again! ");
  //   } else {
  //     // The user is authenticated, so you can make your API request here.
  //     axios
  //       .get(`${VITE_DATA}/letters/view/offer`, {
  //         headers: {
  //           Authorization: `${token}`, // Send the token in the Authorization header
  //         },
  //       })
  //       .then((response) => {

  //         setOfletter(response.data);

  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // }, []);

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
    <section className="container-fluid relative   p-0 sm:ml-64 bg-orange-100">
      <div className="container-fluid flex justify-center   border-gray-200 border-dashed rounded-lg dark:border-gray-700  bg-orange-100">
        <div className="inline-block min-w-full w-full py-0 px-1">


          <div className=" w-xl flex justify-center  text-orange-700">
            <h1></h1>
            <h1 className="flex justify-center text-3xl py-1 font-semibold w-full">Salary Increment List&apos;s</h1>
            <NavLink to="/hr/home/add/increment/letter" className="flex my-auto justify-end text-red-700">
              <button type="button" className="text-white whitespace-nowrap justify-end bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-orange-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded text-sm px-3 py-2 text-center  ">Go Back</button>
            </NavLink>
          </div>


          <div className="inline-block min-w-full w-full py-0 mt-3 bg-orange-200 ">
            <table className="min-w-full text-center  text-sm font-light ">
              {APIData.length === 0 ? (<TextLoader />) : (<>
                <thead className="border-b font-medium bg-slate-200 sticky top-16">
                  <tr className="text-orange-700 sticky text-base top-16">
                    <th scope="col" className="px-1 py-0 border border-black">
                      Employee Name
                    </th>
                    <th scope="col" className="px-1 py-1 border border-black">
                      Increment Date
                    </th>
                    <th scope="col" className="px-1 py-1 border border-black">
                      Increment Amount
                    </th>
                    <th scope="col" className="px-1 py-1 border border-black">
                      New Salary
                    </th>
                    <th scope="col" className="px-1 py-1 border border-black">
                      Monthly Leave
                    </th>
                    <th scope="col" className="px-1 py-1 border border-black">
                      View Increment Letter
                    </th>

                  </tr>
                </thead>
                {/* body */}
                <tbody className="divide-y divide-gray-200">
                  {APIData.map((data) => {

                    return (
                      <tr
                        className="border-b dark:border-neutral-200 text-sm font-medium"
                        key={data._id}
                      >
                        <td className="px-0 py-0  border border-black">
                          {data.empname}
                        </td>
                        <td className="px-0 py-0  border border-black">
                          {data.incdate}
                        </td>
                        <td className="px-0 py-0  border border-black">
                          {`₹ ${data.incmoney || 0}`}
                        </td>
                        <td className="px-0 py-0  border border-black">
                          {`₹ ${data.salary || 0}`}
                        </td>
                        <td className="px-0 py-0  border border-black">
                          {data.leavemonth}
                        </td>
                        <td className="px-0 py-1  border border-black">
                          <button onClick={() => handleUpdateClick(data)} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded text-sm px-3 py-1 my-0.5 text-center ">
                            View
                          </button>

                        </td>
                        {/* <td className="px-1 py-1  border border-black">
                                                  <button type="button" onClick={() => onDeleteEmployeeSalary(data._id)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center">Delete</button>
                                              </td> */}
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
        <IncrementLetter offers={selectedRowId} onClose={handleClosePopup} />
      )}
    </section>
  );
}

export default ViewIncrement;