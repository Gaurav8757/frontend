import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import TextLoader from '../../loader/TextLoader.jsx';
import VITE_DATA from "../../config/config.jsx";
function ListOfLeave() {
    const employeeId = sessionStorage.getItem('employeeId');
    const [APIData, setAPIData] = useState([]);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Not Authorized yet.. Try again! ");
        } else {
            // Fetch leave types
            axios
                .get(`${VITE_DATA}/api/employee/${employeeId}`, {
                    headers: {
                        Authorization: `${token}`, // Send the token in the Authorization header
                    },
                })
                .then((response) => {
                    setAPIData(response.data.leaveDetails);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [employeeId]);

    return (
        <section className="container-fluid relative p-0 sm:ml-48 bg-orange-50">
            <div className="container-fluid items-center pt-2 px-2 border-gray-200 border-dashed rounded bg-orange-100">
                <h1 className='text-xl xl:text-2xl lg:text-2xl tracking-wide py-2  text-center uppercase font-medium text-orange-700'>Leave History</h1>
                {APIData.length === 0 ? (<TextLoader />):(<> {APIData.map((data, index) => (
                    <div key={index} className="w-full max-w-auto p-4 mb-5 text-gray-900 bg-orange-600 rounded shadow-2xl shadow-yellow-700 bg-blend-saturation">
                        <div className="flex  items-center justify-between ">
                            <div className="flex items-center text-white bg-[#050708]/20  focus:ring-[#050708]/20 text-xs lg:text-sm sm:text-xs rounded px-2 py-1 text-center">
                                <span className="  font-semibold text-black me-2">Applied Date: </span>
                                <span className=" font-semibold  text-gray-50">{data.applyDate}</span>
                            </div>
                            <div className="flex items-center text-white bg-[#050708]/20  focus:ring-[#050708]/20 text-xs lg:text-sm sm:text-xs rounded px-2 py-1 text-center">
                                <span className="font-semibold  text-black me-2">Applied Time:</span>
                                <span className="font-semibold text-gray-50">{data.applytime}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-7 gap-6 mt-4">

                            <div className="flex flex-col items-center">
                                <span className="mb-2 text-xs xl:text-xl lg:text-sm sm:text-xs font-semibold text-gray-50">From</span>
                                <span className="text-xs xl:text-xl lg:text-sm sm:text-xs font-semibold text-black">{data.dateRange.startDate}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="mb-2 text-xs xl:text-xl lg:text-sm sm:text-xs font-semibold text-gray-50">To</span>
                                <span className="text-xs xl:text-xl lg:text-sm sm:text-xs font-semibold text-black">{data.dateRange.endDate}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="mb-2 text-xs xl:text-xl lg:text-sm sm:text-xs whitespace-nowrap font-semibold text-gray-50">Leave Type</span>
                                <span className="text-xs xl:text-xl lg:text-sm sm:text-xs font-semibold text-black">{data.leavetype}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="mb-2 text-xs xl:text-xl lg:text-sm sm:text-xs whitespace-nowrap font-semibold text-gray-50">No. of Days</span>
                                <span className="text-xs xl:text-xl lg:text-sm sm:text-xs font-semibold text-black">{data.counts}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="mb-2 text-xs xl:text-xl lg:text-sm sm:text-xs font-semibold text-gray-50">Reason</span>
                                <span className="text-xs xl:text-xl lg:text-sm sm:text-xs font-semibold text-black">{data.reasonForLeave}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="mb-2 text-xs xl:text-xl lg:text-sm sm:text-xs font-semibold text-gray-50">Remarks</span>
                                <span className="text-xs xl:text-xl lg:text-sm sm:text-xs font-semibold text-black">{data.remarks}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="mb-2 text-xs xl:text-xl lg:text-sm sm:text-sm font-semibold text-gray-50">Status</span>
                                <span className={`text-xs xl:text-xl lg:text-sm sm:text-xs rounded font-semibold ${data.status === 'approved' ? 'bg-green-500  text-white px-2 py-1 bg-[green]/100  focus:ring-[#050708]/20' : data.status === 'rejected' ? ' text-white px-2 py-1 bg-[maroon]/100  focus:ring-[#050708]/20' : 'text-black'}`}>{data.status}</span>
                            </div>
                        </div>
                    </div>
                ))}  </> )}
            </div>
            
        </section>
    );
}

export default ListOfLeave;