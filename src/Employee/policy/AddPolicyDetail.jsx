/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
// import { CgCloseR } from "react-icons/cg";
import { toast } from "react-toastify";
import { State, City } from "country-state-city";
import axios from "axios";
import VITE_DATA from "../../config/config.jsx";
function AddPolicyDetail({ insurance, onUpdates, onClose }) {
    const [pdata, setPdata] = useState([]);
    const [loading, setLoading] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [APIData, setAPIData] = useState([]);
    const [data, setData] = useState([]);
    const [advLists, setAdvLists] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [odList, setOdList] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [selectedState, setSelectedState] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [selectedCity, setSelectedCity] = useState("");
    const [fuelData, setFuelData] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [filteredAdvLists, setFilteredAdvLists] = useState([]);
    // const [empbranches, setempBranches] = useState("");
    const [catTypesForSelectedPolicy, setCatTypesForSelectedPolicy] = useState([]);
    // const [empTime, setEmpTime] = useState('');
    // console.log(empbranches);
    function getFormattedTime() {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
        const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    }
    const time = getFormattedTime();

    const citiesToShow = [
        "Araria",
        "Arwal",
        "Aurangabad",
        "Banka",
        "Begusarai",
        "Bhagalpur",
        "Bhojpur",
        "Buxar",
        "Darbhanga",
        "Gaya",
        "Gopalganj",
        "Jamui",
        "Jehanabad",
        "Kaimur District",
        "Katihar",
        "Khagaria",
        "Kishanganj",
        "Lakhisarai",
        "Munger",
        "Madhepura",
        "Madhubani",
        "Muzaffarpur",
        "Nalanda",
        "Nawada",
        "Patna",
        "Purnia",
        "Pashchim Champaran",
        "Purba Champaran",
        "Rohtas",
        "Saharsa",
        "Samastipur",
        "Saran",
        "Sheikhpura",
        "Sheohar",
        "Sitamarhi",
        "Siwan",
        "Supaul",
        "Vaishali",
        "West Champaran",
    ];

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        // const branch = sessionStorage.getItem("name");
        if (!token) {
            toast.error("Not Authorized yet.. Try again! ");
        } else {
            // The user is authenticated, so you can make your API request here.
            axios
                .get(`${VITE_DATA}/advisor/all/lists`, {
                    headers: {
                        Authorization: `${token}`, // Send the token in the Authorization header
                    },
                })
                .then((response) => {
                    setAdvLists(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);

    useEffect(() => {
        // Fetch and set states for India when component mounts
        const fetchStates = () => {
            const indiaStates = State.getStatesOfCountry("IN"); // Assuming "IN" is the country code for India
            setStates(indiaStates);
        };

        fetchStates();
    }, []);

    const [allDetails, setAllDetails] = useState({
        states: insurance.states || "",
        district: insurance.district || selectedCity,
        company: insurance.company || "",
        category: insurance.category || "",
        policyType: insurance.policyType || "",
        policyNo: insurance.policyNo || "",
        engNo: insurance.engNo || "",
        chsNo: insurance.chsNo || "",
        odPremium: insurance.odPremium || "",
        liabilityPremium: insurance.liabilityPremium || "",
        netPremium: insurance.netPremium || "",
        taxes: insurance.taxes || "",
        rsa: insurance.rsa || "",
        fuel: insurance.fuel || "",
        vehRegNo: insurance.vehRegNo || "",
        finalEntryFields: insurance.finalEntryFields || "",
        odDiscount: insurance.odDiscount || "",
        ncb: insurance.ncb || "",
        policyPaymentMode: insurance.policyPaymentMode || "",
        empTime: time,
        advisorName: insurance.advisorName || "",
        advId: insurance.advId || "",
    });

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
                    setFuelData(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [formSubmitted]);

let citys = cities.map((data)=> data.name);
console.log(citys);


    useEffect(() => {
        axios
            .get(`${VITE_DATA}/view/company/lists`)
            .then((resp) => {
                const cType = resp.data;

                setPdata(cType);
            })
            .catch((error) => {
                console.error("Error fetching company names:", error);
            });
    }, []);

    useEffect(() => {
        // The user is authenticated, so you can make your API request here.
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Not Authorized yet.. Try again! ");
        } else {
            axios
                .get(`${VITE_DATA}/od/list`, {
                    headers: {
                        Authorization: `${token}`, // Send the token in the Authorization header
                    },
                })
                .then((response) => {
                    setOdList(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);

    useEffect(() => {
        axios
            .get(`${VITE_DATA}/staff/policy/lists`)
            .then((resp) => {
                const PolicyType = resp.data;

                setData(PolicyType);
            })
            .catch((error) => {
                console.error("Error fetching policy types:", error);
            });
    }, []);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Not Authorized yet.. Try again! ");
        } else {
            // The user is authenticated, so you can make your API request here.
            axios
                .get(`${VITE_DATA}/employees/data`, {
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

    // filter advisor based on branch
    useEffect(() => {
        if (allDetails.branch) {
          const filteredAdvisors = advLists.filter((adv) => adv.branch[0] === allDetails.branch);
          setFilteredAdvLists(filteredAdvisors);
        }
      }, [allDetails.branch, advLists]);

    const updateNetPremium = () => {
        const odPremiumValue = parseFloat(allDetails.odPremium) || 0;
        const liabilityPremiumValue = parseFloat(allDetails.liabilityPremium) || 0;
        // Calculate netPremium by adding odPremium and liabilityPremium
        const newNetPremium = odPremiumValue + liabilityPremiumValue;
        // Set the updated netPremium value directly
        setAllDetails((prevDetails) => ({
            ...prevDetails,
            netPremium: newNetPremium.toFixed(2),
        }));
    };

    // // Calculate taxes with netPremium
    const calculateFinalAmount = () => {
        const netPremiumValue = parseFloat(allDetails.netPremium) || 0;
        const taxesValue = parseFloat(allDetails.taxes) || 0;
        const rsaValue = parseFloat(allDetails.rsa) || 0;
        const finalAmountValue = netPremiumValue + taxesValue + rsaValue;
        if (allDetails.company === "GO-DIGIT") {
            setAllDetails((prevDetails) => ({
                ...prevDetails,
                finalEntryFields: finalAmountValue.toFixed(2),
            }));
        } else {
            setAllDetails((prevDetails) => ({
                ...prevDetails,
                finalEntryFields: finalAmountValue.toFixed(0),
            }));
        }
    };

    // // Calculate branch payable amount
    const calculateBranchPayableAmount = () => {
        const netPremiumValue = parseFloat(allDetails.netPremium) || 0;
        const branchPayoutValue = parseFloat(allDetails.branchPayout) || 0;
        const branchPayableAmountValue = netPremiumValue - branchPayoutValue;

        setAllDetails((prevDetails) => ({
            ...prevDetails,
            branchPayableAmount: branchPayableAmountValue.toFixed(2),
        }));
    };

    // // Final amount set
    const handleNetPremiumBlur = () => {
        if (allDetails.calculationType === "finalAmount") {
            calculateFinalAmount();
        } else if (allDetails.calculationType === "branchPayableAmount") {
            calculateBranchPayableAmount();
        }
        // Reset the calculation type after performing the calculation
        setAllDetails((prevDetails) => ({
            ...prevDetails,
            calculationType: "",
        }));
    };

    // show all data inside input tag
    useEffect(() => {
        setAllDetails(insurance);
    }, [insurance]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        //  console.log(name + " : " + value);

        if (name === "selectedState") {
            setSelectedState(value);
            const stateIsoCode = value;
            // Fetch and set cities based on selected state
            try {
                const stateCities = City.getCitiesOfState("IN", stateIsoCode);
                setCities(stateCities);
                setSelectedCity("");
            } catch (error) {
                console.error("Error fetching cities:", error);
                // Handle error appropriately
            }
        }
        // For setting other details, assuming allDetails is correctly set and has a structure like { selectedState: '', selectedCity: '', ...otherDetails }
        setAllDetails((prevData) => ({
            ...prevData,
            [name]: value,
            states: name === "selectedState" ? value : prevData.selectedState,
            district: name === "selectedCity" ? value : prevData.selectedCity,
            empTime: time,
            advId:
                name === "advisorName"
                    ? advLists.find((advisor) => advisor.advisorname === value).uniqueId
                    : prevData.advId,
        }));
    };

    // Assuming these event handlers are correctly bound to input elements in your JSX

    const updateInsuranceAPI = async () => {
        try {
            setLoading(true);
            setFormSubmitted(true);

            // Use the selected category ID in the patch method
            const resp = await axios.put(
                `${VITE_DATA}/alldetails/updatedata/${insurance._id}`,
                allDetails
            );
            onUpdates();
            toast.success(`${resp.data.status}`);
            // console.log(resp.data.message.updatedDetails.district);
            // Close the modal after successful submission
            onClose();
        } catch (error) {
            console.error("Error updating insurance details:", error);
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
                <div className="relative p-1 w-full max-w-7xl max-h-7xl mx-auto my-20">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-gradient-to-r from-orange-700 to-orange-700 rounded-lg shadow ">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center justify-between p-2 md:p-3 rounded-lg dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-100 ">
                                Fill Policy Details
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
                        {/* <!-- Modal body --> */}
                        <section className="p-4 md:p-3 scroll-smooth hs-scroll-inside-viewport-modal rounded-lg max-h-auto text-justify overflow-y-auto bg-gradient-to-r from-orange-700 to-orange-700">
                            <div className="container-fluid flex justify-center p-1 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-gradient-to-r from-white to-orange-700">
                                <div className="relative w-full lg:w-full p-4 lg:p-1 rounded-xl shadow-xl text-2xl items-center bg-slate-200">
                                    <div className="flex flex-wrap justify-between font-semibold">
                                        <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
                                            <label className="text-base mx-1">
                                                Company Name
                                                <span className="text-red-600 font-bold">*</span>
                                            </label>
                                            <select
                                                id="company"
                                                name="company"
                                                className="input-style p-1  text-base rounded-lg"
                                                value={allDetails.company}
                                                onChange={(e) => {
                                                    handleInputChange(e);
                                                    const selectedCatId =
                                                        e.target.selectedOptions[0].getAttribute("data-id");
                                                    setCatTypesForSelectedPolicy(selectedCatId);
                                                }}
                                            >
                                                <option className="" value="">
                                                    --------- Select Company ----------
                                                </option>
                                                {pdata.map((comp) => (
                                                    <option
                                                        key={comp._id}
                                                        value={comp.c_type}
                                                        data-id={comp._id}
                                                    >
                                                        {comp.c_type}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
                                            <label className="text-base mx-1">
                                                Category:
                                                <span className="text-red-600 font-bold">*</span>
                                            </label>

                                            <select
                                                className="input-style w-full p-1  text-base rounded-lg"
                                                value={allDetails.category}
                                                name="category"
                                                onChange={handleInputChange}
                                            >
                                                <option value="">
                                                    ------- Select Product Type --------
                                                </option>
                                                {pdata.map(
                                                    (cat) =>
                                                        cat._id === catTypesForSelectedPolicy &&
                                                        cat.category.map((product, idx) => (
                                                            <option key={idx} value={product}>
                                                                {product}
                                                            </option>
                                                        ))
                                                )}
                                            </select>
                                        </div>
                                        {/* FIELD - 4 */}
                                        <div className="flex flex-col  p-1 text-start w-full lg:w-1/4">
                                            <label className="text-base mx-1">
                                                Policy Type:
                                                <span className="text-red-600 font-bold">*</span>
                                            </label>
                                            <select
                                                className="input-style p-1 text-base rounded-lg"
                                                value={allDetails.policyType}
                                                onChange={handleInputChange}
                                                name="policyType"
                                            >
                                                <option value="">
                                                    -------- Select Policy Type ---------
                                                </option>
                                                {data.map((category) => (
                                                    <option key={category._id} value={category.p_type}>
                                                        {category.p_type}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* FIELD - 1 */}
                                        <div className="flex flex-col p-1  text-start w-full lg:w-1/4">
                                            <label className="text-base mx-1">
                                                Policy No:
                                                <span className="text-red-600 font-bold">*</span>
                                            </label>
                                            <input
                                                className="input-style  text-base p-1 rounded-lg"
                                                type="text"
                                                value={allDetails.policyNo}
                                                onChange={handleInputChange}
                                                name="policyNo"
                                                placeholder="Enter Policy No"
                                            />
                                        </div>

                                        <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/4">
                                            <label className="text-base mx-1">
                                                State:<span className="text-red-600 font-bold">*</span>
                                            </label>
                                            <select
                                                className="input-style flex flex-wrap text-base p-1 rounded-lg"
                                                name="selectedState"
                                                value={allDetails.selectedState}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">
                                                    ------------ Select State ------------{" "}
                                                </option>
                                                {states.map((state) => (
                                                    <option key={state.isoCode} value={state.isoCode}>
                                                        {state.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/4">
                                                <label className="text-base mx-1">District:<span className="text-red-600 font-bold">*</span></label> */}
                                        {/* <select
                                                    className="input-style  text-base p-1 rounded-lg"
                                                    name="selectedCity"
                                                    value={allDetails.selectedCity}
                                                    onChange={handleInputChange}
                                                    disabled={!allDetails.selectedState} // Disable city dropdown until a state is selected
                                                >
                                                    <option value="">------------ Select City -------------</option>
                                                    {cities.map((city, idx) => (
                                                        <option key={idx} value={city.name}>
                                                            {city.name}
                                                        </option>
                                                    ))}
                                                </select> */}
                                        {/* <input
                                                    type="text"
                                                    name="selectedCity"
                                                    id="selectedCity"
                                                    className="input-style text-base p-1 rounded-lg "
                                                    placeholder="Enter new district name"
                                                    value={allDetails.selectedCity} // Assuming newCity is a separate state to hold input data
                                                    onChange={handleInputChange}
                                                /> */}
                                        {/* </div> */}
                                        <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/4">
                                            <label className="text-base mx-1">
                                                District:
                                                <span className="text-red-600 font-bold">*</span>
                                            </label>
                                            {
                                                // selectedCity ? (
                                                <select
                                                    className="input-style text-base p-1 rounded-lg"
                                                    name="selectedCity"
                                                    id="selectedCity"
                                                    value={allDetails.selectedCity}
                                                    onChange={handleInputChange}
                                                    disabled={!selectedState} // Disable city dropdown until a state is selected
                                                >
                                                    <option value="">
                                                        ------------- Select District ---------------
                                                    </option>
                                                    <option value="All">All</option>
                                                    {/* Render other city options here if needed */}
                                                    {cities
                                                        .filter((data) => citiesToShow.includes(data.name))
                                                        .map((data, index) => (
                                                            <option key={index} value={data.name}>
                                                                {data.name}
                                                            </option>
                                                        ))}
                                                </select>
                                            }
                                        </div>

                                        <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/4">
                                            <label className="text-base mx-1">Vehicle Reg No:</label>
                                            <input
                                                className="input-style p-1 text-base rounded-lg"
                                                type="text"
                                                value={allDetails.vehRegNo}
                                                onChange={handleInputChange}
                                                name="vehRegNo"
                                                placeholder="Enter Vehicle Reg No"
                                            />
                                        </div>
                                        <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/4">
                                            <label className="text-base mx-1">Fuel:</label>
                                            <select
                                                className="input-style p-1  text-base rounded-lg"
                                                value={allDetails.fuel}
                                                onChange={handleInputChange}
                                                name="fuel"
                                            >
                                                <option className="w-1" value="">
                                                    --------- Select Fuel Type ------------
                                                </option>
                                                {fuelData.map((data) => (
                                                    <option
                                                        key={data._id}
                                                        className="w-1"
                                                        value={data.fuels}
                                                    >
                                                        {data.fuels}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        {/* FIELD - 2 */}
                                        <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/4">
                                            <label className="text-base mx-1">
                                                Engine No:
                                                <span className="text-red-600 font-bold">*</span>
                                            </label>
                                            <input
                                                className="input-style p-1  text-base rounded-lg"
                                                type="text"
                                                value={allDetails.engNo}
                                                onChange={handleInputChange}
                                                name="engNo"
                                                placeholder="Enter Engine No"
                                            />
                                            {/* {!isValidEngineChassis(allDetails.engNo) && <span className="text-red-500 text-sm">must be 6 alphanumeric characters</span>} */}
                                        </div>
                                        {/* FIELD - 3 */}
                                        <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/4 ">
                                            <label className="text-base mx-1">
                                                Chassis No:
                                                <span className="text-red-600 font-bold">*</span>
                                            </label>
                                            <input
                                                className="input-style  text-base p-1 rounded-lg"
                                                type="text"
                                                value={allDetails.chsNo}
                                                onChange={handleInputChange}
                                                name="chsNo"
                                                placeholder="Enter Chassis No"
                                            />
                                            {/* {!isValidEngineChassis(allDetails.chsNo) && <span className="text-red-500 text-sm">must be 6 alphanumeric characters</span>} */}
                                        </div>
                                        {/* FIELD - 5 */}
                                        {allDetails.policyType === "SATP" ? (
                                            <div className="flex flex-col p-1 mt-4  text-start w-full lg:w-1/4">
                                                <label className="text-base mx-1">
                                                    OD Premium:
                                                    <span className="text-red-600 font-bold">*</span>
                                                </label>
                                                <input
                                                    className="input-style  text-base p-1 rounded-lg"
                                                    type="number"
                                                    value={allDetails.odPremium}
                                                    onChange={handleInputChange}
                                                    placeholder="Disabled"
                                                    name="odPremium"
                                                    onBlur={updateNetPremium}
                                                    disabled
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex flex-col p-1 mt-4  text-start w-full lg:w-1/4">
                                                <label className="text-base mx-1">
                                                    OD Premium:
                                                    <span className="text-red-600 font-bold">*</span>
                                                </label>
                                                <input
                                                    className="input-style  text-base p-1 rounded-lg"
                                                    type="number"
                                                    value={allDetails.odPremium}
                                                    onChange={handleInputChange}
                                                    name="odPremium"
                                                    placeholder="Enter OD Premium"
                                                    onBlur={updateNetPremium}
                                                />
                                            </div>
                                        )}
                                        {/* FIELD - 6 */}
                                        {allDetails.policyType === "SAOD" ? (
                                            <div className="flex flex-col p-1 mt-4  text-start w-full lg:w-1/4">
                                                <label className="text-base mx-1">
                                                    Liability Premium:
                                                    <span className="text-red-600 font-bold">*</span>
                                                </label>
                                                <input
                                                    className="input-style  text-base p-1 rounded-lg"
                                                    type="number"
                                                    value={allDetails.liabilityPremium}
                                                    onChange={handleInputChange}
                                                    placeholder="Disabled"
                                                    onBlur={updateNetPremium}
                                                    name="liabilityPremium"
                                                    disabled
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex flex-col p-1 mt-4  text-start  w-full lg:w-1/4">
                                                <label className="text-base mx-1">
                                                    Liability Premium:
                                                    <span className="text-red-600 font-bold">*</span>
                                                </label>
                                                <input
                                                    className="input-style  text-base p-1 rounded-lg"
                                                    type="number"
                                                    value={allDetails.liabilityPremium}
                                                    onChange={handleInputChange}
                                                    onBlur={updateNetPremium}
                                                    name="liabilityPremium"
                                                    placeholder="Enter Liability Premium"
                                                />
                                            </div>
                                        )}
                                        {/* FIELD - 7 */}
                                        <div className="flex flex-col p-1 mt-4 text-start  w-full lg:w-1/4">
                                            <label className="text-base mx-1">
                                                Net Premium:
                                                <span className="text-red-600 font-bold">*</span>
                                            </label>
                                            <input
                                                className="input-style  text-base p-1 rounded-lg"
                                                type="number"
                                                value={allDetails.netPremium}
                                                onBlur={handleNetPremiumBlur}
                                                name="netPremium"
                                                placeholder="Net Premium"
                                                readOnly
                                            />
                                            <span className="mx-1 text-xs text-green-600">
                                                (odPremium + liabilityPremium)
                                            </span>
                                        </div>
                                        {/* FIELD - 8 */}
                                        <div className="flex flex-col  p-1 mt-4 text-start w-full lg:w-1/4">
                                            <label className="text-base mx-1">
                                                GST:<span className="text-red-600 font-bold">*</span>
                                            </label>
                                            <input
                                                className="input-style text-base p-1 rounded-lg"
                                                type="text"
                                                value={allDetails.taxes}
                                                onChange={handleInputChange}
                                                onBlur={calculateFinalAmount}
                                                name="taxes"
                                                placeholder="GST"
                                            />
                                        </div>

                                        <div className="flex flex-col  p-1 mt-4 text-start w-full lg:w-1/4">
                                            <label className="text-base mx-1">
                                                RSA:<span className="text-red-600 font-bold">*</span>
                                            </label>
                                            <input
                                                className="input-style  text-base p-1 rounded-lg"
                                                type="text"
                                                value={allDetails.rsa}
                                                onChange={handleInputChange}
                                                onBlur={calculateFinalAmount}
                                                name="rsa"
                                                placeholder="RSA"
                                            />
                                        </div>
                                        {/* FIELD - 9 */}
                                        <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/4">
                                            <label className="text-base mx-1">
                                                Final Amount:
                                                <span className="text-red-600 font-bold">*</span>
                                            </label>
                                            <input
                                                className="input-style  text-base p-1 rounded-lg"
                                                type="text"
                                                value={allDetails.finalEntryFields}
                                                onChange={handleInputChange}
                                                onBlur={calculateFinalAmount}
                                                name="finalEntryFields"
                                                placeholder=" Final Amount"
                                                readOnly
                                            />
                                            <span className="mx-1 text-xs text-green-600">
                                                (netPremium + GST%)
                                            </span>
                                        </div>
                                        {/* FIELD - 10 */}
                                        {/* <div className="flex flex-col  p-1 mt-4 text-start w-full lg:w-1/4">
                                                <label className="text-base mx-1">OD Discount%:<span className="text-red-600 font-bold">*</span></label>
                                                <input
                                                    className="input-style  text-base p-1 rounded-lg"
                                                    type="text"
                                                    value={allDetails.odDiscount}
                                                    onChange={handleInputChange}
                                                    name="odDiscount"
                                                    placeholder="Enter OD Discount" />
                                            </div> */}

                                        <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/4">
                                            <label className="text-base mx-1">
                                                OD Discount%:
                                                <span className="text-red-600 font-bold">*</span>
                                            </label>
                                            <select
                                                className="input-style p-1 text-base rounded-lg"
                                                type="text"
                                                name="odDiscount"
                                                value={allDetails.odDiscount}
                                                onChange={handleInputChange}
                                                placeholder="Enter OD Discount"
                                            >
                                                <option className="w-1" value="">
                                                    ------- Select OD Discount ---------
                                                </option>
                                                {odList.map((data) => (
                                                    <option key={data._id} value={data.odDiscount}>
                                                        {" "}
                                                        {data.odDiscount}%{" "}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        {/* FIELD - 11 */}

                                        <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/4">
                                            <label className="text-base mx-1">
                                                Policy Payment Mode:
                                                <span className="text-red-600 font-bold">*</span>
                                            </label>
                                            <select
                                                id="policyPaymentMode"
                                                className="input-style p-1 text-base rounded-lg"
                                                value={allDetails.policyPaymentMode}
                                                name="policyPaymentMode"
                                                onChange={handleInputChange}
                                            >
                                                <option className="w-1" value="">
                                                    --- Select Policy Payment Mode ---
                                                </option>
                                                <option className="w-1" value="insta payment">
                                                    Insta Payment
                                                </option>
                                                <option className="w-1" value="customer link">
                                                    Customer Link
                                                </option>
                                                <option className="w-1" value="customer cheque">
                                                    Customer Cheque
                                                </option>
                                                <option className="w-1" value="eleedom single cheque">
                                                    Eleedom Single Cheque
                                                </option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col p-1 mt-4 text-start lg:w-1/4">
                                            <label className="text-base mx-1">Advisor Name:</label>
                                            <select
                                                className="input-style p-1 text-base rounded-lg"
                                                type="text"
                                                value={allDetails.advisorName}
                                                onChange={handleInputChange}
                                                name="advisorName"
                                                placeholder="Enter Advisor Name"
                                            >
                                                <option value="">
                                                    ------------- Select Advisor -----------
                                                </option>
                                                {filteredAdvLists
                                                    .sort((a, b) =>
                                                        a.advisorname.localeCompare(b.advisorname)
                                                    )
                                                    .map((data) => (
                                                        <option
                                                            key={data._id}
                                                            value={data.advisorname}
                                                        >{`${data.advisorname} - ${data.branch[0]} `}</option>
                                                    ))}
                                            </select>
                                        </div>
                                        <div className="flex flex-col p-1 text-start w-full lg:w-1/4"></div>
                                        <div className="flex flex-col p-1 text-start w-full lg:w-1/4"></div>
                                    </div>
                                    {/* button */}
                                    <div className="col-span-2 p-2 mt-10 flex justify-center">
                                        <button
                                            className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded text-sm px-4 py-2 text-center me-2 mb-2"
                                            onClick={updateInsuranceAPI}
                                            type="button"
                                        >
                                            {" "}
                                            {loading ? "Submitting..." : "Submit"}{" "}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}
export default AddPolicyDetail;
