//   const handleSetAuthTokenToQuote = async () => {
//     // Retrieve tokens from sessionStorage
//     const authTokens = sessionStorage.getItem("auth_access_token");
//     // const uatTokens = sessionStorage.getItem("uat_access_token");auth_token_received_at
//      const auth_token_received_at = sessionStorage.getItem("auth_token_received_at");

//     // Prepare headers
//     const headers = {
//       Authorization: `${authTokens}`, // Set the auth token in the Authorization header
//       "Content-Type": "application/json",
//     };

//     // Prepare the request body if needed (replace with the actual body structure)
//     const requestBody = {
//       source: "P",
//       q_producer_email: "chitra2@gmail.com",
//       q_producer_code: "4984727878",
//       is_posp: "N",
//       sol_id: "",
//       q_office_location: "",
//       pol_plan_id: "04",
//       place_reg: "MUMBAI",
//       vehicle_make: "TATA MOTORS",
//       vehicle_model: "HARRIER",
//       vehicle_variant: "XT",
//       proposer_type: "Individual",
//       proposer_pincode: "400001",
//       proposer_gstin: "",
//       proposer_salutation: "Mr",
//       proposer_email: "chitra2@gmail.com",
//       proposer_mobile: "9898989898",
//       business_type_no: "01",
//       dor: "2024-09-14",
//       prev_pol_end_date: "",
//       man_year: 2023,
//       pol_start_date: "2024-09-21",
//       prev_pol_type: "",
//       claim_last: "false",
//       pre_pol_ncb: "0",
//       BH_regno: "true",
//       special_regno: "false",
//       regno_1: "22",
//       regno_2: "BH",
//       regno_3: "6517",
//       regno_4: "A",
//       prev_cnglpg: "No",
//       cng_lpg_cover: "No",
//       cng_lpg_si: "",
//       electrical_si: "",
//       non_electrical_si: "",
//       uw_loading: "",
//       uw_remarks: "",
//       uw_discount: "",
//       prev_tyre: "",
//       tyre_secure: "No",
//       tyre_secure_options: "DEPRECIATION BASIS",
//       prev_engine: "",
//       engine_secure: "No",
//       engine_secure_options: "WITH DEDUCTIBLE",
//       prev_dep: "No",
//       dep_reimburse: "No",
//       dep_reimburse_claims: "2",
//       add_towing: "No",
//       add_towing_amount: "",
//       return_invoice: "No",
//       prev_consumable: "",
//       consumbale_expense: "No",
//       rsa: "No",
//       key_replace: "No",
//       repair_glass: "No",
//       emergency_expense: "No",
//       personal_loss: "No",
//       daily_allowance: "No",
//       allowance_days_accident: "",
//       daily_allowance_limit: "",
//       allowance_days_loss: "",
//       franchise_days: "",
//       pa_owner: "true",
//       pa_owner_tenure: "1",
//       pa_owner_declaration: "None",
//       pa_unnamed: "No",
//       pa_unnamed_no: "",
//       pa_unnamed_si: "",
//       pa_named: "",
//       pa_paid: "No",
//       pa_paid_no: "",
//       pa_paid_si: "",
//       ll_paid: "No",
//       ll_paid_no: "1",
//       ll_paid_si: "",
//       automobile_association_cover: "No",
//       vehicle_blind: "No",
//       antitheft_cover: "No",
//       voluntary_amount: "",
//       tppd_discount: "No",
//       vintage_car: "No",
//       own_premises: "No",
//       load_fibre: "No",
//       load_imported: "No",
//       load_tuition: "No",
//       pa_unnamed_csi: "",
//       vehicle_make_no: 140,
//       vehicle_model_no: 10361,
//       vehicle_variant_no: "103912",
//       place_reg_no: "99",
//       pol_plan_variant: "PackagePolicy",
//       proposer_fname: "",
//       proposer_mname: "",
//       proposer_lname: "",
//       pre_pol_protect_ncb: null,
//       claim_last_amount: null,
//       claim_last_count: null,
//       quote_id: "",
//       product_id: "M300000000001",
//       product_code: "3184",
//       product_name: "Private Car",
//       ncb_protection: "No",
//       ncb_no_of_claims: "1",
//       motor_plan_opted: "Silver",
//       motor_plan_opted_no: "P1",
//       vehicle_idv: "",
//       __finalize: "1",
//     };

import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import TimerForAllUser from "../Timer/TimerForAllUser.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import VehicleRegistrationNo from "../vehicleNumber/VehicleRegistrationNo.jsx";
import {
  Home,
  MessageSquare,
  BarChart2,
  Settings,
  ShoppingCart,
  Package,
  Heart,
  Archive,
  User,
  Check,
  MoveRight,
} from "lucide-react";

