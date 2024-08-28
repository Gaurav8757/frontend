import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import VITE_DATA from "../../config/config.jsx";
function AddAdvisors() {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState();
  const [fname, setFname] = useState("");
  const [ids, setIds] = useState("");
  const [advType, setAdvType] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const branchname = sessionStorage.getItem("name");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Make sure to replace this URL with your actual API endpoint
      const response = await axios.post(`${VITE_DATA}/advisor/register`, {
        uniqueId: ids,
        advisorname: fname,
        advisoremail: email,
        advisormobile: mobile,
        advisorpassword: password,
        advisoraddress: address,
        advisortype: advType,
        branch: branchname,
      });

      if (response.data.status) {
        toast.success(`${response.data.status}`);
        // Reset the form and loading state on successful submission
        setIds("");
        setEmail("");
        setMobile("");
        setPassword("");
        setFname("");
        setAddress("");
        setAdvType("");
        setLoading(false);
      } else {
        toast.error("Error Occurred. Try again...! ");
      }
    } catch (error) {
      console.error(
        "Error during advisor registration:",
        error.response.data.message
      );
      toast.error(`${error.response.data.message}`);
      setLoading(false);
    }
  };

  return (
    <section className="container-fluid relative p-0 sm:ml-48 bg-white">
      <div className="container-fluid flex  flex-col justify-center p-2  border-gray-200 border-dashed rounded-lg   bg-white">
        <h1 className="font-semibold text-3xl my-2 text-orange-700 ">
          Register Advisor
        </h1>
        <div className="relative w-full lg:w-full  p-0 lg:p-4 rounded-xl shadow-xl text-2xl  items-center mt-2 bg-slate-200">
          <div className="flex flex-wrap justify-between">
            {/* <div className="w-full lg:w-1/2 p-2 text-start"> */}
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
            <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">Name</label>
              <input
                className="input-style p-1 rounded-lg"
                type="text"
                value={fname}
                onChange={(e) => setFname(e.target.value.toUpperCase())}
                placeholder="Enter Name"
              />
            </div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">Email ID</label>
              <input
                className="input-style p-1 rounded-lg"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                placeholder="abc@gmail.com"
              />
            </div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">Mobile No</label>
              <input
                className="input-style p-1 rounded-lg"
                type="number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="+91"
              />
            </div>

            <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">Location</label>
              <input
                className="input-style p-1 rounded-lg"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value.toUpperCase())}
                placeholder="Enter  Address"
              />
            </div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">Advisor Type</label>
              <select
                className="input-style p-1 rounded-lg"
                type="text"
                value={advType}
                onChange={(e) => setAdvType(e.target.value)}
              >
                <option value="">------------ Select Payout -----------</option>
                <option value="DAILY">Daily Payout</option>
                <option value="MONTHLY">Monthly Payout</option>
              </select>
              <span className="text-xs text-red-500 text-right">required*</span>
            </div>

            <div className="flex flex-col p-2 mt-1  text-start w-full lg:w-1/5">
              <label className="text-base mx-1">Password</label>
              <input
                className="input-style p-1 rounded-lg"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="**********"
              />
            </div>
            <div className="flex flex-col p-2 mt-1  text-start w-full lg:w-1/5"></div>
            <div className="flex flex-col p-2 mt-1  text-start w-full lg:w-1/5"></div>
            <div className="flex flex-col p-2 mt-1  text-start w-full lg:w-1/5"></div>
          </div>

          <div className="w-full mt-5 p-2">
            <button
              className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded text-sm px-3 py-2 text-center "
              onClick={handleSubmit}
              type="button"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
export default AddAdvisors;
