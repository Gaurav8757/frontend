import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import VehicleRegistrationNo from "../vehicleNumber/VehicleRegistrationNo.jsx";
import { Check, MoveRight } from "lucide-react";
import Asidebar from "../API/Asidebar/Asidebar.jsx";
import Navbar from "../API/Navbar/Navbar.jsx";
import QuoteForm from "../API/Quoteform/QuoteForm.jsx";

function AllMotorInsurances() {
  
  const [selectedOption, setSelectedOption] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [selectedSubOption, setSelectedSubOption] = useState("");
  const [subCustType, setSubCustType] = useState("");
  const [customerType, setCustomerType] = useState([]);
  const [quoteResponses, setQuoteResponses] = useState("");
  const navigate = useNavigate();
  console.log(quoteResponses);

  // Handle SubOption change
  const handleSubOptionChange = (index) => {
    const selectedOption = menuItems[index];
    sessionStorage.setItem("selectedSubOption", selectedOption.name);
    setSelectedSubOption(selectedOption.name);
    const authLink = selectedOption.authLink;
    const custType = selectedOption.custType;
    setCustomerType(custType);

    // Make API call if needed
    if (authLink) {
      fetch(authLink)
        .then((response) => response.json())
        .then((data) => {
          const auth = data.auth || {};
          const uatLists = data.uatLists || {};
          const currentTime = Date.now();

          if (auth.access_token && auth.expires_in) {
            sessionStorage.setItem("auth_access_token", auth.access_token);
            sessionStorage.setItem("auth_expires_in", auth.expires_in);
            sessionStorage.setItem("auth_token_received_at", currentTime);
          }

          if (uatLists.access_token && uatLists.expires_in) {
            sessionStorage.setItem("uat_access_token", uatLists.access_token);
            sessionStorage.setItem("uat_expires_in", uatLists.expires_in);
            sessionStorage.setItem("uat_token_received_at", currentTime);
          }
          // handleSetAuthTokenToQuote();
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  };

  // Handle Customer Type change
  const handleCustomerTypeChange = (index) => {
    const selectedCustomer = customerType[index];
    sessionStorage.setItem("subCustType", selectedCustomer);
    setSubCustType(selectedCustomer);
  };

  // Fetch data and handle sessionStorage for state persistence
  useEffect(() => {
    const storedSubOption = sessionStorage.getItem("selectedSubOption");
    const storedCustType = sessionStorage.getItem("subCustType");
    if (storedSubOption) {
      setSelectedSubOption(storedSubOption);
    }

    if (storedCustType) {
      setSubCustType(storedCustType);
    }
  }, []);

  const handleSetAuthTokenToQuote = async (formData) => {
    const authTokens = sessionStorage.getItem("auth_access_token");
    const headers = {
      Authorization: `${authTokens}`,
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.post(
        import.meta.env.VITE_TATA_AIG_4_WHEELER_QUOTE_URL,
        formData,
        { headers }
      );

      if (response.data.status === 200) {
        setQuoteResponses(response.data);
        toast.success(`${response.data.message_txt}`);
        console.log("Data successfully submitted:", response.data);

        // Store the response in localStorage
        localStorage.setItem("formResponse", JSON.stringify(response.data));
      } else {
        toast.error(`${response.data.message_txt}`);
       
        
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching quote");
      // handleSessionExpiry();
    }
  };


  const handleSessionExpiry = () => {
    sessionStorage.removeItem("auth_access_token");
    sessionStorage.removeItem("auth_expires_in");
    sessionStorage.removeItem("auth_token_received_at");
    sessionStorage.removeItem("uat_access_token");
    sessionStorage.removeItem("uat_expires_in");
    sessionStorage.removeItem("uat_token_received_at");
    navigate("/advisor/home/insurance");
  };
   
  return (
    <>
      {/* NAVBAR */}
      <Navbar
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        setMenuItems={setMenuItems}
        selectedSubOption={selectedSubOption}
      />
      {/* Sidebar */}
      <Asidebar />
      {/* Main */}
      <main className="md:mt-20 mt-20 flex flex-col ml-20 mr-5">
        {selectedOption && (
          <>
            <VehicleRegistrationNo
              Check={<Check className="font-bold" />}
              MoveRight={<MoveRight width={20} />}
            />
            <div className="flex flex-col mt-4 md:mt-16 text-start">
              {/* <h1 className="text-xl font-semibold space-x-5 p-4 ">
                Business Type
                <span className="text-red-500 font-extrabold"> *</span>
              </h1> */}
              <ul className="flex space-x-4 px-5">
                {menuItems?.map((option, index) => (
                  <li key={index}>
                    <input
                      type="radio"
                      id={`hosting-${index}`}
                      name="hosting"
                      value={selectedSubOption}
                      className="hidden peer"
                      checked={selectedSubOption === option.name}
                      onChange={() => handleSubOptionChange(index)}
                    />
                    <label
                      htmlFor={`hosting-${index}`}
                      className={`inline-flex items-center justify-between w-full p-1 px-4 shadow-inner text-gray-500 bg-slate-100 border border-gray-200 rounded cursor-pointer peer-checked:border-blue-600 peer-checked:bg-gradient-to-t from-blue-700 to-blue-600 peer-checked:text-white hover:text-gray-600 hover:bg-gray-100`}
                    >
                      <div className="block my-auto">
                        <div className="w-auto text-lg md:text-xl font-semibold">
                          {option.name}
                        </div>
                      </div>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* {selectedSubOption && (
          <div className="flex flex-col my-4 md:my-10 text-start">
            <h1 className="text-xl font-semibold space-x-5 p-4">
              Customer Type
              <span className="text-red-500 font-extrabold"> *</span>
            </h1>
            <ul className="flex space-x-4 px-5">
              {customerType.map((cust, index) => (
                <li key={index}>
                  <input
                    type="radio"
                    id={`h-${index}`}
                    name="h"
                    value={subCustType}
                    className="hidden peer"
                    checked={subCustType === cust}
                    onChange={() => handleCustomerTypeChange(index)}
                  />
                  <label
                    htmlFor={`h-${index}`}
                    className={`inline-flex items-center justify-between w-full p-1 px-4 shadow-inner text-gray-500 bg-slate-100 border border-gray-200 rounded cursor-pointer peer-checked:border-blue-600 peer-checked:bg-gradient-to-t from-blue-700 to-blue-600 peer-checked:text-white hover:text-gray-600 hover:bg-gray-100`}
                  >
                    <div className="block my-auto">
                      <div className="w-auto text-lg md:text-xl font-semibold">
                        {cust}
                      </div>
                    </div>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )} */}
        {/* {subCustType && <QuoteForm onSubmit={handleSetAuthTokenToQuote} />} */}
        <QuoteForm onSubmit={handleSetAuthTokenToQuote} />
      </main>
    </>
  );
}

export default AllMotorInsurances;
