import { useState } from "react";
import { useLocation } from "react-router-dom";
import TimerForAllUser from "../Timer/TimerForAllUser.jsx";
import axios from "axios";
import { toast } from "react-toastify";
function AllMotorInsurances() {
  const location = useLocation();
  const { subCategories, logos, insuranceName } = location.state || {};
  const [selectedOption, setSelectedOption] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [selectedSubOption, setSelectedSubOption] = useState("");
  const [quoteResponses, setQuoteResponses] = useState("");

  console.log(quoteResponses);
  

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
    // selected names
    setSelectedSubOption(selectedOption.name);
    const authLink = selectedOption.authLink;

    if (authLink) {
      // Trigger the API call using fetch
      fetch(authLink)
        .then((response) => response.json())
        .then((data) => {
          // Check if auth or uatLists exist in the response and handle separately
          const auth = data.auth || {}; // assuming auth is part of the response
          const uatLists = data.uatLists || {}; // if uatLists is available in the response
          if (auth || uatLists) {
            const currentTime = Date.now(); // Get current time in millisecond
            // Store access_token and expires_in separately for auth
            if (auth.access_token && auth.expires_in) {
              sessionStorage.setItem("auth_access_token", auth.access_token);
              sessionStorage.setItem("auth_expires_in", auth.expires_in);
              sessionStorage.setItem("auth_token_received_at", currentTime);
              sessionStorage.setItem("timer", data.token_refresh_timer);
            }
            // Store access_token and expires_in separately for uatLists (if exists)
            if (uatLists.access_token && uatLists.expires_in) {
              sessionStorage.setItem("uat_access_token", uatLists.access_token);
              sessionStorage.setItem("uat_expires_in", uatLists.expires_in);
              sessionStorage.setItem("uat_token_received_at", currentTime); // Store the current time
            }
            // set auth token to quote
            handleSetAuthTokenToQuote();
            toast.success(`${data.message}`);

            console.log("Data stored in sessionStorage:", {
              auth: {
                access_token: auth.access_token,
                expires_in: auth.expires_in,
              },
              uatLists: {
                access_token: uatLists.access_token,
                expires_in: uatLists.expires_in,
              },
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  };

  const handleSetAuthTokenToQuote = async () => {
    // Retrieve tokens from sessionStorage
    const authTokens = sessionStorage.getItem("auth_access_token");
    // const uatTokens = sessionStorage.getItem("uat_access_token");

    // Prepare headers
    const headers = {
      Authorization: `${authTokens}`, // Set the auth token in the Authorization header
      "Content-Type": "application/json",
    };

    // Prepare the request body if needed (replace with the actual body structure)
    const requestBody = {
      source: "P",
      q_producer_email: "chitra2@gmail.com",
      q_producer_code: "4984727878",
      is_posp: "N",
      sol_id: "",
      q_office_location: "",
      pol_plan_id: "04",
      place_reg: "MUMBAI",
      vehicle_make: "TATA MOTORS",
      vehicle_model: "HARRIER",
      vehicle_variant: "XT",
      proposer_type: "Individual",
      proposer_pincode: "400001",
      proposer_gstin: "",
      proposer_salutation: "Mr",
      proposer_email: "chitra2@gmail.com",
      proposer_mobile: "9898989898",
      business_type_no: "01",
      dor: "2024-09-14",
      prev_pol_end_date: "",
      man_year: 2023,
      pol_start_date: "2024-09-20",
      prev_pol_type: "",
      claim_last: "false",
      pre_pol_ncb: "0",
      BH_regno: "true",
      special_regno: "false",
      regno_1: "22",
      regno_2: "BH",
      regno_3: "6517",
      regno_4: "A",
      prev_cnglpg: "No",
      cng_lpg_cover: "No",
      cng_lpg_si: "",
      electrical_si: "",
      non_electrical_si: "",
      uw_loading: "",
      uw_remarks: "",
      uw_discount: "",
      prev_tyre: "",
      tyre_secure: "No",
      tyre_secure_options: "DEPRECIATION BASIS",
      prev_engine: "",
      engine_secure: "No",
      engine_secure_options: "WITH DEDUCTIBLE",
      prev_dep: "No",
      dep_reimburse: "No",
      dep_reimburse_claims: "2",
      add_towing: "No",
      add_towing_amount: "",
      return_invoice: "No",
      prev_consumable: "",
      consumbale_expense: "No",
      rsa: "No",
      key_replace: "No",
      repair_glass: "No",
      emergency_expense: "No",
      personal_loss: "No",
      daily_allowance: "No",
      allowance_days_accident: "",
      daily_allowance_limit: "",
      allowance_days_loss: "",
      franchise_days: "",
      pa_owner: "true",
      pa_owner_tenure: "1",
      pa_owner_declaration: "None",
      pa_unnamed: "No",
      pa_unnamed_no: "",
      pa_unnamed_si: "",
      pa_named: "",
      pa_paid: "No",
      pa_paid_no: "",
      pa_paid_si: "",
      ll_paid: "No",
      ll_paid_no: "1",
      ll_paid_si: "",
      automobile_association_cover: "No",
      vehicle_blind: "No",
      antitheft_cover: "No",
      voluntary_amount: "",
      tppd_discount: "No",
      vintage_car: "No",
      own_premises: "No",
      load_fibre: "No",
      load_imported: "No",
      load_tuition: "No",
      pa_unnamed_csi: "",
      vehicle_make_no: 140,
      vehicle_model_no: 10361,
      vehicle_variant_no: "103912",
      place_reg_no: "99",
      pol_plan_variant: "PackagePolicy",
      proposer_fname: "",
      proposer_mname: "",
      proposer_lname: "",
      pre_pol_protect_ncb: null,
      claim_last_amount: null,
      claim_last_count: null,
      quote_id: "",
      product_id: "M300000000001",
      product_code: "3184",
      product_name: "Private Car",
      ncb_protection: "No",
      ncb_no_of_claims: "1",
      motor_plan_opted: "Silver",
      motor_plan_opted_no: "P1",
      vehicle_idv: "",
      __finalize: "1",
    };

    try {
      // Make the POST request using axios
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

      // Further actions based on response
    } catch (error) {
      // Handle error
      if (error.response) {
        console.error("Error response:", error.response.data);
      } else {
        console.error("Request error:", error.message);
      }
    }
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-10">
      <div className="container mx-auto flex sm:justify-between justify-evenly flex-wrap items-center p-2">
        {/* Logo */}
        <div className="text-xl font-bold">
          <img
            className="md:w-20 md:h-20 w-12 h-12 shadow-inner shadow-gray-300"
            src={logos}
            alt={insuranceName}
          />
        </div>
        <div className="container-flex flex justify-center">
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
            <p>Not Able to Select</p>
          )}
        </div>
        {/* Selected Menu List */}
        <ul className="flex space-x-4">
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
                className={`inline-flex items-center justify-between w-full p-1 px-4 text-gray-500 bg-white border border-gray-200 rounded cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 
                  dark:peer-checked:text-blue-500 peer-checked:border-green-600 peer-checked:bg-green-100 peer-checked:text-green-700 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700`}
              >
                <div className="block my-auto">
                  <div className="w-auto text-base font-semibold">
                    {option.name}
                  </div>
                </div>
              </label>
            </li>
          ))}
        </ul>
        <TimerForAllUser />
      </div>
    </nav>
  );
}

export default AllMotorInsurances;
