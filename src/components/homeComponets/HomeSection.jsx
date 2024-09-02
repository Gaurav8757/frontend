/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { useState, } from "react";
import ChallanModal from "./viewChallan/ChallanModal.jsx";
import { toast } from "react-toastify";
import axios from "axios";
const HomeSection = ({ homesection }) => {
  const [vehicleNo, setVehicleNo] = useState("");
  const [message, setMessage] = useState("");
  const [resp, setResponse] = useState("");

  const handleChange = (e) => {
    let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""); // Remove all non-alphanumeric characters
    if (!value) {
      setMessage('Please enter a valid vehicle number');
    } else {
      setMessage('');
    }
    // Apply the format step-by-step
    if (value.length > 2) {
      value = value.slice(0, 2) + '-' + value.slice(2);
    }
    if (value.length > 5) {
      value = value.slice(0, 5) + '-' + value.slice(5);
    }
    if (value.length > 8) {
      value = value.slice(0, 8) + '-' + value.slice(8);
    }

    // Restrict to the length of CC-00-CC-0000
    if (value.length > 13) {
      value = value.slice(0, 13);
    }

    setVehicleNo(value);
  };
  const fetchData = async () => {
    try {
      const options = {
        method: 'POST',
        url: 'https://rto-challan-information-verification-india.p.rapidapi.com/api/rc/challaninfo',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': '8bfed02b6amsh3f5b6fe0d8f151bp1d370ejsne07e869329ae',
          'X-RapidAPI-Host': 'rto-challan-information-verification-india.p.rapidapi.com',
        },
        data: {
          regn_no: vehicleNo,
          consent: 'yes',
          consent_text: 'I hereby declare my consent agreement for fetching my information via AITAN Labs API',
        },
      };

      const response = await axios.request(options);
      setResponse(response.data);

    } catch (error) {
      console.error(error.response.data);
      toast.error(error.response.data.message, {
         theme: "dark", position: "top-center" 
      });
      // You may want to handle errors in a meaningful way in your application
    }
  };

  return (
    <section className="container-fluid flex flex-col lg:flex-row justify-between  sm:w-full     bg-slate-50">
      <div className="grid grid-cols-4 xs:grid-cols-2 gap-1 justify-items-center w-full sm:w-full  md:w-full lg:w-full xl:w-full pb-0  bg-slate-50 my-4">
        {homesection.map((item, index) => (
          <NavLink key={index} to={item.links} className="text-center m-1  flex-col justify-center  bg-red-800 transition-transform transform hover:translate-y-[-15px] hover:shadow-2xl  shadow-slate-900/50   p-2  lg:w-52 md:w-48  sm:w-32 w-24  rounded  ">
            <img src={item.images} alt={item.name} className="w-full xs:w-2/3 sm:w-3/4 md:w-3/4 lg:w-full xl:w-full  mx-auto" />
            <h5 className=" xl:text-base lg:text-base md:text-base text-sm  font-semibold tracking-loose align-text-bottom my-0 text-gray-100 font-serif">
              {item.title}
            </h5>
          </NavLink>
        ))}
      </div>
      {/* part-2 ui update bcha hai*/}

      <div className="container-fluid  w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/3 bg-slate-50 flex border-none border-gray-300	 justify-center items-center">
        <div className="bg-slate-50  text-start w-11/12 h-4/5 rounded-md">
          <span className="text-xl mx-1 font-semibold block font-serif">Enter Vehicle Number:</span>
          {/* input */}
          <div className="relative flex mx-5 sm:mx-12 md:mx-12 lg:mx-5 xl:mx-6 justify-center mt-6 items-center">
            <input type="text" className={`relative w-full sm:w-full md:w-full lg:w-full xl:w-auto text-center flex justify-center text-3xl font-bold rounded-lg  
              `}
              value={vehicleNo}
              onChange={handleChange}
              placeholder="BR-00-AB-1XXX" />
            <img
              src="/flag.webp"
              alt="flag"
              className="w-8 h-7 absolute left-1 top-4 hidden sm:hidden md:hidden lg:block xl:block"
            />


          </div>
          <span className="text-sm text-white">{message}</span>
          <div className="flex justify-center mt-5 items-center">
            <ChallanModal  response = {resp}/>
          </div>
        </div>
      </div>
    </section>

  );
};
export default HomeSection;
