import { useState } from "react";
import Data from "../Data.jsx";

function Proposer() {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    proposer_gender: "",
    proposer_marital: "",
    proposer_fname: "",
    proposer_mname: "",
    proposer_lname: "",
    proposer_email: "",
    proposer_mobile: "",
    proposer_salutation: "",
    proposer_add1: "",
    proposer_add2: "",
    proposer_add3: "",
    proposer_occupation: "",
    proposer_occupation_other: "",
    proposer_pan: "",
    proposer_annual: "",
    proposer_gstin: "",
    proposer_dob: "",
    vehicle_puc_expiry: "",
    vehicle_puc: "",
    vehicle_puc_declaration: "",
    pre_insurer_name: "",
    pre_insurer_no: "",
    financier_type: "",
    financier_name: "",
    nominee_name: "",
    nominee_relation: "",
    nominee_age: 0, // Assuming this is a number, default to 0
    appointee_name: "",
    appointee_relation: "",
    proposal_id: "",
    product_id: "",
    declaration: "",
    vehicle_chassis: "",
    vehicle_engine: "",
    proposer_fullname: "",
    proposer_pincode: "",
    quote_no: "",
    carriedOutBy: "",
    __finalize: "",
  });

  const validateStep = (stepNumber) => {
    const newErrors = {};
    let isValid = true;

    if (stepNumber === 1) {
      if (!formData.proposer_gender) {
        newErrors["proposer_gender"] = "required";
        isValid = false;
      }
    }
    setErrors(newErrors);
    return isValid;
  };
  const [step, setStep] = useState(1);
  const [stepsCompleted, setStepsCompleted] = useState([
    false,
    false,
    false,
    false,
  ]);

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

  // Handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-3">
            <div className="grid lg:grid-cols-8 grid-cols-4 text-sm md:text-base text-gray-500  p-2 gap-8 rounded">
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
                  <h1 className="text-sm text-start md:text-base font-semibold space-x-2 md:space-x-2 md:px-3 p-1">
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
                      } items-cente w-5/6 text-base md:text-lg md:p-1 p-1 shadow-inner  bg-slate-100 rounded  hover:text-gray-600 hover:bg-gray-100`}
                    />
                  </div>
                  {errors["proposer_fname"] && (
                    <p className="text-red-500 text-sm text-start  md:text-base md:px-4">
                      {errors["proposer_fname"]}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <h1 className="text-sm text-start md:text-base font-semibold space-x-2 md:space-x-2 md:px-3 p-1">
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
                      } items-center w-5/6 text-base md:text-lg md:p-1 p-1 shadow-inner  bg-slate-100 rounded  hover:text-gray-600 hover:bg-gray-100`}
                    />
                  </div>
                  {errors["proposer_mname"] && (
                    <p className="text-red-500 text-sm text-start  md:text-base md:px-4">
                      {errors["proposer_mname"]}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <h1 className="text-sm text-start md:text-base font-semibold space-x-2 md:space-x-2 md:px-3 p-1">
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
                      } items-center w-5/6 text-base md:text-lg md:p-1 p-1 shadow-inner  bg-slate-100 rounded hover:text-gray-600 hover:bg-gray-100`}
                    />
                  </div>
                  {errors["proposer_lname"] && (
                    <p className="text-red-500 text-sm text-start  md:text-base md:px-4">
                      {errors["proposer_lname"]}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <div className="max-w-full border shadow-inner md:p-4 p-2 bg-slate-50  isolation-auto border-none Z-10  relative rounded group">
        <div className={`${step > 1 ? "mb-6" : "mb-8"}`}>
          <div className="flex justify-between items-center">
            <span className="md:text-lg text-sm">Step {step} of 4</span>
            <h2 className="md:text-2xl text-base font-bold">
              {step > 3 ? "Proposer Preview" : "Proposer Information"}
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
              //   onClick={handleSave}
              className="flex justify-center gap-2 items-center shadow-xl text-lg bg-slate-100 active:translate-y-[2px] backdrop-blur-md lg:font-semibold isolation-auto border-none before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded before:bg-blue-700 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative md:px-8 md:py-2 px-3 py-1  overflow-hidden rounded group"
              type="submit"
            >
              Save
            </button>
            <button
              //   onClick={handleConvert}
              className="flex justify-center gap-2 border-b-[4px] active:border-b-[2px]  active:translate-y-[2px] items-center shadow-xl text-lg bg-slate-100 backdrop-blur-md lg:font-semibold isolation-auto border-none before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded before:bg-green-800 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative md:px-8 md:py-2 px-3 py-1  overflow-hidden rounded group"
              type="submit"
            >
              Proceed to cKYC
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Proposer;
