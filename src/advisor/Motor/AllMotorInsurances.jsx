import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import VehicleRegistrationNo from "../vehicleNumber/VehicleRegistrationNo.jsx";
import { Check, MoveRight } from "lucide-react";
import Asidebar from "../API/Asidebar/Asidebar.jsx";
import Navbar from "../API/Navbar/Navbar.jsx";

function AllMotorInsurances() {
  const [selectedOption, setSelectedOption] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [selectedSubOption, setSelectedSubOption] = useState("");
  const [subCustType, setSubCustType] = useState("");
  const [customerType, setCutomerType] = useState([]);
  const [quoteResponses, setQuoteResponses] = useState("");

  console.log(quoteResponses);

  const handleSubOptionChange = (index) => {
    const selectedOption = menuItems[index];
    sessionStorage.setItem("selectedSubOption", selectedOption.name);
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

  useEffect(() => {
    const storedOption1 = sessionStorage.getItem("selectedSubOption");
    if (storedOption1) {
      setSelectedSubOption(storedOption1);
    }
  }, [setSelectedSubOption]); // Empty dependency array ensures this runs only once on component mount
  
  



  const handleSetAuthTokenToQuote = async () => {
    const authTokens = sessionStorage.getItem("auth_access_token");
    const headers = {
      Authorization: `${authTokens}`,
      "Content-Type": "application/json",
    };

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
      pol_start_date: "2024-09-24",
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
      <Navbar
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        setMenuItems={setMenuItems}
        selectedSubOption={selectedSubOption}
      />
      {/* sidebar */}
      <Asidebar />
      {/* MAIN/DYANAMIC SCREEN */}
      <main className="md:mt-20 mt-20 flex flex-col ml-20 mr-5">
        {selectedOption  && (
          <>
            <VehicleRegistrationNo
              Check={<Check className="font-bold" />}
              MoveRight={<MoveRight width={20} />}
            />
 
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
          </>
        )}


        {/* part-2 */}
        {selectedSubOption && (
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
        )}
      </main>
    </>
  );
}

export default AllMotorInsurances;
