/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import VITE_DATA from "../../../config/config.jsx";

function UpdateVisitDaily({ data, onClosed, fetchDataByAdmin }) {
  const [loading, setLoading] = useState(false);
  const [datas, setData] = useState({
    currdate: "",
    name: "",
    category: "",
    address: "",
    mobile: "",
    branch: ""
  });

  useEffect(() => {
    setData(data);
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const updateDvr = async () => {
    try {
      setLoading(true);
      // Use the selected category ID in the patch method
      const resp = await axios.put(
        `${VITE_DATA}/dailyvisit/update/${datas._id}`,
        datas
      );
      toast.success(`${resp.data.message}`);
      onClosed(); // Close the modal after successful submission
      fetchDataByAdmin();
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(`${error.response.data.message}`);
      } else {
        toast.error("An unexpected error occurred");
      }
      console.error("Error updating details of DVR:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        id="static-modal"
        data-modal-backdrop="static"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed top-0 right-0 left-0 bottom-0 inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
      >
        <div className="relative p-1 w-full max-w-3xl max-h-4xl mx-auto my-32">
          <div className="relative bg-slate-200 rounded-lg shadow ">
            <div className="flex items-center justify-between bg-blue-700 p-1 px-2 rounded-t-md dark:border-gray-600">
              <h3 className="text-base font-semibold text-gray-100">
                Update DVR Details
              </h3>
              <button
                onClick={onClosed}
                type="button"
                className=" bg-transparent hover:bg-red-500 text-slate-100  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              >
                <img
                  src="/close.png"
                  height={5}
                  width={25}
                  alt="close"
                  className="hover:bg-red-500 rounded-full"
                />
              </button>
            </div>
            {/* data */}
            <div className="flex flex-wrap justify-between p-4 ">
              {/* FIELD - 1 */}
              <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
                <label htmlFor="currdate" className="text-base mx-1">
                  Date:
                </label>
                <input
                  id="currdate"
                  className="input-style p-1 rounded"
                  type="date"
                  value={datas.currdate}
                  onChange={handleInputChange}
                  name="currdate"
                />
              </div>
              <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
                <label htmlFor="name" className="text-base mx-1">
                  Name:
                </label>
                <input
                  id="name"
                  className="input-style p-1 rounded"
                  type="text"
                  value={datas.name}
                  onChange={handleInputChange}
                  name="name"
                />
              </div>

              <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
                <label htmlFor="branch" className="text-base mx-1">
                  Branch:
                </label>
                <input
                  id="branch"
                  className="input-style p-1 rounded"
                  type="text"
                  value={datas.branch}
                  onChange={handleInputChange}
                  name="branch"
                />
              </div>

              {/* FIELD - 2 */}
              <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
                <label htmlFor="category" className="text-base mx-1">
                  Category:
                </label>
                <input
                  id="category"
                  className="input-style p-1 rounded"
                  type="text"
                  value={datas.category}
                  onChange={handleInputChange}
                  name="category"
                />
              </div>

              {/* FIELD - 3 */}
              <div className="flex flex-col p-1 mt-3 text-start w-full lg:w-1/4">
                <label htmlFor="address" className="text-base mx-1">
                  Address:
                </label>
                <textarea
                  id="address"
                  rows={1}
                  className="input-style p-1 rounded"
                  type="text"
                  value={datas.address}
                  onChange={handleInputChange}
                  name="address"
                />
              </div>
              {/* FIELD - 4 */}
              <div className="flex flex-col p-1 mt-3 text-start w-full lg:w-1/4">
                <label htmlFor="mobile" className="text-base mx-1">
                  Mobile No:
                </label>
                <input
                  id="mobile"
                  className="input-style p-1 rounded"
                  type="number"
                  value={datas.mobile}
                  onChange={handleInputChange}
                  name="mobile"
                />
              </div>
              <div className="flex flex-col p-1 mt-3 text-start w-full lg:w-1/4"></div>
              <div className="flex flex-col p-1 mt-3 text-start w-full lg:w-1/4"></div>
            </div>
            <div className="col-span-4 p-2 mt-4 flex justify-center">
              <button
                className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 shadow-lg shadow-green-500/50  font-medium rounded text-sm px-3 py-1.5 text-center "
                onClick={updateDvr}
                type="button"
              >
                {" "}
                {loading ? "Submitting..." : "Submit"}{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateVisitDaily;
