import { useState, useEffect } from 'react';
import axios from 'axios';
import VITE_DATA from '../../../config/config.jsx';
import { toast } from 'react-toastify';

function Cancelation() {
  // State variables to store form data
  const [comp, setComp] = useState([]);
  const [branch, setBranch] = useState([]);
  const [inputDate, setInputDate] = useState('');
  const [peDate, setPedate] = useState('');
  const [iDate, setIdate] = useState('');
  const [formData, setFormData] = useState({
    date: '',
    policyNo: '',
    policyIssueDate: '',
    company: '',
    insuredName: '',
    regNo: '',
    reason: '',
    advisor: '',
    branch: '',
    policyAmount: '',
    status: '',
    refundAmount: '',
    refundDate: '',
    utrNeftNo: '',
    bankName: '',
    paidThrough: ''
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
  else if (name === "policyIssueDate") {
    setPedate(value);
    setFormData({
      ...formData,
      [name]: formatDate(value),
    });
  }
  else if (name === "refundDate") {
    setIdate(value);
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
      const response = await axios.post(`${VITE_DATA}/cancled/add`, formData);
      if (response.data.message) {
        toast.success(`${response.data.message}`);
        // Reset the form and loading state on successful submission
        setFormData({
          date: '',
          policyNo: '',
          policyIssueDate: '',
          company: '',
          insuredName: '',
          regNo: '',
          reason: '',
          advisorName: '',
          branch: '',
          policyAmount: '',
          status: '',
          refundAmount: '',
          refundDate: '',
          utrNeftNo: '',
          bankName: '',
          paidThrough: ''
        });
        setIdate('');
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
        <span className="text-2xl py-1 tracking-wider text-blue-700 font-medium uppercase">Cancellation Details</span>
        <div className="container-fluid flex justify-center p-2  border-dashed rounded-lg  bg-gray-300 shadow-2xl">
          <form className="flex flex-wrap justify-between" onSubmit={handleSubmit}>

            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
              <label htmlFor='date' className="text-base  mx-1 ">Date:</label>
              <input id='date' className="input-style p-1  rounded" type="date" name="date" value={inputDate} onChange={handleChange} required />
            </div>

            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
              <label htmlFor='policyNo' className="text-base  mx-1 ">Policy No:</label>
              <input id='policyNo' className="input-style p-1  rounded" type="text" name="policyNo" value={formData.policyNo} onChange={handleChange} placeholder="Policy No" required />
            </div>

            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
              <label htmlFor='policyIssueDate' className="text-base  mx-1 ">Policy Issue Date:</label>
              <input id='policyIssueDate' className="input-style p-1  rounded" type="date" name="policyIssueDate" value={peDate} onChange={handleChange} />
            </div>

            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
              <label htmlFor='comp' className="text-base  mx-1 ">Company:</label>
              <select id='comp' className="input-style p-1  rounded" type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company Name" required>
                <option className="w-1" value="" >----------- Select Company ---------</option>
                {comp.map((comp) => (
                  <option key={comp._id} value={comp.c_type} data-id={comp._id}>
                    {comp.c_type}
                  </option>
                ))}
              </select>
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
              <label htmlFor='policyAmount' className="text-base  mx-1 ">Policy Amount:</label>
              <input id='policyAmount' className="input-style p-1  rounded" type="number" name="policyAmount" value={formData.policyAmount} onChange={handleChange} placeholder="Policy Amount" />
            </div>

            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
              <label htmlFor='status' className="text-base  mx-1 ">Status:</label>
              <input id='status' className="input-style p-1  rounded" type="text" name="status" value={formData.status} onChange={handleChange} placeholder="Status" />
            </div>

            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
              <label htmlFor='refundAmount' className="text-base  mx-1 ">Refund Amount:</label>
              <input id='refundAmount' className="input-style p-1  rounded" type="number" name="refundAmount" value={formData.refundAmount} onChange={handleChange} placeholder="Refund Amount" />
            </div>

            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
              <label htmlFor='refundDate' className="text-base  mx-1 ">Refund Date:</label>
              <input id='refundDate' className="input-style p-1  rounded" type="date" name="refundDate" value={iDate} onChange={handleChange} required />
            </div>

            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
              <label htmlFor='utrNeftNo' className="text-base  mx-1 ">UTR/NEFT No.</label>
              <input id='utrNeftNo' className="input-style p-1  rounded" type="text" name="utrNeftNo" value={formData.utrNeftNo} onChange={handleChange} placeholder="UTR/NEFT No." />
            </div>

            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
              <label htmlFor='bankName' className="text-base  mx-1 ">Bank Name:</label>
              <input id='bankName' className="input-style p-1  rounded" type="text" name="bankName" value={formData.bankName} onChange={handleChange} placeholder="Bank Name" />
            </div>

            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2">
              <label htmlFor='paidThrough' className="text-base  mx-1 ">Paid Through:</label>
              <input id='paidThrough' className="input-style p-1  rounded" type="text" name="paidThrough" value={formData.paidThrough} onChange={handleChange} placeholder="Paid Through" />
            </div>
            <div className="flex flex-col  p-2 text-start  lg:w-1/5 w-1/2"></div>
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

export default Cancelation;