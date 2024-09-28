/* eslint-disable react/prop-types */
import { useState } from "react";

function QuoteForm({ onSubmit }) {
  // Initialize state with empty values
  const [formData, setFormData] = useState({
    source: "",
    q_producer_email: "",
    q_producer_code: "",
    is_posp: "",
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
    business_type_no: "",
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
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass data to the parent component
  };

  return (
    <form onSubmit={handleSubmit} className="flex p-2 flex-wrap justify-center">
      {Object.keys(formData).map((key) => (
        <div
          key={key}
          className="flex flex-col  mb-4 md:mb-10  p-2 text-start  md:w-1/6 w-1/2"
        >
          {/* <label className="text-base  font-semibold capitalize">{key}</label> */}
          <input
            type="text"
            name={key}
            value={formData[key]}
            onChange={handleChange}
            className=" text-center bg-slate-100 border-none shadow-inner text-xl font-medium rounded"
            placeholder={key}
          />
        </div>
      ))}

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
