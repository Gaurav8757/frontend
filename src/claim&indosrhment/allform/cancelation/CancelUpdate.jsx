/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import VITE_DATA from "../../../config/config.jsx";

function CancelUpdate({ data, update, onClose }) {
    const [comp, setComp] = useState([]);
    const [branch, setBranch] = useState([]);
    const [formData, setFormData] = useState({
        date: data?.date || '',
        policyNo: data?.policyNo || '',
        policyIssueDate: data?.policyIssueDate || '',
        insuredName: data?.insuredName || '',
        regNo: data?.regNo || '',
        company: data?.company || '',
        reason: data?.reason || '',
        advisor: data?.advisor || '',
        branch: data?.branch || '',
        policyAmount: data?.policyAmount || '',
        status: data?.status || '',
        refundAmount: data?.refundAmount || '',
        refundDate: data?.refundDate || '',
        utrNeftNo: data?.utrNeftNo || '',
        bankName: data?.bankName || '',
        paidThrough: data?.paidThrough || '',

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
        if (['date', 'policyIssueDate', 'refundDate'].includes(name)) {
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

    const updateCancelationAPI = async () => {
        try {
            const resp = await axios.put(`${VITE_DATA}/cancled/update/${data._id}`, formData);
            toast.success(`${resp.data.insuredName} Cancelation Update Completed...!`);
            onClose(); // Close the modal after successful submission
            update();
        } catch (error) {
            console.error("Error updating Cancelation details:", error);
        }
    };

    return (
        <section className="fixed rounded top-0 right-0 left-0 bottom-0 inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
            <div className="relative bg-blue-800 p-1 xl:w-10/12 lg:w-10/12 md:w-10/12 sm:w-10/12 w-11/12 max-w-9xl max-h-7xl mx-auto xl:my-40 lg:my-40 md:my-30 sm:my-10 my-10 rounded">
                <div className="flex items-center justify-between p-1 rounded-lg ">
                    <h3 className="text-xl font-semibold text-gray-100">
                        Update Cancellation Details
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
                                            type="text"
                                            value={formData.date}
                                            onChange={handleChange}
                                            name="date"
                                            placeholder="dd-mm-yyyy"
                                        />
                                    </div>
                                    {/* FIELD - 2 */}
                                    <div className="flex flex-col  p-1 text-start  lg:w-1/6 w-1/2">
                                        <label htmlFor='policyNo' className="text-base  mx-1 ">Policy No:</label>
                                        <input id='policyNo' className="input-style p-1  rounded" type="text" name="policyNo" value={formData.policyNo} onChange={handleChange} placeholder="Policy No" required />
                                    </div>
                                    <div className="flex flex-col  p-1 text-start  lg:w-1/6 w-1/2">
                                        <label htmlFor='policyIssueDate' className="text-base  mx-1 ">Policy Issue Date:</label>
                                        <input id='policyIssueDate' className="input-style p-1  rounded" type="text" name="policyIssueDate" value={formData.policyIssueDate} onChange={handleChange} placeholder="dd-mm-yyyy" />
                                    </div>

                                    {/* FIELD - 3 */}
                                    <div className="flex flex-col  p-1 text-start  lg:w-1/6 w-1/2">
                                        <label htmlFor='comp' className="text-base  mx-1 ">Company:</label>
                                        <select id='comp' className="input-style p-1  rounded" type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company Name" required>
                                            <option className="w-1" value="" >------ Select Company --------</option>
                                            {comp.map((comp) => (
                                                <option key={comp._id} value={comp.c_type} data-id={comp._id}>
                                                    {comp.c_type}
                                                </option>
                                            ))}
                                        </select>
                                    </div>


                                    {/* FIELD - 5 */}
                                    <div className="flex flex-col  p-1 text-start  lg:w-1/6 w-1/2">
                                        <label htmlFor='insuredName' className="text-base  mx-1 ">Insured Name:</label>
                                        <input id='insuredName' className="input-style p-1  rounded" type="text" name="insuredName" value={formData.insuredName} onChange={handleChange} placeholder="Insured Name" required />
                                    </div>
                                    {/* FIELD - 6 */}
                                    <div className="flex flex-col  p-1 text-start  lg:w-1/6 w-1/2">
                                        <label htmlFor='regNo' className="text-base  mx-1 ">Reg. No:</label>
                                        <input id='regNo' className="input-style p-1  rounded" type="text" name="regNo" value={formData.regNo} onChange={handleChange} placeholder="Reg. No" />
                                    </div>

                                    {/* FIELD - 11 */}
                                    <div className="flex flex-col  lg:mt-4 xl:mt-4  p-1 text-start  lg:w-1/6 w-1/2">
                                        <label htmlFor='reason' className="text-base  mx-1 ">Reason:</label>
                                        <input id='reason' className="input-style p-1  rounded" type="text" name="reason" value={formData.reason} onChange={handleChange} placeholder="Reason" />
                                    </div>
                                    {/* FIELD - 12 */}
                                    <div className="flex flex-col  lg:mt-4 xl:mt-4  p-1 text-start  lg:w-1/6 w-1/2">
                                        <label htmlFor='advisorName' className="text-base  mx-1 ">Advisor Name:</label>
                                        <input id='advisorName' className="input-style p-1  rounded" type="text" name="advisor" value={formData.advisor} onChange={handleChange} placeholder="Advisor Name" />
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
                                    <div className="flex flex-col g:mt-4 xl:mt-4 p-1 text-start  lg:w-1/6 w-1/2">
                                        <label htmlFor='policyAmount' className="text-base  mx-1 ">Policy Amount:</label>
                                        <input id='policyAmount' className="input-style p-1  rounded" type="number" name="policyAmount" value={formData.policyAmount} onChange={handleChange} placeholder="Policy Amount" />
                                    </div>

                                    {/* FIELD - 14 */}
                                    <div className="flex flex-col  lg:mt-4 xl:mt-4  p-1 text-start  lg:w-1/6 w-1/2">
                                        <label htmlFor='status' className="text-base  mx-1 ">Status:</label>
                                        <input id='status' className="input-style p-1  rounded" type="text" name="status" value={formData.status} onChange={handleChange} placeholder="Status" />
                                    </div>

                                    <div className="flex flex-col lg:mt-4 xl:mt-4 p-1 text-start  lg:w-1/6 w-1/2">
                                        <label htmlFor='refundAmount' className="text-base  mx-1 ">Refund Amount:</label>
                                        <input id='refundAmount' className="input-style p-1  rounded" type="number" name="refundAmount" value={formData.refundAmount} onChange={handleChange} placeholder="Refund Amount" />
                                    </div>

                                    <div className="flex flex-col lg:mt-4 xl:mt-4 p-1 text-start  lg:w-1/6 w-1/2">
                                        <label htmlFor='refundDate' className="text-base  mx-1 ">Refund Date:</label>
                                        <input id='refundDate' className="input-style p-1  rounded" type="text" name="refundDate" value={formData.refundDate} onChange={handleChange} required />
                                    </div>

                                    <div className="flex flex-col lg:mt-4 xl:mt-4 p-1 text-start  lg:w-1/6 w-1/2">
                                        <label htmlFor='utrNeftNo' className="text-base  mx-1 ">UTR/NEFT No.</label>
                                        <input id='utrNeftNo' className="input-style p-1  rounded" type="text" name="utrNeftNo" value={formData.utrNeftNo} onChange={handleChange} placeholder="UTR/NEFT No." />
                                    </div>
                                    <div className="flex flex-col lg:mt-4 xl:mt-4 p-1 text-start  lg:w-1/6 w-1/2">
                                        <label htmlFor='bankName' className="text-base  mx-1 ">Bank Name:</label>
                                        <input id='bankName' className="input-style p-1  rounded" type="text" name="bankName" value={formData.bankName} onChange={handleChange} placeholder="Bank Name" />
                                    </div>

                                    <div className="flex flex-col lg:mt-4 xl:mt-4 p-1 text-start  lg:w-1/6 w-1/2">
                                        <label htmlFor='paidThrough' className="text-base  mx-1 ">Paid Through:</label>
                                        <input id='paidThrough' className="input-style p-1  rounded" type="text" name="paidThrough" value={formData.paidThrough} onChange={handleChange} placeholder="Paid Through" />
                                    </div>

                                    <div className="flex flex-col  lg:mt-4 xl:mt-4  p-1 text-start  lg:w-1/6 w-1/2"></div>
                                    <div className="flex flex-col  lg:mt-4 xl:mt-4  p-1 text-start  lg:w-1/6 w-1/2"></div>
                                    {/* FIELD - 20 */}
                                    <div className="mx-auto mt-8 p-2 text-center justify-center w-auto">
                                        <button onClick={updateCancelationAPI} className="flex w-20 text-white bg-gradient-to-r hover:text-black from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-0 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded text-base px-4 py-1 text-center " type="submit">Submit</button>
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

export default CancelUpdate;