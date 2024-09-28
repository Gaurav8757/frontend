import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import VITE_DATA from "../config/config.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// dates
const formatDate = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
// time
function formatTime(dateTime) {
  const dateObj = new Date(dateTime);
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const seconds = dateObj.getSeconds();
  const amOrPm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${amOrPm}`;
}
// weekday
const formatWeekday = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeek = date.getDay();
  return weekdays[dayOfWeek];
};

function LoginAll() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emp, setEmp] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);

  const handleToggleAttendance = async (id) => {
    try {
      // const empid = sessionStorage.getItem('employeeId') ;
      const currentDateAndTime = new Date().toISOString();
      const datePart = formatDate(currentDateAndTime); // Get date in the format 01-01-2000
      const timePart = formatTime(currentDateAndTime); // Get time in the format 00:00:00 AM/PM
      const weekdayPart = formatWeekday(currentDateAndTime); // Get weekday like 'Monday'
      // Make a POST request to mark attendance
      const resp = await axios.post(
        `${VITE_DATA}/employee/mark/attendance/${id}`,
        {
          status: "present",
          date: datePart,
          time: timePart,
          // logouttime: logouttime,
          // totalHours: totalHours,
          weekday: weekdayPart,
        }
      );
      // Handle success (e.g., show a success message)
      toast.success(`${resp.data.message}`);
      sessionStorage.setItem("aid", resp.data.data._id);
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error(
        "Error marking attendance:",
        error.response ? error.response.data.message : error.message
      );
      toast.error(
        `${error.response ? error.response.data.message : error.message}`
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get(`${VITE_DATA}/api/employee-list`, {
          headers: {
            Authorization: token,
          },
        });
        setEmp(response.data); // Assuming the response contains the data you want to set
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []); // Empty de

  const filteredIds = emp
    .filter(
      (data) =>
        data.empname === "KAMLESH THAKUR" || data.empname === "Kamlesh Thakur"
    )
    .map((filteredData) => filteredData._id);

  //   const filteredIds1 = emp
  //   .filter(data => data.empname === 'KAMLESH THAKUR' || data.empname === 'Kamlesh Thakur')
  //   .map(filteredData => filteredData._id);

  const handleLoginTypeChange = (e) => {
    setLoginType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      switch (loginType) {
        case "admin":
          response = await axios.post(`${VITE_DATA}/loginadmin`, {
            mobile,
            email,
            password,
          });
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("email", response.data.email);
          break;

        case "employee":
          response = await axios.post(`${VITE_DATA}/login/employee`, {
            empemail: email,
            empmobile: mobile,
            emppassword: password,
          });
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("email", response.data.user.empemail);
          sessionStorage.setItem("employeeId", response.data.user._id);
          sessionStorage.setItem("name", response.data.user.empname);
          sessionStorage.setItem("branch", response.data.user.empbranch);
          sessionStorage.setItem("role", response.data.user.staffType);
          // Mark attendance after successful login
          await handleToggleAttendance(response.data.user._id);
          break;

        case "hrmanager":
          response = await axios.post(`${VITE_DATA}/hradmin/login`, {
            hrademail: email,
            hradmobile: mobile,
            hradpassword: password,
          });
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("email", response.data.email);
          sessionStorage.setItem("hrId", response.data.id);
          sessionStorage.setItem("name", response.data.name);
          // Mark attendance after successful login
          await handleToggleAttendance(filteredIds);
          break;

        case "advisor":
          response = await axios.post(`${VITE_DATA}/advisor/login`, {
            advisoremail: email,
            advisormobile: mobile,
            advisorpassword: password,
          });
          // console.log(response.data);
          sessionStorage.setItem("advisoremail", email);
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("email", response.data.advisory.advisoremail);
          sessionStorage.setItem("advisorId", response.data.advisory._id);
          sessionStorage.setItem("name", response.data.advisory.advisorname);

          // Add your code snippet here

          break;

        case "branches":
          response = await axios.post(`${VITE_DATA}/branches/loginbranch`, {
            branchemail: email,
            password,
          });
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("email", response.data.user.branchemail);
          sessionStorage.setItem("name", response.data.user.branchname);
          sessionStorage.setItem("branchId", response.data.user._id);
          break;

        case "ops":
          response = await axios.post(`${VITE_DATA}/ops/login`, {
            opsemail: email,
            opspassword: password,
          });
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("email", response.data.user.opsemail);
          sessionStorage.setItem("name", response.data.user.opsname);
          // Mark attendance after successful login
          // await handleToggleAttendance();
          break;

        case "finance":
          response = await axios.post(`${VITE_DATA}/finance/login`, {
            finemail: email,
            finpassword: password,
          });
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("finemail", response.data.email);
          sessionStorage.setItem("finname", response.data.name);
          break;

        case "cic":
          response = await axios.post(`${VITE_DATA}/cic/login`, {
            cicemail: email,
            cicpassword: password,
          });
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("cicemail", response.data.email);
          sessionStorage.setItem("cicname", response.data.name);
          break;

        default:
          response = await axios.post(`${VITE_DATA}/ops/login`, {
            opsemail: email,
            opspassword: password,
          });
          break;
      }

      if (response) {
        const token = sessionStorage.getItem("token");
        if (!token) {
          toast.error("No token found. Please log in again.");
          return;
        }

        // Decode the token once
        const decodedToken = jwtDecode(token);

        // Handle based on login type
        switch (loginType) {
          case "admin":
            if (decodedToken.isAdmin === true) {
              navigate("/dashboard");
              toast.success("Logged In Successfully !");
            } else {
              toast.error("You are not authorized to access this page.");
              navigate("/login");
            }
            break;

          case "employee":
            if (
              ["HR ADMIN", "HR Admin", "hr admin"].includes(
                response.data.user.staffType
              )
            ) {
              navigate("/admin/hr/home");
              toast.success("Logged In Successfully !");
            } else {
              navigate("/employee/home");
              toast.success("Logged In Successfully !");
            }
            break;

          case "hrmanager":
            if (decodedToken.isHr === true) {
              navigate("/hr/home");
              toast.success("Logged In Successfully !");
            } else {
              toast.error("You are not authorized to access this page.");
              navigate("/login");
            }
            break;

          case "advisor":
            navigate("/advisor/home");
            toast.success("Logged In Successfully !");
            break;

          case "branches":
            navigate("/branches/home");
            toast.success("Logged In Successfully !");
            break;

          case "ops":
            if (decodedToken.isOps === true) {
              navigate("/ops/home");
              toast.success("Logged In Successfully !");
            } else {
              toast.error("You are not authorized to access this page.");
              navigate("/login");
            }
            break;

          case "finance":
            if (decodedToken.isFinance === true) {
              navigate("/finance/home");
              toast.success("Logged In Successfully !");
            } else {
              toast.error("You are not authorized to access this page.");
              navigate("/login");
            }

            break;

          case "cic":
            if (decodedToken.isCic === true) {
              navigate("/cic/home");
              toast.success("Logged In Successfully !");
            } else {
              toast.error("You are not authorized to access this page.");
              navigate("/login");
            }
            break;

          default:
            toast.warn("Please Select Login Type..! ");
            break;
        }
      }
    } catch (error) {
      toast.error(
        `Error: ${
          error.response?.data?.message || "An unexpected error occurred"
        }`
      );
    }
  };

  const forgotPasswordLink = () => {
    switch (loginType) {
      case "admin":
        return "/admin/forget";
      case "employee":
        return "/employee/forget";

      case "hrmanager":
        return "/hradmin/forget";
      case "branches":
        return "/branches/forget";
      case "ops":
        return "/ops/forget";
      case "advisor":
        return "/advisor/forget";
      case "finance":
        return "/finance/forget";
      case "cic":
        return "/cic/forget";

      default:
        return "/login";
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
    setTimeout(() => setShowPassword(false), 10000);
  };

  return (
    <>
      <section className="container-fluid h-screen relative bg-orange-600">
        <div className="container-fluid pt-0 flex flex-col md:flex-row items-center pb-0 justify-between bg-orange-600">
          {/* <div className="flex-shrink-4  md:h-full h-full w-full xs:w-full   sm:w-full md:w-full mx-auto  lg:w-2/5 xl:py-20"> */}
          <img
            src="/insurance.png"
            className="h-1/2 mt-48 w-1/2 rounded-md mx-auto md:h-full  xs:w-full   sm:w-full md:w-full   lg:w-1/3 "
            alt="Logo"
          />

          {/* <div className="text-4xl font-bold mt-3 w-64 mx-auto  text-black-700 flex justify-center">Login</div> */}
          <div className="flex-shrink-1 mt-10 md:h-1/4 h-full w-full xs:w-full backdrop:bg-transparent  sm:w-full md:1/2 mx-auto lg:w-1/3 xl:w-1/4 xl:py-5">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
              {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-900 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div> */}
              <div className="w-full max-w-xl p-6 space-y-1  mx-auto  rounded-lg  relative px-4 py-10 bg-slate-100 shadow-lg sm:rounded-3xl sm:p-10">
                <img
                  src="/logo.webp"
                  className="h-1/4 w-1/4  mx-auto "
                  loading="lazy"
                  rel="preload"
                  alt="Logo"
                />
                <div className="text-base font-bold mt-3 w-64 mx-auto text-blue-700 text-black-700 flex justify-center">
                  Eleedom IMF Private Limited
                </div>
                <form
                  className="mt-8 space-y-4"
                  method="POST"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-1 text-base text-start font-medium text-blue-700 "
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={mobile || email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setMobile(e.target.value);
                      }}
                      autoComplete="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm text-base rounded focus:ring-primary-500 active:placeholderbg-gray-400 focus:border-primary-500 block w-full p-2.5 "
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-1 text-base text-start font-medium text-blue-700 "
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                        required
                      />
                      <button
                        type="button"
                        onClick={handleTogglePassword}
                        className="absolute inset-y-0 right-1 bottom-0  px-3 flex items-center focus:outline-none"
                      >
                        {showPassword ? (
                          // <IoEyeOutline size={25} />
                          <img
                            src="/view.png"
                            height={5}
                            width={25}
                            alt="close"
                            className=" rounded-full"
                          />
                        ) : (
                          // <IoEyeOffOutline size={25} />
                          <img
                            src="/eye.png"
                            height={5}
                            width={25}
                            alt="close"
                            className="rounded-full"
                          />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className=" text-justify mt-1 ml-0 ">
                    <label
                      htmlFor="type"
                      className="block mx-0  text-base font-medium mt-3 ml-1 text-blue-700"
                    >
                      Login Type
                    </label>
                    <select
                      id="type"
                      className="input-style  bg-gray-50 border my-2 border-gray-300 text-gray-900 text-base rounded focus:ring-primary-500 focus:border-primary-500 block w-full p-1.5"
                      value={loginType}
                      onChange={handleLoginTypeChange}
                    >
                      <option value="">
                        {" "}
                        -------------- Select Login Type -----------------
                      </option>
                      <option value="admin">Admin</option>
                      <option value="finance">Finance Admin</option>
                      <option value="ops">OPS Admin</option>
                      <option value="branches">Branch</option>
                      <option value="cic">CIC</option>
                      <option value="hrmanager">HR Manager</option>
                      <option value="employee">Employee</option>

                      <option value="advisor">Advisor</option>
                    </select>
                  </div>

                  <div className="flex items-start">
                    <NavLink
                      to={forgotPasswordLink()}
                      className="ml-auto text-base font-semibold transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-10 duration-300 text-blue-700 hover:underline hover:text-blue-500 "
                      target="_blank"
                    >
                      Forgot Password?
                    </NavLink>
                  </div>
                  <button
                    type="submit"
                    className="w-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-10 duration-300 flex justify-center py-2 px-4 rounded hover:bg-blue-600 bg-blue-800  focus:ring-1 focus:ring-blue-900 text-base font-semibold text-white shadow-sm focus-visible:outline focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-50"
                  >
                    SIGN IN
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LoginAll;
