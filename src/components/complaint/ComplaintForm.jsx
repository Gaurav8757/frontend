import { useState } from "react";
import axios from "axios"; 
import {toast} from "react-toastify";
import VITE_DATA from "../../config/config.jsx";

const ComplaintForm = () => {
    const [nature, setNature] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [subject, setSubject] = useState("");
    const [name, setName] = useState("");
    const [query, setQuery] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${VITE_DATA}/users/complaint`, {
                complaint_name: nature,
                complaint_email: email,
                complaint_mobile: mobile,
                complaint_subject: subject,
                complaint_query: query,
            });
    //   console.log(response.data);
            if (response.data) {
                toast.success("Complaint submitted successfully!");
              // Reset form fields if needed
            } else {
                toast.error("Failed to submit Complaint.");
            //   console.error('Failed to submit Complaint');
            }
          } catch (error) {
            console.error('Error:', error);

          }
        setNature("");
        setEmail("");
        setMobile("");
        setSubject("");
        setName("");
        setQuery("");
    };

    return (
        <section className="container-fluid relative bg-white">
            <div className="container-fluid flex justify-center ml-2 mr-2 pb-4 bg-white">
                <div className="relative w-full lg:w-1/2 bg-gradient-to-r from-gray-300 to-slate-300 p-6 lg:p-14 rounded-xl shadow-xl text-xl items-center mt-4 ">
                    <form>
                        <p className="text-3xl font-semibold mb-4">Complaint Form</p>
                        <div className="text-start   space-y-4 ">
                            <div className="flex flex-col">
                                <label className="text-sm mx-1">Nature of Complain</label>
                                <input
                                    className="input-style rounded-lg"
                                    type="text"
                                    value={nature}
                                    onChange={(e) => setNature(e.target.value)}
                                    placeholder=""
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm mx-1">Name</label>
                                <input
                                    className="input-style rounded-lg"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your Name"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm mx-1">Email Address*</label>
                                <input
                                    className="input-style rounded-lg"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="abc@geeksforgeeks.org"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm mx-1">Contact No.</label>
                                <input
                                    className="input-style rounded-lg"
                                    type="number"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    placeholder="+1324567890"
                                />
                            </div>
                            <div className="flex flex-col ">
                                <label className="text-sm mx-1 ">Subject</label>
                                <input
                                    className="input-style rounded-lg"
                                    type="text"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    placeholder="Subject"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm mx-1">Detailed Query</label>
                                <textarea className="bg-gray-50 border border-gray-300  
                                            text-sm rounded-lg  
                                            focus:border-blue-500  
                                            w-full p-2.5"
                                    rows="4"
                                    cols="25"
                                    maxLength="400"
                                    value={query}
                                    onChange={(e)=> setQuery(e.target.value)}
                                    placeholder="Max Allowed Characters: 400">
                                </textarea>
                            </div>
                            <button
                                className="text-white bg-gradient-to-r leading-4 from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                onClick={handleSubmit}
                                type="button"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ComplaintForm;