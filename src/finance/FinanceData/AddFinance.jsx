import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import MultiStep from "react-multistep";
// import { SlArrowRightCircle, SlArrowLeftCircle } from "react-icons/sl";
import { State, City } from 'country-state-city';
import axios from "axios";
import VITE_DATA from "../../config/config.jsx";
function AddFinance() {
  const [sitcapacity, setSitCapacity] = useState('');
  const [sits, setSit] = useState([]);
  const [filteredAdvLists, setFilteredAdvLists] = useState([]);
  const [entryDate, setEntryDate] = useState('');
  const [company, setCompany] = useState('');
  const [category, setCategory] = useState('');
  const [segment, setSegment] = useState('');
  const [sourcing, setSourcing] = useState('');
  const [policyNo, setPolicyNo] = useState('');
  const [insuredName, setInsuredName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [vehRegNo, setVehRegNo] = useState('');
  const [policyStartDate, setPolicyStartDate] = useState('');
  const [policyEndDate, setPolicyEndDate] = useState('');
  const [odExpiry, setOdExpiry] = useState('');
  const [tpExpiry, setTpExpiry] = useState('');
  const [idv, setIdv] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [makeModel, setMakeModel] = useState('');
  const [mfgYear, setMfgYear] = useState('');
  const [registrationDate, setRegistrationDate] = useState("0");
  const [vehicleAge, setVehicleAge] = useState('');
  const [fuel, setFuel] = useState('');
  const [gvw, setGvw] = useState('');
  const [rsa, setRSA] = useState('');
  const [cc, setCc] = useState('');
  const [engNo, setEngNo] = useState('');
  const [chsNo, setChsNo] = useState('');
  const [policyType, setPolicyType] = useState('');
  const [productCode, setProductCode] = useState('');
  const [odPremium, setOdPremium] = useState('');
  const [liabilityPremium, setLiabilityPremium] = useState('');
  const [netPremium, setNetPremium] = useState('');
  const [finalEntryFields, setFinalEntryFields] = useState('');
  const [taxes, setTaxes] = useState('');
  const [odDiscount, setOdDiscount] = useState('');
  const [ncb, setNcb] = useState('');
  const [advisorName, setAdvisorName] = useState('');
  const [subAdvisor, setSubAdvisor] = useState('');
  const [staffName, setStaffName] = useState('');
  const [branch, setBranch] = useState('');
  const [payoutOn, setPayoutOn] = useState('');
  const [calculationType, setCalculationType] = useState('');
  const [policyPaymentMode, setPolicyPaymentMode] = useState('');
  const [paymentDoneBy, setPaymentDoneBy] = useState('');
  const [chqNoRefNo, setChqNoRefNo] = useState('');
  const [bankName, setBankName] = useState('');
  const [chqPaymentDate, setChqPaymentDate] = useState('');
  const [chqStatus, setChqStatus] = useState('');
  const [advisorPayableAmount, setAdvisorPayableAmount] = useState('');
  const [branchPayout, setBranchPayout] = useState('');
  const [branchPayableAmount, setBranchPayableAmount] = useState('');
  const [companyPayout, setCompanyPayout] = useState('');
  const [profitLoss, setProfitLoss] = useState('');
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [pdata, setPdata] = useState([]);
  const [APIData, setAPIData] = useState([]);
  const [catTypesForSelectedPolicy, setCatTypesForSelectedPolicy] = useState([]);
  const [fuelType, setFuelType] = useState([]);
  // const [payoutOnList, setPayoutOnList] = useState([]);
  const [payMode, setPayMode] = useState([]);
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [section1Filled, setSection1Filled] = useState(false);
  const [states, setStates] = useState([]);
  const [advLists, setAdvLists] = useState([]);
  const [advId, setAdvId] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [cities, setCities] = useState([]);
  const [odList, setOdList] = useState([]);
  const [ccList, setCCList] = useState([]);
  const [branchname, setBranchName] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  // const [section2Filled, setSection2Filled] = useState(false);
  const [step, setSteps] = useState(0);
  const [ncbList, setNcbLists] = useState([]);

  if (step === 0 && section1Filled) {
    setSteps(1);
  }

  useEffect(() => {
    // Fetch and set states for India when component mounts
    const fetchStates = () => {
      const indiaStates = State.getStatesOfCountry("IN"); // Assuming "IN" is the country code for India
      setStates(indiaStates);
    };

    fetchStates();
  }, []);

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

  const handleStateChange = (e) => {
    const stateIsoCode = e.target.value;
    setSelectedState(stateIsoCode);

    // Fetch and set cities based on selected state
    const fetchCities = () => {
      const stateCities = City.getCitiesOfState("IN", stateIsoCode); // Assuming "IN" is the country code for India
      setCities(stateCities);
    };

    fetchCities();
  };

  // Function to check if all fields in section 1 are filled
  const checkSection1Filled = () => {
    if (
      entryDate &&
      branch &&
      insuredName &&
      contactNo &&
      staffName &&
      company &&
      category &&
      policyType &&
      policyNo &&
      engNo &&
      chsNo
    ) {
      setSection1Filled(true);
    } else {
      setSection1Filled(false);
    }
  };
  // Call the check functions whenever any of the required fields change
  useEffect(() => {
    checkSection1Filled();
  });
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
  }, [formSubmitted]);

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
  }, [formSubmitted]);

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
        .get(`${VITE_DATA}/view/payment/mode`, {
          headers: {
            Authorization: `${token}`, // Send the token in the Authorization header
          },
        })
        .then((response) => {
          setPayMode(response.data);
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

          setAPIData(response.data);

        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [formSubmitted]);

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
    axios.get(`${VITE_DATA}/view/company/lists`)
      .then((resp) => {
        const cType = resp.data;

        setPdata(cType);
      })
      .catch((error) => {
        console.error("Error fetching company names:", error);
      });
  }, []);

