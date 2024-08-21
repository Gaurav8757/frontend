import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import * as XLSX from 'xlsx';
import TextLoader from '../../loader/TextLoader.jsx';
import VITE_DATA from '../../config/config.jsx';
function BranchCancelation() {
    const [cancelData, setCancelData] = useState([]);
    const [comp, setComp] = useState("");
    const [ins, setIns] = useState("");
    const [regnos, setReg] = useState("");
    const [trNeftNo, setUtrNeftNo] = useState("");
    const [advs, setAdvs] = useState("");
    const [pid, setPID] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = sessionStorage.getItem("token");
                const branch = sessionStorage.getItem('name');
                if (!token) {
                    toast.error("Not Authorized yet.. Try again! ");
                    return;
                }
                const response = await axios.get(`${VITE_DATA}/cancled/view/${branch}`, {
                    headers: {
                        Authorization: `${token}`,
                    },
                });
                setCancelData(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);


    const filteredData = cancelData.filter(data => {
        // Check if data is defined
        if (!data) return false;
        // Filter conditions
        const idLower = data.company?.toLowerCase() || "";
        const ptype = data.insuredName?.toLowerCase() || "";
        const regLower = data.regNo?.toLowerCase() || "";
        const utrNeftNo = data.utrNeftNo?.toLowerCase() || "";
        const advisors = data.advisor?.toLowerCase() || "";
        const policyIssueDate = data.policyIssueDate?.toLowerCase() || "";
        return (
            (utrNeftNo.includes(trNeftNo.toLowerCase()) || trNeftNo === "") &&
            (ptype.includes(ins.toLowerCase()) || ins === "") &&
            (idLower.includes(comp.toLowerCase()) || comp === '') &&
            (regLower.includes(regnos.toLowerCase()) || regnos === '') &&
            (advisors.includes(advs.toLowerCase()) || advs === "") &&
            (policyIssueDate.includes(pid.toLowerCase()) || pid === '')
        );
    });



    // const deletecancel = async (_id) => {
    //   try {
    //     const resp = await axios.delete(`${VITE_DATA}/cancled/delete/${_id}`);
    //     toast.error(`${resp.data.message}`, { theme: "dark", position: "top-right" });
    //     setCancelData((prevData) => prevData.filter((data) => data._id !== _id));
    //   } catch (error) {
    //     console.error('Error to Delete Cancelation ', error);
    //   }
    // };

    const exportToExcel = () => {
        try {
            const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            const fileExtension = '.xlsx';
            const fileName = `${new Date().toLocaleDateString()}`;
            // Include all sorted data
            const rowsToInclude = filteredData.map(data => [
                data.sNo,
                data.date,
                data.policyNo,
                data.policyIssueDate,
                data.company,
                data.insuredName,
                data.regNo,
                data.reason,
                data.advisor,
                data.branch,
                data.policyAmount,
                data.status,
                data.refundAmount,
                data.refundDate,
                data.utrNeftNo,
                data.bankName,
                data.paidThrough,
            ]);

            // Create worksheet
            const ws = XLSX.utils.aoa_to_sheet([[
                "S No.",
                "Date",
                "Policy No.",
                "Policy Issue Date",
                "Company",
                "Insured Name",
                "Reg. No.",
                "Reason",
                "Advisor Name",
                "Branch",
                "Policy Amount",
                "Status",
                "Refund Amount",
                "Refund Date",
                "UTR/NEFT No.",
                "Bank Name",
                "Paid Through",

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
                        <h1 className="text-2xl my-auto font-semibold text-blue-700 uppercase">cancellation Lists</h1>
                        <span className="flex justify-end ">
                            <button className="" onClick={handleExportClick}><img src="/excel.png" alt="download" className="w-10 mr-2" /></button>
                            <NavLink to="/branches/home" className="my-auto text-red-700">
                                <button type="button" className="text-white  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded text-sm px-2 py-1 text-center">Go Back</button>
                            </NavLink>
                        </span>
                    </div>
                    <div className="my-2 flex flex-wrap justify-between text-blue-700">
                    <div className="flex flex-col  p-2 text-start sm:w-44 lg:w-44 w-1/3">
                            <label htmlFor='policyIssueDate' className="text-base font-medium mx-1 ">PI-Date:</label>
                            <input id='policyIssueDate' className="input-style p-1  rounded" type="search" name="policyIssueDate" onChange={(e) => setPID(e.target.value)} placeholder="Policy Issue Date" required />
                        </div>
                        <div className="flex flex-col  p-2 text-start sm:w-44 lg:w-44 w-1/3">
                            <label htmlFor='Company' className="text-base font-medium mx-1 ">Company:</label>
                            <input id='Company' className="input-style p-1  rounded" name="Company" type="search"
                                onChange={(e) => setComp(e.target.value)} placeholder="Company Name" required />
                        </div>
                        <div className="flex flex-col  p-2 text-start sm:w-44 lg:w-44 w-1/3">
                            <label htmlFor='insuredName' className="text-base font-medium mx-1 ">Insured:</label>
                            <input id='insuredName' className="input-style p-1  rounded" type="search" name="insuredName" onChange={(e) => setIns(e.target.value)} placeholder="Insured Name" required />
                        </div>
                        <div className="flex flex-col  p-2 text-start sm:w-44 lg:w-44 w-1/3">
                            <label htmlFor='regNo' className="text-base font-medium mx-1 ">Reg. No.:</label>
                            <input id='regNo' className="input-style p-1  rounded" type="search" name="regNo" onChange={(e) => setReg(e.target.value)} placeholder="Reg No" required />
                        </div>
                        <div className="flex flex-col  p-2 text-start sm:w-48 lg:w-48 w-1/3">
                            <label htmlFor='utrNeftNo' className="text-base font-medium mx-1 ">UTR/NEFT:</label>
                            <input id='utrNeftNo' className="input-style p-1  rounded" type="search" name="utrNeftNo" onChange={(e) => setUtrNeftNo(e.target.value)} placeholder="UTR/NEFT No" required />
                        </div>

                        <div className="flex flex-col  p-2 text-start sm:w-44 lg:w-44 w-1/3">
                            <label htmlFor='advisor' className="text-base font-medium mx-1 ">Advisor:</label>
                            <input id='advisor' className="input-style p-1  rounded" type="search" name="advisor" onChange={(e) => setAdvs(e.target.value)} placeholder="Advisor Name" required />
                        </div>

                        

                    </div>
                    <div className="inline-block min-w-full w-full py-0 overflow-x-auto">
                        <table className="min-w-full text-center text-sm font-light table">
                            {filteredData.length <= 0 ? ( // Conditional rendering when there are no policies
                                <TextLoader />
                            ) : (<>
                                <thead className="border-b font-medium bg-slate-300 sticky top-0">
                                    <tr className="text-blue-700 sticky top-0">

                                        <th scope="col" className="px-1 border border-black sticky">
                                            SNo.
                                        </th>
                                        <th scope="col" className="px-1 border border-black sticky">
                                            Date
                                        </th>
                                        <th scope="col" className="px-1 border border-black sticky">
                                            Policy No.
                                        </th>
                                        <th scope="col" className="px-1 border border-black sticky">
                                            Policy Issue Date
                                        </th>
                                        <th scope="col" className="px-1 border border-black sticky">
                                            Company
                                        </th>
                                        <th scope="col" className="px-1 border border-black sticky">
                                            Insured Name
                                        </th>
                                        <th scope="col" className="px-1 border border-black sticky">
                                            Reg. No.
                                        </th>
                                        <th scope="col" className="px-1 border border-black sticky">
                                            Reason
                                        </th>
                                        <th scope="col" className="px-1 border border-black sticky">
                                            Advisor Name
                                        </th>
                                        <th scope="col" className="px-1 border border-black sticky">
                                            Branch
                                        </th>
                                        <th scope="col" className="px-1 border border-black sticky">
                                            Policy Amount
                                        </th>
                                        <th scope="col" className="px-1 border border-black sticky">
                                            Status
                                        </th>
                                        <th scope="col" className="px-1 border border-black sticky">
                                            Refund Amount
                                        </th>
                                        <th scope="col" className="px-1 border border-black sticky">
                                            Refund Date
                                        </th>
                                        <th scope="col" className="px-1 border border-black sticky">
                                            UTR/NEFT No.
                                        </th>
                                        <th scope="col" className="px-1 border border-black sticky">
                                            Bank Name
                                        </th>
                                        <th scope="col" className="px-1 border border-black sticky">
                                            Paid Through
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData?.map((data) => {
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
                                                    {data.policyNo}
                                                </td>
                                                <td className="whitespace-nowrap px-1 border border-black">
                                                    {data.policyIssueDate}
                                                </td>
                                                <td className="whitespace-nowrap px-1 border border-black">
                                                    {data.company}
                                                </td>
                                                <td className="whitespace-nowrap px-1 border border-black">
                                                    {data.insuredName}
                                                </td>
                                                <td className="whitespace-nowrap px-1 border border-black">
                                                    {data.regNo}
                                                </td>
                                                <td className="whitespace-wrap px-1 border border-black">
                                                    {data.reason}
                                                </td>
                                                <td className="whitespace-nowrap px-1 border border-black">
                                                    {data.advisor}
                                                </td>
                                                <td className="whitespace-nowrap px-1 border border-black">
                                                    {data.branch}
                                                </td>
                                                <td className="whitespace-nowrap px-1 border border-black">
                                                    {data.policyAmount}
                                                </td>
                                                <td className="whitespace-nowrap px-1 border border-black">
                                                    {data.status}
                                                </td>
                                                <td className="whitespace-nowrap px-1 border border-black">
                                                    {data.refundAmount}
                                                </td>
                                                <td className="whitespace-nowrap px-1 border border-black">
                                                    {data.refundDate}
                                                </td>
                                                <td className="hitespace-nowrap px-1 border border-black">
                                                    {data.utrNeftNo}
                                                </td>
                                                <td className="whitespace-wrap px-1 border border-black">
                                                    {data.bankName}
                                                </td>
                                                <td className="whitespace-wrap px-1 border border-black">
                                                    {data.paidThrough}
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
                            <span className="text-red-600">{cancelData.find((data) => data._id === deletingStaffId)?.insuredName}</span>
                            {`?`}</h2>
                        <div className="flex justify-end mt-10">
                            <button onClick={() => { deletecancel(deletingStaffId); setDeletingStaffId(null) }} className="text-white bg-red-600 hover:bg-red-800 focus:ring-0 focus:outline-none focus:ring-red-300  font-medium rounded text-sm px-2 py-1 mr-2">
                                Yes, I&apos;m sure
                            </button>
                            <button onClick={() => setDeletingStaffId(null)} className="text-gray-100 bg-slate-400 hover:bg-gray-400 focus:ring-1 focus:outline-none focus:ring-gray-500 rounded border border-gray-800 text-sm font-medium px-2 py-1 hover:text-gray-900 focus:z-10 ">
                                No, cancel
                            </button>
                        </div>
                    </div>
                </div>
            )} */}
            {/* {showUpdatePopup && selectedItem && (
          <CancelUpdate data={selectedItem} update ={onUpdateCancel} onClose={handleClosePopup} />
        )} */}
        </section>
    </>
    )
}

export default BranchCancelation