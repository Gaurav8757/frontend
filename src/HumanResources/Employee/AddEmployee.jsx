import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import VITE_DATA from "../../config/config.jsx";

function AddEmployee() {
  const [joiningAPI, setJoinapi] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [staffType, setStaffType] = useState("");
  const [type, setType] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [empid, setEmpid] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [designation, setDesignation] = useState("");
  const [calendar, setCalendar] = useState("");
  const [empname, setEmpname] = useState("");
  const [aadharno, setAadharno] = useState("");
  const [panno, setPanno] = useState("");
  const [branch, setBranch] = useState("");
  const [joining, setJoining] = useState("");
  const [accNumber, setAccNumber] = useState("");
  const [ifsc, setIfsce] = useState("");
  const [emppassword, setEmpPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [bankName, setBankName] = useState("");
  const [permanentaddress, setPermanentaddress] = useState("");
  const [pan, setPan] = useState("");
  const emp = empid.toUpperCase();

  useEffect(() => {
    axios.get(`${VITE_DATA}/api/branch-list`)
      .then((resp) => {
        setBranchList(resp.data);
      })
      .catch((error) => {
        console.error('Error fetching branch lists:', error);
      });
  }, []);

  useEffect(() => {
    axios.get(`${VITE_DATA}/staff/lists`)
      .then((resp) => {
        setType(resp.data);
      })
      .catch((error) => {
        console.error('Error fetching staff lists:', error);
      });
  }, []);

  useEffect(() => {
    axios.get(`${VITE_DATA}/letters/view/offer`)
      .then((resp) => {
        setJoinapi(resp.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleEmployeeChange = (e) => {
    const selectedEmpName = e.target.value;
    setEmpname(selectedEmpName);
    const selectedEmp = joiningAPI.find(emp => emp.ofname === selectedEmpName);
    if (selectedEmp) {
      setEmail(selectedEmp.ofemail);
      setEmpid(selectedEmp.referenceno);
      setJoining(selectedEmp.joinempdate);
      setStaffType(selectedEmp.ofdesignation);
      setMobile(selectedEmp.ofmobile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formSubmitted) {
      return;
    }
    setErrors({});
    const errors = {};
    if (!empid) errors.empid = "required*";
    if (!empname) errors.empname = "required*";
    if (!emppassword) errors.emppassword = "required*";
    if (!email) errors.email = "required*";
    if (!branch) errors.branch = "required*";
    if (!joining) errors.joining = "required*";
    if (!staffType) errors.staffType = "required*";
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("empaadharfile", aadhar);
      formData.append("empid", empid);
      formData.append("empname", empname);
      formData.append("empdob", calendar);
      formData.append("empgender", gender);
      formData.append("empemail", email.toLowerCase());
      formData.append("empmobile", mobile);
      formData.append("empjoiningdate", joining);
      formData.append("empbranch", branch);
      formData.append("currentempaddress", address);
      formData.append("permanentempaddress", permanentaddress);
      formData.append("empaadharno", aadharno);
      formData.append("empdesignation", designation);
      formData.append("staffType", staffType);
      formData.append("accNumber", accNumber);
      formData.append("bankName", bankName);
      formData.append("ifsc", ifsc);
      formData.append("pan", pan);
      formData.append("panno", panno);
      formData.append("emppassword", emppassword);

      const response = await axios.post(`${VITE_DATA}/dashboard/addemployee`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (response.data) {
        toast.success("Employee added successfully!");
        setFormSubmitted(true);
        setAccNumber("");
        setIfsce("");
        setEmpPassword("");
        setBankName("");
        setAddress("");
        setGender("");
        setAadhar("");
        setEmpid("");
        setEmail("");
        setMobile("");
        setDesignation("");
        setCalendar("");
        setEmpname("");
        setAadharno("");
        setBranch("");
        setJoining("");
        setStaffType("");
        setPermanentaddress("");
        setPanno("");
        setPan("");
      } else {
        toast.error("Error occurred. Try again!");
      }
    } catch (error) {
      toast.error(`${"User Email Already Exists.......!"}`);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="container-fluid relative p-0 sm:ml-64 bg-white">
      <div className="container-fluid justify-center rounded-lg bg-white">
        <h1 className="font-semibold text-3xl my-4 text-orange-700">Add Employee</h1>
        <div className="relative w-full lg:w-full p-0 rounded-xl shadow-xl text-2xl items-center bg-gradient-to-r from-slate-200 to-slate-200">
          <form className="flex flex-wrap justify-between" method="POST" encType="multipart/form-data">
            <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">Employee Name:</label>
              <select
                className="input-style p-1 ps-2 rounded-lg"
                type="text"
                name="empname"
                value={empname}
                onChange={handleEmployeeChange}
              >
                <option value="">------ Select Employee Name -------</option>
                {joiningAPI.map((emp) => (
                  <option key={emp._id} value={emp.ofname}>{emp.ofname}</option>
                ))}
              </select>
              {errors.empname && <span className="text-red-600 text-sm ">{errors.empname}</span>}
            </div>

            <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">Email ID:</label>
              <input
                className="input-style p-1 rounded-lg"
                type="email"
                name="empemail"
                autoComplete="false"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="abc@gmail.com"
              />
              {errors.email && <span className="text-red-600 text-sm ">{errors.email}</span>}
            </div>

            <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">Employee ID:</label>
              <input
                className="input-style p-1 rounded-lg"
                type="text"
                name="empid"
                value={emp}
                onChange={(e) => setEmpid(e.target.value)}
                placeholder="EIPL-000"
              />
              {errors.empid && <span className="text-red-600 text-sm ">{errors.empid}</span>}
            </div>

            <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">Joining Date:</label>
              <input
                className="input-style p-1 rounded-lg"
                type="text"
                value={joining}
                name="empjoiningdate"
                onChange={(e) => setJoining(e.target.value)}
                placeholder=""
              />
              {errors.joining && <span className="text-red-600 text-sm ">{errors.joining}</span>}
            </div>

            <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">Designation:</label>
              <select
                className="input-style p-1 rounded-lg"
                type="text"
                value={staffType}
                name="staffType"
                onChange={(e) => setStaffType(e.target.value)}
              >
                <option value="">--------- Select Designation ---------</option>
                {type.map((data) => (
                  <option key={data._id} value={data.s_type}>{data.s_type}</option>
                ))}
              </select>
              {errors.staffType && <span className="text-red-600 text-sm">{errors.staffType}</span>}
            </div>

            <div className="flex flex-col p-2 mt-2 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">Branch:</label>
              <select
                className="input-style p-1 rounded-lg"
                type="text"
                name="empbranch"
                value={branch}
                onChange={(e) => setBranch(e.target.value.toUpperCase())}
                placeholder="Enter Branch Name"
              >
                <option value="0">------------ Select Branch -----------</option>
                {branchList.map((branchItem) => (
                  <option key={branchItem._id} value={branchItem.branchname}>
                    {branchItem.branchname}
                  </option>
                ))}
              </select>
              {errors.branch && <span className="text-red-600 text-sm ">{errors.branch}</span>}
            </div>

            <div className="flex flex-col mt-2 p-2 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">Create Password:</label>
              <div className="relative">
                <input
                  className="bg-gray-50 border p-1.5 text-base border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full"
                  type={showPassword ? 'text' : 'password'}
                  value={emppassword}
                  autoComplete="false"
                  name="emppassword"
                  onChange={(e) => setEmpPassword(e.target.value)}
                  placeholder="ENTER NEW PASSWORD"
                />
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  aria-autocomplete="none"
                  className="absolute inset-y-0 p-1.5 right-1 bottom-0 px-3 flex items-center focus:outline-none"
                >
                  {showPassword ? (
                    <img src="/view.png" height={5} width={25} alt="show"/>
                  ) : (
                    <img src="/eye.png" height={5} width={25} alt="close"/>
                  )}
                </button>
              </div>
              {errors.emppassword && <span className="text-red-600 text-sm ">{errors.emppassword}</span>}
            </div>
            <div className="flex flex-col mt-2 p-2 text-start w-full lg:w-1/5"></div>
            <div className="flex flex-col mt-2 p-2 text-start w-full lg:w-1/5"></div>
            <div className="flex flex-col mt-2 p-2 text-start w-full lg:w-1/5"></div>
            <div className="w-full p-2 my-10">
              <button
                className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300  shadow-lg shadow-green-400/50 hover:text-black hover:text-base font-medium rounded text-sm px-4 py-2 text-center"
                onClick={handleSubmit}
                type="button"
              >
                {formSubmitted ? "Submitted" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AddEmployee;
