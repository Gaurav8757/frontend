/* eslint-disable no-unused-vars */
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState, startTransition } from "react";
import { useSpring, animated } from '@react-spring/web';
import VITE_DATA from "../../config/config.jsx";


function HrDash() {
    const [allHoliday, setAllHoliday] = useState([]);
    const [hDays, setAllHDays] = useState([]);
    const [formattedholiday, setFormattedHoliday] = useState([])
    const [monthlySalary, setMonthlySalary] = useState({ currentMonth: '', currentMonthCount: 0, prevMonth: '', prevMonthCount: 0 });
    const [letterData, setLetterData] = useState(0);
    const [joining, setJoining] = useState(0);
    const [empCount, setEmpCount] = useState(0);
    const [activeempCount, setActiveEmpCount] = useState(0);
    const [currAttendance, setCurrAttendance] = useState(0);
    const [totalLeavesCounts, setTotalLeavesCounts] = useState(0);
    const [acptLeaveCounts, setAcptLeaveCounts] = useState(0);
    const [rejLeaveCounts, setRejLeaveCounts] = useState(0);
    const [pendingLeaveCounts, setPendingLeaveCounts] = useState(0);
    const [salaryCEmp, setSalaryCEmp] = useState(0);

    const [incName, setIncName] = useState([]);
    const [tname, setTname] = useState([]);


    const currAttendanceProps = useSpring({ number: currAttendance, from: { number: 0 } });
    const activeempCountProps = useSpring({ number: activeempCount, from: { number: 0 } });
    const empCountProps = useSpring({ number: empCount, from: { number: 0 } });
    const totalLeavesCountsProps = useSpring({ number: totalLeavesCounts, from: { number: 0 } });
    const acptLeaveCountsProps = useSpring({ number: acptLeaveCounts, from: { number: 0 } });
    const trejLeaveCountsProps = useSpring({ number: rejLeaveCounts, from: { number: 0 } });
    const pendingLeaveCountsProps = useSpring({ number: pendingLeaveCounts, from: { number: 0 } });
    const letterDataProps = useSpring({ number: letterData, from: { number: 0 } });
    const joiningProps = useSpring({ number: joining, from: { number: 0 } });
    const salaryCEmpProps = useSpring({ number: salaryCEmp, from: { number: 0 } });
    const monthlySalaryProps = useSpring({ number: monthlySalary.prevMonthCount, from: { number: 0 } });
    const currentMonthCountProps = useSpring({ number: monthlySalary.currentMonthCount, from: { number: 0 } });
    // const incAmountProps = useSpring({ number: incAmount, from: { number: 0 } });


    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Not Authorized yet.. Try again!");
        } else {
            // The user is authenticated, so you can make your API request here.
            axios
                .get(`${VITE_DATA}/api/employee-list`, {
                    headers: {
                        Authorization: `${token}`, // Send the token in the Authorization header
                    },
                })
                .then((response) => {
                    const empLists = response.data;
                    const currentMonth = new Date().getMonth() + 1; // getMonth() is zero-based
                    const currentDay = new Date().getDate();
                    const currentYear = new Date().getFullYear();
                    const currentDateString = `${currentDay.toString().padStart(2, '0')}/${currentMonth.toString().padStart(2, '0')}/${currentYear}`;

                    const activeEmp = empLists.filter(emp => emp.flags === true);
                    const salaryCreatedEmp = activeEmp.filter(sal => sal.salary !== 0);

                    let totalPresentCount = 0;
                    // Count the current day present employees for each active employee   
                    activeEmp.forEach(emp => {
                        const todayEntries = emp.employeeDetails.filter(item => {
                            return item.status === "present" && item.date === currentDateString;
                        });
                        // Increment totalPresentCount by the number of today's present entries
                        totalPresentCount += todayEntries.length;
                    });


                    const filteredYearlyData = activeEmp?.filter(item => {
                        if (item.incdate && item.incdate.trim() !== "") {
                            const [day, month, year] = item.incdate.split('/'); // Extract month and year
                            return parseInt(year, 10) === currentYear; // Compare the year part with currentYear
                        }
                        return false;
                    });


                    const filteredYearlyData1 = activeEmp?.filter(item => {
                        if (item.terminatedate && item.terminatedate.trim() !== "") {
                            const [day, month, year] = item.terminatedate.split('-'); // Extract day, month, and year using '-' as the delimiter
                            return parseInt(year, 10) === currentYear; // Compare the year part with currentYear
                        }
                        return false;
                    });

                    // icrement person lists
                    const allTeminate = filteredYearlyData1.filter(item => item.terminatedate && item.terminatedate.trim() !== "");

                    // icrement person lists
                    const todayEntries = filteredYearlyData.filter(item => item.incdate && item.incdate.trim() !== "");


                    startTransition(() => {
                        setActiveEmpCount(activeEmp.length);
                        setSalaryCEmp(salaryCreatedEmp.length);
                        setEmpCount(empLists.length);
                        setCurrAttendance(totalPresentCount);
                        setIncName(todayEntries);
                        setTname(allTeminate);
                    });

                    // Calculate total leaves across all employees
                    let totalLeaveCount = 0;
                    let acptCounts = 0;
                    let rejCounts = 0;
                    let pendingCounts = 0;
                    activeEmp.forEach(emp => {
                        if (emp.leaveDetails && Array.isArray(emp.leaveDetails)) {
                            emp.leaveDetails.forEach(leave => {
                                // Increment totalLeaveCount for each leave record
                                totalLeaveCount++;
                                if (leave.status === "approved") { // Adjust condition as per your leave status logic
                                    acptCounts++; // Ensure counts is a number and add to totalLeaveCount
                                } else if (leave.status === "rejected") {
                                    rejCounts++;
                                } else if (leave.status === "pending") {
                                    pendingCounts++;
                                }
                            });
                        }
                    });
                    startTransition(() => {
                        setTotalLeavesCounts(totalLeaveCount);
                        setPendingLeaveCounts(pendingCounts);
                        setAcptLeaveCounts(acptCounts);
                        setRejLeaveCounts(rejCounts);
                    })
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Not Authorized yet.. Try again! ");
        } else {
            // The user is authenticated, so you can make your API request here.
            axios
                .get(`${VITE_DATA}/letters/view/offer`, {
                    headers: {
                        Authorization: `${token}`, // Send the token in the Authorization header
                    },
                })
                .then((response) => {
                    const letter = response.data;
                    const filterJoining = letter.filter((data) => data.joinempdate && data.joinempdate !== "");
                    startTransition(() => {
                        setLetterData(letter.length);
                        setJoining(filterJoining.length)
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);


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
                    const holidayres = response.data;
                    const currentYear = new Date().getFullYear();

                    const filteredYearlyData = holidayres.filter(item => {
                        // eslint-disable-next-line no-unused-vars
                        const [day, month, year] = item.hdate.split('/'); // Extract month and year
                        return parseInt(year, 10) === currentYear; // Compare the year part with currentYear
                    });
                    startTransition(() => {
                        setAllHoliday(filteredYearlyData.map((data) => data.hdate));
                        setAllHDays(filteredYearlyData.map((data) => data.hdays));
                    });

                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);

    // Function to convert '4/2024' to 'April 2024'
    const formatDate = (dateString) => {
        const [day, month, year] = dateString.split('/');
        const monthName = new Date(`${month}/${day}/${year}`).toLocaleString('en-US', { month: 'long' });
        return `${day}  ${monthName}  ${year}`;
    };
    // useEffect to update monthlyAttendance when salary changes
    useEffect(() => {
        const formattedDates = allHoliday.map((date, index) => ({
            month: formatDate(date),
            hDay: hDays[index],
        }));
        setFormattedHoliday(formattedDates);
    }, [allHoliday, hDays]);

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        if (!token) {
            toast.error("Not Authorized yet.. Try again!");
            return;
        }

        // The user is authenticated, so you can make your API request here.
        axios
            .get(`${VITE_DATA}/api/salaries-list`, {
                headers: {
                    Authorization: `${token}`, // Send the token in the Authorization header
                },
            })
            .then((response) => {
                const filteredData = response.data;
                const currentYear = new Date().getFullYear();
                const currentMonth = new Date().getMonth() + 1; // getMonth() returns month from 0-11, so add 1
                const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
                const prevMonthYear = currentMonth === 1 ? currentYear - 1 : currentYear;

                const filteredYearlyData = filteredData.filter(item => {
                    const [month, year] = item.genMonths.split('/'); // Extract month and year
                    const monthInt = parseInt(month, 10);
                    const yearInt = parseInt(year, 10);
                    return (
                        (yearInt === currentYear && (monthInt === currentMonth || monthInt === prevMonth)) ||
                        (yearInt === prevMonthYear && monthInt === prevMonth)
                    );
                });

                // Create a count of salaries for the current and previous month
                const monthlyCounts = {};
                filteredYearlyData.forEach(item => {
                    const [month] = item.genMonths.split('/'); // Extract month
                    if (!monthlyCounts[month]) {
                        monthlyCounts[month] = 0;
                    }
                    monthlyCounts[month]++;
                });

                const currentMonthCount = monthlyCounts[currentMonth] || 0;
                const prevMonthCount = monthlyCounts[prevMonth] || 0;

                const getMonthName = (monthNumber) => {
                    const date = new Date();
                    date.setMonth(monthNumber - 1);
                    return date.toLocaleString('default', { month: 'long' });
                };

                startTransition(() => {
                    // setSalary(filteredYearlyData.length);
                    setMonthlySalary({
                        currentMonth: getMonthName(currentMonth),
                        currentMonthCount,
                        prevMonth: getMonthName(prevMonth),
                        prevMonthCount,
                    });
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <>
        <div className="container ">
            <div className="grid grid-cols-4 gap-3 ">
                <div className="block">
                    <h1 className="uppercase font-serif text-sm sm:text-base lg:text-xl xl:text-2xl text-center">Att/Emp</h1>
                    <div className="mb-2 xl:mb-0 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-16 p-1 lg:p-1 lg:h-16 xl:h-12 rounded-t bg-green-600 shadow-2xl drop-shadow-2xl shadow-orange-950">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/60 focus:ring-[#050708]/50 uppercase">
                            Active / total
                        </span>
                        <span>
                            <animated.span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">
                                {activeempCountProps.number.to(n => n.toFixed(0))}
                            </animated.span>
                            <span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">/</span>
                            <animated.span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">
                                {empCountProps.number.to(n => n.toFixed(0))}
                            </animated.span>
                        </span>
                    </div>

                    <div className="mb-3 xl:mb-0 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-16 p-1 lg:p-1 lg:h-16 xl:h-12 bg-green-600 rounded-b shadow-2xl drop-shadow-2xl shadow-orange-950">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/60 focus:ring-[#050708]/50 uppercase">
                            Att. / Active
                        </span>
                        <span>
                            <animated.span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">
                                {currAttendanceProps.number.to(n => n.toFixed(0))}
                            </animated.span>
                            <span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">/</span>
                            <animated.span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">
                                {activeempCountProps.number.to(n => n.toFixed(0))}
                            </animated.span>
                        </span>
                    </div>


                    {/* leave */}
                    <h1 className="mt-4 uppercase font-serif text-sm sm:text-base lg:text-xl xl:text-2xl text-center shadow-2xl drop-shadow-2xl">Leave</h1>
                    <div className="mb-2 xl:mb-0 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-16 sm:h-20 p-1 lg:p-1 lg:h-16 xl:h-12 rounded-t bg-gray-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/60 focus:ring-[#050708]/50 uppercase">
                            Pending / TOTAL
                        </span>
                        <span>
                            <animated.span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">
                                {pendingLeaveCountsProps.number.to(n => n.toFixed(0))}
                            </animated.span>
                            <span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">/</span>
                            <animated.span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">
                                {totalLeavesCountsProps.number.to(n => n.toFixed(0))}
                            </animated.span>
                        </span>
                    </div>

                    <div className="mb-2 xl:mb-0 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-16 sm:h-20  p-1 lg:p-1 lg:h-16 xl:h-12 bg-green-800 shadow-2xl drop-shadow-2xl shadow-orange-950 ">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/60 focus:ring-[#050708]/50 uppercase">
                            APPROVED / TOTAL
                        </span>
                        <span>
                            <animated.span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">
                                {acptLeaveCountsProps.number.to(n => n.toFixed(0))}
                            </animated.span>
                            <span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">/</span>
                            <animated.span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">
                                {totalLeavesCountsProps.number.to(n => n.toFixed(0))}
                            </animated.span>
                        </span>
                    </div>

                    <div className="mb-2 xl:mb-4  grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-16 sm:h-20  p-1 lg:p-1 lg:h-16 xl:h-12  rounded-b bg-red-800 shadow-2xl drop-shadow-2xl shadow-orange-950">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/60 focus:ring-[#050708]/50 uppercase">
                            REJECTED / TOTAL
                        </span>
                        <span>
                            <animated.span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">
                                {trejLeaveCountsProps.number.to(n => n.toFixed(0))}
                            </animated.span>
                            <span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">/</span>
                            <animated.span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">
                                {totalLeavesCountsProps.number.to(n => n.toFixed(0))}
                            </animated.span>
                        </span>
                    </div>

                </div>
                {/* part-2 div */}
                <div className="block ">
                    <h1 className="uppercase font-serif text-sm sm:text-base lg:text-xl xl:text-2xl">LETTER&apos;S</h1>
                    <div className="mb-2 xl:mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-16 p-1 lg:p-1 sm:h-20 lg:h-16 xl:h-12 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950 ">

                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/60 focus:ring-[#050708]/50 uppercase">
                            Joining / offer
                        </span>
                        <span>
                            <animated.span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">
                                {joiningProps.number.to(n => n.toFixed(0))}
                            </animated.span>
                            <span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">/</span>
                            <animated.span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">
                                {letterDataProps.number.to(n => n.toFixed(0))}
                            </animated.span>
                        </span>
                    </div>



                </div>





                <div className="block col-span-2">
                    <h1 className="uppercase font-serif text-sm sm:text-base lg:text-xl xl:text-2xl">SALARIES/EMP</h1>
                    <div className="mb-1 xl:mb-0 sm:mb-0 grid xl:flex lg:flex md:flex sm:flex items-center xl:justify-between  lg:justify-between md:justify-between sm:justify-between h-16 p-1 lg:p-1 sm:h-12 md:h-12  lg:h-12 xl:h-12 rounded-t bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950 ">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/60 focus:ring-[#050708]/50 uppercase">
                            SALARY CREATED / ACTIVE EMP
                        </span>
                        <span>
                            <animated.span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">
                                {salaryCEmpProps.number.to(n => n.toFixed(0))}
                            </animated.span>
                            <span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">/</span>
                            <animated.span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">
                                {activeempCountProps.number.to(n => n.toFixed(0))}
                            </animated.span>
                        </span>
                    </div>

                    <div className="mb-1 xl:mb-0 sm:mb-0 grid xl:flex lg:flex md:flex sm:flex items-center xl:justify-between  lg:justify-between md:justify-between sm:justify-between h-16 p-1 lg:p-1 sm:h-12 md:h-12  lg:h-12 xl:h-12 rounded-b bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950 ">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded my-auto text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/60 focus:ring-[#050708]/50 uppercase">
                            <span className="bg-[black]/60 text-white px-2 py-0.5 rounded ">{monthlySalary.prevMonth}</span>  SLIP&apos;S / CREATED
                        </span>
                        <span>
                            <animated.span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">
                                {monthlySalaryProps.number.to(n => n.toFixed(0))}
                            </animated.span>
                            <span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">/</span>
                            <animated.span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">
                                {salaryCEmpProps.number.to(n => n.toFixed(0))}
                            </animated.span>
                        </span>
                    </div>

                    <div className="mb-1 xl:mb-0 sm:mb-0 grid xl:flex lg:flex md:flex sm:flex items-center xl:justify-between  lg:justify-between md:justify-between sm:justify-between h-16 p-1 lg:p-1 sm:h-12 md:h-12  lg:h-12 xl:h-12 rounded-b bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950 ">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded my-auto text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/60 focus:ring-[#050708]/50 uppercase">
                            <span className="bg-[black]/60 text-white px-2 py-0.5 rounded ">{monthlySalary.currentMonth}</span>  SLIP&apos;S / CREATED
                        </span>
                        <span>
                            <animated.span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">
                                {currentMonthCountProps.number.to(n => n.toFixed(0))}
                            </animated.span>
                            <span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">/</span>
                            <animated.span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">
                                {salaryCEmpProps.number.to(n => n.toFixed(0))}
                            </animated.span>
                        </span>
                    </div>


                    <h1 className=" mt-4 uppercase font-serif text-xs sm:text-sm lg:text-lg xl:text-2xl">INCREMENTED SALARIES</h1>
                    {incName.map((name) => (
                        <div key={name._id} className="mb-1 xl:mb-0 sm:mb-0 grid xl:flex lg:flex md:flex sm:flex items-center xl:justify-between  lg:justify-between md:justify-between sm:justify-between h-16 p-1 lg:p-1 sm:h-12 md:h-12  lg:h-12 xl:h-12 rounded-t bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950 ">
                            <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/60 focus:ring-[#050708]/50 uppercase">
                                {name.empname}
                            </span>
                            <span>
                                <animated.span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">
                                    {name.incmoney}
                                </animated.span>
                            </span>

                            <span>
                                <animated.span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">
                                    {name.incdate}
                                </animated.span>
                            </span>
                        </div>
                    ))}
                    <h1 className=" mt-4 uppercase font-serif text-xs sm:text-sm lg:text-lg xl:text-2xl">TERMINATED EMP</h1>
                    {tname.map((name) => (
                        <div key={name._id} className="mb-1 xl:mb-0 sm:mb-0 grid xl:flex lg:flex md:flex sm:flex items-center xl:justify-between  lg:justify-between md:justify-between sm:justify-between h-16 p-1 lg:p-1 sm:h-12 md:h-12  lg:h-12 xl:h-12 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950 ">
                            <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/60 focus:ring-[#050708]/50 uppercase">
                                {name.empname}
                            </span>
                            <span>
                                <animated.span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">
                                    {name.terminatedate}
                                </animated.span>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col">
                <h1 className="uppercase font-serif text-sm sm:text-base lg:text-xl xl:text-2xl">Holiday</h1>
                <div className="grid grid-cols-6 gap-1 col-span-2 sm:col-span-2 xl:col-span-1 lg:col-span-1 md:col-span-2">
                    {formattedholiday.map((monthData, index) => (
                        <div key={index} className="mb-1 xl:mb-1  grid xl:flex text-black lg:grid md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 sm:h-16 md:h-16 lg:h-16 xl:h-12 justify-between monthly-data  grid-cols-1  p-1 bg-cyan-600  rounded  shadow-2xl drop-shadow-2xl shadow-orange-950">
                            <span className="whitespace-nowrap bg-[white]/60 xl:p-1 text-xs sm:text-xs md:text-sm lg:text-sm xl:text-sm  font-semibold  rounded">{monthData.month}</span>
                            <span className=" text-white  text-xs sm:text-xs md:text-xs lg:text-xs xl:text-xs mx-auto font-semibold rounded">{monthData.hDay}</span>
                        </div>
                    ))}
                </div>
            </div>
            </div>
        </>
    )
}

export default HrDash;