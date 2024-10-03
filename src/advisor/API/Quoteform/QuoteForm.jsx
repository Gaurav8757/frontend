/* eslint-disable react/prop-types */
import { useState } from "react";
import Data from "../Data.jsx";
import { Check, MoveRight } from "lucide-react";
import VehicleRegistrationNo from "../../vehicleNumber/VehicleRegistrationNo.jsx";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

function QuoteForm({ onSubmit }) {
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
    pol_start_date: "",
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

  // Update the form data when a radio button is selected
  const handleRadioChange = (type) => {
    if (type === "BH_regno") {
      setFormData({ ...formData, BH_regno: "true", special_regno: "false" });
    } else if (type === "special_regno") {
      setFormData({ ...formData, BH_regno: "false", special_regno: "true" });
    } else {
      setFormData({ ...formData, BH_regno: "false", special_regno: "false" });
    }
    setRegistrationType(type);
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
    console.log(name + ":" + value);
    if (name === "prev_pol_type") {
      // If prev_pol_type is selected (not empty), set claim_last to "true"
      setFormData({
        ...formData,
        [name]: value,
        claim_last: value ? "true" : "false",
      });
    } else {
      // For other fields, just update the value
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!validateRegistrationNumber()) {
    //   toast.error("Invalid Registration Number");
    //   return;
    // }
    onSubmit(formData); // Pass data to the parent component
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="flex justify-between flex-wrap">
        {/* Business Type */}
        <div className="flex flex-col text-start my-3 md:my-8">
          <h1 className="font-semibold text-base  text-start  md:text-xl  space-x-2 md:space-x-5 md:px-4 p-1 ">
            Business Type
            <span className="text-red-500 font-extrabold"> *</span>
          </h1>
          <ul className="flex space-x-2 md:space-x-4 md:px-4 p-1">
            {Data.business_types?.map((business) => (
              <NavLink key={business.id} to={business.authLink}>
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
                  className={`inline-flex items-center px-2 justify-between p-1 shadow-inner text-gray-500 bg-slate-100 border border-gray-200 rounded cursor-pointer peer-checked:border-blue-600 peer-checked:bg-gradient-to-t from-blue-700 to-blue-600 peer-checked:text-white hover:text-gray-600 hover:bg-gray-100`}
                >
                  <div className="block my-auto">
                    <div className="w-auto text-lg md:text-xl font-semibold capitalize">
                      {business.name} {/* Display the option name */}
                    </div>
                  </div>
                </label>
              </NavLink>
            ))}
          </ul>
        </div>

        {/* Customer Type */}
        <div className="flex flex-col text-start my-3 md:my-8 ">
          <h1 className=" text-base text-start md:text-xl font-semibold space-x-2 md:space-x-5 md:px-4 p-1">
            Customer Type
            <span className="text-red-500 font-extrabold"> *</span>
          </h1>

          <div className="flex space-x-2 md:space-x-4 md:px-4 p-1">
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
                  className={`inline-flex items-center px-2 justify-between p-1 shadow-inner text-gray-500 bg-slate-100 border border-gray-200 rounded cursor-pointer peer-checked:border-blue-600 peer-checked:bg-gradient-to-t from-blue-700 to-blue-600 peer-checked:text-white hover:text-gray-600 hover:bg-gray-100`}
                >
                  <div className="block my-auto">
                    <div className="w-auto text-base md:text-xl font-semibold">
                      {type.label}
                    </div>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Policy Plan Dropdown */}
        <div className="text-start my-3 md:my-9">
          <h1 className="text-base md:text-xl font-semibold space-x-2 md:px-4 p-1">
            Policy Plan
            <span className="text-red-500 font-extrabold"> *</span>
          </h1>
          <div className="flex p-1 md:px-4">
            <select
              name="pol_plan_id"
              value={formData.pol_plan_id}
              onChange={handleChange}
              className={`items-center border-none text-base md:text-inherit font-bold md:p-2 p-1.5 shadow-inner text-gray-500 bg-slate-100 rounded cursor-pointer  hover:text-gray-600 hover:bg-gray-100`}
            >
              <option className="font-semibold" value="">
                Select Policy Plan
              </option>
              {Data.policyPlans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* <VehicleRegistrationNo
          Check={<Check className="font-bold" />}
          MoveRight={<MoveRight width={20} />}
        /> */}

        <div className="flex flex-col text-start md:w-1/4 my-3 md:my-8">
          <h1 className="text-base md:text-xl font-semibold space-x-2 md:space-x-4 md:px-4 p-1  ">
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
                    <div className="w-auto text-base md:text-xl font-semibold">
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
                    <div className="w-auto text-base md:text-xl font-semibold">
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
                    <div className="w-auto text-base md:text-xl font-semibold">
                      Special
                    </div>
                  </div>
                </label>
              </div>
              <div className="flex justify-between flex-wrap gap-10">
                <div className="flex space-x-3 md:space-x-3">
                  {registrationParts.map((part, index) => (
                    <input
                      key={index}
                      className="border-none flex md:py-1 py-2 w-1/2 rounded uppercase text-center bg-slate-100 shadow-inner text-xl font-bold"
                      placeholder={getPlaceholders()[index]}
                      maxLength={getMaxLengths()[index]}
                      value={part}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*  Prev Policy Type */}
        <div className="flex flex-col text-start   my-2 md:my-8">
          <h1 className="text-base md:text-xl font-semibold space-x-2  md:px-4  p-1">
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
                    <div className="w-auto text-base md:text-xl font-semibold">
                      {type.label}
                    </div>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="text-start my-3 md:my-3">
          <h1 className="text-base md:text-xl font-semibold space-x-2 md:space-x-4 md:px-4 p-1">
            Pincode
            <span className="text-red-500 font-extrabold"> *</span>
          </h1>
          <div className="flex p-1 md:px-4">
            <select
              name="proposer_pincode"
              value={formData.proposer_pincode}
              onChange={handleChange}
              className={`items-center border-none text-base md:text-inherit font-bold md:p-2 p-1.5 shadow-inner text-gray-500 bg-slate-100 rounded cursor-pointer  hover:text-gray-600 hover:bg-gray-100`}
            >
              <option className="font-semibold" value="">
                Select Pincode
              </option>
              {/* {Data.policyPlans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name}
                </option>
              ))} */}
            </select>
          </div>
        </div>

        <div className="text-start my-3 md:my-3">
          <h1 className="text-base md:text-xl font-semibold space-x-2 md:space-x-4 md:px-4 p-1">
            Reg. Place + <br />
            place_reg_no as code
            <span className="text-red-500 font-extrabold">*</span>
          </h1>
          <div className="flex p-1 md:px-4">
            <select
              name="place_reg"
              value={formData.place_reg}
              onChange={handleChange}
              className={`items-center border-none text-base md:text-inherit font-bold md:p-2 p-1.5 shadow-inner text-gray-500 bg-slate-100 rounded cursor-pointer  hover:text-gray-600 hover:bg-gray-100`}
            >
              <option className="font-semibold" value="">
                Select City
              </option>
              {/* {Data.policyPlans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name}
                </option>
              ))} */}
            </select>
          </div>
        </div>

        <div className="text-start my-3 md:my-3">
          <h1 className="text-base md:text-xl font-semibold space-x-2 md:space-x-4 md:px-4 p-1">
            Mfg Year
            <span className="text-red-500 font-extrabold">*</span>
          </h1>
          <div className="flex p-1 md:px-4">
            <input
              name="man_year"
              type="number"
              value={formData.man_year}
              onChange={handleChange}
              className={`items-center border-none text-base md:text-inherit font-bold md:p-2 p-1.5 shadow-inner text-gray-500 bg-slate-100 rounded cursor-pointer  hover:text-gray-600 hover:bg-gray-100`}
            />
          </div>
        </div>

        <div className="text-start my-3 md:my-3">
          <h1 className="text-base md:text-xl font-semibold space-x-2 md:space-x-4 md:px-4 p-1">
            DOR
            <span className="text-red-500 font-extrabold">*</span>
          </h1>
          <div className="flex p-1 md:px-4">
            <input
              name="dor"
              type="date"
              value={formData.dor}
              onChange={handleChange}
              className={`items-center border-none text-base md:text-inherit font-bold md:p-2 p-1.5 shadow-inner text-gray-500 bg-slate-100 rounded cursor-pointer  hover:text-gray-600 hover:bg-gray-100`}
            />
          </div>
        </div>

        <div className="text-start my-3 md:my-3">
          <h1 className="text-base md:text-xl font-semibold space-x-2 md:px-4 p-1">
            Vehicle Mfr
            <span className="text-red-500 font-extrabold"> *</span>
          </h1>
          <div className="flex p-1 md:px-4">
            <select
              name="vehicle_make"
              value={formData.vehicle_make}
              onChange={handleChange}
              className={`items-center border-none text-base md:text-inherit font-bold md:p-2 p-1.5 shadow-inner text-gray-500 bg-slate-100 rounded cursor-pointer  hover:text-gray-600 hover:bg-gray-100`}
            >
              <option className="font-semibold" value="">
                Select Manufacturer
              </option>
              {/* {Data.policyPlans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name}
                </option>
              ))} */}
            </select>
          </div>
        </div>

        <div className="text-start my-3 md:my-3">
          <h1 className="text-base md:text-xl font-semibold space-x-2 md:px-4 p-1">
            Vehicle Model
            <span className="text-red-500 font-extrabold"> *</span>
          </h1>
          <div className="flex p-1 md:px-4">
            <select
              name="vehicle_model"
              value={formData.vehicle_model}
              onChange={handleChange}
              className={`items-center border-none text-base md:text-inherit font-bold md:p-2 p-1.5 shadow-inner text-gray-500 bg-slate-100 rounded cursor-pointer  hover:text-gray-600 hover:bg-gray-100`}
            >
              <option className="font-semibold" value="">
                Select Model
              </option>
              {/* {Data.policyPlans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name}
                </option>
              ))} */}
            </select>
          </div>
        </div>

        <div className="text-start my-3 md:my-3">
          <h1 className="text-base md:text-xl font-semibold space-x-2 md:px-4 p-1">
            Vehicle Variant
            <span className="text-red-500 font-extrabold"> *</span>
          </h1>
          <div className="flex p-1 md:px-4">
            <select
              name="vehicle_variant"
              value={formData.vehicle_variant}
              onChange={handleChange}
              className={`items-center border-none text-base md:text-inherit font-bold md:p-2 p-1.5 shadow-inner text-gray-500 bg-slate-100 rounded cursor-pointer  hover:text-gray-600 hover:bg-gray-100`}
            >
              <option className="font-semibold" value="">
                Select Variant
              </option>
              {/* {Data.policyPlans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name}
                </option>
              ))} */}
            </select>
          </div>

          <div className="text-start my-3 md:my-3">
            <h1 className="text-base md:text-xl font-semibold space-x-2 md:px-4 p-1">
              Prev. Policy NCB
              <span className="text-red-500 font-extrabold"> *</span>
            </h1>
            <div className="flex p-1 md:px-4">
              <select
                name="pre_pol_ncb"
                value={formData.pre_pol_ncb}
                onChange={handleChange}
                className={`items-center border-none text-base md:text-inherit font-bold md:p-2 p-1.5 shadow-inner text-gray-500 bg-slate-100 rounded cursor-pointer  hover:text-gray-600 hover:bg-gray-100`}
              >
                <option className="font-semibold" value="">
                  Select NCB
                </option>
                {/* {Data.policyPlans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name}
                </option>
              ))} */}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label htmlFor="cubic-capacity">Cubic Capacity *</label>
          <input id="cubic-capacity" defaultValue="2523" />
        </div>
        <div className="space-y-2">
          <label htmlFor="fuel-type">Fuel Type *</label>
          <input id="fuel-type" defaultValue="DIESEL" />
        </div>
        <div className="space-y-2">
          <label htmlFor="seating-capacity">
            Seating Capacity Including Driver *
          </label>
          <input id="seating-capacity" defaultValue="7" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label htmlFor="body-type">Body Type *</label>
          <input id="body-type" defaultValue="MUV" />
        </div>
        <div className="space-y-2">
          <label htmlFor="segment">Segment *</label>
          <input id="segment" defaultValue="MPV SUV" />
        </div>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="relative cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-[0.5px] bg-black rounded bg-gradient-to-t from-[#6a80ff] to-[#6a80ff] active:scale-95"
      >
        <span className="w-full h-full text-xl flex items-center gap-2 px-4 py-1 bg-[blue] text-white rounded bg-gradient-to-t from-blue-700 to-blue-600">
          Submit
        </span>
      </button>
    </form>
  );
}

export default QuoteForm;
