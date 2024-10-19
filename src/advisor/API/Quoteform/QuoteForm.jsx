/* eslint-disable react/prop-types */
import { useState } from "react";
import Data from "../Data.jsx";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/high-res.css";
import { toast } from "react-toastify";
// import VehicleRegistrationNo from "../../vehicleNumber/VehicleRegistrationNo.jsx";
// import { NavLink } from "react-router-dom";

function QuoteForm({ onSubmit, handle }) {
  const [phone, setPhone] = useState("");
  const [selectedBusinessName, setSelectedBusinessName] = useState("");
  const [selectedCustomerType, setSelectedCustomerType] = useState("");
  const [selectedPolicyPlan, setSelectedPolicyPlan] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false); // for popup
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [stepsCompleted, setStepsCompleted] = useState([
    false,
    false,
    false,
    false,
  ]);

  const [formData, setFormData] = useState({
    source: "P",
    q_producer_email: "chitra2@gmail.com",
    q_producer_code: "4984727878",
    is_posp: "N",
    sol_id: "",
    q_office_location: "",
    pol_plan_id: "",
    place_reg: "",
    vehicle_make: "",
    vehicle_model: "",
    vehicle_variant: "",
    proposer_type: "",
    proposer_pincode: "",
    proposer_gstin: "",
    proposer_salutation: "",
    proposer_email: "",
    proposer_mobile: "",
    business_type_no: "", // Business Type selection will update this
    dor: "",
    prev_pol_end_date: "",
    man_year: "",
    pol_start_date: "2024-10-19",
    prev_pol_type: "",
    claim_last: "",
    pre_pol_ncb: "",
    BH_regno: "false",
    special_regno: "false",
    regno_1: "",
    regno_2: "",
    regno_3: "",
    regno_4: "",
    prev_cnglpg: "",
    cng_lpg_cover: "",
    cng_lpg_si: "",
    electrical_si: "",
    non_electrical_si: "",
    uw_loading: "",
    uw_remarks: "",
    uw_discount: "",
    prev_tyre: "",
    tyre_secure: "",
    tyre_secure_options: "",
    prev_engine: "",
    engine_secure: "",
    engine_secure_options: "",
    prev_dep: "",
    dep_reimburse: "",
    dep_reimburse_claims: "",
    add_towing: "",
    add_towing_amount: "",
    return_invoice: "",
    prev_consumable: "",
    consumbale_expense: "",
    rsa: "",
    key_replace: "",
    repair_glass: "",
    emergency_expense: "",
    personal_loss: "",
    daily_allowance: "",
    allowance_days_accident: "",
    daily_allowance_limit: "",
    allowance_days_loss: "",
    franchise_days: "",
    pa_owner: "",
    pa_owner_tenure: "",
    pa_owner_declaration: "",
    pa_unnamed: "",
    pa_unnamed_no: "",
    pa_unnamed_si: "",
    pa_named: "",
    pa_paid: "",
    pa_paid_no: "",
    pa_paid_si: "",
    ll_paid: "",
    ll_paid_no: "",
    ll_paid_si: "",
    automobile_association_cover: "",
    vehicle_blind: "",
    antitheft_cover: "",
    voluntary_amount: "",
    tppd_discount: "",
    vintage_car: "",
    own_premises: "",
    load_fibre: "",
    load_imported: "",
    load_tuition: "",
    pa_unnamed_csi: "",
    vehicle_make_no: "",
    vehicle_model_no: "",
    vehicle_variant_no: "",
    place_reg_no: "",
    pol_plan_variant: "",
    proposer_fname: "",
    proposer_mname: "",
    proposer_lname: "",
    pre_pol_protect_ncb: "",
    claim_last_amount: "",
    claim_last_count: "",
    quote_id: "",
    product_id: "",
    product_code: "",
    product_name: "",
    ncb_protection: "",
    ncb_no_of_claims: "",
    motor_plan_opted: "",
    motor_plan_opted_no: "",
    vehicle_idv: "",
    __finalize: "",
  });

  const [registrationParts, setRegistrationParts] = useState(["", "", "", ""]);
  const [registrationType, setRegistrationType] = useState("default"); // default value

  const validateStep = (stepNumber) => {
    const newErrors = {};
    let isValid = true;

    if (stepNumber === 1) {
      if (!formData.business_type_no) {
        newErrors["business_type_no"] = "required";
        isValid = false;
      }
      if (!formData.proposer_type) {
        newErrors["proposer_type"] = "required";
        isValid = false;
      }
      if (!formData.proposer_pincode) {
        newErrors["proposer_pincode"] = "required";
        isValid = false;
      }
      if (!formData.pol_plan_id) {
        newErrors["pol_plan_id"] = "required";
        isValid = false;
      }
      if (!formData.man_year) {
        newErrors["man_year"] = "required";
        isValid = false;
      }
      if (!formData.dor) {
        newErrors["dor"] = "required";
        isValid = false;
      }
      if (!formData.vehicle_make) {
        newErrors["vehicle_make"] = "required";
        isValid = false;
      }
      if (!formData.vehicle_model) {
        newErrors["vehicle_model"] = "required";
        isValid = false;
      }
      if (!formData.vehicle_variant) {
        newErrors["vehicle_variant"] = "required";
        isValid = false;
      }
      if (!formData.place_reg) {
        newErrors["place_reg"] = "required";
        isValid = false;
      }
      if (!formData.cng_lpg_cover) {
        newErrors["cng_lpg_cover"] = "required";
        isValid = false;
      }
      // if (!formData.daily_allowance) {
      //   newErrors["daily_allowance"] = "required";
      //   isValid = false;
      // }
      if (registrationType && !formData.regno_1) {
        newErrors["regno_1"] = "Please fill in the reg no.";
        isValid = false;
      } else if (registrationType && !formData.regno_2) {
        newErrors["regno_2"] = "Please fill in the reg no. 2";
        isValid = false;
      } else if (registrationType && !formData.regno_3) {
        newErrors["regno_3"] = "Please fill in the reg no. 3";
        isValid = false;
      } else if (registrationType && !formData.regno_4) {
        newErrors["regno_4"] = "Please fill in the reg no. 4";
        isValid = false;
      } else {
        // Validate registration fields based on the selected registration type
        if (!registrationType) {
          newErrors["registrationType"] = "Please select a Registration Type.";
          isValid = false;
        }
        // You can add further validations for regno_2, regno_3, etc., if required
      }
    } else if (stepNumber === 2) {
      if (!formData.proposer_email) {
        newErrors["proposer_email"] = "required";
        isValid = false;
      }
      if (!formData.proposer_fname) {
        newErrors["proposer_fname"] = "required";
        isValid = false;
      }
      if (!formData.proposer_lname) {
        newErrors["proposer_lname"] = "required";
        isValid = false;
      }
      if (!phone) {
        newErrors["phone"] = "required";
        isValid = false;
      }
    } else if (stepNumber === 3) {
      if (!formData.pa_owner) {
        newErrors["pa_owner"] = "required";
        isValid = false;
      }
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < 4) {
        setStep((prevStep) => prevStep + 1);
        setStepsCompleted((prev) => {
          const newCompleted = [...prev];
          newCompleted[step - 1] = true;
          return newCompleted;
        });
      }
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1);
    }
  };

  // Input field changes
  const handleInputChange = (index, value) => {
    const updatedParts = [...registrationParts];
    updatedParts[index] = value;

    // Update formData with corresponding registration number parts
    const keys = ["regno_1", "regno_2", "regno_3", "regno_4"];
    setRegistrationParts(updatedParts);
    console.log([keys[index]] + ":" + value);
    setFormData({
      ...formData,
      [keys[index]]: value,
    });
  };

  // Update the form data when a radio button is selected
  const handleRadioChange = (type) => {
    let updatedFormData = { ...formData };
    if (type === "BH_regno") {
      updatedFormData = {
        ...updatedFormData,
        BH_regno: "true",
        special_regno: "false",
      };
    } else if (type === "special_regno") {
      updatedFormData = {
        ...updatedFormData,
        BH_regno: "false",
        special_regno: "true",
      };
    } else {
      updatedFormData = {
        ...updatedFormData,
        BH_regno: "false",
        special_regno: "false",
      };
    }
    setFormData(updatedFormData);
    setRegistrationType(type);
    setRegistrationParts(["", "", "", ""]);
  };

  // Handler for phone input change
  const handlePhoneChange = (value) => {
    setPhone(value); // Update local state
    setFormData({
      ...formData,
      proposer_mobile: value.slice(2), // Update formData with the phone number
    });
  };

  // Validation logic for registration number
  const validateRegistrationNumber = () => {
    const number = registrationParts.join("");
    const defaultRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/;
    const bharatRegex = /^[0-9]{2}BH[0-9]{4}[A-Z]{1,2}$/;
    const specialRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{1,3}[0-9]{4}$/;

    if (registrationType === "default") return defaultRegex.test(number);
    if (registrationType === "bharat") return bharatRegex.test(number);
    if (registrationType === "special") return specialRegex.test(number);
    return false;
  };

  // Placeholder based on registration type
  const getPlaceholders = () => {
    switch (registrationType) {
      case "default":
        return ["GJ", "01", "AA", "1234"];
      case "bharat":
        return ["22", "BH", "1234", "AB"];
      case "special":
        return ["GJ", "01", "AAA", "1234"];
      default:
        return ["", "", "", ""];
    }
  };

  // Max lengths for each part
  const getMaxLengths = () => {
    switch (registrationType) {
      case "default":
        return [2, 2, 2, 4];
      case "bharat":
        return [2, 2, 4, 2];
      case "special":
        return [2, 2, 3, 4];
      default:
        return [2, 2, 2, 4];
    }
  };

  // Handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "prev_pol_type") {
      // If prev_pol_type is selected (not empty), set claim_last to "true"
      setFormData({
        ...formData,
        [name]: value,
        claim_last: value ? "true" : "false",
      });
    } else if (name === "business_type_no") {
      // Find the selected business name based on the selected value
      const selectedBusiness1 = Data.business_types.find(
        (business) => business.value === value
      );
      setSelectedBusinessName(selectedBusiness1 ? selectedBusiness1.name : "");
      setFormData({
        ...formData,
        [name]: value,
        prev_cnglpg: value === "3" ? "Yes" : "No",
      });
      handle(parseInt(value)); // Assuming handle name send to allmotorinsurances data is a defined function
    } else if (name === "proposer_type") {
      const selectedType = Data.customerTypes.find(
        (type) => type.value === value
      );
      setFormData({
        ...formData,
        [name]: value,
      });
      // Set the selected customer type
      setSelectedCustomerType(selectedType ? selectedType.label : "");
    } else if (name === "pol_plan_id") {
      const selectedPlan = Data.policyPlans.find((plan) => plan.id === value);
      setFormData({
        ...formData,
        [name]: value,
      });

      // Update selected plan name
      setSelectedPolicyPlan(selectedPlan ? selectedPlan.name : "");
    } else {
      setFormData({
        ...formData,
        [name]: value,
        __finalize: "0",
      });
    }
  };

  const fieldMappings = [
    {
      label: "Business Type",
      value: `(${formData.business_type_no}) ${selectedBusinessName}`,
    },
    { label: "Customer Type", value: selectedCustomerType },
    {
      label: "Policy Plan",
      value: `(${formData.pol_plan_id}) ${selectedPolicyPlan}`,
    },
    { label: "Veh. Reg. Type", value: registrationType },
    { label: "Veh. Reg. No", value: registrationParts },
    { label: "Pincode", value: formData.proposer_pincode },
    { label: "Reg. Place", value: formData.place_reg },
    { label: "Mfg Year", value: formData.man_year },
    { label: "Dor", value: formData.dor },
    { label: "Vehicle Manufacturer", value: formData.vehicle_make },
    { label: "Model", value: formData.vehicle_model },
    { label: "Variant", value: formData.vehicle_variant },
    { label: "Prev CNG/LPG", value: formData.prev_cnglpg },
    { label: "CNG/LPG Cover", value: formData.cng_lpg_cover },
    { label: "Tyre Secure", value: formData.tyre_secure },
    { label: "Engine Secure", value: formData.engine_secure },
    { label: "Dep Reimburse", value: formData.dep_reimburse },
    { label: "Add Towing", value: formData.add_towing },
    { label: "Return Invoice", value: formData.return_invoice },
    { label: "Consumbale Exp.", value: formData.consumbale_expense },
    { label: "Rsa", value: formData.rsa },
    { label: "Key Replace", value: formData.key_replace },
    { label: "Repair Glass", value: formData.repair_glass },
    { label: "Emergency Exp.", value: formData.emergency_expense },
    { label: "Personal Loss", value: formData.personal_loss },
    { label: "Daily Allowance", value: formData.daily_allowance },
    { label: "Pa Unnamed", value: formData.pa_unnamed },
    {
      label: "Automobile Asso. Cover",
      value: formData.automobile_association_cover,
    },
    { label: "Pa Paid", value: formData.pa_paid },
    { label: "Ll Paid", value: formData.ll_paid },
    { label: "Vehicle Blind", value: formData.vehicle_blind },
    { label: "Antitheft Cover", value: formData.antitheft_cover },
  ];

  // Add conditional fields based on business_type_no === "3"
  if (formData.business_type_no === "3") {
    fieldMappings.push(
      { label: "Prev Policy Type", value: formData.prev_pol_type },
      { label: "Prev Policy NCB", value: formData.pre_pol_ncb },
      { label: "Prev Tyre", value: formData.prev_tyre },
      { label: "Prev Engine", value: formData.prev_engine },
      { label: "Prev Dep", value: formData.prev_dep },
      { label: "Prev Consumable", value: formData.prev_consumable }
    );
  }
  if (step && (step === 3 || step === 4)) {
    fieldMappings.push(
      {
        label: "Full Name",
        value: `${formData.proposer_salutation} ${formData.proposer_fname} ${
          formData.proposer_mname ? formData.proposer_mname + " " : ""
        } ${formData.proposer_lname}`,
      },
      { label: "Email ID", value: formData.proposer_email },
      { label: "Mobile No", value: formData.proposer_mobile },
      {
        label: "Atmob. Ascn Cover",
        value: formData.automobile_association_cover,
      },
      { label: "Pa Paid", value: formData.pa_paid },
      { label: "Ll Paid", value: formData.ll_paid },
      { label: "Vehicle Blind", value: formData.vehicle_blind },
      { label: "Antitheft Cover", value: formData.antitheft_cover },
      { label: "Tppd Discount", value: formData.tppd_discount },
      { label: "Vintage Car", value: formData.vintage_car },
      { label: "Own Premises", value: formData.own_premises },
      { label: "Load Fibre", value: formData.load_fibre },
      { label: "Load Imported", value: formData.load_imported },
      { label: "Load Tuition", value: formData.load_tuition },
      { label: "Ncb Protection", value: formData.ncb_protection },
      { label: "Veh. IDV", value: formData.vehicle_idv },
      { label: "Cng Lpg Si", value: formData.cng_lpg_si },
      { label: "Electrical Si", value: formData.electrical_si },
      { label: "Non Electrical Si", value: formData.non_electrical_si },
      { label: "Uw Loading", value: formData.uw_loading },
      { label: "Uw Remarks", value: formData.uw_remarks },
      { label: "Uw Discount", value: formData.uw_discount },
      { label: "Tyre Secure Options", value: formData.tyre_secure_options },
      {
        label: "Engine Secure Options",
        value: formData.engine_secure_options,
      },
      { label: "Towing Amount", value: formData.add_towing_amount },
      { label: "Dep Reimburse Claims", value: formData.dep_reimburse_claims },
      {
        label: "Allowance Days Accident",
        value: formData.allowance_days_accident,
      },
      { label: "Daily Allowance Limit", value: formData.daily_allowance_limit }
    );
  }
  if (step && step === 4) {
    fieldMappings.push(
      { label: "PA Owner", value: formData.pa_owner },
      { label: "Onwer Tenure", value: formData.pa_owner_tenure },
      { label: "Pa Owner Declaration", value: formData.pa_owner_declaration },
      {
        label: "Allowance Days Loss",
        value: formData.allowance_days_loss,
      },
      { label: "Franchise Days", value: formData.franchise_days },
      { label: "Pa Unnamed No", value: formData.pa_unnamed_no },
      { label: "Pa Unnamed Si", value: formData.pa_unnamed_si },
      { label: "Pa Named", value: formData.pa_named },
      { label: "Pa Unnamed Csi", value: formData.pa_unnamed_csi },
      { label: "Pa Paid No", value: formData.pa_paid_no },
      { label: "Pa Paid Si", value: formData.pa_paid_si },
      { label: "Ll Paid No", value: formData.ll_paid_no },
      { label: "Ll Paid Si", value: formData.ll_paid_si },
      { label: "Voluntary Amount", value: formData.voluntary_amount }
    );
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid md:grid-cols-5 justify-items-stretch grid-cols-2 content-center gap-6">
              <div>
                <h1 className="font-semibold text-sm  text-start  md:text-base space-x-2 md:space-x-5 md:px-6 p-1 ">
                  Business Type
                  <span className="text-red-500 font-extrabold"> *</span>
                </h1>
                <ul className="grid grid-cols-2 justify-items-center gap-4">
                  {Data.business_types?.map((business) => (
                    <div key={business.id}>
                      <input
                        type="radio"
                        name="business_type_no"
                        id={business.id}
                        className="hidden peer"
                        value={business.value}
                        onChange={handleChange}
                        checked={formData.business_type_no === business.value}
                      />
                      <label
                        htmlFor={business.id}
                        className={`${
                          errors["business_type_no"] ? "border-red-500" : ""
                        } inline-flex items-center px-2 justify-between p-1 shadow-inner text-gray-500 bg-slate-100 border border-gray-200 rounded cursor-pointer peer-checked:border-blue-600 peer-checked:bg-gradient-to-t from-blue-700 to-blue-600 peer-checked:text-white hover:text-gray-600 hover:bg-gray-100`}
                      >
                        <div className="md:block flex flex-wrap my-auto">
                          <div className="w-auto text-base md:text-lg text-nowrap font-semibold capitalize">
                            {business.name} {/* Display the option name */}
                          </div>
                        </div>
                      </label>
                    </div>
                  ))}
                </ul>
                {errors["business_type_no"] && (
                  <p className="text-red-500 text-sm text-start  md:text-base md:px-4">
                    {errors["business_type_no"]}
                  </p>
                )}
              </div>

              <div>
                <h1 className=" text-sm text-start md:text-base font-semibold space-x-2 md:space-x-5 md:px-4 p-1">
                  Customer Type
                  <span className="text-red-500 font-extrabold"> *</span>
                </h1>
                <div className="flex space-x-2 md:space-x-3 md:px-4 p-1">
                  {Data.customerTypes.map((type) => (
                    <div key={type.id}>
                      <input
                        type="radio"
                        name="proposer_type"
                        id={type.id}
                        className="hidden peer"
                        value={type.value}
                        onChange={handleChange}
                        checked={formData.proposer_type === type.value}
                      />
                      <label
                        htmlFor={type.id}
                        className={`${
                          errors["proposer_type"] ? "border-red-500 " : ""
                        } inline-flex  items-center px-2 justify-between p-1 shadow-inner text-gray-500 bg-slate-100 border border-gray-200 rounded cursor-pointer peer-checked:border-blue-600 peer-checked:bg-gradient-to-t from-blue-700 to-blue-600 peer-checked:text-white hover:text-gray-600 hover:bg-gray-100`}
                      >
                        <div className="block my-auto">
                          <div className="w-auto text-base md:text-lg font-semibold">
                            {type.label}
                          </div>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
                {errors["proposer_type"] && (
                  <p className="text-red-500 text-sm text-start  md:text-base md:px-4">
                    {errors["proposer_type"]}
                  </p>
                )}
              </div>

              <div>
                <h1 className="text-sm text-start md:text-base font-semibold space-x-2 md:space-x-5 md:px-4 p-1">
                  Policy Plan
                  <span className="text-red-500 font-extrabold"> *</span>
                </h1>
                <div className="flex p-1 md:px-4">
                  <select
                    name="pol_plan_id"
                    value={formData.pol_plan_id}
                    onChange={handleChange}
                    className={`${
                      errors["pol_plan_id"]
                        ? "border-red-500 text-red-500"
                        : "border-none"
                    } items-center   text-sm md:text-inherit w-4/5 md:w-auto  md:p-2 p-1.5 ps-2 font-semibold shadow-inner text-gray-500 bg-slate-100 rounded cursor-pointer  hover:text-gray-600 hover:bg-gray-100`}
                  >
                    <option
                      className="font-semibold md:text-base text-sm p-0"
                      value=""
                    >
                      Select Policy Plan
                    </option>
                    {Data.policyPlans.map((plan) => (
                      <option
                        key={plan.id}
                        value={plan.id}
                        className="md:text-base text-sm p-0"
                      >
                        {plan.name}
                      </option>
                    ))}
                  </select>
                </div>
                {errors["pol_plan_id"] && (
                  <p className="text-red-500 text-sm text-start  md:text-base md:px-4">
                    {errors["pol_plan_id"]}
                  </p>
                )}
              </div>

              <div>
                <h1 className="text-sm text-start md:text-base font-semibold space-x-2 md:space-x-5 md:px-4 p-1">
                  Registration Number
                  <span className="text-red-500 font-extrabold"> *</span>
                </h1>
                <div className="flex p-1 md:px-4 md:space-x-4 md:p-1">
                  <div className="flex-wrap">
                    {/* Default Option */}
                    <div className="flex flex-wrap mb-4 items-center">
                      <input
                        type="radio"
                        name="registrationType"
                        value="default"
                        id="registrationType"
                        className="cursor-pointer hidden peer"
                        checked={registrationType === "default"}
                        onChange={() => handleRadioChange("default")}
                      />
                      <label
                        htmlFor="registrationType"
                        className={`inline-flex items-center px-2 justify-between p-1 shadow-inner text-gray-500 bg-slate-100 border border-gray-200 rounded cursor-pointer ${
                          registrationType === "default"
                            ? "border-blue-600 bg-gradient-to-t from-blue-700 to-blue-600 text-white"
                            : "hover:text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <div className="block my-auto">
                          <div className="w-auto text-base md:text-lg font-semibold">
                            Default
                          </div>
                        </div>
                      </label>

                      {/* Bharat Vehicle No. */}
                      <input
                        type="radio"
                        name="registrationType"
                        value="bharat"
                        id="BH_regno"
                        className="cursor-pointer hidden peer"
                        checked={registrationType === "bharat"}
                        onChange={() => handleRadioChange("bharat")}
                      />
                      <label
                        htmlFor="BH_regno"
                        className={`inline-flex items-center mx-3 px-2 justify-between p-1 shadow-inner text-gray-500 bg-slate-100 border border-gray-200 rounded cursor-pointer ${
                          registrationType === "bharat"
                            ? "border-blue-600 bg-gradient-to-t from-blue-700 to-blue-600 text-white"
                            : "hover:text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <div className="block my-auto">
                          <div className="w-auto text-base md:text-lg font-semibold">
                            Bharat
                          </div>
                        </div>
                      </label>

                      {/* Special Vehicle No. */}
                      <input
                        type="radio"
                        name="registrationType"
                        className="cursor-pointer hidden peer"
                        value="special"
                        id="special_regno"
                        checked={registrationType === "special"}
                        onChange={() => handleRadioChange("special")}
                      />
                      <label
                        htmlFor="special_regno"
                        className={`inline-flex items-center px-2 justify-between p-1 shadow-inner text-gray-500 bg-slate-100 border border-gray-200 rounded cursor-pointer ${
                          registrationType === "special"
                            ? "border-blue-600 bg-gradient-to-t from-blue-700 to-blue-600 text-white"
                            : "hover:text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <div className="block my-auto">
                          <div className="w-auto text-base md:text-lg font-semibold">
                            Special
                          </div>
                        </div>
                      </label>
                    </div>
                    <div className="flex justify-between flex-wrap ">
                      <div className="flex space-x-2">
                        {registrationParts.map((part, index) => (
                          <input
                            key={index}
                            className={`${
                              errors[`regno_${index + 1}`]
                                ? "border-red-500"
                                : "border-none"
                            }   flex md:py-1 py-2 w-1/2 rounded uppercase text-center bg-slate-100 shadow-inner text-xl font-bold`}
                            placeholder={getPlaceholders()[index]}
                            maxLength={getMaxLengths()[index]}
                            value={part}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                e.target.value.toUpperCase()
                              )
                            }
                          />
                        ))}
                      </div>
                      {(errors["regno_1"] ||
                        errors["regno_2"] ||
                        errors["regno_3"] ||
                        errors["regno_4"]) && (
                        <p className="text-red-500 text-sm text-start md:text-base md:px-2">
                          {errors["regno_1"] ||
                            errors["regno_2"] ||
                            errors["regno_3"] ||
                            errors["regno_4"]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h1 className="text-sm text-start md:text-base font-semibold space-x-2 md:space-x-5 md:px-4 p-1">
                  Pincode
                  <span className="text-red-500 font-extrabold"> *</span>
                </h1>
                <div className="flex p-1 md:px-4">
                  <select
                    name="proposer_pincode"
                    value={formData.proposer_pincode}
                    onChange={handleChange}
                    className={`${
                      errors["proposer_pincode"]
                        ? "border-red-500 text-red-500"
                        : "border-none"
                    }items-center text-base md:text-inherit font-semibold md:p-2 p-1.5 ps-2 shadow-inner text-gray-500 bg-slate-100 rounded cursor-pointer  hover:text-gray-600 hover:bg-gray-100`}
                  >
                    <option className="font-semibold" value="">
                      Select Pincode
                    </option>
                    <option className="font-semibold" value="805110">
                      nwd
                    </option>
                    {/* {Data.policyPlans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name}
                </option>
              ))} */}
                  </select>
                </div>
                {errors["proposer_pincode"] && (
                  <p className="text-red-500 text-sm text-start  md:text-base md:px-4">
                    {errors["proposer_pincode"]}
                  </p>
                )}
              </div>

              {formData.business_type_no === "3" && (
                <div>
                  <h1 className="text-sm text-start md:text-base font-semibold space-x-2 md:space-x-5 md:px-4 p-1">
                    Prev Policy Type
                    <span className="text-red-500 font-extrabold"> *</span>
                  </h1>
                  <div className="flex p-2 md:px-4  space-x-1 md:space-x-4 md:p-1">
                    {Data.policyTypes.map((type) => (
                      <div key={type.id} className="flex items-center">
                        <input
                          type="radio"
                          name="prev_pol_type"
                          id={type.id}
                          className="hidden peer"
                          value={type.value}
                          onChange={handleChange}
                          checked={formData.prev_pol_type === type.value}
                        />
                        <label
                          htmlFor={type.id}
                          className={`inline-flex items-center px-2 justify-between p-1  shadow-inner text-gray-500 bg-slate-100 border border-gray-200 rounded cursor-pointer peer-checked:border-blue-600 peer-checked:bg-gradient-to-t from-blue-700 to-blue-600 peer-checked:text-white hover:text-gray-600 hover:bg-gray-100`}
                        >
                          <div className="block my-auto">
                            <div className="w-auto text-base md:text-lg font-semibold">
                              {type.label}
                            </div>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <h1 className="text-sm text-start md:text-base font-semibold space-x-2 md:space-x-5 md:px-4 p-1">
                  Reg. Place + place_reg_no as code
                  <span className="text-red-500 font-extrabold">*</span>
                </h1>
                <div className="flex p-1 md:px-4">
                  <select
                    name="place_reg"
                    value={formData.place_reg}
                    onChange={handleChange}
                    className={`${
                      errors["proposer_pincode"]
                        ? "border-red-500 text-red-500"
                        : "border-none"
                    } items-center text-base md:text-inherit font-semibold md:p-2 p-1.5 shadow-inner text-gray-500 bg-slate-100 rounded cursor-pointer  hover:text-gray-600 hover:bg-gray-100`}
                  >
                    <option className="font-semibold" value="">
                      Select City
                    </option>
                    <option className="font-semibold" value="patna">
                      Patna
                    </option>
                    {/* {Data.policyPlans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name}
                </option>
              ))} */}
                  </select>
                </div>
                {errors["place_reg"] && (
                  <p className="text-red-500 text-sm text-start  md:text-base md:px-4">
                    {errors["place_reg"]}
                  </p>
                )}
              </div>

              <div>
                <h1 className="text-sm text-start md:text-base font-semibold space-x-2 md:space-x-5 md:px-4 p-1">
                  Mfg Year
                  <span className="text-red-500 font-extrabold">*</span>
                </h1>
                <div className="flex p-1 md:px-4">
                  <input
                    name="man_year"
                    type="text"
                    min={1700}
                    max={2100}
                    value={formData.man_year}
                    onChange={handleChange}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Only allows numbers
                    }}
                    className={`${
                      errors["man_year"] ? "border-red-500" : "border-none"
                    }
                      items-center  text-base md:text-inherit font-semibold md:p-2 p-1.5 shadow-inner text-gray-500 bg-slate-100 rounded cursor-pointer  hover:text-gray-600 hover:bg-gray-100`}
                  />
                </div>
                {errors["man_year"] && (
                  <p className="text-red-500 text-sm text-start  md:text-base md:px-4">
                    {errors["man_year"]}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <h1 className="text-sm text-start md:text-base font-semibold space-x-2 md:space-x-4 md:px-4 p-1">
                  DOR
                  <span className="text-red-500 font-extrabold">*</span>
                </h1>
                <div className="flex p-1 md:px-4">
                  <input
                    name="dor"
                    type="date"
                    value={formData.dor}
                    onChange={handleChange}
                    className={`${
                      errors["dor"] ? "border-red-500" : "border-none"
                    } items-center text-base md:text-inherit font-semibold md:p-2 p-1 shadow-inner text-gray-500 bg-slate-100 rounded cursor-pointer  hover:text-gray-600 hover:bg-gray-100`}
                  />
                </div>
                {errors["dor"] && (
                  <p className="text-red-500 text-sm text-start  md:text-base md:px-4">
                    {errors["dor"]}
                  </p>
                )}
              </div>

              <div>
                <h1 className="text-sm text-start md:text-base font-semibold space-x-2 md:space-x-4 md:px-4 p-1">
                  Vehicle Mfr
                  <span className="text-red-500 font-extrabold"> *</span>
                </h1>
                <div className="flex p-1 md:px-4">
                  <select
                    name="vehicle_make"
                    value={formData.vehicle_make}
                    onChange={handleChange}
                    required
                    className={`${
                      errors["vehicle_make"] ? "border-red-500" : "border-none"
                    } items-center  text-base md:text-inherit font-semibold md:p-2 p-1.5 shadow-inner text-gray-500 bg-slate-100 rounded cursor-pointer  hover:text-gray-600 hover:bg-gray-100`}
                  >
                    <option className="font-semibold" value="">
                      Select Manufacturer
                    </option>
                    <option className="font-semibold" value="tata">
                      Tata
                    </option>
                    {/* {Data.policyPlans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name}
                </option>
              ))} */}
                  </select>
                </div>
                {errors["vehicle_make"] && (
                  <p className="text-red-500 text-sm text-start  md:text-base md:px-4">
                    {errors["vehicle_make"]}
                  </p>
                )}
              </div>
              <div>
                <h1 className="text-sm text-start md:text-base font-semibold space-x-2 md:space-x-4 md:px-4 p-1">
                  Vehicle Model
                  <span className="text-red-500 font-extrabold"> *</span>
                </h1>
                <div className="flex p-1 md:px-4">
                  <select
                    name="vehicle_model"
                    value={formData.vehicle_model}
                    onChange={handleChange}
                    className={`${
                      errors["vehicle_model"] ? "border-red-500" : "border-none"
                    }  items-center  text-base md:text-inherit font-semibold md:p-2 p-1.5 shadow-inner text-gray-500 bg-slate-100 rounded cursor-pointer  hover:text-gray-600 hover:bg-gray-100`}
                  >
                    <option className="font-semibold" value="">
                      Select Model
                    </option>
                    <option className="font-semibold" value="SUV">
                      SUV
                    </option>
                    {/* {Data.policyPlans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name}
                </option>
              ))} */}
                  </select>
                </div>
                {errors["vehicle_model"] && (
                  <p className="text-red-500 text-sm text-start  md:text-base md:px-4">
                    {errors["vehicle_model"]}
                  </p>
                )}
              </div>

              <div>
                <h1 className="text-sm text-start md:text-base font-semibold space-x-2 md:space-x-4 md:px-4 p-1">
                  Vehicle Variant
                  <span className="text-red-500 font-extrabold"> *</span>
                </h1>
                <div className="flex p-1 md:px-4">
                  <select
                    name="vehicle_variant"
                    value={formData.vehicle_variant}
                    onChange={handleChange}
                    className={`${
                      errors["vehicle_model"] ? "border-red-500" : "border-none"
                    } items-center text-base md:text-inherit font-semibold md:p-2 p-1.5 shadow-inner text-gray-500 bg-slate-100 rounded cursor-pointer  hover:text-gray-600 hover:bg-gray-100`}
                  >
                    <option className="font-semibold" value="">
                      Select Variant
                    </option>
                    <option className="font-semibold" value="700">
                      SUV700
                    </option>
                    {/* {Data.policyPlans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name}
                </option>
              ))} */}
                  </select>
                </div>
                {errors["vehicle_variant"] && (
                  <p className="text-red-500 text-sm text-start  md:text-base md:px-4">
                    {errors["vehicle_variant"]}
                  </p>
                )}
              </div>

              {formData.business_type_no === "3" && (
                <div>
                  <h1 className="text-sm text-start md:text-base font-semibold space-x-2 md:space-x-4 md:px-4 p-1">
                    Prev. Policy NCB
                    <span className="text-red-500 font-extrabold"> *</span>
                  </h1>
                  <div className="flex p-1 md:px-4">
                    <select
                      name="pre_pol_ncb"
                      value={formData.pre_pol_ncb}
                      onChange={handleChange}
                      className={`items-center border-none text-base md:text-inherit font-semibold md:p-2 p-1.5 shadow-inner text-gray-500 bg-slate-100 rounded cursor-pointer  hover:text-gray-600 hover:bg-gray-100`}
                    >
                      <option className="font-semibold" value="">
                        Select NCB
                      </option>
                      {Data.ncbvalues.map((plan) => (
                        <option key={plan.id} value={plan.ncb}>
                          {plan.ncb}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {formData.business_type_no === "3" && (
                <div>
                  <h1 className="text-sm text-start md:text-base font-semibold space-x-2 md:space-x-4 md:px-4 p-1">
                    Prev. CNG/LPG
                    {/* <span className="text-red-500 font-extrabold"> *</span> */}
                  </h1>
                  <div className="flex p-1 md:px-4">
                    <select
                      name="prev_cnglpg"
                      value={formData.prev_cnglpg}
                      onChange={handleChange}
                      className={`items-center border-none text-base md:text-inherit font-semibold md:p-2 p-1.5 shadow-inner text-gray-500 bg-slate-100 rounded cursor-pointer  hover:text-gray-600 hover:bg-gray-100`}
                    >
                      <option className="font-semibold" value="No">
                        No
                      </option>
                      <option className="font-semibold" value="Yes">
                        Yes
                      </option>
                    </select>
                  </div>
                </div>
              )}

              <div>
                <h1 className="text-sm text-start md:text-base font-semibold space-x-2 md:space-x-4 md:px-4 p-1">
                  Cover
                  <span className="text-red-500 font-extrabold"> *</span>
                </h1>
                <div className="flex p-1 md:px-4">
                  <select
                    name="cng_lpg_cover"
                    value={formData.cng_lpg_cover}
                    onChange={handleChange}
                    className={`${
                      errors["cng_lpg_cover"] ? "border-red-500" : "border-none"
                    } items-center text-base md:text-inherit font-semibold md:p-2 p-1.5 shadow-inner text-gray-500 bg-slate-100 rounded cursor-pointer  hover:text-gray-600 hover:bg-gray-100`}
                  >
                    <option className="font-semibold" value="">
                      Select CNG/LPG
                    </option>
                    <option className="font-semibold" value="Yes">
                      Yes
                    </option>
                    <option className="font-semibold" value="No">
                      No
                    </option>
                  </select>
                </div>
                {errors["cng_lpg_cover"] && (
                  <p className="text-red-500 text-sm text-start  md:text-base md:px-4">
                    {errors["cng_lpg_cover"]}
                  </p>
                )}
              </div>
              {[
                "tyre_secure",
                "engine_secure",
                "dep_reimburse ",
                "add_towing",
                "return_invoice",
                "consumbale_expense",
                "rsa",
                "key_replace",
                "repair_glass",
                "emergency_expense",
                "personal_loss",
                "daily_allowance",
                "pa_unnamed",
                "automobile_association_cover",
                "pa_paid",
                "ll_paid",
                "vehicle_blind",
                "antitheft_cover",
              ].map((field, index) => (
                <div key={index} className="flex flex-col mb-4">
                  <h1 className="text-sm text-start md:text-base font-semibold space-x-2 md:space-x-4 md:px-4 p-1">
                    {/* {field.replace(/_/g, " ")} */}
                    {field
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (char) => char.toUpperCase())}
                  </h1>
                  <div className="flex p-1 md:px-3">
                    <select
                      name={field}
                      type="text"
                      value={formData[field]}
                      onChange={handleChange}
                      className="items-center border-none text-base md:text-inherit md:p-2 p-1.5 shadow-inner bg-slate-100 rounded hover:text-gray-600 hover:bg-gray-100"
                    >
                      <option key={index} value="">
                        Select{" "}
                        {field
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (char) => char.toUpperCase())}
                      </option>
                      {["Yes", "No"].map((opt, index) => (
                        <option key={index} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}

              {formData.business_type_no === "3" &&
                ["prev_tyre", "prev_engine", "prev_dep", "prev_consumable"].map(
                  (field, index) => (
                    <div key={index} className="flex flex-col ">
                      <h1 className="text-sm text-start md:text-base font-semibold space-x-2 md:space-x-4 md:px-4 p-1">
                        {/* {field.replace(/_/g, " ")} */}
                        {field
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (char) => char.toUpperCase())}
                      </h1>
                      <div className="flex p-1 md:px-3">
                        <input
                          name={field}
                          type="text"
                          value={formData[field]}
                          onChange={handleChange}
                          className=" items-center border-none text-base md:text-inherit md:p-2 p-1.5 shadow-inner bg-slate-100 rounded hover:text-gray-600 hover:bg-gray-100"
                          placeholder={field
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, (char) => char.toUpperCase())}
                        />
                      </div>
                    </div>
                  )
                )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-3">
            <div className="grid lg:grid-cols-10 grid-cols-4 text-sm md:text-base text-gray-500 bg-blue-100 p-2 gap-8 rounded">
              {fieldMappings.map((field, index) => (
                <p key={index} className="flex flex-col">
                  {field.label}
                  <span className="text-black font-medium pt-2">
                    {field.value || "N/A"}
                  </span>
                </p>
              ))}
            </div>
            <div className="grid md:grid-cols-5 grid-cols-2 gap-4">
              {/*  Prev Policy Type */}
              <div>
                <h1 className="text-sm text-start md:text-base font-semibold space-x-2 md:space-x-4 md:px-4 p-1">
                  Salutation
                  {/* <span className="text-red-500 font-extrabold"> *</span> */}
                </h1>
                <div className="flex p-1 md:px-3">
                  <select
                    name="proposer_salutation"
                    value={formData.proposer_salutation}
                    onChange={handleChange}
                    className={`items-center border-none text-base md:text-inherit font-semibold md:p-1.5 p-1 shadow-inner text-gray-500 bg-slate-100 rounded cursor-pointer  hover:text-gray-600 hover:bg-gray-100`}
                  >
                    <option className="font-semibold" value="">
                      Select Title
                    </option>
                    {Data.titles.map((title, idx) => (
                      <option key={idx} value={title}>
                        {title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex col-span-2">
                <div className="flex flex-col">
                  <h1 className="text-sm text-start md:text-base font-semibold space-x-2 md:space-x-4 md:px-4 p-1">
                    F Name
                    <span className="text-red-500 font-extrabold"> *</span>
                  </h1>
                  <div className="flex p-1 md:px-3">
                    <input
                      name="proposer_fname"
                      type="text"
                      value={formData.proposer_fname}
                      onChange={handleChange}
                      className={`${
                        errors["proposer_fname"]
                          ? "border-red-500"
                          : "border-none"
                      } items-cente w-5/6 text-base md:text-lg md:p-1 p-1 shadow-inner  bg-slate-100 rounded cursor-pointer  hover:text-gray-600 hover:bg-gray-100`}
                    />
                  </div>
                  {errors["proposer_fname"] && (
                    <p className="text-red-500 text-sm text-start  md:text-base md:px-4">
                      {errors["proposer_fname"]}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <h1 className="text-sm text-start md:text-base font-semibold space-x-2 md:space-x-4 md:px-4 p-1">
                    M Name
                    {/* <span className="text-red-500 font-extrabold"> *</span> */}
                  </h1>
                  <div className="flex p-1 md:px-3">
                    <input
                      name="proposer_mname"
                      type="text"
                      value={formData.proposer_mname}
                      onChange={handleChange}
                      className={`${
                        errors["proposer_mname"]
                          ? "border-red-500"
                          : "border-none"
                      } items-center w-5/6 text-base md:text-lg md:p-1 p-1 shadow-inner  bg-slate-100 rounded cursor-pointer  hover:text-gray-600 hover:bg-gray-100`}
                    />
                  </div>
                  {errors["proposer_mname"] && (
                    <p className="text-red-500 text-sm text-start  md:text-base md:px-4">
                      {errors["proposer_mname"]}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <h1 className="text-sm text-start md:text-base font-semibold space-x-2 md:space-x-4 md:px-4 p-1">
                    L Name
                    <span className="text-red-500 font-extrabold"> *</span>
                  </h1>
                  <div className="flex p-1 md:px-3">
                    <input
                      name="proposer_lname"
                      type="text"
                      value={formData.proposer_lname}
                      onChange={handleChange}
                      className={`${
                        errors["proposer_lname"]
                          ? "border-red-500"
                          : "border-none"
                      } items-center w-5/6 text-base md:text-lg md:p-1 p-1 shadow-inner  bg-slate-100 rounded cursor-pointer  hover:text-gray-600 hover:bg-gray-100`}
                    />
                  </div>
                  {errors["proposer_lname"] && (
                    <p className="text-red-500 text-sm text-start  md:text-base md:px-4">
                      {errors["proposer_lname"]}
                    </p>
                  )}
                </div>
              </div>

              <div className="md:mx-8">
                <h1 className="text-sm text-start md:text-base font-semibold space-x-2 md:space-x-4 md:px-4 p-1">
                  Email ID
                  <span className="text-red-500 font-extrabold"> *</span>
                </h1>
                <div className="flex p-1 md:px-3">
                  <input
                    name="proposer_email"
                    type="email"
                    value={formData.proposer_email}
                    onChange={handleChange}
                    className={`${
                      errors["proposer_email"]
                        ? "border-red-500"
                        : "border-none"
                    } items-center w-5/6 text-base md:text-lg md:p-1 p-1 shadow-inner  bg-slate-100 rounded cursor-pointer  hover:text-gray-600 hover:bg-gray-100`}
                  />
                </div>
                {errors["proposer_email"] && (
                  <p className="text-red-500 text-sm text-start  md:text-base md:px-4">
                    {errors["proposer_email"]}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <h1 className="text-sm text-start md:text-base font-semibold space-x-2 md:space-x-4 md:px-4 p-1">
                  Mobile No.
                  <span className="text-red-500 font-extrabold"> *</span>
                </h1>
                <div className="flex flex-wrap md:px-4 p-1">
                  <PhoneInput
                    placeholder="Enter ph. num"
                    name="proposer_mobile"
                    value={phone}
                    onChange={handlePhoneChange}
                    disableDropdown={true}
                    country={"in"}
                    specialLabel={""}
                    autoFormat={true}
                    className={`${
                      errors["phone"] ? "border-red-500" : "border-none"
                    }`}
                    inputStyle={{
                      display: "flex",
                      width: "14.8rem",
                      lineHeight: "20px",
                      borderRadius: "2px",
                      height: "2.2rem",
                      border: errors["phone"] ? "1px solid red" : "none",
                      boxShadow: "inset 2px 0px 4px rgba(0, 0, 0, 0.1)",
                      backgroundColor: "#eceff4",
                      paddingLeft: "4.5rem",
                      "@media (max-width: 600px)": {
                        width: "5rem", // Adjust width for small screens
                        paddingLeft: "2rem", // Adjust padding for small screens
                      },
                    }}
                    buttonClass={{
                      border: "none",
                      backgroundColor: "#eceff4",
                      borderRadius: "10px",
                    }}
                  />
                </div>
                {errors["phone"] && (
                  <p className="text-red-500 text-sm text-start  md:text-base md:px-4">
                    {errors["phone"]}
                  </p>
                )}
              </div>

              {[
                "automobile_association_cover",
                "pa_paid",
                "ll_paid",
                "vehicle_blind",
                "antitheft_cover",
                "tppd_discount",
                "vintage_car",
                "own_premises",
                "load_fibre",
                "load_imported",
                "load_tuition",
                "ncb_protection",
              ].map((field, index) => (
                <div key={index} className="flex flex-col mt-4">
                  <h1 className="text-sm text-start md:text-base font-semibold space-x-2 md:space-x-4 md:px-4 p-1">
                    {/* {field.replace(/_/g, " ")} */}
                    {field
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (char) => char.toUpperCase())}
                  </h1>
                  <div className="flex p-1 md:px-3">
                    <select
                      name={field}
                      type="text"
                      value={formData[field]}
                      onChange={handleChange}
                      className="items-center border-none text-base md:text-inherit md:p-2 p-1.5 shadow-inner bg-slate-100 rounded hover:text-gray-600 hover:bg-gray-100"
                    >
                      <option key={index} value="">
                        Select{" "}
                        {field
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (char) => char.toUpperCase())}
                      </option>
                      {["Yes", "No"].map((opt, index) => (
                        <option key={index} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}

              {[
                "vehicle_idv",
                "cng_lpg_si",
                "electrical_si",
                "non_electrical_si",
                "uw_loading",
                "uw_remarks",
                "uw_discount",
                "tyre_secure_options",
                "engine_secure_options",
                "add_towing_amount",
                "dep_reimburse_claims",
                "allowance_days_accident",
                "daily_allowance_limit",
              ].map((field, index) => (
                <div key={index} className="flex flex-col mt-4">
                  <h1 className="text-sm text-start md:text-base font-semibold space-x-2 md:space-x-4 md:px-4 p-1">
                    {/* {field.replace(/_/g, " ")} */}
                    {field
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (char) => char.toUpperCase())}
                  </h1>
                  <div className="flex p-1 md:px-3">
                    <input
                      name={field}
                      type="text"
                      value={formData[field]}
                      onChange={handleChange}
                      placeholder={field
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (char) => char.toUpperCase())}
                      className=" items-center border-none text-base md:text-inherit md:p-2 p-1.5 shadow-inner bg-slate-100 rounded hover:text-gray-600 hover:bg-gray-100"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-3">
            <div className="grid lg:grid-cols-10 grid-cols-4 text-sm md:text-base text-gray-500 bg-blue-100 p-2 gap-8 rounded">
              {fieldMappings.map((field, index) => (
                <p key={index} className="flex flex-col">
                  {field.label}
                  <span className="text-black font-medium pt-2">
                    {field.value || "N/A"}
                  </span>
                </p>
              ))}
            </div>

            <div className="grid md:grid-cols-5 grid-cols-2 gap-4">
              <div>
                <h1 className=" text-sm text-start md:text-base font-semibold space-x-2 md:space-x-5 md:px-4 p-1">
                  Pa Owner
                  <span className="text-red-500 font-extrabold"> *</span>
                </h1>
                <div className="flex space-x-2 md:space-x-3 md:px-4 p-1">
                  {Data.paOwner?.map((pa) => (
                    <div key={pa.id}>
                      <input
                        type="radio"
                        name="pa_owner"
                        id={pa.id}
                        className="hidden peer"
                        value={pa.value}
                        onChange={handleChange}
                        checked={formData.pa_owner === pa.value}
                      />
                      <label
                        htmlFor={pa.id}
                        className={`${
                          errors["pa_owner"] ? "border-red-500 " : ""
                        } inline-flex  items-center px-2 justify-between p-1 shadow-inner text-gray-500 bg-slate-100 border border-gray-200 rounded cursor-pointer peer-checked:border-blue-600 peer-checked:bg-gradient-to-t from-blue-700 to-blue-600 peer-checked:text-white hover:text-gray-600 hover:bg-gray-100`}
                      >
                        <div className="block my-auto">
                          <div className="w-auto text-base md:text-lg font-semibold">
                            {pa.name}
                          </div>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
                {errors["pa_owner"] && (
                  <p className="text-red-500 text-sm text-start  md:text-base md:px-4">
                    {errors["pa_owner"]}
                  </p>
                )}
              </div>
              {formData.pa_owner === "true" && (
                <div>
                  <h1 className="text-sm text-start md:text-base font-semibold space-x-2 md:space-x-4 md:px-4 p-1">
                    Owner Tenure
                    {/* <span className="text-red-500 font-extrabold"> *</span> */}
                  </h1>
                  <div className="flex p-1 md:px-3">
                    <select
                      name="pa_owner_tenure"
                      value={formData.pa_owner_tenure}
                      onChange={handleChange}
                      className={`items-center border-none text-base md:text-inherit font-semibold md:p-1.5 p-1 shadow-inner text-gray-500 bg-slate-100 rounded cursor-pointer  hover:text-gray-600 hover:bg-gray-100`}
                    >
                      <option className="font-semibold" value="">
                        Select Tenure
                      </option>
                      {Data.ownerTenure.map((val, idx) => (
                        <option key={idx} value={val}>
                          {val}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {[
                "pa_owner_declaration",
                "allowance_days_loss",
                "franchise_days",
                "pa_unnamed_no",
                "pa_unnamed_si",
                "pa_named",
                "pa_unnamed_csi",
                "pa_paid_no",
                "pa_paid_si",
                "ll_paid_no",
                "ll_paid_si",
                "voluntary_amount",
              ].map((field, index) => (
                <div key={index} className="flex flex-col">
                  <h1 className="text-sm text-start md:text-base font-semibold space-x-2 md:space-x-4 md:px-4 p-1">
                    {/* {field.replace(/_/g, " ")} */}
                    {field
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (char) => char.toUpperCase())}
                  </h1>
                  <div className="flex p-1 md:px-3">
                    <input
                      name={field}
                      type="text"
                      value={formData[field]}
                      onChange={handleChange}
                      placeholder={field
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (char) => char.toUpperCase())}
                      className=" items-center border-none text-base md:text-inherit md:p-2 p-1.5 shadow-inner bg-slate-100 rounded hover:text-gray-600 hover:bg-gray-100"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-3">
            <div className="grid lg:grid-cols-10 grid-cols-4 text-sm md:text-base text-gray-500 bg-blue-100 p-2 gap-8 rounded">
              {fieldMappings.map((field, index) => (
                <p key={index} className="flex flex-col">
                  {field.label}
                  <span className="text-black font-medium pt-2">
                    {field.value || "N/A"}
                  </span>
                </p>
              ))}
            </div>
            {/* <div className="grid md:grid-cols-5 grid-cols-2 gap-4"></div> */}
          </div>
        );
      default:
        return null;
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    // e.preventDefault();
    if (!validateRegistrationNumber()) {
      toast.error("Invalid Registration Number");
      return;
    }
    onSubmit(formData); // Pass data to the parent component
  };

  const handleConvert = () => {
    setFormData({ ...formData, __finalize: "1" });
    setShowConfirmation(true);
  };

  // SAVE QUOTES
  const handleSave = () => {
    handleSubmit(); // Trigger form submission with __finalize = "0"
  };

  const confirmFinalize = () => {
    handleSubmit();
    // Form conversion is confirmed
    setShowConfirmation(false);
  };

  return (
    <>
      {/* <form> */}
      <div className="max-w-full border shadow-inner md:p-4 p-2 bg-slate-50  isolation-auto border-none Z-10  relative rounded group">
        <div className={`${step > 1 ? "mb-6" : "mb-8"}`}>
          <div className="flex justify-between items-center">
            <span className="md:text-lg text-sm">Step {step} of 4</span>
            <h2 className="md:text-2xl text-base font-bold">
              {step > 3 ? "Quote Preview" : "Quote Information"}
            </h2>
            <div className="flex space-x-2">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`md:w-6 w-2 md:h-1.5 h-1  ${
                    s === step
                      ? "bg-blue-600"
                      : stepsCompleted[s - 1]
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {renderStep()}
      </div>
      <div className="my-4 flex justify-between">
        <button
          type="button"
          className={`${
            step === 1 && "cursor-not-allowed"
          } flex justify-center gap-2 items-center shadow-xl text-lg z-0 bg-slate-100 backdrop-blur-md lg:font-semibold isolation-auto border-none before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded before:bg-red-700 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative  md:px-8 md:py-2 px-3 py-1 overflow-hidden rounded group`}
          onClick={handlePrevious}
          disabled={step === 1}
        >
          Previous
        </button>
        {step < 4 ? (
          <button
            type="button"
            className="flex justify-center gap-2 items-center shadow-xl text-lg bg-slate-100 backdrop-blur-md lg:font-semibold isolation-auto border-none before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded before:bg-green-800 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 md:px-8 md:py-2 px-3 py-1  overflow-hidden rounded group"
            onClick={handleNext}
          >
            Next
          </button>
        ) : (
          <div className="flex justify-between space-x-5">
            <button
              onClick={handleSave}
              className="flex justify-center gap-2 items-center shadow-xl text-lg bg-slate-100 backdrop-blur-md lg:font-semibold isolation-auto border-none before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded before:bg-blue-700 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative md:px-8 md:py-2 px-3 py-1  overflow-hidden rounded group"
              type="submit"
            >
              Save
            </button>
            <button
              onClick={handleConvert}
              className="flex justify-center gap-2 items-center shadow-xl text-lg bg-slate-100 backdrop-blur-md lg:font-semibold isolation-auto border-none before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded before:bg-green-800 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative md:px-8 md:py-2 px-3 py-1  overflow-hidden rounded group"
              type="submit"
            >
              Convert to Proposal
            </button>
          </div>
        )}
      </div>
      {/* </form> */}

      {showConfirmation && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-lg">
            <h3
              className="text-lg font-semibold mb-4"
            >
              {`Are you sure you want to submit ${formData.proposer_fname} ${formData.proposer_lname} quote?`}
            </h3>

            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-300  cursor-pointer transition-all text-black font-mono font-bold px-6 py-1 rounded-lg
border-gray-400
border-b-[4px] hover:brightness-110  
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                onClick={() => setShowConfirmation(false)} // Close popup
              >
                No
              </button>
              <button
                className=" cursor-pointer transition-all bg-green-600 text-black font-mono font-bold px-6 py-1 rounded-lg
border-green-700
border-b-[4px] hover:brightness-110 
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                onClick={confirmFinalize} // Set formData.__finalize to "1"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default QuoteForm;