// filter advisor based on branch
  useEffect(() => {
    if (branch) {
      const filteredAdvisors = advLists.filter((adv) => adv.branch[0] === branch);
      setFilteredAdvLists(filteredAdvisors);
    }
  }, [branch, advLists]);


  // Function to update netPremium when odPremium or liabilityPremium changes
  const updateNetPremium = () => {
    const odPremiumValue = parseFloat(odPremium) || 0;
    const liabilityPremiumValue = parseFloat(liabilityPremium) || 0;
    // Calculate netPremium by adding odPremium and liabilityPremium
    const newNetPremium = odPremiumValue + liabilityPremiumValue;
    // Set the updated netPremium value directly
    setNetPremium(newNetPremium);
  };

  
  const calculateAge = (year) => {
    if (!year) {
      setVehicleAge("Enter MFG Year");
      return;
    }

    const currentYear = new Date().getFullYear();
    const birthYearInt = parseInt(year, 10);

    if (isNaN(birthYearInt)) {
      setVehicleAge("Invalid year");
      return;
    }

    let calculatedAge = currentYear - birthYearInt;

    setVehicleAge(`${calculatedAge} years`);
  };

  useEffect(() => {
    calculateAge(mfgYear);
  }, [mfgYear]);

  const handleMfgYearChange = (event) => {
    const year = event.target.value;
    setMfgYear(year);
  };

  // calculate taxes with netPremium
  const calculateFinalAmount = () => {
    const netPremiumValue = parseFloat(netPremium) || 0;
    const taxesValue = parseFloat(taxes) || 0;
    const rsaValue = parseFloat(rsa) || 0;
    const finalAmountValue = netPremiumValue + taxesValue + rsaValue;
    if(company === "GO-DIGIT"){
      setFinalEntryFields(finalAmountValue.toFixed(2));
    }else{
      setFinalEntryFields(finalAmountValue.toFixed(0));
    }
  };

  // calculate branch payable amount
  const calculateBranchPayableAmount = () => {
    const netPremiumValue = parseFloat(netPremium) || 0;
    const branchPayoutValue = parseFloat(branchPayout) || 0;

    const branchPayableAmountValue = netPremiumValue - branchPayoutValue;

    setBranchPayableAmount(branchPayableAmountValue.toFixed(2)); // Assuming you want to display the amount with two decimal places
  };

  useEffect(() => {
    calculateFinalAmount();
  },);


  // final amount set
  const handleNetPremiumBlur = () => {
    if (calculationType === 'finalAmount') {
      calculateFinalAmount();
    } else if (calculationType === 'branchPayableAmount') {
      calculateBranchPayableAmount();
    }
    // Reset the calculation type after performing the calculation
    setCalculationType('');
  };


  const handlePolicyStartDateChange = (e) => {
    const startDate = e.target.value;
    // Update odExpiry by adding 1 year to the selected policyStartDate
    const odExpiryDate = new Date(startDate);
    // odExpiryDate.setFullYear(odExpiryDate.getFullYear() + 1);
    odExpiryDate.setFullYear(odExpiryDate.getFullYear() + 1, odExpiryDate.getMonth(), odExpiryDate.getDate() - 1);
    setOdExpiry(odExpiryDate.toISOString().split('T')[0]);
    // Update policyEndDate by adding 1 year to the selected policyStartDate
    const policyEndDateValue = new Date(startDate);
    policyEndDateValue.setFullYear(policyEndDateValue.getFullYear() + 1, policyEndDateValue.getMonth(), policyEndDateValue.getDate() - 1);
    setPolicyEndDate(policyEndDateValue.toISOString().split('T')[0]);
    // Update TP Expiry by adding 1 year to the selected policyStartDate
    const tpExpiryDate = new Date(startDate);
    tpExpiryDate.setFullYear(tpExpiryDate.getFullYear() + 1, tpExpiryDate.getMonth(), tpExpiryDate.getDate() - 1);
    setTpExpiry(tpExpiryDate.toISOString().split('T')[0]);
    // Set the selected policyStartDate
    setPolicyStartDate(startDate);
  };






  // Handle form submission logic here
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formSubmitted) {
      return;
    }
    setErrors({}); // Clear previous errors

    const errors = {};
    if (!entryDate) {
      errors.entryDate = "required*";
    }
    if (!insuredName) {
      errors.insuredName = "required*";
    }
    if (!company) {
      errors.company = "required*";
    }

    if (!branch) {
      errors.branch = "required*";
    }
    if (!policyNo) {
      errors.policyNo = "required*";
    }
    if (!engNo) {
      errors.engNo = "required*";
    }
    if (!chsNo) {
      errors.chsNo = "required*";
    }
    if (!policyType) {
      errors.policyType = "required*";
    }

    if (!taxes) {
      errors.taxes = "required*";
    }
    if (!segment) {
      errors.segment = "required*";
    }
    if (!sourcing) {
      errors.sourcing = "required*";
    }
    if (!policyPaymentMode) {
      errors.policyPaymentMode = "required*";
    }
    // if (!vehRegNo) {
    //   errors.vehRegNo = "required*";
    // }
    if (!policyStartDate) {
      errors.policyStartDate = "required*";
    }
    if (!policyEndDate) {
      errors.policyEndDate = "required*";
    }
    // if (!odDiscount) {
    //   errors.odDiscount = "required*";
    // }
    // if (!ncb) {
    //   errors.ncb = "required*";
    // }
    // if (!contactNo) {
    //   errors.contactNo = "required*";
    // }

    // if (!bodyType) {
    //   errors.bodyType = "required*";
    // }
    if (!makeModel) {
      errors.makeModel = "required*";
    }
    if (!mfgYear) {
      errors.mfgYear = "required*";
    }
    // if (!gvw) {
    //   errors.gvw = "required*";
    // }
    // if (!cc) {
    //   errors.cc = "required*";
    // }


    if (!productCode) {
      errors.productCode = "required*";
    }
    if (!advisorName) {
      errors.advisorName = "required*";
    }

    // if (!registrationDate) {
    //   errors.registrationDate = "required*";
    // }
    // if (!staffName) {
    //   errors.staffName = "required*";
    // }
    // if (Object.keys(errors).length > 0) {
    //   setErrors(errors);
    //   return;
    // }

    try {
      // Make sure to replace this URL with your actual API endpoint
      const response = await axios.post(`${VITE_DATA}/alldetails/adddata`, {
        entryDate,
        company,
        category,
        segment,
        sourcing,
        policyNo,
        insuredName,
        contactNo,
        vehRegNo,
        rsa,
        policyStartDate,
        policyEndDate,
        odExpiry,
        tpExpiry,
        idv,
        bodyType,
        makeModel,
        mfgYear,
        registrationDate,
        vehicleAge,
        fuel,
        gvw,
        cc,
        engNo,
        chsNo,
        policyType,
        productCode,
        odPremium,
        liabilityPremium,
        netPremium,
        finalEntryFields,
        odDiscount,
        ncb,
        advisorName,
        advId,
        subAdvisor,
        staffName,
        branch,
        payoutOn,
        taxes,
        policyPaymentMode,
        paymentDoneBy,
        chqNoRefNo,
        bankName,
        chqPaymentDate,
        chqStatus,
        advisorPayableAmount,
        branchPayout,
        branchPayableAmount,
        companyPayout,
        profitLoss,
        states: selectedState,
        district: selectedCity,
      });

      if (response.data) {
        toast.success("Data Added Successfully !");
        setFormSubmitted(true);
        setEntryDate("");
        setInsuredName("");
        setContactNo("");
        setBranch("");
        setSelectedCity("");
        setSelectedState("");
        setStaffName("");
        setSegment("");
        setCompany("");
        setCategory("");
        setSourcing("");
        setPolicyNo("");
        setVehRegNo("");
        setRSA("");
        setPolicyStartDate("");
        setPolicyEndDate("");
        setOdExpiry("");
        setTpExpiry("");
        setIdv("");
        setBodyType("");
        setMakeModel("");
        setMfgYear("");
        setRegistrationDate("");
        setVehicleAge("");
        setFuel("");
        setGvw("");
        setCc("");
        setEngNo("");
        setChsNo("")
        setPolicyType("");
        setProductCode("");
        setOdPremium("");
        setLiabilityPremium("");
        setNetPremium("");
        setFinalEntryFields("");
        setOdDiscount("");
        setNcb("");
        setAdvisorName("");
        setSubAdvisor("");
        setAdvId("");
        setBranch("");
        setPayoutOn("");
        setTaxes("");
        setPolicyPaymentMode("");
        setPaymentDoneBy("");
        setChqNoRefNo("");
        setBankName("");
        setChqPaymentDate("");
        setChqStatus("");
        setAdvisorPayableAmount("");
        setBranchPayout("");
        setBranchPayableAmount("");
        setCompanyPayout("");
        setProfitLoss("");
      }
      else {
        toast.error("Error Occurred. Try again...! ");
      }
    } catch (error) {
      console.error("Error during branch registration:", error.response);
    } finally {
      setFormSubmitted(false);
    }
  };

  return (
    <section className="container-fluid relative  p-0 sm:ml-40 bg-white">
      <div className="container-fluid  justify-center p-1 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-white">
      <h1 className="font-semibold text-2xl my-2 text-blue-700">Create Policy</h1>
        <div className="relative w-full lg:w-full p-0  rounded-xl shadow-xl text-2xl items-center bg-slate-200">
        
          <MultiStep activeStep={step} showNavigation={true} className="bg-blue-700 rounded-lg shadow-md flex justify-between mt-0 overflow-hidden"
            stepCustomStyle={{
              display: "inline",
              width: "50%",
              marginBottom: "0"
            }}
            titleCustomStyle={{ fontWeight: "bold", color: "#2D3748" }}
            contentCustomStyle={{ color: "#2D3748" }}
            prevButton={{
              title: (
                <span className="flex justify-start text-base" >
                   <img src="/left.png" height={5} width={20} alt="left" className="hover:bg-red-200 mr-1 mx-auto my-auto rounded-full"/>
                   Back
                </span>
              ),
              style: {
                display: "inline",
                width: "max-content",
                background: 'red',
                color: 'white',
                fontWeight: '',
                borderRadius: '12rem',
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
                <span className="flex justify-end text-base" >Next
                  
                  <img src="/right.png" height={5} width={20} alt="left" className="hover:bg-green-200 ml-1 mx-auto my-auto rounded-full"/>
                </span>
              ),
              style: {
                display: "inline",
                width: "max-content",
                background: 'green',
                color: 'white',
                fontWeight: '',
                borderRadius: '12rem',
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




            {/* step -1 */}
            <div className="flex flex-wrap mb-10 justify-between transition-all duration-2000 ease-in-out">
              {/* FIELD - 1 */}
              <div className="flex flex-col p-1 text-start w-full lg:w-1/5">
                <label className="text-base mx-1">Entry Date:<span className="text-red-600 font-bold">*</span></label>
                <input
                  className="input-style p-1 rounded-lg"
                  type="date"
                  name="entryDate"
                  value={entryDate}
                  onChange={(e) => setEntryDate(e.target.value)}
                  placeholder="Select Entry Date"
                />
                {errors.entryDate && <span className="text-red-600 text-sm ">{errors.entryDate}</span>}
              </div>
              {/* FIELD - 2 */}
              <div className="flex flex-col p-1 text-start w-full lg:w-1/5">
                <label className="text-base mx-1">Branch:<span className="text-red-600 font-bold">*</span></label>
                <select
                  id="branch" name="branch"
                  className="input-style p-1 text-base rounded-lg"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}>
                  <option className="w-1" value="" >------------- Select Branch ------------</option>
                  {
                    branchname.map((item) => (
                      <option value={item.branchname} key={item._id}>{item.branchname}</option>
                    ))
                  }
                </select>
                {errors.branch && <span className="text-red-600 text-sm ">{errors.branch}</span>}
              </div>
              {/* FIELD - 3 */}
              <div className="flex flex-col p-1 text-start w-full lg:w-1/5">
                <label className="text-base mx-1">Insured Name:<span className="text-red-600 font-bold">*</span></label>
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

              {/* FIELD - 4 */}
              <div className="flex flex-col p-1 text-start w-full lg:w-1/5">
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

              {/* FIELD - 5 */}
              <div className="flex flex-col p-1  text-start w-full lg:w-1/5">
                <label className="text-base mx-1">Policy Made By:<span className="text-red-600 font-bold">*</span></label>
                <select
                  id="staffName"
                  name="staffName"
                  className="input-style p-1 text-base rounded-lg"
                  value={staffName}
                  onChange={(e) => setStaffName(e.target.value)}
                >
                  <option className="w-1" value="" >----------- Policy Made By -------------</option>
                  {
                    APIData.filter(emp => emp.staffType === "OPS Executive" | emp.staffType === "OPS EXECUTIVE")
                      .map((emp) => (
                        <option key={emp._id} value={emp.empname}>
                          {emp.empid} - {emp.empname}
                        </option>
                      ))
                  }
                  {errors.staffName && <span className="text-red-600 text-sm ">{errors.staffName}</span>}
                </select>
              </div>

              {/* FIELD - 6 */}
              <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/5">
                <label className="text-base  mx-1">Company Name:<span className="text-red-600 font-bold">*</span></label>
                <select
                  id="company" name="company"
                  className="input-style p-1 text-base rounded-lg"
                  value={company}
                  onChange={(e) => {
                    setCompany(e.target.value.toUpperCase());
                    const selectedCatId = e.target.selectedOptions[0].getAttribute("data-id");
                    setCatTypesForSelectedPolicy(selectedCatId);
                  }}
                >
                  <option className="w-1" value="" >--------- Select Company -----------</option>
                  {pdata.map((comp) => (
                    <option key={comp._id} value={comp.c_type} data-id={comp._id}>
                      {comp.c_type}
                    </option>
                  ))}
                </select>
                {errors.company && <span className="text-red-600 text-sm">{errors.company}</span>}
              </div>

              {/* FIELD - 7 */}
              <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/5">
                <label className="text-base mx-1">Category:<span className="text-red-600 font-bold">*</span></label>
                <select
                  className="input-style w-full p-1 text-base rounded-lg"
                  value={category}
                  name="category"
                  onChange={(e) => setCategory(e.target.value)}>
                  <option value="">------- Select Product Type -----------</option>
                  {pdata.map((cat) => (
                    cat._id === catTypesForSelectedPolicy &&
                    cat.category.map((product, idx) => (
                      <option key={idx} value={product}>{product}</option>
                    ))))
                  }
                </select>
                {/* {errors.category && <span className="text-red-600 text-sm ">{errors.category}</span>} */}
              </div>

              {/* FIELD - 8 */}
              <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/5">
                <label className="text-base mx-1">Policy Type:<span className="text-red-600 font-bold">*</span></label>
                <select
                  className="input-style p-1 text-base  rounded-lg"
                  value={policyType}
                  name="policyType"
                  onChange={(e) => {
                    const selectedPolicyType = e.target.value;
                    setPolicyType(selectedPolicyType);
                    // Filter products based on selected policy type
                    const filteredProducts = data.find(prod => prod.p_type === selectedPolicyType)?.products;
                    setProducts(filteredProducts);
                    // Reset product code when policy type changes
                    setProductCode('');
                  }}
                > <option value="">--------- Select Policy Type -----------</option>
                  {data.map(prod => (
                    <option key={prod._id} value={prod.p_type}>{prod.p_type}</option>
                  ))}

                </select>
                {errors.policyType && <span className="text-red-600 text-sm ">{errors.policyType}</span>}
              </div>

              {/* FIELD - 9 */}
              <div className="flex flex-col  p-1 mt-4 text-start w-full lg:w-1/5">
                <label className="text-base mx-1">Policy No:<span className="text-red-600 font-bold">*</span></label>
                <input
                  className="input-style p-1 rounded-lg"
                  type="text"
                  value={policyNo}
                  name="policyNo"
                  onChange={(e) => setPolicyNo(e.target.value)}
                  placeholder="Enter Policy No"
                />
                {errors.policyNo && <span className="text-red-600 text-sm ">{errors.policyNo}</span>}
              </div>

              {/* FIELD - 10 */}
              <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/5">
                <label className="text-base mx-1">Engine No:<span className="text-red-600 font-bold">*</span></label>
                <input
                  className="input-style p-1 rounded-lg"
                  type="text"
                  name="engNo"
                  value={engNo}
                  onChange={(e) => setEngNo(e.target.value.toUpperCase())}
                  placeholder="Enter Engine No"
                />
                {errors.engNo && <span className="text-red-600 text-sm ">{errors.engNo}</span>}
              </div>

              {/* FIELD - 11 */}
              <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/5">
                <label className="text-base mx-1">Chassis No:<span className="text-red-600 font-bold">*</span></label>
                <input
                  className="input-style p-1 rounded-lg"
                  type="text"
                  value={chsNo}
                  name="chsNo"
                  onChange={(e) => setChsNo(e.target.value.toUpperCase())}
                  placeholder="Enter Chassis No"
                />
                {errors.chsNo && <span className="text-red-600 text-sm ">{errors.chsNo}</span>}
              </div>
              {
                policyType === "SATP" || policyType === "LIABILITY" ? (<div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/5">
                  <label className="text-base mx-1">OD Premium:<span className="text-red-600 font-bold">*</span></label>
                  <input
                    className="input-style p-1 rounded-lg"
                    type="number"
                    value={odPremium}
                    name="odPremium"
                    onChange={(e) => setOdPremium(e.target.value)}
                    placeholder="Disabled"
                    onBlur={updateNetPremium}
                    disabled
                  />
                </div>) : (<div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/5">
                  <label className="text-base mx-1">OD Premium:<span className="text-red-600 font-bold">*</span></label>
                  <input
                    className="input-style p-1 rounded-lg"
                    type="number"
                    value={odPremium}
                    name="odPremium"
                    onChange={(e) => setOdPremium(e.target.value)}
                    placeholder="Enter OD Premium"
                    onBlur={updateNetPremium}
                  />
                </div>)
              }
              {
                policyType === "SAOD" ? (<div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/5">
                  <label className="text-base mx-1">Liability Premium:<span className="text-red-600 font-bold">*</span></label>
                  <input
                    className="input-style p-1 rounded-lg"
                    type="number"
                    name="liabilityPremium"
                    value={liabilityPremium}
                    onChange={(e) => setLiabilityPremium(e.target.value)}
                    placeholder="Disabled"
                    onBlur={updateNetPremium}
                    disabled
                  />
                </div>)
                  : (<div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/5">
                    <label className="text-base mx-1">Liability Premium:</label>
                    <input
                      className="input-style p-1 rounded-lg"
                      type="number"
                      name="liabilityPremium"
                      value={liabilityPremium}
                      onChange={(e) => setLiabilityPremium(e.target.value)}
                      placeholder="Enter Liability Premium"
                      onBlur={updateNetPremium}
                    />
                  </div>)
              }
              <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/5">
                <label className="text-base mx-1">Net Premium:<span className="text-red-600 font-bold">*</span></label>
                <input
                  className="input-style p-1 rounded-lg"
                  type="number"
                  name="netPremium"
                  value={netPremium}
                  onBlur={handleNetPremiumBlur}
                  placeholder="Net Premium"
                  readOnly
                />
              </div>

              {/* FIELD - 15 */}
              <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/5">
                <label className="text-base mx-1">GST(Amount):<span className="text-red-600 font-bold">*</span></label>
                <input
                  className="input-style p-1 rounded-lg"
                  type="text"
                  value={taxes}
                  name="finalEntryFields"
                  onChange={(e) => setTaxes(e.target.value)}
                  onBlur={calculateFinalAmount}
                  placeholder="GST"
                />
                {errors.taxes && <span className="text-red-600 text-sm ">{errors.taxes}</span>}
              </div>
            </div>



            {/* FIELD - 12 */}
            <div className="flex flex-wrap mb-10 justify-between text">


              <div className="flex flex-col p-1 mt-0 text-start w-full lg:w-1/5">
                <label className="text-base mx-1">RSA:</label>
                <input
                  className="input-style p-1 rounded-lg"
                  type="text"
                  value={rsa}
                  name="rsa"
                  onChange={(e) => setRSA(e.target.value)}
                  onBlur={calculateFinalAmount}
                  placeholder="RSA"
                />

              </div>

              {/* FIELD - 16 */}
              <div className="flex flex-col p-1 mt-0 text-start w-full lg:w-1/5">
                <label className="text-base mx-1">Final Amount:<span className="text-red-600 font-bold">*</span></label>
                <input
                  className="input-style p-1 rounded-lg"
                  type="text"
                  value={finalEntryFields}
                  name="finalEntryFields"
                  onChange={(e) => setFinalEntryFields(e.target.value)}
                  placeholder=" Final Amount"
                  readOnly
                />
              </div>

             

              <div className="flex flex-col p-1 mt-0 text-start w-full lg:w-1/5">
                <label className="text-base mx-1">OD Discount%:<span className="text-red-600 font-bold">*</span></label>
                <select
                  className="input-style p-1 text-base rounded-lg"
                  type="text"
                  name="odDiscount"
                  value={odDiscount}
                  onChange={(e) => setOdDiscount(e.target.value)}
                  placeholder="Enter OD Discount"
                >
                  <option className="w-1" value="" >--------- Select OD Discount --------</option>
                  {
                    odList.map((data) => (
                      <option key={data._id} value={data.odDiscount} > {data.odDiscount}% </option>
                    ))
                  }
                </select>

              </div>

              <div className="flex flex-col p-1 text-start w-full lg:w-1/5">
                <label className="text-base mx-1">Segment:<span className="text-red-600 font-bold">*</span></label>
                <select
                  className="input-style p-1 text-base rounded-lg"
                  name="segment"
                  value={segment}
                  onChange={(e) => setSegment(e.target.value)}>
                  <option className="w-1" value="" >----------- Select Segment ------------</option>
                  <option value="C V">C V</option>
                  <option value="PVT-CAR">PVT-CAR</option>
                  <option value="TW">TW</option>
                  <option value="HEALTH">HEALTH</option>
                  <option value="NON-MOTOR">NON-MOTOR</option>
                  <option value="LIFE">LIFE</option>
                </select>
                {errors.segment && <span className="text-red-600 text-sm ">{errors.segment}</span>}
              </div>

             
              {
                        segment === "PVT-CAR" ? (<div className="flex flex-col p-1 text-start w-full lg:w-1/5">
                          <label className="text-base mx-1">NCB%:<span className="text-red-600 font-bold">*</span></label>
                          <select
                  className="input-style p-1 text-base rounded-lg"
                  type="text"
                  name="ncb"
                  value={ncb}
                  onChange={(e) => setNcb(e.target.value)}
                >
                  <option className="w-1" value="" >-------------- Select NCB -------------</option>
                  {
                    ncbList.map((data) => (
                      <option key={data._id} value={data.ncb}>{data.ncb}</option>
                    ))
                  }
                </select>
                        </div>)
                          : (<div className="flex flex-col p-1 text-start w-full  lg:w-1/5">
                            <label className="text-base mx-1">NCB%:<span className="text-red-600 text-sm">Disabled</span></label>
                            <select
                  className="input-style p-1 text-base rounded-lg"
                  type="text"
                  name="ncb"
                  value={ncb}
                  onChange={(e) => setNcb(e.target.value)}
                  disabled
                >
                  <option className="w-1" value="" >-------------- Select NCB -------------</option>
                  {
                    ncbList.map((data) => (
                      <option key={data._id} value={data.ncb}>{data.ncb}{"%"}</option>
                    ))
                  }
                </select>
                          </div>)
                      }



              {/* FIELD - 19 */}
              <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/5">
                <label className="text-base mx-1">Policy Payment Mode:<span className="text-red-600 font-bold">*</span></label>
                <select
                  id="policyPaymentMode"
                  className="input-style p-1 text-base rounded-lg"
                  value={policyPaymentMode}
                  name="policyPaymentMode"
                  onChange={(e) => setPolicyPaymentMode(e.target.value)}
                >
                  <option className="w-1" value="" >---- Select Policy Payment Mode ----</option>
                  {
                    payMode.map((mode) => (
                      <option key={mode._id} value={mode.paymentmode} >{mode.paymentmode}</option>
                    ))
                  }
                </select>
                {errors.policyPaymentMode && <span className="text-red-600 text-sm ">{errors.policyPaymentMode}</span>}
              </div>


              <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/5">
                <label className="text-base mx-1">State:<span className="text-red-600 font-bold">*</span></label>
                <select className="input-style text-base p-1 rounded-lg" value={selectedState} onChange={handleStateChange}>
                  <option value="">------------- Select State -------------- </option>
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
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    disabled={!selectedState} // Disable city dropdown until a state is selected
                  >
                    <option value="">------------- Select District-------------------</option>
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
             

              {/* FIELD - 20 */}
              <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/5">
                <label className="text-base mx-1">Vehicle Reg No:</label>
                <input
                  className="input-style p-1 rounded-lg"
                  type="text"
                  value={vehRegNo}
                  name="vehRegNo"
                  onChange={(e) => setVehRegNo(e.target.value.toUpperCase())}
                  placeholder="Enter Vehicle Reg No"
                />
                {/* {errors.vehRegNo && <span className="text-red-600 text-sm ">{errors.vehRegNo}</span>} */}
              </div>

              {/* FIELD - 21 */}
             

              <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/5">
                <label className="text-base mx-1">Sourcing:<span className="text-red-600 font-bold">*</span></label>
                <select
                  className="input-style p-1 text-base rounded-lg"
                  value={sourcing}
                  name="sourcing"
                  onChange={(e) => setSourcing(e.target.value)}>
                  <option className="w-1" value="" >-------- Select Sourcing Type --------</option>
                  <option value="NEW">NEW</option>
                  <option value="RENEWAL">RENEWAL</option>
                  <option value="ROLL OVER">ROLL OVER</option>
                </select>
                {errors.sourcing && <span className="text-red-600 text-sm ">{errors.sourcing}</span>}
              </div>

              {/* FIELD - 23 */}
              <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/5">
                <label className="text-base mx-1">Policy Start Date:<span className="text-red-600 font-bold">*</span></label>
                <input
                  className="input-style p-1 rounded-lg"
                  type="date"
                  name="policyStartDate"
                  value={policyStartDate}
                  onChange={handlePolicyStartDateChange}
                  placeholder="Select Policy Start Date"
                />
                {errors.policyStartDate && <span className="text-red-600 text-sm ">{errors.policyStartDate}</span>}
              </div>

              {/* FIELD - 24 */}
              <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/5">
                <label className="text-base mx-1">Policy End Date:<span className="text-red-600 font-bold">*</span></label>
                <input
                  className="input-style p-1 rounded-lg"
                  type="date"
                  name="policyEndDate"
                  value={policyEndDate}
                  onChange={(e) => setPolicyEndDate(e.target.value)}
                  placeholder="Select Policy End Date"
                />
                {errors.policyEndDate && <span className="text-red-600 text-sm ">{errors.policyEndDate}</span>}
              </div>

              {/* FIELD - 25 */}
              <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/5">
                <label className="text-base mx-1">OD Expiry Date:</label>
                <input
                  className="input-style p-1 rounded-lg"
                  type="text"
                  name="odExpiry"
                  value={odExpiry}
                  onChange={(e) => setOdExpiry(e.target.value)}
                  placeholder="Enter OD Expiry Date"
                  min="2025-01-01"
                />
              </div>
              <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/5">
                <label className="text-base mx-1">TP Expiry Date:</label>
                <input
                  className="input-style p-1 rounded-lg"
                  type="text"
                  name="tpExpiry"
                  value={tpExpiry}
                  onChange={(e) => setTpExpiry(e.target.value)}
                  placeholder="Enter TP Expiry Date"
                  min="2025-01-01"
                />
              </div>

              {/* FIELD - 27 */}
              <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/5">
                <label className="text-base  mx-1">IDV:</label>
                <input
                  className="input-style p-1 rounded-lg"
                  type="text"
                  name="idv"
                  value={idv}
                  onChange={(e) => setIdv(e.target.value.toUpperCase())}
                  placeholder="Enter IDV"
                />
                {/* {errors.idv && <span className="text-red-600 text-sm ">{errors.idv}</span>} */}
              </div>
            </div>

            {/* FIELD - 22 */}
            <div className="flex flex-wrap mb-10 justify-between text">

              {/* FIELD - 28 */}
              <div className="flex flex-col p-1 mt-0 text-start w-full lg:w-1/5">
                <label className="text-base mx-1">Body Type:</label>
                <input
                  className="input-style p-1 rounded-lg"
                  type="text"
                  value={bodyType}
                  name="bodyType"
                  onChange={(e) => setBodyType(e.target.value.toUpperCase())}
                  placeholder="Enter Body Type"
                />
                {/* {errors.bodyType && <span className="text-red-600 text-sm ">{errors.bodyType}</span>} */}
              </div>

              {/* FIELD - 29 */}
              <div className="flex flex-col p-1 mt-0 text-start w-full lg:w-1/5">
                <label className="text-base mx-1">Make & Model:</label>
                <input
                  className="input-style p-1 rounded-lg"
                  type="text"
                  name="makeModel"
                  value={makeModel}
                  onChange={(e) => setMakeModel(e.target.value.toUpperCase())}
                  placeholder="Enter Make & Model"
                />
                {/* {errors.makeModel && <span className="text-red-600 text-sm ">{errors.makeModel}</span>} */}
              </div>

              {/* FIELD - 30 */}
              <div className="flex flex-col p-1 mt-0 text-start w-full lg:w-1/5">
                <label className="text-base mx-1">Manufacturing Year:<span className="text-red-600 font-bold">*</span></label>
                <input
                  className="input-style p-1 rounded-lg"
                  type="text"
                  name="mfgYear"
                  value={mfgYear}
                  onChange={handleMfgYearChange}
                  placeholder="Enter Manufacturing Year"
                />
                {errors.mfgYear && <span className="text-red-600 text-sm ">{errors.mfgYear}</span>}
              </div>

              {/* FIELD - 31 */}
              <div className="flex flex-col p-1 mt-0 text-start w-full lg:w-1/5">
                <label className="text-base mx-1">Registration Year:</label>
                <input
                  className="input-style p-1 rounded-lg"
                  type="text"
                  value={registrationDate}
                  name="registrationDate"
                  onChange={(e) => setRegistrationDate(e.target.value)}
                  placeholder="Enter Year"
                // min="1950-01-01"
                // max={getLastDayOfPreviousMonth()}
                />
                {/* {errors.registrationDate && <span className="text-red-600 text-sm ">{errors.registrationDate}</span>} */}
              </div>
              {/* FIELD - 32 */}
              <div className="flex flex-col p-1 mt-0 text-start w-full lg:w-1/5">
                <label className="text-base mx-1">Vehicle Age:<span className="text-red-600 font-bold">*</span></label>
                <input
                  className="input-style p-1 rounded-lg"
                  type="text"
                  name="vehicleAge"
                  value={vehicleAge}
                  placeholder="Vehicle Age"
                  readOnly
                />
              </div>
              <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/5">
                <label className="text-base mx-1">Fuel:<span className="text-red-600 font-bold">*</span></label>
                <select
                  className="input-style p-1 text-base rounded-lg"
                  value={fuel}
                  name="fuel"
                  onChange={(e) => setFuel(e.target.value)}>
                  <option className="w-1" value="" >------------ Select Fuel Type ---------</option>
                  {
                    fuelType.map((fuel) => (
                      <option key={fuel._id} value={fuel.fuels} >{fuel.fuels}</option>
                    ))
                  }
                </select>
              </div>


{
                        segment === "C V" ? (<div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/5">
                          <label className="text-base mx-1">GVW (kg):</label>
                          <input
                            className="input-style p-1 rounded-lg"
                            type="text"
                            value={gvw}
                            onChange={(e) => setGvw(e.target.value)}
                            placeholder="Enter GVW"
                            name="gvw"

                          />
                        </div>)
                          : (<div className="flex flex-col p-1 text-start w-full mt-4 lg:w-1/5">
                            <label className="text-base mx-1">GVW (kg):<span className="text-red-600 text-sm">Disabled</span></label>
                            <input
                              className="input-style p-1 rounded-lg"
                              type="text"
                              value={gvw}
                              onChange={(e) => setGvw(e.target.value)}
                              name="gvw"
                              placeholder="Disabled"
                              disabled
                            />
                          </div>)
                      }

             
 {
                        segment === "C V" && (productCode === "SCHOOL BUS" || productCode === "ROUTE BUS" || productCode === "TAXI") ? (<div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/5">
                          <label className="text-base mx-1 ">Seating Capacity:</label>
                        <select
                          className="input-style p-1 text-base rounded-lg"
                          type="text"
                          value={sitcapacity}
                          onChange={(e) => setSitCapacity(e.target.value)}
                          name="sitcapacity"
                          placeholder="Enter Sitting Capacity"
                        >
                          <option value="">------ Select Seating -----------</option>
                          {
                            sits && sits.map((data) => (
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
                          value={sitcapacity}
                          onChange={(e) => setSitCapacity(e.target.value)}
                          name="sitcapacity"
                          placeholder="Disabled"
                          disabled
                        >
                          <option value="">------ Select Seating -----------</option>
                          {
                            sits && sits.map((data) => (
                              <option key={data._id} value={data.sitcapacity}>{data.sitcapacity}</option>
                            ))
                          }
                          {/* <option value="">NOT APPLICABLE</option> */}
                        </select>
                          </div>)
                      }





              {
                        segment === "PVT-CAR" || segment === "TW" ? (<div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/5">
                          <label className="text-base mx-1">CC:<span className="text-red-600 font-bold">*</span></label>
                          <select
                            className="input-style p-1 rounded-lg"
                            type="text"
                            name="cc"
                            value={cc}
                            onChange={(e) => setCc(e.target.value.toUpperCase())}
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
                              value={cc}
                              onChange={(e) => setCc(e.target.value.toUpperCase())}
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

              {/* FIELD - 36 */}
              <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/5">
                <label className="text-base mx-1">Product Code:<span className="text-red-600 font-bold">*</span></label>
                <select
                  id="productCode" name="productCode"
                  className="input-style p-1 text-base rounded-lg"
                  value={productCode}
                  onChange={(e) => setProductCode(e.target.value)}
                >
                  <option className="w-1" value="" >--------- Select Product Code --------</option>
                  {data.map((policy) => (
                    policy.p_type === policyType &&
                    products.map((product, idx) => (
                      <option key={idx} value={product}>{product}</option>
                    ))
                  ))}

                </select>
                {errors.productCode && <span className="text-red-600 text-sm ">{errors.productCode}</span>}
              </div>

              {/* FIELD - 37*/}
              <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/5">
                <label className="text-base mx-1">Advisor Name:<span className="text-red-600 font-bold">*</span></label>
                <select
                  className="input-style p-1 rounded-lg"
                  type="text"
                  value={advId}
                  name="advId"
                  onChange={(e) => {
                    const selectedAdvisor = filteredAdvLists.find((adv) => adv.uniqueId === e.target.value);
                    setAdvId(e.target.value);
                    setAdvisorName(selectedAdvisor ? selectedAdvisor.advisorname : '');                  }} 
                  placeholder="Enter Advisor Name">
                  <option value="">------------- Select Advisor -----------</option>
                  {filteredAdvLists.filter((emp)=> emp.branch[0] === branch).sort((a, b) => a.advisorname.localeCompare(b.advisorname)).map((data) => (
                    <option key={data._id} value={data.uniqueId}>{`${data.uniqueId} --> ${data.branch[0]}   -->  ${data.advisorname} -->  ${data.advisoraddress}`}</option>
                  ))}
                </select>
                {errors.advisorName && <span className="text-red-600 text-sm ">{errors.advisorName}</span>}
              </div>
              {/* FIELD - 38 */}
              <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/5">
                <label className="text-base mx-1">Sub-Advisor Name:<span className="text-red-600 font-bold">*</span></label>
                <input
                  className="input-style p-1 rounded-lg"
                  type="text"
                  name="subAdvisor"
                  value={subAdvisor}
                  onChange={(e) => setSubAdvisor(e.target.value.toUpperCase())}
                  placeholder="Enter Sub Advisor"
                />
              </div>

              <div className="flex flex-col p-1 mt-2 text-start w-full lg:w-1/5"></div>
              <div className="flex flex-col p-1 mt-2 text-start w-full lg:w-1/5"></div>
              <div className="flex flex-col p-1 mt-2 text-start w-full lg:w-1/5"></div>
              <div className="mt-4 p-2 flex justify-center lg:w-full w-full">
                <button
                  className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:text-black hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded text-base px-4 py-2 text-center"
                  onClick={handleSubmit}
                  disabled={formSubmitted}
                  type="button">
                  {formSubmitted ? "Submitted" : "Submit"}
                </button>
              </div>
            </div>
            {/* Button */}

          </MultiStep>
        </div>
      </div>
    </section>
  )
}
export default AddFinance;