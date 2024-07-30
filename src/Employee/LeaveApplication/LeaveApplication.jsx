import { useState, useEffect } from 'react';
import axios from 'axios';
import { format, differenceInDays } from 'date-fns';
import { toast } from "react-toastify";
import VITE_DATA from '../../config/config.jsx';

function LeaveApplication() {
  const employeeId = sessionStorage.getItem('employeeId');
  const [statusSubmitted, setStatusSubmitted] = useState(false);
  const [dayCounts, setDayCounts] = useState(0); // Initialize with 0
  const [leaveType, setLeaveType] = useState('');
  const [loading, setLoading] = useState(false);
  const [APIData, setAPIData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [restLeave, setRestLeave] = useState(0); // Initialize with 0
  const [reason, setReason] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Not Authorized yet.. Try again! ");
    } else {
      // Fetch leave types
      axios
        .get(`${VITE_DATA}/api/employee-list`, {
          headers: {
            Authorization: `${token}`, // Send the token in the Authorization header
          },
        })
        .then((response) => {
          setAPIData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);
  
  const tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 1);
  const currentDate = tomorrow.toISOString().split('T')[0];

  const handleInputChanges = (e) => {
    const selectedType = e.target.value;
    setLeaveType(selectedType);

    // Find the selected leave type in the APIData array
    const selectedData = APIData
      .filter(data => data._id === sessionStorage.getItem("employeeId"))
      .map(data => data.leavebalance.find(emp => emp.restLeave === selectedType)); // Convert selectedType to integer if necessary
    if (selectedData.length > 0 && selectedData[0]) {
      setRestLeave(selectedData[0].num); // Access restLeave property from selectedData
    } else {
      setRestLeave(0); // Reset leave balance if leave type not found
    }
  };


  // Function to handle leave submission
  const formatDates = (startDate, endDate) => {
    const startDateFormatted = format(new Date(startDate), 'dd/MM/yyyy');
    const endDateFormatted = format(new Date(endDate), 'dd/MM/yyyy');
    return { startDateFormatted, endDateFormatted };
  };

  const calculateDaysCount = (startDate, endDate) => {
    return differenceInDays(new Date(endDate), new Date(startDate)) + 1;
  };

  const validateFields = (startDate, endDate, leaveType, reason) => {
    return startDate && endDate && leaveType && reason;
  };

  const checkLeaveLimit = (restLeave, daysCount) => {
    return restLeave === 0 || restLeave - daysCount < 0;
  };

  const fetchCurrentLeaveDetails = async (employeeId) => {
    const response = await axios.get(`${VITE_DATA}/api/employee/${employeeId}`);
    return response.data.leaveDetails || [];
  };

  const updateLeaveDetails = async (employeeId, updatedLeaveDetails) => {
    await axios.put(`${VITE_DATA}/api/emp/update/${employeeId}`, { leaveDetails: updatedLeaveDetails });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
        // ******************* Current date *******************//
      const getCurrentDateString = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = today.getFullYear();
      
        return `${day}/${month}/${year}`;
      };
      const db = getCurrentDateString();
        // ******************* Current date *******************//

      // ******************* Current time *******************//
      const getCurrentTimeString = () => {
        const today = new Date();
        let hours = today.getHours();
        const minutes = String(today.getMinutes()).padStart(2, '0');
        const seconds = String(today.getSeconds()).padStart(2, '0');
        const amPm = hours >= 12 ? 'PM' : 'AM';
      
        hours = hours % 12;
        hours = hours ? hours : 12; // The hour '0' should be '12'
        const strHours = String(hours).padStart(2, '0');
      
        return `${strHours}:${minutes}:${seconds} ${amPm}`;
      };
      
      // Store the current time string in the dbTime variable
      const dbTime = getCurrentTimeString();
  // ******************* Current time *******************//


      if (validateFields(startDate, endDate, leaveType, reason)) {
        const { startDateFormatted, endDateFormatted } = formatDates(startDate, endDate);
        const daysCount = calculateDaysCount(startDate, endDate);

        if (checkLeaveLimit(restLeave, daysCount)) {
          toast.warn('Your leave limit for this type has been reached.');
          setLoading(false);
          return;
        }

        const restleaveValue = restLeave - daysCount;
        const status = "pending";
        const currentLeaveDetails = await fetchCurrentLeaveDetails(employeeId);

        const updatedLeaveDetails = [
          ...currentLeaveDetails,
          {
            dateRange: { startDate: startDateFormatted, endDate: endDateFormatted },
            leavetype: leaveType,
            restleave: restleaveValue,
            reasonForLeave: reason,
            status: status,
            counts: daysCount,
            applyDate: db,
            applytime:dbTime,
          },
        ];

        await updateLeaveDetails(employeeId, updatedLeaveDetails);
        toast.success('Leave application submitted successfully....!');
        setStartDate('');
        setEndDate('');
        setLeaveType('');
        setReason('');
        setLoading(false);
        setRestLeave("");
        setDayCounts("");
        setStatusSubmitted(true);
      } else {
        toast.warn('Please fill in all fields.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error submitting leave application', error);
      toast.error('Error submitting leave application. Please try again.');
      setLoading(false);
    }
  };
  useEffect(() => {
    if (startDate && endDate) {
      const daysCount = calculateDaysCount(startDate, endDate);
      setDayCounts(daysCount);
    }
  }, [startDate, endDate]);

  return (
    <div className='flex flex-col w-full flex-wrap sm:w-full lg:w-full xl:w-1/2 px-4 bg-orange-100  rounded'>
      <div className='flex justify-center text-center'>
        <h1 className='text-xl xl:text-2xl lg:text-2xl tracking-wide mb-4 text-start uppercase font-medium text-orange-700'>Leave Application</h1>
      </div>
      <div className='flex flex-nowrap flex-auto justify-between'>
        <div>
          <label className="text-base mr-1">From:</label>
          <input type="date" className="input-style p-1 rounded-lg" value={startDate} onChange={(e) => setStartDate(e.target.value)} min={currentDate} />
        </div>
        <div>
          <label className="text-base mx-1">To:</label>
          <input type="date" className="input-style p-1 rounded-lg" value={endDate} onChange={(e) => setEndDate(e.target.value)} min={currentDate} />
        </div>
      </div>
      <div className='block w-auto '>
        <div className='flex justify-center uppercase text-start mt-5'>
          <h1 className='text-base xl:text-base lg:text-base  tracking-wide  text-start font-medium text-orange-700'>Leave Balance</h1>
        </div>

        <div className='flex justify-between w-full'>
          <div className='flex justify-between'>
            <div className='flex flex-col  p-2 text-start w-full lg:w-1/2 '>
              <label className="text-base  my-1">Leave Type:</label>
              <select className="input-style p-1 rounded-lg w-full ps-2" name='leavetype' value={leaveType} onChange={handleInputChanges}>
                <option value="">Select Leave Type</option>
                {APIData
                  .filter(data => data._id === sessionStorage.getItem("employeeId"))
                  .map(data => data.leavebalance.map(emp => (
                    <option key={emp._id} value={emp.restLeave}>{emp.restLeave}</option>
                  )))}
              </select>
            </div>

            <div className='flex flex-col whitespace-nowrap p-2 text-start w-full lg:w-1/2'>
              <label className="text-base  my-1">Leave Balance:</label>
              <input type="number" className="input-style w-1/2 p-1 rounded-lg ps-2" value={restLeave} readOnly />
            </div>
          </div>

          <div className='flex flex-col justify-end p-2 text-start w-full lg:w-1/4 '>
            <label className="text-base  my-1">No. of Leave:</label>
            <input className="input-style w-1/2 p-1 rounded-lg ps-2" type="number" value={dayCounts} readOnly />
          </div>

        </div>

      </div>
      <div className='mt-4'>
        <label htmlFor="message" className="block mb-1 text-base text-start font-medium text-orange-700 ">Reason for Leave:</label>
        <textarea id="message" rows="4" className="block p-2.5 w-full text-base text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..." value={reason} onChange={(e) => setReason(e.target.value)}></textarea>
      </div>
      <button className="text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-10 duration-300 cursor-pointer mt-4 bg-orange-700 hover:bg-orange-600  focus:ring-1 focus:outline-none focus:ring-orange-300 font-medium rounded text-base px-3 py-2 text-center" onClick={handleSubmit}>{loading ? "Submitting..." : statusSubmitted ? "Leave submitted" : "Submit"}</button>
    </div>
  )
}

export default LeaveApplication;
