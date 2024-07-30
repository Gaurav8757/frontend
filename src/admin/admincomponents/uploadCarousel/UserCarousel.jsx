// import { NavLink } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import VITE_DATA from "../../../config/config.jsx";
function UserCarousel() {
    const [formData, setFormData] = useState({
        usercarousel_title: "",
        usercarousel_desc: "",
        usercarousel_link: "",
        usercarousel_upload: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        // console.log(file);

        setFormData({ ...formData, usercarousel_upload: file });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const uploadData = new FormData();
            for (let key in formData) {
                uploadData.append(key, formData[key]);
            }

            const response = await axios.post(`${VITE_DATA}/users/first/carousel`, uploadData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.data) {
                toast.success(`${response.data.message.newCarousel.usercarousel_title} Added Successfully!`);
                setFormData({
                    usercarousel_title: "",
                    usercarousel_desc: "",
                    usercarousel_link: "",
                    usercarousel_upload: null,
                });
            } else {
                toast.error(`Error Occurred: ${response.data.message}`);
            }
        } catch (error) {
            console.error("Error Occurred:", error);
            toast.error(`Error Occurred: ${error.response.data.message}`);
        }
    };

    return (
        <section className="container-fluid relative  p-0 sm:ml-48 bg-white">
            <div className="container-fluid  justify-center p-2  border-gray-200 border-dashed rounded-lg  bg-white">
            <h1 className="font-semibold text-3xl my-2 text-blue-700 ">Add Carousel&apos;s</h1>
                <div className="relative w-full lg:w-full   rounded-xl shadow-xl text-2xl  items-center bg-slate-200">
                    
                    <form className="flex flex-wrap" method="post" onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/4">
                            <label className="text-base mx-1">Title:</label>
                            <input
                                type="text"
                                name="usercarousel_title"
                                className="input-style p-1 rounded-lg"
                                value={formData.usercarousel_title}
                                onChange={handleChange}
                                placeholder="Title"
                                
                            />
                        </div>
                        <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/4">
                            <label className="text-base mx-1">Description:</label>
                            <input
                                className="input-style p-1 rounded-lg"
                                type="text"
                                name="usercarousel_desc"
                                value={formData.usercarousel_desc}
                                onChange={handleChange}
                                placeholder="Description"
                                
                            />
                        </div>

                        <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/4">
                            <label className="text-base mx-1">Link:</label>
                            <input
                                className="input-style p-1 rounded-lg"
                                type="text"
                                name="usercarousel_link"
                                value={formData.usercarousel_link}
                                onChange={handleChange}
                                placeholder="Link"
                                
                            />
                            <span className="text-red-900 text-sm">*required</span>
                        </div>

                        <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/4">
                            <label className="text-base mx-1">Image Upload:</label>
                            <input
                                className="input-style border h-8 text-xs border-black  rounded-lg"
                                type="file"
                                name="usercarousel_upload"
                                accept="image/*"
                                onChange={handleFileChange}
                                
                            />
                        </div>
                        <div className="w-full p-2">
                            <button
                                className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 shadow-lg shadow-green-500/50 font-medium rounded text-sm px-4 py-2 text-center mt-5"
                                type="submit"
                            >
                                Submit
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
export default UserCarousel;