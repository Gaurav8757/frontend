import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import VITE_DATA from "../../config/config.jsx";
const ContactUs = () => {
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [query, setQuery] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${VITE_DATA}/users/contactus`, {
                usercontact_email: email,
                usercontact_mobile: mobile,
                usercontact_query: query,
            });
            //   console.log(response.data);
            if (response.data) {
                toast.success("Submitted successfully!");
                // Reset form fields if needed
            } else {
                toast.error("Failed to Contact..!");
                //   console.error('Failed to submit Complaint');
            }
        } catch (error) {
            console.error('Error:', error);

        }

        setEmail("");
        setMobile("");
        setQuery("");

    };

    return (
        <section className="container-fluid relative bg-white">
            <div className="container-fluid mx-auto md:flex md:justify-around ml-2 mr-2 pt-20 pb-20 bg-orange-50">

                <div className="flex flex-col w-auto  rounded-md md:h-auto p-4  m-5 mx-5  bg-orange-200 shadow-xl mb-4 md:mb-0">
                    <h5 className="text-2xl font-bold bg-orange-800 bg-clip-text text-transparent ">Reach Us At</h5>
                    <ul className=" ">
                        <li className="mt-2 text-lg font-bold">
                            +91 9430608622
                        </li>
                        <li className="mt-1 text-lg font-bold">
                            +91 8252460046
                        </li>
                        <li className="mt-1 text-lg font-bold">
                            +91 9905886633
                        </li>
                    </ul>
                    <ul className="mt-5 relative">
                        <li className="mt-1 text-lg font-bold">
                           support@eleedomimf.com
                        </li>
                        <li className="flex flex-col font-semibold leading-loose  text-center">
                            
                            607, 6th Floor, B-block, Gagan Apartment, Exhibition Road Chauraha
                            <span className="pl-1">
                                Patna, Bihar - 800001, India
                            </span>
                        </li>
                    </ul>
                </div>
                <div className="relative  md:w-1/3  mx-5 bg-orange-200 rounded-xl shadow-xl text-xl ">
                    <form >
                        <p className="text-2xl font-bold bg-orange-800 pt-8  bg-clip-text text-transparent">Contact Us</p>
                        <div className="space-y-2 text-start p-4">
                            <label className="text-sm mx-1 ">Email Address*</label>
                            <br></br>
                            <input className="bg-gray-50 border border-gray-300  
                                        text-sm rounded-lg focus:border-blue-500 
                                        w-full p-2.5"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="abc@gmail.com" />
                            <br></br>
                            <label className="text-sm mx-1 ">Contact No.</label>
                            <br></br>
                            <input className="bg-gray-50 border border-gray-300 
                                        text-sm rounded-lg focus:border-blue-500  
                                        w-full p-2.5"
                                type="number"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                placeholder="+91" />
                            <br></br>
                            <label className="text-sm mx-1 ">
                                Drop Your Query
                            </label>
                            <br></br>
                            <textarea className="bg-gray-50 border border-gray-300  
                                            text-sm rounded-lg  
                                            focus:border-blue-500  
                                            w-full p-2.5"
                                rows="4"
                                cols="25"
                                maxLength="300"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Max Allowed Characters: 300">
                            </textarea>
                          <div className="flex justify-center">
                            <button className="bg-orange-700 hover:bg-orange-800 text-center justify-center  
                                        text-white font-semibold  
                                        py-1 px-3 rounded"
                                onClick={handleSubmit}
                                type="button">
                                Submit
                            </button>
                            </div>
                        </div>
                    </form>
                </div>


                <div className="md:w-1/3 rounded-md h-3/2 bg-slate-300 m-3 border-sky-200 shadow-xl">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.8671437525227!2d85.13708618069788!3d25.60933061929899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed585c323272d3%3A0x7a397057f152dc4c!2sGagan%20Apartment%2C%20Brajkishore%20Path%2C%20Old%20Jakkanpur%2C%20Lodipur%2C%20Patna%2C%20Bihar%20800001!5e0!3m2!1sen!2sin!4v1706184434771!5m2!1sen!2sin"
                        className="w-full h-full border-0 rounded-md"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
