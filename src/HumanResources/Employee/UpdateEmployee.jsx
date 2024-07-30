/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import VITE_DATA from "../../config/config.jsx";

function UpdateEmployee({ employee, onUpdate, onClose }) {
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState([]);
    const [data, setData] = useState({
        empid: "",
        empname: "",
        empemail: "",
        empmobile: "",
        empgender: "",
        empdob: "",
        empjoiningdate: "",
        empbranch: "",
        permanentempaddress: "",
        currentempaddress: "",
        empaadharno: "",
        empdesignation: "",
        empaadharfile: "",
        staffType: "",
        pan: "",
        accNumber: "",
        ifsc: "",
        bankName: ""
    });

    useEffect(() => {
        // Fetch the list of branches when the component mounts
        axios.get(`${VITE_DATA}/staff/lists`).then((resp) => {
            setType(resp.data);

        });
    }, []);
    // show all data inside input tag
    useEffect(() => {
        setData(employee);
    }, [employee]);

    // handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value.toUpperCase(),
        }));
    };

    const updateEmpAPI = async () => {
        try {
            setLoading(true);

            // Make an API call to update contact
            const response = await axios.put(
                `${VITE_DATA}/api/emp/update/${employee._id}`, // Update the URL with the correct endpoint
                data
            );
            toast.success(`${response.data.status}`)
            // Close the modal after successful update
            onClose();
            onUpdate();
        } catch (error) {
            toast.error(`${error}`)
            console.error("Error updating Employee:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div
                id="static-modal"
                data-modal-backdrop="static"
                tabIndex="-1"
                aria-hidden="true"
                className="fixed top-0 right-0 left-0 bottom-0 inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
            >
                <div className="relative p-4 w-full max-w-6xl max-h-5xl mx-auto my-20">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-gradient-to-r from-orange-700 to-orange-700 p-2 rounded-lg shadow ">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center justify-between p-2 md:p-3 rounded-lg dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-100 ">
                                Update Employee
                            </h3>
                            <button
                                onClick={onClose}
                                type="button"
                                className=" bg-transparent hover:bg-red-100 text-slate-100  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  "
                            >
                                <img
                                    src="/close.png"
                                    height={5}
                                    width={25}
                                    alt="close"
                                    className="hover:bg-red-100 rounded-full"
                                />
                            </button>
                        </div>
                        <section className="p-4 md:p-3 scroll-smooth hs-scroll-inside-viewport-modal rounded-lg max-h-auto text-justify overflow-y-auto bg-gradient-to-r from-slate-100 to-white">
                            <form className="flex flex-wrap justify-between font-semibold">
                                <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
                                    <label className="text-base mx-1 ">Employee ID:</label>
                                    <input
                                        className="input-style p-1 rounded-lg"
                                        type="text"
                                        value={data.empid}
                                        onChange={handleInputChange}
                                        name="empid"
                                        placeholder="EMP ID"
                                    />
                                </div>

                                <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
                                    <label className="text-base mx-1 ">Employee Name:</label>
                                    <input
                                        className="input-style p-1 rounded-lg"
                                        type="text"
                                        value={data.empname}
                                        onChange={handleInputChange}
                                        name="empname"
                                        placeholder="Enter Name"
                                    />
                                </div>

                                <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
                                    <label className="text-base mx-1">DOB:</label>
                                    <input
                                        className="input-style p-1 rounded-lg"
                                        type="date"
                                        value={data.empdob}
                                        onChange={handleInputChange}
                                        name="empdob"
                                        placeholder="Enter Branch Code"
                                    />
                                </div>
                                <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
                                    <label className="text-base mx-1">Gender:</label>
                                    <select
                                        className="input-style p-1 rounded-lg"
                                        type="text"
                                        value={data.empgender}
                                        onChange={handleInputChange}
                                        name="empgender"
                                        placeholder="Enter Your District Name"
                                    >
                                        <option value="">----- Select Gender ------</option>
                                        <option value="MALE">Male</option>
                                        <option value="FEMALE">Female</option>
                                        <option value="OTHERS">Others</option>
                                    </select>
                                </div>

                                <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
                                    <label className="text-base mx-1">Email ID:</label>
                                    <input
                                        className="input-style p-1 rounded-lg"
                                        type="email"
                                        name="empemail"
                                        value={data.empemail.toLowerCase()}
                                        onChange={handleInputChange}
                                        placeholder="abc@gmail.com"
                                    />
                                </div>

                                <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
                                    <label className="text-base mx-1">  Branch:</label>
                                    <select
                                        className="input-style p-1 rounded-lg"
                                        type="text"
                                        value={data.empbranch}
                                        onChange={handleInputChange}
                                        name="empbranch"
                                        placeholder="Enter Branch Name">
                                        <option value="0">----- Select Branch -----</option>
                                        <option value={data.empbranch}>
                                            {data.empbranch}
                                        </option>
                                    </select>
                                </div>
                                <div className="flex flex-col p-2 mt-2 text-start w-full lg:w-1/5">
                                    <label className="text-base mx-1">Mobile No:</label>
                                    <input
                                        className="input-style p-1 rounded-lg"
                                        type="number"
                                        min="1"
                                        value={data.empmobile}
                                        onChange={handleInputChange}
                                        name="empmobile"
                                        placeholder="+91"
                                    />
                                </div>
                                <div className="flex flex-col p-2 mt-2 text-start w-full lg:w-1/5">
                                    <label className="text-base mx-1">Account No.:</label>
                                    <input
                                        className="input-style p-1 rounded-lg"
                                        type="number"
                                        name="accNumber"
                                        value={data.accNumber}
                                        onChange={handleInputChange}
                                        placeholder="Enter Account Number"
                                    />
                                </div>
                                <div className="flex flex-col p-2 mt-2 text-start w-full lg:w-1/5">
                                    <label className="text-base mx-1">IFSC Code:</label>
                                    <input
                                        className="input-style p-1 rounded-lg"
                                        type="text"
                                        name="ifsc"
                                        value={data.ifsc}
                                        onChange={handleInputChange}
                                        placeholder="Enter IFSC Code"
                                    />
                                </div>

                                <div className="flex flex-col p-2 mt-2 text-start w-full lg:w-1/5">
                                    <label className="text-base mx-1">Bank Name:</label>
                                    <input
                                        className="input-style p-1 rounded-lg"
                                        type="text"
                                        name="bankName"
                                        value={data.bankName}
                                        onChange={handleInputChange}
                                        placeholder="Enter Bank Name"
                                    />
                                </div>
                                <div className="flex flex-col p-2 mt-2 text-start w-full lg:w-1/5">
                                    <label className="text-base mx-1">Pan No.:</label>
                                    <input
                                        className="input-style p-1 rounded-lg"
                                        type="text"
                                        name="pan"
                                        value={data.pan}
                                        onChange={handleInputChange}
                                        placeholder="AKRPD1222Q"
                                        min="10"
                                    />
                                </div>

                                {/* <div className="flex flex-col p-2 text-start w-full lg:w-1/3">
                                        <label className="text-base mx-1">Upload Pan Card:</label>
                                        <input
                                            className="input-style border w-full h-10 items-center rounded-lg"
                                            type="file"
                                            name="panno"
                                            accept="/*" //accepting all type of images
                                            onChange={handleInputChange}
                                            autoComplete="off"
                                        />
                                    </div> */}

                                <div className="flex flex-col p-2 mt-2 text-start w-full lg:w-1/5">
                                    <label className="text-base mx-1">Joining Date:</label>
                                    <input
                                        className="input-style p-1 rounded-lg"
                                        type="date"
                                        value={data.empjoiningdate}
                                        onChange={handleInputChange}
                                        name="empjoiningdate"
                                        placeholder=""
                                    />
                                </div>
                                <div className="flex flex-col p-2 mt-2 text-start w-full lg:w-1/5">
                                    <label className="text-base mx-1">Aadhar No.:</label>
                                    <input
                                        className="input-style p-1 rounded-lg"
                                        type="text"
                                        value={data.empaadharno}
                                        onChange={handleInputChange}
                                        name="aadharno"
                                        placeholder=""
                                    />
                                </div>
                                {/* <div className="flex flex-col p-2 text-start w-full lg:w-1/3">
                                        <label className="text-base mx-1">Upload Aadhar Card:</label>
                                        <input
                                            className="input-style border w-full h-10 items-center rounded-lg"
                                            type="file"
                                            accept="/*" //accepting all type of images
                                            onChange={handleInputChange}
                                            name="empaadharfile"
                                        />
                                    </div> */}

                                <div className="flex flex-col p-2 mt-2 text-start w-full lg:w-1/5">
                                    <label className="text-base mx-1">Designation:</label>
                                    <select
                                        className="input-style p-1 rounded-lg"
                                        type="text"
                                        value={data.s_type}
                                        name="staffType"
                                        onChange={handleInputChange}>
                                        <option value="">-- Select Designation -------</option>
                                        {
                                            type.map((data) => (
                                                <option key={data._id} value={data.s_type}>{data.s_type}</option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="flex flex-col p-2 mt-2 text-start w-full lg:w-1/5">
                                    <label className="text-base mx-1">Current Address:</label>
                                    <textarea
                                        className="input-style p-1 w-full rounded-lg"
                                        type="text"
                                        rows={2}
                                        name="currentempaddress"
                                        value={data.currentempaddress}
                                        onChange={handleInputChange}
                                        placeholder="Enter Your Address"
                                    />
                                </div>
                                <div className="flex flex-col p-2 mt-0 text-start w-full lg:w-1/5">
                                    <label className="text-base mx-1">Permanent Address:</label>
                                    <textarea
                                        className="input-style p-1 w-full rounded-lg"
                                        type="text"
                                        rows={2}
                                        value={data.permanentempaddress}
                                        onChange={handleInputChange}
                                        name="permanentempaddress"
                                        placeholder="Enter Your Address"
                                    />
                                </div>


                                <div className="flex flex-col p-2 text-start w-full lg:w-1/4">

                                </div>

                                <div className="w-full p-1 mt-2 justify-center flex">
                                    <button
                                        className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded text-sm px-3 py-2 text-center"
                                        onClick={updateEmpAPI}
                                        type="button"
                                    >
                                        {loading ? "Submitting..." : "Submit"}
                                    </button>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateEmployee;