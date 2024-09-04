import { useState, useEffect } from 'react';
import axios from 'axios';
import VITE_DATA from '../../../config/config.jsx';
import { toast } from 'react-toastify';

function Indorshment() {
  // State variables to store form data
  const [comp, setComp] = useState([]);
  const [branch, setBranch] = useState([]);
  const [inputDate, setInputDate] = useState('');
  const [formData, setFormData] = useState({
    date: '',
    companyName: '',
    policyNo: '',
    insuredName: '',
    regNo: '',
    typeOfIndo: '',
    subTypeIndo: '',
    policyMadeBy: '',
    mistakeOf: '',
    reason: '',
    advisorName: '',
    branch: '',
    status: '',
    policyStatus: '',
    chequeNo: '',
    finalStatus: '',
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
        [name]: formatDate(value),
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
      const response = await axios.post(`${VITE_DATA}/indorshment/add`, formData);
      if (response.data.message) {
        toast.success(`${response.data.message}`);
        // Reset the form and loading state on successful submission
        setFormData({
          date: '',
          companyName: '',
          policyNo: '',
          insuredName: '',
          regNo: '',
          typeOfIndo: '',
          subTypeIndo: '',
          policyMadeBy: '',
          mistakeOf: '',
          reason: '',
          advisorName: '',
          branch: '',
          status: '',
          policyStatus: '',
          chequeNo: '',
          finalStatus: '',
          remarks: '',
        });
        setInputDate('');
      }
    } catch (error) {
      console.error('Error:', error); // Log any errors
      toast.error("Error Occurred. Try again...!", error);

    }
  };

  return (<>
    <section className="container-fluid relative pt-2 p-0 sm:ml-48 bg-slate-100">
      <div className="container-fluid  flex flex-col  justify-center p-2 border-gray-200 border-dashed rounded  bg-slate-50">
        <span className="text-2xl py-1 tracking-wider text-blue-700 font-medium uppercase">Add Endorsment</span>
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
              <label htmlFor='policyNo' className="text-base  mx-1 ">Policy No:</label>
              <input id='policyNo' className="input-style p-1  rounded" type="text" name="policyNo" value={formData.policyNo} onChange={handleChange} placeholder="Policy No" required />
            </div>

            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
              <label htmlFor='insuredName' className="text-base  mx-1 ">Insured Name:</label>
              <input id='insuredName' className="input-style p-1  rounded" type="text" name="insuredName" value={formData.insuredName} onChange={handleChange} placeholder="Insured Name" required />
            </div>

            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
              <label htmlFor='regNo' className="text-base  mx-1 ">Reg. No:</label>
              <input id='regNo' className="input-style p-1  rounded" type="text" name="regNo" value={formData.regNo} onChange={handleChange} placeholder="Reg. No" />
            </div>

            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
              <label htmlFor='typeOfIndo' className="text-base  mx-1 ">TypeOf Indorshment:</label>
              <select id='typeOfIndo' className="input-style p-1  rounded" type="text" name="typeOfIndo" value={formData.typeOfIndo} onChange={handleChange} placeholder="Type Of Indorshment">
                <option value="">--------- Select Indorshment --------</option>
                <option value="NILL">NILL</option>
                <option value="NOT NILL">NOT NILL</option>
              </select>
            </div>

            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
              <label htmlFor='subTypeIndo' className="text-base  mx-1 ">SubType Indorshment:</label>
              <select id='subTypeIndo' className="input-style p-1  rounded" type="text" name="subTypeIndo" value={formData.subTypeIndo} onChange={handleChange} placeholder="SubType Indorshment">
                <option value="">--- Select SubType Indorshment ----</option>
                <option value="ADDRESS CORRECTION">ADDRESS CORRECTION</option>
                <option value="CC">CC</option>
                <option value="CHASSIS">CHASSIS</option>
                <option value="COVARAGE INCLUSION">COVARAGE INCLUSION</option>
                <option value="ENGINE">ENGINE</option>
                <option value="EMAIL ID">EMAIL ID</option>
                <option value="HYPOTHICATION">HYPOTHICATION</option>
                <option value="INSURED NAME">INSURED NAME</option>
                <option value="IDV">IDV</option>
                <option value="MAKE MODEL">MAKE MODEL</option>
                <option value="MOBILE">MOBILE</option>
                <option value="NAME TRANSFER">NAME TRANSFER</option>
                <option value="NCB RECOVERY">NCB RECOVERY</option>
                <option value="NOMINEE">NOMINEE</option>
                <option value="REG. NO CORRECTION">REG. NO CORRECTION</option> 
              </select>
            </div>

            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
              <label htmlFor='policyMadeBy' className="text-base  mx-1 ">Policy Made By:</label>
              <input id='policyMadeBy' className="input-style p-1  rounded" type="text" name="policyMadeBy" value={formData.policyMadeBy} onChange={handleChange} placeholder="Policy Made By" />
            </div>

            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
              <label htmlFor='mistakeOf' className="text-base  mx-1 ">Mistake Of:</label>
              <input id='mistakeOf' className="input-style p-1  rounded" type="text" name="mistakeOf" value={formData.mistakeOf} onChange={handleChange} placeholder="Mistake Of" />
            </div>

            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
              <label htmlFor='reason' className="text-base  mx-1 ">Reason:</label>
              <input id='reason' className="input-style p-1  rounded" type="text" name="reason" value={formData.reason} onChange={handleChange} placeholder="Reason" />
            </div>

            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
              <label htmlFor='advisorName' className="text-base  mx-1 ">Advisor Name:</label>
              <input id='advisorName' className="input-style p-1  rounded" type="text" name="advisorName" value={formData.advisorName} onChange={handleChange} placeholder="Advisor Name" />
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
              <label htmlFor='status' className="text-base  mx-1 ">Status:</label>
              <input id='status' className="input-style p-1  rounded" type="text" name="status" value={formData.status} onChange={handleChange} placeholder="Status" />
            </div>

            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
              <label htmlFor='policyStatus' className="text-base  mx-1 ">Policy Status:</label>
              <select id='policyStatus' className="input-style p-1  rounded" type="text" name="policyStatus" value={formData.policyStatus} onChange={handleChange} placeholder="Policy Status" >
                <option value="">--------- Select Policy Status --------</option>
                <option value="TAGGED">TAGGED</option>
                <option value="NOT TAGGED">NOT TAGGED</option>
              </select>
            </div>

            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
              <label htmlFor='chequeNo' className="text-base  mx-1 ">Cheque No:</label>
              <input id='chequeNo' className="input-style p-1  rounded" type="text" name="chequeNo" value={formData.chequeNo} onChange={handleChange} placeholder="Cheque No" />
            </div>

            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
              <label htmlFor='finalStatus' className="text-base  mx-1 ">Final Status:</label>
              <select id='finalStatus' className="input-style p-1  rounded" type="text" name="finalStatus" value={formData.finalStatus} onChange={handleChange} placeholder="Final Status" >
                <option value="">--------- Select Final Status --------</option>
                <option value="DONE">DONE</option>
                <option value="PENDING">PENDING</option>
              </select>
            </div>

            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
              <label htmlFor='remarks' className="text-base  mx-1 ">Remarks:</label>
              <textarea id='remarks' className="input-style p-1  rounded" name="remarks" value={formData.remarks} onChange={handleChange} placeholder="Remarks" ></textarea>
            </div>
            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2"></div>
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
}

export default Indorshment;