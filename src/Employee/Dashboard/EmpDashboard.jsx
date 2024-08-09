import axios from "axios";
import { useEffect, useState, startTransition } from "react";
import { toast } from "react-toastify";
import { useSpring, animated } from "@react-spring/web";
import VITE_DATA from "../../config/config.jsx";


function EmpDashboard() {
    // eslint-disable-next-line no-unused-vars
    const [APIData, setAPIData] = useState([]);
    const [salary, setSalary] = useState([]);
    const [formattedsalary, setFormattedSalary] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [EmpData, setEmpData] = useState([]);
    // const [monthlyAttendance, setMonthlyAttendance] = useState([]);
    // console.log(monthlyAttendance);
    const [yearlyData, setYearlyData] = useState(0);
    const [monthlyData, setMonthlyData] = useState(0);
    const [dailyData, setDailyData] = useState(0);

    // const [currAttendance, setCurrAttendance] = useState(0);
    // const [currMattendance, setCurrMattendance] = useState(0);

    const [leaveData, setLeaveData] = useState(0);
    const [pendingLeave, setPendingLeave] = useState(0);
    const [rejectLeave, setRejectLeave] = useState(0);
    const [approveLeave, setApproveLeave] = useState(0);

    const [totalNsell, setTotalNsell] = useState(0);
    const [monthlyNsell, setMonthlyNsell] = useState(0);
    const [dailyNsell, setDailyNsell] = useState(0);

    const [totalFsell, setTotalFsell] = useState(0);
    const [monthlyFsell, setMonthlyFsell] = useState(0);
    const [dailyFsell, setDailyFsell] = useState(0);

    const [totalCvPayout, setTotalCvPayout] = useState(0);
    const [monthlyCvPayout, setMonthlyCvPayout] = useState(0);
    const [dailyCvPayout, setDailyCvPayout] = useState(0);
    const [totalCvCount, setTotalCvCount] = useState(0);
    const [monthlyCvCount, setMonthlyCvCount] = useState(0);
    const [dailyCvCount, setDailyCvCount] = useState(0);

    const [totalPvtCarPayout, setTotalPvtCarPayout] = useState(0);
    const [monthlyPvtCarPayout, setMonthlyPvtCarPayout] = useState(0);
    const [dailyPvtCarPayout, setDailyPvtCarPayout] = useState(0);
    const [totalPvtCarCount, setTotalPvtCarCount] = useState(0);
    const [monthlyPvtCarCount, setMonthlyPvtCarCount] = useState(0);
    const [dailyPvtCarCount, setDailyPvtCarCount] = useState(0);

    const [totalTwPayout, setTotalTwPayout] = useState(0);
    const [monthlyTwPayout, setMonthlyTwPayout] = useState(0);
    const [dailyTwPayout, setDailyTwPayout] = useState(0);
    const [totalTwCount, setTotalTwCount] = useState(0);
    const [monthlyTwCount, setMonthlyTwCount] = useState(0);
    const [dailyTwCount, setDailyTwCount] = useState(0);

    const [totalHealthPayout, setTotalHealthPayout] = useState(0);
    const [monthlyHealthPayout, setMonthlyHealthPayout] = useState(0);
    const [dailyHealthPayout, setDailyHealthPayout] = useState(0);
    const [totalHealthCount, setTotalHealthCount] = useState(0);
    const [monthlyHealthCount, setMonthlyHealthCount] = useState(0);
    const [dailyHealthCount, setDailyHealthCount] = useState(0);

    const [totalNonMotorPayout, setTotalNonMotorPayout] = useState(0);
    const [monthlyNonMotorPayout, setMonthlyNonMotorPayout] = useState(0);
    const [dailyNonMotorPayout, setDailyNonMotorPayout] = useState(0);
    const [totalNonMotorCount, setTotalNonMotorCount] = useState(0);
    const [monthlyNonMotorCount, setMonthlyNonMotorCount] = useState(0);
    const [dailyNonMotorCount, setDailyNonMotorCount] = useState(0);

    const [totalLifePayout, setTotalLifePayout] = useState(0);
  const [monthlyLifePayout, setMonthlyLifePayout] = useState(0);
  const [dailyLifePayout, setDailyLifePayout] = useState(0);
  const [totalLifeCount, setTotalLifeCount] = useState(0);
  const [monthlyLifeCount, setMonthlyLifeCount] = useState(0);
  const [dailyLifeCount, setDailyLifeCount] = useState(0);

    const [visitsData, setVisitsData] = useState([]);
    const [monthlyVisits, setMonthlyVisits] = useState([]);
    const [dailyVisits, setDailyVisits] = useState([]);

    const empid = sessionStorage.getItem("employeeId");
    const roles = sessionStorage.getItem("role");

    const visitsDataProps = useSpring({
      number: visitsData.length,
      from: { number: 0 },
    });
  
    const monthlyVisitsProps = useSpring({
      number: monthlyVisits.length,
      from: { number: 0 },
    });
  
    const dailyVisitsProps = useSpring({
      number: dailyVisits.length,
      from: { number: 0 },
    });

     // life
  const totalLifePayoutProps = useSpring({
    number: totalLifePayout,
    from: { number: 0 },
  });
  const monthlyLifePayoutProps = useSpring({
    number: monthlyLifePayout,
    from: { number: 0 },
  });
  const dailyLifePayoutProps = useSpring({
    number: dailyLifePayout,
    from: { number: 0 },
  });
  const totalLifeCountProps = useSpring({
    number: totalLifeCount,
    from: { number: 0 },
  });
  const monthlyLifeCountProps = useSpring({
    number: monthlyLifeCount,
    from: { number: 0 },
  });
  const dailyLifeCountProps = useSpring({
    number: dailyLifeCount,
    from: { number: 0 },
  });

    const allDetailsProps = useSpring({ number: yearlyData, from: { number: 0 } });
    const monthlyProps = useSpring({ number: monthlyData, from: { number: 0 } });
    const dailyProps = useSpring({ number: dailyData, from: { number: 0 } });

    const totalCvPayoutProps = useSpring({ number: totalCvPayout, from: { number: 0 } });
    const monthlyCvPayoutProps = useSpring({ number: monthlyCvPayout, from: { number: 0 } });
    const dailyCvPayoutProps = useSpring({ number: dailyCvPayout, from: { number: 0 } });
    const totalCvCountProps = useSpring({ number: totalCvCount, from: { number: 0 } });
    const monthlyCvCountProps = useSpring({ number: monthlyCvCount, from: { number: 0 } });
    const dailyCvCountProps = useSpring({ number: dailyCvCount, from: { number: 0 } });

    const totalNsellProps = useSpring({ number: totalNsell, from: { number: 0 } });
    const monthlyNsellProps = useSpring({ number: monthlyNsell, from: { number: 0 } });
    const dailyNsellProps = useSpring({ number: dailyNsell, from: { number: 0 } });
    const totalFsellProps = useSpring({ number: totalFsell, from: { number: 0 } });
    const monthlyFsellProps = useSpring({ number: monthlyFsell, from: { number: 0 } });
    const dailyFsellProps = useSpring({ number: dailyFsell, from: { number: 0 } });

    const totalPvtCarPayoutProps = useSpring({ number: totalPvtCarPayout, from: { number: 0 } });
    const monthlyPvtCarPayoutProps = useSpring({ number: monthlyPvtCarPayout, from: { number: 0 } });
    const dailyPvtCarPayoutProps = useSpring({ number: dailyPvtCarPayout, from: { number: 0 } });
    const totalPvtCarCountProps = useSpring({ number: totalPvtCarCount, from: { number: 0 } });
    const monthlyPvtCarCountProps = useSpring({ number: monthlyPvtCarCount, from: { number: 0 } });
    const dailyPvtCarCountProps = useSpring({ number: dailyPvtCarCount, from: { number: 0 } });

    const totalTwPayoutProps = useSpring({ number: totalTwPayout, from: { number: 0 } });
    const monthlyTwPayoutProps = useSpring({ number: monthlyTwPayout, from: { number: 0 } });
    const dailyTwPayoutProps = useSpring({ number: dailyTwPayout, from: { number: 0 } });
    const totalTwCountProps = useSpring({ number: totalTwCount, from: { number: 0 } });
    const monthlyTwCountProps = useSpring({ number: monthlyTwCount, from: { number: 0 } });
    const dailyTwCountProps = useSpring({ number: dailyTwCount, from: { number: 0 } });

    const totalHealthPayoutProps = useSpring({ number: totalHealthPayout, from: { number: 0 } });
    const monthlyHealthPayoutProps = useSpring({ number: monthlyHealthPayout, from: { number: 0 } });
    const dailyHealthPayoutProps = useSpring({ number: dailyHealthPayout, from: { number: 0 } });
    const totalHealthCountProps = useSpring({ number: totalHealthCount, from: { number: 0 } });
    const monthlyHealthCountProps = useSpring({ number: monthlyHealthCount, from: { number: 0 } });
    const dailyHealthCountProps = useSpring({ number: dailyHealthCount, from: { number: 0 } });

    const totalNonMotorPayoutProps = useSpring({ number: totalNonMotorPayout, from: { number: 0 } });
    const monthlyNonMotorPayoutProps = useSpring({ number: monthlyNonMotorPayout, from: { number: 0 } });
    const dailyNonMotorPayoutProps = useSpring({ number: dailyNonMotorPayout, from: { number: 0 } });
    const totalNonMotorCountProps = useSpring({ number: totalNonMotorCount, from: { number: 0 } });
    const monthlyNonMotorCountProps = useSpring({ number: monthlyNonMotorCount, from: { number: 0 } });
    const dailyNonMotorCountProps = useSpring({ number: dailyNonMotorCount, from: { number: 0 } });

    // const currAttendanceProps = useSpring({ number: currAttendance, from: { number: 0 } });
    // const currMattendanceProps = useSpring({ number: currMattendance, from: { number: 0 } });

    const leaveDataProps = useSpring({ number: leaveData, from: { number: 0 } });
    const pendingLeaveProps = useSpring({ number: pendingLeave, from: { number: 0 } });
    const rejectLeaveProps = useSpring({ number: rejectLeave, from: { number: 0 } });
    const approveLeaveProps = useSpring({ number: approveLeave, from: { number: 0 } });


    useEffect(() => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        toast.error("Not Authorized yet.. Try again! ");
      } else {
        // The user is authenticated, so you can make your API request here.
        axios
          .get(`${VITE_DATA}/dailyvisit/view`, {
            headers: {
              Authorization: `${token}`, // Send the token in the Authorization header
            },
          })
          .then((response) => {
            const data = response.data;
            const currentMonth = new Date().getMonth() + 1; // getMonth() is zero-based
            const currentDay = new Date().getDate();
            const currentYear = new Date().getFullYear();
  
            const filteredYearlyData = data.filter((item) => {
              const itemDate = new Date(item.currdate);
              const itemYear = itemDate.getFullYear();
              return itemYear === currentYear;
            });
  
            const filteredMonthlyData = data.filter((item) => {
              const itemDate = new Date(item.currdate);
              const itemMonth = itemDate.getMonth() + 1;
              const itemYear = itemDate.getFullYear();
              return itemMonth === currentMonth && itemYear === currentYear;
            });
  
            const filteredDailyData = data.filter((item) => {
              const itemDate = new Date(item.currdate);
              const itemDay = itemDate.getDate();
              const itemMonth = itemDate.getMonth() + 1;
              const itemYear = itemDate.getFullYear();
              return (
                itemDay === currentDay &&
                itemMonth === currentMonth &&
                itemYear === currentYear
              );
            });
            setVisitsData(filteredYearlyData);
            setMonthlyVisits(filteredMonthlyData);
            setDailyVisits(filteredDailyData);
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
            // Fetch leave types
            axios
                .get(`${VITE_DATA}/api/employee/${empid}`, {
                    headers: {
                        Authorization: `${token}`, // Send the token in the Authorization header
                    },
                })
                .then((response) => {
                    const leave = response.data.leaveDetails;
                    const currentMonth = new Date().getMonth() + 1; // getMonth() is zero-based
                    // const currentDay = new Date().getDate();
                    const currentYear = new Date().getFullYear();

                    // leave management
                    const filteredMonthlyData = leave.filter(item => {
                        const [day, month, year] = item.applyDate.split('/'); // Split the date string
                        const itemDate = new Date(`${year}-${month}-${day}`); // Create a new Date object in YYYY-MM-DD format

                        // Check if the date is valid
                        if (isNaN(itemDate.getTime())) {
                            console.error(`Invalid date: ${item.applyDate}`);
                            return false;
                        }
                        return itemDate.getMonth() + 1 === currentMonth && itemDate.getFullYear() === currentYear;
                    });

                    const pendingLeaves = filteredMonthlyData.filter(item => item.status === 'pending');
                    const approvedLeaves = filteredMonthlyData.filter(item => item.status === 'approved');
                    const rejectedLeaves = filteredMonthlyData.filter(item => item.status === 'rejected');


                    startTransition(() => {
                        setLeaveData(filteredMonthlyData.length);
                        setPendingLeave(pendingLeaves.length);
                        setRejectLeave(rejectedLeaves.length);
                        setApproveLeave(approvedLeaves.length);

                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [empid]);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Not Authorized yet.. Try again! ");
        } else {
            // The user is authenticated, so you can make your API request here.
            axios
                .get(`${VITE_DATA}/api/salaries-list`, {
                    headers: {
                        Authorization: `${token}`, // Send the token in the Authorization header
                    },
                })
                .then((response) => {
                    // make true flags
                    const filteredData = response.data.filter(item => item.empUniqueId === empid && item.flags === true);
                    const currentYear = new Date().getFullYear();

                    const filteredYearlyData = filteredData.filter(item => {
                        // eslint-disable-next-line no-unused-vars
                        const [month, year] = item.genMonths.split('/'); // Extract month and year
                        return parseInt(year, 10) === currentYear; // Compare the year part with currentYear
                    });
                    startTransition(() => {
                        setSalary(filteredYearlyData.map((data) => data.genMonths));
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [empid]);

    // Function to convert '4/2024' to 'April 2024'
    const formatDate = (dateString) => {
        const [month, year] = dateString.split('/');
        const monthName = new Date(`${month}/01/${year}`).toLocaleString('en-US', { month: 'long' });
        return `${monthName} ${year}`;
    };

    // useEffect to update monthlyAttendance when salary changes
    useEffect(() => {
        const formattedDates = salary.map(date => ({
            month: formatDate(date),
        }));
        setFormattedSalary(formattedDates);
    }, [salary]);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            toast.error('Not Authorized yet.. Try again! ');
        } else {
            axios
                .get(`${VITE_DATA}/employee/emp/attendance/${empid}`, {
                    headers: {
                        Authorization: `${token}`,
                    },
                })
                .then((response) => {
                    const attend = response.data;
                    // const currentYear = new Date().getFullYear();
                    // const filteredYearlyData = attend.filter(item => {
                    //     const itemDate = new Date(item.date);
                    //     return itemDate.getFullYear() === currentYear;
                    // });

                    // const monthlyAttendance = Array(12).fill(0).map((_, month) => {
                    //     const monthData = attend.filter(item => {
                    //         const itemDate = new Date(item.date);
                    //         return itemDate.getMonth() === month;
                    //     });
                    //     const presentDays = monthData.filter(item => item.status === 'present').length;
                    //     const absentDays = monthData.filter(item => item.status === 'absent').length;
                    //     const totalDays = new Date(currentYear, month + 1, 0).getDate(); // Days in the month
                    //     return {
                    //         month: new Date(0, month).toLocaleString('default', { month: 'long' }),
                    //         present: presentDays,
                    //         absent: absentDays,
                    //         total: totalDays
                    //     };
                    // });

                    startTransition(() => {
                        setEmpData(attend);
                        // setCurrAttendance(filteredYearlyData.length);
                        // setMonthlyAttendance(monthlyAttendance);
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [empid]);


    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Not Authorized yet.. Try again! ");
        } else {
            // The user is authenticated, so you can make your API request here.
            axios
                .get(`${VITE_DATA}/alldetails/viewdata/${empid}`, {
                    headers: {
                        Authorization: `${token}`, // Send the token in the Authorization header
                    },
                })
                .then((response) => {
                    const empPolicy = response.data;
                    const currentMonth = new Date().getMonth() + 1;
                    const currentDay = new Date().getDate();
                    const currentYear = new Date().getFullYear();

                    const filteredYearlyData = empPolicy.filter(item => {
                        const itemDate = new Date(item.entryDate);
                        return itemDate.getFullYear() === currentYear;
                    });

                    const filteredMonthlyData = empPolicy.filter(item => {
                        const itemDate = new Date(item.entryDate);
                        return itemDate.getMonth() + 1 === currentMonth && itemDate.getFullYear() === currentYear;
                    });

                    const filteredDailyData = empPolicy.filter(item => {
                        const itemDate = new Date(item.entryDate);
                        return itemDate.getDate() === currentDay && itemDate.getMonth() + 1 === currentMonth && itemDate.getFullYear() === currentYear;
                    });

                    const calculateTotals = (filteredData, segment) => {
                        const filteredSegmentData = filteredData.filter(item => item.segment === segment);
                        const totalPayout = filteredSegmentData.reduce((sum, item) => parseFloat(sum + item.netPremium), 0);
                        const totalCount = filteredSegmentData.length;
                        return { totalPayout, totalCount };
                    };

                    const cvYearlyTotals = calculateTotals(filteredYearlyData, 'C V');
                    const cvMonthlyTotals = calculateTotals(filteredMonthlyData, 'C V');
                    const cvDailyTotals = calculateTotals(filteredDailyData, 'C V');

                    const pvtCarYearlyTotals = calculateTotals(filteredYearlyData, 'PVT-CAR');
                    const pvtCarMonthlyTotals = calculateTotals(filteredMonthlyData, 'PVT-CAR');
                    const pvtCarDailyTotals = calculateTotals(filteredDailyData, 'PVT-CAR');

                    const twYearlyTotals = calculateTotals(filteredYearlyData, 'TW');
                    const twMonthlyTotals = calculateTotals(filteredMonthlyData, 'TW');
                    const twDailyTotals = calculateTotals(filteredDailyData, 'TW');

                    const lifeYearlyTotals = calculateTotals(filteredYearlyData, "LIFE");
                    const lifeMonthlyTotals = calculateTotals(filteredMonthlyData, "LIFE");
                    const lifeDailyTotals = calculateTotals(filteredDailyData, "LIFE");
                

                    const healthYearlyTotals = calculateTotals(filteredYearlyData, 'HEALTH');
                    const healthMonthlyTotals = calculateTotals(filteredMonthlyData, 'HEALTH');
                    const healthDailyTotals = calculateTotals(filteredDailyData, 'HEALTH');

                    const nonMotorYearlyTotals = calculateTotals(filteredYearlyData, 'NON-MOTOR');
                    const nonMotorMonthlyTotals = calculateTotals(filteredMonthlyData, 'NON-MOTOR');
                    const nonMotorDailyTotals = calculateTotals(filteredDailyData, 'NON-MOTOR');

                    const totalnetPremium = filteredYearlyData.reduce((sum, item) => sum + parseFloat(item.netPremium || 0), 0);
                    const monthlynetPremium = filteredMonthlyData.reduce((sum, item) => sum + parseFloat(item.netPremium || 0), 0);
                    const dailynetPremium = filteredDailyData.reduce((sum, item) => sum + parseFloat(item.netPremium || 0), 0);

                    const totalfinalEntryFields = filteredYearlyData.reduce((sum, item) => sum + item.finalEntryFields, 0);
                    const monthlyfinalEntryFields = filteredMonthlyData.reduce((sum, item) => sum + item.finalEntryFields, 0);
                    const dailyfinalEntryFields = filteredDailyData.reduce((sum, item) => sum + item.finalEntryFields, 0);

                    startTransition(() => {
                        setYearlyData(filteredYearlyData.length);
                        setMonthlyData(filteredMonthlyData.length);
                        setDailyData(filteredDailyData.length);
                        setAPIData(empPolicy);

                        setTotalCvPayout(totalCvPayout);
                        setMonthlyCvPayout(monthlyCvPayout);
                        setDailyCvPayout(dailyCvPayout);
                        setTotalCvPayout(cvYearlyTotals.totalPayout);
                        setMonthlyCvPayout(cvMonthlyTotals.totalPayout);
                        setDailyCvPayout(cvDailyTotals.totalPayout);
                        setTotalCvCount(cvYearlyTotals.totalCount);
                        setMonthlyCvCount(cvMonthlyTotals.totalCount);
                        setDailyCvCount(cvDailyTotals.totalCount);

                        setTotalNsell(totalnetPremium);
                        setMonthlyNsell(monthlynetPremium);
                        setDailyNsell(dailynetPremium);
                        setTotalFsell(totalfinalEntryFields);
                        setMonthlyFsell(monthlyfinalEntryFields);
                        setDailyFsell(dailyfinalEntryFields);

                        setTotalPvtCarPayout(pvtCarYearlyTotals.totalPayout);
                        setMonthlyPvtCarPayout(pvtCarMonthlyTotals.totalPayout);
                        setDailyPvtCarPayout(pvtCarDailyTotals.totalPayout);
                        setTotalPvtCarCount(pvtCarYearlyTotals.totalCount);
                        setMonthlyPvtCarCount(pvtCarMonthlyTotals.totalCount);
                        setDailyPvtCarCount(pvtCarDailyTotals.totalCount);

                        setTotalTwPayout(twYearlyTotals.totalPayout);
                        setMonthlyTwPayout(twMonthlyTotals.totalPayout);
                        setDailyTwPayout(twDailyTotals.totalPayout);
                        setTotalTwCount(twYearlyTotals.totalCount);
                        setMonthlyTwCount(twMonthlyTotals.totalCount);
                        setDailyTwCount(twDailyTotals.totalCount);

                        setTotalHealthPayout(healthYearlyTotals.totalPayout);
                        setMonthlyHealthPayout(healthMonthlyTotals.totalPayout);
                        setDailyHealthPayout(healthDailyTotals.totalPayout);
                        setTotalHealthCount(healthYearlyTotals.totalCount);
                        setMonthlyHealthCount(healthMonthlyTotals.totalCount);
                        setDailyHealthCount(healthDailyTotals.totalCount);

                        setTotalNonMotorPayout(nonMotorYearlyTotals.totalPayout);
                        setMonthlyNonMotorPayout(nonMotorMonthlyTotals.totalPayout);
                        setDailyNonMotorPayout(nonMotorDailyTotals.totalPayout);
                        setTotalNonMotorCount(nonMotorYearlyTotals.totalCount);
                        setMonthlyNonMotorCount(nonMotorMonthlyTotals.totalCount);
                        setDailyNonMotorCount(nonMotorDailyTotals.totalCount);

                        setTotalLifePayout(lifeYearlyTotals.totalPayout);
                        setMonthlyLifePayout(lifeMonthlyTotals.totalPayout);
                        setDailyLifePayout(lifeDailyTotals.totalPayout);
                        setTotalLifeCount(lifeYearlyTotals.totalCount);
                        setMonthlyLifeCount(lifeMonthlyTotals.totalCount);
                        setDailyLifeCount(lifeDailyTotals.totalCount);
                    });
                })
                .catch((error) => {
                    toast.error(error);
                    console.error(error);
                });
        }
    }, [empid, dailyCvPayout, totalCvPayout, monthlyCvPayout]);



    return (
      <>
        {" "}
        <>
          {roles === "OPS Executive" ||
          roles === "OPS EXECUTIVE" ||
          roles === "Branch Manager" ||
          roles === "BRANCH MANAGER" ||
          roles === "Executive Finanace" ||
          roles === "EXECUTIVE FINANACE" ? (
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="grid xl:flex lg:flex md:grid sm:grid items-center xl:justify-between h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                <span className="sm:block mx-1 sm:mx-2 lg:mx-3 xl:mx-6 px-2 py-1 rounded text-xs sm:text-sm md:text-base lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50">
                  YTD
                </span>
                <animated.span className="mx-1 sm:mx-2 lg:mx-3 xl:mx-6 text-base sm:text-base md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">
                  {allDetailsProps.number.to((n) => n.toFixed(0))}
                </animated.span>
              </div>

              <div className="grid xl:flex lg:flex md:grid sm:grid items-center xl:justify-between h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                <span className="sm:block mx-1 sm:mx-2 lg:mx-3 xl:mx-6 px-2 py-1 rounded text-xs sm:text-sm md:text-base lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 xl:whitespace-nowrap">
                  MTD
                </span>
                <animated.span className="mx-1 sm:mx-2 lg:mx-3 xl:mx-6 text-base sm:text-base md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">
                  {monthlyProps.number.to((n) => n.toFixed(0))}
                </animated.span>
              </div>

              <div className="grid xl:flex lg:flex md:grid sm:grid items-center xl:justify-between h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                <span className="sm:block mx-1 sm:mx-2 lg:mx-3 xl:mx-6 px-2 py-1 rounded text-xs sm:text-sm md:text-base lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50">
                  FTD
                </span>
                <animated.span className="mx-1 sm:mx-2 lg:mx-3 xl:mx-6 text-base sm:text-base md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">
                  {dailyProps.number.to((n) => n.toFixed(0))}
                </animated.span>
              </div>
            </div>
          ) : null}
        </>
        {/* LEAVE MANAGEMENT */}
        <div className="grid grid-cols-3 gap-3 mb-3">
          <div className="block ">
            <h1 className="uppercase font-serif text-sm sm:text-base lg:text-xl xl:text-2xl">
              LEAVE
            </h1>

            <div className="mb-3  grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 lg:h-16 xl:h-16 rounded bg-gray-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
              <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/60 focus:ring-[#050708]/50 uppercase">
                PENDING / Total
              </span>
              <span>
                <animated.span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-base font-bold text-gray-200">
                  {pendingLeaveProps.number.to((n) => n.toFixed(0))}
                </animated.span>
                <span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-base font-bold text-gray-200">
                  /
                </span>
                <animated.span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-base font-bold text-gray-200">
                  {leaveDataProps.number.to((n) => n.toFixed(0))}
                </animated.span>
              </span>
            </div>

            <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 lg:h-16 xl:h-16 rounded bg-green-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
              <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/60 focus:ring-[#050708]/50 uppercase">
                APPROVED / Total
              </span>
              <span>
                <animated.span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-base font-bold text-gray-200">
                  {approveLeaveProps.number.to((n) => n.toFixed(0))}
                </animated.span>
                <span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-base font-bold text-gray-200">
                  /
                </span>
                <animated.span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-base font-bold text-gray-200">
                  {leaveDataProps.number.to((n) => n.toFixed(0))}
                </animated.span>
              </span>
            </div>

            <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 lg:h-16 xl:h-16 rounded bg-red-800 shadow-2xl drop-shadow-2xl shadow-orange-950">
              <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/60 focus:ring-[#050708]/50 uppercase">
                rejected / Total
              </span>
              <span>
                <animated.span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-base font-bold text-gray-200">
                  {rejectLeaveProps.number.to((n) => n.toFixed(0))}
                </animated.span>
                <span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-base font-bold text-gray-200">
                  /
                </span>
                <animated.span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-base font-bold text-gray-200">
                  {leaveDataProps.number.to((n) => n.toFixed(0))}
                </animated.span>
              </span>
            </div>
          </div>

          {/* calendar */}
          {/* <div className="block col-span-1 ">
                    <h1 className="uppercase font-serif text-sm sm:text-base lg:text-xl xl:text-2xl">Attendance</h1>
                    {monthlyAttendance.map((monthData, index) => (
                        <div key={index} className="monthly-data grid grid-cols-6 gap-4 justify-between items-center py-1 px-2 bg-gray-800 text-gray-200 rounded mb-1">
                            <span className=" col-span-3  month-name font-semibold">{monthData.month}</span>
                            <span className="col-span-3 attendance-data">
                                {monthData.present} / {monthData.total}
                            </span>
                        </div>
                    ))}
                </div> */}

          {roles === "OPS Executive" ||
          roles === "OPS EXECUTIVE" ||
          roles === "Branch Manager" ||
          roles === "BRANCH MANAGER" ||
          roles === "Executive Finanace" ||
          roles === "EXECUTIVE FINANACE" ? (
            <>
              <div className="block">
                <h1 className="uppercase font-serif text-sm sm:text-base lg:text-xl xl:text-2xl text-center">
                  NET SALES
                </h1>
                <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 lg:h-16 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                  <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                    YTD PREM.
                  </span>
                  <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-lg xl:text-base font-bold text-gray-200">
                    {totalNsellProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                  </animated.span>
                </div>

                <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 lg:h-16 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                  <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                    MTD PREM.
                  </span>
                  <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-lg xl:text-base font-bold text-gray-200">
                    {monthlyNsellProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                  </animated.span>
                </div>

                <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 lg:h-16 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                  <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                    FTD PREM.
                  </span>
                  <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-lg xl:text-base font-bold text-gray-200">
                    {dailyNsellProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                  </animated.span>
                </div>
              </div>

              <div className="block">
                <h1 className="uppercase font-serif text-sm sm:text-base lg:text-xl xl:text-2xl text-center">
                  FINAL SALES
                </h1>
                <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 lg:h-16 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                  <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                    YTD PREM.
                  </span>
                  <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-lg xl:text-base font-bold text-gray-200">
                    {totalFsellProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                  </animated.span>
                </div>

                <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 lg:h-16 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                  <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                    MTD PREM.
                  </span>
                  <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-lg xl:text-base font-bold text-gray-200">
                    {monthlyFsellProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                  </animated.span>
                </div>

                <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 lg:h-16 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                  <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                    FTD PREM.
                  </span>
                  <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-lg xl:text-base font-bold text-gray-200">
                    {dailyFsellProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                  </animated.span>
                </div>
              </div>
            </>
          ) : null}

          {/* SALARY LISTS */}
          <div className="block ">
            <h1 className="uppercase font-serif text-sm sm:text-base lg:text-xl xl:text-2xl">
              Salary
            </h1>
            {formattedsalary.map((monthData, index) => (
              <div
                key={index}
                className="flex h-8 lg:p-1 sm:h-8 md:h-8 lg:h-8 xl:h-10 monthly-data  grid-cols-1  gap-4 justify-between items-center py-1 px-2 bg-green-600 text-gray-200  rounded mb-1 shadow-2xl drop-shadow-2xl shadow-orange-950"
              >
                <span className="bg-[black]/50 py-0.5 px-2  text-xs sm:text-xs md:text-xs lg:text-base xl:text-base  font-semibold my-auto rounded">
                  {monthData.month}
                </span>
                <span className=" text-xs sm:text-xs md:text-xs lg:text-base xl:text-base me-4   font-semibold">
                  Salary
                </span>
              </div>
            ))}
          </div>
        </div>
        <>
          {roles === "OPS Executive" ||
          roles === "OPS EXECUTIVE" ||
          roles === "Branch Manager" ||
          roles === "BRANCH MANAGER" ||
          roles === "Executive Finanace" ||
          roles === "EXECUTIVE FINANACE" ? (
            <div className="grid grid-cols-4 gap-3 mb-1">
              {/* cv */}
              <div className="block">
                <h1 className="uppercase font-serif text-sm sm:text-base lg:text-xl xl:text-2xl">
                  CV
                </h1>
                <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-20 lg:p-1 lg:h-24 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                  <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                    YTD
                  </span>
                  <animated.span className="mx-1 text-xs sm:text-xs md:text-base lg:text-base xl:text-base font-bold text-gray-200">
                    {totalCvCountProps.number.to((n) => n.toFixed(0))}
                  </animated.span>
                  <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-base xl:text-base font-bold text-gray-200">
                    {totalCvPayoutProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                  </animated.span>
                </div>
                <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-20 lg:p-1 lg:h-24 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                  <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                    MTD
                  </span>
                  <animated.span className="mx-1 text-xs sm:text-xs md:text-base lg:text-base xl:text-base font-bold text-gray-200">
                    {monthlyCvCountProps.number.to((n) => n.toFixed(0))}
                  </animated.span>
                  <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-base xl:text-base font-bold text-gray-200">
                    {monthlyCvPayoutProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                  </animated.span>
                </div>
                <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-20 lg:p-1 lg:h-24 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                  <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                    FTD
                  </span>
                  <animated.span className="mx-1 text-xs sm:text-xs md:text-base lg:text-base xl:text-base font-bold text-gray-200">
                    {dailyCvCountProps.number.to((n) => n.toFixed(0))}
                  </animated.span>
                  <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-base xl:text-base font-bold text-gray-200">
                    {dailyCvPayoutProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                  </animated.span>
                </div>
              </div>

              {/* pvt-car */}
              <div className="block">
                <h1 className="uppercase font-serif text-sm sm:text-base lg:text-xl xl:text-2xl">
                  pvt-car
                </h1>
                <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-20 lg:p-1 lg:h-24 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                  <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                    YTD
                  </span>
                  <animated.span className="mx-1 text-xs sm:text-xs md:text-base lg:text-base xl:text-base font-bold text-gray-200">
                    {totalPvtCarCountProps.number.to((n) => n.toFixed(0))}
                  </animated.span>
                  <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-base xl:text-base font-bold text-gray-200">
                    {totalPvtCarPayoutProps.number.to(
                      (n) => `₹ ${n.toFixed(0)}`
                    )}
                  </animated.span>
                </div>
                <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-20 lg:p-1 lg:h-24 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                  <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                    MTD
                  </span>
                  <animated.span className="mx-1 text-xs sm:text-xs md:text-base lg:text-base xl:text-base font-bold text-gray-200">
                    {monthlyPvtCarCountProps.number.to((n) => n.toFixed(0))}
                  </animated.span>
                  <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-base xl:text-base font-bold text-gray-200">
                    {monthlyPvtCarPayoutProps.number.to(
                      (n) => `₹ ${n.toFixed(0)}`
                    )}
                  </animated.span>
                </div>
                <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-20 lg:p-1 lg:h-24 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                  <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                    FTD
                  </span>
                  <animated.span className="mx-1 text-xs sm:text-xs md:text-base lg:text-base xl:text-base font-bold text-gray-200">
                    {dailyPvtCarCountProps.number.to((n) => n.toFixed(0))}
                  </animated.span>
                  <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-base xl:text-base font-bold text-gray-200">
                    {dailyPvtCarPayoutProps.number.to(
                      (n) => `₹ ${n.toFixed(0)}`
                    )}
                  </animated.span>
                </div>
              </div>

              {/* TW */}
              <div className="block">
                <h1 className="uppercase font-serif text-sm sm:text-base lg:text-xl xl:text-2xl">
                  tw
                </h1>
                <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-20 lg:p-1 lg:h-24 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                  <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                    YTD
                  </span>
                  <animated.span className="mx-1 text-xs sm:text-xs md:text-base lg:text-base xl:text-base font-bold text-gray-200">
                    {totalTwCountProps.number.to((n) => n.toFixed(0))}
                  </animated.span>
                  <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-base xl:text-base font-bold text-gray-200">
                    {totalTwPayoutProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                  </animated.span>
                </div>
                <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-20 lg:p-1 lg:h-24 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                  <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                    MTD
                  </span>
                  <animated.span className="mx-1 text-xs sm:text-xs md:text-base lg:text-base xl:text-base font-bold text-gray-200">
                    {monthlyTwCountProps.number.to((n) => n.toFixed(0))}
                  </animated.span>
                  <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-base xl:text-base font-bold text-gray-200">
                    {monthlyTwPayoutProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                  </animated.span>
                </div>
                <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-20 lg:p-1 lg:h-24 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                  <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                    FTD
                  </span>
                  <animated.span className="mx-1 text-xs sm:text-xs md:text-base lg:text-base xl:text-base font-bold text-gray-200">
                    {dailyTwCountProps.number.to((n) => n.toFixed(0))}
                  </animated.span>
                  <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-base xl:text-base font-bold text-gray-200">
                    {dailyTwPayoutProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                  </animated.span>
                </div>
              </div>

              {/* health */}
              <div className="block">
                <h1 className="uppercase font-serif text-sm sm:text-base lg:text-xl xl:text-2xl">
                  health
                </h1>
                <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-20 lg:p-1 lg:h-24 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                  <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                    YTD
                  </span>
                  <animated.span className="mx-1 text-xs sm:text-xs md:text-base lg:text-base xl:text-base font-bold text-gray-200">
                    {totalHealthCountProps.number.to((n) => n.toFixed(0))}
                  </animated.span>
                  <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-base xl:text-base font-bold text-gray-200">
                    {totalHealthPayoutProps.number.to(
                      (n) => `₹ ${n.toFixed(0)}`
                    )}
                  </animated.span>
                </div>
                <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-20 lg:p-1 lg:h-24 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                  <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                    MTD
                  </span>
                  <animated.span className="mx-1 text-xs sm:text-xs md:text-base lg:text-base xl:text-base font-bold text-gray-200">
                    {monthlyHealthCountProps.number.to((n) => n.toFixed(0))}
                  </animated.span>
                  <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-base xl:text-base font-bold text-gray-200">
                    {monthlyHealthPayoutProps.number.to(
                      (n) => `₹ ${n.toFixed(0)}`
                    )}
                  </animated.span>
                </div>
                <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-20 lg:p-1 lg:h-24 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                  <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                    FTD
                  </span>
                  <animated.span className="mx-1 text-xs sm:text-xs md:text-base lg:text-base xl:text-base font-bold text-gray-200">
                    {dailyHealthCountProps.number.to((n) => n.toFixed(0))}
                  </animated.span>
                  <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-base xl:text-base font-bold text-gray-200">
                    {dailyHealthPayoutProps.number.to(
                      (n) => `₹ ${n.toFixed(0)}`
                    )}
                  </animated.span>
                </div>
              </div>

              {/* non-motor */}
              <div className="block">
                <h1 className="uppercase font-serif text-sm sm:text-base lg:text-xl xl:text-2xl">
                  non-motor
                </h1>
                <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-20 lg:p-1 lg:h-24 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                  <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                    YTD
                  </span>
                  <animated.span className="mx-1 text-xs sm:text-xs md:text-base lg:text-base xl:text-base font-bold text-gray-200">
                    {totalNonMotorCountProps.number.to((n) => n.toFixed(0))}
                  </animated.span>
                  <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-base xl:text-base font-bold text-gray-200">
                    {totalNonMotorPayoutProps.number.to(
                      (n) => `₹ ${n.toFixed(0)}`
                    )}
                  </animated.span>
                </div>
                <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-20 lg:p-1 lg:h-24 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                  <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                    MTD
                  </span>
                  <animated.span className="mx-1 text-xs sm:text-xs md:text-base lg:text-base xl:text-base font-bold text-gray-200">
                    {monthlyNonMotorCountProps.number.to((n) => n.toFixed(0))}
                  </animated.span>
                  <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-base xl:text-base font-bold text-gray-200">
                    {monthlyNonMotorPayoutProps.number.to(
                      (n) => `₹ ${n.toFixed(0)}`
                    )}
                  </animated.span>
                </div>
                <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-20 lg:p-1 lg:h-24 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                  <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                    FTD
                  </span>
                  <animated.span className="mx-1 text-xs sm:text-xs md:text-base lg:text-base xl:text-base font-bold text-gray-200">
                    {dailyNonMotorCountProps.number.to((n) => n.toFixed(0))}
                  </animated.span>
                  <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-base xl:text-base font-bold text-gray-200">
                    {dailyNonMotorPayoutProps.number.to(
                      (n) => `₹ ${n.toFixed(0)}`
                    )}
                  </animated.span>
                </div>
              </div>

              <div className="block">
              <h1 className="uppercase font-serif text-sm sm:text-base lg:text-xl xl:text-2xl">
                  LIFE
                </h1>
                <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-20 lg:p-1 lg:h-24 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                  <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                    YTD
                  </span>
                  <animated.span className="mx-1 text-xs sm:text-xs md:text-base lg:text-base xl:text-base font-bold text-gray-200">
                    {totalLifeCountProps.number.to((n) => n.toFixed(0))}
                  </animated.span>
                  <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-base xl:text-base font-bold text-gray-200">
                    {totalLifePayoutProps.number.to(
                      (n) => `₹ ${n.toFixed(0)}`
                    )}
                  </animated.span>
                </div>
                <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-20 lg:p-1 lg:h-24 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                  <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                    MTD
                  </span>
                  <animated.span className="mx-1 text-xs sm:text-xs md:text-base lg:text-base xl:text-base font-bold text-gray-200">
                    {monthlyLifeCountProps.number.to((n) => n.toFixed(0))}
                  </animated.span>
                  <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-base xl:text-base font-bold text-gray-200">
                    {monthlyLifePayoutProps.number.to(
                      (n) => `₹ ${n.toFixed(0)}`
                    )}
                  </animated.span>
                </div>
                <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-20 lg:p-1 lg:h-24 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                  <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                    FTD
                  </span>
                  <animated.span className="mx-1 text-xs sm:text-xs md:text-base lg:text-base xl:text-base font-bold text-gray-200">
                    {dailyLifeCountProps.number.to((n) => n.toFixed(0))}
                  </animated.span>
                  <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-base xl:text-base font-bold text-gray-200">
                    {dailyLifePayoutProps.number.to(
                      (n) => `₹ ${n.toFixed(0)}`
                    )}
                  </animated.span>
                </div>

              </div>
              <div className="block"></div>

              {/* DVR */}
              <div className="block">
                <h1 className="uppercase font-serif text-sm sm:text-base lg:text-xl xl:text-2xl">
                 DVR
                </h1>
                <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-20 lg:p-1 lg:h-24 xl:h-16 rounded bg-cyan-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                  <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                    YTD
                  </span>
                  <animated.span className="mx-1 text-xs sm:text-xs md:text-base lg:text-base xl:text-base font-bold text-gray-200">
                    {visitsDataProps.number.to((n) => n.toFixed(0))}
                  </animated.span>
                
                </div>
                <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-20 lg:p-1 lg:h-24 xl:h-16 rounded bg-cyan-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                  <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                    MTD
                  </span>
                  <animated.span className="mx-1 text-xs sm:text-xs md:text-base lg:text-base xl:text-base font-bold text-gray-200">
                    {monthlyVisitsProps.number.to((n) => n.toFixed(0))}
                  </animated.span>
                 
                </div>
                <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-20 lg:p-1 lg:h-24 xl:h-16 rounded bg-cyan-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                  <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                    FTD
                  </span>
                  <animated.span className="mx-1 text-xs sm:text-xs md:text-base lg:text-base xl:text-base font-bold text-gray-200">
                    {dailyVisitsProps.number.to((n) => n.toFixed(0))}
                  </animated.span>
                  
                </div>
              </div>
            </div>
          ) : null}
        </>
      </>
    );
}

export default EmpDashboard;