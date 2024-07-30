/* eslint-disable react/prop-types */
// Form.jsx
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import VITE_DATA from "../../../config/config.jsx";
const Form = ({ companyName, setShowModal }) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
 

  const handleSubmit = async (e) => {
    e.preventDefault();
   

    try {
      // Make sure to replace this URL with your actual API endpoint
      const response = await axios.post(`${VITE_DATA}/users/userdetails`, {
        h_cname: companyName,
        h_name: name,
        h_email: email,
        h_mobile: mobile,
        h_address: address,
      });

      if (response.data) {
        toast.success("Added Successfully!");

        // Reset the form and loading state on successful submission
        setName("");
        setAddress("");
        setEmail("");
        setMobile("");
       

        // Close the modal
        setShowModal(false);
      } else {
        toast.error("Error Occurred. Try again...!");
      }
    } catch (error) {
      console.error("Error during registration:", error.response);
     
    }
  };

  return (
    <>
      <div className="flex justify-center backdrop-blur-sm items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-1/3 my-6 mx-auto w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-orange-700 outline-none focus:outline-none">
            <div className="flex items-start justify-between p-2 border-b border-solid border-gray-300 rounded-t">
              <h3 className="text-2xl font-semibold text-slate-200">Fill the Form</h3>
              <button
                className="bg-transparent border-0 text-black float-right"
                onClick={() => setShowModal(false)}
              >
                <span className="text-white hover:text-orange-600 opacity-7 h-6 w-6 text-xl block py-0 rounded-full transition duration-0 hover:duration-500">
                <img src="/close.png" height={5} width={25} alt="close"/>
                </span>
              </button>
            </div>
            {/* <div className="relative p-6 flex-auto text-start bg-gradient-to-r from-teal-700 to-cyan-800"> */}
              <form className="bg-orange-700 shadow-md rounded px-8 pt-6 pb-8 w-full">
               
 <div className="flex flex-wrap justify-between">
                <div className="flex flex-col p-2 text-start w-full lg:w-1/2">
                <label className="block text-black text-base font-semibold ">Name:</label>
                  <input
                  className="input-style p-1 rounded-md"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Name"
                  />
                  </div>
                  <div className="flex flex-col p-2 text-start w-full lg:w-1/2">
                  <label className="block text-black text-base font-semibold ">Company Name:</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setName(e.target.value)}
                    className="input-style p-1 rounded-md"
                    readOnly
                  />
                </div>

                <div className="flex flex-col p-2 text-start w-full lg:w-1/2">
                <label className="block text-black text-base font-semibold mb-1">Mobile:</label>
                <input
                  type="number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="input-style p-1 rounded-md"
                />
                </div>
                <div className="flex flex-col p-2 text-start w-full lg:w-1/2">
                <label className="block text-black text-base font-semibold mb-1">Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-style p-1 rounded-md"
                />
                </div>
              
                <div className="flex flex-col p-2 text-start w-full lg:w-full">
                <label className="block text-black text-base font-semibold mb-1">
                  Address<span className="font-thin text-white"> (Optional)</span>
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-1 mb-4 text-black"
                />
                </div>
                <div className="flex flex-col p-2 text-start w-full lg:w-1/3"></div>
                <div className="flex flex-col p-2 text-start w-full lg:w-1/3">
                <button
                className="text-white bg-green-500  active:bg-green-700 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none"
                type="button"
                onClick={handleSubmit}
              >
                Submit
              </button>
              </div>
              <div className="flex flex-col p-2 text-start w-full lg:w-1/3"></div>
                </div>
              </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
