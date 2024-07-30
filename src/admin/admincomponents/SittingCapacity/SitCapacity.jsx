import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UpdateSeat from "./UpdateSeat.jsx"
import VITE_DATA from "../../../config/config.jsx";
function SitCapacity() {
  const [sitcapacity, setSit] = useState("");
  const [APIData, setAPIData] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
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

  const handleSitAdd = async () => {
    setFormSubmitted(true);
    try {
      // Check if a valid attendance status is selected
      if (!sitcapacity) {
        toast.error('Please select a valid Sitting Capacity....!');
        return;
      }
      // Make a POST request to mark attendance
      await axios.post(`${VITE_DATA}/sit/set`, {
        sitcapacity
      });
      // Handle success (e.g., show a success message)
      toast.success('Sitting Capacity Added Successfully.....!');
      setSit("");
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error(
        'Error Marking Sitting Capacity',
        error.response ? error.response.data.message : error.message
      );
    } finally {
      setFormSubmitted(false);
    }
  }
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Not Authorized yet.. Try again! ");
    } else {
      // The user is authenticated, so you can make your API request here.
      axios
        .get(`${VITE_DATA}/sit/show`, {
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

  const updateSeat = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        toast.error("Not Authorized yet.. Try again!");
      } else {
        const response = await axios.get(
          `${VITE_DATA}/sit/show`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setAPIData(response.data);
      }
    } catch (error) {
      console.error("Error fetching updated Sitting Capacity:", error);
    }
  };



  const deleteSitCapacity = async (_id) => {
    try {
      await axios.delete(`${VITE_DATA}/sit/capacity/${_id}`);
      toast.warn("Sitting Capacity Deleted.....!", { theme: "dark", position: "top-right" });
      setAPIData((prevData) => prevData.filter((data) => data._id !== _id));
    } catch (error) {
      console.error('Error Deleting Sitting Capacity', error);
    }
  };

  return (
    <section className="container-fluid relative flex p-0 sm:ml-48 bg-white">
      <div className="container-fluid w-full lg:w-1/2 justify-center p-2  border-gray-200 border-dashed rounded-lg dark:border-gray-700  bg-white">
        <h1 className="font-semibold text-3xl my-2 text-blue-700">Seating Capacity</h1>
        <div className="relative p-0 rounded-xl shadow-xl text-2xl  items-center bg-gradient-to-r from-slate-200 to-slate-200">

          <div className="flex flex-col  p-2 text-start w-full lg:w-1/2">
            <label className="text-base font-semibold my-1">Seating Capacity: <span className="text-red-600 font-bold">*</span></label>
            <input
              className="input-style p-1 rounded-lg "
              type="text"
              value={sitcapacity}
              name="type"
              onChange={(e) => setSit(e.target.value.toUpperCase())}
              placeholder="Enter No of Sitting Capacity"
            />
          </div>
          <div className="flex justify-center p-2 text-center w-full my-2 mt-10 gap-5">
            <button
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded text-sm px-3 py-1 text-center"
              onClick={handleSitAdd}
              type="button">
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="container-fluid w-full lg:w-1/2 justify-center p-2  border-gray-200 border-dashed rounded-lg dark:border-gray-700  bg-white">
      <div className="inline-block my-0 min-w-full w-full py-0 ">
        <h1 className="font-semibold text-3xl my-2 text-blue-700">Seating Capacity List&apos;s</h1>
        <table className="min-w-full text-center text-base font-light table bg-slate-200">
          <thead className="border  font-medium border-black">
            <tr className="text-blue-700">
              <th scope="col" className=" px-1 py-1 border border-black">
                Seating Capacity
              </th>
              <th scope="col" className=" px-1 py-1 border border-black">
                Update
              </th>
              <th scope="col" className="px-1 py-1 border border-black">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {APIData.map((data) => {
              return (
                <tr
                  className="border  font-medium border-black text-sm "
                  key={data._id}>
                  <td className="whitespace-nowrap px-1 py-1 border border-black">
                    {data.sitcapacity}
                  </td>
                  <td className="whitespace-nowrap px-1 py-1 border border-black">
                  <button onClick={() => handleUpdateClick(data)} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded text-sm px-2 py-1 my-0.5 mx-0.5 text-center ">
                                                            Update
                                                        </button>
                   
                  </td>
                  <td className="whitespace-nowrap px-1 py-1 border border-black">
                    <button
                      type="button"
                      // _ID MADE TO DELETE
                      onClick={() => deleteSitCapacity(data._id)}
                      className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded text-sm px-3 py-1 text-center ">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      </div>
      {showUpdatePopup && selectedRowId && (
                <UpdateSeat data={selectedRowId} updateData={updateSeat} onClose={handleClosePopup} />
            )}
    </section>
  )
}
export default SitCapacity;