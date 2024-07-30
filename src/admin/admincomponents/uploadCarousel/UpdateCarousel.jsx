/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import VITE_DATA from "../../../config/config.jsx";
function UpdateCarousel({ carouselFirst, onUpload, onClose }) {
    
    const [loading, setLoading] = useState(false);
    const [carousel, setCarousel] = useState({
        usercarousel_title: "",
        usercarousel_link: "",
        usercarousel_desc: "",
        usercarousel_upload: null,
    })

  

    // show all data inside input tag
    useEffect(() => {
        setCarousel(carouselFirst);
    }, [carouselFirst]);


   // handle input change, including file uploads
   const handleInputChange = (e) => {
    const { name, value, type } = e.target;
  
    if (type === "file") {
      // Handle file uploads
      const file = e.target.files[0];
      setCarousel((prevData) => ({
        ...prevData,
        [name]: file,
      }));
    } else {
      setCarousel((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  

    const updateCarouselAPI = async () => {
        try {
            setLoading(true);

      // Create FormData for file upload
      const formData = new FormData();
      formData.append("usercarousel_title", carousel.usercarousel_title);
      formData.append("usercarousel_link", carousel.usercarousel_link);
      formData.append("usercarousel_desc", carousel.usercarousel_desc);
      formData.append("usercarousel_upload", carousel.usercarousel_upload);
     


            // Make an API call to update contact
            const response = await axios.put(
                `${VITE_DATA}/users/first/carousel/update/${carouselFirst._id}`, // Update the URL with the correct endpoint
                formData,  {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                  }
            );

            toast.success(`${response.data.status}`)
            // Close the modal after successful update
            onClose();
            onUpload();
        } catch (error) {
            toast.error(`${error}`)
            console.error("Error updating Carousel:", error);
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
                    className="fixed top-0 right-0 left-0 bottom-0 inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
                >
                    <div className="relative p-4 w-full max-w-6xl max-h-5xl mx-auto my-20">
                        {/* <!-- Modal content --> */}
                        <div className="relative bg-gradient-to-r from-blue-700 to-blue-700 rounded-lg shadow">
                            {/* <!-- Modal header --> */}
                            <div className="flex items-center justify-between p-2 md:p-3 rounded-lg dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-white">
                                    Update Carousel
                                </h3>
                                <button
                                    onClick={onClose}
                                    type="button"
                                    className=" bg-transparent hover:bg-red-100 text-slate-100  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  ">
                                    <img src="/close.png" height={5} width={25} alt="close" className="hover:bg-red-100 rounded-full"/>
                                </button>
                            </div>
                            <section className="p-4 md:p-3 bg-blue-700 scroll-smooth hs-scroll-inside-viewport-modal rounded-lg max-h-auto text-justify overflow-y-auto ">
                                <form className="flex flex-wrap justify-between p-2 font-semibold bg-gradient-to-r from-slate-100 to-white ">
                                   
                                        <div className="flex flex-col mt-4 text-start w-full lg:w-1/4">
                                            <label className="text-base mx-1">Title:</label>
                                            <input
                                                className="input-style p-1 rounded-lg"
                                                type="text"
                                                value={carousel.usercarousel_title}
                                                onChange={handleInputChange}
                                                name="usercarousel_title"
                                                placeholder="Enter Carousel Title "
                                            />
                                        </div>

                                        <div className="flex flex-col mt-4 text-start w-full lg:w-1/4">
                                            <label className="text-base mx-1">Link:</label>
                                            <input
                                                className="input-style p-1 rounded-lg"
                                                type="text"
                                                value={carousel.usercarousel_link}
                                                onChange={handleInputChange}
                                                name="usercarousel_link"
                                            />
                                        </div>
                                  

                                        <div className="flex flex-col mt-4 mr-4 text-start w-full lg:w-1/4">
                                            <label className="text-base mx-1">Description:</label>
                                            <input
                                                className="input-style p-1 rounded-lg"
                                                type="text"
                                                name="usercarousel_desc"
                                                value={carousel.usercarousel_desc}
                                                onChange={handleInputChange}
                                                placeholder="Enter Description"
                                            />
                                        </div>
                                        <div className="flex flex-col mt-4 text-start w-full lg:w-1/4">
                                            <label className="text-base mx-1">Image Upload:</label>
                                            <input
                                                className="input-style p-1 my-auto h-10 items-center rounded-lg"
                                                type="file"
                                                accept="image/*"
                                                // value={carousel.usercarousel_upload || ""}
                                                onChange={handleInputChange}
                                                name="usercarousel_upload"
                                            />
                                        </div>

                                   


                                    <div className="w-full p-1 mt-2 justify-center flex">
                                        <button
                                            className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 shadow-lg shadow-green-500/50 font-medium rounded text-sm px-4 py-2 text-center"
                                            onClick={updateCarouselAPI}
                                            type="button"
                                        >
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

export default UpdateCarousel;