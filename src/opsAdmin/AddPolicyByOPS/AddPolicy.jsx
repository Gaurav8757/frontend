import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import VITE_DATA from "../../config/config.jsx";

function AddPolicy() {
    const [APIData, setAPIData] = useState([]);
    const [entryDate, setEntryDate] = useState('');
    const [branch, setBranch] = useState('');
    const [insuredName, setInsuredName] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [errors, setErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [currentTime, setCurrentTime] = useState(getFormattedTime());
    const [staffName, setStaffName] = useState("");
    const [employee_id, setEmployeeId] = useState("");
    const [branchname, setBranchName] = useState([]);

// current time update
    function getFormattedTime() {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(getFormattedTime());
        }, 1000); // Update every second
        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array ensures effect runs only once on mount
  

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Not Authorized yet.. Try again! ");
        } else {
            axios
                .get(`${VITE_DATA}/employees/data`, {
                    headers: {
                        Authorization: `${token}`,
                    },
                })
                .then((response) => {
                    setAPIData(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [formSubmitted]);
    

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
                    setBranchName(response.data);

                })
                .catch((error) => {

                    console.error(error);
                });
        }
    }, []);

    // const handleDateChange = (event) => {
    //     const inputDate = event.target.value; // Get the input date in YYYY-MM-DD format
    //     const [year, month, day] = inputDate.split('-'); // Split the date into year, month, and day
    //     const formattedDate = `${day}-${month}-${year}`; // Reformat the date to DD-MM-YYYY
    //     setEntryDate(formattedDate); // Save the formatted date in the state
    //     // console.log(formattedDate);
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formSubmitted) {
            return;
        }

        setErrors({});

        const errors = {};
        if (!entryDate) {
            errors.entryDate = "required*";
        }
        if (!insuredName) {
            errors.insuredName = "required*";
        }
        if (!branch) {
            errors.branch = "required*";
        }
        if (!contactNo) {
            errors.contactNo = "required*";
        }
        if (!staffName) {
            errors.staffName = "required*";
        }
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        try {
            const response = await axios.post(`${VITE_DATA}/alldetails/adddata`, {
                entryDate,
                insuredName,
                contactNo,
                branch,
                staffName,
                currentTime,
                employee_id
            });

            if (response.data) {
                toast.success("Policy Created Successfully !");
                setFormSubmitted(true);
                setEntryDate("");
                setInsuredName("");
                setContactNo("");
                setBranch("");
                setStaffName("");
                setCurrentTime("");
                // setEmployeeId("");
            }
            else {
                toast.error("Error Occurred. Try again...! ");
            }
        } catch (error) {
            console.error("Error during Add Policy", error.response);
        } finally {
            setFormSubmitted(false);
        }
    };

    return (
        <section className="container-fluid relative h-screen p-0 sm:ml-36 bg-white">
            <div className="container-fluid justify-center p-2 border-gray-200 border-dashed rounded-lg  bg-white">
            <h1 className="font-semibold text-2xl text-orange-700 my-1">Create Policy</h1>
                <div className="relative w-full lg:w-full p-0 lg:p-4 rounded-xl shadow-xl text-2xl items-center mt-3 bg-slate-200">
                   
                    <div className="flex flex-wrap justify-between">
                        <div className="flex flex-col  p-2 text-start w-full lg:w-1/5">
                            <label className="text-base mx-1">Entry Date<span className="text-red-600 font-bold">*</span></label>
                            <input
                                className="input-style p-1 rounded-lg"
                                type="date"
                                name="entryDate"
                                value={entryDate}
                                onChange={(e) =>setEntryDate(e.target.value)}
                                placeholder="Select Entry Date"
                            />
                            {errors.entryDate && <span className="text-red-600 text-sm ">{errors.entryDate}</span>}
                        </div>
                        <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
                            <label className="text-base mx-1">Branch:<span className="text-red-600 font-bold">*</span></label>
                            <select
                                id="branch"
                                name="branch"
                                className="input-style p-1 text-base rounded-lg"
                                value={branch}
                                onChange={(e) => setBranch(e.target.value)}>
                                <option className="w-1" value="" >------------ Select Branch -----------</option>
                                {
                                    branchname.map((item)=>(
                                        <option value={item.branchname} key={item._id}>{item.branchname}</option>
                                    ))
                                }
                            </select>
                            {errors.branch && <span className="text-red-600 text-sm ">{errors.branch}</span>}
                        </div>
                        <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
                            <label className="text-base mx-1">Insured Name<span className="text-red-600 font-bold">*</span></label>
                            <input
                                className="input-style p-1 rounded-lg"
                                type="text"
                                name="insuredName"
                                value={insuredName}
                                onChange={(e) => setInsuredName(e.target.value.toUpperCase())}
                                placeholder="Enter Insured Name"
                            />
                            {errors.insuredName && <span className="text-red-600 text-sm">{errors.insuredName}</span>}
                        </div>
                        <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
                            <label className="text-base mx-1">Contact No:</label>
                            <input
                                className="input-style p-1 rounded-lg"
                                type="text"
                                value={contactNo}
                                name="contactNo"
                                onChange={(e) => setContactNo(e.target.value)}
                                placeholder="Enter Contact No"
                            />
                        </div>
                        <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
                            <label className="text-base mx-1">Policy Made By:<span className="text-red-600 font-bold">*</span></label>
                            <select
                                className="input-style rounded-lg text-base p-1 cursor-pointer"
                                type="text"
                                name="staffName"
                                value={staffName}
                                // onChange={(e) => setStaffName(e.target.value)}
                                onChange={(e) => {
                                    setStaffName(e.target.value);
                                    const selectedEmployee = APIData.find(emp => emp.empname === e.target.value);
                                    // If the selected employee is found, set the staffId state to their _id
                                    if (selectedEmployee) {
                                        // set employee_id
                                        // console.log(selectedEmployee._id);
                                        setEmployeeId(selectedEmployee._id);
                                    }
                                }}>
                                <option className="w-1" value="">------ Select Policy Made By --------</option>
                                {
                                    APIData
                                        .filter(emp => emp.staffType === "OPS Executive" | emp.staffType === "OPS EXECUTIVE")
                                        .map((emp) => (
                                            <option key={emp._id} value={emp.empname}>
                                                {emp.empid} - {emp.empname}
                                            </option>
                                        ))
                                }
                            </select>
</div>
                    </div>

                    <div className="flex justify-center p-2 text-center w-full my-2 mt-10 gap-10">
                        <button
                            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded hover:text-black text-base px-3 py-1 text-center"
                            onClick={handleSubmit}
                            type="button"
                            disabled={formSubmitted}>
                            {formSubmitted ? "Submitted" : "Submit"}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default AddPolicy;
