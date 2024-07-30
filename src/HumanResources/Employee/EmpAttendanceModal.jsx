/* eslint-disable react/prop-types */
import { useState } from "react";
import { CgCloseR } from "react-icons/cg";

function EmpAttendanceModal({emp}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // OPEN MODAL
  const openModal = () => {
    setIsModalOpen(true);
  };

  // CLOSE MODAL
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={openModal}
        type="button"
        className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-base px-3 py-1 text-center "
      >
        View
      </button>

      {isModalOpen && (
        <div
          id="static-modal"
          data-modal-backdrop="static"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 bottom-0 inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
        >
          {/* <div className={` fixed top-0 left-0 z-80 w-full h-full overflow-x-hidden overflow-y-auto`}> */}
            <div className="relative p-4 w-full max-w-9xl max-h-7xl mx-auto my-20 backdrop-blur-lg">
              <div className="flex flex-col bg-slate-200 border shadow-sm rounded-xl pointer-events-auto ">
                <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">

                  <div className="flex justify-between flex-col items-center py-3 px-4  dark:border-gray-700">
                  <h3 className="font-medium text-base text-gray-800 ">View Attendance</h3>
                  <p className="font-medium text-base text-gray-800 ">Total Days:</p>
                  <p className="font-medium text-base text-gray-800 ">Present Days:</p>
                  <p className="font-medium text-base text-gray-800 ">Absent Days:</p>
                  </div>
                  <button
                    onClick={closeModal}
                    type="button"
                    className=" bg-transparent hover:text-red-500 text-slate-500  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  >
                    <CgCloseR size={25} />
                  </button>
                </div>
                <div className="p-4 overflow-y-auto">
                  { <table className="min-w-full text-center text-sm font-light ">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr className="text-blue-700">
                                    <th scope="col" className="px-5 py-4">
                                    Employee Name
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                    WeekDay
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                    Time
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                    Date
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                    Status
                                    </th>
                                   
                                </tr>
                            </thead>
                            <tbody>
                                {emp.map((data) => {
                                    
                                    return (
                                        <tr
                                            className="border-b dark:border-neutral-200 text-sm font-medium"
                                            key={data._id}
                                        >
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.empname}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.weekday}
                                            </td>
                                            <td className="whitespace-wrap px-4 py-4">
                                                {data.time}
                                            </td>
                                            <td className="whitespace-wrap px-4 py-4">
                                                {data.date}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.status}
                                            </td>
                                           
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
}
                </div>
              
              </div>
            </div>
          {/* </div> */}
        </div>
      )}
    </>
  );
}

export default EmpAttendanceModal;