function AllMotorInsurances() {
  const location = useLocation();
  const { subCategories, logos, insuranceName } = location.state || {};
  const [selectedOption, setSelectedOption] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [selectedSubOption, setSelectedSubOption] = useState("");
  const [subCustType, setSubCustType] = useState("");
  const [customerType, setCutomerType] = useState([]);
  const [quoteResponses, setQuoteResponses] = useState("");
  const [timer, setTimer] = useState(1800); // 30 minutes in seconds
  const intervalRef = useRef(null); // To keep track of interval

  // console.log(quoteResponses);

  const sidebarItems = [
    { icon: Home, label: "Home" },
    { icon: MessageSquare, label: "Messages" },
    { icon: BarChart2, label: "Analytics" },
    { icon: ShoppingCart, label: "Orders" },
    { icon: Package, label: "Products" },
    { icon: Heart, label: "Favorites" },
    { icon: Archive, label: "Archive" },
    { icon: Settings, label: "Settings" },
  ];

  useEffect(() => {
    const auth_token_received_at = sessionStorage.getItem(
      "auth_token_received_at"
    );
    const auth_expires_in = sessionStorage.getItem("auth_expires_in");

    if (auth_token_received_at && auth_expires_in) {
      const currentTime = Date.now();
      const tokenAge = Math.floor(
        (currentTime - parseInt(auth_token_received_at, 10)) / 1000
      ); // in seconds
      const remainingTime = Math.max(1800 - tokenAge, 0); // 1800 is 30 minutes in seconds

      setTimer(remainingTime);

      if (remainingTime > 0) {
        startTimer(remainingTime);
      }
    }
  }, []);

  const startTimer = (initialTime) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // Clear any previous intervals
    }

    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(intervalRef.current);
          sessionStorage.removeItem("auth_access_token");
          sessionStorage.removeItem("auth_token_received_at");
          toast.error("Session expired. Please re-authenticate.");
          return 0;
        }
        return prevTimer;
      });
    }, 1000);
  };

  const handleSelectChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedOption(selectedCategory);

    // Update menuItems based on the selected category
    if (subCategories && subCategories[selectedCategory]) {
      const items = Object.values(subCategories[selectedCategory]);
      setMenuItems(items);
    } else {
      setMenuItems([]);
    }
  };

  const handleSubOptionChange = (index) => {
    const selectedOption = menuItems[index];
    setSelectedSubOption(selectedOption.name);
    const authLink = selectedOption.authLink;
    const custType = selectedOption.custType;
    setCutomerType(custType);

    if (authLink) {
      // Trigger the API call using fetch
      fetch(authLink)
        .then((response) => response.json())
        .then((data) => {
          const auth = data.auth || {};
          const uatLists = data.uatLists || {};
          const currentTime = Date.now();

          if (auth.access_token && auth.expires_in) {
            sessionStorage.setItem("auth_access_token", auth.access_token);
            sessionStorage.setItem("auth_expires_in", auth.expires_in);
            sessionStorage.setItem("auth_token_received_at", currentTime);
            sessionStorage.setItem("timer", 1800); // Set 30-minute timer
            startTimer(1800); // Start a new 30-minute timer
          }

          if (uatLists.access_token && uatLists.expires_in) {
            sessionStorage.setItem("uat_access_token", uatLists.access_token);
            sessionStorage.setItem("uat_expires_in", uatLists.expires_in);
            sessionStorage.setItem("uat_token_received_at", currentTime);
          }

          handleSetAuthTokenToQuote();
          toast.success(`${data.message}`);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  };

  const handleSetAuthTokenToQuote = async () => {
    const authTokens = sessionStorage.getItem("auth_access_token");

    const headers = {
      Authorization: `${authTokens}`,
      "Content-Type": "application/json",
    };

    const requestBody = {};

    try {
      const response = await axios.post(
        import.meta.env.VITE_TATA_AIG_4_WHEELER_QUOTE_URL,
        requestBody,
        { headers }
      );

      if (response.data.status === 200) {
        setQuoteResponses(response.data);
        toast.success(`${response.data.message_txt}`);
      } else {
        toast.error(`${response.data.message_txt}`);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
      } else {
        console.error("Request error:", error.message);
      }
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="bg-white shadow-md fixed w-full top-0 z-10">
        <div className="container mx-auto flex justify-between flex-wrap items-center p-2">
          {/* Logo */}
          <div className="text-xl font-bold">
            <img
              className="md:w-20 md:h-20 w-16 h-16 shadow-inner shadow-gray-300"
              src={logos}
              alt={insuranceName}
            />
          </div>
          <div className="container-flex flex justify-between">
            {/* Select Menu */}
            {subCategories ? (
              <select
                value={selectedOption}
                onChange={handleSelectChange}
                className="block appearance-none my-auto bg-white border-gray-300 py-2 ps-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value="">Select Insurance</option>
                {Object.keys(subCategories).map((subCat, index) => (
                  <option className="capitalize" key={index} value={subCat}>
                    {subCat}
                  </option>
                ))}
              </select>
            ) : (
              <p>N/A</p>
            )}
          </div>
          {/* Timer Component */}
          <TimerForAllUser currentTime={timer} />
        </div>
      </nav>

      {/* sidebar */}
      <aside className=" mt-20 fixed left-2 top-2 md:top-6 bottom-2 w-16 flex flex-col items-center justify-between bg-blue-700 rounded-md shadow-lg">
        <div className="flex flex-col justify-between items-end">
          <div className="w-full pt-6 flex flex-col items-center space-y-6">
            {sidebarItems.map((item, index) => (
              <div key={index} className="relative group">
                <button
                  data-tooltip-target={`tooltip-${index} tooltip-right`}
                  data-tooltip-placement="right"
                  className="text-white hover:bg-slate-900 shadow-inner rounded-full p-3"
                  aria-label={item.label}
                >
                  <item.icon className="h-6 w-6" />
                </button>
                {/* Tooltip */}
                <div
                  id={`tooltip-${index} tooltip-right`}
                  role="tooltip"
                  className="absolute left-0 -top-8 z-10 hidden group-hover:block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded- shadow-sm"
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>
          <div className="w-full pt-6 bottom-5 ">
            <button
              className="text-white hover:bg-slate-900 rounded-full p-2"
              aria-label="User profile">
              <User className="h-6 w-6" />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN/DYANAMIC SCREEN */}
      <main className="md:mt-20 mt-20 flex flex-col ml-20 mr-5">
        <VehicleRegistrationNo
          Check={<Check className="font-bold" />}
          MoveRight={<MoveRight width={20} />}
        />
        {/* <div className="flex justify-between flex-wrap"> */}
        {/* Selected Menu List */}
        {/* part-1 */}
        <div className="flex flex-col mt-4 md:mt-16 text-start">
          <h1 className="text-xl font-semibold space-x-5 p-4 ">
            Business Type
            <span className="text-red-500 font-extrabold"> *</span>
          </h1>
          <ul className="flex space-x-4 px-5">
            {menuItems.map((option, index) => (
              <li key={index}>
                <input
                  type="radio"
                  id={`hosting-${index}`}
                  name="hosting"
                  value={selectedSubOption}
                  className="hidden peer"
                  checked={selectedSubOption === option.name}
                  onChange={() => handleSubOptionChange(index)}
                />
                <label
                  htmlFor={`hosting-${index}`}
                  className={`inline-flex items-center justify-between w-full p-1 px-4 shadow-inner text-gray-500 bg-slate-100 border border-gray-200 rounded cursor-pointer peer-checked:border-blue-600 peer-checked:bg-gradient-to-t from-blue-700 to-blue-600 peer-checked:text-white hover:text-gray-600 hover:bg-gray-100`}
                >
                  <div className="block my-auto">
                    <div className="w-auto text-lg md:text-xl font-semibold">
                      {option.name}
                    </div>
                  </div>
                </label>
              </li>
            ))}
          </ul>
        </div>
        {/* part-2 */}
        <div className="flex flex-col mt-4 md:mt-10 text-start">
          <h1 className="text-xl font-semibold space-x-5 p-4 ">
            Customer Type
            <span className="text-red-500 font-extrabold"> *</span>
          </h1>

          <ul className="flex space-x-4 px-5">
            {customerType.map((cust, index) => (
              <li key={index}>
                <input
                  type="radio"
                  id={`h-${index}`}
                  name="h"
                  value={subCustType}
                  className="hidden peer"
                  checked={subCustType === cust}
                  onChange={() => setSubCustType(index)}
                />
                <label
                  htmlFor={`h-${index}`}
                  className={`inline-flex items-center justify-between w-full p-1 px-4 shadow-inner text-gray-500 bg-slate-100 border border-gray-200 rounded cursor-pointer peer-checked:border-blue-600 peer-checked:bg-gradient-to-t from-blue-700 to-blue-600 peer-checked:text-white hover:text-gray-600 hover:bg-gray-100`}
                >
                  <div className="block my-auto">
                    <div className="w-auto text-lg md:text-xl font-semibold">
                      {cust}
                    </div>
                  </div>
                </label>
              </li>
            ))}
          </ul>
        </div>
        {/* </div> */}
      </main>
    </>
  );
}

export default AllMotorInsurances;
