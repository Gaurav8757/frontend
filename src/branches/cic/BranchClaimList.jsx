import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import * as XLSX from 'xlsx';
import VITE_DATA from '../../config/config.jsx';
import { NavLink } from 'react-router-dom';
import TextLoader from '../../loader/TextLoader.jsx';
function BranchClaimList() {
    const [claimData, setClaimData] = useState([]);
    const [comp, setComp] = useState("");
    const [ins, setIns] = useState("");
    const [veh, setVeh] = useState("");
    const [survy, setSurvy] = useState("");
    const [advs, setAdvs] = useState("");
    const [vehicleType, setVehicleType] = useState("");
    const [peid, setPEID] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          toast.error("Not Authorized yet.. Try again! ");
          return;
        }
        const response = await axios.get(`${VITE_DATA}/claims/view`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setClaimData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);


  const filteredData = claimData.filter(data => {
    // Check if data is defined
    if (!data) return false;
    // Filter conditions
    const idLower = data.companyName?.toLowerCase() || "";
    const ptype = data.insuredName?.toLowerCase() || "";
    const vehLower = data.vehicleRegNo?.toLowerCase() || "";
    const survyor = data.surveyorName?.toLowerCase() || "";
    const advisors = data.advisor?.toLowerCase() || "";
    const branches = data.vehicleType?.toLowerCase() || "";
    const policyExpiryDate = data.policyExpiryDate?.toLowerCase() || "";
    return (
      (survyor.includes(survy.toLowerCase()) || survy === "") &&
      (ptype.includes(ins.toLowerCase()) || ins === "") &&
      (idLower.includes(comp.toLowerCase()) || comp === '') &&
      (vehLower.includes(veh.toLowerCase()) || veh === '') &&
      (advisors.includes(advs.toLowerCase()) || advs === "") &&
      (branches.includes(vehicleType.toLowerCase()) || vehicleType === '') &&
      (policyExpiryDate.includes(peid.toLowerCase()) || peid === '')
    );
  });


//   const deleteClaims = async (_id) => {
//     try {
//       const resp = await axios.delete(`${VITE_DATA}/claims/delete/${_id}`);
    
