/* eslint-disable react/prop-types */
import { useState, } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import VITE_DATA from "../../../config/config.jsx";

function UpdateSeat({ updateData, data, onClose }) {
  const [loading, setLoading] = useState(false);
  const [datas, setData] = useState({
    sitcapacity: "",
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value.toUpperCase(),
    }));
  };

  const updateSeatapi = async () => {
    try {
      setLoading(true);
      const resp = await axios.put(`${VITE_DATA}/sit/update/${data._id}`, datas); // Corrected
      console.log(resp);
      toast.success(`${resp.data.sitcapacity}`);
      onClose();
      updateData();
    } catch (error) {
      console.error("Error updating seating capacity:", error);
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
        className="fixed top-0 right-0 left-0 bottom-0 inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
        <div className="relative p-1 w-1/3  mx-auto my-40">
          {/* <!-- Modal content --> */}
          <div className="p-2 relative bg-gradient-to-r from-blue-700 to-blue-700 rounded-lg shadow dark:bg-slate-100">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between  rounded-lg dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-100">
                Update Seating Capacity
              </h3>
              <button
                onClick={onClose}
                type="button"
                className=" bg-transparent hover:bg-red-100 text-slate-100  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  "
              >
                <img src="/close.png" className=" rounded-xl bg-clip-image text-transparent" height={5} width={25} alt="report" />
              </button>
            </div>

            {/* <!-- Modal body --> */}
            <section className="p-1 md:p-1  rounded-lg max-h-auto text-justify overflow-y-auto bg-gradient-to-r from-blue-700 to-blue-700">
              {/* <div className="container-fluid flex justify-center p-1 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-blue-700"> */}
              <div className="relative w-full lg:w-full  rounded-xl shadow-xl text-2xl items-center bg-slate-200">
                <div className="ps-4">

                  <div className=" p-1  text-start w-full lg:w-1/4">
                    <label className="text-base font-medium whitespace-nowrap mx-1 mb-1">Sitting Capacity:</label>
                    <input
                      className="input-style p-1 text-base rounded-lg"
                      type="text"
                      value={datas.sitcapacity}
                      onChange={handleInputChange}
                      name="sitcapacity"
                      placeholder="Enter Sitting Capacity"
                    />
                  </div>
                </div>
                {/* button */}
                <div className="col-span-4 p-2 mt-4 flex justify-center">
                  <button
                    className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium hover:text-black rounded text-base px-3 py-1 text-center"
                    onClick={updateSeatapi} type="button" > {loading ? "Submitting..." : "Submit"} </button>
                </div>
              </div>
              {/* </div> */}
            </section>
          </div>
        </div>
      </div>
    </>

  )
}

export default UpdateSeat;