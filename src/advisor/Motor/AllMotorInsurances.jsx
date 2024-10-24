import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// import VehicleRegistrationNo from "../vehicleNumber/VehicleRegistrationNo.jsx";
import Asidebar from "../API/Asidebar/Asidebar.jsx";
import Navbar from "../API/Navbar/Navbar.jsx";
import QuoteForm from "../API/Quoteform/QuoteForm.jsx";
import Proposer from "../API/Proposer/Proposer.jsx";
import VITE_DATA from "../../config/config.jsx";

function AllMotorInsurances() {
  const [selectedOption, setSelectedOption] = useState("");
  const [showProposer, setShowProposer] = useState(false);
  const [menuItems, setMenuItems] = useState({});
  const [selectedSubOption, setSelectedSubOption] = useState("");
  const [quoteResponses, setQuoteResponses] = useState("");
  const [proposalResponses, setPropResponses] = useState("");
  const [token, setToken] = useState("");

  console.log(quoteResponses);
  console.log(proposalResponses);

  // Handle SubOption change
  const handleSubOptionChange = (index) => {
    const selectedOption = menuItems[index];

    sessionStorage.setItem("selectedSubOption", selectedOption.name);
    setSelectedSubOption(selectedOption.name);
    const authLink = selectedOption.authLink;
    // Make API call if needed
    if (authLink) {
      fetch(authLink)
        .then((response) => response.json())
        .then((data) => {
          const auth = data.auth || {};
          const uatLists = data.uatLists || {};
          const currentTime = Date.now();
          if (auth.access_token && auth.expires_in) {
            setToken(auth.access_token);
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
          toast.success(`${data.message}`);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  };

  // Fetch data and handle sessionStorage for state persistence
  useEffect(() => {
    const storedSubOption = sessionStorage.getItem("selectedSubOption");
    if (storedSubOption) {
      setSelectedSubOption(storedSubOption);
    }
  }, []);

  const handleSetAuthTokenToQuote = async (formData) => {
    // const authTokens = sessionStorage.getItem("auth_access_token");
    const headers = {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    };

    try {
      // const response = await axios.post('/api/motor/v1/quote', formData, {
      const response = await axios.post(
        `${VITE_DATA}/taig/motor/quote`,
        formData,
        {
          headers,
        }
      );
      console.log(response);
      if (response.data.status === 200) {
        console.log(response.data);
        setQuoteResponses(response.data);
        toast.success(`${response.data.message_txt}`);
        setShowProposer(true); // Show Proposer on successful quote submissioN
      } else {
        toast.error(response.data.message_txt || response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      // handleSessionExpiry();
    }
  };

  const handleSetAuthTokenToProposal = async (formData) => {
    // const authTokens = sessionStorage.getItem("auth_access_token");
    const headers = {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.post(
        `${VITE_DATA}/taig/motor/proposal`,
        formData,
        {
          headers,
        }
      );
      if (response.data.status === 200) {
        setPropResponses(response.data);
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

  // const handleSessionExpiry = () => {
  //   sessionStorage.removeItem("auth_access_token");
  //   sessionStorage.removeItem("auth_expires_in");
  //   sessionStorage.removeItem("auth_token_received_at");
  //   sessionStorage.removeItem("uat_access_token");
  //   sessionStorage.removeItem("uat_expires_in");
  //   sessionStorage.removeItem("uat_token_received_at");
  //   navigate("/advisor/home/insurance");
  // };

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
      <main className="md:mt-28 mt-20 flex flex-col ml-20 mr-2 ">
        {/* {selectedOption && (
          <VehicleRegistrationNo
            Check={<Check className="font-bold" />}
            MoveRight={<MoveRight width={20} />}
          />
        )} */}

        {selectedOption && (
          <QuoteForm
            onSubmit={handleSetAuthTokenToQuote}
            handle={handleSubOptionChange}
          />
        )}

        {showProposer && (
          <Proposer onSubmitProposal={handleSetAuthTokenToProposal} />
        )}
      </main>
    </>
  );
}

export default AllMotorInsurances;