//       toast.error(`${resp.data.message}`, { theme: "dark", position: "top-right" });
//       setClaimData((prevData) => prevData.filter((data) => data._id !== _id));
//     } catch (error) {
//       console.error('Error to Delete Claim', error);
//     }
//   };

  const exportToExcel = () => {
    try {
      const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const fileExtension = '.xlsx';
      const fileName = `${new Date().toLocaleDateString()}`;

      // Include all sorted data
      const rowsToInclude = filteredData.map(data => [
        data.sNo,
        data.date,
        data.companyName,
        data.claimType,
        data.policyNo,
        data.insuredName,
        data.contactNo,
        data.vehicleRegNo,
        data.vehicleType,
        data.policyExpiryDate,
        data.intimationDate,
        data.claimNo,
        data.advisor,
        data.branch,
        data.claimStatus,
        data.claimAmount,
        data.surveyorName,
        data.surveyorContactNo,
        data.remarks,
      ]);

      // Create worksheet
      const ws = XLSX.utils.aoa_to_sheet([[
        "SNo.",
        "Date",
        "Company",
        "Claim Type",
        "Policy No.",
        "Insured Name",
        "Contact No.",
        "Vehicle Reg No.",
        "Vehicle Type",
        "Policy Exp. Date",
        "Intimation Date",
        "Claim No.",
        "Advisor Name",
        "Branch",
        "Claim Status",
        "Claim Amount",
        "Surveyor Name",
        "Surveyor Cont. No.",
        "Remarks",

      ], ...rowsToInclude]);

      // Create workbook and export
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, {
        bookType: 'xlsx',
        type: 'array',
      });
      const data = new Blob([excelBuffer], { type: fileType });
      const url = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName + fileExtension);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      toast.error('Error exporting to Excel');
    }
  };



  const handleExportClick = () => {
    exportToExcel();
  };

  return (<>
    <section className="container-fluid relative   sm:ml-48 bg-slate-100">
      <div className="container-fluid flex justify-center px-1  border-gray-200 border-dashed rounded-lg dark:border-gray-700  bg-slate-100">
        {/* <div className="sm:-mx-6 lg:-mx-8"> */}
        <div className="inline-block min-w-full mt-1">
          <div className="mb-2 flex justify-between text-blue-500">
            <h1></h1>
            <h1 className="text-2xl my-auto font-semibold text-blue-700 uppercase">Claim Lists</h1>
            <span className="flex justify-end ">
              <button className="" onClick={handleExportClick}><img src="/excel.png" alt="download" className="w-10 mr-2" /></button>
              <NavLink to="/branches/home/" className="my-auto text-red-700">
                <button type="button" className="text-white  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded text-sm px-2 py-1 text-center">Go Back</button>
              </NavLink>
            </span>
          </div>

          <div className="my-2 flex flex-wrap justify-between text-blue-700">
          <div className="flex flex-col  p-2 text-start sm:w-44 lg:w-44 w-1/3">
                            <label htmlFor='policyExpiryDate' className="text-base font-medium mx-1 ">PE-Date:</label>
                            <input id='policyExpiryDate' className="input-style p-1  rounded" type="search" name="policyExpiryDate" onChange={(e) => setPEID(e.target.value)} placeholder="Policy Expiry Date" required />
                        </div>
          <div className="flex flex-col  p-2 text-start sm:w-44 lg:w-44 w-1/3">
              <label htmlFor='Company' className="text-base font-medium mx-1 ">Company:</label>
              <input id='Company' className="input-style p-1  rounded" name="Company"  type="search"
                  onChange={(e) => setComp(e.target.value)} placeholder="Company Name" required />
            </div>
            <div className="flex flex-col  p-2 text-start sm:w-44 lg:w-44 w-1/3">
              <label htmlFor='insuredName' className="text-base font-medium mx-1 ">Insured:</label>
              <input id='insuredName' className="input-style p-1  rounded" type="search" name="insuredName" onChange={(e) => setIns(e.target.value)} placeholder="Insured Name" required />
            </div>
            <div className="flex flex-col  p-2 text-start sm:w-44 lg:w-44 w-1/3">
              <label htmlFor='vehicleRegNo' className="text-base font-medium mx-1 ">Veh. Reg. No.:</label>
              <input id='vehicleRegNo' className="input-style p-1  rounded" type="search" name="vehicleRegNo" onChange={(e) => setVeh(e.target.value)} placeholder="Vehicle Reg No" required />
            </div>
            <div className="flex flex-col  p-2 text-start sm:w-44 lg:w-44 w-1/3">
              <label htmlFor='surveyorName' className="text-base font-medium mx-1 ">Surveyor:</label>
              <input id='surveyorName' className="input-style p-1  rounded" type="search" name="surveyorName" onChange={(e) => setSurvy(e.target.value)} placeholder="Surveyor Name" required />
            </div>

            <div className="flex flex-col  p-2 text-start sm:w-44 lg:w-44 w-1/3">
              <label htmlFor='advisor' className="text-base font-medium mx-1 ">Advisor:</label>
              <input id='advisor' className="input-style p-1  rounded" type="search" name="advisor" onChange={(e) => setAdvs(e.target.value)} placeholder="Advisor Name" required />
            </div>

            <div className="flex flex-col  p-2 text-start sm:w-44 lg:w-44 w-1/3">
              <label htmlFor='vehicleType' className="text-base font-medium mx-1 ">Vehicle:</label>
              <input id='vehicleType' className="input-style p-1  rounded" type="search" name="branch" onChange={(e) => setVehicleType(e.target.value)} placeholder="Vehicle Type" required />
            </div>
           
            </div>
          <div className="inline-block min-w-full w-full py-0 overflow-x-auto">
            <table className="min-w-full text-center text-sm font-light table">
              {filteredData.length <= 0 ? ( // Conditional rendering when there are no policies
                <TextLoader />
              ) : (<>
                <thead className="border-b font-medium bg-slate-300 sticky top-0">
                  <tr className="text-blue-700 sticky top-0">
                    {/* <th scope="col" className="px-1 border border-black sticky">
                      Update
                    </th> */}
                    <th scope="col" className="px-1 border border-black sticky">
                      Sr. No.
                    </th>
                    <th scope="col" className="px-1 border border-black sticky">
                      Date
                    </th>
                    <th scope="col" className="px-1 border border-black sticky">
                      Company
                    </th>
                    <th scope="col" className="px-1 border border-black sticky">
                      Claim Type
                    </th>
                    <th scope="col" className="px-1 border border-black sticky">
                      Policy No.
                    </th>
                    <th scope="col" className="px-1 border border-black sticky">
                      Insured Name
                    </th>
                    <th scope="col" className="px-1 border border-black sticky">
                      Contact No.
                    </th>
                    <th scope="col" className="px-1 border border-black sticky">
                      Vehicle Reg No.
                    </th>
                    <th scope="col" className="px-1 border border-black sticky">
                      Vehicle Type
                    </th>
                    <th scope="col" className="px-1 border border-black sticky">
                      Policy Exp. Date
                    </th>
                    <th scope="col" className="px-1 border border-black sticky">
                      Intimation Date
                    </th>
                    <th scope="col" className="px-1 border border-black sticky">
                      Claim No.
                    </th>
                    <th scope="col" className="px-1 border border-black sticky">
                      Advisor Name
                    </th>
                    <th scope="col" className="px-1 border border-black sticky">
                      Branch
                    </th>
                    <th scope="col" className="px-1 border border-black sticky">
                      Claim Status
                    </th>
                    <th scope="col" className="px-1 border border-black sticky">
                      Claim Amount
                    </th>
                    <th scope="col" className="px-1 border border-black sticky">
                      Surveyor Name
                    </th>
                    <th scope="col" className="px-1 border border-black sticky">
                      Surveyor Cont. No.
                    </th>
                    <th scope="col" className="px-1 border border-black sticky">
                      Remarks
                    </th>
                    {/* <th scope="col" className="px-1 border border-black sticky">
                      Delete
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((data) => {
                    return (
                      <tr
                        className="border-b dark:border-neutral-200 text-sm font-medium hover:bg-orange-100"
                        key={data._id}>
                        {/* <td className="whitespace-nowrap px-1 border border-black">
                          <button onClick={() => handleUpdateClick(data)} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-0 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded text-sm px-2 py-1 my-0.5 mx-0.5 text-center">
                            Update
                          </button>
                        </td> */}
                        <td className="whitespace-nowrap px-1 border border-black">
                          {data.sNo}
                        </td>
                        <td className="whitespace-nowrap px-1 border border-black">
                          {data.date}
                        </td>
                        <td className="whitespace-nowrap px-1 border border-black">
                          {data.companyName}
                        </td>
                        <td className="whitespace-nowrap px-1 border border-black">
                          {data.claimType}
                        </td>
                        <td className="whitespace-nowrap px-1 border border-black">
                          {data.policyNo}
                        </td>
                        <td className="whitespace-nowrap px-1 border border-black">
                          {data.insuredName}
                        </td>
                        <td className="hitespace-nowrap px-1 border border-black">
                          {data.contactNo}
                        </td>
                        <td className="whitespace-nowrap px-1 border border-black">
                          {data.vehicleRegNo}
                        </td>
                        <td className="whitespace-nowrap px-1 border border-black">
                          {data.vehicleType}
                        </td>
                        <td className="whitespace-nowrap px-1 border border-black">
                          {data.policyExpiryDate}
                        </td>
                        <td className="whitespace-nowrap px-1 border border-black">
                          {data.intimationDate}
                        </td>
                        <td className="whitespace-nowrap px-1 border border-black">
                          {data.claimNo}
                        </td>
                        <td className="whitespace-nowrap px-1 border border-black">
                          {data.advisor}
                        </td>
                        <td className="whitespace-nowrap px-1 border border-black">
                          {data.branch}
                        </td>
                        <td className="whitespace-nowrap px-1 border border-black">
                          {data.claimStatus}
                        </td>
                        <td className="whitespace-nowrap px-1 border border-black">
                          {data.claimAmount}
                        </td>
                        <td className="hitespace-nowrap px-1 border border-black">
                          {data.surveyorName}
                        </td>
                        <td className="whitespace-nowrap px-1 border border-black">
                          {data.surveyorContactNo}
                        </td>
                        <td className="whitespace-nowrap px-1 border border-black">
                          {data.remarks}
                        </td>
                        {/* <td className="whitespace-nowrap px-1 border border-black">
                          <button type="button" onClick={() => deleteStaff(data._id)} className="text-white bg-gradient-to-r from-red-600 via-red-600 to-red-600 hover:bg-red-700 focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded text-sm px-2 py-1 text-center my-1">Delete</button>
                        </td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </>)}
            </table>
          </div>
        </div>
      </div>
      {/* {deletingStaffId && (
        <div id="popup-modal" tabIndex="-1" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg ">
            <h2 className="text-lg font-semibold text-gray-800">{`Are you sure you want to delete `}
              <span className="text-red-600">{claimData.find((data) => data._id === deletingStaffId)?.insuredName}</span>
              {`?`}</h2>
            <div className="flex justify-end mt-10">
              <button onClick={() => { deleteClaims(deletingStaffId); setDeletingStaffId(null) }} className="text-white bg-red-600 hover:bg-red-800 focus:ring-0 focus:outline-none focus:ring-red-300  font-medium rounded text-sm px-2 py-1 mr-2">
                Yes, I&apos;m sure
              </button>
              <button onClick={() => setDeletingStaffId(null)} className="text-gray-100 bg-slate-400 hover:bg-gray-400 focus:ring-1 focus:outline-none focus:ring-gray-500 rounded border border-gray-800 text-sm font-medium px-2 py-1 hover:text-gray-900 focus:z-10 ">
                No, cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showUpdatePopup && selectedItem && (
                <ClaimUpdate data={selectedItem} update = {onUpdateClaims}  onClose={handleClosePopup} />
            )} */}
    </section>
  </>

  )
}
export default BranchClaimList