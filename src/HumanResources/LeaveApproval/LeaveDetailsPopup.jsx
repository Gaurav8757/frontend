/* eslint-disable react/prop-types */
import { useState } from "react";
import { CgCloseR } from "react-icons/cg";
import axios from 'axios';
import { toast } from "react-toastify";
import VITE_DATA from "../../config/config.jsx";

const LeaveDetailsPopup = ({ emp, onUpdate }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLeave, setSelectedLeave] = useState(null);
    const [statusUpdatedMap, setStatusUpdatedMap] = useState({});
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleStatusChange = (event, leave) => {
        const newStatus = event.target.value;
        setSelectedLeave({ ...leave, status: newStatus });
    };

    const handleSubmit = async () => {
        try {
            if (selectedLeave && !statusUpdatedMap[selectedLeave._id]) {
                const { _id, status } = selectedLeave;
             const resp =   await axios.put(`${VITE_DATA}/employee/${emp._id}/leave/${_id}`, { status });

                onUpdate(); // Update leave details after submission
                setStatusUpdatedMap(prevState => ({ ...prevState, [selectedLeave._id]: true })); // Set status updated to true for this leave item
                toast.success(`${resp.data.message}`)
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    return (
        <>
            <button
                onClick={openModal}
                type="button"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-base px-3 py-2 text-center">
                All Leave Requests
            </button>

            {isModalOpen && (
                <div
                    id="static-modal"
                    data-modal-backdrop="static"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed top-0 right-0 left-0 bottom-0 inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
                >
                    <div className="relative p-4 w-full max-w-7xl max-h-5xl mx-auto my-20">
                        <div className="relative bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-lg shadow ">
                            <div className="flex items-center justify-between p-2 md:p-3 rounded-lg dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-100">
                                    Update Leave Status
                                </h3>
                                <button
                                    onClick={closeModal}
                                    type="button"
                                    className="bg-transparent hover:text-red-500 text-slate-50 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                >
                                    <CgCloseR size={25} />
                                </button>
                            </div>

                            {/* <div className="p-2 rounded-lg">
    {emp.leaveDetails && emp.leaveDetails.length > 0 ? (
        <>
            <div className="flex justify-between px-8 my-1">
                <span><strong>Start Date</strong></span>
                <span><strong>End Date</strong></span>
                <span><strong>No of Days</strong></span>
                <span><strong>Reason for Leave</strong></span>
                <span><strong>Status</strong></span>
                <span><strong>Actions</strong></span>
            </div>
            {emp.leaveDetails.slice().reverse().map((leave) => (
                <div key={leave._id} className="flex bg-slate-100 text-black justify-between shadow-2xl rounded-md p-4 my-2">
                    <span className="text-start">{leave.dateRange.startDate}</span>
                    <span className="text-start">{leave.dateRange.endDate}</span>
                    <span className="text-start">{leave.counts}</span>
                    <span className="text-start">{leave.reasonForLeave}</span>
                    <span className={`status mr-12 text-start ${leave.status === 'pending' ? 'bg-slate-300 rounded-xl my-auto px-2 py-0' : leave.status === 'approved' ? 'bg-green-200 text-green-700 my-auto rounded-xl px-2 py-0' : 'bg-red-200 text-red-900 my-auto py-0 rounded-xl px-2'}`}>{leave.status}</span>


                    <span className="text-start">
                    <select name="status" className="w-32" value={selectedLeave && selectedLeave._id === leave._id ? selectedLeave.status : leave.status} onChange={(event) => handleStatusChange(event, leave)}>
                        <option value="">---- Select Status -----</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                    <button className="bg-blue-500 text-white px-1.5 py-0.4  " onClick={handleSubmit}>Submit</button>
                    </span>
                </div>
            ))}
        </>
    ) : (
        <p className="text-center text-3xl text-gray-100 font-bold ">No leave details available</p>
    )}
</div> */}


<div className="p-2 rounded-lg">
    {emp.leaveDetails && emp.leaveDetails.length > 0 ? (
        <table className="w-full">
            <thead>
                <tr className="">
                    <th className="px-8 py-4">Start Date</th>
                    <th className="px-8 py-4">End Date</th>
                    <th className="px-8 py-4">No of Days</th>
                    <th className="px-8 py-4">Reason for Leave</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4">Actions</th>
                </tr>
            </thead>
            <tbody>
                {emp.leaveDetails.slice().reverse().map((leave) => (
                    <tr key={leave._id} className="bg-slate-100 text-black">
                        <td className="px-8 py-4">{leave.dateRange.startDate}</td>
                        <td className="px-8 py-4">{leave.dateRange.endDate}</td>
                        <td className="px-8 py-4">{leave.counts}</td>
                        <td className="px-8 py-4">{leave.reasonForLeave}</td>
                        <td className="px-8 py-4"><span className={`status mr-12 text-start ${leave.status === 'pending' ? 'bg-slate-300 rounded-xl my-auto px-2 py-1' : leave.status === 'approved' ? 'bg-green-200 text-green-700 my-auto rounded-xl px-2 py-1' : 'bg-red-200 text-red-900 my-auto py-1 rounded-xl px-2'}`}>{leave.status}</span></td>
                        <td className="px-8 py-4">
                            <select name="status" className="w-32 rounded-l-md px-2 py-0.5 cursor-pointer" value={selectedLeave && selectedLeave._id === leave._id ? selectedLeave.status : leave.status} onChange={(event) => handleStatusChange(event, leave)} disabled={statusUpdatedMap[leave._id]}>
                                <option value="">---- Select Status -----</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                            {/* <button className="bg-blue-500 text-white px-2 py-1  rounded-r-md" onClick={handleSubmit}>Submit</button> */}
                            {!statusUpdatedMap[leave._id] && ( // Render submit button if status is not updated for this leave item
                                                            <button className="bg-blue-500 text-white px-2 py-1  rounded-r-md" onClick={() => handleSubmit(leave)}>Submit</button>
                                                        )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    ) : (
        <p className="text-center text-3xl text-gray-100 font-bold">No leave details available</p>
    )}
</div>


                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LeaveDetailsPopup;
