import { useState, useEffect } from "react";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";
import "swiper/css/mousewheel";
import axios from "axios";
import { toast } from "react-toastify";
import VITE_DATA from "../../config/config.jsx";
const Feedback = () => {
  const [feedbackuser_name, setFeedbackUserName] = useState("");
  const [feedbackuser_email, setFeedbackUserEmail] = useState("");
  const [feedbackuser_mobile, setFeedbackUserMobile] = useState("");
  const [feedbackuser_query, setFeedbackUserQuery] = useState("");
  const [feedbackuser_upload, setFeedbackUserUpload] = useState(null);
  // const [feedbackuser_status, setFeedbackUserStatus] = useState(true);
  const [APIData, setAPIData] = useState([]);

  useEffect(() => {
    axios
      .get(`${VITE_DATA}/users/activeusers`)
      .then((response) => {
        // console.log(response.data);
        setAPIData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("feedbackuser_name", feedbackuser_name);
      formData.append("feedbackuser_email", feedbackuser_email);
      formData.append("feedbackuser_mobile", feedbackuser_mobile);
      formData.append("feedbackuser_query", feedbackuser_query);
      formData.append("feedbackuser_upload", feedbackuser_upload);
      // formData.append("feedbackuser_status", feedbackuser_status);

      await axios.post(`${VITE_DATA}/users/feedback`, formData);

      // Clear form fields after successful submission
      setFeedbackUserName("");
      // setFeedbackUserStatus("")
      setFeedbackUserEmail("");
      setFeedbackUserMobile("");
      setFeedbackUserQuery("");
      setFeedbackUserUpload(null);
      // setFeedbackUserStatus("")
      toast.success("Feedback submitted successfully!");
      //   console.log("Feedback submitted successfully!");
    } catch (error) {
      toast.error("Error to submitting feedback");
      console.error(error);
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setFeedbackUserUpload(selectedImage);
  };

  return (
    <section className="container-fluid relative bg-orange-50">
      <div className="container-fluid  mx-auto md:flex md:justify-around ml-2 mr-2 p-10 bg-orange-50">
        {/* <div className=""> */}
        <div className="container-fluid w-auto sm:w-auto md:w-1/2 lg:w-1/2 xl:w-1/2">
          <div className="text-3xl font-medium text-start">
            What Our Customers Are Saying
            <svg
              width="70"
              height="70"
              xmlns="http://www.w3.org/2000/svg"
              className="-mt-12 -ml-2"
            >
              <line
                x1="10"
                y1="50"
                x2="90"
                y2="50"
                stroke="red"
                strokeWidth="4"
              />
            </svg>
          </div>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, Autoplay]}
            spaceBetween={1}
            slidesPerView={4} // Adjust the number of slides per view based on screen size
            direction="vertical"
            autoplay={{
              delay: 2000, // Set the delay in milliseconds between slides
              disableOnInteraction: false, // Continue autoplay even when the user interacts with the slider
            }}
            className="flex max-h-96 justify-center w-auto  sm:w-3/4 md:w-3/4 lg:w-full xl:w-full sm:text-lg md:text-lg xl:2xl text-md"
          >
            {APIData.length > 0 ? (
              APIData.map((obj) => (
                <SwiperSlide key={obj._id}>
                  <div className="flex justify-between">
                    <div className="w-full max-w-md border border-gray-200 rounded-lg shadow bg-slate-100 dark:border-red-800">
                      <div className="text-center px-4 ">
                        <h1 className="text-xl font-medium text-blue-700">
                          {obj.feedbackuser_name}
                        </h1>
                        <p className="mt-1 text-justify text-gray-900">
                          {obj.feedbackuser_query}
                        </p>
                      </div>
                    </div>
                    {/* <div className="w-full  max-w-md border border-gray-200 rounded-lg shadow bg-slate-100 dark:border-red-800">
                      
                      <div className="text-center px-4 ">
                        <h1 className='text-xl font-medium text-blue-700'>
                          {obj.feedbackuser_name}
                        </h1>
                        <p className='mt-1 text-justify text-gray-900'>
                          {obj.feedbackuser_query}
                        </p>
                      </div>
                    </div> */}
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <div role="status" className="me-20">
                {/* Loader animation */}
              </div>
            )}
          </Swiper>
        </div>
        {/* part-2 */}
        <div className="w-full sm:w-1/2">
          <p className="text-2xl font-semibold">Your Opinion</p>
          <div className="flex flex-wrap p-8 justify-between  rounded-xl shadow-xl text-2xl items-center bg-orange-200">

            <div className=" flex-col p-2 text-start w-full lg:w-1/2">
              <label className="text-base mx-1 font-semibold">Name</label>
              <input
                className="bg-gray-50 border border-gray-300  
                                    text-sm rounded-lg focus:border-blue-500 
                                    w-full p-2.5"
                type="text"
                value={feedbackuser_name}
                onChange={(e) => setFeedbackUserName(e.target.value)}
                placeholder="Your Name"
              />
            </div>
            <div className="flex flex-col p-2 text-start w-full  lg:w-1/2">
              <label className="text-base mx-1 font-semibold">Email Address <span className="text-red-600">*</span></label>
              <input
                className="bg-gray-50 border border-gray-300  
                                       text-sm rounded-lg focus:border-blue-500 
                                       w-full p-2.5"
                type="email"
                value={feedbackuser_email}
                onChange={(e) => setFeedbackUserEmail(e.target.value)}
                placeholder="abc@gmail.com"
              />
            </div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/2 ">
              <label className="text-base mx-1 font-semibold">Contact No.</label>

              <input
                className="bg-gray-50 border border-gray-300 
                                        text-sm rounded-lg focus:border-blue-500  
                                        w-full p-2.5"
                type="number"
                value={feedbackuser_mobile}
                onChange={(e) => setFeedbackUserMobile(e.target.value)}
                placeholder="+91"
              />
            </div>
           

            <div className="flex flex-col p-2 text-start w-full lg:w-1/2 ">
              <label className="text-base mx-1 font-semibold">Upload Image</label>
              <input
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:border-blue-500 w-full"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div className="flex flex-col p-2 text-start w-full lg:w-full ">
              <label className="text-base mx-1 font-semibold">Drop Your Feedback</label>

              <textarea
                className="bg-gray-50 border border-gray-300  
                                            text-sm rounded-lg  
                                            focus:border-blue-500  
                                            w-full p-2.5"
                rows="4"
                cols="25"
                maxLength="300"
                value={feedbackuser_query}
                onChange={(e) => setFeedbackUserQuery(e.target.value)}
                placeholder="Max Allowed Characters: 200"
              ></textarea>
            </div>
            <div className="flex flex-col p-2 text-start w-full lg:w-full ">
              <div className="flex justify-center ">
                <button
                  className="bg-orange-700 text-base hover:bg-orange-800 text-white font-bold py-1 px-3 mt-4 rounded "
                  onClick={handleSubmit}
                  type="button"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feedback;
