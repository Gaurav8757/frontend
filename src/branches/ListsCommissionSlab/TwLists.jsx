import { useState, useEffect } from "react";
import axios from 'axios';
import TextLoader from "../../loader/TextLoader.jsx";
import TwUpdateSlab from "../UpdatePaySlabs/TwUpdateSlab.jsx";
import * as XLSX from 'xlsx';
import { toast } from "react-toastify";
import VITE_DATA from "../../config/config.jsx";

function TwLists() {
  const [APIData, setAPIData] = useState([]);
  const [deletingStaffId, setDeletingStaffId] = useState(null);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [searchCompany, setSearchCompany] = useState("");
  const [ pCodes, setPcodes] = useState("");
  const [ ptypes, setPtypes] = useState("");
  const [advs, setAdv] = useState("");
  const deleteStaff = (_id) => {
    setDeletingStaffId(_id);
  };
 
  const handleUpdateClick = (id) => {
    setSelectedRowId(id);
    setShowUpdatePopup(true);
  };

  const handleClosePopup = () => {
    setSelectedRowId(null);
    setShowUpdatePopup(false);
  };
  
 

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Not Authorized yet.. Try again! ");
    } else {
      // The user is authenticated, so you can make your API request here.
      axios
        .get(`${VITE_DATA}/company/grid/slab/view`, {
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


  const updateSlabs = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        toast.error("Not Authorized yet.. Try again!");
      } else {
        const response = await axios.get(
          `${VITE_DATA}/company/grid/slab/view`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setAPIData(response.data);
      }
    } catch (error) {
      console.error("Error fetching updated insurance data:", error);
    }
  };

  const filteredData = APIData.filter(data => {
    // Check if data is defined
    if (!data) return false;
    // Filter conditions
    const idLower = data.pcodes?.toLowerCase() || "";
    const companyLower = data.cnames?.toLowerCase() || "";
    const adv = data.vfuels?.toLowerCase( ) || "";
    const ptype = data.policytypes?.toLowerCase() || "";
    return (
      (adv.includes(advs.toLowerCase()) || advs === "") &&
      (ptype.includes(ptypes.toLowerCase()) || ptypes === "") &&
      (idLower.includes(pCodes.toLowerCase()) || pCodes === '') &&
      (companyLower.includes(searchCompany.toLowerCase()) || searchCompany === '') 
    );
  });

  const exportToExcel = () => {
    try {
      const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";
      const fileName = `Admin_Payout_Lists`;
  
      // Map all data without filtering by current date
      const dataToExport = filteredData.map(row => {
        return [
          row.cnames, // "Company Name"
          row.catnames, // "Category Name"
          row.advisorName, // "Advisor Name"
          row.states, // "State"
          row.districts, // "District"
          row.segments, // "Segment"
          row.sitcapacity, // "Seating Capacity"
          row.vehicleAge, // "Vehicle Age"
          row.policytypes, // "Policy Type"
          row.pcodes, // "Product Code"
          row.vfuels, // "Fuel Type"
          row.vncb, // "NCB"
          row.voddiscount, // "OD Discount(%)"
          row.vcc, // "C.C"
          row.payoutons, // "Payout On"
          row.cvpercentage, // "Advisor Percentage%"
          row.branchpayoutper, // "Branch Percentage%"
          row.companypayoutper // "Company Percentage%"
        ];
      });
  
      // Get all table headers in the same order
      const tableHeaders = [
        "Company Name", // corresponds to row.company
        "Category Name", // corresponds to row.category
        "Advisor Name", // corresponds to row.advisorName
        "State", // corresponds to row.states
        "District", // corresponds to row.district
        "Segment", // corresponds to row.segment
        "Seating Capacity", // corresponds to row.sitcapacity
        "Vehicle Age", // corresponds to row.vehicleAge
        "Policy Type", // corresponds to row.policyType
        "Product Code", // corresponds to row.productCode
        "Fuel Type", // corresponds to row.fuel
        "NCB", // corresponds to row.ncb
        "OD Discount(%)", // corresponds to row.odDiscount
        "C.C", // corresponds to row.cc
        "Payout On", // corresponds to row.payoutOn
        "Advisor Percentage%", // corresponds to row.advisorpercentage
        "Branch Percentage%", // corresponds to row.branchpayoutper
        "Company Percentage%" // corresponds to row.companypayoutper
      ];
      
      // Create worksheet
      const ws = XLSX.utils.aoa_to_sheet([tableHeaders, ...dataToExport]);
      // Create workbook and export
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, {
        bookType: "xlsx",
        type: "array",
      });
      const data = new Blob([excelBuffer], { type: fileType });
      const url = URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName + fileExtension);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      toast.error("Error exporting to Excel");
    }
  };
  
  const handleExportClick = () => {
    exportToExcel();
    // exportToPDF();
  };

  const confirmDeleteVeh = async (_id) => {
    try {
      await axios.delete(`${VITE_DATA}/company/grid/slab/del/${_id}`);
      toast.error("Payout Grid Deleted Successfully.....!", { theme: "dark", position: "top-right" });
      setAPIData((prevData) => prevData.filter((data) => data._id !== _id));
    } catch (error) {
      console.error('Error Deleting Slabs', error);
    }
  };

  return (
    <section className="container-fluid relative flex flex-wrap p-0 sm:ml-48 bg-slate-200">
      <div className="container-fluid  p-2  w-full sm:w-full md:w-full lg:w-full xl:w-full border-dashed rounded-lg  bg-slate-200">
        <div className=" flex justify-between text-red-700">
          <h1 className="flex "></h1>
          <span className="  text-center my-1 mt-2 text-3xl font-semibold">Payout Grid&apos;s</span>
          <button className="text-end    text-3xl font-semibold " onClick={handleExportClick}><img src="/excel.png" alt="download" className="w-10 my-2" /></button>
        </div>
        <div className="flex-wrap flex justify-between  text-blue-500  ">
          
            <div className="p-0 text-center mt-3 justify-start w-1/2 lg:w-1/4">
              <label className="my-0 text-lg font-medium text-gray-900">Company:</label>
              <input
                type="search"
                onChange={(e) => setSearchCompany(e.target.value)}
                className="shadow input-style w-52 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                placeholder="Company Name"
              />
            </div>
            <div className=" p-0 text-center mt-3 justify-start w-1/2 lg:w-1/4">
              <label className="my-0 text-lg font-medium text-gray-900">Policy Type:</label>
              <input
                type="search"
                onChange={(e) => setPtypes(e.target.value)}
                className="shadow p-0 text-start w-52 lg:w-1/2 input-style  my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                placeholder="Policy Type"
              /></div>
            <div className=" p-0 text-center mt-3 justify-start w-1/2 lg:w-1/4">
              <label className="my-0 text-lg font-medium text-gray-900">Product Code:</label>
              <input
                type="search"
                onChange={(e) => setPcodes(e.target.value)}
                className="shadow p-0 text-start w-52 lg:w-1/2 input-style  my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                placeholder="Product Code"
              /></div>

               <div className=" p-0 text-center mt-3 justify-start w-1/2 lg:w-1/4">
              <label className="my-0 text-lg whitespace-nowrap font-medium text-gray-900">
                Fuel:
              </label>
              <input
                type="search"
                onChange={(e) => setAdv(e.target.value)}
                className="shadow p-0 text-start  lg:w-1/2 input-style  my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                placeholder="Search by Fuel"
              />
            </div>
            
          </div>
      </div>
      <table className="min-w-full text-center text-xs font-light table bg-slate-200 ">
      {filteredData.length === 0 ? (<TextLoader />):(<>
        <thead className="border-b  font-medium bg-slate-200  sticky top-16">
          <tr className="text-blue-700 sticky top-16">
          <th scope="col" className="px-0 py-0 border border-black">
               Update
            </th>
            <th scope="col" className="px-1 py-0 border border-black">
              Company Name
            </th>
            <th scope="col" className="px-1 py-0 border border-black sticky">
              Category Name
            </th>
            {/* <th scope="col" className="px-1 pt-2 sticky border border-black">
              Advisor Name
            </th> */}
            <th scope="col" className="px-1 pt-2 sticky border border-black">
              State
            </th>
            <th scope="col" className="px-1 pt-2 sticky border border-black">
              District
            </th>
            <th scope="col" className="px-1 py-0 border border-black sticky">
              Segment
            </th>
            <th scope="col" className="px-1 py-0 border border-black sticky">
              Seating Capacity
            </th>
            <th scope="col" className="px-1 py-0 border border-black sticky">
              Vehicle Age
            </th>
            <th scope="col" className="px-1 py-0 border border-black sticky">
              Policy Type
            </th>
            <th scope="col" className="px-1 py-0 border border-black sticky">
              Product Code
            </th>
            <th scope="col" className="px-1 py-0 border border-black sticky">
              Fuel Type
            </th>
            <th scope="col" className="px-1 py-0 border border-black sticky">
              NCB
            </th>
            <th scope="col" className="px-1 py-0 border border-black sticky">
              OD Discount
            </th>
            <th scope="col" className="px-1 py-0 border border-black sticky">
              CC
            </th>
            <th scope="col" className="px-1 py-0 border border-black sticky">
              PayoutOn
            </th>
            {/* <th scope="col" className="px-1 py-0 border border-black sticky">
              Advisor Percentage%
            </th> */}
            <th scope="col" className="px-1 py-0 border border-black sticky">
              Branch Percentage%
            </th>
            <th scope="col" className="px-1 py-0 border border-black sticky">
              Company Percentage%
            </th>
            <th scope="col" className="px-1 py-0 border border-black sticky">
              Delete
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 overflow-y-hidden">
          {filteredData.reverse().map((data) => {
            if (data) {
              return (
                <tr className=":border-neutral-200 text-sm font-medium hover:bg-orange-100 " key={data._id}>
                  <td className="px-0 py-0 border border-black">
                      <button onClick={() => handleUpdateClick(data)} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded text-sm px-2 py-1 my-0.5 mx-0.5 text-center ">
        Update
      </button> 
               
                    </td>
                  <td className="px-1 py-0 whitespace-nowrap border border-black">{data.cnames}</td>
                  <td className="px-1 py-0 border border-black">{data.catnames}</td>
                  {/* <td className="px-1 py-0 border border-black">{data.advisorName}</td> */}
                  <td className="px-1 py-0 border border-black">{data.states}</td>
                  <td className="px-1 py-0 border border-black">
                  <div className="max-h-10 overflow-hidden">
                      {Array.isArray(data.districts) ? (
                        data.districts.length <= 3 ? (
                          data.districts.join(", ")
                        ) : (
                          <div className="max-h-10 overflow-y-auto cursor-pointer">
                            {data.districts.map((district, index) => (
                              <div key={index} className="whitespace-nowrap overflow-hidden text-ellipsis py-2">
                                {district}
                              </div>
                            ))}
                          </div>
                        )
                      ) : (
                        data.districts
                      )}
                    </div>
                  </td>
                  
                  <td className="px-1 py-0 border border-black">{data.segments}</td>
                  <td className="px-1 py-0 border border-black">{data.sitcapacity}</td>
                  <td className="px-1 py-0 border border-black">{data.vage}</td>
                  <td className="px-1 py-0 whitespace-nowrap border border-black">{data.policytypes}</td>
                  <td className="px-1 py-0 border border-black">{data.pcodes}</td>
                  <td className="px-1 py-0 border border-black">{data.vfuels}</td>
                  <td className="px-1 py-0 border border-black">{data.vncb}</td>
                  <td className="px-1 py-0 border border-black">{data.voddiscount}</td>
                  <td className="px-1 py-0 border border-black">{data.vcc}</td>
                  {/* <td className="px-1 py-0 border border-black">{data.voddiscount}</td> */}
                  <td className="px-1 py-0 border border-black">{data.payoutons}</td>
                  {/* <td className="px-1 py-0 border border-black">{data.cvpercentage}</td> */}
                  <td className="px-1 py-0 border border-black">{data.branchpayoutper}</td>
                  <td className="px-1 py-0 border border-black">{data.companypayoutper}</td>
                  <td className="px-1 py-0 border border-black">
                    <button type="button" onClick={() => deleteStaff(data._id)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded text-sm px-2 py-1 text-center ">Delete</button>
                  </td>
                </tr>
              );
            } else {
              return null; // Return nothing if vehicleSlab is not 'CV-Slab'
            }
          })}
          
        </tbody>
        </> )}
        {showUpdatePopup && selectedRowId && (
                  <TwUpdateSlab slab={selectedRowId} update = {updateSlabs} onClose={handleClosePopup} />
                )}
        {deletingStaffId && (
        <div id="popup-modal" tabIndex="-1" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg ">
            <h2 className="text-lg font-semibold text-gray-800">{`Are you sure you want to delete `}
              <span className="text-red-600">{APIData.find(data => data._id === deleteStaff)?.staffType}</span>
              {`?`}</h2>
            <div className="flex justify-end mt-10">
              <button onClick={() => { confirmDeleteVeh(deletingStaffId); setDeletingStaffId(null) }} className="text-white bg-red-600 hover:bg-red-800 focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded text-sm px-4 py-2 mr-2">
                Yes, I&apos;m sure
              </button>
              <button onClick={() => setDeletingStaffId(null)} className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-1 focus:outline-none focus:ring-gray-200 rounded border border-gray-200 text-sm font-medium px-4 py-2 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                No, cancel
              </button>
            </div>
          </div>
        </div>
      )}
      </table>

    </section>
  )
}





export default TwLists;