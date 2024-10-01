/* eslint-disable react/prop-types */

import { useState } from "react";

function QuoteForm({ onSubmit }) {
  // Initialize state with empty values
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
    proposer_type: "", // default to 'Individual'
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
    BH_regno: "",
    special_regno: "",
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

  // Handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name + ":" + value);
    setFormData({
      ...formData,

      [name]: value,
    });
  };

  console.log(FormData.business_type_no);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass data to the parent component
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="flex justify-between flex-wrap">
      <div className="flex my-3 md:my-8 flex-col text-start">
        <h1 className="text-base md:text-xl font-semibold space-x-2 md:space-x-4 md:p-4 p-1 ">
          Business Type
          <span className="text-red-500 font-extrabold"> *</span>
        </h1>

        <div className="flex flex-wrap justify-between md:block space-x-1 md:space-x-4 md:p-0 p-1">
          <input
            type="radio"
            id="1"
            name="business_type_no"
            className="hidden peer"
            value="1"
            onChange={handleChange}
            checked={formData.business_type_no === "1"}
          />
          <label
            htmlFor="1"
            className={`inline-flex items-center p-1 px-2 shadow-inner text-gray-500 bg-slate-100 border border-gray-200 rounded cursor-pointer peer-checked:border-blue-600 peer-checked:bg-gradient-to-t from-blue-700 to-blue-600 peer-checked:text-white hover:text-gray-600 hover:bg-gray-100`}
          >
            <div className="block my-auto">
              <div className="w-auto text-base md:text-xl font-semibold">
                New Business
              </div>
            </div>
          </label>

          <input
            type="radio"
            id="3"
            name="business_type_no"
            className="hidden peer"
            value="3"
            onChange={handleChange}
            checked={formData.business_type_no === "3"}
          />
          <label
            htmlFor="3"
            className={`inline-flex items-center p-1 px-2 shadow-inner text-gray-500 bg-slate-100 border border-gray-200 rounded cursor-pointer peer-checked:border-blue-600 peer-checked:bg-gradient-to-t from-blue-700 to-blue-600 peer-checked:text-white hover:text-gray-600 hover:bg-gray-100`}
          >
            <div className="block my-auto">
              <div className="w-auto text-base md:text-xl font-semibold">
                Roll Over
              </div>
            </div>
          </label>

          <input
            type="radio"
            id="4"
            name="business_type_no"
            className="hidden peer"
            value="4"
            onChange={handleChange}
            checked={formData.business_type_no === "4"}
          />
          <label
            htmlFor="4"
            className={`inline-flex items-center p-1 px-2 shadow-inner text-gray-500 bg-slate-100 border border-gray-200 rounded cursor-pointer peer-checked:border-blue-600 peer-checked:bg-gradient-to-t from-blue-700 to-blue-600 peer-checked:text-white hover:text-gray-600 hover:bg-gray-100`}
          >
            <div className="block my-auto">
              <div className="w-auto text-base md:text-xl font-semibold">
                Used Vehicle
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* Customer Type */}
      <div className="flex flex-col text-start  my-3 md:my-8 ">
        <h1 className=" text-base md:text-xl font-semibold space-x-2 md:space-x-4 md:p-4 p-1">
          Customer Type
          <span className="text-red-500 font-extrabold"> *</span>
        </h1>

        <div className="flex space-x-1 md:space-x-4 md:p-0 p-1">
          <input
            type="radio"
            name="proposer_type"
            id="individual"
            className="hidden peer"
            value="Individual"
            onChange={handleChange}
            checked={formData.proposer_type === "Individual"}
          />
          <label
            htmlFor="individual"
            className={`inline-flex items-center px-2 justify-between p-1 shadow-inner text-gray-500 bg-slate-100 border border-gray-200 rounded cursor-pointer peer-checked:border-blue-600 peer-checked:bg-gradient-to-t from-blue-700 to-blue-600 peer-checked:text-white hover:text-gray-600 hover:bg-gray-100`}
          >
            <div className="block  my-auto ">
              <div className="w-auto text-base md:text-xl font-semibold">
                Individual
              </div>
            </div>
          </label>

          <input
            type="radio"
            name="proposer_type"
            id="proposer_type"
            className="hidden peer"
            value="Organisation"
            onChange={handleChange}
            checked={formData.proposer_type === "Organisation"}
          />

          <label
            htmlFor="proposer_type"
            className={`inline-flex items-center px-2 justify-between p-1 shadow-inner text-gray-500 bg-slate-100 border border-gray-200 rounded cursor-pointer peer-checked:border-blue-600 peer-checked:bg-gradient-to-t from-blue-700 to-blue-600 peer-checked:text-white hover:text-gray-600 hover:bg-gray-100`}
          >
            <div className="block my-auto">
              <div className=" text-base md:text-xl font-semibold">
                Organisation
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* Policy Plan Dropdown */}
      <div className="text-start my-3 md:my-8 ">
        <h1 className="text-base md:text-xl font-semibold space-x-2 md:space-x-4 md:px-4 md:p-3 p-1">
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
            <option value="01">Standalone TP (1 year)</option>
            <option value="02">Package (1 year OD + 1 year TP)</option>
            <option value="03">Standalone TP (3 years)</option>
            <option value="04">Package (1 year OD + 3 years TP)</option>
            <option value="05">Standalone OD (1 year)</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col text-start  my-3 md:my-8 ">
        <h1 className="text-base md:text-xl font-semibold space-x-2 md:space-x-4 md:px-4 md:p-3 p-1">
          Prev Policy Type
          <span className="text-red-500 font-extrabold"> *</span>
        </h1>
        <div className="flex p-2 md:px-4">
          <input
            type="radio"
            name="prev_pol_type"
            id="Package1"
            className="hidden peer"
            value="Package"
            onChange={handleChange}
            checked={formData.prev_pol_type === "Package"}
          />
          <label
            htmlFor="Package1"
            className={`inline-flex items-center px-2 justify-between p-1 shadow-inner text-gray-500 bg-slate-100 border border-gray-200 rounded cursor-pointer peer-checked:border-blue-600 peer-checked:bg-gradient-to-t from-blue-700 to-blue-600 peer-checked:text-white hover:text-gray-600 hover:bg-gray-100`}
          >
            <div className="block  my-auto ">
              <div className="w-auto text-base md:text-xl font-semibold">
                Package
              </div>
            </div>
          </label>

          <input
            type="radio"
            name="prev_pol_type"
            id="Liability1"
            className="hidden peer"
            value="Liability"
            onChange={handleChange}
            checked={formData.prev_pol_type === "Liability"}
          />

          <label
            htmlFor="Liability1"
            className={`inline-flex items-center px-2 mx-4 justify-between p-1 shadow-inner text-gray-500 bg-slate-100 border border-gray-200 rounded cursor-pointer peer-checked:border-blue-600 peer-checked:bg-gradient-to-t from-blue-700 to-blue-600 peer-checked:text-white hover:text-gray-600 hover:bg-gray-100`}
          >
            <div className="block my-auto">
              <div className=" text-base md:text-xl font-semibold">
                Liability
              </div>
            </div>
          </label>
        </div>
      </div>
      </div>
      {/* Submit Button */}
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
