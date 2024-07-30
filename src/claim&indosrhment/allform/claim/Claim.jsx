import { useState, useEffect } from 'react';
import axios from 'axios';
import VITE_DATA from '../../../config/config.jsx';
import { toast } from 'react-toastify';
const Claim = () => {
  // State variables to store form data
  const [comp, setComp] = useState([]);
  const [branch, setBranch] = useState([]);
  const [inputDate, setInputDate] = useState('');
  const [peDate, setPedate] = useState('');
  const [iDate, setIdate] = useState('');
  const [formData, setFormData] = useState({
    date: '',
    companyName: '',
    claimType: '',
    policyNo: '',
    insuredName: '',
    contactNo: '',
    vehicleRegNo: '',
    vehicleType: '',
    policyExpiryDate: '',
    intimationDate: '',
    claimNo: '',
    advisor: '',
    branch: '',
    claimStatus: '',
    claimAmount: '',
    surveyorName: '',
    surveyorContactNo: '',
    remarks: '',
  });

  useEffect(() => {
    axios.get(`${VITE_DATA}/view/company/lists`)
      .then((resp) => {
        const company = resp.data;
        setComp(company);
      })
      .catch((error) => {
        console.error("Error fetching company names:", error);
      });
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Not Authorized yet.. Try again! ");
    } else {
      // The user is authenticated, so you can make your API request here.
      axios
        .get(`${VITE_DATA}/api/branch-list`, {
          headers: {
            Authorization: `${token}`, // Send the token in the Authorization header
          },
        })
        .then((response) => {
          setBranch(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  // Format date to dd-MM-yyyy
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'date') {
      setInputDate(value);
      setFormData({
        ...formData,
        [name]:value ? formatDate(value) : '',
      });
    }
    else if (name === "policyExpiryDate") {
      setPedate(value);
      setFormData({
        ...formData,
        [name]:value ? formatDate(value) : '',
      });
    }
    else if (name === "intimationDate") {
      setIdate(value);
      setFormData({
        ...formData,
        [name]:value ? formatDate(value) : '',
      });
    }
    else {
      setFormData({
        ...formData,
        [name]: value.toUpperCase(),
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Post data to the server endpoint (replace 'your-server-endpoint' with your actual endpoint)
      const response = await axios.post(`${VITE_DATA}/claims/add`, formData);
      if (response.data.message) {
        toast.success(`${response.data.message}`);
        // Reset the form and loading state on successful submission
        setFormData({
          date: '',
          companyName: '',
          claimType: '',
          policyNo: '',
          insuredName: '',
          contactNo: '',
          vehicleRegNo: '',
          vehicleType: '',
          policyExpiryDate: '',
          intimationDate: '',
          claimNo: '',
          advisor: '',
          branch: '',
          claimStatus: '',
          claimAmount: '',
          surveyorName: '',
          surveyorContactNo: '',
          remarks: ''
        });
        setInputDate('');
        setPedate('');
      }
    } catch (error) {
      console.error('Error:', error); // Log any errors
      toast.error("Error Occurred. Try again...!", error);

    }
  };

  return (<>
    <section className="container-fluid relative pt-2 p-0 sm:ml-48 bg-slate-100">
      <div className="container-fluid  flex flex-col  justify-center p-2 border-gray-200 border-dashed rounded  bg-slate-50">
        <span className="text-2xl py-1 tracking-wider text-blue-700 font-medium uppercase">Add Claim</span>
        <div className="container-fluid flex justify-center p-2  border-dashed rounded-lg  bg-gray-300 shadow-2xl">
          <form className="flex flex-wrap justify-between" onSubmit={handleSubmit}>

            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
              <label htmlFor='date' className="text-base  mx-1 ">Date:</label>
              <input id='date' className="input-style p-1  rounded" type="date" name="date" value={inputDate} onChange={handleChange} required />
            </div>

            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
              <label htmlFor='comp' className="text-base  mx-1 ">Company:</label>
              <select id='comp' className="input-style p-1  rounded" type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Company Name" required>
                <option className="w-1" value="" >----------- Select Company ---------</option>
                {comp.map((comp) => (
                  <option key={comp._id} value={comp.c_type} data-id={comp._id}>
                    {comp.c_type}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
              <label htmlFor='claimType' className="text-base  mx-1 ">Claim Type:</label>
              <select id='claimType' className="input-style p-1  rounded" type="text" name="claimType" value={formData.claimType} onChange={handleChange} placeholder="Claim Type" required>
                <option className="w-1" value="" >---------- Select Claim Type ---------</option>
                <option value="THEFT">THEFT</option>
                <option value="MOTOR">MOTOR</option>
                <option value="PA">PA</option>
                <option value="TP">TP</option>
                <option value="OWN DAMMAGE">OWN DAMMAGE</option>
                <option value="HEALTH">HEALTH</option>
              </select>
            </div>

            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
              <label htmlFor='policyNo' className="text-base  mx-1 ">Policy No:</label>
              <input id='policyNo' className="input-style p-1  rounded" type="text" name="policyNo" value={formData.policyNo} onChange={handleChange} placeholder="Policy No" required />
            </div>

            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
              <label htmlFor='insuredName' className="text-base  mx-1 ">Insured Name:</label>
              <input id='insuredName' className="input-style p-1  rounded" type="text" name="insuredName" value={formData.insuredName} onChange={handleChange} placeholder="Insured Name" required />
            </div>

            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
              <label htmlFor='contactNo' className="text-base  mx-1 ">Contact No:</label>
              <input id='contactNo' className="input-style p-1  rounded" type="number" name="contactNo" value={formData.contactNo} onChange={handleChange} placeholder="Contact No" />
            </div>

            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
              <label htmlFor='vehicleRegNo' className="text-base  mx-1 ">Vehicle Reg No:</label>
              <input id='vehicleRegNo' className="input-style p-1  rounded" type="text" name="vehicleRegNo" value={formData.vehicleRegNo} onChange={handleChange} placeholder="Vehicle Reg No" required />
            </div>

            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
              <label htmlFor='vehicleType' className="text-base  mx-1 ">Vehicle Type:</label>
              <select id='vehicleType' className="input-style p-1  rounded" type="text" name="vehicleType" value={formData.vehicleType} onChange={handleChange} placeholder="Vehicle Type" required>
                <option className="w-1" value="" >--------- Select Vehicle Type ---------</option>
                <option value="TW">TW</option>
                <option value="PCV">PCV</option>
                <option value="GCV">GCV</option>
                <option value="PVT-CAR">PVT-CAR</option>
              </select>
            </div>

            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
              <label htmlFor='policyExpiryDate' className="text-base  mx-1 ">Policy Expiry Date:</label>
              <input id='policyExpiryDate' className="input-style p-1  rounded" type="date" name="policyExpiryDate" value={peDate} onChange={handleChange} />
            </div>

            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
              <label htmlFor='intimationDate' className="text-base  mx-1 ">Intimation Date:</label>
              <input id='intimationDate' className="input-style p-1  rounded" type="date" name="intimationDate" value={iDate} onChange={handleChange} />
            </div>

            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
              <label htmlFor='claimNo' className="text-base  mx-1 ">Claim No:</label>
              <input id='claimNo' className="input-style p-1  rounded" type="text" name="claimNo" value={formData.claimNo} onChange={handleChange} placeholder="Claim No" />
            </div>

            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
              <label htmlFor='advisor' className="text-base  mx-1 ">Advisor Name:</label>
              <input id='advisor' className="input-style p-1  rounded" type="text" name="advisor" value={formData.advisor} onChange={handleChange} placeholder="Advisor" />
            </div>

            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
              <label htmlFor='branch' className="text-base  mx-1 ">Branch:</label>
              <select id='branch' className="input-style p-1  rounded" type="text" name="branch" value={formData.branch} onChange={handleChange} placeholder="Branch" required>
                <option className="w-1" value="" >------------- Select Branch -----------</option>
                {
                  branch.map((item) => (
                    <option value={item.branchname} key={item._id}>{item.branchname}</option>
                  ))
                }
              </select>
            </div>

            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
              <label htmlFor='claimStatus' className="text-base  mx-1 ">Claim Status:</label>
              <select id='claimStatus' className="input-style p-1  rounded" type="text" name="claimStatus" value={formData.claimStatus} onChange={handleChange} placeholder="Claim Status" required>
                <option value="">---------- Select Claim Status --------</option>
                <option value="PENDING">PENDING</option>
                <option value="WAITING FOR APPROVAL">WAITING FOR APPROVAL</option>
                <option value="REJECTED">REJECTED</option>
                <option value="APPROVED">APPROVED</option>
                <option value="SURVEYER APPOINTED">SURVEYER APPOINTED</option>
                <option value="SURVEY DONE">SURVEY DONE</option>
                <option value="RI DONE">RI DONE</option>
                <option value="DOC PENDING FROM CUSTOMER SIDE">DOC PENDING FROM CUST. SIDE</option>
                <option value="PAYMENT DONE">PAYMENT DONE</option>
              </select>
            </div>

            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
              <label htmlFor='claimAmount' className="text-base  mx-1 ">Claim Amount:</label>
              <input id='claimAmount' className="input-style p-1  rounded" type="number" name="claimAmount" value={formData.claimAmount} onChange={handleChange} placeholder="Claim Amount" />
            </div>

            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
              <label htmlFor='surveyorName' className="text-base  mx-1 ">Surveyor Name:</label>
              <input id='surveyorName' className="input-style p-1  rounded" type="text" name="surveyorName" value={formData.surveyorName} onChange={handleChange} placeholder="Surveyor Name" />
            </div>

            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
              <label htmlFor='surveyorContactNo' className="text-base  mx-1 ">Surveyor Contact No:</label>
              <input id='surveyorContactNo' className="input-style p-1  rounded" type="number" name="surveyorContactNo" value={formData.surveyorContactNo} onChange={handleChange} placeholder="Surveyor Contact No" />
            </div>

            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
              <label htmlFor='remarks' className="text-base  mx-1 ">Remarks:</label>
              <textarea id='remarks' className="input-style p-1  rounded" name="remarks" value={formData.remarks} onChange={handleChange} placeholder="Remarks" ></textarea>
            </div>
            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2"></div>
            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2"></div>

            <div className="mx-auto  mt-8 p-2 text-center justify-center w-auto">
              <button className="flex w-20 text-white bg-gradient-to-r hover:text-black from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-0 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded text-sm px-4 py-2 text-center " type="submit">Submit</button>
            </div>


          </form>
        </div>
      </div>
    </section>
  </>

  );
};

export default Claim;
