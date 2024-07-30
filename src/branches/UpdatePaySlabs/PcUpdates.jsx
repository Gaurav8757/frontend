/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { CgCloseR } from "react-icons/cg";
import { useState, useEffect } from "react";
import { State, City } from 'country-state-city';
import { toast } from "react-toastify";
import axios from "axios";
import VITE_DATA from "../../config/config.jsx";
function PcUpdates({ slab, update, onClose,  }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [ncbLists, setNcbLists] = useState([]);
  const [pdata, setPdata] = useState([]);
  const [state, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [fuelType, setFuelType] = useState([]);
  const [payoutOnList, setPayoutOnList] = useState([]);
  const [odList, setOdList] = useState([]);
  const [ccList, setCCList] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [allCities, setAllCities] = useState('');
  const [catTypesForSelectedPolicy, setCatTypesForSelectedPolicy] = useState('');
  const [sit, setSit] = useState([]);
  const citiesToShow = [
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

    try {
      if (stateIsoCode === 'all') {
        // Fetch and set all cities if "All" is selected
        const allCities = await City.getCitiesOfCountry("IN");
        setAllCities(allCities);
      } else {
        // Fetch and set cities based on selected state
        const stateCities = await City.getCitiesOfState("IN", stateIsoCode);
        setCities(stateCities);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
      // Handle error appropriately
    }
    // Update the selected state in allDetails
    setAllDetails((prevData) => ({
      ...prevData,
      states: stateIsoCode
    }));
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


  const [allDetails, setAllDetails] = useState({
    cnames: slab.cnames || '', // Pre-saved company name
    catnames: slab.catnames || '', // Pre-saved category name
    states: slab.states || '', // Pre-saved state
    districts: slab.districts || '', // Pre-saved district
    segments: slab.segments || '', // Pre-saved segment
    policytypes: slab.policytypes || '', // Pre-saved policy type
    pcodes: slab.pcodes || '', // Pre-saved product code
    vfuels: slab.vfuels || '', // Pre-saved fuel type
    vncb: slab.vncb || '', // Pre-saved NCB
    voddiscount: slab.voddiscount || '', // Pre-saved OD discount
    vcc: slab.vcc || '', // Pre-saved CC
    payoutons: slab.payoutons || '', // Pre-saved payout on
    branchpayoutper: slab.branchpayoutper || '', // Pre-saved advisor payout percentage
    // companypayoutper: slab.companypayoutper || '',
    sitcapacity: slab.sitcapacity || '',
    cvpercentage: slab.popercentage || '',
    advisorName: slab.advisorName || ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // If the user selects "All Cities", save all city names in an array
    if (value === "all") {
      const allCityNames = cities.map(city => city.name);
      setAllDetails((prevData) => ({
        ...prevData,
        [name]: allCityNames,
      }));
    } else {
      setAllDetails((prevData) => ({
        ...prevData,
        [name]: value,

      }));
    }
  };

  const updateInsuranceAPI = async () => {
    try {
      setLoading(true);
      // Use the selected category ID in the patch method
      const resp = await axios.put(`${VITE_DATA}/company/grid/slab/${slab._id}`, allDetails);
      toast.success(`${resp.data.status}`);
      onClose(); // Close the modal after successful submission
      update();
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
            <div className="relative bg-gradient-to-r from-blue-700 to-sky-700 rounded-lg shadow dark:bg-slate-100">
              {/* <!-- Modal header --> */}
              <div className="flex items-center justify-between p-2 md:p-3 rounded-lg dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-100">
                  Update Advisor Payout Grid
                </h3>
                <button
                  onClick={onClose}
                  type="button"
                  className=" bg-transparent hover:bg-red-100 text-slate-100  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  ">
                   <img src="/close.png" height={5} width={25} alt="close" className="hover:bg-red-100 rounded-full"/>
                </button>
              </div>

              {/* <!-- Modal body --> */}
              <section className="p-4 md:p-3  rounded-lg max-h-auto text-justify overflow-y-auto bg-gradient-to-r from-blue-700 to-blue-700">
                <div className="container-fluid flex justify-center p-1 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-white">
                  <div className="relative w-full lg:w-full p-4 lg:p-1 rounded-xl shadow-xl text-2xl items-center bg-slate-200">
                    <div className="flex flex-wrap justify-between">
                      <div className="flex flex-col p-1 mt-0 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">Advisor Name:<span className="text-red-600 font-bold"></span></label>
                        <input
                          className="input-style bg-red-200 p-1 rounded-lg"
                          type="text"
                          value={allDetails.advisorName}
                          onChange={handleInputChange}
                          name="advisorName"
                          // placeholder="%"
                          readOnly
                        />
                      </div>

                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
                        <label className="text-base  mx-1">Company Name:<span className="text-red-600 font-bold">*</span></label>
                        <select
                          id="company"
                          className="input-style p-1 rounded-lg text-lg"
                          value={allDetails.cnames}
                          name="cnames"
                          onChange={(e) => {
                            handleInputChange(e);
                            const selectedCatId = e.target.selectedOptions[0].getAttribute("data-id");
                            setCatTypesForSelectedPolicy(selectedCatId);
                          }}>
                          <option className="w-1" value="" >--------- Select Company ----------</option>
                          {pdata.map((comp) => (
                            <option key={comp._id} value={comp.c_type} data-id={comp._id}>
                              {comp.c_type}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">Category:<span className="text-red-600 font-bold">*</span></label>
                        <select
                          className="input-style w-full p-1 text-lg rounded-lg"
                          value={allDetails.catnames}
                          name="catnames"
                          onChange={handleInputChange}>
                          <option value="">------- Select Product Type ---------</option>
                          {pdata.map((cat) => (
                            cat._id === catTypesForSelectedPolicy &&
                            cat.category.map((product, idx) => (
                              <option key={idx} value={product} >{product}</option>
                            ))))
                          }
                        </select>
                      </div>

                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">State:<span className="text-red-600 font-bold">*</span></label>
                        <select className="input-style text-lg p-1 rounded-lg" name="states" value={selectedState} onChange={handleStateChange}>
                          <option value="">----------- Select State ----------- </option>
                          {state.map(state => (
                            <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
                          ))}
                        </select>
                      </div>



                      <div className="flex flex-col p-1 mt-5 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">District:<span className="text-red-600 font-bold">*</span></label>
                        {
                          // selectedCity ? (
                          <select
                            className="input-style text-lg p-1 rounded-lg"
                            name="districts"
                            id="districts"
                            value={allDetails.districts}
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

                      {/* <div className="flex flex-col p-1 mt-0 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">District:<span className="text-red-600 font-bold">*</span></label>
                        {
                          <input
                            type="text"
                            name="districts"
                            id="districts"
                            className="input-style text-lg p-1 rounded-lg "
                            placeholder="Enter new district name"
                            value={allDetails.districts} // Assuming newCity is a separate state to hold input data
                            onChange={handleInputChange}
                          />
                        }
                      </div> */}
                      <div className="flex flex-col p-1 mt-5 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">Segment:<span className="text-red-600 font-bold">*</span></label>
                        <select
                          className="input-style p-1 text-lg rounded-lg"
                          name="segments"
                          value={allDetails.segments}
                          onChange={handleInputChange}>
                          <option className="w-1" value="" >---------- Select Segment ----------</option>
                          <option value="C V">C V</option>
                          <option value="PVT-CAR">PVT-CAR</option>
                          <option value="TW">TW</option>
                          <option value="HEALTH">HEALTH</option>
                          <option value="NON-MOTOR">NON-MOTOR</option>
                          <option value="LIFE">LIFE</option>
                        </select>
                      </div>
                      {/* <div className="flex flex-col p-1 mt-5 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1 ">Sitting Capacity:</label>
                        <input
                          className="input-style p-1 text-lg rounded-lg"
                          type="text"
                          value={allDetails.sitcapacity}
                          onChange={handleInputChange}
                          name="sitcapacity"
                          placeholder="Enter Sitting Capacity"
                        />
                      </div> */}
                      <div className="flex flex-col mt-5 p-1 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1 ">Seating Capacity:</label>
                        <select
                          className="input-style p-1 text-lg rounded-lg"
                          type="text"
                          value={allDetails.sitcapacity}
                          onChange={handleInputChange}
                          name="sitcapacity"
                          placeholder="Enter Sitting Capacity"
                        >
                          <option value="">---------- Select Seating -----------</option>
                          {
                            sit && sit.map((data) => (
                              <option key={data._id} value={data.sitcapacity}>{data.sitcapacity}</option>
                            ))
                          }
                          <option value="All">NOT APPLICABLE</option>
                        </select>
                      </div>
                      {/* 4 */}
                      <div className="flex flex-col p-1 mt-5 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">Policy Type:<span className="text-red-600 font-bold">*</span></label>
                        <select
                          className="input-style p-1 text-lg rounded-lg"
                          value={allDetails.policytypes}
                          name="policytypes"
                          onChange={handleInputChange
                            // setPolicyType(selectedPolicyType);
                            // // Filter products based on selected policy type
                            // const filteredProducts = data.find(prod => prod.p_type === selectedPolicyType)?.products;
                            // setProducts(filteredProducts);
                            // // Reset product code when policy type changes
                            // setProductCode('');
                            // }
                          }
                        > <option value="">--------- Select Policy Type ----------</option>
                          {data.map(prod => (
                            <option key={prod._id} value={prod.p_type}>{prod.p_type}</option>
                          ))}
                        </select>
                      </div>
                      {/* PRODUCT CODE */}
                      <div className="flex flex-col p-1 mt-5 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">Product Code:<span className="text-red-600 font-bold">*</span></label>
                        <select
                          id="productCode"
                          className="input-style p-1 text-lg rounded-lg"
                          value={allDetails.pcodes}
                          name="pcodes"
                          onChange={handleInputChange}
                        >
                          <option className="w-1" value="" >-------- Select Product Code --------</option>
                          {allDetails.policytypes && data
                            .filter(policy => policy.p_type === allDetails.policytypes)
                            .map(policy => policy.products.map((product, idx) => (
                              <option key={idx} value={product}>{product}</option>
                            )))}
                        </select>
                      </div>
                      <div className="flex flex-col p-1 mt-5 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">Fuel:<span className="text-red-600 font-bold">*</span></label>
                        <select
                          className="input-style p-1 text-lg rounded-lg"
                          value={allDetails.vfuels}
                          name="vfuels"
                          onChange={handleInputChange}>
                          <option className="w-1" value="" >---------- Select Fuel Type ----------</option>
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
                          value={allDetails.vncb}
                          name="vncb"
                          onChange={handleInputChange}
                        >
                          <option className="w-1" value="" >------------ Select NCB -------------</option>
                          {/* {ncbLists.map((data) => (
                            <option key={data._id} value={data.ncb}>{data.ncb}{"%"}</option>

                          ))} */}
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                          <option value="both">Both</option>
                        </select>
                      </div>

                      <div className="flex flex-col p-1 mt-5 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">OD Discount%:<span className="text-red-600 font-bold">*</span></label>
                        <select
                          className="input-style p-1 text-lg rounded-lg"
                          type="text"
                          name="voddiscount"
                          value={allDetails.voddiscount}
                          onChange={handleInputChange}
                          placeholder=""
                        >
                          <option className="w-1" value="NA" >------- Select OD Discount ---------</option>
                          <option value="">All</option>
                          {
                            odList.map((data) => (
                              <option key={data._id} value={data.odDiscount} > {data.odDiscount}% </option>
                            ))
                          }
                        </select>
                      </div>

                      <div className="flex flex-col p-1 mt-5 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">CC:<span className="text-red-600 font-bold">*</span></label>
                        <select
                          className="input-style p-1 text-lg rounded-lg"
                          type="text"
                          name="vcc"
                          value={allDetails.vcc}
                          onChange={handleInputChange}
                          placeholder="Enter CC"
                        >
                          <option className="w-1" value="" >------------- Select CC --------------</option>
                          <option value="All">All</option>
                          {
                            ccList.map((data) => ( console.log(data),
                              <option key={data._id} value={data.cc}>{data.cc}</option>
                            ))
                          }

                        </select>
                      </div>
                      {/* payout on */}
                      <div className="flex flex-col p-1 mt-5 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">Payout On:<span className="text-red-600 font-bold">*</span></label>
                        <select
                          id="payoutons"
                          name="payoutons"
                          className="input-style p-1 text-lg rounded-lg"
                          value={allDetails.payoutons}
                          onChange={handleInputChange}
                        >
                          <option className="" value="" >---------- Select Payout on ---------</option>
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
                          className="input-style p-1 text-lg  rounded-lg"
                          type="text"
                          value={allDetails.cvpercentage}
                          onChange={handleInputChange}
                          name="cvpercentage"
                          placeholder="%"
                        />
                      </div>

                      {/* <div className="flex flex-col p-1 mt-5 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">Branch Payout Percentage(%):<span className="text-red-600 font-bold">*</span></label>
                        <input
                          className="input-style p-1 text-lg rounded-lg"
                          type="text"
                          value={allDetails.branchpayoutper}
                          onChange={handleInputChange}
                          name="branchpayoutper"
                          placeholder="%"
                        />
                      </div> */}
                      {/* <div className="flex flex-col p-1 mt-5 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">Company Payout Percentage(%):<span className="text-red-600 font-bold">*</span></label>
                        <input
                          className="input-style p-1 text-lg  rounded-lg"
                          type="text"
                          value={allDetails.companypayoutper}
                          onChange={handleInputChange}
                          name="companypayoutper"
                          placeholder="%"
                        />
                      </div> */}
                      <div className="flex flex-col p-1 mt-5 text-start w-full lg:w-1/4"></div>
                      <div className="flex flex-col p-1 mt-5 text-start w-full lg:w-1/4"></div>
                    </div>
                    {/* button */}
                    <div className="col-span-4 p-2 mt-4 flex justify-center">
                      <button
                        className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50  font-medium rounded text-sm px-3 py-2 text-center"
                        onClick={updateInsuranceAPI} type="button" > {loading ? "Submitting..." : "Submit"} </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
    </>
  )
}

export default PcUpdates;