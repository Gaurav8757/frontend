import { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import VITE_DATA from "../../../config/config.jsx";
function AddAdvisor() {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [ids, setIds] = useState("");

  const handleSubmit = async(e) => {
      e.preventDefault();
      setLoading(true);
      try {
        // Make sure to replace this URL with your actual API endpoint
        const response = await axios.post(`${VITE_DATA}/advisor/register`, {
          uniqueIDS: ids,
         advisorname: name,
          advisoremail: email,
          advisormobile: mobile,
          advisorpassword: password
        });

  if(response.data.status){
    toast.success(`${response.data.status}`);
        // Reset the form and loading state on successful submission
        setEmail("");
        setIds("");
        setMobile("");
        setPassword("");
        setName("");
        setLoading(false);
      }
       else{
        toast.error("Error Occurred. Try again...! ");
       }
      } catch (error) {
        console.error("Error during advisor registration:", error.response);
        // setError("Error during branch registration. Please try again.");
        setLoading(false);
      }
    };
  
  


  return (
    <section className="container-fluid relative  h-screen p-0 sm:ml-48 bg-white">
    <div className="container-fluid flex justify-center p-2  border-gray-200 border-dashed rounded-lg dark:border-gray-700  bg-white">
      <div className="relative w-full lg:w-full  p-0 lg:p-4 rounded-xl shadow-xl text-2xl  items-center bg-slate-400">
      <h1 className="font-semibold text-3xl mb-8 text-white dark:text-black ">Add Advisor</h1>
        <form className="flex flex-wrap ">
          <div className="w-full lg:w-1/2 p-2 text-start">
          <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">ID:</label>
              <input
                className="input-style p-1 rounded-lg"
                type="text"
                value={ids}
                onChange={(e) => setIds(e.target.value.toUpperCase())}
                placeholder="HJP, WB, PAT, MUZ"
              />
            </div>
          <div className="flex flex-col ">
              <label className="text-base mx-1">Name:</label>
              <input
                className="input-style rounded-lg"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
              />
            </div>
            <div className="flex flex-col my-5">
              <label className="text-base mx-1">Mobile No:</label>
              <input
                className="input-style rounded-lg"
                type="number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="+91"
              />
            </div>
          </div>


          <div className="w-full lg:w-1/2 p-2 text-start">
          <div className="flex flex-col ">
              <label className="text-base mx-1">Email ID:</label>
              <input
                className="input-style rounded-lg"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="abc@gmail.com"
              />
            </div>
            

            <div className="flex flex-col my-5">
              <label className="text-base mx-1">Password</label>
              <input
                className="input-style rounded-lg"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="***********"
              />
            </div>
          </div>
          <div className="w-full p-2">
            <button
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              onClick={handleSubmit}
              type="button"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>

            <NavLink to="/dashboard/viewadvisor" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-6 py-2.5 text-center me-2 mb-2">
              {/* <ViewBranch/> */}
              View
              </NavLink>
          </div>
        </form>
      </div>
    </div>
  </section>
  )
}

export default AddAdvisor;