/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import VITE_DATA from "../../../config/config.jsx";

function ClaimUpdate({ data, update, onClose }) {
    const [comp, setComp] = useState([]);
    const [branch, setBranch] = useState([]);
    const [formData, setFormData] = useState({
        date: data?.date || '',
        companyName: data?.companyName || '',
        claimType: data?.claimType || '',
        policyNo: data?.policyNo || '',
        insuredName: data?.insuredName || '',
        contactNo: data?.contactNo || '',
        vehicleRegNo: data?.vehicleRegNo || '',
        vehicleType: data?.vehicleType || '',
        policyExpiryDate: data?.policyExpiryDate || '',
        intimationDate: data?.intimationDate || '',
        claimNo: data?.claimNo || '',
        advisor: data?.advisor || '',
        branch: data?.branch || '',
        claimStatus: data?.claimStatus || '',
        claimAmount: data?.claimAmount || '',
        surveyorName: data?.surveyorName || '',
        surveyorContactNo: data?.surveyorContactNo || '',
        remarks: data?.remarks || '',
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
        if (['date', 'policyExpiryDate', 'intimationDate'].includes(name)) {
            setFormData({
                ...formData,
                [name]: value ? formatDate(value) : '',
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const updateClaimAPI = async () => {
        try {
            const resp = await axios.put(`${VITE_DATA}/claims/update/${data._id}`, formData);
            toast.success(`${resp.data.message}`);
            onClose(); // Close the modal after successful submission
            update();
        } catch (error) {
            console.error("Error updating claim details:", error);
        }
    };

    return (
        <section className="fixed rounded top-0 right-0 left-0 bottom-0 inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
            <div className="relative bg-blue-800 p-1 xl:w-10/12 lg:w-10/12 md:w-10/12 sm:w-10/12 w-11/12 max-w-9xl max-h-7xl mx-auto xl:my-40 lg:my-40 md:my-30 sm:my-10 my-10 rounded">
                <div className="flex items-center justify-between p-1 rounded-lg ">
                    <h3 className="text-xl font-semibold text-gray-100">
                        Update Claim Details
                    </h3>
                    <button
                        onClick={onClose}
                        type="button"
                        className="  hover:bg-red-400 bg-red-100  text-slate-100  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  ">
                        <img src="/close.png" height={5} width={25} alt="close" className="hover:bg-red-400 rounded-full" />
                    </button>
                </div>

                <section className="rounded max-h-auto text-justify overflow-y-auto bg-blue-700">
                    <div className="container-fluid font-semibold flex justify-center p-1 border-gray-200 border-dashed rounded-lg  bg-blue-700">
                        <div className="relative w-full lg:w-full p-1 rounded shadow-xl text-2xl items-center bg-slate-200">

                            <div>
                                <div className="flex flex-wrap mb-1 justify-between">

                                    {/* FIELD - 1 */}
                                    <div className="flex flex-col p-1 text-start w-1/2 lg:w-1/6 ">
                                        <label htmlFor='date' className="text-base mx-1">Date:</label>
                                        <input id='date'
                                            className="input-style p-1 rounded"
                                            type="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            name="date"
                                            placeholder="dd-mm-yyyy"
                                        />
                                    </div>
                                    {/* FIELD - 2 */}
                                    <div className="flex flex-col  p-1 text-start  lg:w-1/6 w-1/2">
                                        <label htmlFor='comp' className="text-base  mx-1 ">Company:</label>
                                        <select id='comp' className="input-style p-1  rounded" type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Company Name" required>
                                            <option className="w-1" value="" >------ Select Company --------</option>
                                            {comp.map((comp) => (
                                                <option key={comp._id} value={comp.c_type} data-id={comp._id}>
                                                    {comp.c_type}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {/* FIELD - 3 */}
                                    <div className="flex flex-col  p-1 text-start  lg:w-1/6 w-1/2">
                                        <label htmlFor='claimType' className="text-base  mx-1 ">Claim Type:</label>
                                        <select id='claimType' className="input-style p-1  rounded" type="text" name="claimType" value={formData.claimType} onChange={handleChange} placeholder="Claim Type" required>
                                            <option className="w-1" value="" >----- Select Claim Type --------</option>
                                            <option value="THEFT">THEFT</option>
                                            <option value="MOTOR">MOTOR</option>
                                            <option value="PA">PA</option>
                                            <option value="TP">TP</option>
                                            <option value="OWN DAMMAGE">OWN DAMMAGE</option>
                                            <option value="HEALTH">HEALTH</option>
                                        </select>
                                    </div>
                                    {/* FIELD - 4 */}
                                    <div className="flex flex-col  p-1 text-start  lg:w-1/6 w-1/2">
                                        <label htmlFor='policyNo' className="text-base  mx-1 ">Policy No:</label>
                                        <input id='policyNo' className="input-style p-1  rounded" type="text" name="policyNo" value={formData.policyNo} onChange={handleChange} placeholder="Policy No" required />
                                    </div>
                                    {/* FIELD - 5 */}
                                    <div className="flex flex-col  p-1 text-start  lg:w-1/6 w-1/2">
                                        <label htmlFor='insuredName' className="text-base  mx-1 ">Insured Name:</label>
                                        <input id='insuredName' className="input-style p-1  rounded" type="text" name="insuredName" value={formData.insuredName} onChange={handleChange} placeholder="Insured Name" required />
                                    </div>
                                    {/* FIELD - 6 */}
                                    <div className="flex flex-col  p-1 text-start  lg:w-1/6 w-1/2">
                                        <label htmlFor='contactNo' className="text-base  mx-1 ">Contact No:</label>
                                        <input id='contactNo' className="input-style p-1  rounded" type="number" name="contactNo" value={formData.contactNo} onChange={handleChange} placeholder="Contact No" />
                                    </div>
                                    {/* FIELD - 7 */}
                                    <div className="flex flex-col lg:mt-4 xl:mt-4 p-1 text-start  lg:w-1/6 w-1/2">
                                        <label htmlFor='vehicleRegNo' className="text-base  mx-1 ">Vehicle Reg No:</label>
                                        <input id='vehicleRegNo' className="input-style p-1  rounded" type="text" name="vehicleRegNo" value={formData.vehicleRegNo} onChange={handleChange} placeholder="Vehicle Reg No" required />
                                    </div>
                                    {/* FIELD - 8 */}
                                    <div className="flex flex-col lg:mt-4 xl:mt-4 p-1 text-start  lg:w-1/6 w-1/2">
                                        <label htmlFor='vehicleType' className="text-base  mx-1 ">Vehicle Type:</label>
                                        <select id='vehicleType' className="input-style p-1  rounded" type="text" name="vehicleType" value={formData.vehicleType} onChange={handleChange} placeholder="Vehicle Type" required>
                                            <option className="w-1" value="" >---- Select Vehicle Type -------</option>
                                            <option value="TW">TW</option>
                                            <option value="PCV">PCV</option>
                                            <option value="GCV">GCV</option>
                                            <option value="PVT-CAR">PVT-CAR</option>
                                        </select>
                                    </div>
                                    {/* FIELD - 9 */}
                                    <div className="flex flex-col lg:mt-4 xl:mt-4 p-1 text-start  lg:w-1/6 w-1/2">
                                        <label htmlFor='policyExpiryDate' className="text-base  mx-1 ">Policy Expiry Date:</label>
                                        <input id='policyExpiryDate' className="input-style p-1  rounded" type="text" name="policyExpiryDate" value={formData.policyExpiryDate} onChange={handleChange} placeholder="dd-mm-yyyy" />
                                    </div>
                                    {/* FIELD - 10 */}
                                    <div className="flex flex-col lg:mt-4 xl:mt-4  p-1 text-start  lg:w-1/6 w-1/2">
                                        <label htmlFor='intimationDate' className="text-base  mx-1 ">Intimation Date:</label>
                                        <input id='intimationDate' className="input-style p-1  rounded" type="text" name="intimationDate" value={formData.intimationDate} onChange={handleChange} placeholder="dd-mm-yyyy" />
                                    </div>
                                    {/* FIELD - 11 */}
                                    <div className="flex flex-col lg:mt-4 xl:mt-4  p-1 text-start  lg:w-1/6 w-1/2">
                                        <label htmlFor='claimNo' className="text-base  mx-1 ">Claim No:</label>
                                        <input id='claimNo' className="input-style p-1  rounded" type="text" name="claimNo" value={formData.claimNo} onChange={handleChange} placeholder="Claim No" />
                                    </div>
                                    {/* FIELD - 12 */}
                                    <div className="flex flex-col lg:mt-4 xl:mt-4 p-1 text-start  lg:w-1/6 w-1/2">
                                        <label htmlFor='advisor' className="text-base  mx-1 ">Advisor Name:</label>
                                        <input id='advisor' className="input-style p-1  rounded" type="text" name="advisor" value={formData.advisor} onChange={handleChange} placeholder="Advisor" />
                                    </div>
                                    {/* FIELD - 13 */}
                                    <div className="flex flex-col lg:mt-4 xl:mt-4 p-1 text-start  lg:w-1/6 w-1/2">
                                        <label htmlFor='branch' className="text-base  mx-1 ">Branch:</label>
                                        <select id='branch' className="input-style p-1  rounded" type="text" name="branch" value={formData.branch} onChange={handleChange} placeholder="Branch" required>
                                            <option className="w-1" value="" >------- Select Branch ----------</option>
                                            {
                                                branch.map((item) => (
                                                    <option value={item.branchname} key={item._id}>{item.branchname}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    {/* FIELD - 14 */}
                                    <div className="flex flex-col lg:mt-4 xl:mt-4 p-1 text-start  lg:w-1/6 w-1/2">
                                        <label htmlFor='claimStatus' className="text-base  mx-1 ">Claim Status:</label>
                                        <select id='claimStatus' className="input-style p-1  rounded" type="text" name="claimStatus" value={formData.claimStatus} onChange={handleChange} placeholder="Claim Status" required>
                                            <option value="">---- Select Claim Status --------</option>
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
                                    {/* FIELD - 15 */}
                                    <div className="flex flex-col lg:mt-4 xl:mt-4 p-1 text-start  lg:w-1/6 w-1/2">
                                        <label htmlFor='claimAmount' className="text-base  mx-1 ">Claim Amount:</label>
                                        <input id='claimAmount' className="input-style p-1  rounded" type="number" name="claimAmount" value={formData.claimAmount} onChange={handleChange} placeholder="Claim Amount" />
                                    </div>
                                    {/* FIELD - 16 */}
                                    <div className="flex flex-col lg:mt-4 xl:mt-4 p-1 text-start  lg:w-1/6 w-1/2">
                                        <label htmlFor='surveyorName' className="text-base  mx-1 ">Surveyor Name:</label>
                                        <input id='surveyorName' className="input-style p-1  rounded" type="text" name="surveyorName" value={formData.surveyorName} onChange={handleChange} placeholder="Surveyor Name" />
                                    </div>
                                    {/* FIELD - 17 */}
                                    <div className="flex flex-col lg:mt-4 xl:mt-4 p-1 text-start  lg:w-1/6 w-1/2">
                                        <label htmlFor='surveyorContactNo' className="text-base  mx-1 ">Surveyor Contact No:</label>
                                        <input id='surveyorContactNo' className="input-style p-1  rounded" type="number" name="surveyorContactNo" value={formData.surveyorContactNo} onChange={handleChange} placeholder="Surveyor Contact No" />
                                    </div>
                                    {/* FIELD - 18 */}
                                    <div className="flex flex-col lg:mt-4 xl:mt-4  p-1 text-start  lg:w-1/6 w-1/2">
                                        <label htmlFor='remarks' className="text-base  mx-1 ">Remarks:</label>
                                        <textarea id='remarks' rows={1} className="input-style p-1 text-base rounded" name="remarks" value={formData.remarks} onChange={handleChange} placeholder="Remarks" ></textarea>
                                    </div>

                                    {/* FIELD - 20 */}

                                    <div className="mx-auto  mt-4 p-2 text-center justify-center w-auto">
                                        <button onClick={updateClaimAPI} className="flex w-20 text-white bg-gradient-to-r hover:text-black from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-0 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded text-base px-4 py-1 text-center " type="submit">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </section>
    )
}

export default ClaimUpdate;