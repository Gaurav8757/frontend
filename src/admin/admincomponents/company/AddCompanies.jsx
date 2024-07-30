/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import axios from "axios";
import VITE_DATA from "../../../config/config.jsx";
let homesection = [
  {
    title: "Health Insurance",
    images: "/health.png",
    links: "/healthinsurance",
    subItems: [
      {
        subtitle: "Health Insurance",
        image: "/heart.png",
        link: "/healthinsurance",
      },
      {
        subtitle: "Employee Group Health Insurance",
        image: "/group.png",
        link: "/grouphealthinsurance",
      },
      {
        subtitle: "Family Health Insurance",
        image: "/family.png",
        link: "/familyhealthinsurance",
      },
      // Add more subItems as needed
    ],
  },
  {
    title: "Motor Insurance",
    images: "/Motor-Insurance.png",
    links: "/motorinsurance",
    subItems: [
      {
        subtitle: "Car Insurance",
        image: "/car.png",
        link: "/carinsurance",
      },
      {
        subtitle: "2 Wheeler Insurance",
        image: "/bike.png",
        link: "/twowheelinsurance",
      },
      {
        subtitle: "Commercial Vehicle Insurance",
        image: "/tempo.png",
        link: "/commercialinsurance",
      },
      // Add more subItems as needed
    ],
  },
  {
    title: "Non-motor Insurance",
    images: "/nonmotor.png",
    links: "/nonmotorinsurance",
    subItems: [
      {
        subtitle: "Travel Insurance",
        image: "/flight.png",
        link: "/travelinsurance",
      },
      {
        subtitle: "Home Insurance",
        image: "/home.png",
        link: "/homeinsurance",
      },
      {
        subtitle: "Business Insurance",
        image: "/money.png",
        link: "/businessinsurance",
      }, {
        subtitle: "Marine Insurance",
        image: "/marine.png",
        link: "/marineinsurance",
      },
      // Add more subItems as needed
    ],
  },
]

function AddCompanies() {
  const [APIData, setAPIData] = useState([]);
  const [insList, setInsList] = useState("");
  const [category, setCategory] = useState("");
  const [cType, setCType] = useState('');
  // const [establishment, setEstablishment] = useState("");
  const [cname, setCname] = useState("");
  const [files, setFiles] = useState(null);
  const [loading, setLoading] = useState(false);

  // console.log(insList);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Not Authorized yet.. Try again! ");
    } else {
      // The user is authenticated, so you can make your API request here.
      axios
        .get(`${VITE_DATA}/view/company/lists`, {
          headers: {
            Authorization: `${token}`, // Send the token in the Authorization header
          },
        })
        .then((response) => {
          setAPIData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);
  const handleInsuranceTypeChange = (e) => {
    const selectedInsuranceType = e.target.value;
    setInsList(selectedInsuranceType);
    setCategory(""); // Reset category when insurance type changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("comp_insurance", insList);
      formData.append("comp_categories", category);
      // formData.append("comp_establishment", establishment);
      formData.append("comp_cname", cname);
      if (files) {
        formData.append("comp_cfiles", files);
      }

      // Send a POST request using Axios
      const response = await axios.post(`${VITE_DATA}/dashboard/addcompany`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Check the response status
      if (response.data) {
        // Handle success, you may want to redirect or show a success message
        toast.success("Company Added Successfully!");
        // Reset the form fields
        setInsList("");
        setCategory("");
        // setEstablishment("");
        setCname("");
        setFiles(null);
      } else {
        // Handle errors
        toast.error(`Error Occurred: ${response.data.message}`);
      }
    } catch (error) {
      // Handle unexpected errors
      setLoading(false);
      toast.error(`Error Occurred...! ${error}`);
    }
  };


  return (
    <section className="container-fluid relative h-screen p-0 sm:ml-48 bg-white">
      <div className="container-fluid  justify-center p-2  border-gray-200 border-dashed rounded-lg  bg-white">
        <h1 className="font-semibold text-3xl my-4 text-blue-700 ">Add Homepage Company Details</h1>
        <div className="relative w-full lg:w-full  p-0 lg:p-4 rounded-xl shadow-xl text-2xl  items-center bg-slate-200">
          {/* <form className="flex flex-wrap" method="post" encType="multipart/form-data"> */}
          <div className="flex flex-wrap justify-between">

            <div className="flex flex-col  p-2 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Copmany Name:</label>
              <select
                className="input-style p-1 h-8 text-base rounded-lg"
                name="comp_cname"
                value={cname}
                onChange={(e) => {


                }}
              >
                <option className="text-sm" value="">
                  ------------ Select Company Name --------
                </option>
                {APIData.map((policy) => (
                  <option className="text-sm" key={policy._id} value={policy.c_type} data-id={policy._id}>
                    {policy.c_type}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col  p-2 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Insurance Type:</label>
              <select
                className="input-style p-1 rounded-lg"
                type="text"
                name="insList"
                value={insList}
                onChange={handleInsuranceTypeChange}
              >
                <option value="" disabled>
                  ----- Select Insurance Type-----
                </option>
                {homesection.map((ins, idx) => (
                  <option key={idx} value={ins.title}>
                    {ins.title}
                  </option>
                ))}
              </select>
            </div>




            <div className="flex flex-col  p-2 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Category:</label>
              <select
                className="input-style p-1 rounded-lg"
                type="text"
                name="comp_categories"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled>
                  ----- Select Category -----
                </option>
                {/* Map categories based on selected insurance type */}
                {insList &&
                  homesection
                    .find((ins) => ins.title === insList)
                    ?.subItems.map((subItem, idx) => (
                      <option key={idx} value={subItem.subtitle}>
                        {subItem.subtitle}
                      </option>
                    ))}
              </select>
            </div>

            <div className="flex flex-col  p-2 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Plan:</label>
              <input
                className="input-style text-base p-0 h-10 my-auto border border-emerald-500 rounded-lg"
                type="file"
                name="comp_cfiles"
                accept="/*"
                onChange={(e) => setFiles(e.target.files[0])}
              />
            </div>

          </div>
          {/* <div className="flex my-5 p-2 text-center w-full lg:w-1/4"></div>
            <div className="flex my-5 p-2 text-center w-full lg:w-1/4"></div> */}
          <div className="flex mt-5 justify-center p-2 text-center w-full lg:w-full">
            <button
              className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 shadow-lg shadow-green-500/50 font-medium rounded text-sm px-5 py-2 text-center"
              onClick={handleSubmit}
              type="button"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>

          </div>


        </div>
      </div>

    </section>
  );
}
export default AddCompanies;
