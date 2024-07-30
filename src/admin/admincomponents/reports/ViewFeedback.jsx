import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import VITE_DATA from "../../../config/config.jsx";
const ViewFeedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Not Authorized yet.. Try again!");
    } else {
      axios
        .get(`${VITE_DATA}/users/viewfeedback`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          setFeedbackList(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);



  // update function
  const handleToggleFeedback = async (_id, currentStatus) => {
    try {
      // Toggle the current status (true to false or false to true)
      const newStatus = !currentStatus;

      // Update the feedback status in the database
      await axios.patch(`${VITE_DATA}/users/updatefeedbackstatus/${_id}`, {
        feedbackuser_status: newStatus,
      });

      // Update the feedbackList state to reflect the change
      setFeedbackList((prevData) =>
        prevData.map((feedback) =>
          feedback._id === _id ? { ...feedback, feedbackuser_status: newStatus } : feedback
        )
      );

      toast.success(`Feedback status updated to ${newStatus ? "Active" : "Inactive"}`, {
        theme: "dark",
        position: "top-right",
      });
    } catch (error) {
      console.error("Error toggling feedback status:", error);
    }
  };

  // delete function
  const onDeleteFeedback = async (_id) => {
    try {
      await axios.delete(`${VITE_DATA}/users/deletefeedback/${_id}`);
      toast.warn("Feedback is Deleted.....!", {
        theme: "dark",
        position: "top-right",
      });
      setFeedbackList((prevData) => prevData.filter((data) => data._id !== _id));
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  return (
    <section className="container-fluid relative h-screen p-0 sm:ml-48 bg-white">
      <h1 className="flex justify-center text-3xl text-blue-700 font-semibold w-full py-4">Feedback List&apos;s</h1>
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
                    Query
                  </th>
                  <th scope="col" className="px-1 py-1 border border-black">
                    Uploaded
                  </th>
                  <th scope="col" className="px-1 py-1 border border-black">
                    Feedback Control
                  </th>
                  <th scope="col" className="px-1 py-1 border border-black">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {feedbackList.length > 0 ? (
                  feedbackList.map((feedback) => (
                    <tr className="border border-black  text-sm font-medium" key={feedback._id}>
                      <td className="whitespace-nowrap px-1 py-1 border border-black">{feedback.feedbackuser_name}</td>
                      <td className="whitespace-nowrap px-1 py-1 border border-black">{feedback.feedbackuser_email}</td>
                      <td className="whitespace-nowrap px-1 py-1 border border-black">{feedback.feedbackuser_mobile}</td>
                      <td className="whitespace-wrap px-1 py-1  flex justify-center">{feedback.feedbackuser_query}</td>
                      <td className="whitespace-nowrap px-1 py-1 border border-black">
                        {feedback.feedbackuser_upload && (
                          <NavLink
                            to={feedback.feedbackuser_upload}
                            target="_blank"
                            rel="noopener noreferrer">
                            View File
                          </NavLink>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-1 py-1 border border-black">
                        <label className="relative inline-flex items-center justify-center  cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" onClick={() => handleToggleFeedback(feedback._id, feedback.feedbackuser_status)} checked={feedback.feedbackuser_status} />
                          <div className="w-10 h-5 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-1 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.22 after:start-[0px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-300"></span>
                        </label>
                      </td>
                      <td className="whitespace-nowrap px-1 py-1 border border-black">
                        <button
                          type="button"
                          onClick={() => onDeleteFeedback(feedback._id)}
                          className="text-white bg-gradient-to-r from-red-600 via-red-500 to-red-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 shadow-lg shadow-red-500/50 font-medium rounded text-sm px-3 py-1 my-0.5 text-center">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))) : (<tr>
                    <td colSpan="8" className="text-center pt-40 text-2xl font-semibold py-4 text-gray-900 dark:text-gray-00">
                      No feedback available.
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewFeedback;
