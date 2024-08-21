import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import VITE_DATA from "../../config/config.jsx";

function VisitDaily() {
  const [formData, setFormData] = useState({
    ids: sessionStorage.getItem('employeeId')|| "",
    currdate: "",
    name: "",
    category: "",
    address: "",
    mobile: "",
    branch:  sessionStorage.getItem('branch') || "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: name === 'currdate' ? value : value.toUpperCase(),
      });
    };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Post data to the server endpoint (replace 'your-server-endpoint' with your actual endpoint)
      const response = await axios.post(
        `${VITE_DATA}/dailyvisit/create`,
        formData
      );
      if (response.data) {
        toast.success(`${response.data.message}`);
        // Reset the form and loading state on successful submission
        setFormData({
          ids: "",
          currdate: "",
          name: "",
          category: "",
          address: "",
          mobile: "",
          branch: "",
          location: "",
        });
      }
    } catch (error) {
      console.error("Error:", error); // Log any errors
      toast.error(`${error.response.data.error} || ${error.response.data.message}`);
    }
  };
  return (
    <>
      <section className="container-fluid relative pt-2 p-0 sm:ml-48 bg-slate-100">
        <div className="container-fluid  flex flex-col  justify-center p-1 border-gray-200 border-dashed rounded  bg-slate-50">
          <span className="text-2xl py-1 tracking-wider text-blue-700 font-medium uppercase">
           Add DVR
          </span>
          <div className=" flex flex-col border-dashed rounded-lg   bg-gray-300 shadow-2xl">
          <div className="flex justify-center">
          <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
                <label htmlFor="currdate" className="text-base font-semibold font-mono text-center mx-1 ">
                  Current Date
                </label>
                <input
                  id="currdate"
                  className="input-style p-1  rounded"
                  type="date"
                  name="currdate"
                  value={formData.currdate}
                  onChange={handleChange}
                  required
                />
              </div>
              </div>
            <div
              className="flex flex-wrap mt-6 justify-center">
             

              <div className="flex flex-col  p-2 text-start  lg:w-1/4 w-1/2">
                <label htmlFor="name" className="text-base  mx-1 ">
                  Name:
                </label>
                <input
                  id="name"
                  className="input-style p-1  rounded"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                />
              </div>

              <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
                <label htmlFor="category" className="text-base  mx-1 ">
                  Category:
                </label>
                <input
                  id="category"
                  className="input-style p-1  rounded"
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Category"
                />
              </div>

              <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
                <label htmlFor="address" className="text-base  mx-1 ">
                  Address:
                </label>
                <textarea
                  id="address"
                  rows={1}
                  className="input-style p-1  rounded"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  
                />
              </div>

              <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
                <label htmlFor="mobile" className="text-base  mx-1">
                  Mobile No:
                </label>
                <input
                  id="mobile"
                  className="input-style p-1  rounded"
                  type="number"
                  name="mobile"
                  min={0}
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Mobile No."/>
              </div>
              <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2"></div>
              <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2"></div>
              <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2"></div>
          
            </div>
            <div className="mx-auto flex my-8 py-1 text-center justify-center w-auto">
              <button onClick={!formData ? "Not ALLOW":handleSubmit} className="flex flex-col  text-white bg-gradient-to-r hover:text-black from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-0 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded text-base px-3 py-1 text-center " type="submit">Submit</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default VisitDaily;
