/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import VITE_DATA from "../../../config/config.jsx";
function UpdateContact({ data, onUpdate, onClose }) {
    const [loading, setLoading] = useState(false);
    const [contactData, setContactData] = useState({
        usercontact_email: "",
        usercontact_mobile: "",
        usercontact_query: "",
    });

    // show all data inside input tag
    useEffect(() => {
        setContactData(data);
    }, [data]);

    // handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContactData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // API call to update contact
    const updateContactAPI = async () => {
        try {
            setLoading(true);
            // Make an API call to update contact
            const response = await axios.patch(
                `${VITE_DATA}/users/updatecontact/${data._id}`, // Update the URL with the correct endpoint
                contactData
            );
            toast.success(`${response.data.status}`)
            // Close the modal after successful update
            onClose();
            onUpdate();
        } catch (error) {
            toast.error(`${error}`)
            console.error("Error to updating contact:", error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
         
                <div
                    id="static-modal"
                    data-modal-backdrop="static"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed top-0 right-0 left-0 bottom-0 inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
                    <div className="relative p-4 w-full max-w-4xl max-h-4xl mx-auto my-20">
                        {/* <!-- Modal content --> */}
                        <div className="relative bg-gradient-to-r from-blue-700 to-blue-700 rounded-lg shadow ">
                            {/* <!-- Modal header --> */}
                            <div className="flex items-center justify-between p-2 md:p-3 rounded-lg dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-white ">
                                    Update Company
                                </h3>
                                <button
                                    onClick={onClose}
                                    type="button"
                                    className=" bg-transparent hover:bg-red-100 text-slate-100  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  ">
                                    <img src="/close.png" height={5} width={25} alt="close" className="hover:bg-red-100 rounded-full"/>
                                </button>
                            </div>

                            {/* <!-- Modal body --> */}
                            <section className=" scroll-smooth hs-scroll-inside-viewport-modal rounded-lg max-h-auto text-justify overflow-y-auto bg-gradient-to-r from-slate-100 to-white">
                                <form className="flex flex-wrap font-semibold" method="post" encType="multipart/form-data">
                                   

                                        <div className="flex flex-col p-1 text-start w-full lg:w-1/3">
                                            <label className="text-base mx-1"> Name:</label>
                                            <input
                                                className="input-style p-1 rounded-lg"
                                                type="text"
                                                name="usercontact_email"
                                                value={contactData.usercontact_email}
                                                onChange={handleInputChange}
                                                placeholder="Enter Company Name" />
                                        </div>
                                        {/* QUERY */}
                                        <div className="flex flex-col p-1 text-start w-full lg:w-1/3">
                                            <label className="text-base mx-1">Query:</label>
                                            <input
                                                className="input-style border p-1 items-center rounded-lg"
                                                type="text"
                                                name="usercontact_query"
                                                value={contactData.usercontact_query}
                                                onChange={handleInputChange} />
                                        </div>
                                  
                                    {/* part-2 */}
                                    
                                        <div className="flex flex-col p-1 text-start w-full lg:w-1/3">
                                            <label className="text-base mx-1">Mobile Number:</label>
                                            <input
                                                className="input-style p-1 rounded-lg"
                                                type="number"
                                                name="usercontact_mobile"
                                                value={contactData.usercontact_mobile}
                                                onChange={handleInputChange} />
                                        </div>
                                 


                                    <div className="w-full flex justify-center p-2">
                                        <button
                                            className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2"
                                            onClick={updateContactAPI}
                                            type="button">
                                            {loading ? "Submitting..." : "Submit"}
                                        </button>
                                    </div>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
        </>
    )
}
export default UpdateContact;