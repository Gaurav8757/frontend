import { useState } from "react";
import qs from "qs"; // Ensure qs is imported
import axios from "axios"; // Ensure axios is imported

// Fetch data function using Vite environment variables
function fetchData() {
  const {
    VITE_TATA_AIG_URL,
    VITE_TATA_AIG_GRANT_TYPE,
    VITE_TATA_AIG_SCOPE,
    VITE_TATA_AIG_CLIENT_ID,
    VITE_TATA_AIG_CLIENT_SECRET,
    VITE_TATA_AIG_XSRF_TOKEN,
  } = import.meta.env;


  let data = qs.stringify({
    grant_type: VITE_TATA_AIG_GRANT_TYPE,
    scope: VITE_TATA_AIG_SCOPE,
    client_id: VITE_TATA_AIG_CLIENT_ID,
    client_secret: VITE_TATA_AIG_CLIENT_SECRET,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: VITE_TATA_AIG_URL,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: `XSRF-TOKEN=${VITE_TATA_AIG_XSRF_TOKEN}`,
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
}

// eslint-disable-next-line react/prop-types
function AigCarVehicle({ onClose }) {
  const [vehicleNo, setVehicleNo] = useState("");
  const [message, setMessage] = useState("");

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

  return (
    <section className="fixed rounded backdrop-blur-lg top-0 right-0  left-0 bottom-0 inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
      <div className="relative bg-transparent p-1 xl:w-10/12 lg:w-10/12 md:w-10/12 sm:w-10/12 w-11/12 max-w-4xl max-h-7xl mx-auto xl:my-40 lg:my-40 md:my-30 sm:my-10 my-10 rounded">
        <div className="flex items-center justify-between p-1 rounded-lg ">
          <button
            onClick={onClose}
            type="button"
            className="hover:bg-red-400 bg-red-100 text-slate-100 rounded-lg text-sm w-7 h-7 ms-auto inline-flex justify-center items-center">
            <img src="/close.png" height={5} width={20} alt="close" className="hover:bg-red-400 rounded-full" />
          </button>
        </div>

        <main className="z-100 container-fluid flex justify-center p-0.5 rounded bg-blue-600 bg-gradient-to-l from-blue-700 via-slate-300 to-blue-700">
          <div className="relative w-full rounded shadow-xl text-2xl items-center bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600">
            <div className="flex flex-wrap justify-evenly">
              <div className="h-60 w-60">
                <img src="/tataaigcar.png" alt="fourwheeler" />
              </div>

              <div className="flex flex-col justify-evenly mb-5 xl:mb-0 lg:mb-0 md:mb-0 sm:mb-5 text-center">
                <div className="flex flex-col xl:mb-0 lg:mb-0 md:mb-0 sm:mb-0 mb-5">
                  <label className="text-lg font-semibold mx-1">Vehicle Number</label>
                  <input
                    className="input-style rounded-md focus:outline-none focus:ring-0 py-2 mt-1 text-2xl uppercase text-center font-bold placeholder:text-base placeholder:text-center"
                    type="text"
                    name="vehicleNo"
                    onChange={handleChange}
                    placeholder="Enter Vehicle Number (eg. BR-01-AM-0000)"
                    value={vehicleNo}
                    maxLength="13"
                  />
                  <span className="text-sm text-white">{message}</span>
                </div>

                <button
                  className={`relative py-auto inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-md group ${!vehicleNo ? 'cursor-not-allowed opacity-50 bg-blue-800' : 'bg-blue-600 hover:bg-blue-800 hover:-translate-y-1 duration-300 hover:text-white'}`}
                  onClick={fetchData}
                  disabled={!vehicleNo}
                >
                  <span className="relative px-2 text-xl py-1 text-yellow-50 my-auto transition-all ease-in-out duration-300 group-hover:bg-opacity-0">
                    View Offers
                  </span>
                  <img src="/ri.png" width={25} className="grayscale hover:translate-x-3 transition-transform duration-300" alt="button" />
                </button>

              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}

export default AigCarVehicle;
