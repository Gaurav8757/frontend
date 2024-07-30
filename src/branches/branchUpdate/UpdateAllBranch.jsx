/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { CgCloseR } from "react-icons/cg";
import { toast } from "react-toastify";
import axios from "axios";
import VITE_DATA from "../../config/config.jsx";
// import { POLICY_TYPES } from "../../admin/admincomponents/MasterForm/master.jsx";
function UpdateAllBranch({ updateBranch, onUpdate, onUpdateClick }) {
    const [loading, setLoading] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pdata, setPdata] = useState([]);
    const [catTypesForSelectedPolicy, setCatTypesForSelectedPolicy] = useState([]);
    const [fuelType, setFuelType] = useState([]);
    const [allDetails, setAllDetails] = useState({
        entryDate: '',
        company: '',
        category: '',
        segment: '',
        sourcing: '',
        policyNo: '',
        insuredName: '',
        contactNo: '',
        vehRegNo: '',
        hypo: '',
        branch: '',
        advisorName: '',
        subAdvisor: '',
        policyType: '',
        policyStartDate: '',
        policyEndDate: '',
        odExpiry: '',
        tpExpiry: '',
        idv: '',
        bodyType: '',
        makeModel: '',
        mfgYear: '',
        registrationDate: '',
        vehicleAge: '',
        fuel: '',
        gvw: '',
        cc: '',
        // productCode: '',
    });

    // OPEN MODAL
    const openModal = () => {
        setIsModalOpen(true);
    };

    // CLOSE MODAL
    const closeModal = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Not Authorized yet.. Try again! ");
        } else {
            // The user is authenticated, so you can make your API request here.
            axios
                .get(`${VITE_DATA}/view/fuel`, {
                    headers: {
                        Authorization: `${token}`, // Send the token in the Authorization header
                    },
                })
                .then((response) => {
                    setFuelType(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);

    useEffect(() => {
        axios.get(`${VITE_DATA}/view/company/lists`)
            .then((resp) => {
                const cType = resp.data;

                setPdata(cType);
            })
            .catch((error) => {
                console.error("Error fetching company names:", error);
            });
    }, []);

    const handlePolicyStartDateChange = (e) => {
        const startDate = e.target.value;
        const odExpiryDate = new Date(startDate);
        odExpiryDate.setFullYear(odExpiryDate.getFullYear() + 1);
        setAllDetails(prevDetails => ({
            ...prevDetails,
            odExpiry: odExpiryDate.toISOString().split('T')[0]
        }));

        const policyEndDateValue = new Date(startDate);
        policyEndDateValue.setFullYear(policyEndDateValue.getFullYear() + 1);
        setAllDetails(prevDetails => ({
            ...prevDetails,
            policyEndDate: policyEndDateValue.toISOString().split('T')[0]
        }));

        const tpExpiryDate = new Date(startDate);
        tpExpiryDate.setFullYear(tpExpiryDate.getFullYear() + 3);
        setAllDetails(prevDetails => ({
            ...prevDetails,
            tpExpiry: tpExpiryDate.toISOString().split('T')[0]
        }));

        setAllDetails(prevDetails => ({
            ...prevDetails,
            policyStartDate: startDate
        }));
    };
    // // Calculate the last day of the previous month
    const getLastDayOfPreviousMonth = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };
    // // VEHICLE AGE CALCULATED

    useEffect(() => {
        const calculateAge = () => {
            const today = new Date();
            const birthdateDate = new Date(allDetails.mfgYear);

            // if (isNaN(birthdateDate.getTime())) {
            //   console.error('Invalid date format for registrationDate');
            //   return;
            // }

            let ageYears = today.getFullYear() - birthdateDate.getFullYear();
            let ageMonths = today.getMonth() - birthdateDate.getMonth();
            let ageDays = today.getDate() - birthdateDate.getDate();

            if (ageDays < 0) {
                const lastDayOfPreviousMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
                ageDays = lastDayOfPreviousMonth + ageDays;
                ageMonths--;
            }

            if (ageMonths < 0) {
                ageYears--;
                ageMonths = 12 + ageMonths;
            }

            setAllDetails(prevDetails => ({
                ...prevDetails,
                vehicleAge: `${ageYears} years `
            }));
        };

        calculateAge(); // Call calculateAge directly here

    }, [allDetails.mfgYear]); // Include the dependencies of calculateAge here


    // show all data inside input tag
    useEffect(() => {
        setAllDetails(updateBranch);
    }, [updateBranch]);

    // handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAllDetails((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const updateInsuranceAPI = async () => {
        try {
            setLoading(true);
            // Use the selected category ID in the patch method
            const resp = await axios.put(`${VITE_DATA}/alldetails/updatedata/${allDetails._id}`, allDetails);
            toast.success(`${resp.data.status}`);


            // Close the modal after successful submission
            closeModal();

        } catch (error) {
            console.error("Error updating insurance details:", error);
        } finally {
            onUpdate();
            setLoading(false);
        }
    };


    return (
        <>
            {/* <!-- Modal toggle --> */}
            <button onClick={() => { onUpdateClick(updateBranch); openModal(); }} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 m-1 ">
                Update
            </button>

            {/* <!-- Main modal --> */}
            {isModalOpen && (
                <div
                    id="static-modal"
                    data-modal-backdrop="static"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed top-0 right-0 left-0 bottom-0 inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">

                    <div className="relative p-1 w-full max-w-7xl max-h-7xl mx-auto my-20">
                        {/* <!-- Modal content --> */}
                        <div className="relative bg-gradient-to-r from-blue-200 to-cyan-200 rounded-lg shadow dark:bg-slate-100">
                            {/* <!-- Modal header --> */}
                            <div className="flex items-center justify-between p-2 md:p-3 rounded-lg dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-800 ">
                                    Fill Policy Details
                                </h3>
                                <button
                                    onClick={closeModal}
                                    type="button"
                                    className=" bg-transparent hover:text-red-500 text-slate-500  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  ">
                                    <CgCloseR size={25} />
                                </button>
                            </div>

                            {/* <!-- Modal body --> */}
                            <section className="p-4 md:p-3 scroll-smooth hs-scroll-inside-viewport-modal rounded-lg max-h-auto text-justify overflow-y-auto bg-gradient-to-r from-slate-100 to-white">
                                <div className="container-fluid flex justify-center p-1 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-white">
                                    <div className="relative w-full lg:w-full p-4 lg:p-1 rounded-xl shadow-xl text-2xl items-center bg-slate-400">
                                        <div className="flex flex-wrap justify-between">

                                            {/* FIELD - 1 */}
                                            <div className="flex flex-col p-2  text-start w-full lg:w-1/4">
                                                <label className="text-base mx-1">Entry Date:</label>
                                                <input
                                                    className="input-style rounded-lg mt-1"
                                                    type="date"
                                                    value={allDetails.entryDate}
                                                    onChange={handleInputChange}
                                                    name="entryDate"
                                                />
                                            </div>

                                            {/* FIELD - 2 */}
                                            <div className="flex flex-col p-2  text-start w-full lg:w-1/4">
                                                <label className="text-base mx-1">Company Name:</label>
                                                <select
                                                    className="input-style  rounded-lg mt-1"
                                                    value={allDetails.company}
                                                    // onChange={handleInputChange}
                                                    onChange={(e) => {
                                                        handleInputChange(e);
                                                        const selectedCatId = e.target.selectedOptions[0].getAttribute("data-id");
                                                        setCatTypesForSelectedPolicy(selectedCatId);
                                                    }}
                                                    name="company">
                                                    <option className="w-1" value="">--- Select Company ---</option>
                                                    {pdata.map((comp) => (
                                                        <option key={comp._id} value={comp.c_type} data-id={comp._id}>
                                                            {comp.c_type}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* FIELD - 3 */}
                                            <div className="flex flex-col  p-2 text-start w-full lg:w-1/4">

                                                <label className="text-base mx-1">Category:</label>
                                                <select
                                                    className="input-style rounded-lg mt-1"
                                                    value={allDetails.category}
                                                    onChange={handleInputChange}
                                                    name="category"
                                                > <option className="w-1" value="" >--- Select Category ---</option>
                                                    {pdata.map((cat) => {
                                                        if (cat._id === catTypesForSelectedPolicy) {
                                                            return cat.category.map((product, idx) => (
                                                                <option key={idx} value={product}>{product}</option>
                                                            ));
                                                        } else {
                                                            return null;
                                                        }
                                                    })}
                                                </select>
                                            </div>
                                            {/* FIELD - 4 */}
                                            <div className="flex flex-col  p-2 text-start w-full lg:w-1/4">
                                                <label className="text-base mx-1">Segment:</label>
                                                <select
                                                    className="input-style rounded-lg mt-1"
                                                    value={allDetails.segment}
                                                    onChange={handleInputChange}
                                                    name="segment">
                                                    <option className="w-1" value="">--- Select Segment ---</option>
                                                    <option value="C V">C V</option>
                                                    <option value="PVT-CAR">PVT-CAR</option>
                                                    <option value="TW">TW</option>
                                                    <option value="HEALTH">HEALTH</option>
                                                    <option value="NON-MOTOR">NON-MOTOR</option>
                                                    <option value="LIFE">LIFE</option>
                                                </select>
                                            </div>
                                            {/* FIELD - 5 */}
                                            <div className="flex flex-col p-2 text-start w-full lg:w-1/4 ">
                                                <label className="text-base mx-1">Sourcing:</label>
                                                <select
                                                    className="input-style rounded-lg mt-1"
                                                    value={allDetails.sourcing}
                                                    onChange={handleInputChange} name="sourcing">
                                                    <option className="w-1" value="">--- Select Sourcing Type ---</option>
                                                    <option value="NEW">NEW</option>
                                                    <option value="RENEWAL">RENEWAL</option>
                                                    <option value="ROLL OVER">ROLL OVER</option>
                                                </select>
                                            </div>
                                            {/* FIELD - 6 */}
                                            <div className="flex flex-col p-2 text-start w-full lg:w-1/4 ">
                                                <label className="text-base mx-1">Insured Name:</label>
                                                <input
                                                    className="input-style rounded-lg"
                                                    type="text"
                                                    value={allDetails.insuredName}
                                                    onChange={handleInputChange}
                                                    name="insuredName"
                                                />
                                            </div>
                                            {/* FIELD - 7 */}
                                            <div className="flex flex-col p-2 text-start w-full lg:w-1/4 ">
                                                <label className="text-base mx-1">Contact No:</label>
                                                <input
                                                    className="input-style rounded-lg"
                                                    type="text"
                                                    value={allDetails.contactNo}
                                                    onChange={handleInputChange}
                                                    name="contactNo"
                                                    placeholder="Enter Contact No" />
                                            </div>
                                            {/* FIELD - 8 */}
                                            <div className="flex flex-col p-2 text-start w-full lg:w-1/4 ">
                                                <label className="text-base mx-1">Vehicle Reg No:</label>
                                                <input
                                                    className="input-style rounded-lg"
                                                    type="text"
                                                    value={allDetails.vehRegNo}
                                                    onChange={handleInputChange}
                                                    name="vehRegNo"
                                                    placeholder="Enter Vehicle Reg No"
                                                />
                                            </div>
                                            {/* FIELD - 9 */}
                                            <div className="flex flex-col p-2 text-start w-full lg:w-1/4 ">
                                                <label className="text-base mx-1">Hypothication:</label>
                                                <input
                                                    className="input-style rounded-lg"
                                                    type="text"
                                                    value={allDetails.hypo}
                                                    onChange={handleInputChange}
                                                    name="hypo"
                                                    placeholder="Hypothication"
                                                />
                                            </div>
                                            {/* FIELD - 11 */}
                                            <div className="flex flex-col p-2 text-start w-full lg:w-1/4 ">
                                                <label className="text-base mx-1">Advisor Name:</label>
                                                <input
                                                    className="input-style rounded-lg"
                                                    type="text"
                                                    value={allDetails.advisorName}
                                                    onChange={handleInputChange}
                                                    name="advisorName"
                                                    placeholder="Enter Advisor Name"
                                                />
                                            </div>
                                            {/* FIELD - 12 */}
                                            <div className="flex flex-col p-2 text-start w-full lg:w-1/4 ">
                                                <label className="text-base mx-1">Sub Advisor:</label>
                                                <input
                                                    className="input-style rounded-lg"
                                                    type="text"
                                                    value={allDetails.subAdvisor}
                                                    onChange={handleInputChange}
                                                    name="subAdvisor"
                                                    placeholder="Enter Sub Advisor"
                                                />
                                            </div>
                                            {/* FIELD - 13 */}
                                            <div className="flex flex-col p-2 text-start w-full lg:w-1/4 ">
                                                <label className="text-base mx-1">Policy Start Date:</label>
                                                <input
                                                    className="input-style rounded-lg"
                                                    type="date"
                                                    name="policyStartDate"
                                                    value={allDetails.policyStartDate}
                                                    onChange={
                                                        handlePolicyStartDateChange
                                                    }
                                                />
                                            </div>
                                            {/* FIELD - 14 */}
                                            <div className="flex flex-col p-2 text-start w-full lg:w-1/4 ">
                                                <label className="text-base mx-1">Policy End Date:</label>
                                                <input
                                                    className="input-style rounded-lg"
                                                    type="date"
                                                    value={allDetails.policyEndDate}
                                                    onChange={handleInputChange}
                                                    name="policyEndDate"
                                                    placeholder="Select Policy End Date" />
                                            </div>
                                            {/* FIELD - 15 */}
                                            <div className="flex flex-col p-2 text-start w-full lg:w-1/4 ">
                                                <label className="text-base mx-1">OD Expiry:</label>
                                                <input
                                                    className="input-style rounded-lg"
                                                    type="date"
                                                    value={allDetails.odExpiry}
                                                    onChange={handleInputChange}
                                                    name="odExpiry"
                                                    placeholder="Select OD Expiry"
                                                    min="2025-01-01"
                                                />
                                            </div>
                                            {/* FIELD - 16 */}
                                            <div className="flex flex-col p-2 text-start w-full lg:w-1/4 ">
                                                <label className="text-base mx-1">TP Expiry:</label>
                                                <input
                                                    className="input-style rounded-lg"
                                                    type="date"
                                                    value={allDetails.tpExpiry}
                                                    onChange={handleInputChange}
                                                    name="tpExpiry"
                                                    min="2025-01-01"
                                                />
                                            </div>
                                            {/* FIELD - 17 */}
                                            <div className="flex flex-col p-2 text-start w-full lg:w-1/4 ">
                                                <label className="text-base mx-1">IDV:</label>
                                                <input
                                                    className="input-style rounded-lg"
                                                    type="text"
                                                    value={allDetails.idv}
                                                    onChange={handleInputChange}
                                                    name="idv"
                                                    placeholder="Enter IDV" />
                                            </div>
                                            {/* FIELD - 18 */}
                                            <div className="flex flex-col p-2 text-start w-full lg:w-1/4 ">
                                                <label className="text-base mx-1">Body Type:</label>
                                                <input
                                                    className="input-style rounded-lg"
                                                    type="text"
                                                    value={allDetails.bodyType}
                                                    onChange={handleInputChange}
                                                    name="bodyType"
                                                    placeholder="Enter Body Type"
                                                />
                                            </div>
                                            {/* FIELD - 19 */}
                                            <div className="flex flex-col p-2 text-start w-full lg:w-1/4 ">
                                                <label className="text-base mx-1">Make & Model:</label>
                                                <input
                                                    className="input-style rounded-lg"
                                                    type="text"
                                                    value={allDetails.makeModel}
                                                    onChange={handleInputChange}
                                                    name="makeModel"
                                                />
                                            </div>
                                            {/* FIELD - 20 */}
                                            <div className="flex flex-col p-2 text-start w-full lg:w-1/4 ">
                                                <label className="text-base mx-1">Registration Date:</label>
                                                <input
                                                    className="input-style rounded-lg"
                                                    type="date"
                                                    value={allDetails.registrationDate}
                                                    onChange={handleInputChange}
                                                    name="registrationDate"
                                                    placeholder="Select Registration Date"
                                                    min="1950-01-01"
                                                    max={getLastDayOfPreviousMonth()}
                                                />
                                            </div>
                                            {/* FIELD - 21 */}
                                            <div className="flex flex-col p-2 text-start w-full lg:w-1/4 ">
                                                <label className="text-base mx-1">Vehicle Age:</label>
                                                <input
                                                    className="input-style rounded-lg"
                                                    type="text"
                                                    value={allDetails.vehicleAge}
                                                    name="vehicleAge"
                                                    readOnly
                                                />
                                            </div>
                                            {/* FIELD - 22 */}
                                            <div className="flex flex-col p-2 text-start w-full lg:w-1/4 ">
                                                <label className="text-base mx-1">Manufacturing Year:</label>
                                                <input
                                                    className="input-style rounded-lg"
                                                    type="text"
                                                    value={allDetails.mfgYear}
                                                    onChange={handleInputChange}
                                                    name="mfgYear"
                                                    placeholder="Enter Manufacturing Year" />
                                            </div>
                                            {/* FIELD - 23 */}
                                            <div className="flex flex-col p-2 text-start w-full lg:w-1/4 ">
                                                <label className="text-base mx-1">Fuel:</label>
                                                <select
                                                    className="input-style rounded-lg mt-1"
                                                    value={allDetails.fuel}
                                                    onChange={handleInputChange} name="fuel">
                                                    <option className="w-1" >--- Select Fuel Type ---</option>
                                                    {
                                                        fuelType.map((fuel) => (
                                                            <option key={fuel._id} value={fuel.fuels} >{fuel.fuels}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            {/* FIELD - 24 */}
                                            <div className="flex flex-col p-2 text-start w-full lg:w-1/4 ">
                                                <label className="text-base mx-1">GVW (kg):</label>
                                                <input
                                                    className="input-style rounded-lg"
                                                    type="text"
                                                    value={allDetails.gvw}
                                                    onChange={handleInputChange}
                                                    name="gvw"
                                                    placeholder="Enter GVW"
                                                />
                                            </div>
                                            {/* FIELD - 25 */}
                                            <div className="flex flex-col p-2 text-start w-full lg:w-1/4 ">
                                                <label className="text-base mx-1">C.C.:</label>
                                                <input
                                                    className="input-style rounded-lg"
                                                    type="text"
                                                    value={allDetails.cc}
                                                    onChange={handleInputChange}
                                                    name="cc"
                                                />
                                            </div>
                                            <div className="flex flex-col p-2 text-start w-full lg:w-1/4 "></div>
                                            {/* FIELD - 28 */}
                                            <div className="flex flex-col p-2 text-start w-full lg:w-1/4 "></div>
                                        </div>
                                        {/* button */}
                                        <div className="col-span-2 p-2 mt-10 flex justify-center">
                                            <button
                                                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded text-sm px-3 py-2 text-center "
                                                onClick={updateInsuranceAPI} type="button" > {loading ? "Submitting..." : "Submit"} </button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
export default UpdateAllBranch;