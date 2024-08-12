/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { State, City } from 'country-state-city';
import axios from "axios";
import MultiStep from "react-multistep";
// import { SlArrowRightCircle, SlArrowLeftCircle } from "react-icons/sl";
import VITE_DATA from "../../../config/config.jsx";
function UpdateMaster({ insurance, onUpdate, onClose }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [sit, setSit] = useState([]);
  const [ncbLists, setNcbLists] = useState([]);
  const [fuelType, setFuelType] = useState([]);
  const [pmade, setPmade] = useState([]);
  const [states, setStates] = useState([]);
  const [advLists, setAdvLists] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [cities, setCities] = useState([]);
  const [odList, setOdList] = useState([]);
  const [ccList, setCCList] = useState([]);
  const [pdata, setPdata] = useState([]);
  const [branchname, setBranchName] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selectedState, setSelectedState] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [selectedCity, setSelectedCity] = useState('');
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
  "West Champaran"];
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

  const [allDetails, setAllDetails] = useState({
    entryDate: '',
    states: '',
    district: '',
    company: '',
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
    rsa: '',
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
    profitLoss: ''
  })


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

          setPmade(response.data);

        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);


  // Function to update netPremium when odPremium or liabilityPremium changes
  const updateNetPremium = () => {
    const odPremiumValue = parseFloat(allDetails.odPremium) || 0;
    const liabilityPremiumValue = parseFloat(allDetails.liabilityPremium) || 0;
    // Calculate netPremium by adding odPremium and liabilityPremium
    const newNetPremium = odPremiumValue + liabilityPremiumValue;
    // Set the updated netPremium value directly
    setAllDetails(prevDetails => ({
      ...prevDetails,
      netPremium: newNetPremium.toFixed(2)
    }));
  };
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

  

 

  // // Calculate taxes with netPremium
  const calculateFinalAmount = () => {
    const netPremiumValue = parseFloat(allDetails.netPremium) || 0;
    const taxesValue = parseFloat(allDetails.taxes) || 0;
    const rsaValue = parseFloat(allDetails.rsa) || 0;
    const finalAmountValue = netPremiumValue + taxesValue + rsaValue;
    if (allDetails.company === "GO-DIGIT") {
      setAllDetails(prevDetails => ({
        ...prevDetails,
        finalEntryFields: finalAmountValue.toFixed(2)
      }));
    } else {
      setAllDetails(prevDetails => ({
        ...prevDetails,
        finalEntryFields: finalAmountValue.toFixed(0)
      }));
    }
  };

  // // Calculate branch payable amount
  const calculateBranchPayableAmount = () => {
    const netPremiumValue = parseFloat(allDetails.netPremium) || 0;
    const branchPayoutValue = parseFloat(allDetails.branchPayout) || 0;
    const branchPayableAmountValue = netPremiumValue - branchPayoutValue;

    setAllDetails(prevDetails => ({
      ...prevDetails,
      branchPayableAmount: branchPayableAmountValue.toFixed(2)
    }));
  };

  // // Calculation of profit/loss
  const calculateProfitLoss = () => {
    const companyPayoutValue = parseFloat(allDetails.companyPayout) || 0;
    const branchPayoutValue = parseFloat(allDetails.branchPayout) || 0;
    const profitLossValue = companyPayoutValue - branchPayoutValue;

    setAllDetails(prevDetails => ({
      ...prevDetails,
      profitLoss: profitLossValue.toFixed(2)
    }));
  };


  // // Final amount set
  const handleNetPremiumBlur = () => {
    if (allDetails.calculationType === 'finalAmount') {
      calculateFinalAmount();
    } else if (allDetails.calculationType === 'branchPayableAmount') {
      calculateBranchPayableAmount();
    }
    // Reset the calculation type after performing the calculation
    setAllDetails(prevDetails => ({
      ...prevDetails,
      calculationType: ''
    }));
  };

  const handlePolicyStartDateChange = (e) => {
    const startDate = e.target.value;
    const odExpiryDate = new Date(startDate);
    odExpiryDate.setFullYear(odExpiryDate.getFullYear() + 1 , odExpiryDate.getMonth(), odExpiryDate.getDate() - 1);
    setAllDetails(prevDetails => ({
      ...prevDetails,
      odExpiry: odExpiryDate.toISOString().split('T')[0]
    }));

    const policyEndDateValue = new Date(startDate);
    policyEndDateValue.setFullYear(policyEndDateValue.getFullYear() + 1,  policyEndDateValue.getMonth(), policyEndDateValue.getDate() - 1);
    setAllDetails(prevDetails => ({
      ...prevDetails,
      policyEndDate: policyEndDateValue.toISOString().split('T')[0]
    }));

    const tpExpiryDate = new Date(startDate);
    tpExpiryDate.setFullYear(tpExpiryDate.getFullYear() + 2, tpExpiryDate.getMonth(), tpExpiryDate.getDate() - 1);
    setAllDetails(prevDetails => ({
      ...prevDetails,
      tpExpiry: tpExpiryDate.toISOString().split('T')[0]
    }));

    setAllDetails(prevDetails => ({
      ...prevDetails,
      policyStartDate: startDate
    }));
  };

  // show all data inside input tag
  useEffect(() => {
    setAllDetails(insurance);
  }, [insurance]);

  // handle input change
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setAllDetails((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

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
      [name]: value,
      // empTime: empTime,
      states: name === 'selectedState' ? value : prevData.selectedState,
      district: name === 'selectedCity' ? value : prevData.selectedCity,
      advId: name === "advId" ? value : prevData.advId,
      advisorName: name === "advId" ? (advLists.find((advisor) => advisor.uniqueId === value)?.advisorname || '') : prevData.advisorName,
    
    }));
  };


  const updateInsuranceAPI = async () => {
    try {
      setLoading(true);
      // Use the selected category ID in the patch method
      const resp = await axios.put(`${VITE_DATA}/alldetails/updatedata/${insurance._id}`, allDetails);
      toast.success(`${resp.data.status}`);
      onClose(); // Close the modal after successful submission
      onUpdate()
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

          <div className="relative p-1 w-10/12 max-w-9xl max-h-7xl mx-auto my-20">
            {/* <!-- Modal content --> */}
            <div className="relative bg-blue-700">
              {/* <!-- Modal header --> */}
              <div className="flex items-center justify-between p-2 md:p-3 rounded-lg ">
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
              <section className="p-4 md:p-3   rounded-lg max-h-auto text-justify overflow-y-auto bg-blue-700">
                <div className="container-fluid font-semibold flex justify-center p-1 border-gray-200 border-dashed rounded-lg  bg-blue-700">
                  <div className="relative w-full lg:w-full p-4 lg:p-1 rounded-xl shadow-xl text-2xl items-center bg-slate-200">
                    <MultiStep activeStep={0} showNavigation={true} className="bg-blue-500 rounded-lg shadow-md flex justify-between  overflow-hidden"
                      stepCustomStyle={{
                        display: "inline",
                        width: "50%",
                        marginBottom: "0"
                      }}
                      titleCustomStyle={{ fontWeight: "bold", color: "blue" }}
                      contentCustomStyle={{ color: "sky" }}
                      prevButton={{
                        title: (
                          <span className="flex justify-start text-base">
                             <img src="/left.png" height={5} width={20} alt="left" className="hover:bg-red-200 mr-1 mx-auto my-auto rounded-full"/> Back
                          </span>
                        ),
                        style: {
                          display: "inline",
                          width: "max-content",
                          background: 'red',
                          color: 'white',
                          fontWeight: '',
                          borderRadius: '10rem',
                          padding: '0.2rem 0.6rem',
                          border: 'none',
                          cursor: 'pointer',
                          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.08)',
                          transition: 'background 1.3s ease',
                          marginRight: 'auto', // Adjusted to marginRight auto
                          marginBottom: '0.5rem',
                          float: 'left'
                        }
                      }}
                      nextButton={{
                        title: (
                          <span className="flex justify-end text-base">Next
                          <img src="/right.png" height={5} width={20} alt="left" className="hover:bg-green-200 ml-1 mx-auto my-auto rounded-full"/>
                          </span>
                        ),
                        style: {
                          display: "inline",
                          width: "max-content",
                          background: 'green',
                          color: 'white',
                          fontWeight: '',
                          borderRadius: '10rem',
                          padding: '0.2rem 0.6rem',
                          border: 'none',
                          cursor: 'pointer',
                          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.08)',
                          transition: 'background 1.3s ease',
                          marginLeft: 'auto', // Adjusted to marginLeft auto
                          marginBottom: '0.5rem',
                          float: 'right'
                        }
                      }}
                    >
                      <div className="flex flex-wrap mb-8 justify-between">
                        {/* FIELD - 1 */}
                        <div className="flex flex-col p-1 text-start w-full lg:w-1/5 ">
                          <label className="text-base mx-1">Entry Date:</label>
                          <input
                            className="input-style p-1 rounded-lg"
                            type="date"
                            value={allDetails.entryDate}
                            onChange={handleInputChange}
                            name="entryDate"
                          />
                        </div>

                        <div className="flex flex-col p-1 text-start w-full lg:w-1/5">
                          <label className="text-base mx-1">Branch:</label>
                          <select
                            id="branch"
                            className="input-style p-1 text-base rounded-lg"
                            value={allDetails.branch}
                            onChange={handleInputChange}
                            name="branch"
                          >
                            <option className="" value="" >----------- Select Branch -----------</option>
                            {
                              branchname.map((item) => (
                                <option value={item.branchname} key={item._id}>{item.branchname}</option>
                              ))
                            }
                          </select>
                        </div>
                        {/* FIELD - 4 */}

                        {/* FIELD - 7 */}
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

                        <div className="flex flex-col p-1 text-start w-full lg:w-1/5">
                          <label className="text-base mx-1">Contact No:</label>
                          <input
                            className="input-style p-1 rounded-lg"
                            type="text"
                            value={allDetails.contactNo}
                            onChange={handleInputChange}
                            name="contactNo"
                            placeholder="Enter Contact No" />
                        </div>

                        <div className="flex flex-col p-1  text-start w-full lg:w-1/5">
                          <label className="text-base mx-1">Policy Made By:</label>
                          <select
                            className="input-style text-base p-1 rounded-lg"
                            value={allDetails.staffName}
                            onChange={handleInputChange}
                            name="staffName"
                          >
                            <option className="w-1" value="" >----------- Policy Made By ----------</option>
                            {
                              pmade.filter(emp => emp.staffType === "OPS Executive" | emp.staffType === "OPS EXECUTIVE")
                                .map((emp) => (
                                  <option key={emp._id} value={emp.empname}>
                                    {emp.empid} - {emp.empname}
                                  </option>
                                ))
                            }
                          </select>
                        </div>

                        <div className="flex flex-col p-1 mt-3 text-start w-full lg:w-1/5">
                          <label className="text-base mx-1">Company Name:</label>
                          <select
                            className="input-style p-1 text-base rounded-lg"
                            value={allDetails.company}
                            onChange={handleInputChange}
                            name="company"
                          >
                            <option className="w-1" value="" >--------- Select Company ----------</option>
                            {pdata.map((comp) => (
                              <option key={comp._id} value={comp.c_type} data-id={comp._id}>
                                {comp.c_type}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="flex flex-col p-1 mt-3 text-start w-full lg:w-1/5">
                          <label className="text-base mx-1">Category:</label>
                          <select
                            className="input-style p-1 text-base rounded-lg"
                            value={allDetails.category}
                            onChange={handleInputChange}
                            name="category"
                          > <option className="w-1" value="" >----------- Select Category ---------</option>
                            <option value="GIC">GIC</option>
                            {/* <option value="LIFE">LIFE</option> */}
                          </select>
                        </div>
                        <div className="flex flex-col p-1 mt-3 text-start w-full lg:w-1/5">
                          <label className="text-base mx-1">Policy Type:</label>
                          <select
                            className="input-style p-1 text-base rounded-lg"
                            value={allDetails.policyType}
                            name="policyType"
                            // onChange={(e) => setPolicyType(e.target.value)}
                            onChange={handleInputChange}
                          > <option value="">--------- Select Policy Type ----------</option>
                            {data.map(prod => (
                              <option key={prod._id} value={prod.p_type}>{prod.p_type}</option>
                            ))}

                          </select>
                        </div>
                        <div className="flex flex-col p-1 mt-3 text-start w-full lg:w-1/5">
                          <label className="text-base mx-1">Product Code:</label>
                          <select
                            id="productCode"
                            className="input-style p-1 text-base rounded-lg"
                            value={allDetails.productCode}
                            onChange={handleInputChange} name="productCode">

                            <option className="w-1" value="" >-------- Select Product Code -------</option>

                            {data.map((policy) => {
                              if (policy.p_type === allDetails.policyType) {
                                return policy.products.map((product, idx) => (
                                  <option key={idx} value={product}>{product}</option>
                                ));
                              }
                              return null;
                            })}
                          </select>
                        </div>

                        <div className="flex flex-col p-1 mt-3 text-start w-full lg:w-1/5">
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
                        <div className="flex flex-col p-1 mt-3 text-start w-full lg:w-1/5">
                          <label className="text-base mx-1">Segment:</label>
                          <select
                            className="input-style p-1 text-base rounded-lg"
                            value={allDetails.segment}
                            onChange={handleInputChange}
                            name="segment"
                          >
                            <option className="w-1" value="" >---------- Select Segment ----------</option>
                            <option value="C V">C V</option>
                            <option value="PVT-CAR">PVT-CAR</option>
                            <option value="TW">TW</option>
                            <option value="HEALTH">HEALTH</option>
                            <option value="NON-MOTOR">NON-MOTOR</option>
                            {/* <option value="LIFE">LIFE</option> */}
                          </select>
                        </div>

                        <div className="flex flex-col p-1 mt-3 text-start w-full lg:w-1/5">
                          <label className="text-base mx-1">State:</label>
                          <select className="input-style text-base flex flex-wrap  p-1 rounded-lg" name="selectedState" value={allDetails.selectedState} onChange={handleInputChange}>
                            <option value="">----------- Select State -----------</option>
                            {states.map(state => (
                              <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
                            ))}
                          </select>
                        </div>


                        <div className="flex flex-col p-1 mt-3 text-start w-full lg:w-1/5">
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
                              <option value="">----------- Select District  -----------</option>
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

                        <div className="flex flex-col p-1 mt-3 text-start w-full lg:w-1/5">
                          <label className="text-base mx-1">Vehicle Reg No:</label>
                          <input
                            className="input-style p-1  rounded-lg"
                            type="text"
                            value={allDetails.vehRegNo}
                            onChange={handleInputChange}
                            name="vehRegNo"
                            placeholder="Enter Vehicle Reg No"
                          />
                        </div>
                        {/* FIELD - 20 */}
                        <div className="flex flex-col p-1 mt-3 text-start w-full lg:w-1/5">
                          <label className="text-base mx-1">Fuel:</label>
                          <select
                            className="input-style p-1 text-base rounded-lg"
                            value={allDetails.fuel}
                            onChange={handleInputChange} name="fuel">
                            <option className="w-1" value="" >----------- Select Fuel Type ----------</option>
                            {
                              fuelType.map((fuel) => (
                                <option key={fuel._id} value={fuel.fuels} >{fuel.fuels}</option>
                              ))
                            }
                          </select>
                        </div>
                        {/* <div className="flex flex-col p-1 mt-3 text-start w-full lg:w-1/5">
                          <label className="text-base mx-1">CC:<span className="text-red-600 font-bold">*</span></label>
                          <select
                            className="input-style p-1 text-base  rounded-lg"
                            type="text"
                            name="cc"
                            value={allDetails.cc}
                            onChange={handleInputChange}
                            placeholder="Enter CC">
                            <option className="" value="" >-------------- Select CC -------------</option>
                            {
                              ccList.map((data) => (
                                <option key={data._id} value={data.cc}>{data.cc}</option>
                              ))
                            }
                          </select>
                        </div> */}
                        {
                          allDetails.segment === "PVT-CAR" || allDetails.segment === "TW" ? (<div className="flex flex-col p-1 mt-3 text-start w-full lg:w-1/5">
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
                            : (<div className="flex flex-col p-1 text-start w-full mt-3 lg:w-1/5">
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

                        <div className="flex flex-col p-1 mt-3 text-start w-full lg:w-1/5">
                          <label className="text-base mx-1">Engine No:</label>
                          <input
                            className="input-style p-1 rounded-lg"
                            type="text"
                            value={allDetails.engNo}
                            onChange={handleInputChange}
                            name="engNo"
                            placeholder="Enter Engine No" />
                        </div>
                        <div className="flex flex-col p-1 mt-3 text-start w-full lg:w-1/5">
                          <label className="text-base mx-1">Chassis No:</label>
                          <input
                            className="input-style p-1 rounded-lg"
                            type="text"
                            value={allDetails.chsNo}
                            onChange={handleInputChange}
                            name="chsNo"
                            placeholder="Enter Chassis No"
                          />
                        </div>
                        {
                          allDetails.segment === "C V" ? (<div className="flex flex-col p-1 mt-3 text-start w-full lg:w-1/5">
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
                            : (<div className="flex flex-col p-1 text-start w-full mt-3 lg:w-1/5">
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
                          allDetails.segment === "C V" && (allDetails.productCode === "SCHOOL BUS" || allDetails.productCode === "ROUTE BUS" || allDetails.productCode === "TAXI") ? (<div className="flex flex-col p-1 mt-3 text-start w-full lg:w-1/5">
                            <label className="text-base mx-1 ">Seating Capacity:</label>
                            <select
                              className="input-style p-1 text-base rounded-lg"
                              type="text"
                              value={allDetails.sitcapacity}
                              onChange={handleInputChange}
                              name="sitcapacity"
                              placeholder="Enter Sitting Capacity"
                            >
                              <option value="">----- Select Seating Capacity -------</option>
                              {
                                sit && sit.map((data) => (
                                  <option key={data._id} value={data.sitcapacity}>{data.sitcapacity}</option>
                                ))
                              }
                              {/* <option value="">NOT APPLICABLE</option> */}
                            </select>
                          </div>)
                            : (<div className="flex flex-col p-1 text-start w-full mt-3 lg:w-1/5">
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
                                <option value="">----- Select Seating Capacity -------</option>
                                {
                                  sit && sit.map((data) => (
                                    <option key={data._id} value={data.sitcapacity}>{data.sitcapacity}</option>
                                  ))
                                }
                                {/* <option value="">NOT APPLICABLE</option> */}
                              </select>
                            </div>)
                        }



                      </div>
                      <div className="flex flex-wrap mb-8 justify-between">
                        <div className="flex flex-col p-1 mt-0 text-start w-full lg:w-1/5">
                          <label className="text-base mx-1">Sourcing:</label>
                          <select
                            className="input-style p-1 text-base rounded-lg"
                            value={allDetails.sourcing}
                            onChange={handleInputChange} name="sourcing">

                            <option className="w-1" value="" >-------- Select Sourcing Type -------</option>
                            <option value="NEW">NEW</option>
                            <option value="RENEWAL">RENEWAL</option>
                            <option value="ROLL OVER">ROLL OVER</option>
                          </select>
                        </div>

                        <div className="flex flex-col p-1 text-start w-full lg:w-1/5">
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
                        <div className="flex flex-col p-1  text-start w-full lg:w-1/5">
                          <label className="text-base mx-1">Policy End Date:</label>
                          <input
                            className="input-style p-1 rounded-lg"
                            type="date"
                            value={allDetails.policyEndDate}
                            onChange={handleInputChange}
                            name="policyEndDate"
                            placeholder="Select Policy End Date" />
                        </div>
                        <div className="flex flex-col p-1  text-start w-full lg:w-1/5">
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
                        <div className="flex flex-col p-1  text-start w-full lg:w-1/5">
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
                        <div className="flex flex-col p-1 mt-3  text-start w-full lg:w-1/5">
                          <label className="text-base mx-1">IDV:</label>
                          <input
                            className="input-style p-1 rounded-lg"
                            type="text"
                            value={allDetails.idv}
                            onChange={handleInputChange}
                            name="idv"
                            placeholder="Enter IDV" />
                        </div>
                        <div className="flex flex-col p-1 mt-3 text-start w-full lg:w-1/5">
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
                        <div className="flex flex-col p-1 text-start mt-3 w-full lg:w-1/5">
                          <label className="text-base mx-1">Make & Model:</label>
                          <input
                            className="input-style p-1 rounded-lg"
                            type="text"
                            value={allDetails.makeModel}
                            onChange={handleInputChange}
                            name="makeModel"
                          />
                        </div>
                        <div className="flex flex-col p-1 mt-3 text-start w-full lg:w-1/5">
                          <label className="text-base mx-1">Manufacturing Year:</label>
                          <input
                            className="input-style p-1 rounded-lg"
                            type="text"
                            value={allDetails.mfgYear}
                            onChange={handleYearChange}
                            name="mfgYear"
                            placeholder="Enter Manufacturing Year" />
                        </div>

                        <div className="flex flex-col p-1 mt-3 text-start w-full lg:w-1/5">
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
                        <div className="flex flex-col p-1 mt-3 text-start w-full lg:w-1/5">
                          <label className="text-base mx-1">Vehicle Age:</label>
                          <input
                            className="input-style p-1 rounded-lg"
                            type="text"
                            value={allDetails.vehicleAge}
                            name="vehicleAge"
                            readOnly
                          />
                        </div>
                        {
                          insurance.policyType === "SATP" ? (<div className="flex flex-col p-1 mt-3  text-start w-full lg:w-1/5">
                            <label className="text-base mx-1">OD Premium:</label>
                            <input
                              className="input-style p-1 rounded-lg"
                              type="number"
                              value={allDetails.odPremium}
                              onChange={handleInputChange}
                              placeholder="Disabled"
                              name="odPremium"
                              onBlur={updateNetPremium}
                              disabled
                            />
                          </div>) : (<div className="flex flex-col p-1 mt-3  text-start w-full lg:w-1/5">
                            <label className="text-base mx-1">OD Premium:</label>
                            <input
                              className="input-style p-1 rounded-lg"
                              type="number"
                              value={allDetails.odPremium}
                              onChange={handleInputChange}
                              name="odPremium"
                              placeholder="Enter OD Premium"
                              onBlur={updateNetPremium}
                            />
                          </div>)}

                        {
                          allDetails.policyType === "SAOD" ? (<div className="flex flex-col p-1 mt-3  text-start w-full lg:w-1/5">
                            <label className="text-base mx-1">Liability Premium:</label>
                            <input
                              className="input-style p-1 rounded-lg"
                              type="number"
                              value={allDetails.liabilityPremium}
                              onChange={handleInputChange}
                              placeholder="Disabled"
                              onBlur={updateNetPremium}
                              name="liabilityPremium"
                              disabled
                            />
                          </div>)
                            : (<div className="flex flex-col p-1 mt-3  text-start w-full lg:w-1/5">
                              <label className="text-base mx-1">Liability Premium:</label>
                              <input
                                className="input-style p-1 rounded-lg"
                                type="number"
                                value={allDetails.liabilityPremium}
                                onChange={handleInputChange}
                                onBlur={updateNetPremium}
                                name="liabilityPremium"
                              />
                            </div>)
                        }

                        <div className="flex flex-col p-1 mt-3  text-start w-full lg:w-1/5">
                          <label className="text-base mx-1">Net Premium:</label>
                          <input
                            className="input-style p-1 rounded-lg"
                            type="number"
                            value={allDetails.netPremium}
                            onBlur={handleNetPremiumBlur}
                            name="netPremium"
                            placeholder="Net Premium"
                            readOnly />
                          <span className="mx-1 text-xs text-green-600">(odPremium + liabilityPremium)</span>
                        </div>

                        <div className="flex flex-col p-1 mt-3  text-start w-full lg:w-1/5">
                          <label className="text-base mx-1">GST:</label>
                          <input
                            className="input-style p-1 rounded-lg"
                            type="text"
                            value={allDetails.taxes}
                            onChange={handleInputChange}
                            onBlur={calculateFinalAmount}
                            name="taxes"
                            placeholder="GST"
                          />
                        </div>
                        <div className="flex flex-col p-1 text-start w-full lg:w-1/5">
                          <label className="text-base mx-1">RSA:</label>
                          <input
                            className="input-style p-1 rounded-lg"
                            type="text"
                            value={allDetails.rsa}
                            onChange={handleInputChange}
                            onBlur={calculateFinalAmount}
                            name="rsa"
                            placeholder="RSA"
                          />

                        </div>

                        <div className="flex flex-col p-1 mt-1 text-start w-full lg:w-1/5">
                          <label className="text-base mx-1">Final Amount:</label>
                          <input
                            className="input-style p-1 rounded-lg"
                            type="text"
                            value={allDetails.finalEntryFields}
                            onChange={handleInputChange}
                            name="finalEntryFields"
                            placeholder=" Final Amount"
                            readOnly
                          />
                        </div>
                        <div className="flex flex-col p-1 mt-1 text-start w-full lg:w-1/5">
                          <label className="text-base mx-1">OD Discount%:<span className="text-red-600 font-bold">*</span></label>
                          <select
                            className="input-style p-1 rounded-lg"
                            type="text"
                            name="odDiscount"
                            value={allDetails.odDiscount}
                            onChange={handleInputChange}
                            placeholder="Enter OD Discount"
                          >
                            <option className="w-1" value="" >-------- Select OD Discount --------</option>
                            {
                              odList.map((data) => (
                                <option key={data._id} value={data.odDiscount} > {data.odDiscount}% </option>
                              ))
                            }
                          </select>
                        </div>


                        {
                          allDetails.segment === "PVT-CAR" ? (<div className="flex flex-col p-1 mt-1 text-start w-full lg:w-1/5">
                            <label className="text-base mx-1">NCB%:<span className="text-red-600 font-bold">*</span></label>
                            <select
                              className="input-style p-1 text-base rounded-lg"
                              type="text"
                              name="ncb"
                              value={allDetails.ncb}
                              onChange={handleInputChange}
                            >
                              <option className="w-1" value="" >-------------- Select NCB -------------</option>
                              {
                                ncbLists.map((data) => (
                                  <option key={data._id} value={data.ncb}>{data.ncb}</option>
                                ))
                              }
                            </select>
                          </div>)
                            : (<div className="flex flex-col p-1 text-start w-full mt-1 lg:w-1/5">
                              <label className="text-base mx-1">NCB%:<span className="text-red-600 text-sm">Disabled</span></label>
                              <select
                                className="input-style p-1 text-base rounded-lg"
                                type="text"
                                name="ncb"
                                value={allDetails.ncb}
                                onChange={handleInputChange}
                                disabled
                              >
                                <option className="w-1" value="" >-------------- Select NCB -------------</option>
                                {
                                  ncbLists.map((data) => (
                                    <option key={data._id} value={data.ncb}>{data.ncb}</option>
                                  ))
                                }
                              </select>
                            </div>)
                        }


                        <div className="flex flex-col p-1 mt-1 text-start w-full lg:w-1/5">
                          <label className="text-base mx-1">Policy Payment Mode:</label>
                          <select
                            id="policyPaymentMode"
                            className="input-style p-1 text-base rounded-lg"
                            value={allDetails.policyPaymentMode}
                            onChange={handleInputChange} name="policyPaymentMode">
                            <option className="w-1" value="" >-- Select Policy Payment Mode --</option>
                            <option value="LINK">LINK</option>
                            <option value="ONLINE">ONLINE</option>
                            <option value="CREDIT CARD">CREDIT CARD</option>
                            <option value="NET BANKING">NET BANKING</option>
                            <option value="CHQ">CHQ</option>
                            <option value="CUSTOMER LINK">CUSTOMER LINK</option>
                            <option value="FLOAT PAYMENT">FLOAT PAYMENT</option>
                            <option value="UPI">UPI</option>
                            <option value="QR SCAN">QR SCAN</option>
                            <option value="DD">DD</option>
                            <option value="NEFT">NEFT</option>
                            <option value="RTGS">RTGS</option>
                          </select>
                        </div>


                      </div>
                      <div className="flex flex-wrap justify-between">

                        <div className="flex flex-col p-1 text-start w-full lg:w-1/5">
                          <label className="text-base mx-1">Advisor Name:</label>
                          <select
                            className="input-style p-1 text-base rounded-lg"
                            type="text"
                            value={allDetails.advId}
                            onChange={handleInputChange}
                            name="advId"
                            placeholder="Enter Advisor Name"
                          >
                            <option value="data">------------- Select Advisor -----------</option>
                            {advLists.filter((emp)=> emp.branch[0] === allDetails.branch).sort((a, b) => a.advisorname.localeCompare(b.advisorname)).map((data) => (
                              <option key={data._id} value={data.uniqueId}>{`${data.uniqueId} --> ${data.branch[0]}  -->  ${data.advisorname}  --> ${data.advisoraddress}`}</option>
                            ))}

                          </select>
                        </div>
                        {/* FIELD - 38 */}
                        <div className="flex flex-col p-1  text-start w-full lg:w-1/5">
                          <label className="text-base mx-1">Payout On:</label>
                          <select
                            id="payoutOn"
                            className="input-style p-1 text-base rounded-lg"
                            value={allDetails.payoutOn}
                            onChange={handleInputChange} name="payoutOn">
                            <option className="w-1" value="" >---------- Select Payout on ----------</option>
                            <option value="NET">NET</option>
                            <option value="OD">OD</option>
                            <option value="LIABILITY">LIABILITY</option>
                          </select>
                        </div>
                        <div className="flex flex-col p-1  text-start w-full lg:w-1/5">
                          <label className="text-base mx-1">Advisor Payable Amount:</label>
                          <input
                            className="input-style p-1 rounded-lg"
                            type="number"
                            value={allDetails.advisorPayableAmount}
                            onChange={handleInputChange}
                            name="advisorPayableAmount"
                            placeholder="Advisor Payable Amount" />
                        </div>
                        <div className="flex flex-col p-1  text-start w-full lg:w-1/5">
                          <label className="text-base mx-1">Branch Payout:</label>
                          <input
                            className="input-style p-1 rounded-lg"
                            type="number"
                            value={allDetails.branchPayout}
                            onChange={handleInputChange}
                            name="branchPayout"
                            onBlur={() => {

                              calculateBranchPayableAmount();
                              calculateProfitLoss();
                            }}
                            placeholder="Enter Branch Payout"
                          />
                        </div>
                        <div className="flex flex-col p-1  text-start w-full lg:w-1/5">
                          <label className="text-base mx-1">Branch Payable Amount: </label>
                          <input
                            className="input-style p-1 rounded-lg"
                            type="text"
                            value={allDetails.branchPayableAmount}
                            onChange={handleInputChange}
                            name="branchPayableAmount"
                            placeholder="Branch Payable Amount"
                            readOnly
                          />
                          <span className="text-xs mx-1 text-red-600" >(netpremium - branchpayout)</span>
                        </div>

                        <div className="flex flex-col p-1  text-start w-full lg:w-1/5">
                          <label className="text-base mx-1">Company Payout:</label>
                          <input
                            className="input-style p-1 rounded-lg"
                            type="number"
                            value={allDetails.companyPayout}
                            onChange={handleInputChange}
                            name="companyPayout"
                            onBlur={calculateProfitLoss}
                            placeholder="Enter Company Payout" />
                        </div>
                        <div className="flex flex-col p-1 mt-1 text-start w-full lg:w-1/5">
                          <label className="text-base mx-1">Profit/Loss Amount:</label>
                          <input
                            className="input-style p-1 rounded-lg"
                            type="text"
                            value={allDetails.profitLoss}
                            onChange={handleInputChange}
                            name="profitLoss"
                            placeholder="Profit/Loss Amount"
                            readOnly
                          />
                          <span className="text-xs mx-1 text-red-600">(companypayout - branchpayout)</span>
                        </div>

                        {/* FIELD - 40 */}
                        <div className="flex flex-col p-1 mt-1 text-start w-full lg:w-1/5">
                          <label className="text-base  mx-1">Payment Done By:</label>
                          <select
                            className="input-style p-1 text-base rounded-lg"
                            value={allDetails.paymentDoneBy}
                            onChange={handleInputChange}
                            name="paymentDoneBy"
                          >
                            <option className="w-1" value="" >---- Select Payment Done By -------</option>
                            <option value="ELEEDOM IMF PVT LTD">ELEEDOM IMF PVT LTD</option>
                            <option value="HAJIPUR BRANCH">HAJIPUR BRANCH</option>
                            <option value="SAMASTIPUR BRANCH">SAMASTIPUR BRANCH</option>
                            <option value="PATNA BRANCH">PATNA BRANCH</option>
                            <option value="CUSTOMER">CUSTOMER</option>
                          </select>
                        </div>
                        <div className="flex flex-col p-1 mt-1 text-start w-full lg:w-1/5">
                          <label className="text-base mx-1">CHQ No / Ref No.:</label>
                          <input
                            className="input-style p-1 rounded-lg"
                            type="text"
                            value={allDetails.chqNoRefNo}
                            onChange={handleInputChange}
                            name="chqNoRefNo"
                            placeholder="Enter CHQ No / Ref No."
                          />
                        </div>
                        <div className="flex flex-col p-1 mt-1 text-start w-full lg:w-1/5">
                          <label className="text-base mx-1">Bank Name:</label>
                          <select
                            id="bankName"
                            className="input-style p-1 text-base rounded-lg"
                            value={allDetails.bankName}
                            onChange={handleInputChange} name="bankName">
                            <option className="w-1" value="" >------------ Select Bank ------------</option>
                            <option value="HDFC BANK">HDFC BANK</option>
                            <option value="ICICI BANK">ICICI BANK</option>
                            <option value="SBI">SBI</option>
                            <option value="PNB">PNB</option>
                            <option value="CANARA">CANARA</option>
                            <option value="AXIS BANK">AXIS BANK</option>
                            <option value="BOB">BOB</option>
                            <option value="BOI">BOI</option>
                            <option value="IDBI">IDBI</option>
                          </select>
                        </div>
                        {/* FIELD - 43 */}
                        <div className="flex flex-col p-1 mt-1 text-start w-full lg:w-1/5">
                          <label className="text-base mx-1">CHQ / Payment Date:</label>
                          <input
                            className="input-style p-1 rounded-lg"
                            type="date"
                            value={allDetails.chqPaymentDate}
                            onChange={handleInputChange}
                            name="chqPaymentDate"
                            placeholder="Select CHQ / Payment Date"
                          />
                        </div>

                        {/* FIELD - 44 */}
                        <div className="flex flex-col p-1 mt-1 text-start w-full lg:w-1/5">
                          <label className="text-base mx-1">CHQ Status:</label>
                          <select
                            className="input-style p-1 text-base rounded-lg"
                            value={allDetails.chqStatus}
                            onChange={handleInputChange}
                            name="chqStatus"
                          >
                            <option className="w-1" value="">-------- Select CHQ Status --------</option>
                            <option value="PENDING">PENDING</option>
                            <option value="SUBMITTED TO BRANCH">SUBMITTED TO BRANCH</option>
                            <option value="CLEAR FROM BANK">CLEAR FROM BANK</option>
                            <option value="BCQ">BCQ</option>
                            <option value="SUBMITTED TO BANK">SUBMITTED TO BANK</option>
                          </select>
                        </div>
                        <div className="flex flex-col p-1 text-start w-full lg:w-1/5"></div>
                        <div className="flex flex-col p-1 text-start w-full lg:w-1/5"></div>
                        <div className="flex flex-col p-1 text-start w-full lg:w-1/5"></div>
                        <div className="flex flex-col p-1 text-start w-full lg:w-1/5"></div>

                        <div className="mt-8 p-2 flex justify-center lg:w-full w-full">
                          <button className="text-white  bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded text-sm px-4 py-2 text-center"
                            onClick={updateInsuranceAPI} type="button" > {loading ? "Submitting..." : "Submit"} </button>
                        </div>

                      </div>
                    </MultiStep>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
    </>
  );
}
export default UpdateMaster;