import VITE_DATA from "../../../config/config.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
function CareersView() {
    const [APIData, setAPIData] = useState([]);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Not Authorized yet.. Try again! ");
        } else {
            // Fetch leave types
            axios
                .get(`${VITE_DATA}/users/career/lists`, {
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

     // ******************** Delete Functions *************************************/
     const deleteApplication = async (_id) => {
        try {
            await axios.delete(`${VITE_DATA}/users/career/delete/${_id}`);
            setAPIData((prevData) => prevData.filter((data) => data._id !== _id));
            
            // Find the name of the deleted application
            const deletedData = APIData.find((data) => data._id === _id);
            const name = deletedData ? deletedData.name : '';
    
            // Print the name twice in the toast message
            toast.warn(`${name} Application Deleted...!`, { theme: "dark", position: "top-right" });
        } catch (error) {
            console.error('Error deleting branch:', error);
        }
    };
    

  return (
    <section className="container-fluid relative h-screen p-0 sm:ml-48 bg-white">
    <h1 className="flex justify-center text-3xl text-blue-700 font-semibold w-full py-4">Job Application List&apos;s</h1>
    <div className="container-fluid  justify-center p-2 border-gray-200 border-dashed rounded-lg bg-slate-200">
      <div className="inline-block min-w-full w-full py-0 ">
        <div className="inline-block min-w-full w-full py-0 overflow-x-auto">
          <table className="min-w-full text-center text-sm font-light">
            <thead className="border-b font-medium ">
              <tr className="text-blue-700 border border-black">
                <th scope="col" className="px-1 py-1 border border-black">
                  Name
                </th>
                <th scope="col" className="px-1 py-1 border border-black">
                  Email
                </th>
                <th scope="col" className="px-1 py-1 border border-black">
                  Mobile
                </th>
                <th scope="col" className="px-1 py-1 border border-black">
                  Address
                </th>
                <th scope="col" className="px-1 py-1 border border-black">
                  Branch
                </th>
                <th scope="col" className="px-1 py-1 border border-black">
                 Qualification
                </th>
                <th scope="col" className="px-1 py-1 border border-black">
                Level
                </th>
                <th scope="col" className="px-1 py-1 border border-black">
                Position
                </th>
                <th scope="col" className="px-1 py-1 border border-black">
                  Apply Date
                </th>
                <th scope="col" className="px-1 py-1 border border-black">
                  View CV/Resume
                </th>
                <th scope="col" className="px-1 py-1 border border-black">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {APIData.length > 0 ? (
                APIData?.map((data) => (
                  <tr className="border border-black  text-sm font-medium" key={data._id}>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.name}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.email}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.mobile}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.address}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.branch}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.qualification}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.level}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.position}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.applyDate}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">
                      
                        <NavLink
                          to={data.pdfs}
                          target="_blank"
                          rel="noopener noreferrer" className="flex justify-center">
                          <img src="/downloading.png" alt="view" className="w-8"/>
                        </NavLink>
                      
                    </td>
                   
                    <td className="whitespace-nowrap px-1 py-1 border border-black">
                      <button
                        type="button"
                        onClick={() => deleteApplication(data._id)}
                        className="text-white bg-gradient-to-r from-red-600 via-red-500 to-red-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 shadow-lg shadow-red-500/50 font-medium rounded text-sm px-3 py-1 my-0.5 text-center">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))) : (<tr>
                  <td colSpan="18" className="text-center pt-40 text-2xl font-semibold py-4 text-gray-900 dark:text-gray-00">
                    No Application Available.
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
  )
}

export default CareersView;