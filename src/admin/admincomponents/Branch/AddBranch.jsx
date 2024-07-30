import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import VITE_DATA from "../../../config/config.jsx";
function AddBranch() {
  const [branch, setBranch] = useState("");
  const [code, setCode] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState();
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState();
  const [phone, setPhone] = useState();
  const [person, setPerson] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
 console.log(password);

  const handleSubmit = async(e) => {
      e.preventDefault();
      // Prevent multiple submissions
 if (formSubmitted) {
  return;
}
setErrors({}); // Clear previous errors

        const errors = {};
        if (!branch) {
            errors.branch = "required*";
        }
        if (!code) {
            errors.code = "required*";
        }
        if (!address) {
            errors.address = "required*";
        }
        if (!district) {
            errors.district = "required*";
        }
        if (!state) {
            errors.state = "required*";
        }
        if (!pincode) {
            errors.pincode = "required*";
        }
        if (!email) {
            errors.email = "required*";
        }
        if (!mobile) {
            errors.mobile = "required*";
        }
        if (!person) {
            errors.person = "required*";
        }
        if (!password) {
          errors.password = "required*";
      }
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

       
      try {
        // Make sure to replace this URL with your actual API endpoint
        const response = await axios.post(`${VITE_DATA}/dashboard/addbranch`, {
          concernperson: person,
          branchname: branch,
          branchcode: code,
          branchemail: email,
          branchmobile: mobile,
          branchphone: phone,
          password: password,
          branchaddress: address,
          branchdistrict: district,
          branchstate: state,
          branchpincode: pincode,
        });
  if(response.data){
    toast.success("Added Successfully !");
    setFormSubmitted(true);
        // Reset the form and loading state on successful submission
        setBranch("");
        setCode("");
        setAddress("");
        setDistrict("");
        setState("");
        setPincode("");
        setEmail("");
        setPassword("");
        setMobile("");
        setPhone("");
        setPerson("");
        
      }
       else{
        toast.error("Error Occurred. Try again...! ");
       }
      } catch (error) {
        console.error("Error during branch registration:", error.response);
        toast.error(`${error.response}`);
      }
    };
    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
      setTimeout(() => setShowPassword(false), 10000);
  };

  return (
    <section className="container-fluid relative  h-screen p-0 sm:ml-48 bg-white">
    <div className="container-fluid  justify-center p-2  border-gray-200 border-dashed rounded-lg   bg-white">
    <h1 className="font-semibold text-3xl my-2 text-blue-700 ">Add Branch</h1>
      <div className="relative w-full lg:w-full  p-0 lg:p-4 rounded-xl shadow-xl text-2xl  items-center bg-slate-200">
      
        <form className="flex flex-wrap justify-between">
          
          <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">Branch Name:</label>
              <input
                className="input-style p-1 rounded-lg"
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value.toUpperCase())}
                placeholder="Enter Branch Name"
              />
              {errors.branch && <span className="text-red-600 text-sm ">{errors.branch}</span>}
            </div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">Email ID:</label>
              <input
                className="input-style p-1 rounded-lg"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="abc@gmail.com"
              />
              {errors.email && <span className="text-red-600 text-sm ">{errors.email}</span>}
            </div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">Mobile No:</label>
              <input
                className="input-style p-1 rounded-lg"
                type="number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="+91"
              />
              {errors.number && <span className="text-red-600 text-sm ">{errors.number}</span>}
            </div>
          
            <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">Phone No:</label>
              <input
                className="input-style p-1 rounded-lg"
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder=""
              />
              
            </div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">Branch Code:</label>
              <input
                className="input-style p-1 rounded-lg"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="Enter Branch Code"
              />
              {errors.code && <span className="text-red-600 text-sm ">{errors.code}</span>}
            </div>
            <div className="flex flex-col mt-4 p-2 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">Branch Manager:</label>
              <input
                className="input-style p-1 rounded-lg"
                type="text"
                value={person}
                onChange={(e) => setPerson(e.target.value.toUpperCase())}
                placeholder="Enter Name"
              />
              {errors.person && <span className="text-red-600 text-sm ">{errors.person}</span>}
            </div>
            <div className="flex flex-col mt-4 p-2 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">District:</label>
              <input
                className="input-style p-1 rounded-lg"
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value.toUpperCase())}
                placeholder="Enter Your District Name"
              />
              {errors.district && <span className="text-red-600 text-sm ">{errors.district}</span>}
            </div>
            <div className="flex flex-col mt-4 p-2 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">New Password:</label>
              <div className="relative">
              <input
                className="bg-gray-50 border  border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 "
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="**************"
              />
              <button
                                        type="button"
                                        onClick={handleTogglePassword}
                                        className="absolute inset-y-0 right-1 bottom-0  px-3 flex items-center focus:outline-none"
                                    >
                                        {showPassword ? (
                                          <img src="/view.png" height={5} width={25} alt="show"/>
                                            
                                        ) : (
                                          <img src="/eye.png" height={5} width={25} alt="close"/>
                                        )}
                                    </button></div>
              {errors.password && <span className="text-red-600 text-sm ">{errors.password}</span>}
            </div>
            
          
            <div className="flex flex-col mt-4  p-2 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">State:</label>
              <input
                className="input-style p-1 rounded-lg"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value.toUpperCase())}
                placeholder="Enter Your State Name"
              />
              {errors.state && <span className="text-red-600 text-sm ">{errors.state}</span>}
            </div>
            <div className="flex flex-col mt-4 p-2 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">Address:</label>
              <textarea
                className="input-style p-1 rounded-lg"
                type="text"
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value.toUpperCase())}
                placeholder="Enter Your Address"
              />
              {errors.address && <span className="text-red-600 text-sm ">{errors.address}</span>}
            </div>
            

            <div className="flex flex-col  p-2 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">Pincode:</label>
              <input
                className="input-style p-1 rounded-lg"
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="805110"
              />
              {errors.pincode && <span className="text-red-600 text-sm ">{errors.pincode}</span>}
            </div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/4"></div>
            
          <div className="w-full p-2 mt-5">
            <button
              className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300  shadow-lg shadow-green-500/50  font-medium rounded text-sm px-4 py-2 text-center"
              onClick={handleSubmit}
              type="button"
              disabled={formSubmitted}
            >
               {formSubmitted ? "Submitted" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
  )
}

export default AddBranch;