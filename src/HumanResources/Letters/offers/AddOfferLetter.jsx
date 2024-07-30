import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ToWords } from 'to-words';
import VITE_DATA from "../../../config/config.jsx";

function AddOfferLetter() {
    const [ofdate, setOfdate] = useState('');
    const [branchList, setBranchList] = useState([]);
    const [empType, setEmpType] = useState([]);
    const [ofname, setOfName] = useState('');
    const [ofmobile, setOfmobile] = useState('');
    const [ofaddress, setOfAddress] = useState('');
    const [ofsalaryWords, setOfsalaryWords] = useState("");
    const [ofemail, setOfemail] = useState('');
    const [ofdesignation, setOfdesignation] = useState('');
    const [ofgrosalary, setOfgrosalary] = useState('');
    const [ofvalidDate, setOfvalidDate] = useState('');
    const [oflocation, setOfLocation] = useState('');
    const [errors, setErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);

 const toWords = new ToWords();
    function getFormattedDate() {
        const date = new Date();
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
    const date = getFormattedDate();
    useEffect( () => {setOfdate(date)}, [date] );
    // useEffect(()=>{setOfvalidDate(ofdate)}, [ofdate]);

    useEffect(() => {
        const [day, month, year] = ofdate.split('/').map(Number);
        const dates = new Date(year, month - 1, day); // month is 0-indexed in Date constructor
        dates.setDate(dates.getDate() + 15);
        const newDay = dates.getDate().toString().padStart(2, '0');
        const newMonth = (dates.getMonth() + 1).toString().padStart(2, '0');
        const newYear = dates.getFullYear();
        // console.log(`${newDay}/${newMonth}/${newYear}`);
        setOfvalidDate(`${newDay}/${newMonth}/${newYear}`);
    }, [ofdate]);
    


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
                    setBranchList(response.data);

                })
                .catch((error) => {

                    console.error(error);
                });
        }
    }, []);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Not Authorized yet.. Try again! ");
        } else {
            // The user is authenticated, so you can make your API request here.
            axios
                .get(`${VITE_DATA}/staff/lists`, {
                    headers: {
                        Authorization: `${token}`, // Send the token in the Authorization header
                    },
                })
                .then((response) => {
                    setEmpType(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);
// console.log(empType);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formSubmitted) {
            return;
        }
        setErrors({});
        const errors = {};
        if (!ofdate) {
            errors.ofdate = "required*";
        }
        if (!ofname) {
            errors.ofname = "required*";
        }
        if (!ofmobile) {
            errors.ofmobile = "required*";
        }
        if (!ofemail) {
            errors.ofemail = "required*";
        }
        if (!ofgrosalary) {
            errors.ofgrosalary = "required*";
        }
        if (!ofvalidDate) {
            errors.ofvalidDate = "required*";
        }

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        try {
            const response = await axios.post(`${VITE_DATA}/letters/add/offer`, {
                ofdate,
                ofname,
                ofmobile,
                ofaddress,
                oflocation,
                ofemail,
                ofdesignation,
                ofgrosalary,
                ofsalaryWords,
                ofvalidDate
            });

            if (response.data) {
                toast.success(`${response.data.status}`);
                setFormSubmitted(true);
                
                setOfName("");
                setOfmobile("");
                setOfAddress("");
                setOfemail("");
                setOfdesignation("");
                setOfgrosalary("");
                setOfLocation("");
                setOfsalaryWords("");
               
            } else {
                toast.error("Error Occurred. Try again...! ");
            }
        } catch (error) {
            console.error("Error during Add User", error.response);
        } finally {
            setFormSubmitted(false);
        }
    };

    return (
        <section className="container-fluid relative h-screen p-0 sm:ml-64 bg-white">
            <div className="container-fluid  flex-col flex justify-center p-2 border-gray-200 border-dashed rounded-lg  bg-white">
            <h1 className="font-semibold text-3xl my-1 text-orange-700">Create Offer Letter</h1>
                <div className="relative w-full lg:w-full pt-20  rounded-xl shadow-xl text-2xl items-center bg-slate-200">
                    
                    <div className="flex flex-wrap justify-between">
                        <div className="flex flex-col  p-2 text-start w-full lg:w-1/5">
                            <label className="text-base mx-1">Date:<sup className="text-red-600 font-bold">*</sup></label>
                            <input
                                className="input-style p-1 rounded-lg"
                                type="text"
                                name="ofdate"
                                value={ofdate}
                                onChange={(e) => setOfdate(e.target.value)}
                                placeholder="Date"   
                            />
                            {errors.ofdate && <span className="text-red-600 text-sm ">{errors.ofdate}</span>}
                        </div>
                        <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
                            <label className="text-base mx-1">Name:<sup className="text-red-600 font-bold">*</sup></label>
                            <input
                                className="input-style p-1 rounded-lg"
                                type="text"
                                name="ofname"
                                value={ofname}
                                onChange={(e) => setOfName(e.target.value.toUpperCase())}
                                placeholder="Enter Name"
                            />
                            {errors.ofname && <span className="text-red-600 text-sm">{errors.ofname}</span>}
                        </div>
                        
                        <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
                            <label className="text-base mx-1">Email ID:<sup className="text-red-600 font-bold">*</sup></label>
                            <input
                                className="input-style p-1 rounded-lg"
                                type="email"
                                value={ofemail}
                                name="ofemail"
                                onChange={(e) => setOfemail(e.target.value)}
                                placeholder="Enter Email Address"
                            />
                             {errors.ofemail && <span className="text-red-600 text-sm">{errors.ofemail}</span>}
                        </div>

                        <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
                            <label className="text-base mx-1">Contact No:<sup className="text-red-600 font-bold">*</sup></label>
                            <input
                                className="input-style p-1 rounded-lg"
                                type="text"
                                value={ofmobile}
                                name="ofmobile"
                                onChange={(e) => setOfmobile(e.target.value)}
                                placeholder="Enter Moblie No"
                            />
                        </div>
                       
                        <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
                            <label className="text-base mx-1">Employee Type(Designation):<sup className="text-red-600 font-bold">*</sup></label>
                            <select
                                className="input-style p-1 text-base rounded-lg"
                                type="text"
                                value={ofdesignation}
                                name="ofdesignation"
                                onChange={(e) => setOfdesignation(e.target.value)}
                                placeholder="Enter Emp Type"
                            >
                                <option value="">-------- Select Designation ---------</option>
                                {
                                    empType.map((data)=> (
                                        <option value={data.s_type} key={data._id}>{data.s_type}</option>
                                    ))
                                }
                               
                            </select>
                        </div>
                        <div className="flex flex-col p-2 text-start w-full lg:w-1/5 mt-4">
                            <label className="text-base mx-1">Address:<sup className="text-red-600 font-bold">*</sup></label>
                            <textarea
                                className="input-style p-1 rounded-lg"
                                type="text"
                                cols={20}
                                value={ofaddress}
                                name="ofaddress"
                                onChange={(e) => setOfAddress(e.target.value.toUpperCase())}
                                placeholder="Enter Address"
                            />
                        </div>
                        <div className="flex flex-col p-2 text-start w-full lg:w-1/5 mt-4">
                            <label className="text-base mx-1">Gross Salary:<sup className="text-red-600 font-bold">*</sup></label>
                            <input
                                className="input-style p-1 rounded-lg"
                                type="text"
                                value={ofgrosalary}
                                name="ofgrosalary"
                                onChange={(e) => {
                                    const grossSalary = e.target.value;
                                    setOfgrosalary(grossSalary);
                                    const grossSalaryInWords = toWords.convert(grossSalary);
                                    setOfsalaryWords(grossSalaryInWords);
                                }}
                                placeholder="Enter Gross Salary"
                            />
                        </div>

                        <div className="flex flex-col p-2 text-start w-full lg:w-1/5 mt-4">
                            <label className="text-base mx-1">Salary in Words:<sup className="text-red-600 font-bold">*</sup></label>
                            <input
                                className="input-style p-1 rounded-lg"
                                type="text"
                                value={ofsalaryWords}
                                name="ofsalaryWords"
                                // onChange={(e) => setOfsalaryWords(e.target.value.toUpperCase())}
                                placeholder="Salary in Words"
                            />
                        </div>
                        <div className="flex flex-col p-2 text-start w-full lg:w-1/5 mt-4">
                            <label className="text-base mx-1">Valid upto:<sup className="text-red-600 font-bold">*</sup></label>
                            <input
                                className="input-style p-1 rounded-lg"
                                type="text"
                                value={ofvalidDate}
                                name="ofvalidDate"
                                onChange={(e) => setOfvalidDate(e.target.value)} 
                                readOnly   
                            />
                        </div>
                        <div className="flex flex-col p-2 text-start w-full lg:w-1/5 mt-4">
                        
                        <label className="text-base mx-1">Branch Location:<sup className="text-red-600 font-bold">*</sup></label>
                            <select
                                className="input-style p-1 rounded-lg"
                                type="text"
                                value={oflocation}
                                name="oflocation"
                                onChange={(e) => setOfLocation(e.target.value)}    
                            >
                                <option value="">------------ Select Location ----------</option>
                                {
                                    branchList.map((data)=>(
                                        <option key={data._id} value= {data.branchname}>{data.branchname}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-center p-2 text-center w-full my-2 mt-5 gap-5">
                        <button
                            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded text-sm px-4 py-2 text-center"
                            onClick={handleSubmit}
                            type="button"
                            disabled={formSubmitted}
                        >
                            {formSubmitted ? "Submitted" : "Submit"}
                        </button>
                    </div>

                </div>
            </div>
        </section>
    )
}
export default AddOfferLetter;
