import axios from "axios";
import { useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import VITE_DATA from "../../config/config.jsx";
function ReportEmp() {
    const [APIData, setAPIData] = useState([]);
    const [sendStaffId, setSendStaffId] = useState(null);
    const [calendarData, setCalendarData] = useState([]);
    const name = sessionStorage.getItem("name");
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1); // Month starts from 0
    const [holidayData, setHolidayData] = useState([]);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Not Authorized yet.. Try again! ");
        } else {
            // The user is authenticated, so you can make your API request here.
            axios
                .get(`${VITE_DATA}/holidays/alllists`, {
                    headers: {
                        Authorization: `${token}`, // Send the token in the Authorization header
                    },
                })
                .then((response) => {
                    setHolidayData(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);

    // add above [APIData]
    const handleYearChange = (e) => {
        setYear(parseInt(e.target.value));
    };

    const handleMonthChange = (e) => {
        setMonth(parseInt(e.target.value));
    };
    
    // DATE OF CALENDAR LIKE 01/01/2000 FORMAT
    useEffect(() => {
        // Generate calendar data for the selected month
        const startDate = startOfMonth(new Date(year, month - 1));
        const endDate = endOfMonth(new Date(year, month - 1));
        const daysOfMonth = eachDayOfInterval({ start: startDate, end: endDate });
        const formattedDays = daysOfMonth.map(day => format(day, 'dd/MM/yyyy'));
        setCalendarData(formattedDays);
    }, [year, month]);



    const renderCalendar = () => {
        // Sort APIData by empid in ascending order
        const sortedAPIData = APIData.slice().sort((a, b) => {
            const empidA = parseInt(a.empid.split('-')[1]);
            const empidB = parseInt(b.empid.split('-')[1]);
            return empidA - empidB;
        });

        return sortedAPIData.filter(employee => employee.flags === true).map((employee, employeeIndex) => {
            // Initialize present, absent, half-day, and holiday counts
            let presentCount = 0;
            let absentCount = 0;
            let halfDayCount = 0;
            let holiDayCount = 0;
            let workingDaysCount = 0;

            // color all Sundays
            return (
                <tr key={employeeIndex}>
                    <td className="whitespace-nowrap  border border-black text-lg font-semibold">
                        {employee.empid}
                    </td>
                    <td className="whitespace-nowrap border border-black text-lg font-semibold">
                        {employee.empname}
                    </td>
                    {calendarData.map((date, dateIndex) => {
                        const holiday = holidayData.find(holiday => holiday.hdate === date);
                        const isHoliday = !!holiday;
                        let text = '';
                        if (isHoliday) {
                            // Display the holiday name
                            text = holiday.hdays;
                            holiDayCount++;
                        }

                        const attendance = employee.employeeDetails.find(emp => emp.date === date);
                        const hasAttendance = !!attendance;
                        const status = hasAttendance ? attendance.status : ''; // Default to absent if no attendance record

                        // Update counts based on status
                        switch (status) {
                            case 'present':
                                presentCount++;
                                break;
                            case 'absent':
                                absentCount++;
                                break;
                            case 'halfday':
                                halfDayCount++;
                                break;
                            default:
                                break;
                        }

                        // Count working days (exclude Sundays)
                        const startDate = startOfMonth(new Date(year, month - 1));
                        const endDate = endOfMonth(new Date(year, month - 1));
                        const daysOfMonth = eachDayOfInterval({ start: startDate, end: endDate });

                        // days 
                        const formattedDays = daysOfMonth.map((day) => day.getDay());

                        // days of index value
                        if (formattedDays[dateIndex] !== 0) {
                            workingDaysCount++;
                        }

                        // Define the text to display based on status
                        switch (status) {
                            case 'present':
                                text = 'P';
                                break;
                            case 'absent':
                                text = 'A';
                                break;
                            case 'halfday':
                                text = 'H';
                                break;
                            default:
                                break;
                        }
                        let totalHours = '';
                        if (hasAttendance && attendance.time && attendance.logouttime) {
                            const startTime = new Date(`01/01/2000 ${attendance.time}`);
                            const endTime = new Date(`01/01/2000 ${attendance.logouttime}`);
                            const timeDifference = endTime.getTime() - startTime.getTime();
                            const hours = Math.floor(timeDifference / (1000 * 60 * 60));
                            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                            totalHours = `Working HRS: ${hours}hr : ${minutes}min`;
                        }
                        // Render the cell
                        return (

                            <td key={dateIndex} className={`z-1  border border-black text-base font-bold  text-slate-200  ${formattedDays[dateIndex] === 0 ? `bg-red-300  ` : status === 'present' ? 'bg-green-600 ' : status === 'absent' ? 'bg-red-600  ' : status === 'halfday' ? 'bg-yellow-600  ' : isHoliday === true ? 'bg-cyan-400 ' : ''}`}>
                                {text}
                                <div className="text-xs whitespace-nowrap font-normal">{hasAttendance ? `Login Time: ${attendance.time}` : ''}</div>
                                <div className="text-xs whitespace-nowrap my-1">{`${totalHours}`}</div>
                                <div className="text-xs whitespace-nowrap font-normal">{hasAttendance ? `Logout Time: ${attendance.logouttime}` : ''}</div>
                            </td>
                        );
                    })}


                    <td className="whitespace-wrap  text-lg font-bold border border-black">
                        {workingDaysCount - holiDayCount} {/* Display WORKING count */}
                    </td>
                    <td className="whitespace-nowrap  text-lg font-bold border border-black">
                        {presentCount} {/* Display present count */}
                    </td>
                    <td className="whitespace-nowrap  text-lg font-bold border border-black">
                        {absentCount} {/* Display absent count */}
                    </td>
                    <td className="whitespace-nowrap  text-lg font-bold border border-black">
                        {halfDayCount} {/* Display half-day count */}
                    </td>
                    <td className="whitespace-nowrap  text-lg font-bold border border-black">
                        {holiDayCount} {/* Display holiday count */}
                    </td>
                    <td className="whitespace-nowrap  text-lg font-bold border border-black">
                        {(presentCount / workingDaysCount * 100).toFixed(2)}%
                    </td>
                </tr>
            );
        });
    };

    const renderYears = () => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let y = currentYear; y >= 2000; y--) {
            years.push(<option key={y} value={y}>{y}</option>);
        }
        return years;
    };

    const renderMonths = () => {
        const months = [];
        for (let m = 1; m <= 12; m++) {
            const date = new Date(year, m - 1, 1);
            const monthName = format(date, 'MMMM');
            months.push(<option key={m} value={m}>{monthName}</option>);
        }
        return months;
    };

    const renderTableHeaders = () => {
        const headers = [];
        const daysInMonth = new Date(year, month, 0).getDate();
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let sundayCount = 0;
        for (let i = 1; i <= daysInMonth; i++) {
            const currentDate = new Date(year, month - 1, i);
            const formattedDate = i.toString().padStart(2, '0'); // Format date as '01', '02', ...
            const weekdayIndex = currentDate.getDay(); // Get the index of the day of the week (0 for Sunday, 1 for Monday, etc.)
            const weekday = weekdays[weekdayIndex]; // Get the corresponding weekday from the array
            // Find holiday data for the current date
            const formattedDateStr = currentDate.toLocaleDateString('en-GB'); // Format date as 'dd/MM/yyyy'
            const holiday = holidayData.find(holiday => holiday.hdate === formattedDateStr);
            const isHoliday = !!holiday;
            if (weekdayIndex === 0) { // Check if the current day is Sunday
                sundayCount++; // Increment the Sunday count
            }

            headers.push(
                <th className={`border   border-orange-700 text-lg px-10 py-2 sticky  ${isHoliday === true ? 'bg-cyan-400 ' : weekdayIndex === 0 ? 'bg-red-300 text-red-700' : ''}`}
                    key={i} >
                    <div >{formattedDate}</div>
                    <div>{weekday}</div>
                    <span className="text-red-700  ">{isHoliday ? holiday.hdays : ''}</span>
                </th>
            )
        }
        
        console.log(sundayCount);
        return headers;
    };

    // LISTS OF EMPLOYEE
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Not Authorized yet.. Try again! ");
        } else {
            // The user is authenticated, so you can make your API request here.
            axios
                .get(`${VITE_DATA}/api/employee-list`, {
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

    

    const exportToExcel = () => {
        try {
            const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
            const fileExtension = ".xlsx";
            const fileName = name;
            // Get all table headers and rows
            const tableHeaders = document.querySelectorAll(".table th");
            const tableRows = document.querySelectorAll(".table tbody tr");

            // Include only the first 26 columns and all rows
            const columnsToInclude = Array.from(tableHeaders).map(header => header.textContent);
            const rowsToInclude = Array.from(tableRows).map(row => {
                const cells = Array.from(row.querySelectorAll("td"));
                return cells.map(cell => cell.textContent);
            });

            // Create worksheet
            const wsData = [columnsToInclude, ...rowsToInclude];
            const ws = XLSX.utils.aoa_to_sheet(wsData);
            // Create workbook and export
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

            // Generate Excel file in memory
            const excelBuffer = XLSX.write(wb, {
                bookType: "xlsx",
                type: "array",
            });

            // Convert to Blob
            const data = new Blob([excelBuffer], { type: fileType });

            // Create download link
            const url = URL.createObjectURL(data);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", fileName + fileExtension);

            // Append link to the body and trigger download
            document.body.appendChild(link);
            link.click();

            // Cleanup
            setTimeout(() => {
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            }, 100);
        } catch (error) {
            console.error("Error exporting to Excel:", error);
            toast.error("Error exporting to Excel");
        }
    };


    const handleExportClick = () => {
        exportToExcel();
        // exportToPDF();
    };



    // ******************** Delete Functions *************************************/
    const onDeleteEmployee = async (_id) => {
        try {
            await axios.delete(`${VITE_DATA}/emp/api/${_id}`);
            toast.warn("Employee Deleted.....!", { theme: "dark", position: "top-right" });
            setAPIData((prevData) => prevData.filter((data) => data._id !== _id));
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    return (
        <section className={`container-fluid relative  p-0 sm:ml-64 bg-orange-200`}>
            <div className={`container-fluid flex justify-center border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-orange-100`}>
                <div className="inline-block max-w-full w-full ">
                   
                    <div className="flex w-xl  mt-2 text-orange-500">
                        <h1></h1>
                    <h1 className="flex justify-center text-3xl w-full text-orange-700 font-semibold">Employee&apos;s Attendance Report</h1>
                        <button className="" onClick={handleExportClick}>
                            <img src="/excel.png" alt="download" className="w-12" />
                        </button>
                        <NavLink to="/hr/home/addemployee"  className="my-auto me-2 ms-1">
                            <button type="button" className="text-white  justify-end bg-gradient-to-r whitespace-nowrap from-orange-500 via-orange-600 to-orange-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-orange-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded text-sm px-3 py-1.5 text-center  ">Go Back</button>
                        </NavLink>
                    </div>

                    {/* year */}
                    <div className="flex justify-between items-center my-5 mt-5  text-orange-600  ">
                        <h1 className="font-bold text-lg flex-wrap xl:flex-nowrap">Current MM-YY: <span className="text-green-600 ">{month} - {year}</span></h1>
                        <div className="flex">
                            <div>
                                <label htmlFor="year" className="font-bold text-lg">Year:</label>
                                <select id="year" value={year} onChange={handleYearChange} className="p-1 ml-2 rounded-lg text-lg text-red-900">
                                    {renderYears()}
                                </select>
                            </div>
                            {/* months */}
                            <div className="mx-4">
                                <label htmlFor="month" className="font-bold text-lg">Month:</label>
                                <select id="month" value={month} onChange={handleMonthChange} className="p-1 ml-2 rounded-lg text-lg text-red-900">
                                    {renderMonths()}
                                </select>
                            </div>
                        </div>
                    </div>



                    {/* part-3 */}
                    <div className=" relative ">
                        <div className="flex min-w-full w-full    ">
                            <table className="min-w-full text-center  divide-y divide-gray-200 text-sm font-light table border  border-black">
                                <thead className="sticky bg-slate-100 top-16">
                                    <tr className="border border-black z-50 text-orange-700 text-sm ">
                                        <th scope="col" className="sticky text-base  whitespace-nowrap border border-orange-700">
                                            Employee ID
                                        </th>
                                        <th scope="col" className="sticky text-base whitespace-nowrap border border-orange-700">
                                            Employee Name
                                        </th>
                                        {renderTableHeaders()}
                                        {/* {renderTableRows()} */}
                                        <th scope="col" className="sticky whitespace-wrap border border-orange-700 ">
                                            Total Working Days
                                        </th>
                                        <th scope="col" className="sticky whitespace-wrap border text-green-800 border-orange-700 bg-green-200">
                                            Present Day
                                        </th>
                                        <th scope="col" className="sticky whitespace-wrap border border-orange-700 bg-red-200 text-red-700">
                                            Absent Day
                                        </th>
                                        <th scope="col" className="sticky whitespace-wrap border border-orange-700 bg-yellow-200 text-yellow-700">
                                            Half Day
                                        </th>
                                        <th scope="col" className="sticky  whitespace-nowrap border border-orange-700 bg-cyan-200 text-cyan-700">
                                            HoliDay
                                        </th>
                                        <th scope="col" className="sticky whitespace-nowrap border border-orange-700 bg-green-500">
                                            Attendance(%)
                                        </th>
                                    </tr></thead>

                                {/* td data */}
                                <tbody className="bg-orange-200 divide-y  overflow-hidden">
                                    {renderCalendar()}
                                </tbody>


                            </table>
                        </div>
                        {sendStaffId && (
                            <div id="popup-modal" tabIndex="-1" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white p-4 rounded-lg ">
                                    <h2 className="text-lg font-semibold text-gray-800"> {`Are you sure you want to delete `}
                                        <span className="text-red-600">{APIData.find(data => data._id === sendStaffId)?.empname}</span>
                                        {`?`}</h2>
                                    <div className="flex justify-end mt-10">
                                        <button onClick={() => { onDeleteEmployee(sendStaffId); setSendStaffId(null); }} className="text-white bg-red-600 hover:bg-red-800 focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-base px-4 py-2 mr-2">
                                            Yes, I&apos;m sure
                                        </button>
                                        <button onClick={() => setSendStaffId(null)} className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-1 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-base font-medium px-4 py-2 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                            No, cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section >
    );
}
export default ReportEmp;