import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import VITE_DATA from "../../config/config.jsx";
const ServiceClaim = () => {
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [claim, setClaim] = useState("");
    const [name, setName] = useState("");
    const [policy, setPolicy] = useState("");
    const [dated, setDate] = useState();
    const [dates, setDates] = useState("");
    const [time, setTime] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${VITE_DATA}/users/claim`, {
                userclaim_name: name,
                userclaim_email: email,
                userclaim_mobile: mobile,
                userclaim_insurance_name: claim,
                userclaim_policyno: policy,
                userclaim_date: new Date(dates + 'T' + time),
                userclaim_time: time,
                userclaim_policyexp: new Date(dated),
            });
            //   console.log(response.data);
            if (response.data) {
                toast.success("Claim submitted successfully");
                // Reset form fields if needed
            } else {
                toast.error("Claim submitted successfully");
                console.error('Failed to submit claim');
            }
        } catch (error) {
            console.error('Error:', error);
        }

        setEmail("");
        setMobile("");
        setClaim("");
        setName("");
        setPolicy("");
        setDates('');
        setDate("");
        setTime("");

    };

    return (
        <section className="container-fluid relative bg-orange-50">
            <div className="container-fluid flex flex-col justify-center ml-2 mr-2 bg-orange-50">
                <p className="text-3xl font-semibold my-3 text-orange-700 ">Claim Form</p>
                <div className="relative w-full mx-auto lg:w-1/2  p-6 rounded-xl shadow-xl text-2xl  items-center  bg-orange-200 mb-10">
                    <form className=" flex flex-wrap justify-between">

                        <div className="flex flex-col  p-2 text-start w-full lg:w-1/3">
                            <label className="text-base mx-1">Name</label>
                            <input
                                className="input-style p-1 rounded-lg"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your Name"
                            />
                        </div>
                        <div className="flex flex-col  p-2 text-start w-full lg:w-1/3">
                            <label className="text-base mx-1">Email Address <span className="text-red-600">*</span></label>
                            <input
                                className="input-style p-1 rounded-lg"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="eleedomimf@gmail.com"
                            />
                        </div>
                        <div className="flex flex-col  p-2 text-start w-full lg:w-1/3">
                            <label className="text-base mx-1">Contact No.</label>
                            <input
                                className="input-style p-1 rounded-lg"
                                type="number"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                placeholder="+91"
                            />
                        </div>


                        <div className="flex flex-col  p-2 text-start w-full lg:w-1/3">
                            <label className="text-base mx-1 ">Insurance Company Name</label>
                            <input
                                className="input-style p-1 rounded-lg"
                                type="text"
                                value={claim}
                                onChange={(e) => setClaim(e.target.value)}
                                placeholder="Insurance Name"
                            />
                        </div>
                        <div className="flex flex-col  p-2 text-start w-full lg:w-1/3">
                            <label className="text-base mx-1">Policy Number</label>
                            <input
                                className="input-style p-1 rounded-lg"
                                type="text"
                                value={policy}
                                onChange={(e) => setPolicy(e.target.value)}
                                placeholder="Policy No."
                            />
                        </div>

                        <div className="flex flex-col  p-2 text-start w-full lg:w-1/3 ">

                            <label className="text-base mx-1">Claim Date:</label>
                            <input
                                className="input-style p-1 rounded-lg  "
                                type="date"
                                value={dates}
                                onChange={(e) => setDates(e.target.value)}

                            />
                        </div>
                        <div className="flex flex-col  p-2 text-start w-full lg:w-1/6 ">
                            <label className="text-base mx-1">Time:</label>
                            <input
                                className="input-style p-1 rounded-lg "
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}

                            />

                        </div>

                        <div className="flex flex-col  p-2 text-start w-full lg:w-1/3">
                            <label className="text-base mx-1">Policy Expiry Date</label>
                            <input
                                className="input-style p-1 rounded-lg"
                                type="date"
                                value={dated}
                                onChange={(e) => setDate(e.target.value)}

                            />
                        </div>
                        <div className="flex flex-col  p-2 text-start w-full lg:w-1/3"></div>
                        <div className="flex flex-col  p-2 text-start w-full lg:w-1/3"></div>
                    </form>
                    <div className="mt-10">
                            <button
                                className="text-white bg-gradient-to-r leading-4 from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-base px-5 py-2.5 text-center me-2 mb-2"
                                onClick={handleSubmit}
                                type="button"
                            >
                                Submit
                            </button>
                        </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceClaim;
