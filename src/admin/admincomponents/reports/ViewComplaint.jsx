import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import VITE_DATA from "../../../config/config.jsx";
const ViewComplaint = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      toast.error("Not Authorized yet.. Try again!");
    } else {
      axios
        .get(`${VITE_DATA}/users/viewcomplaint`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          setComplaints(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const onDeleteComplaint = async (_id) => {
    try {
      await axios.delete(`${VITE_DATA}/users/deletecomplaint/${_id}`);
      toast.warn("Complaint Deleted.....!", {
        theme: "dark",
        position: "top-right",
      });
      setComplaints((prevData) => prevData.filter((data) => data._id !== _id));
    } catch (error) {
      console.error("Error deleting complaint:", error);
    }
  };

  return (
    <section className="container-fluid relative p-0 sm:ml-48 bg-white">
      <div className="container-fluid flex justify-center p-2 border-gray-200  rounded-lg  bg-white">
        <div className="inline-block min-w-full w-full py-0">
          <div className="overflow-x-auto w-xl text-blue-700">
            {/* <NavLink to="/dashboard/addemployee" className="flex justify-end">
              Back
            </NavLink> */}
            <h1 className="flex justify-center text-3xl font-semibold w-full my-2 text-blue-700">Complaint List&apos;s</h1>
            <hr />
          </div>
          <div className="inline-block min-w-full w-full py-0  bg-slate-200">
            <table className="min-w-full text-center text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr className="text-blue-700">
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
                    Subject
                  </th>
                  <th scope="col" className="px-1 py-1 border border-black">
                    Query
                  </th>
                 
                  <th scope="col" className="px-1 py-1 border border-black">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((complaint) => (
                  <tr
                    className="border-b dark:border-neutral-200 text-sm font-medium"
                    key={complaint._id}
                  >
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{complaint.complaint_name}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{complaint.complaint_email}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{complaint.complaint_mobile}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{complaint.complaint_subject}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{complaint.complaint_query}</td>
                    
                    <td className="whitespace-nowrap px-1 py-1 border border-black">
                      <button
                        type="button"
                        onClick={() => onDeleteComplaint(complaint._id)}
                        className="text-white bg-gradient-to-r from-red-600 via-red-500 to-red-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded text-sm px-3 py-1 text-center ">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewComplaint;
