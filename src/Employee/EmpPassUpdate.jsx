import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import VITE_DATA from "../config/config.jsx";
function EmpPassUpdate() {
  const navigate = useNavigate();
  const { empsId, token } = useParams();
  const [emppassword, setEmpPassword] = useState("");
  const [confirmpass, setConfirmpass] = useState("");

  // Update the API endpoint URL to match your backend route
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${VITE_DATA}/emp/pass/${empsId}/${token}`,
        {
          emppassword,
          confirmemp_password: confirmpass,
        }
      );
      if (response) {
        navigate("/login");
        toast.success("Password Updated Successfully...!");
      } else {
        navigate("/employee/forget");
        toast.error("Error Occured. Try Again...!");
      }
    } catch (error) {
      console.log(error);
      toast.warn("Employee Not Registered Yet...! ", error);
    }
  };

  return (
    <section className="container-fluid h-screen relative bg-blue-700">
      <div className="container-fluid pt-20 flex flex-col md:flex-row items-center pb-16 justify-between bg-blue-700">
        <div className="flex-shrink-4 px-6 md:h-full h-full py-20">
          <img
            src="/logo.webp"
            className="h-1/4 w-2/5 rounded-md mx-auto "
            alt="Logo"
          />
          <div className="text-4xl font-bold mt-4 w-80 mx-auto  text-black-700 flex justify-center">
            RESET PASSWORD
          </div>
        </div>

        <div className="flex-shrink-1 xl:px-0 lg:px-0 md:px-0 sm:px-0 xs:px-0  px-16 md:h-1/4 h-full w-full xs:w-full  sm:w-full md:1/2 mx-auto lg:w-1/3 xl:w-1/4 py-20 ">
          <div className="w-full max-w-lg p-6 space-y-18 sm:p-8  rounded-lg shadow bg-slate-100 ">
            <img
              src="/cname.png"
              className="h-1/4 w-2/4  mx-auto mb-10"
              alt="Logo"
            />
            <label
              htmlFor="password"
              className="block  text-xl  font-bold text-blue-800 "
            >
              ENTER NEW PASSWORD
            </label>
            <form
              className="mt-8 space-y-6"
              method="POST"
              onSubmit={handleSubmit}
            >
              <div>
                <input
                  type="password"
                  id="emppassword"
                  name="emppassword"
                  value={emppassword}
                  onChange={(e) => setEmpPassword(e.target.value)}
                  placeholder="New Password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  id="confirmemp_password"
                  value={confirmpass}
                  name="confirmemp_password"
                  placeholder="Confirm New Password"
                  onChange={(e) => setConfirmpass(e.target.value)}
                  autoComplete="current-password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 rounded-md bg-blue-950 hover:bg-blue-800 focus:ring-1 focus:ring-blue-900 text-base font-semibold text-white shadow-sm focus-visible:outline focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-50"
              >
                UPDATE
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmpPassUpdate;
