import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { State, City } from 'country-state-city';
import VITE_DATA from "../../config/config.jsx";
function TwoWheelers() {
  const [vage, setVage] = useState("");
  const [pdata, setPdata] = useState([]);
  const [data, setData] = useState([]);
  const [newCity, setNewCity] = useState('');
  const [fuelType, setFuelType] = useState([]);
  const [products, setProducts] = useState([]);
  const [segment, setSegment] = useState('');
  const [catTypesForSelectedPolicy, setCatTypesForSelectedPolicy] = useState([]);
  const [branchpayoutper, setBranchpayoutper] = useState();
  const [company, setCompany] = useState('');
  const [category, setCategory] = useState('');
  const [policyType, setPolicyType] = useState('');
  const [productCode, setProductCode] = useState('');
  const [cc, setCc] = useState('');
  const [payoutOnList, setPayoutOnList] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [ncbList, setNcbLists] = useState([]);
  const [payoutOn, setPayoutOn] = useState('');
  const [ncb, setNcb] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [popercentage, setPoPercentage] = useState();
  const [odDiscount, setOdDiscount] = useState('');
  const [fuel, setFuel] = useState('');
  const [advisor, setAdvisor] = useState([]);
  const [advisorName, setAdvisorName] = useState("");
  const [advisorId, setAdvisorId] = useState('');
  const [advisorUniqueId, setAdvisorUniqueId] = useState('');
  const [states, setStates] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  // const [allCities, setAllCities] = useState([]);
  const [odList, setOdList] = useState([]);
  const [ccList, setCCList] = useState([]);
  const [sitcapacity, setSitCapacity] = useState('');
  const [sits, setSit] = useState([]);
  const branchs = sessionStorage.getItem("name");
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

  const handleStateChange = async (e) => {
    const stateIsoCode = e.target.value;
    setSelectedState(stateIsoCode);
    if (stateIsoCode === 'All_Cities') {
      const allCities = await City.getCitiesOfCountry("IN");
      setSelectedCity(allCities);
    } else {
      try {
        const stateCities = await City.getCitiesOfState("IN", stateIsoCode);
        setCities(stateCities);
        setSelectedCity(''); // Reset selectedCity when changing state
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    }
  };

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
        .get(`${VITE_DATA}/advisor/lists`, {
          headers: {
            Authorization: `${token}`, // Send the token in the Authorization header
          },
        })
        .then((response) => {
          setAdvisor(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [advisor]);

  useEffect(() => {
    axios.get(`${VITE_DATA}/view/company/lists`)
      .then((resp) => {
        const cType = resp.data;

        setPdata(cType);
      })
      .catch((error) => {
        console.error("Error fetching company names:", error);
      });
  }, [pdata]);

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
  }, [fuelType]);

  useEffect(() => {
    axios.get(`${VITE_DATA}/staff/policy/lists`)
      .then((resp) => {
        const PolicyType = resp.data;

        setData(PolicyType);
      })
      .catch((error) => {
        console.error("Error fetching policy types:", error);
      });
  }, [data]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Not Authorized yet.. Try again! ");
    } else {
      // The user is authenticated, so you can make your API request here.
      axios
        .get(`${VITE_DATA}/view/payouton`, {
          headers: {
            Authorization: `${token}`, // Send the token in the Authorization header
          },
        })
        .then((response) => {
          setPayoutOnList(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [payoutOnList]);

  // const handleVageChange = (e) => {
  //   const selectedVage = e.target.value;
  //   setVage(selectedVage);
  // Perform calculations based on the selected value
  // switch (selectedVage) {
  //   case 'NEW':
  //     // Perform calculations for NEW vehicles
  //     break;
  //   case '1-5 YEARS':
  //     // Perform calculations for vehicles aged 1-5 years
  //     break;
  //   case '6-10 YEARS':
  //     // Perform calculations for vehicles aged 6-10 years
  //     break;
  //   case 'MORE THAN 10 YEARS':
  //     // Perform calculations for vehicles aged more than 10 years
  //     break;
  //   default:
  //     // Handle default case or invalid input
  // }
  // };

  const handleChange = (e) => {
    const selectedAdvisor = advisor.find(a => a.advisorname === e.target.value);
    setAdvisorName(selectedAdvisor?.advisorname || "");
    setAdvisorId(selectedAdvisor?._id || ""); // Set the _id of the selected advisor
    setAdvisorUniqueId(selectedAdvisor?.uniqueId || ""); // Set the uniqueId of the selected advisor
  };
  const handleVageChange = (e) => {
    const selectedVage = e.target.value;
    setVage(selectedVage);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formSubmitted) {
      return;
    }
    if (!advisorName ) {
      toast.error('Please Select a valid Advisor Name!');
      return; // Prevent further execution if advisorName is not selected
    }
    if (!company ) {
      toast.error('Please Select a valid Company Name!');
      return; // Prevent further execution if advisorName is not selected
    }
    if (!category ) {
      toast.error('Please Select a valid Category Type!');
      return; // Prevent further execution if advisorName is not selected
    }
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        toast.error("Not Authorized yet.. Try again! ");
        return;
      }
      
      const formData = {
        vehicleSlab: "Advisor-Slab",
        company: "EleedomIMF",
        branch: branchs,
        cnames: company,
        catnames: category,
        segments: segment,
        policytypes: policyType,
        pcodes: productCode,
        payoutons: payoutOn,
        cvpercentage: popercentage,
        vfuels: fuel,
        vncb: ncb,
        vage,
        sitcapacity,
        advisorName,
        advisorId,
        states: selectedState,
        districts: selectedCity || newCity,
        advisorUniqueId,
        voddiscount: odDiscount,
        vcc: cc,
        branchpayoutper
      };
      await axios.post(`${VITE_DATA}/company/grid/slab/add`, formData, {
        headers: {
          Authorization: `${token}`
        }
      });
      toast.success("Advisor Payout Added Successfully.....!");
      setFormSubmitted(true);
      // Reset form fields after successful submission if needed
      setCompany('');
      setCategory('');
      setSelectedCity('');
      setSelectedState('');
      setSegment('');
      setPolicyType('');
      setSitCapacity('');
      setProductCode('');
      setAdvisorName('');
      setFuel('');
      setNcb('');
      setOdDiscount('');
      setCc('');
      setVage('');
      setNewCity('');
      setPayoutOn('');
      setPoPercentage('');
      setBranchpayoutper('');
      // setCompanypayoutper('');
    } catch (error) {
      console.error("Error adding Advisor Payout:", error.response);
      toast.error("Failed to add Advisor Payout");
    } finally {
      setFormSubmitted(false);
    }
  };

  return (
    <section className="container-fluid relative  p-0 sm:ml-64 bg-white">
      <div className="container-fluid  justify-center p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-white">
      <h1 className="font-semibold my-1 text-3xl text-blue-700">Advisor Payout Grid </h1>
        <div className="relative w-full lg:w-full p-0 rounded-xl shadow-xl text-2xl items-center bg-slate-200">
         

          <div className="flex justify-center mb-5">
            <div className="flex flex-col p-1 mt-3 text-center justify-center w-full lg:w-1/4">
              <label className="text-xl mx-1 my-1 font-bold">Advisor Name<span className="text-red-600 font-bold">*</span></label>
              <select
                className="input-style p-1  text-lg rounded-lg"
                value={advisorName}
                name="advisorName"
                onChange={handleChange}>
                <option className="w-1 text-lg" value="" >--------------- Select Advisor ---------------</option>
                {
                  advisor.filter((advisor) => advisor.branch.includes(sessionStorage.getItem('name'))).map((name) => (
                    <option className="text-lg" key={name._id} value={name.advisorname} >{`${name.uniqueId} - ${name.advisorname}`}</option>
                  ))
                }
              </select>
            </div>
          </div>
          <div className="flex flex-wrap mb-12 justify-between">
            <div className="flex flex-col p-1 mt-0 text-start w-full lg:w-1/4">
              <label className="text-base  mx-1">Company Name:<span className="text-red-600 font-bold">*</span></label>
              <select
                id="company" name="company"
                className="input-style p-1 rounded-lg text-lg"
                value={company}
                onChange={(e) => {
                  setCompany(e.target.value.toUpperCase());
                  const selectedCatId = e.target.selectedOptions[0].getAttribute("data-id");
                  setCatTypesForSelectedPolicy(selectedCatId)
                }}>
                <option className="w-1" value="" >------------- Select Company --------------</option>
                {pdata.map((comp) => (
                  <option key={comp._id} value={comp.c_type} data-id={comp._id}>
                    {comp.c_type}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col p-1 mt-0 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Category:<span className="text-red-600 font-bold">*</span></label>
              <select
                className="input-style w-full p-1 text-lg rounded-lg"
                value={category}
                name="category"
                onChange={(e) => setCategory(e.target.value)}>
                <option value="">----------- Select Product Type -------------</option>
                {pdata.map((cat) => (
                  cat._id === catTypesForSelectedPolicy &&
                  cat.category.map((product, idx) => (
                    <option key={idx} value={product}>{product}</option>
                  ))))
                }
              </select>
            </div>
            <div className="flex flex-col p-1 mt-0 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">State:<span className="text-red-600 font-bold">*</span></label>
              <select className="input-style text-lg p-1 rounded-lg" value={selectedState} onChange={handleStateChange}>
                <option value="">---------------- Select State --------------- </option>
                {states.map(state => (
                  <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
                ))}
              </select>
            </div>

            {/* <div className="flex flex-col p-1 mt-0 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">District:<span className="text-red-600 font-bold">*</span></label>
              <select
                className="input-style text-lg p-1 rounded-lg"
                value={selectedCity}
                // onChange={(e) => setSelectedCity(e.target.value)}
                onChange={(e) => {
                  const { value } = e.target;
                  if (value === "All_Cities") {
                    const allCityNames = cities.map(city => city.name);
                    setSelectedCity(allCityNames);
                  } else {
                    setSelectedCity(e.target.value);
                  }
                }}
                disabled={!selectedState}>

                <option value="">---------------- Select City ---------------</option>
                <option value="All_Cities">All_Cities</option>
          {cities.map((city, index) => (
            <option key={index} value={city.name}>{city.name}</option>
          ))}
              </select>
            </div> */}

            <div className="flex flex-col p-1 mt-0 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">District:<span className="text-red-600 font-bold">*</span></label>
              {
                // selectedCity ? (
                  <select
                    className="input-style text-lg p-1 rounded-lg"
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

            <div className="flex flex-col p-1 mt-5 text-start w-full lg:w-1/4">
              <label className="text-base mx-1 ">Seating Capacity:</label>
              <select
                className="input-style p-1 text-lg rounded-lg"
                type="text"
                value={sitcapacity}
                onChange={(e) => setSitCapacity(e.target.value)}
                name="sitcapacity"
                placeholder="Enter Sitting Capacity"
              >
                <option value="">--------------- Select Seating --------------</option>
                {
                  sits && sits.map((data) => (
                    <option key={data._id} value={data.sitcapacity}>{data.sitcapacity}</option>
                  ))
                }
                <option value="All">NOT APPLICABLE</option>
              </select>
            </div>

            {/* 3 */}
            <div className="flex flex-col p-1 mt-5 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Segment:<span className="text-red-600 font-bold">*</span></label>
              <select
                className="input-style p-1 text-lg rounded-lg"
                name="segment"
                value={segment}
                onChange={(e) => setSegment(e.target.value)}>
                <option className="w-1" value="" >-------------- Select Segment --------------</option>
                <option value="C V">C V</option>
                <option value="PVT-CAR">PVT-CAR</option>
                <option value="TW">TW</option>
                <option value="HEALTH">HEALTH</option>
                <option value="NON-MOTOR">NON-MOTOR</option>
                <option value="LIFE">LIFE</option>
              </select>
            </div>

            {/* 4 */}
            <div className="flex flex-col p-1 mt-5 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Policy Type:<span className="text-red-600 font-bold">*</span></label>
              <select
                className="input-style p-1 text-lg rounded-lg"
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
              > <option value="">------------- Select Policy Type ------------</option>
                {data.map(prod => (
                  <option key={prod._id} value={prod.p_type}>{prod.p_type}</option>
                ))}
              </select>
            </div>
            {/* PRODUCT CODE */}
            <div className="flex flex-col p-1 mt-5 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Product Code:<span className="text-red-600 font-bold">*</span></label>
              <select
                id="productCode" name="productCode"
                className="input-style p-1 text-lg rounded-lg"
                value={productCode}
                onChange={(e) => setProductCode(e.target.value)}
              >
                <option className="w-1" value="" >------------ Select Product Code -----------</option>
                {data.map((policy) => (
                  policy.p_type === policyType &&
                  products.map((product, idx) => (
                    <option key={idx} value={product}>{product}</option>
                  ))
                ))}
              </select>
            </div>
            <div className="flex flex-col p-1 mt-5 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Vehicle Age:<span className="text-red-600 font-bold">*</span></label>
              <select
                id="vage" name="vage"
                className="input-style p-1 text-lg rounded-lg"
                value={vage}
                onChange={handleVageChange}>
                <option className="w-1" value="">------------ Select Vehicle Age -------------</option>
                <option value="NA">NA</option>
                <option value="NEW">NEW</option>
                <option value="1-5 YEARS">1-5 Years</option>
                <option value="6-10 YEARS">6-10 Years</option>
                <option value="MORE THAN 10 YEARS">More than 10 Years</option>
              </select>
            </div>

            <div className="flex flex-col p-1 mt-5 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Fuel:<span className="text-red-600 font-bold">*</span></label>
              <select
                className="input-style p-1 text-lg rounded-lg"
                value={fuel}
                name="fuel"
                onChange={(e) => setFuel(e.target.value)}>
                <option className="w-1" value="" >------------- Select Fuel Type --------------</option>
                {
                  fuelType.map((fuel) => (
                    <option key={fuel._id} value={fuel.fuels} >{fuel.fuels}</option>
                  ))
                }
              </select>
            </div>
            {/* FIELD - 18 */}
            <div className="flex flex-col p-1 mt-5 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">NCB%:<span className="text-red-600 font-bold">*</span></label>
              <select
                className="input-style p-1 text-lg rounded-lg"
                type="text"
                name="ncb"
                value={ncb}
                onChange={(e) => setNcb(e.target.value)}>
                <option className="w-1" value="" >---------------- Select NCB ------------------</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="both">Both</option>
                {/* {
                  ncbList.map((data)=>(
                    <option key={data._id} value={data.ncb}>{data.ncb}{"%"}</option>
                  ))
                 } */}
              </select>
            </div>

            <div className="flex flex-col p-1 mt-5 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">OD Discount%:<span className="text-red-600 font-bold">*</span></label>
              <select
                className="input-style text-lg p-1 rounded-lg"
                type="text"
                name="odDiscount"
                value={odDiscount}
                onChange={(e) => setOdDiscount(e.target.value)}
                placeholder="Enter OD Discount"
              >
                <option className="w-1" value="NA" >------------ Select OD Discount -------------</option>
                <option value="">All</option>
                {
                  odList.map((data)=>(
                    <option key={data._id} value={data.odDiscount} > {data.odDiscount}% </option>  
                  ))
                }
              </select>
            </div>

            <div className="flex flex-col p-1 mt-5 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">CC:<span className="text-red-600 font-bold">*</span></label>
              <select
                className="input-style text-lg p-1 rounded-lg"
                type="text"
                name="cc"
                value={cc}
                onChange={(e) => setCc(e.target.value.toUpperCase())}
                placeholder="Enter CC"
              >
                <option className="w-1" value="">----------------- Select CC ------------------</option>
                <option value="ALL">All</option>
               {
                ccList.map((data)=>(
                  <option key={data._id} value={data.cc}>{data.cc}</option>
                ))
               }
              </select>
            </div>

            {/* payout on */}
            <div className="flex flex-col p-1 mt-5 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Payout On:<span className="text-red-600 font-bold">*</span></label>
              <select
                id="payoutOn"
                name="payoutOn"
                className="input-style p-1 text-lg rounded-lg"
                value={payoutOn}
                onChange={(e) => setPayoutOn(e.target.value)}>
                <option className="w-1" value="" >------------- Select Payout on -------------</option>
                {
                  payoutOnList
                    .map(pay => (
                      <option key={pay._id} value={pay.payouton}>{pay.payouton}</option>
                    ))
                }
              </select>
            </div>
            {/* PERCENTAGE */}
            <div className="flex flex-col p-1 mt-5 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Advisor Payout Percentage(%):<span className="text-red-600 font-bold">*</span></label>
              <input
                className="input-style p-1 text-lg rounded-lg"
                type="text"
                value={popercentage}
                onChange={(e) => setPoPercentage(e.target.value)}
                name="popercentage"
                placeholder="%"
              />
            </div>
             {/* <div className="flex flex-col p-1 mt-5 text-start w-full lg:w-1/4">
              <label className="text-base mx-1 ">Branch Payout Percentage(%):<span className="text-red-600 font-bold">*</span></label>
              <input
                className="input-style p-1 text-lg rounded-lg"
                type="number"
                value={branchpayoutper}
                onChange={(e) => setBranchpayoutper(e.target.value)}
                name="branchpayoutper"
                placeholder="%"
                
              />
            </div> */}
            <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/4"></div>
            <div className="flex flex-col p-1  text-start w-full lg:w-1/4"></div>
          </div>
          <button
            className="text-white bg-gradient-to-r my-4 from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300  shadow-lg shadow-green-500/50  font-medium rounded text-base px-3 py-1 text-center "
            onClick={handleSubmit}
            disabled={formSubmitted}
            type="button">
            {formSubmitted ? "Submitted" : "Submit"}
          </button>
        </div>
      </div>
    </section>
  )
}
export default TwoWheelers;