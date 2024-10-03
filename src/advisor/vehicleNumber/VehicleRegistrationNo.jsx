/* eslint-disable react/prop-types */
import { useState } from "react";

export default function VehicleRegistrationNo({ Check, MoveRight }) {
  const [registrationType, setRegistrationType] = useState("default");
  const [registrationParts, setRegistrationParts] = useState(["", "", "", ""]);
  const [fetchedData, setFetchedData] = useState(null);
  const [error, setError] = useState(null);

  const validateRegistrationNumber = (parts) => {
    const number = parts.join("");
    const defaultRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/;
    const bharatRegex = /^[0-9]{2}BH[0-9]{4}[A-Z]{1,2}$/;
    const specialRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{1,3}[0-9]{4}$/;

    if (registrationType === "default") return defaultRegex.test(number);
    if (registrationType === "bharat") return bharatRegex.test(number);
    if (registrationType === "special") return specialRegex.test(number);
    return false;
  };

  const handleInputChange = (index, value) => {
    const newParts = [...registrationParts];
    newParts[index] = value.toUpperCase();
    setRegistrationParts(newParts);
  };

  const handleFetchData = () => {
    setError(null);
    if (registrationType === "none") {
      setFetchedData("No registration number provided.");
      return;
    }

    if (!validateRegistrationNumber(registrationParts)) {
      setError("Invalid registration number format.");
      return;
    }

    // Simulating data fetch
    setFetchedData(`${registrationParts.join("")}`);
  };

  const getPlaceholders = () => {
    switch (registrationType) {
      case "default":
        return ["GJ", "01", "AA", "1234"];
      case "bharat":
        return ["22", "BH", "1234", "AB"];
      case "special":
        return ["GJ", "01", "AAA", "1234"];
      default:
        return ["", "", "", ""];
    }
  };

  const getMaxLengths = () => {
    switch (registrationType) {
      case "default":
        return [2, 2, 2, 4];
      case "bharat":
        return [2, 2, 4, 2];
      case "special":
        return [2, 2, 3, 4];
      default:
        return [2, 2, 2, 4];
    }
  };

  return (
    <div className="w-full  rounded">
      <div className="md:p-4 p-1">
        <div className="  flex justify-between flex-wrap md:mb-8 mb-4 ">
          <div className="flex items-center  py-4">
            <input
              type="radio"
              value="default"
              checked={registrationType === "default"}
              className="hidden" // Hide the default radio input
              onChange={() => {
                setRegistrationType("default");
                setRegistrationParts(["", "", "", ""]);
                setFetchedData(null);
                setError(null);
              }}
              id="default"
            />
            <label
              htmlFor="default"
              className={`cursor-pointer flex items-center text-base space-x-2 p-2 rounded ${
                registrationType === "default"
                  ? "bg-slate-400 text-white shadow-inner bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 hover:bg-gradient-to-br focus:ring-0 focus:outline-none focus:ring-blue-300  shadow-blue-500/50  rounded   text-center"
                  : "bg-gray-100 text-gray-700 shadow-inner"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-sm border-2 ${
                  registrationType === "default"
                    ? "bg-green-600 border-green-600  shadow-inner"
                    : "border-gray-300 shadow-inner"
                } flex items-center justify-center`}
              >
                {registrationType === "default" && Check}
              </div>
              <span>Default Vehicle No.</span>
            </label>
          </div>

          <div className="flex items-center py-4">
            <input
              type="radio"
              value="bharat"
              checked={registrationType === "bharat"}
              className="cursor-pointer hidden"
              onChange={() => {
                setRegistrationType("bharat");
                setRegistrationParts(["", "", "", ""]);
                setFetchedData(null);
                setError(null);
              }}
              id="bharat"
            />
            <label
              htmlFor="bharat"
              className={`cursor-pointer flex items-center text-base space-x-2 p-2 rounded ${
                registrationType === "bharat"
                  ? "bg-slate-400 text-white shadow-inner bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 hover:bg-gradient-to-br focus:ring-0 focus:outline-none focus:ring-blue-300  shadow-blue-500/50  rounded   text-center"
                  : "bg-gray-100 text-gray-700 shadow-inner"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-sm border-2 ${
                  registrationType === "bharat"
                    ? "bg-green-600 border-green-600  shadow-inner"
                    : "border-gray-300 shadow-inner"
                } flex items-center justify-center`}
              >
                {registrationType === "bharat" && Check}
              </div>
              <span>Bharat Vehicle No.</span>
            </label>
          </div>

          <div className="flex  items-center  py-4">
            <input
              type="radio"
              value="special"
              checked={registrationType === "special"}
              className="cursor-pointer hidden"
              onChange={() => {
                setRegistrationType("special");
                setRegistrationParts(["", "", "", ""]);
                setFetchedData(null);
                setError(null);
              }}
              id="special"
            />
            <label
              htmlFor="special"
              className={`cursor-pointer flex items-center text-base space-x-2 p-2 rounded ${
                registrationType === "special"
                  ? "bg-slate-400 text-white shadow-inner bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 hover:bg-gradient-to-br focus:ring-0 focus:outline-none focus:ring-blue-300  shadow-blue-500/50  rounded   text-center"
                  : "bg-gray-100 text-gray-700 shadow-inner"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-sm border-2 ${
                  registrationType === "special"
                    ? "bg-green-600 border-green-600  shadow-inner"
                    : "border-gray-300 shadow-inner"
                } flex items-center justify-center`}
              >
                {registrationType === "special" && Check}
              </div>
              <span>Special Vehicle No.</span>
            </label>
          </div>

          <div className="flex items-center  py-4">
            <input
              type="radio"
              value="none"
              checked={registrationType === "none"}
              className="cursor-pointer hidden"
              onChange={() => {
                setRegistrationType("none");
                setRegistrationParts(["", "", "", ""]);
                setFetchedData(null);
                setError(null);
              }}
              id="none"
            />
            <label
              htmlFor="none"
              className={`cursor-pointer flex items-center text-base space-x-2 p-2 rounded ${
                registrationType === "none"
                  ? "bg-slate-400 text-white shadow-inner font-semibold bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 hover:bg-gradient-to-br focus:ring-0 focus:outline-none focus:ring-blue-300  shadow-blue-500/50  rounded   text-center"
                  : "bg-gray-100 text-gray-700 shadow-inner"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-sm border-2 ${
                  registrationType === "none"
                    ? "bg-green-600 border-green-600  shadow-inner "
                    : "border-gray-300 shadow-inner"
                } flex items-center justify-center`}
              >
                {registrationType === "none" && Check}
              </div>
              <span className="capitalize">
                I don&apos;t have a Vehicle No.
              </span>
            </label>
          </div>
        </div>

        {/* vehicle form */}
        {(registrationType === "default" ||
          registrationType === "bharat" ||
          registrationType === "special") && (
          <div className=" flex justify-between flex-wrap gap-10">
            <div className="grid grid-cols-4 md:gap-12 gap-2">
              {registrationParts.map((part, index) => (
                <input
                  key={index}
                  placeholder={getPlaceholders()[index]}
                  value={part}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  maxLength={getMaxLengths()[index]}
                  className="text-center bg-slate-100 px-1 py-3 shadow-inner text-2xl font-bold"
                  required
                />
              ))}
            </div>
            <button
              onClick={handleFetchData}
              className="relative hidden md:inline-block cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-[2px] bg-black rounded bg-gradient-to-t from-[#6a80ff] to-[#6a80ff] active:scale-95"
            >
              <span className="w-full h-full flex items-center gap-2 px-4 py-3 bg-[blue] text-white rounded bg-gradient-to-t from-blue-700 to-blue-600">
                Fetch Vehicle Details
                {MoveRight}
              </span>
            </button>
            <button
              onClick={handleFetchData}
              className="relative md:hidden cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-[2px] bg-black rounded bg-gradient-to-t from-[#6a80ff] to-[#6a80ff] active:scale-95"
            >
              <span className="w-full h-full flex items-center gap-2 px-2 py-2 bg-[blue] text-white rounded bg-gradient-to-t from-blue-700 to-blue-600">
                Fetch Details
                {MoveRight}
              </span>
            </button>
          </div>
        )}
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {registrationType === "none" && (
          <div className="grid grid-cols-4 md:gap-12 gap-2">
            <input
              value="New"
              readOnly
              className="text-center bg-slate-100 px-1 py-3 shadow-inner text-2xl font-bold"
            />
            <input
              readOnly
              className="text-center bg-slate-100 px-1 py-3 shadow-inner text-2xl font-bold"
            />
            <input
              readOnly
              className="text-center bg-slate-100 px-1 py-3 shadow-inner text-2xl font-bold"
            />
            <input
              readOnly
              className="text-center bg-slate-100 px-1 py-3 shadow-inner text-2xl font-bold"
            />
          </div>
        )}

        {fetchedData && (
          <div className="mt-6 p-4 bg-secondary rounded-md">
            <h3 className="font-semibold mb-2">Fetched Data:</h3>
            <p>{fetchedData}</p>
          </div>
        )}
      </div>
    </div>
  );
}
