import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UpdateHr from "./UpdateHr.jsx"
import { toast } from "react-toastify";
import VITE_DATA from "../../../config/config.jsx";

function ViewHr() {
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Not Authorized yet.. Try again! ");
        } else {
            // The user is authenticated, so you can make your API request here.
            axios
                .get(`${VITE_DATA}/hr/lists`, {
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

    // refreshing page after updating data
  const onUpdateHR = async () => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        toast.error("Not Authorized yet.. Try again!");
      } else {
        const response = await axios.get(
          `${VITE_DATA}/hr/lists`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        setAPIData(response.data);
      }
    } catch (error) {
      console.error("Error fetching updated Employee data:", error);
    }
  };

    // ******************** Delete Functions *************************************/
    const onDeleteHR = async (_id) => {
        try {
          await axios.delete(`${VITE_DATA}/hr/data/${_id}`);
          toast.warn("HR Deleted Successfully.....!", { theme: "dark", position: "top-right" });
          setAPIData((prevData) => prevData.filter((data) => data._id !== _id));
        } catch (error) {
          console.error('Error deleting hr:', error);
        }
      };
      
    return (
        <section className="container-fluid relative  h-screen p-0 sm:ml-48 bg-slate-200">
        <div className="container-fluid flex justify-center p-2  border-gray-200 border-dashed rounded-lg dark:border-gray-700  bg-slate-200">
            
            {/* <div className="sm:-mx-6 lg:-mx-8"> */}
                <div className="inline-block min-w-full w-full py-0 sm:px-6 lg:px-8">
                    <div className="overflow-x-auto w-xl  text-blue-500"
                    >
                        <h1 className="flex justify-center text-3xl w-full font-semibold mb-8">All HR Lists</h1><hr></hr>
                        </div>
                        <div className="inline-block min-w-full w-full py-0 sm:px-6 lg:px-8 overflow-x-auto">
                        <table className="min-w-full text-center text-sm font-light ">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr className="text-blue-700">
                                    <th scope="col" className="px-5 py-4">
                                   HR ID
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                     Name
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                    Email ID
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                    Password
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                    Mobile No.
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                    DOB.
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                    Gender
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                    Aadhar No.
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Aadhar
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Joining Date
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Branch 
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Current Address
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                    Permanent Address
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                    Designation
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Edit
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Delete
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {APIData.map((data) => {
                                    
                                    return (
                                        <tr
                                            className="border-b dark:border-neutral-200 text-sm font-medium"
                                            key={data.uniqueid}
                                        >
                                             <td className="whitespace-nowrap px-4 py-4">
                                                {data. hrid}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.hrname}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.hremail}
                                            </td>
                                            <td className="whitespace-wrap px-4 py-4">
                                                {data.hrpassword}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.hrmobile}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.hrdob}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.hrgender}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.hraadharno}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                <NavLink to= {data.hraadharfile}>
                                                    <img src={data.hraadharfile} alt="aadhar"/>
                                                      </NavLink>
                                                
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.hrjoiningdate}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.hrbranch}
                                            </td>
                                           
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.currenthraddress}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.permanenthraddress}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.hrdesignation}
                                            </td>


                                            <td className="whitespace-nowrap px-4 py-4">
                                               <UpdateHr hr = {data}  onUpdate = {onUpdateHR}/>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                <button type="button" onClick={() => onDeleteHR(data._id)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">Delete</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        {/* </div> */}
        </section>
    );
}
export default ViewHr;