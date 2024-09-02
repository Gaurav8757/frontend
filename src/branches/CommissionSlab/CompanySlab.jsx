import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { State, City } from 'country-state-city';
import axios from "axios";
import VITE_DATA from "../../config/config.jsx";

// adivisor slab == comapnyslab
function CompanySlab() {
  const [pdata, setPdata] = useState([]);
  const [fuelType, setFuelType] = useState([]);
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [segment, setSegment] = useState('');
  const [catTypesForSelectedPolicy, setCatTypesForSelectedPolicy] = useState([]);
  const [company, setCompany] = useState('');
  const [category, setCategory] = useState('');
  const [policyType, setPolicyType] = useState('');
  const [newCity, setNewCity] = useState('');
  const [branchname, setBranchname] = useState('');
  const [productCode, setProductCode] = useState('');
  const [vage, setVage] = useState("");
  const [payoutOnList, setPayoutOnList] = useState([]);
  const [payoutOn, setPayoutOn] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [branchpayoutper, setBranchpayoutper] = useState();
  const [companypayoutper, setCompanypayoutper] = useState();
  const [popercentage, setPoPercentage] = useState();
  const [fuel, setFuel] = useState('');
  const [odDiscount, setOdDiscount] = useState('');
  const [ncb, setNcb] = useState('');
  const [cc, setCc] = useState('');
  // const [advisors, setAdvisors] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [ncbList, setNcbLists] = useState([]);
  const [advisorName, setAdvisorName] = useState("");
  // const [advisorId, setAdvisorId] = useState('');
  // const [advisorUniqueId, setAdvisorUniqueId] = useState('');
  const [states, setStates] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [sitcapacity, setSitCapacity] = useState('');
  const [odList, setOdList] = useState([]);
  const [ccList, setCCList] = useState([]);
  const [sit, setSit] = useState([]);
  const [APIData, setAPIData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [local, setCompanyGrid] = useState([]);
  const token = sessionStorage.getItem("token");


  const citiesToShow = ["Araria",
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
        .get(`${VITE_DATA}/company/grid/slab/view`, {
          headers: {
            Authorization: `${token}`, // Send the token in the Authorization header
          },
        })
        .then((response) => {

          setCompanyGrid(response.data);

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

  // useEffect(() => {
  //   axios.get(`${VITE_DATA}/advisor/lists`, {
  //     headers: {
  //       Authorization: `${token}`,
  //     },
  //   })
  //     .then((response) => {
  //       // Assuming response.data is an array
  //       setAdvisors(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, [token]);
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
          setAPIData(response.data);

        })
        .catch((error) => {

          console.error(error);
        });
    }
  }, []);

  //   useEffect(() => {
  //     if (branchname) {
  //         const token = sessionStorage.getItem("token");
  //         axios
  //             .get(`${VITE_DATA}/advisor/lists`, {
  //                 headers: {
  //                     Authorization: `${token}`,
  //                 },
  //             })
  //             .then((response) => {
  //                 const filteredAdvisors = response.data.filter(
  //                     (advisor) => advisor.branch == branchname
  //                 );
  //                 setAdvisors(filteredAdvisors);
  //             })
  //             .catch((error) => {
  //                 console.error(error);
  //             });
  //     }
  // }, [branchname]);

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
  }, [token]);

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

  const renderOptions = () => {
    if (["GCCV 12><20", "GCCV 20><45","GCCV >43", "GCCV >45", "GCCV 20><40"].includes(productCode)) {
      return (
        <>
          <option value="NEW">NEW</option>
          <option value=" LESS THAN 5 YEARS">{"<5 Years"}</option>
          <option value="MORE THAN 5 YEARS">{">5 Years"}</option>
          <option value="1-7 YEARS">1-7 Years</option>
          <option value="MORE THAN 7 YEARS">{">7 Years"}</option>
          
        </>
      );
    }
    else {
      return (
        <>
          <option value="OLD">OLD</option>
          <option value="NEW">NEW</option>
          {/* <option value="1-7 YEARS">1-7 Years</option>
        <option value="MORE THAN 7 YEARS">{">7 Years"}</option> */}
        </>
      );
    }
  };

  const handlePolicyTypeChange = (e) => {
    const selectedPolicyType = e.target.value;
    setPolicyType(selectedPolicyType);

    // Filter products based on selected policy type
    const filteredProducts = data.find(prod => prod.p_type === selectedPolicyType)?.products || [];
    setProducts(filteredProducts);

    // Reset product code when policy type changes
    setProductCode('');
  };
  const filterPolicyTypes = () => {
    if (segment === "HEALTH" || segment === "NON-MOTOR") {
      return data.filter(prod => prod.p_type === 'LIABILITY');
    } else {
      return data.filter(prod => ['SATP', 'COMP', 'SAOD'].includes(prod.p_type));
    }
  };


  const getCcOptions = () => {
    if (segment === "TW") {
      return ['<150', '151><350', '>351'];
    } else if (segment === "PVT-CAR") {
      return ['0><1000', '1001><1500', '>1500'];
    }
    return [];
  };

  const isDisabled = !(segment === "TW" || segment === "PVT-CAR");
  const ccOptions = getCcOptions();

  // const handleChange = (e) => {
  //   const selectedAdvisor = advisors.find(a => a.advisorname === e.target.value);
  //   setAdvisorName(selectedAdvisor?.advisorname || "");
  //   setAdvisorId(selectedAdvisor?._id || ""); // Set the _id of the selected advisor
  //   setAdvisorUniqueId(selectedAdvisor?.uniqueId || ""); // Set the uniqueId of the selected advisor
  // };



  const handleVageChange = (e) => {
    const selectedVage = e.target.value;
    setVage(selectedVage);
  };

  // const handleAdvisorPayoutChange = (e) => {
  //   const advisorPercentage = e.target.value;

  //   setPoPercentage(advisorPercentage);
  //   setBranchpayoutper(advisorPercentage);
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formSubmitted) {
      return;
    }

    if (!branchname) {
      toast.error("Please select a branch");
      return;
    }
    if (!company) {
      toast.error('Please Select a valid Company Name!');
      return;
    }
    if (!category) {
      toast.error('Please Select a valid Category Type!');
      return;
    }

    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        toast.error("Not Authorized yet.. Try again! ");
        return;
      }

      const formData = {
        vehicleSlab: "Payout-Slab",
        company: "EleedomIMF",
        branch: branchname,
        cnames: company,
        catnames: category,
        segments: segment,
        policytypes: policyType,
        pcodes: productCode,
        vage,
        sitcapacity,
        vcc: cc,
        vfuels: fuel,
        voddiscount: odDiscount,
        vncb: ncb,
        advisorName,
        cvpercentage: popercentage,
        payoutons: payoutOn,
        states: selectedState,
        districts: selectedCity || newCity,
        branchpayoutper,
        companypayoutper
      };

      setFormSubmitted(true);

      const response = await axios.post(`${VITE_DATA}/company/grid/slab/add`, formData, {
        headers: {
          Authorization: `${token}`
        }
      });

      if (response.status === 200 || response.status === 201) {

        toast.success("Payout Added Successfully...!");

        // Reset form fields after successful submission if needed
        setCompany('');
        setCategory('');
        setSegment('');
        setSelectedCity('');
        setSelectedState('');
        setPoPercentage('');
        setNcb('');
        setSitCapacity('');
        setPolicyType('');
        setProductCode('');
        setNewCity('');
        setVage('');
        setFuel('');
        setAdvisorName('');
        setCc('');
        setOdDiscount('');
        setBranchname('');
        setSit('');
        setPayoutOn('');
        setBranchpayoutper('');
        setCompanypayoutper('');
      } else {
        toast.error("Unexpected response status");
        throw new Error('Unexpected response status');

      }
    } catch (error) {
      console.error("Error adding Payout:", error.response);
      toast.error("Failed to add Payout");
    } finally {
      setFormSubmitted(false);
    }
  };



  return (
    <section className="container-fluid relative  p-0 sm:ml-48 bg-white">
      <div className="container-fluid  justify-center p-1 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-white">
        <h1 className="font-bold text-2xl mb-1 text-blue-700">Payout Grid</h1>
        <div className="relative w-full lg:w-full p-0  rounded-xl shadow-xl text-2xl items-center bg-slate-200">
          <div className="flex justify-center mb-4">

            <div className="flex flex-col p-1 mt-1 text-center justify-center w-full lg:w-1/4">
              <label className="text-xl mx-1 my-2 font-bold"><span className="text-red-600 font-bold">*</span>Branch:<span className="text-red-600 font-bold">*</span></label>
              <select
                className="input-style p-1  text-lg rounded-lg"
                value={branchname}
                name="branchname"
                onChange={(e) => { setBranchname(e.target.value) }}
                required
              >
                <option className="w-1 text-lg" value="" >--------------- Select Branch --------------</option>
                <option value="ALL">ALL</option>
                {
                  APIData.map((name) => {
                    return (
                      <option className="text-lg" key={name._id} value={name.branchname}>
                        {`${name.branchname}`}
                      </option>
                    );
                  })
                }
              </select>
            </div>
            {/* <div className="flex flex-col p-1 mt-5 text-center justify-center w-full lg:w-1/4">
              <label className="text-xl mx-1 my-2 font-bold"><span className="text-red-600 font-bold">*</span>Advisor Name<span className="text-red-600 font-bold">*</span></label>
              <select
                className="input-style p-1  text-lg rounded-lg"
                value={advisorName}
                name="advisorName"
                onChange={handleChange}>
                <option className="w-1 text-lg" value="" >--------------- Select Advisor --------------</option>
                {
                  advisors && advisors.map((name) => {
                    // console.log(advisors);
                    if (name.advisorname) {
                      return (
                        <option className="text-lg" key={name._id} value={name.advisorname}>
                          {`${name.uniqueId} - ${name.advisorname}`}
                        </option>
                      );
                    }
                    return null; // Render nothing for other advisors
                  })
                }
              </select>
            </div> */}


          </div>

          <div className="flex flex-wrap mb-12 justify-between">
            <div className="flex flex-col p-1  text-start w-full lg:w-1/4">
              <label className="text-base  mx-1">Company Name:<span className="text-red-600 font-bold">*</span></label>
              <select
                id="company" name="company"
                className="input-style text-lg p-1 rounded-lg"
                value={company}
                onChange={(e) => {
                  setCompany(e.target.value.toUpperCase());
                  const selectedCatId = e.target.selectedOptions[0].getAttribute("data-id");
                  setCatTypesForSelectedPolicy(selectedCatId);
                }}
                required
              >
                <option className="w-1" value="" >--------------- Select Company ------------</option>
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
                className="input-style text-lg p-1 rounded-lg"
                value={category}
                name="category"
                onChange={(e) => setCategory(e.target.value)}>
                <option value="">------------ Select Product Type ----------</option>
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
              <label className="text-base mx-1">Segment:<span className="text-red-600 font-bold">*</span></label>
              <select
                className="input-style text-lg p-1 rounded-lg"
                name="segment"
                value={segment}
                onChange={(e) => setSegment(e.target.value)}>
                <option className="w-1" value="" >-------------- Select Segment -----------</option>
                <option value="C V">C V</option>
                <option value="PVT-CAR">PVT-CAR</option>
                <option value="TW">TW</option>
                <option value="HEALTH">HEALTH</option>
                <option value="NON-MOTOR">NON-MOTOR</option>
                {/* <option value="LIFE">LIFE</option> */}
              </select>
            </div>




            {/* 4 */}
            <div className="flex flex-col p-1 mt-5 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Policy Type:<span className="text-red-600 font-bold">*</span></label>
              <select
                className="input-style text-lg p-1 rounded-lg"
                value={policyType}
                name="policyType"
                // onChange={(e) => {
                //   const selectedPolicyType = e.target.value;
                //   setPolicyType(selectedPolicyType);
                //   // Filter products based on selected policy type
                //   const filteredProducts = data.find(prod => prod.p_type === selectedPolicyType)?.products;
                //   setProducts(filteredProducts);
                //   // Reset product code when policy type changes
                //   setProductCode('');
                // }}
                onChange={handlePolicyTypeChange}
              > <option value="">------------- Select Policy Type -------------</option>
                {filterPolicyTypes().map(prod => (
                  <option key={prod._id} value={prod.p_type}>{prod.p_type}</option>
                ))}
              </select>
            </div>



            {/* PRODUCT CODE */}
            <div className="flex flex-col p-1 mt-5 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Product Code:<span className="text-red-600 font-bold">*</span></label>
              <select
                id="productCode" name="productCode"
                className="input-style text-lg p-1 rounded-lg"
                value={productCode}
                onChange={(e) => setProductCode(e.target.value)}
              >
                <option className="w-1" value="" >----------- Select Product Code -----------</option>
                {data.map((policy) => (
                  policy.p_type === policyType &&
                  products.map((product, idx) => (
                    <option key={idx} value={product}>{product}</option>
                  ))
                ))}
              </select>
            </div>
            {(segment === "C V" && (productCode === "SCHOOL BUS" || productCode === "TAXI" || productCode === "ROUTE BUS" || productCode === "STAFF BUS")) ? (
              <div className="flex flex-col mt-5 p-1 text-start w-full lg:w-1/4">
                <label className="text-base mx-1">Seating Capacity:<span className="text-red-600 font-bold">*</span></label>
                <select
                  className="input-style p-1 text-lg rounded-lg"
                  value={sitcapacity}
                  onChange={(e) => setSitCapacity(e.target.value)}
                  name="sitcapacity"
                  placeholder="Enter Sitting Capacity"
                >
                  <option value="">--------------- Select Seating --------------</option>
                  {sit && sit.map((data) => (
                    <option key={data._id} value={data.sitcapacity}>{data.sitcapacity}</option>
                  ))}
                  <option value="All">NOT APPLICABLE</option>
                </select>
              </div>
            ) : (
              <div className="flex flex-col mt-5 p-1 text-start w-full lg:w-1/4">
                <label className="text-base mx-1">Seating Capacity:<span className="text-red-600 text-xs font-bold">DISABLED</span></label>
                <select
                  className="input-style p-1 text-lg rounded-lg"
                  value={sitcapacity}
                  onChange={(e) => setSitCapacity(e.target.value)}
                  name="sitcapacity"
                  placeholder="Enter Sitting Capacity"
                  disabled
                >
                  <option value="">--------------- Select Seating --------------</option>
                  {sit && sit.map((data) => (
                    <option key={data._id} value={data.sitcapacity}>{data.sitcapacity}</option>
                  ))}
                  <option value="All">NOT APPLICABLE</option>
                </select>
              </div>
            )}

            {/* AGE */}
            <div className="flex flex-col p-1 mt-5 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Vehicle Age / Type:<span className="text-red-600 font-bold">*</span></label>
              <select
                id="vage" name="vage"
                className="input-style text-lg p-1 rounded-lg"
                value={vage}
                onChange={handleVageChange}>
                <option className="w-1" value="">---------- Select Vehicle Age/Type ----------</option>
                {/* <option value="NA">NA</option> */}
                {renderOptions()}
                {/* <option value="OLD">OLD</option>
                <option value="NEW">NEW</option>
                <option value="1-7 YEARS">1-7 Years</option>

                <option value="MORE THAN 7 YEARS"> {`${">7 Years"}`}</option> */}
              </select>
            </div>

            {
              segment === "HEALTH" || segment === "NON-MOTOR" ? (<div className="flex flex-col p-1 mt-5 text-start w-full lg:w-1/4">
                <label className="text-base mx-1">Fuel:<span className="text-red-600 text-xs font-bold">DISABLED</span></label>
                <select
                  className="input-style text-lg p-1 rounded-lg"
                  value={fuel}
                  name="fuel"
                  onChange={(e) => setFuel(e.target.value)}
                  disabled
                >
                  <option className="w-1" value="" >-------------- Select Fuel Type ----------</option>
                  {segment === "PVT-CAR" ? (
                    fuelType
                      .filter(fuel => ["DIESEL", "OTHER THAN DIESEL", "ELECTRIC", "CNG"].includes(fuel.fuels))
                      .map(fuel => (
                        <option key={fuel._id} value={fuel.fuels}>{fuel.fuels}</option>
                      ))
                  ) : (
                    fuelType
                      .filter(fuel => ["CNG", "PETROL", "BIO FUEL", "ELECTRIC", "ALL"].includes(fuel.fuels))
                      .map(fuel => (
                        <option key={fuel._id} value={fuel.fuels}>{fuel.fuels}</option>
                      ))
                  )}
                </select>
              </div>) : (<div className="flex flex-col p-1 mt-5 text-start w-full lg:w-1/4">
                <label className="text-base mx-1">Fuel:<span className="text-red-600 font-bold">*</span></label>
                <select
                  className="input-style text-lg p-1 rounded-lg"
                  value={fuel}
                  name="fuel"
                  onChange={(e) => setFuel(e.target.value)}

                >
                  <option className="w-1" value="" >-------------- Select Fuel Type ----------</option>
                  {segment === "PVT-CAR" || segment === "C V" ? (
                    fuelType
                      .filter(fuel => ["DIESEL", "OTHER THAN DIESEL", "ELECTRIC", "CNG"].includes(fuel.fuels))
                      .map(fuel => (
                        <option key={fuel._id} value={fuel.fuels}>{fuel.fuels}</option>
                      ))
                  ) : (
                    fuelType
                      .filter(fuel => ["CNG", "PETROL", "BIO FUEL", "ELECTRIC", "ALL"].includes(fuel.fuels))
                      .map(fuel => (
                        <option key={fuel._id} value={fuel.fuels}>{fuel.fuels}</option>
                      ))
                  )}
                </select>
              </div>)
            }



            {segment === "PVT-CAR" ? (
              <div className="flex flex-col p-1 mt-5 text-start w-full lg:w-1/4">
                <label className="text-base mx-1">NCB%:<span className="text-red-600 font-bold">*</span></label>
                <select
                  className="input-style text-lg p-1 rounded-lg"
                  type="text"
                  name="ncb"
                  value={ncb}
                  onChange={(e) => setNcb(e.target.value)} >
                  <option className="w-1" value="" >-------------- Select NCB ------------------</option>
                  <option value="YES">Yes</option>
                  <option value="NO">No</option>
                  <option value="BOTH">Both</option>
                  {/* {
                  ncbList.map((data)=>(
                    <option key={data._id} value={data.ncb}>{data.ncb}{"%"}</option>
                  ))
                 } */}
                </select>
              </div>) : (
              <div className="flex flex-col p-1 mt-5 text-start w-full lg:w-1/4">
                <label className="text-base mx-1">NCB%:<span className="text-red-600 text-xs font-bold">DISABLED</span></label>
                <select
                  className="input-style text-lg p-1 rounded-lg"
                  type="text"
                  name="ncb"
                  value={ncb}
                  onChange={(e) => setNcb(e.target.value)}
                  disabled
                >

                  <option className="w-1" value="" >-------------- Select NCB ------------------</option>
                  <option value="YES">Yes</option>
                  <option value="NO">No</option>
                  <option value="BOTH">Both</option>
                  {/* {
                  ncbList.map((data)=>(
                    <option key={data._id} value={data.ncb}>{data.ncb}{"%"}</option>
                  ))
                 } */}
                </select>
              </div>
            )}

            {segment === "PVT-CAR" ? (
              <div className="flex flex-col p-1 mt-5 text-start w-full lg:w-1/4">
                <label className="text-base mx-1">OD Discount%:<span className="text-red-600 text-xs font-bold">DISABLED</span></label>
                <select
                  className="input-style text-lg p-1 rounded-lg"
                  type="text"
                  name="odDiscount"
                  value={odDiscount}
                  onChange={(e) => setOdDiscount(e.target.value)}
                  placeholder="Enter OD Discount">
                  <option className="w-1" value="NA" >------------ Select OD Discount -------------</option>
                  <option value="">All</option>
                  {
                    odList.map((data) => (
                      <option key={data._id} value={data.odDiscount} > {data.odDiscount}% </option>
                    ))
                  }
                </select>
              </div>) : (
              <div className="flex flex-col p-1 mt-5 text-start w-full lg:w-1/4">
                <label className="text-base mx-1">OD Discount%:<span className="text-red-600 text-xs font-bold">DISABLED</span></label>
                <select
                  className="input-style text-lg p-1 rounded-lg"
                  type="text"
                  name="odDiscount"
                  value={odDiscount}
                  onChange={(e) => setOdDiscount(e.target.value)}
                  disabled
                  placeholder="Enter OD Discount">
                  <option className="w-1" value="NA" >------------ Select OD Discount -------------</option>
                  <option value="">All</option>
                  {
                    odList.map((data) => (
                      <option key={data._id} value={data.odDiscount} > {data.odDiscount}% </option>
                    ))
                  }
                </select>
              </div>
            )
            }
            <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">
                CC:
                <span className={`text-red-600 font-bold ${isDisabled ? 'text-xs' : ''}`}>
                  {isDisabled ? 'DISABLED' : '*'}
                </span>
              </label>
              <select
                className="input-style p-1 text-lg rounded-lg"
                name="cc"
                value={cc}
                onChange={(e) => setCc(e.target.value.toUpperCase())}
                disabled={isDisabled}
                placeholder="Enter CC"
              >
                <option value="">----------------- Select CC ------------------</option>
                <option value="All">All</option>
                {ccList
                  .filter(prod => ccOptions.includes(prod.cc))
                  .map(data => (
                    <option key={data._id} value={data.cc}>{data.cc}</option>
                  ))}
              </select>
            </div>
            {/* payout on */}
            <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Payout On:<span className="text-red-600 font-bold">*</span></label>
              <select
                id="payoutOn"
                name="payoutOn"
                className="input-style p-1  text-lg rounded-lg"
                value={payoutOn}
                onChange={(e) => setPayoutOn(e.target.value)}>
                <option className="w-1" value="" >-------------- Select Payout on ----------</option>
                {
                  payoutOnList
                    .map(pay => (
                      <option key={pay._id} value={pay.payouton}>{pay.payouton}</option>
                    ))
                }
              </select>
            </div>
            {/* <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Advisor Payout Percentage(%):<span className="text-red-600 font-bold">*</span></label>
              <input
                className="input-style p-1 text-lg rounded-lg"
                type="text"
                value={popercentage}
                onChange={handleAdvisorPayoutChange}
                name="popercentage"
                placeholder="%"
              />
            </div> */}
            {/* branch payout % */}
            <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/4">
              <label className="text-base mx-1 ">Branch Payout Percentage(%):<span className="text-red-600 font-bold">*</span></label>
              <input
                className="input-style p-1 text-lg rounded-lg"
                type="number"
                value={branchpayoutper}
                onChange={(e) => setBranchpayoutper(e.target.value)}
                name="branchpayoutper"
                placeholder="%"

              />
            </div>
            {/* COMPANY payout % */}
            <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Company Payout Percentage(%):<span className="text-red-600 font-bold">*</span></label>
              <input
                className="input-style p-1 text-lg rounded-lg"
                type="number"
                value={companypayoutper}
                onChange={(e) => setCompanypayoutper(e.target.value)}
                name="companypayoutper"
                placeholder="%"
              />
            </div>



          </div>

          <button
            className="text-white mb-5 bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300  font-medium rounded text-base px-3 py-1 text-center "
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



export default CompanySlab;