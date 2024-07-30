import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import axios from "axios";
import VITE_DATA from "../../../config/config.jsx";
function AddHr() {
 
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [aadhar, setAadhar] = useState("");
    const [hrid, setHrid] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [designation, setDesignation] = useState("");
    const [calendar, setCalendar] = useState("");
    const [hrname, setHrname] = useState("");
    const [aadharno, setAadharno] = useState("");
    // const [accNumber, setAccNumber] = useState("");
    // const [ifsc, setIfsce] = useState("");
    // const [bankName, setBankName] = useState("");
    const [branch, setBranch] = useState("");
    const [joining, setJoining] = useState("");
    const [permanentaddress, setPermanentaddress] = useState("");
    const [branchList, setBranchList] = useState([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      // Fetch the list of branches when the component mounts
      axios.get(`${VITE_DATA}/api/branch-list`).then((resp) => {
        setBranchList(resp.data);
      });
    }, []);
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      try {
        const formData = new FormData();
        formData.append("hraadharfile", aadhar);
        formData.append("hrid", hrid);
        formData.append("hrname", hrname);
        formData.append("hrdob", calendar);
        formData.append("hrgender", gender);
        formData.append("hremail", email.toLowerCase());
        formData.append("hrmobile", mobile);
        formData.append("hrjoiningdate", joining);
        formData.append("hrbranch", branch);
        formData.append("currenthraddress", address);
        formData.append("permanenthraddress", permanentaddress);
        formData.append("hraadharno", aadharno);

        // formData.append("accNumber", accNumber);
        // formData.append("bankName", bankName);
        // formData.append("ifsc", ifsc);

        formData.append("hrdesignation", designation);
  
        // Make sure to replace this URL with your actual API endpoint
        const response = await axios.post(
          `${VITE_DATA}/hr/addhr"`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        if (response.data) {
          toast.success("HR added successfully!");
          // Reset the form on successful submission
          setAddress("");
          setGender("");
          setAadhar("");
          setHrid("");
          setEmail("");
          setMobile("");
          setDesignation("");
          setCalendar("");
          setHrname("");
          setAadharno("");
          setBranch("");
          setJoining("");
          setPermanentaddress("");
          setLoading(false);
        } else {
          toast.error("Error Occurred. Try again!");
        }
      } catch (error) {
        toast.error("Error during Hr registration. Please try again.");
      }
    };
    
    return (
       <section className="container-fluid relative p-0 sm:ml-48 bg-white">
      <div className="container-fluid flex justify-center p-2   rounded-lg   bg-white">
        
        <div className="relative w-full lg:w-full  p-0 lg:p-4 rounded-xl shadow-xl text-2xl  items-center bg-gradient-to-r from-slate-400 to-slate-400">
        <h1 className="font-semibold text-3xl mb-8 text-white dark:text-black ">Add HR</h1>
          <form className="flex flex-wrap" method="POST" encType="multipart/form-data">
            <div className="w-full lg:w-1/2 p-2 text-start">
            <div className="flex flex-col">
                <label className="text-base mx-1 ">HR Name:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  name="hrname"
                  value={hrname}
                  onChange={(e) => setHrname(e.target.value)}
                  placeholder="Enter Name"
                />
              </div>
  
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">DOB:</label>
                <input
                  className="input-style rounded-lg"
                  type="date"
                  name="hrdob"
                  value={calendar}
                  onChange={(e) => setCalendar(e.target.value)}
                />
              </div>
             
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Mobile No:</label>
                <input
                  className="input-style rounded-lg"
                  type="number"
                  min="1"
                  name="hrmobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="+91"
                />
              </div>
  
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Aadhar No.:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  name="hraadharno"
                  value={aadharno}
                  onChange={(e) => setAadharno(e.target.value)}
                  placeholder=""
                />
              </div>
  
             
  
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Joining Date:</label>
                <input
                  className="input-style rounded-lg"
                  type="date"
                  value={joining}
                  name="hrjoiningdate"
                  onChange={(e) => setJoining(e.target.value)}
                  placeholder=""
                />
              </div>
            
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Current Address:</label>
                <textarea
                  className="input-style rounded-lg"
                  type="text"
                  rows={2}
                  name="currenthraddress"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter Your Address"
                />
              </div>
             
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Designation:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  name="hrdesignation"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  placeholder=""
                />
              </div>
  
            </div>
  
  
  
            <div className="w-full lg:w-1/2 p-2 text-start">
            <div className="flex flex-col ">
                <label className="text-base mx-1">Gender:</label>
                <select
                  className="input-style rounded-lg"
                  type="text"
                  value={gender}
                  name="hrgender"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">----- Select Gender -----</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
                
              </div>
  
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Email ID:</label>
                <input
                  className="input-style rounded-lg"
                  type="email"
                  name="hremail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="abc@gmail.com"
                />
              </div>
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">HR Id:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  name="hrid"
                  value={hrid}
                  onChange={(e) => setHrid(e.target.value)}
                  placeholder="s-12"
                />
              </div>
             
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Upload Aadhar Card:</label>
                <input
                  className="input-style border w-full h-10 items-center rounded-lg"
                  type="file"
                  name="hraadharfile"
                  accept="/*" //accepting all type of images
                  onChange={(e) => setAadhar(e.target.files[0])}
                  autoComplete="off"
                />
              </div>
  
              <div className="flex flex-col ">
                <label className="text-base mx-1">Branch:</label>
                <select
                    className="input-style rounded-lg"
                    type="text"
                    name="hrbranch"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    placeholder="Enter Branch Name"
                  >
                    <option value="0">----- Select Branch -----</option>
                    {branchList.map((branchItem) => (
                      <option key={branchItem._id} value={branchItem.branchname}>
                        {branchItem.branchname}
                      </option>
                    ))}
                  </select>
              </div>
  
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Permanent Address:</label>
                <textarea
                  className="input-style rounded-lg"
                  type="text"
                  rows={2}
                  name="permanenthraddress"
                  value={permanentaddress}
                  onChange={(e) => setPermanentaddress(e.target.value)}
                  placeholder="Enter Your Address"
                />
              </div>
              
  
            
             
            </div>
            
            <div className="w-full p-2">
              <button
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2"
                onClick={handleSubmit}
                type="button"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
              <NavLink to="/dashboard/viewhr" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-6 py-2 text-center me-2 mb-2">
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
  
  export default AddHr;