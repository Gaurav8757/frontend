
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { State, City } from 'country-state-city';
import axios from "axios";
import VITE_DATA from "../../config/config.jsx";
function UpdateFinance({ insurance, onUpdate, onClose }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [ncbLists, setNcbLists] = useState([]);
  const [pdata, setPdata] = useState([]);
  const [advLists, setAdvLists] = useState([]);
  const [states, setStates] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [cities, setCities] = useState([]);
  const [ccList, setCCList] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selectedState, setSelectedState] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [selectedCity, setSelectedCity] = useState('');
  const [sit, setSit] = useState([]);
  const [empTime, setEmpTime] = useState(getFormattedTime());
  function getFormattedTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }


  const citiesToShow = [ "Araria",
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
  "West Champaran",];

  useEffect(() => {
    // Fetch and set states for India when component mounts
    const fetchStates = () => {
      const indiaStates = State.getStatesOfCountry("IN"); // Assuming "IN" is the country code for India
      setStates(indiaStates);
    };
    fetchStates();
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Not Authorized yet.. Try again! ");
    } else {
      // The user is authenticated, so you can make your API request here.
      axios
        .get(`${VITE_DATA}/sit/show`, {
          headers: {
            Authorization: `${token}`, // Send the token in the Authorization header
          },
        })
        .then((response) => {
          setSit(response.data);
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
        .get(`${VITE_DATA}/ncb/show`, {
          headers: {
            Authorization: `${token}`, // Send the token in the Authorization header
          },
        })
        .then((response) => {
          setNcbLists(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setEmpTime(getFormattedTime());
    }, 1000); // Update every second
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Fetch and set states for India when component mounts
    const fetchStates = () => {
      const indiaStates = State.getStatesOfCountry("IN"); // Assuming "IN" is the country code for India
      setStates(indiaStates);
    };

    fetchStates();
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Not Authorized yet.. Try again! ");
    } else {
      // The user is authenticated, so you can make your API request here.
      axios
        .get(`${VITE_DATA}/cc/show`, {
          headers: {
            Authorization: `${token}`, // Send the token in the Authorization header
          },
        })
        .then((response) => {
          setCCList(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const [allDetails, setAllDetails] = useState({
    entryDate: '',
    company: '',
    states: '',
    sitcapacity: '',
    district: '',
    category: '',
    segment: '',
    sourcing: '',
    policyNo: '',
    insuredName: '',
    contactNo: '',
    vehRegNo: '',
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
    rsa: '',
    cc: '',
    engNo: '',
    chsNo: '',
    policyType: '',
    productCode: '',
    odPremium: '',
    liabilityPremium: '',
    netPremium: '',
    finalEntryFields: '',
    taxes: '',
    odDiscount: '',
    ncb: '',
    advisorName: '',
    advId: '',
    subAdvisor: '',
    policyMadeBy: '',
    branch: '',
    payoutOn: '',
    calculationType: '',
    policyPaymentMode: '',
    paymentDoneBy: '',
    chqNoRefNo: '',
    bankName: '',
    chqPaymentDate: '',
    chqStatus: '',
    advisorPayableAmount: '',
    branchPayout: '',
    branchPayableAmount: '',
    companyPayout: '',
    profitLoss: '',
    empTime: '',

  });

  useEffect(() => {
    axios.get(`${VITE_DATA}/staff/policy/lists`)
      .then((resp) => {
        const PolicyType = resp.data;

        setData(PolicyType);
      })
      .catch((error) => {
        console.error("Error fetching policy types:", error);
      });
  }, []);

  // useEffect(() => {
  //   const token = sessionStorage.getItem("token");
  //   if (!token) {
  //     toast.error("Not Authorized yet.. Try again! ");
  //   } else {
  //     // The user is authenticated, so you can make your API request here.
  //     axios
  //       .get(`https://eleedomimf.onrender.com/view/payment/mode`, {
  //         headers: {
  //           Authorization: `${token}`, // Send the token in the Authorization header
  //         },
  //       })
  //       .then((response) => {
  //         setPayMode(response.data);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // }, []);

  // Function to update netPremium when odPremium or liabilityPremium changes
  // const updateNetPremium = () => {
  //   const odPremiumValue = parseFloat(allDetails.odPremium) || 0;
  //   const liabilityPremiumValue = parseFloat(allDetails.liabilityPremium) || 0;
  //   // Calculate netPremium by adding odPremium and liabilityPremium
  //   const newNetPremium = odPremiumValue + liabilityPremiumValue;
  //   // Set the updated netPremium value directly
  //   setAllDetails(prevDetails => ({
  //     ...prevDetails,
  //     netPremium: newNetPremium.toFixed(2)
  //   }));
  // };

  const calculateAge = (mfgYear) => {
    if (!mfgYear) {
      return "0";
    }

    const currentYear = new Date().getFullYear();
    const birthYearInt = parseInt(mfgYear, 10);

    if (isNaN(birthYearInt)) {
      return "Invalid year";
    }

    let ageYears = currentYear - birthYearInt;
    return `${ageYears} years`;
  };

  useEffect(() => {
    const vehicleAge = calculateAge(allDetails.mfgYear);
    if (vehicleAge !== null) {
      setAllDetails(prevDetails => ({
        ...prevDetails,
        vehicleAge,
      }));
    }
  }, [allDetails.mfgYear]);

  const handleYearChange = (event) => {
    const { name, value } = event.target;
    setAllDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };


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
          }
        })
        .then((response) => {
          setAdvLists(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);
  // useEffect(() => {
  //   const token = sessionStorage.getItem("token");
  //   if (!token) {
  //     toast.error("Not Authorized yet.. Try again! ");
  //   } else {
  //     // The user is authenticated, so you can make your API request here.
  //     axios
  //       .get(`https://eleedomimf.onrender.com/view/fuel`, {
  //         headers: {
  //           Authorization: `${token}`, // Send the token in the Authorization header
  //         },
  //       })
  //       .then((response) => {
  //         setFuel(response.data);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // }, [fuel]);

  // // Final amount set
  // const handleNetPremiumBlur = () => {
  //   if (allDetails.calculationType === 'finalAmount') {
  //     calculateFinalAmount();
  //   } else if (allDetails.calculationType === 'branchPayableAmount') {
  //     calculateBranchPayableAmount();
  //   }
  //   // Reset the calculation type after performing the calculation
  //   setAllDetails(prevDetails => ({
  //     ...prevDetails,
  //     calculationType: ''
  //   }));
  // };



  const handlePolicyStartDateChange = (e) => {
    const startDate = e.target.value;
    const policyStartDate = new Date(startDate);
    const policyEndDate = new Date(startDate);

    // Set OD Expiry to one day before the policy start date
    const odExpiryDate = new Date(policyStartDate);
    odExpiryDate.setMonth(odExpiryDate.getMonth() + 12);
    odExpiryDate.setDate(policyStartDate.getDate() - 1);
    const odExpiry = odExpiryDate.toISOString().split('T')[0];

    // Set TP Expiry to one day before the policy start date
    const tpExpiryDate = new Date(policyStartDate);
    tpExpiryDate.setMonth(tpExpiryDate.getMonth() + 12);
    tpExpiryDate.setDate(policyStartDate.getDate() - 1);
    const tpExpiry = tpExpiryDate.toISOString().split('T')[0];

    // Set Policy End Date to one day before the policy start date
    policyEndDate.setMonth(policyEndDate.getMonth() + 12);
    policyEndDate.setDate(policyStartDate.getDate() - 1);
    const policyEnd = policyEndDate.toISOString().split('T')[0];

    setAllDetails(prevDetails => ({
      ...prevDetails,
      odExpiry,
      tpExpiry,
      policyEndDate: policyEnd,
      policyStartDate: startDate,

    }));
  };


  // show all data inside input tag
  useEffect(() => {
    setAllDetails(insurance);
  }, [insurance]);





  const handleInputChange = (e) => {
    const { name, value } = e.target;
    //  console.log(name + " : " + value);

    if (name === 'selectedState') {
      setSelectedState(value);
      const stateIsoCode = value;
      // Fetch and set cities based on selected state
      try {
        const stateCities = City.getCitiesOfState("IN", stateIsoCode);
        setCities(stateCities);
        setSelectedCity('');
      } catch (error) {
        console.error("Error fetching cities:", error);
        // Handle error appropriately
      }
    }
    // For setting other details, assuming allDetails is correctly set and has a structure like { selectedState: '', selectedCity: '', ...otherDetails }
    setAllDetails((prevData) => ({
      ...prevData,
      [name]: value.toUpperCase(),
      empTime: empTime,
      states: name === 'selectedState' ? value : prevData.selectedState,
      district: name === 'selectedCity' ? value : prevData.selectedCity,
      advId: name === 'advisorName' ? advLists.find(advisor => advisor.advisorname === value).uniqueId : prevData.advId
    }));
  };


  const updateInsuranceAPI = async () => {
    try {
      setLoading(true);
      // Use the selected category ID in the patch method
      const resp = await axios.put(`${VITE_DATA}/alldetails/updatedata/${insurance._id}`, allDetails);
      toast.success(`${resp.data.status}`);
      onClose(); // Close the modal after successful submission
      onUpdate();
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
        className="fixed top-0 right-0 left-0 bottom-0 inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">

        <div className="relative p-1 w-full max-w-7xl max-h-7xl mx-auto my-20">
          {/* <!-- Modal content --> */}
          <div className="relative bg-blue-600 rounded-lg shadow ">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-2 md:p-3 rounded-lg dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-100">
                Update Policy Details
              </h3>
              <button
                onClick={onClose}
                type="button"
                className=" bg-transparent hover:bg-red-100 text-slate-100  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  ">
                <img src="/close.png" height={5} width={25} alt="close" className="hover:bg-red-100 rounded-full"/>
              </button>
            </div>



            {/* <!-- Modal body --> */}
            <section className="p-4 md:p-3  rounded-lg max-h-auto text-justify overflow-y-auto bg-blue-600">
              <div className="container-fluid flex justify-center p-1 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-white">
                <div className="relative w-full font-semibold lg:w-full p-4 lg:p-1 rounded-xl shadow-xl text-2xl items-center bg-slate-200">
                  <div className="flex flex-wrap justify-between">

                    {/* FIELD - 1 */}
                    {/* <div className="flex flex-col p-1 text-start w-full lg:w-1/6 ">
                        <label className="text-base mx-1">Entry Date:</label>
                        <input
                          className="input-style rounded-lg"
                          type="date"
                          value={allDetails.entryDate}
                          onChange={handleInputChange}
                          name="entryDate"
                        />
                      </div> */}

                    {/* FIELD - 2 */}
                    {/* <div className="flex flex-col p-1 text-start w-full lg:w-1/6">
                        <label className="text-base mx-1">Branch:</label>
                        <select
                          id="branch"
                          className="input-style p-1 rounded-lg"
                          value={allDetails.branch}
                          onChange={handleInputChange}
                          name="branch"
                        >
                          <option className="w-1" value="">--- Select Branch ---</option>
                          <option value="PATNA">PATNA</option>
                          <option value="HAJIPUR">HAJIPUR</option>
                          <option value="SAMASTIPUR">SAMASTIPUR</option>
                        </select>
                      </div> */}

                    {/* FIELD - 3 */}
                    <div className="flex flex-col p-1 text-start w-full lg:w-1/5">
                      <label className="text-base mx-1">Insured Name:</label>
                      <input
                        className="input-style p-1 rounded-lg"
                        type="text"
                        value={allDetails.insuredName}
                        onChange={handleInputChange}
                        name="insuredName"
                      />
                    </div>

                    {/* FIELD - 4 */}
                    {/* <div className="flex flex-col p-1 text-start w-full lg:w-1/6">
                        <label className="text-base mx-1">Contact No:</label>
                        <input
                          className="input-style rounded-lg"
                          type="text"
                          value={allDetails.contactNo}
                          onChange={handleInputChange}
                          name="contactNo"
                          placeholder="Enter Contact No" />
                      </div> */}


                    {/* FIELD - 5 */}
                    <div className="flex flex-col p-1 text-start w-full lg:w-1/5">
                      <label className="text-base mx-1">Company Name:</label>
                      <select
                        id="company" name="company"
                        className="input-style p-0.5 text-lg rounded-lg"
                        value={allDetails.company}
                        onChange={(e) => {
                          handleInputChange(e);
                          // const selectedCatId = e.target.selectedOptions[0].getAttribute("data-id");
                          // setCatTypesForSelectedPolicy(selectedCatId);
                        }}>
                        <option className="" value="" >--- Select Company ---</option>
                        {pdata.map((comp) => (
                          <option key={comp._id} value={comp.c_type} data-id={comp._id}>
                            {comp.c_type}
                          </option>
                        ))}
                      </select>
                    </div>


                    {/* FIELD - 6 */}
                    {/* <div className="flex flex-col p-1 text-start w-full lg:w-1/6">
                        <label className="text-base mx-1">Category:</label>
                        <select
                          className="input-style p-1 rounded-lg"
                          value={allDetails.category}
                          onChange={handleInputChange}
                          name="category"
                        >
                          <option className="w-1" value=""  >--- Select Category ---</option>
                          {pdata.map((cat) => (
                            cat._id === catTypesForSelectedPolicy &&
                            cat.category.map((product, idx) => (
                              <option key={idx} value={product} >{product}</option>
                            ))))
                          }
                        </select>
                      </div> */}

                    {/* FIELD - 7 */}
                    {/* <div className="flex flex-col p-1 text-start w-full lg:w-1/6">
                        <label className="text-base mx-1">Policy Type:</label>
                        <select
                          className="input-style p-1 rounded-lg"
                          value={allDetails.policyType}
                          name="policyType"
                          // onChange={(e) => setPolicyType(e.target.value)}
                          onChange={handleInputChange}
                        > <option value="">--- Select Policy Type ---</option>
                          {data.map(prod => (
                            <option key={prod._id} value={prod.p_type}>{prod.p_type}</option>
                          ))}
                        </select>
                      </div> */}

                    {/* FIELD - 26 */}
                    <div className="flex flex-col p-1 text-start w-full lg:w-1/5">
                      <label className="text-base mx-1">Product Code:</label>
                      <select
                        id="productCode"
                        className="input-style p-0.5 text-lg rounded-lg"
                        value={allDetails.productCode}
                        onChange={handleInputChange}
                        name="productCode"
                      >
                        <option value="">-- Select Product Code ---</option>
                        {allDetails.policyType && data
                          .filter(policy => policy.p_type === allDetails.policyType)
                          .map(policy => policy.products.map((product, idx) => (
                            <option key={idx} value={product}>{product}</option>
                          )))}
                      </select>
                    </div>

                    {/* FIELD - 8 */}
                    <div className="flex flex-col p-1 text-start w-full lg:w-1/5">
                      <label className="text-base mx-1">Policy No:</label>
                      <input
                        className="input-style p-1 rounded-lg"
                        type="text"
                        value={allDetails.policyNo}
                        onChange={handleInputChange}
                        name="policyNo"
                        placeholder="Enter Policy No"
                      />
                    </div>

                    {/* FIELD - 9 */}
                    {/* <div className="flex flex-col p-1 text-start w-full lg:w-1/6">
                        <label className="text-base mx-1">Engine No:</label>
                        <input
                          className="input-style rounded-lg"
                          type="text"
                          value={allDetails.engNo}
                          onChange={handleInputChange}
                          name="engNo"
                          placeholder="Enter Engine No" />
                      </div> */}

                    {/* FIELD - 10 */}
                    {/* <div className="flex flex-col p-1 text-start w-full lg:w-1/6">
                        <label className="text-base mx-1">Chassis No:</label>
                        <input
                          className="input-style rounded-lg"
                          type="text"
                          value={allDetails.chsNo}
                          onChange={handleInputChange}
                          name="chsNo"
                          placeholder="Enter Chassis No"
                        />
                      </div> */}

                    {/* FIELD - 11 */}
                    {/* {
                        allDetails.policyType === "SATP" ? (<div className="flex flex-col p-1 text-start w-full lg:w-1/6">
                          <label className="text-base mx-1">OD Premium:</label>
                          <input
                            className="input-style rounded-lg"
                            type="number"
                            value={allDetails.odPremium}
                            onChange={handleInputChange}
                            placeholder="Disabled"
                            name="odPremium"
                            onBlur={updateNetPremium}
                            disabled
                          />
                        </div>) : (<div className="flex flex-col p-1 text-start w-full lg:w-1/6">
                          <label className="text-base mx-1">OD Premium:</label>
                          <input
                            className="input-style rounded-lg"
                            type="number"
                            value={allDetails.odPremium}
                            onChange={handleInputChange}
                            name="odPremium"
                            placeholder="Enter OD Premium"
                            onBlur={updateNetPremium}
                          />
                        </div>)} */}

                    {/* FIELD - 12 */}
                    {/* {
                        allDetails.policyType === "SAOD" ? (<div className="flex flex-col p-1 text-start w-full lg:w-1/6">
                          <label className="text-base mx-1">Liability Premium:</label>
                          <input
                            className="input-style rounded-lg"
                            type="number"
                            value={allDetails.liabilityPremium}
                            onChange={handleInputChange}
                            placeholder="Disabled"
                            onBlur={updateNetPremium}
                            name="liabilityPremium"

                            disabled
                          />
                        </div>)
                          : (<div className="flex flex-col p-1 text-start w-full lg:w-1/6">
                            <label className="text-base mx-1">Liability Premium:</label>
                            <input
                              className="input-style rounded-lg"
                              type="number"
                              value={allDetails.liabilityPremium}
                              onChange={handleInputChange}
                              onBlur={updateNetPremium}
                              name="liabilityPremium"
                              placeholder="Enter Liability Premium"
                            />
                          </div>)
                      } */}

                    {/* FIELD - 13 */}
                    {/* <div className="flex flex-col p-1 text-start w-full lg:w-1/6">
                        <label className="text-base mx-1">Net Premium:</label>
                        <input
                          className="input-style rounded-lg"
                          type="number"
                          value={allDetails.netPremium}
                          onBlur={handleNetPremiumBlur}
                          name="netPremium"
                          placeholder="Net Premium"
                          disabled />
                        <span className="mx-1 text-xs text-green-600">(odPremium + liabilityPremium)</span>
                      </div> */}
                    {/* FIELD - 14 */}
                    {/* <div className="flex flex-col p-1 text-start w-full lg:w-1/6">
                        <label className="text-base mx-1">RSA:</label>
                        <input
                          className="input-style rounded-lg"
                          type="text"
                          value={allDetails.rsa}
                          onChange={handleInputChange}
                          onBlur={calculateFinalAmount}
                          name="rsa"
                        />
                      </div> */}


                    {/* FIELD - 15 */}
                    {/* <div className="flex flex-col p-1 text-start w-full lg:w-1/6">
                        <label className="text-base mx-1">GST(Amount):</label>
                        <input
                          className="input-style rounded-lg"
                          type="text"
                          value={allDetails.taxes}
                          onChange={handleInputChange}
                          onBlur={calculateFinalAmount}
                          name="taxes"
                          placeholder="GST"
                        />
                      </div> */}

                    {/* FIELD - 16 */}
                    {/* <div className="flex flex-col p-1 text-start w-full lg:w-1/6">
                        <label className="text-base mx-1">Final Amount:</label>
                        <input
                          className="input-style rounded-lg"
                          type="text"
                          value={allDetails.finalEntryFields}
                          onChange={handleInputChange}
                          name="finalEntryFields"
                          placeholder=" Final Amount"
                          readOnly
                        />
                      </div> */}
                    {/* FIELD - 17 */}
                    {/* <div className="flex flex-col p-1 text-start w-full lg:w-1/6">
                        <label className="text-base mx-1">OD Discount% :</label>
                        <input
                          className="input-style rounded-lg"
                          type="text"
                          value={allDetails.odDiscount}
                          onChange={handleInputChange}
                          name="odDiscount"
                          placeholder="Enter OD Discount" />
                      </div> */}
                    {/* FIELD - 33 */}
                    {/* <div className="flex flex-col p-1 text-start w-full lg:w-1/6">
                        <label className="text-base mx-1">NCB% :</label>
                        <input
                          className="input-style rounded-lg"
                          type="text"
                          value={allDetails.ncb}
                          onChange={handleInputChange}
                          name="ncb"
                          placeholder="Enter NCB"
                        />
                      </div> */}


                    {/* FIELD - 39 */}
                    {/* <div className="flex flex-col p-1 text-start w-full lg:w-1/6">
                        <label className="text-base mx-1">Policy Payment Mode:</label>
                        <select
                          id="policyPaymentMode"
                          className="input-style p-1 rounded-lg"
                          value={allDetails.policyPaymentMode}
                          onChange={handleInputChange} name="policyPaymentMode">

                          <option className="w-1" value="" >Select Policy Payment Mode</option>
                          {payMode.map((data) => (
                            <option key={data._id} className="w-1" value={data.paymentmode} >{data.paymentmode}</option>
                          ))}
                        </select>
                      </div> */}
                    <div className="flex flex-col p-1 mt-0 text-start w-full lg:w-1/5">
                      <label className="text-base mx-1">State:<span className="text-red-600 font-bold">*</span></label>
                      <select className="input-style flex flex-wrap text-lg p-0.5 rounded-lg" name="selectedState" value={allDetails.selectedState} onChange={handleInputChange}>
                        <option value="">------- Select State -------- </option>
                        {states.map(state => (
                          <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
                        ))}
                      </select>
                    </div>


                    <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/5">
                      <label className="text-base mx-1">District:<span className="text-red-600 font-bold">*</span></label>
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
                          <option value="">-------- Select District ---------</option>
                          <option value="All">All</option>
                          {/* Render other city options here if needed */}
                          {
                            cities.filter(data => citiesToShow.includes(data.name)).map((data, index) => (
                              <option key={index} value={data.name}>{data.name}</option>
                            ))
                          }
                        </select>
                      }
                    </div>

                    {/* FIELD - 9 */}
                    <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/5">
                      <label className="text-base mx-1">Vehicle Reg No:</label>
                      <input
                        className="input-style p-1 rounded-lg"
                        type="text"
                        value={allDetails.vehRegNo}
                        onChange={handleInputChange}
                        name="vehRegNo"
                        placeholder="Enter Vehicle Reg No"
                      />
                    </div>

                    {/* FIELD - 8 */}
                    <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/5">
                      <label className="text-base mx-1">Segment:</label>
                      <select
                        className="input-style p-0.5 text-lg rounded-lg"
                        value={allDetails.segment}
                        onChange={handleInputChange}
                        name="segment"
                      >
                        <option className="w-1" value="">--- Select Segment ---</option>
                        <option value="C V">C V</option>
                        <option value="PVT-CAR">PVT-CAR</option>
                        <option value="TW">TW</option>
                        <option value="HEALTH">HEALTH</option>
                        <option value="NON-MOTOR">NON-MOTOR</option>
                        {/* <option value="LIFE">LIFE</option> */}
                      </select>
                    </div>

                    {
                      allDetails.segment === "PVT-CAR" ? (
                      <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/5">
                      <label className="text-base mx-1">NCB%:<span className="text-red-600 font-bold">*</span></label>
                      <select
                        className="input-style p-1 text-base rounded-lg"
                        type="text"
                        value={allDetails.ncb}
                        name="ncb"
                        onChange={handleInputChange}>
                        <option className="w-1" value="">----------- Select NCB ----------</option>
                        {ncbLists.map((data) => (
                          <option key={data._id} value={data.ncb}>{data.ncb}</option>

                        ))}
                      </select>
                    </div>
                      ):(
                        <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/5">
                        <label className="text-base mx-1">NCB%:<span className="text-red-600 text-sm">Disabled</span></label>
                        <select
                          className="input-style p-1 text-base rounded-lg"
                          type="text"
                          value={allDetails.ncb}
                          name="ncb"
                          onChange={handleInputChange}
                          disabled
                          >
                          <option className="w-1" value="">----------- Select NCB ----------</option>
                          {ncbLists.map((data) => (
                            <option key={data._id} value={data.ncb}>{data.ncb}</option>
  
                          ))}
                        </select>
                      </div>
                      )}
                    
                    
                    {/* FIELD - 5 */}
                    <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/5">
                      <label className="text-base mx-1">Sourcing:</label>
                      <select
                        className="input-style p-0.5 text-lg rounded-lg"
                        value={allDetails.sourcing}
                        onChange={handleInputChange} name="sourcing">

                        <option className="w-1" value="">--- Select Sourcing Type ---</option>
                        <option value="NEW">NEW</option>
                        <option value="RENEWAL">RENEWAL</option>
                        <option value="ROLL OVER">ROLL OVER</option>
                      </select>
                    </div>



                    {/* FIELD - 10 */}
                    <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/5">
                      <label className="text-base mx-1">Policy Start Date:</label>
                      <input
                        className="input-style p-1 rounded-lg"
                        type="date"
                        name="policyStartDate"
                        value={allDetails.policyStartDate}
                        onChange={
                          handlePolicyStartDateChange
                        }
                      />
                    </div>

                    {/* FIELD - 11 */}
                    <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/5">
                      <label className="text-base mx-1">Policy End Date:</label>
                      <input
                        className="input-style p-1 rounded-lg"
                        type="date"
                        value={allDetails.policyEndDate}
                        onChange={handleInputChange}
                        name="policyEndDate"
                        placeholder="Select Policy End Date" />
                    </div>

                    {/* FIELD - 12 */}
                    <div className="flex flex-col mt-4 p-1 text-start w-full lg:w-1/5">
                      <label className="text-base mx-1">OD Expiry:</label>
                      <input
                        className="input-style p-1 rounded-lg"
                        type="date"
                        value={allDetails.odExpiry}
                        onChange={handleInputChange}
                        name="odExpiry"
                        placeholder="Select OD Expiry"
                        min="2025-01-01"
                      />
                    </div>

                    {/* FIELD - 13 */}
                    <div className="flex flex-col mt-4 p-1 text-start w-full lg:w-1/5">
                      <label className="text-base mx-1">TP Expiry:</label>
                      <input
                        className="input-style p-1 rounded-lg"
                        type="date"
                        value={allDetails.tpExpiry}
                        onChange={handleInputChange}
                        name="tpExpiry"
                        min="2025-01-01"
                      />
                    </div>
                    {/* FIELD - 14 */}
                    <div className="flex flex-col mt-4 p-1 text-start w-full lg:w-1/5">
                      <label className="text-base mx-1">IDV:</label>
                      <input
                        className="input-style p-1 rounded-lg"
                        type="text"
                        value={allDetails.idv}
                        onChange={handleInputChange}
                        name="idv"
                        placeholder="Enter IDV" />
                    </div>

                    {/* FIELD - 15 */}
                    <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/5">
                      <label className="text-base mx-1">Body Type:</label>
                      <input
                        className="input-style p-1 rounded-lg"
                        type="text"
                        value={allDetails.bodyType}
                        onChange={handleInputChange}
                        name="bodyType"
                        placeholder="Enter Body Type"
                      />
                    </div>



                    {/* FIELD - 16 */}
                    <div className="flex flex-col mt-4 p-1 text-start w-full lg:w-1/5">
                      <label className="text-base mx-1">Make & Model:</label>
                      <input
                        className="input-style p-1 rounded-lg"
                        type="text"
                        value={allDetails.makeModel}
                        onChange={handleInputChange}
                        name="makeModel"
                      />
                    </div>

                    {/* FIELD - 17 */}
                    <div className="flex flex-col mt-4 p-1 text-start w-full lg:w-1/5">
                      <label className="text-base mx-1">Manufacturing Year:</label>
                      <input
                        className="input-style p-1 rounded-lg"
                        type="text"
                        value={allDetails.mfgYear}
                        onChange={handleYearChange}
                        name="mfgYear"
                        placeholder="Enter Manufacturing Year" />
                    </div>

                    {/* FIELD - 18 */}
                    <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/5">
                      <label className="text-base mx-1">Registration Date:</label>
                      <input
                        className="input-style p-1 rounded-lg"
                        type="date"
                        value={allDetails.registrationDate}
                        onChange={handleInputChange}
                        name="registrationDate"
                        placeholder="Select Registration Date"
                        min="1950-01-01"
                      // max={getLastDayOfPreviousMonth()}
                      />
                    </div>

                    {/* FIELD - 19 */}
                    <div className="flex flex-col  mt-4 p-1 text-start w-full lg:w-1/5">
                      <label className="text-base mx-1">Vehicle Age:</label>
                      <input
                        className="input-style p-1 rounded-lg"
                        type="text"
                        value={allDetails.vehicleAge}
                        name="vehicleAge"
                        readOnly
                      />
                    </div>
                    {/* FIELD - 20 */}
                    {/* <div className="flex flex-col p-1 text-start w-full lg:w-1/6">
                        <label className="text-base mx-1">Fuel:</label>
                        <select
                          className="input-style p-1 rounded-lg"
                          value={allDetails.fuel}
                          onChange={handleInputChange} name="fuel">
                          <option className="w-1" value="" >--- Select Fuel Type ---</option>
                          {
                            fuel.map((data) => (
                              <option className="w-1" key={data._id} value={data.fuels}>{data.fuels}</option>
                            ))
                          }
                        </select>
                      </div> */}
                    {/* FIELD - 21 */}
                    {/* 
                      <div className="flex flex-col mt-4 p-1 text-start w-full lg:w-1/5">
                        <label className="text-base mx-1">GVW (kg):</label>
                        <input
                          className="input-style p-1 rounded-lg"
                          type="text"
                          value={allDetails.gvw}
                          onChange={handleInputChange}
                          name="gvw"
                          placeholder="Enter GVW"
                        />
                      </div> */}
                    {
                      allDetails.segment === "C V" ? (<div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/5">
                        <label className="text-base mx-1">GVW (kg):</label>
                        <input
                          className="input-style p-1 rounded-lg"
                          type="text"
                          value={allDetails.gvw}
                          onChange={handleInputChange}
                          placeholder="Enter GVW"
                          name="gvw"

                        />
                      </div>)
                        : (<div className="flex flex-col p-1 text-start w-full mt-4 lg:w-1/5">
                          <label className="text-base mx-1">GVW (kg):<span className="text-red-600 text-sm">Disabled</span></label>
                          <input
                            className="input-style p-1 rounded-lg"
                            type="text"
                            value={allDetails.gvw}
                            onChange={handleInputChange}
                            name="gvw"
                            placeholder="Disabled"
                            disabled
                          />
                        </div>)
                    }



                    {
                      allDetails.segment === "C V" && (allDetails.productCode === "SCHOOL BUS" || allDetails.productCode === "ROUTE BUS" || allDetails.productCode === "TAXI") ? (<div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/5">
                        <label className="text-base mx-1 ">Seating Capacity:</label>
                        <select
                          className="input-style p-1 text-base rounded-lg"
                          type="text"
                          value={allDetails.sitcapacity}
                          onChange={handleInputChange}
                          name="sitcapacity"
                          placeholder="Enter Sitting Capacity"
                        >
                          <option value="">------ Select Seating -----------</option>
                          {
                            sit && sit.map((data) => (
                              <option key={data._id} value={data.sitcapacity}>{data.sitcapacity}</option>
                            ))
                          }
                          {/* <option value="">NOT APPLICABLE</option> */}
                        </select>
                      </div>)
                        : (<div className="flex flex-col p-1 text-start w-full mt-4 lg:w-1/5">
                          <label className="text-base mx-1">Seating Capacity:<span className="text-red-600 text-sm">Disabled</span></label>
                          <select
                            className="input-style p-1 text-base rounded-lg"
                            type="text"
                            value={allDetails.sitcapacity}
                            onChange={handleInputChange}
                            name="sitcapacity"
                            placeholder="Disabled"
                            disabled

                          >
                            <option value="">------ Select Seating -----------</option>
                            {
                              sit && sit.map((data) => (
                                <option key={data._id} value={data.sitcapacity}>{data.sitcapacity}</option>
                              ))
                            }
                            {/* <option value="">NOT APPLICABLE</option> */}
                          </select>
                        </div>)
                    }


                    {
                      allDetails.segment === "PVT-CAR" || allDetails.segment === "TW" ? (<div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/5">
                        <label className="text-base mx-1">CC:<span className="text-red-600 font-bold">*</span></label>
                        <select
                          className="input-style p-1 rounded-lg"
                          type="text"
                          name="cc"
                          value={allDetails.cc}
                          onChange={handleInputChange}
                          placeholder="Enter CC">
                          <option className="w-1" value="" >----------- Select CC -----------</option>
                          {
                            ccList.map((data) => (
                              <option key={data._id} value={data.cc}>{data.cc}</option>
                            ))
                          }
                        </select>
                      </div>)
                        : (<div className="flex flex-col p-1 text-start w-full mt-4 lg:w-1/5">
                          <label className="text-base mx-1">CC:<span className="text-red-600 text-sm">Disabled</span></label>
                          <select
                            className="input-style p-1 rounded-lg"
                            type="text"
                            name="cc"
                            value={allDetails.cc}
                            onChange={handleInputChange}
                            placeholder="Enter CC"
                            disabled>
                            <option className="w-1" value="" >----------- Select CC -----------</option>
                            {
                              ccList.map((data) => (
                                <option key={data._id} value={data.cc}>{data.cc}</option>
                              ))
                            }
                          </select>
                        </div>)
                    }


                    {/* FIELD - 34*/}
                    {/* <div className="flex flex-col p-1 text-start w-full lg:w-1/6">
                        <label className="text-base mx-1">Advisor Name:</label>
                        <input
                          className="input-style rounded-lg"
                          type="text"
                          value={allDetails.advisorName}
                          onChange={handleInputChange}
                          name="advisorName"
                          placeholder="Enter Advisor Name"
                        />
                      </div> */}

                    {/* FIELD - 35 */}
                    <div className="flex flex-col mt-4 p-1 text-start w-full lg:w-1/5">
                      <label className="text-base mx-1">Sub Advisor:</label>
                      <input
                        className="input-style p-1 rounded-lg"
                        type="text"
                        value={allDetails.subAdvisor}
                        onChange={handleInputChange}
                        name="subAdvisor"
                        placeholder="Enter Sub Advisor"
                      />
                    </div>



                    <div className="flex flex-col p-1 text-start w-full lg:w-1/5"></div>
                    <div className="flex flex-col p-1 text-start w-full lg:w-1/5"></div>
                    <div className="flex flex-col p-1 text-start w-full lg:w-1/5"></div>
                    <div className="flex flex-col p-1 text-start w-full lg:w-1/5"></div>
                  </div>
                  {/* button */}
                  <div className="col-span-4 p-2 mt-4 flex justify-center">
                    <button
                      className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 shadow-lg shadow-green-500/50  font-medium rounded text-sm px-4 py-2 text-center "
                      onClick={updateInsuranceAPI} type="button" > {loading ? "Submitting..." : "Submit"} </button>
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


export default UpdateFinance;
