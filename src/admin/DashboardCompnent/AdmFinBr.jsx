import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState, startTransition } from "react";
import { useSpring, animated } from '@react-spring/web';
import VITE_DATA from "../../config/config.jsx";

function AdmFinBr() {
    const [allDetailsData, setAllDetailsData] = useState([]);
    const [monthlyData, setMonthlyData] = useState([]);
    const [dailyData, setDailyData] = useState([]);

    const [totalNsell, setTotalNsell] = useState(0);
    const [monthlyNsell, setMonthlyNsell] = useState(0);
    const [dailyNsell, setDailyNsell] = useState(0);

    const [totalFsell, setTotalFsell] = useState(0);
    const [monthlyFsell, setMonthlyFsell] = useState(0);
    const [dailyFsell, setDailyFsell] = useState(0);

    const [totalPayout, setTotalPayout] = useState(0);
    const [monthlyPayout, setMonthlyPayout] = useState(0);
    const [dailyPayout, setDailyPayout] = useState(0);

    const [totalBPayout, setTotalBPayout] = useState(0);
    const [monthlyBPayout, setMonthlyBPayout] = useState(0);
    const [dailyBPayout, setDailyBPayout] = useState(0);

    const [totalAPayout, setTotalAPayout] = useState(0);
    const [monthlyAPayout, setMonthlyAPayout] = useState(0);
    const [dailyAPayout, setDailyAPayout] = useState(0);

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

    const [totalAdvisors, setTotalAdvisors] = useState(0);
    const [countPatna, setCountPatna] = useState(0);
    const [countHajipur, setCountHajipur] = useState(0);
    const [countSamastipur, setCountSamastipur] = useState(0);
    const [countMuzaffarpur, setCountMuzaffarpur] = useState(0);

    const [totalLeavesCounts, setTotalLeavesCounts] = useState(0);
    const [acptLeaveCounts, setAcptLeaveCounts] = useState(0);
    const [rejLeaveCounts, setRejLeaveCounts] = useState(0);

    const [company, setCompany] = useState(0);
    const [career, setCareer] = useState(0);



    const [empCount, setEmpCount] = useState(0);
    const [activeempCount, setActiveEmpCount] = useState(0);
    const [currAttendance, setCurrAttendance] = useState(0);

    const [hajipurNetPremium, setHajipurNetPremium] = useState(0);
    const [hajipurMonthlyNetPremium, setHajipurMonthlyNetPremium] = useState(0);
    const [hajipurDailyNetPremium, setHajipurDailyNetPremium] = useState(0);

    const [patnaNetPremium, setPatnaNetPremium] = useState(0);
    const [patnaMonthlyNetPremium, setPatnaMonthlyNetPremium] = useState(0);
    const [patnaDailyNetPremium, setPatnaDailyNetPremium] = useState(0);

    const [samastipurNetPremium, setSamastipurNetPremium] = useState(0);
    const [samastipurMonthlyNetPremium, setSamastipurMonthlyNetPremium] = useState(0);
    const [samastipurDailyNetPremium, setSamastipurDailyNetPremium] = useState(0);

    const [muzaffarpurNetPremium, setMuzaffarpurNetPremium] = useState(0);
    const [muzaffarpurMonthlyNetPremium, setMuzaffarpurMonthlyNetPremium] = useState(0);
    const [muzaffarpurDailyNetPremium, setMuzaffarpurDailyNetPremium] = useState(0);

    const [employees, setEmployees] = useState([]);
    const [employeePolicyCounts, setEmployeePolicyCounts] = useState({});

    const hajipurNetPremiumProps = useSpring({ number: hajipurNetPremium, from: { number: 0 } });
    const hajipurMonthlyNetPremiumProps = useSpring({ number: hajipurMonthlyNetPremium, from: { number: 0 } });
    const hajipurDailyNetPremiumProps = useSpring({ number: hajipurDailyNetPremium, from: { number: 0 } });

    const patnaNetPremiumProps = useSpring({ number: patnaNetPremium, from: { number: 0 } });
    const patnaMonthlyNetPremiumProps = useSpring({ number: patnaMonthlyNetPremium, from: { number: 0 } });
    const patnaDailyNetPremiumProps = useSpring({ number: patnaDailyNetPremium, from: { number: 0 } });

    const samastipurNetPremiumProps = useSpring({ number: samastipurNetPremium, from: { number: 0 } });
    const samastipurMonthlyNetPremiumProps = useSpring({ number: samastipurMonthlyNetPremium, from: { number: 0 } });
    const samastipurDailyNetPremiumProps = useSpring({ number: samastipurDailyNetPremium, from: { number: 0 } });

    const muzaffarpurNetPremiumProps = useSpring({ number: muzaffarpurNetPremium, from: { number: 0 } });
    const muzaffarpurMonthlyNetPremiumProps = useSpring({ number: muzaffarpurMonthlyNetPremium, from: { number: 0 } });
    const muzaffarpurDailyNetPremiumProps = useSpring({ number: muzaffarpurDailyNetPremium, from: { number: 0 } });

    const allDetailsProps = useSpring({ number: allDetailsData.length, from: { number: 0 } });
    const monthlyProps = useSpring({ number: monthlyData.length, from: { number: 0 } });
    const dailyProps = useSpring({ number: dailyData.length, from: { number: 0 } });

    const totalPayoutProps = useSpring({ number: totalPayout, from: { number: 0 } });
    const monthlyPayoutProps = useSpring({ number: monthlyPayout, from: { number: 0 } });
    const dailyPayoutProps = useSpring({ number: dailyPayout, from: { number: 0 } });

    const totalPayoutBProps = useSpring({ number: totalBPayout, from: { number: 0 } });
    const monthlyPayoutBProps = useSpring({ number: monthlyBPayout, from: { number: 0 } });
    const dailyPayoutBProps = useSpring({ number: dailyBPayout, from: { number: 0 } });

    const totalPayoutAProps = useSpring({ number: totalAPayout, from: { number: 0 } });
    const monthlyPayoutAProps = useSpring({ number: monthlyAPayout, from: { number: 0 } });
    const dailyPayoutAProps = useSpring({ number: dailyAPayout, from: { number: 0 } });

    const totalCvPayoutProps = useSpring({ number: totalCvPayout, from: { number: 0 } });
    const monthlyCvPayoutProps = useSpring({ number: monthlyCvPayout, from: { number: 0 } });
    const dailyCvPayoutProps = useSpring({ number: dailyCvPayout, from: { number: 0 } });
    const totalCvCountProps = useSpring({ number: totalCvCount, from: { number: 0 } });
    const monthlyCvCountProps = useSpring({ number: monthlyCvCount, from: { number: 0 } });
    const dailyCvCountProps = useSpring({ number: dailyCvCount, from: { number: 0 } });

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

    const totalNsellProps = useSpring({ number: totalNsell, from: { number: 0 } });
    const monthlyNsellProps = useSpring({ number: monthlyNsell, from: { number: 0 } });
    const dailyNsellProps = useSpring({ number: dailyNsell, from: { number: 0 } });
    const totalFsellProps = useSpring({ number: totalFsell, from: { number: 0 } });
    const monthlyFsellProps = useSpring({ number: monthlyFsell, from: { number: 0 } });
    const dailyFsellProps = useSpring({ number: dailyFsell, from: { number: 0 } });

    const totalAdvisorsProps = useSpring({ number: totalAdvisors, from: { number: 0 } });
    const countHajipurProps = useSpring({ number: countHajipur, from: { number: 0 } });
    const countPatnaProps = useSpring({ number: countPatna, from: { number: 0 } });
    const countMuzaffarpurProps = useSpring({ number: countMuzaffarpur, from: { number: 0 } });
    const countSamastipurProps = useSpring({ number: countSamastipur, from: { number: 0 } });

    const companyProps = useSpring({ number: company, from: { number: 0 } });
    const careerProps = useSpring({ number: career, from: { number: 0 } });
    const currAttendanceProps = useSpring({ number: currAttendance, from: { number: 0 } });
    const activeempCountProps = useSpring({ number: activeempCount, from: { number: 0 } });
    const empCountProps = useSpring({ number: empCount, from: { number: 0 } });

    const totalLeavesCountsProps = useSpring({ number: totalLeavesCounts, from: { number: 0 } });
    const acptLeaveCountsProps = useSpring({ number: acptLeaveCounts, from: { number: 0 } });
    const trejLeaveCountsProps = useSpring({ number: rejLeaveCounts, from: { number: 0 } });

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Not Authorized yet.. Try again! ");
        } else {
            // Fetch leave types
            axios
                .get(`${VITE_DATA}/users/career/lists`, {
                    headers: {
                        Authorization: `${token}`, // Send the token in the Authorization header
                    },
                })
                .then((response) => {
                    const car = response.data
                    setCareer(car.length);
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
                .get(`${VITE_DATA}/api/branch-list`, {
                    headers: {
                        Authorization: `${token}`, // Send the token in the Authorization header
                    },
                })
                .then((response) => {
                    const allCompanyData = response.data;
                    setCompany(allCompanyData.length);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);

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
                    setEmpCount(empLists.length);
                    const activeEmp = empLists.filter(emp => emp.flags === true);
                    setActiveEmpCount(activeEmp.length);

                    let totalPresentCount = 0;
                    // Count the current day present employees for each active employee   
                    activeEmp.forEach(emp => {
                        const todayEntries = emp.employeeDetails.filter(item => {
                            return item.status === "present" && item.date === currentDateString;
                        });
                        // Increment totalPresentCount by the number of today's present entries
                        totalPresentCount += todayEntries.length;
                    });
                    setCurrAttendance(totalPresentCount);


                    // Calculate total leaves across all employees
                    let totalLeaveCount = 0;
                    let acptCounts = 0;
                    let rejCounts = 0;

                    activeEmp.forEach(emp => {
                        if (emp.leaveDetails && Array.isArray(emp.leaveDetails)) {
                            emp.leaveDetails.forEach(leave => {
                                // Increment totalLeaveCount for each leave record
                                totalLeaveCount++;
                                if (leave.status === "approved") { // Adjust condition as per your leave status logic
                                    acptCounts++; // Ensure counts is a number and add to totalLeaveCount
                                } else if (leave.status === "rejected") {
                                    rejCounts++;
                                }
                            });
                        }
                    });
                    startTransition(() => {
                        setTotalLeavesCounts(totalLeaveCount);
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
        const fetchData = async () => {
            const token = sessionStorage.getItem("token");
            if (!token) {
                toast.error("Not Authorized yet.. Try again!");
                return;
            }
            try {
                const response = await axios.get(`${VITE_DATA}/advisor/lists`, {
                    headers: {
                        Authorization: token, // Send the token directly
                    },
                });
                const allAdvData = response.data;
                // Count all advisors
                const total = allAdvData.length;
                setTotalAdvisors(total);
                // Filter advisors by branch
                const patnaAdvisors = allAdvData.filter(advisor => advisor.branch[0] === 'PATNA');
                const hajipurAdvisors = allAdvData.filter(advisor => advisor.branch[0] === 'HAJIPUR');
                const samastipurAdvisors = allAdvData.filter(advisor => advisor.branch[0] === 'SAMASTIPUR');
                const muzaffarpurAdvisors = allAdvData.filter(advisor => advisor.branch[0] === 'MUZAFFARPUR');
                // Count advisors by branch
                startTransition(() => {
                    setCountPatna(patnaAdvisors.length);
                    setCountHajipur(hajipurAdvisors.length);
                    setCountSamastipur(samastipurAdvisors.length);
                    setCountMuzaffarpur(muzaffarpurAdvisors.length);
                })
            } catch (error) {
                console.error("Fetching advisor data caught an error", error);
            }
        };
        fetchData();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            const token = sessionStorage.getItem("token");
            if (!token) {
                toast.error("Not Authorized yet.. Try again!");
            } else {
                try {
                    const response = await axios.get(`${VITE_DATA}/alldetails/show/view`, {
                        headers: {
                            Authorization: `${token}`, // Send the token in the Authorization header
                        },
                    });

                    const allData = response.data;

                    const currentMonth = new Date().getMonth() + 1; // getMonth() is zero-based
                    const currentDay = new Date().getDate();
                    const currentYear = new Date().getFullYear();


                    const filteredYearlyData = allData.filter(item => {
                        const itemDate = new Date(item.entryDate);
                        const itemYear = itemDate.getFullYear();
                        return itemYear === currentYear;
                    });

                    const filteredMonthlyData = allData.filter(item => {
                        const itemDate = new Date(item.entryDate);
                        const itemMonth = itemDate.getMonth() + 1;
                        const itemYear = itemDate.getFullYear();
                        return itemMonth === currentMonth && itemYear === currentYear;
                    });

                    const filteredDailyData = allData.filter(item => {
                        const itemDate = new Date(item.entryDate);
                        const itemDay = itemDate.getDate();
                        const itemMonth = itemDate.getMonth() + 1;
                        const itemYear = itemDate.getFullYear();
                        return itemDay === currentDay && itemMonth === currentMonth && itemYear === currentYear;
                    });

                    const calculateTotals = (filteredData, segment) => {
                        const filteredSegmentData = filteredData.filter(item => item.segment === segment);
                        const totalPayout = filteredSegmentData.reduce((sum, item) => parseFloat(sum + item.netPremium), 0);
                        const totalCount = filteredSegmentData.length;
                        return { totalPayout, totalCount };
                    };

                    const calculateBranchTotals = (filteredData, branch) => {
                        const branchData = filteredData.filter(item => item.branch === branch);
                        const totalPayout = branchData.reduce((sum, item) => sum + parseFloat(item.netPremium || 0), 0);
                        return totalPayout;
                    };

                    const calculateMonthlyBranchTotals = (filteredData, branch) => {
                        const currentMonth = new Date().getMonth() + 1;
                        const branchData = filteredData.filter(item => {
                            const itemDate = new Date(item.entryDate);
                            const itemMonth = itemDate.getMonth() + 1;
                            return item.branch === branch && itemMonth === currentMonth;
                        });
                        const totalPayout = branchData.reduce((sum, item) => sum + parseFloat(item.netPremium || 0), 0);
                        return totalPayout;
                    };

                    const calculateDailyBranchTotals = (filteredData, branch) => {
                        const currentDay = new Date().getDate();
                        const currentMonth = new Date().getMonth() + 1;
                        const branchData = filteredData.filter(item => {
                            const itemDate = new Date(item.entryDate);
                            const itemDay = itemDate.getDate();
                            const itemMonth = itemDate.getMonth() + 1;
                            return item.branch === branch && itemDay === currentDay && itemMonth === currentMonth;
                        });
                        const totalPayout = branchData.reduce((sum, item) => sum + parseFloat(item.netPremium || 0), 0);
                        return totalPayout;
                    };

                    // Extract unique employees (case insensitive), excluding empty staffName
                    const uniqueEmployees = [...new Set(allData
                        .filter(item => item.staffName.trim() !== '')
                        .map(item => item.staffName.toLowerCase()))];
                    setEmployees(uniqueEmployees);
                    const newEmployeePolicyCounts = uniqueEmployees.reduce((acc, employee) => {
                        const employeeData = allData.filter(item => item.staffName.toLowerCase() === employee && item.empTime);

                        acc[employee] = {
                            ytd: employeeData.filter(item => new Date(item.entryDate).getFullYear() === currentYear).length,
                            mtd: employeeData.filter(item => {
                                const itemDate = new Date(item.entryDate);
                                return itemDate.getMonth() + 1 === currentMonth && itemDate.getFullYear() === currentYear;
                            }).length,
                            daily: employeeData.filter(item => {
                                const itemDate = new Date(item.entryDate);
                                return itemDate.getDate() === currentDay && itemDate.getMonth() + 1 === currentMonth && itemDate.getFullYear() === currentYear;
                            }).length,
                        };
                        return acc;
                    }, {});


                    const hajipurNetPremium = calculateBranchTotals(filteredYearlyData, 'HAJIPUR');
                    const patnaNetPremium = calculateBranchTotals(filteredYearlyData, 'PATNA');
                    const samastipurNetPremium = calculateBranchTotals(filteredYearlyData, 'SAMASTIPUR');
                    const muzaffarpurNetPremium = calculateBranchTotals(filteredYearlyData, 'MUZAFFARPUR');

                    const hajipurMonthlyNetPremium = calculateMonthlyBranchTotals(filteredMonthlyData, 'HAJIPUR');
                    const patnaMonthlyNetPremium = calculateMonthlyBranchTotals(filteredMonthlyData, 'PATNA');
                    const samastipurMonthlyNetPremium = calculateMonthlyBranchTotals(filteredMonthlyData, 'SAMASTIPUR');
                    const muzaffarpurMonthlyNetPremium = calculateMonthlyBranchTotals(filteredMonthlyData, 'MUZAFFARPUR');

                    const hajipurDailyNetPremium = calculateDailyBranchTotals(filteredDailyData, 'HAJIPUR');
                    const patnaDailyNetPremium = calculateDailyBranchTotals(filteredDailyData, 'PATNA');
                    const samastipurDailyNetPremium = calculateDailyBranchTotals(filteredDailyData, 'SAMASTIPUR');
                    const muzaffarpurDailyNetPremium = calculateDailyBranchTotals(filteredDailyData, 'MUZAFFARPUR');


                    const cvYearlyTotals = calculateTotals(filteredYearlyData, 'C V');
                    const cvMonthlyTotals = calculateTotals(filteredMonthlyData, 'C V');
                    const cvDailyTotals = calculateTotals(filteredDailyData, 'C V');

                    const pvtCarYearlyTotals = calculateTotals(filteredYearlyData, 'PVT-CAR');
                    const pvtCarMonthlyTotals = calculateTotals(filteredMonthlyData, 'PVT-CAR');
                    const pvtCarDailyTotals = calculateTotals(filteredDailyData, 'PVT-CAR');

                    const twYearlyTotals = calculateTotals(filteredYearlyData, 'TW');
                    const twMonthlyTotals = calculateTotals(filteredMonthlyData, 'TW');
                    const twDailyTotals = calculateTotals(filteredDailyData, 'TW');

                    const healthYearlyTotals = calculateTotals(filteredYearlyData, 'HEALTH');
                    const healthMonthlyTotals = calculateTotals(filteredMonthlyData, 'HEALTH');
                    const healthDailyTotals = calculateTotals(filteredDailyData, 'HEALTH');

                    const nonMotorYearlyTotals = calculateTotals(filteredYearlyData, 'NON-MOTOR');
                    const nonMotorMonthlyTotals = calculateTotals(filteredMonthlyData, 'NON-MOTOR');
                    const nonMotorDailyTotals = calculateTotals(filteredDailyData, 'NON-MOTOR');

                    // NET SALES CALCULATION 
                    const totalnetPremium = filteredYearlyData.reduce((sum, item) => sum + parseFloat(item.netPremium || 0), 0);
                    const monthlynetPremium = filteredMonthlyData.reduce((sum, item) => sum + parseFloat(item.netPremium || 0), 0);
                    const dailynetPremium = filteredDailyData.reduce((sum, item) => sum + parseFloat(item.netPremium || 0), 0);

                    // final SALES CALCULATION 
                    const totalfinalEntryFields = filteredYearlyData.reduce((sum, item) => sum + item.finalEntryFields, 0);
                    const monthlyfinalEntryFields = filteredMonthlyData.reduce((sum, item) => sum + item.finalEntryFields, 0);
                    const dailyfinalEntryFields = filteredDailyData.reduce((sum, item) => sum + item.finalEntryFields, 0);

                    // COMPANY CALCULATION 
                    const totalPayout = filteredYearlyData.reduce((sum, item) => sum + item.companyPayout, 0);
                    const monthlyPayout = filteredMonthlyData.reduce((sum, item) => sum + item.companyPayout, 0);
                    const dailyPayout = filteredDailyData.reduce((sum, item) => sum + item.companyPayout, 0);

                    // BRANCH CALCULATION
                    const totalBPayout = filteredYearlyData.reduce((sum, item) => sum + item.branchPayout, 0);
                    const monthlyBPayout = filteredMonthlyData.reduce((sum, item) => sum + item.branchPayout, 0);
                    const dailyBPayout = filteredDailyData.reduce((sum, item) => sum + item.branchPayout, 0);

                    // ADVISOR CALCULATION
                    const totalAPayout = filteredYearlyData.reduce((sum, item) => sum + item.advisorPayoutAmount, 0);
                    const monthlyAPayout = filteredMonthlyData.reduce((sum, item) => sum + item.advisorPayoutAmount, 0);
                    const dailyAPayout = filteredDailyData.reduce((sum, item) => sum + item.advisorPayoutAmount, 0);

                    // // CV Segment Payout Calculation
                    // const totalCvPayout = filteredYearlyCvData.reduce((sum, item) => sum + item.companyPayout, 0);
                    // const monthlyCvPayout = filteredMonthlyCvData.reduce((sum, item) => sum + item.companyPayout, 0);
                    // const dailyCvPayout = filteredDailyCvData.reduce((sum, item) => sum + item.companyPayout, 0);

                    startTransition(() => {
                        setAllDetailsData(allData);
                        setMonthlyData(filteredMonthlyData);
                        setDailyData(filteredDailyData);
                        setTotalNsell(totalnetPremium);
                        setMonthlyNsell(monthlynetPremium);
                        setDailyNsell(dailynetPremium);
                        setTotalFsell(totalfinalEntryFields);
                        setMonthlyFsell(monthlyfinalEntryFields);
                        setDailyFsell(dailyfinalEntryFields);
                        setTotalPayout(totalPayout);
                        setMonthlyPayout(monthlyPayout);
                        setDailyPayout(dailyPayout);
                        setTotalBPayout(totalBPayout);
                        setMonthlyBPayout(monthlyBPayout);
                        setDailyBPayout(dailyBPayout);
                        setTotalAPayout(totalAPayout);
                        setMonthlyAPayout(monthlyAPayout);
                        setDailyAPayout(dailyAPayout);
                        setTotalCvPayout(totalCvPayout);
                        setMonthlyCvPayout(monthlyCvPayout);
                        setDailyCvPayout(dailyCvPayout);
                        setTotalCvPayout(cvYearlyTotals.totalPayout);
                        setMonthlyCvPayout(cvMonthlyTotals.totalPayout);
                        setDailyCvPayout(cvDailyTotals.totalPayout);
                        setTotalCvCount(cvYearlyTotals.totalCount);
                        setMonthlyCvCount(cvMonthlyTotals.totalCount);
                        setDailyCvCount(cvDailyTotals.totalCount);

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

                        setHajipurNetPremium(hajipurNetPremium);
                        setPatnaNetPremium(patnaNetPremium);
                        setSamastipurNetPremium(samastipurNetPremium);
                        setMuzaffarpurNetPremium(muzaffarpurNetPremium);

                        setHajipurMonthlyNetPremium(hajipurMonthlyNetPremium);
                        setPatnaMonthlyNetPremium(patnaMonthlyNetPremium);
                        setSamastipurMonthlyNetPremium(samastipurMonthlyNetPremium);
                        setMuzaffarpurMonthlyNetPremium(muzaffarpurMonthlyNetPremium);

                        setHajipurDailyNetPremium(hajipurDailyNetPremium);
                        setPatnaDailyNetPremium(patnaDailyNetPremium);
                        setSamastipurDailyNetPremium(samastipurDailyNetPremium);
                        setMuzaffarpurDailyNetPremium(muzaffarpurDailyNetPremium);

                        setEmployeePolicyCounts(newEmployeePolicyCounts);
                    });
                } catch (error) {
                    console.error("Policy calculation by ID caught an error", error);
                }
            }
        };

        fetchData();
    }, [totalCvPayout, monthlyCvPayout, dailyCvPayout]);

    return (
        <section className="bg-slate-300 p-3">
            <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="flex xl:flex lg:flex md:flex sm:flex items-center justify-between  h-16 rounded-lg bg-cyan-600 shadow-2xl drop-shadow-2xl shadow-blue-650">
                    <span className="sm:block mx-1 sm:mx-2 lg:mx-3 xl:mx-6  px-2 py-1 rounded-lg text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg font-semibold text-white  focus:ring-[#050708]/50">YTD</span>
                    <animated.span className="mx-1 sm:mx-2 lg:mx-3 xl:mx-6 text-xs sm:text-sm md:text-sm lg:text-base xl:text-xl font-bold text-gray-50">
                        {allDetailsProps.number.to((n) => n.toFixed(0))}
                    </animated.span>
                </div>

                <div className="flex xl:flex lg:flex md:flex sm:flex i items-center justify-between h-16 rounded-lg bg-blue-600 shadow-2xl drop-shadow-2xl shadow-blue-650">
                    <span className="sm:block mx-1 sm:mx-2 lg:mx-3 xl:mx-6  px-2 py-1 rounded-lg text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg font-semibold text-white  focus:ring-[#050708]/50 xl:whitespace-nowrap">MTD</span>
                    <animated.span className="mx-1 sm:mx-2 lg:mx-3 xl:mx-6 text-xs sm:text-sm md:text-sm lg:text-base xl:text-xl font-bold text-gray-50">
                        {monthlyProps.number.to((n) => n.toFixed(0))}
                    </animated.span>
                </div>

                <div className="flex xl:flex lg:flex md:flex sm:flex  items-center justify-between  h-16 rounded-lg bg-sky-500 shadow-2xl drop-shadow-2xl shadow-blue-650">
                    <span className="sm:block mx-1 sm:mx-2 lg:mx-3 xl:mx-6  px-2 py-1 rounded-lg text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg font-semibold text-white  focus:ring-[#050708]/50">FTD</span>
                    <animated.span className="mx-1 sm:mx-2 lg:mx-3 xl:mx-6text-xs sm:text-sm md:text-sm lg:text-base xl:text-xl font-bold text-gray-50">
                        {dailyProps.number.to((n) => n.toFixed(0))}
                    </animated.span>
                </div>
            </div>




            {/* sales */}
            <div className="grid grid-cols-6 gap-3 mb-5 ">
                {/* part 1 net sales  */}
                <div className="block shadow-2xl drop-shadow-2xl shadow-blue-650">
                    <h1 className="uppercase font-serif text-xs sm:text-sm md:text-sm lg:text-base xl:text-xl text-center">NET SALES</h1>
                    <div className=" grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 sm:h-16 lg:h-12 xl:h-12  rounded-t-lg bg-cyan-600 ">
                        <span className="sm:block mx-1 text-white sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg font-semibold   focus:ring-[#050708]/50 uppercase">
                            YTD
                        </span>
                        <animated.span className="whitespace-nowrap mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold text-gray-50">
                            {totalNsellProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className=" grid xl:flex lg:grid text-white md:grid sm:grid items-center xl:justify-between h-16 sm:h-16 lg:p-1 lg:h-12 xl:h-12   bg-blue-600 ">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg  text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg  font-semibold   focus:ring-[#050708]/50 uppercase">
                            MTD
                        </span>
                        <animated.span className="whitespace-nowrap mx-1 sm:mx-2 lg:mx-1 xl:mx-2  text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold text-gray-50">
                            {monthlyNsellProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className=" grid xl:flex lg:grid text-white md:grid sm:grid items-center xl:justify-between h-16 sm:h-16 lg:p-1 lg:h-16 xl:h-12 rounded-b-lg bg-sky-500 ">
                        <span className="sm:block mx-1 text-white sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg font-semibold   focus:ring-[#050708]/50 uppercase">
                            FTD
                        </span>
                        <animated.span className="whitespace-nowrap mx-1 sm:mx-2 lg:mx-1 xl:mx-2  text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold text-gray-50">
                            {dailyNsellProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>
                </div>


                {/* FINAL sales  grid */}
                <div className="block shadow-2xl drop-shadow-2xl shadow-blue-650">
                    <h1 className="uppercase font-serif text-xs sm:text-sm md:text-sm lg:text-base xl:text-xl text-center">FINAL SALES</h1>
                    <div className=" grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 sm:h-16 lg:h-12 xl:h-12  rounded-t-lg bg-cyan-600 ">
                        <span className="sm:block mx-1 text-white sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg font-semibold   focus:ring-[#050708]/50 uppercase">
                            YTD
                        </span>
                        <animated.span className="whitespace-nowrap mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold text-gray-50">
                            {totalFsellProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className=" grid xl:flex lg:grid text-white md:grid sm:grid items-center xl:justify-between h-16 sm:h-16 lg:p-1 lg:h-12 xl:h-12   bg-blue-600 ">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg  text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg  font-semibold   focus:ring-[#050708]/50 uppercase">
                            MTD
                        </span>
                        <animated.span className="whitespace-nowrap mx-1 sm:mx-2 lg:mx-1 xl:mx-2  text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold text-gray-50">
                            {monthlyFsellProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className=" grid xl:flex lg:grid text-white md:grid sm:grid items-center xl:justify-between h-16 sm:h-16 lg:p-1 lg:h-16 xl:h-12 rounded-b-lg bg-sky-500 ">
                        <span className="sm:block mx-1 text-white sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg font-semibold   focus:ring-[#050708]/50 uppercase">
                            FTD
                        </span>
                        <animated.span className="whitespace-nowrap mx-1 sm:mx-2 lg:mx-1 xl:mx-2  text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold text-gray-50">
                            {dailyFsellProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>
                </div>


                <div className="block shadow-2xl drop-shadow-2xl shadow-blue-650">
                    <h1 className="uppercase font-serif text-xs sm:text-sm md:text-sm lg:text-base xl:text-xl text-center">HAJIPUR</h1>
                    <div className=" grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 sm:h-16 lg:h-12 xl:h-12  rounded-t-lg bg-cyan-600 ">
                        <span className="sm:block mx-1 text-white sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg font-semibold   focus:ring-[#050708]/50 uppercase">
                            YTD
                        </span>
                        <animated.span className="whitespace-nowrap mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold text-gray-50">
                            {hajipurNetPremiumProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className=" grid xl:flex lg:grid text-white md:grid sm:grid items-center xl:justify-between h-16 sm:h-16 lg:p-1 lg:h-12 xl:h-12   bg-blue-600 ">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg  text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg  font-semibold   focus:ring-[#050708]/50 uppercase">
                            MTD
                        </span>
                        <animated.span className="whitespace-nowrap mx-1 sm:mx-2 lg:mx-1 xl:mx-2  text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold text-gray-50">
                            {hajipurMonthlyNetPremiumProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className=" grid xl:flex lg:grid text-white md:grid sm:grid items-center xl:justify-between h-16 sm:h-16 lg:p-1 lg:h-16 xl:h-12 rounded-b-lg bg-sky-500 ">
                        <span className="sm:block mx-1 text-white sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg font-semibold   focus:ring-[#050708]/50 uppercase">
                            FTD
                        </span>
                        <animated.span className="whitespace-nowrap mx-1 sm:mx-2 lg:mx-1 xl:mx-2  text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold text-gray-50">
                            {hajipurDailyNetPremiumProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>
                </div>

                {/* PATNA */}
                <div className="block shadow-2xl drop-shadow-2xl shadow-blue-650">
                    <h1 className="uppercase font-serif text-xs sm:text-sm md:text-sm lg:text-base xl:text-xl text-center">PATNA</h1>
                    <div className=" grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 sm:h-16 lg:h-12 xl:h-12  rounded-t-lg bg-cyan-600">
                        <span className="sm:block mx-1 text-white sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg font-semibold   focus:ring-[#050708]/50 uppercase">
                            YTD
                        </span>
                        <animated.span className="whitespace-nowrap mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold text-gray-50">
                            {patnaNetPremiumProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className=" grid xl:flex lg:grid text-white md:grid sm:grid items-center xl:justify-between h-16 sm:h-16 lg:p-1 lg:h-12 xl:h-12   bg-blue-600 ">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg  text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg  font-semibold   focus:ring-[#050708]/50 uppercase">
                            MTD
                        </span>
                        <animated.span className="whitespace-nowrap mx-1 sm:mx-2 lg:mx-1 xl:mx-2  text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold text-gray-50">
                            {patnaMonthlyNetPremiumProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className=" grid xl:flex lg:grid text-white md:grid sm:grid items-center xl:justify-between h-16 sm:h-16 lg:p-1 lg:h-16 xl:h-12 rounded-b-lg bg-sky-500 ">
                        <span className="sm:block mx-1 text-white sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg font-semibold   focus:ring-[#050708]/50 uppercase">
                            FTD
                        </span>
                        <animated.span className="whitespace-nowrap mx-1 sm:mx-2 lg:mx-1 xl:mx-2  text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold text-gray-50">
                            {patnaDailyNetPremiumProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>
                </div>

                {/* SAMASTIPUR */}
                <div className="block shadow-2xl drop-shadow-2xl shadow-blue-650">
                    <h1 className="uppercase font-serif text-xs sm:text-sm md:text-sm lg:text-base xl:text-xl text-center">SAMASTIPUR</h1>
                    <div className=" grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 sm:h-16 lg:h-12 xl:h-12  rounded-t-lg bg-cyan-600 ">
                        <span className="sm:block mx-1 text-white sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg font-semibold   focus:ring-[#050708]/50 uppercase">
                            YTD
                        </span>
                        <animated.span className="whitespace-nowrap mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold text-gray-50">
                            {samastipurNetPremiumProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className=" grid xl:flex lg:grid text-white md:grid sm:grid items-center xl:justify-between h-16 sm:h-16 lg:p-1 lg:h-12 xl:h-12   bg-blue-600 ">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg  text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg  font-semibold   focus:ring-[#050708]/50 uppercase">
                            MTD
                        </span>
                        <animated.span className="whitespace-nowrap mx-1 sm:mx-2 lg:mx-1 xl:mx-2  text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold text-gray-50">
                            {samastipurMonthlyNetPremiumProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className=" grid xl:flex lg:grid text-white md:grid sm:grid items-center xl:justify-between h-16 sm:h-16 lg:p-1 lg:h-16 xl:h-12 rounded-b-lg bg-sky-500 ">
                        <span className="sm:block mx-1 text-white sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg font-semibold   focus:ring-[#050708]/50 uppercase">
                            FTD
                        </span>
                        <animated.span className="whitespace-nowrap mx-1 sm:mx-2 lg:mx-1 xl:mx-2  text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold text-gray-50">
                            {samastipurDailyNetPremiumProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>
                </div>

                {/* MUZAFFARPUR */}
                <div className="block shadow-2xl drop-shadow-2xl shadow-blue-650">
                    <h1 className="uppercase font-serif text-xs sm:text-sm md:text-sm lg:text-base xl:text-xl text-center">MUZAFFARPUR</h1>
                    <div className=" grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 sm:h-16 lg:h-12 xl:h-12  rounded-t-lg bg-cyan-600 ">
                        <span className="sm:block mx-1 text-white sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg font-semibold   focus:ring-[#050708]/50 uppercase">
                            YTD
                        </span>
                        <animated.span className="whitespace-nowrap mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold text-gray-50">
                            {muzaffarpurNetPremiumProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className=" grid xl:flex lg:grid text-white md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 sm:h-16 lg:h-12 xl:h-12   bg-blue-600 ">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg  text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg  font-semibold   focus:ring-[#050708]/50 uppercase">
                            MTD
                        </span>
                        <animated.span className="whitespace-nowrap mx-1 sm:mx-2 lg:mx-1 xl:mx-2  text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold text-gray-50">
                            {muzaffarpurMonthlyNetPremiumProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className=" grid xl:flex lg:grid text-white md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 sm:h-16 lg:h-16 xl:h-12 rounded-b-lg bg-sky-500 ">
                        <span className="sm:block mx-1 text-white sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg font-semibold   focus:ring-[#050708]/50 uppercase">
                            FTD
                        </span>
                        <animated.span className="whitespace-nowrap mx-1 sm:mx-2 lg:mx-1 xl:mx-2  text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold text-gray-50">
                            {muzaffarpurDailyNetPremiumProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>
                </div>

            </div>


            {/* SEGMENTS */}
            <div className="grid grid-cols-5 gap-3 mb-5">
                {/* cv */}
                <div className="block shadow-2xl drop-shadow-2xl shadow-blue-650">
                    <h1 className="uppercase font-serif text-xs sm:text-sm md:text-sm lg:text-base xl:text-xl text-center">CV </h1>
                    <div className=" grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 sm:h-20 lg:h-20 xl:h-12  rounded-t-lg bg-cyan-600  ">
                        <span className="sm:block mx-1 text-white sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg font-semibold   focus:ring-[#050708]/50 uppercase">
                            YTD
                        </span>
                        <animated.span className="whitespace-nowrap mx-1 sm:mx-2 lg:mx-1 xl:mx-2  text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold text-gray-50">
                            {totalCvCountProps.number.to((n) => n.toFixed(0))}
                        </animated.span>
                        <animated.span className="whitespace-nowrap mx-1 sm:mx-2 lg:mx-1 xl:mx-2  text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold text-gray-50">
                            {totalCvPayoutProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className=" grid xl:flex lg:grid text-white md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 sm:h-20 lg:h-20 xl:h-12   bg-blue-600 ">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg  text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg  font-semibold   focus:ring-[#050708]/50 uppercase">
                            MTD
                        </span>
                        <animated.span className="whitespace-nowrap mx-1 sm:mx-2 lg:mx-1 xl:mx-2  text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold text-gray-50">
                            {monthlyCvCountProps.number.to((n) => n.toFixed(0))}
                        </animated.span>
                        <animated.span className="whitespace-nowrap mx-1 sm:mx-2 lg:mx-1 xl:mx-2  text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold text-gray-50">
                            {monthlyCvPayoutProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className=" grid xl:flex lg:grid text-white md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 sm:h-20 lg:h-20 xl:h-12 rounded-b-lg bg-sky-500 ">
                        <span className="sm:block mx-1 text-white sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg font-semibold   focus:ring-[#050708]/50 uppercase">
                            FTD
                        </span>
                        <animated.span className="mx-1 text-xs sm:text-xs md:text-sm lg:text-basese xl:text-lg font-bold text-gray-50">
                            {dailyCvCountProps.number.to((n) => n.toFixed(0))}
                        </animated.span>
                        <animated.span className="whitespace-nowrap mx-1 sm:mx-2 lg:mx-1 xl:mx-2  text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold text-gray-50">
                            {dailyCvPayoutProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>
                </div>


                {/* pvt-car */}
                <div className="block shadow-2xl drop-shadow-2xl shadow-blue-650">
                    <h1 className="uppercase font-serif text-xs sm:text-sm md:text-sm lg:text-base xl:text-xl text-center">pvt-car </h1>
                    <div className=" grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 sm:h-20 lg:h-20 xl:h-12  rounded-t-lg bg-cyan-600  ">
                        <span className="sm:block mx-1 text-white sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg font-semibold   focus:ring-[#050708]/50 uppercase">
                            YTD
                        </span>
                        <animated.span className="mx-1 text-xs sm:text-xs md:text-sm lg:text-basese xl:text-lg font-bold text-gray-50">
                            {totalPvtCarCountProps.number.to((n) => n.toFixed(0))}
                        </animated.span>
                        <animated.span className="whitespace-nowrap mx-1 sm:mx-2 lg:mx-1 xl:mx-2  text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold text-gray-50">
                            {totalPvtCarPayoutProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className=" grid xl:flex lg:grid text-white md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 sm:h-20 lg:h-20 xl:h-12   bg-blue-600 ">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg  text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg  font-semibold   focus:ring-[#050708]/50 uppercase">
                            MTD
                        </span>
                        <animated.span className="mx-1  text-xs sm:text-xs md:text-sm lg:text-basese xl:text-lg font-bold text-gray-50">
                            {monthlyPvtCarCountProps.number.to((n) => n.toFixed(0))}
                        </animated.span>
                        <animated.span className="whitespace-nowrap mx-1 sm:mx-2 lg:mx-1 xl:mx-2  text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold text-gray-50">
                            {monthlyPvtCarPayoutProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className=" grid xl:flex lg:grid text-white md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 sm:h-20 lg:h-20 xl:h-12 rounded-b-lg bg-sky-500 ">
                        <span className="sm:block mx-1 text-white sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg font-semibold   focus:ring-[#050708]/50 uppercase">
                            FTD
                        </span>
                        <animated.span className="mx-1 text-xs sm:text-xs md:text-sm lg:text-basese xl:text-lg font-bold text-gray-50">
                            {dailyPvtCarCountProps.number.to((n) => n.toFixed(0))}
                        </animated.span>
                        <animated.span className="whitespace-nowrap mx-1 sm:mx-2 lg:mx-1 xl:mx-2  text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold text-gray-50">
                            {dailyPvtCarPayoutProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>
                </div>


                {/* TW */}
                <div className="block shadow-2xl drop-shadow-2xl shadow-blue-650">
                    <h1 className="uppercase font-serif text-xs sm:text-sm md:text-sm lg:text-base xl:text-xl text-center">tw </h1>
                    <div className=" grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 sm:h-20 lg:h-20 xl:h-12  rounded-t-lg bg-cyan-600  ">
                        <span className="sm:block mx-1 text-white sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg font-semibold   focus:ring-[#050708]/50 uppercase">
                            YTD
                        </span>
                        <animated.span className="mx-1 text-xs sm:text-xs md:text-sm lg:text-basese xl:text-lg font-bold text-gray-50">
                            {totalTwCountProps.number.to((n) => n.toFixed(0))}
                        </animated.span>
                        <animated.span className="whitespace-nowrap mx-1 sm:mx-2 lg:mx-1 xl:mx-2  text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold text-gray-50">
                            {totalTwPayoutProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className=" grid xl:flex lg:grid text-white md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 sm:h-20 lg:h-20 xl:h-12   bg-blue-600 ">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg  text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg  font-semibold   focus:ring-[#050708]/50 uppercase">
                            MTD
                        </span>
                        <animated.span className="mx-1  text-xs sm:text-xs md:text-sm lg:text-basese xl:text-lg font-bold text-gray-50">
                            {monthlyTwCountProps.number.to((n) => n.toFixed(0))}
                        </animated.span>
                        <animated.span className="whitespace-nowrap mx-1 sm:mx-2 lg:mx-1 xl:mx-2  text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold text-gray-50">
                            {monthlyTwPayoutProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className=" grid xl:flex lg:grid text-white md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 sm:h-20 lg:h-20 xl:h-12 rounded-b-lg bg-sky-500 ">
                        <span className="sm:block mx-1 text-white sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg font-semibold   focus:ring-[#050708]/50 uppercase">
                            FTD
                        </span>
                        <animated.span className="mx-1 text-xs sm:text-xs md:text-sm lg:text-basese xl:text-lg font-bold text-gray-50">
                            {dailyTwCountProps.number.to((n) => n.toFixed(0))}
                        </animated.span>
                        <animated.span className="whitespace-nowrap mx-1 sm:mx-2 lg:mx-1 xl:mx-2  text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold text-gray-50">
                            {dailyTwPayoutProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>
                </div>


                {/* HEALTH */}
                <div className="block shadow-2xl drop-shadow-2xl shadow-blue-650">
                    <h1 className="uppercase font-serif text-xs sm:text-sm md:text-sm lg:text-base xl:text-xl text-center">health </h1>
                    <div className=" grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 sm:h-20 lg:h-20 xl:h-12  rounded-t-lg bg-cyan-600  ">
                        <span className="sm:block mx-1 text-white sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg font-semibold   focus:ring-[#050708]/50 uppercase">
                            YTD
                        </span>
                        <animated.span className="mx-1 text-xs sm:text-xs md:text-sm lg:text-basese xl:text-lg font-bold text-gray-50">
                            {totalHealthCountProps.number.to((n) => n.toFixed(0))}
                        </animated.span>
                        <animated.span className="whitespace-nowrap mx-1 sm:mx-2 lg:mx-1 xl:mx-2  text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold text-gray-50">
                            {totalHealthPayoutProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className=" grid xl:flex lg:grid text-white md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 sm:h-20 lg:h-20 xl:h-12   bg-blue-600 ">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg  text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg  font-semibold   focus:ring-[#050708]/50 uppercase">
                            MTD
                        </span>
                        <animated.span className="mx-1 text-xs sm:text-xs md:text-sm lg:text-basese xl:text-lg font-bold text-gray-50">
                            {monthlyHealthCountProps.number.to((n) => n.toFixed(0))}
                        </animated.span>
                        <animated.span className="whitespace-nowrap mx-1 sm:mx-2 lg:mx-1 xl:mx-2  text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold text-gray-50">
                            {monthlyHealthPayoutProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className=" grid xl:flex lg:grid text-white md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 sm:h-20 lg:h-20 xl:h-12 rounded-b-lg bg-sky-500 ">
                        <span className="sm:block mx-1 text-white sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg font-semibold   focus:ring-[#050708]/50 uppercase">
                            FTD
                        </span>
                        <animated.span className="mx-1 text-xs sm:text-xs md:text-sm lg:text-basese xl:text-lg font-bold text-gray-50">
                            {dailyHealthCountProps.number.to((n) => n.toFixed(0))}
                        </animated.span>
                        <animated.span className="whitespace-nowrap mx-1 sm:mx-2 lg:mx-1 xl:mx-2  text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold text-gray-50">
                            {dailyHealthPayoutProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>
                </div>


                {/* NON-MOTOR */}
                <div className="block shadow-2xl drop-shadow-2xl shadow-blue-650">
                    <h1 className="uppercase font-serif text-xs sm:text-sm md:text-sm lg:text-base xl:text-xl text-center">NON-MOTOR </h1>
                    <div className=" grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 sm:h-20 lg:h-20 xl:h-12  rounded-t-lg bg-cyan-600  ">
                        <span className="sm:block mx-1 text-white sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg font-semibold   focus:ring-[#050708]/50 uppercase">
                            YTD
                        </span>
                        <animated.span className="mx-1 text-xs sm:text-xs md:text-sm lg:text-basese xl:text-lg font-bold text-gray-50">
                            {totalNonMotorCountProps.number.to((n) => n.toFixed(0))}
                        </animated.span>
                        <animated.span className="whitespace-nowrap mx-1 sm:mx-2 lg:mx-1 xl:mx-2  text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold text-gray-50">
                            {totalNonMotorPayoutProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className=" grid xl:flex lg:grid text-white md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 sm:h-20 lg:h-20 xl:h-12   bg-blue-600 ">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg  text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg  font-semibold   focus:ring-[#050708]/50 uppercase">
                            MTD
                        </span>
                        <animated.span className="mx-1 text-xs sm:text-xs md:text-sm lg:text-basese xl:text-lg font-bold text-gray-50">
                            {monthlyNonMotorCountProps.number.to((n) => n.toFixed(0))}
                        </animated.span>
                        <animated.span className="whitespace-nowrap mx-1 sm:mx-2 lg:mx-1 xl:mx-2  text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold text-gray-50">
                            {monthlyNonMotorPayoutProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className=" grid xl:flex lg:grid text-white md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 sm:h-20 lg:h-20 xl:h-12 rounded-b-lg bg-sky-500 ">
                        <span className="sm:block mx-1 text-white sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg font-semibold   focus:ring-[#050708]/50 uppercase">
                            FTD
                        </span>
                        <animated.span className="mx-1 text-xs sm:text-xs md:text-sm lg:text-basese xl:text-lg font-bold text-gray-50">
                            {dailyNonMotorCountProps.number.to((n) => n.toFixed(0))}
                        </animated.span>
                        <animated.span className="whitespace-nowrap mx-1 sm:mx-2 lg:mx-1 xl:mx-2  text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold text-gray-50">
                            {dailyNonMotorPayoutProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>
                </div>
            </div>

 {/* single liners code */}
 <main className="flex justify-between my-5">
                {/* single liners code */}
                <div className="grid grid-cols-5 gap-3 ">
                <div className="shadow-2xl drop-shadow-2xl shadow-blue-650 grid xl:flex lg:grid text-white md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 sm:h-20 lg:h-20 xl:h-12 rounded-lg bg-yellow-700 ">
                <span className="sm:block mx-1 text-white sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg font-semibold   focus:ring-[#050708]/50 uppercase">
                            Total Branch
                        </span>
                        <animated.span className="whitespace-nowrap mx-1 sm:mx-2 lg:mx-1 xl:mx-2  text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold text-gray-50">
                            {companyProps.number.to((n) => n.toFixed(0))}
                        </animated.span>
                    </div>

                    <div className="shadow-2xl drop-shadow-2xl shadow-blue-650 grid xl:flex lg:grid text-white md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 sm:h-20 lg:h-20 xl:h-12 rounded-lg bg-emerald-700 ">
                    <span className="sm:block mx-1 text-white sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg font-semibold   focus:ring-[#050708]/50 uppercase">
                            JOB APPLIED
                        </span>
                        <animated.span className="whitespace-nowrap mx-1 sm:mx-2 lg:mx-1 xl:mx-2  text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold text-gray-50">
                            {careerProps.number.to((n) => n.toFixed(0))}
                        </animated.span>
                    </div>

                    {/* {add more single elements} */}
                </div>
            </main>



            {/* HAJIPUR sales  */}
            <div className="grid grid-cols-4 gap-3">
                {/* advsisors */}
                <div className="block shadow-2xl drop-shadow-2xl shadow-blue-650">
                    <h1 className="uppercase font-serif text-xs sm:text-sm md:text-sm lg:text-base xl:text-xl text-center">ADVISORS</h1>
                    <div className=" grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-12 lg:p-1 sm:h-16 lg:h-16 xl:h-12  rounded-t-lg bg-sky-500  ">
                        <span className="sm:block mx-1 text-white sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg font-semibold   focus:ring-[#050708]/50 uppercase">
                            Total Advisor
                        </span>
                        <animated.span className="mx-1 text-xs sm:text-xs md:text-sm lg:text-base xl:text-xl font-bold text-gray-50">
                            {totalAdvisorsProps.number.to((n) => n.toFixed(0))}
                        </animated.span>
                    </div>

                    <div className=" grid xl:flex lg:grid text-white md:grid sm:grid items-center xl:justify-between h-12 lg:p-1 sm:h-16 lg:h-16 xl:h-12   bg-blue-600 ">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg  text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg  font-semibold   focus:ring-[#050708]/50 uppercase">
                            HAJIPUR
                        </span>
                        <animated.span className="mx-1 text-xs sm:text-xs md:text-sm lg:text-base xl:text-xl font-bold text-gray-50">
                            {countHajipurProps.number.to((n) => n.toFixed(0))}
                        </animated.span>
                    </div>

                    <div className=" grid xl:flex lg:grid text-white md:grid sm:grid items-center xl:justify-between h-12 lg:p-1 sm:h-16 lg:h-16 xl:h-12   bg-sky-500 ">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg  text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg  font-semibold   focus:ring-[#050708]/50 uppercase">
                            PATNA
                        </span>
                        <animated.span className="mx-1 text-xs sm:text-xs md:text-sm lg:text-base xl:text-xl font-bold text-gray-50">
                            {countPatnaProps.number.to((n) => n.toFixed(0))}
                        </animated.span>
                    </div>


                    <div className=" grid xl:flex lg:grid text-white md:grid sm:grid items-center xl:justify-between h-12 lg:p-1 sm:h-16 lg:h-16 xl:h-12  bg-blue-600 ">
                        <span className="sm:block mx-1 text-white sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg font-semibold   focus:ring-[#050708]/50 uppercase">
                            SAMASTIPUR
                        </span>
                        <animated.span className="mx-1 text-xs sm:text-xs md:text-sm lg:text-base xl:text-xl font-bold text-gray-50">
                            {countSamastipurProps.number.to((n) => n.toFixed(0))}
                        </animated.span>
                    </div>
                    <div className=" grid xl:flex lg:grid text-white md:grid sm:grid items-center xl:justify-between h-12 lg:p-1 sm:h-16 lg:h-16 xl:h-12 rounded-b-lg  bg-sky-500 ">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg  text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg  font-semibold   focus:ring-[#050708]/50 uppercase">
                            MUZAFFARPUR
                        </span>
                        <animated.span className="mx-1 text-xs sm:text-xs md:text-sm lg:text-base xl:text-xl font-bold text-gray-50">
                            {countMuzaffarpurProps.number.to((n) => n.toFixed(0))}
                        </animated.span>
                    </div>
                </div>


                {/* Att/Emp*/}
                <div className="block ">
                    <h1 className="uppercase font-serif text-xs sm:text-sm md:text-sm lg:text-base xl:text-xl text-center ">Att/Emp</h1>
                    <div className="shadow-2xl drop-shadow-2xl shadow-blue-650 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-12  sm:h-16 lg:h-16 xl:h-12  rounded-t-lg bg-green-700  ">
                        <span className="sm:block mx-1 text-white sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg font-semibold   focus:ring-[#050708]/50 uppercase">
                            Active / total
                        </span>
                        <span>
                            <animated.span className="mx-0.5 text-xs sm:text-xs md:text-sm lg:text-base xl:text-xl font-bold text-gray-50">
                                {activeempCountProps.number.to(n => n.toFixed(0))}
                            </animated.span>
                            <span className="mx-0.5 text-xs sm:text-xs md:text-sm lg:text-base xl:text-xl font-bold text-gray-50">/</span>
                            <animated.span className="mx-0.5 text-xs sm:text-xs md:text-sm lg:text-base xl:text-xl font-bold text-gray-50">
                                {empCountProps.number.to(n => n.toFixed(0))}
                            </animated.span>
                        </span>
                    </div>

                    <div className="shadow-2xl drop-shadow-2xl shadow-blue-650 grid xl:flex lg:grid text-white md:grid sm:grid items-center xl:justify-between h-12  sm:h-16 lg:h-16 xl:h-12 rounded-b-lg mb-2 bg-green-700 ">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg  text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg  font-semibold   focus:ring-[#050708]/50 uppercase">
                            Att. / Active
                        </span>
                        <span>
                            <animated.span className="mx-0.5 text-xs sm:text-xs md:text-sm lg:text-base xl:text-xl font-bold text-gray-50">
                                {currAttendanceProps.number.to(n => n.toFixed(0))}
                            </animated.span>
                            <span className="mx-0.5 text-xs sm:text-xs md:text-sm lg:text-base xl:text-xl font-bold text-gray-50">/</span>
                            <animated.span className="mx-0.5 text-xs sm:text-xs md:text-sm lg:text-base xl:text-xl font-bold text-gray-50">
                                {activeempCountProps.number.to(n => n.toFixed(0))}
                            </animated.span>
                        </span>
                    </div>


                    {/* leave */}
                    <h1 className="uppercase font-serif text-xs sm:text-sm md:text-sm lg:text-base xl:text-xl text-center ">Leave</h1>
                    <div className="shadow-2xl drop-shadow-2xl shadow-blue-650 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-16  sm:h-16 lg:h-16 xl:h-12  rounded-t-lg bg-red-700  ">
                        <span className="sm:block mx-1 text-white sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg font-semibold   focus:ring-[#050708]/50 uppercase">
                            APPROVED / TOTAL
                        </span>
                        <span>
                            <animated.span className="mx-0.5 text-xs sm:text-xs md:text-sm lg:text-base xl:text-xl font-bold text-gray-50">
                                {acptLeaveCountsProps.number.to(n => n.toFixed(0))}
                            </animated.span>
                            <span className="mx-0.5 text-xs sm:text-xs md:text-sm lg:text-base xl:text-xl font-bold text-gray-50">/</span>
                            <animated.span className="mx-0.5 text-xs sm:text-xs md:text-sm lg:text-base xl:text-xl font-bold text-gray-50">
                                {totalLeavesCountsProps.number.to(n => n.toFixed(0))}
                            </animated.span>
                        </span>
                    </div>

                    <div className="shadow-2xl drop-shadow-2xl shadow-blue-650 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-16  sm:h-16 lg:h-16 xl:h-12  rounded-b-lg bg-red-700  ">
                        <span className="sm:block mx-1 text-white sm:mx-2 lg:mx-1 xl:mx-2 px-2  rounded-lg text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg font-semibold   focus:ring-[#050708]/50 uppercase">
                            REJECTED / TOTAL
                        </span>
                        <span>
                            <animated.span className="mx-0.5 text-xs sm:text-xs md:text-sm lg:text-base xl:text-xl font-bold text-gray-50">
                                {trejLeaveCountsProps.number.to(n => n.toFixed(0))}
                            </animated.span>
                            <span className="mx-0.5 text-xs sm:text-xs md:text-sm lg:text-base xl:text-xl font-bold text-gray-50">/</span>
                            <animated.span className="mx-0.5 text-xs sm:text-xs md:text-sm lg:text-base xl:text-xl font-bold text-gray-50">
                                {totalLeavesCountsProps.number.to(n => n.toFixed(0))}
                            </animated.span>
                        </span>
                    </div>
                </div>



                {/* part 2 employee wise data policy */}
                <div className="block col-span-2 ">
                    <div className="grid grid-cols-6 items-center ">
                        <span className="col-span-3 uppercase font-serif text-xs sm:text-sm md:text-sm lg:text-base xl:text-xl text-center">
                            EMP NAME
                        </span>
                        <span className="col-span-1 uppercase font-serif text-xs sm:text-sm md:text-sm lg:text-base xl:text-xl text-center">
                            YTD
                        </span>
                        <span className="col-span-1 tuppercase font-serif text-xs sm:text-sm md:text-sm lg:text-base xl:text-xl text-center">
                            MTD
                        </span>
                        <span className="col-span-1 uppercase font-serif text-xs sm:text-sm md:text-sm lg:text-base xl:text-xl text-center">
                            FTD
                        </span>
                    </div>
                    {employees.map((employee, index) => (
                        <div
                            key={index}
                            className={`odd:bg-sky-500 grid grid-cols-6 items-center h-10 lg:p-1 lg:h-16 xl:h-10 bg-blue-600 shadow-2xl drop-shadow-2xl shadow-blue-650 ${index === 0 ? 'rounded-t-lg' : ''
                                } ${index === employees.length - 1 ? 'rounded-b-lg ' : ''}`}
                        >
                            <span className="col-span-3 sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded-lg text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-white  focus:ring-[#050708]/50 uppercase">
                                {employee.toUpperCase()}
                            </span>
                            {["ytd", "mtd", "daily"].map(period => (
                                <span key={period} className="col-span-1 text-xs sm:text-xs md:text-sm lg:text-base xl:text-xl font-bold text-gray-50">
                                    {employeePolicyCounts[employee] ? employeePolicyCounts[employee][period] : '0'}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

           



            {/* total payouts */}

            <h1 className="uppercase  font-serif text-base sm:text-lg lg:text-xl xl:text-2xl hidden">Total Payout</h1>
            {/* DISPLAY-NONE SETTED */}
            <div className=" grid-cols-3 gap-3  hidden" >
                {/* PART COMPANY PAYOUT */}
                <div className="block ">
                    <div className=" grid xl:flex lg:flex md:grid sm:grid items-center xl:justify-between h-20 rounded-lg bg-blue-600 shadow-2xl drop-shadow-2xl shadow-blue-650">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded-lg text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-white  focus:ring-[#050708]/50 uppercase">
                            Total Co. Payout
                        </span>
                        <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-sm lg:text-base xl:text-xl font-bold text-gray-50">
                            {totalPayoutProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className=" grid xl:flex lg:flex md:grid sm:grid items-center xl:justify-between h-20 rounded-lg bg-blue-600 shadow-2xl drop-shadow-2xl shadow-blue-650">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded-lg text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-white  focus:ring-[#050708]/50 uppercase">
                            Monthly Co. Payout
                        </span>
                        <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-sm lg:text-base xl:text-xl font-bold text-gray-50">
                            {monthlyPayoutProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className=" grid xl:flex lg:flex md:grid sm:grid items-center xl:justify-between h-20 rounded-lg bg-blue-600 shadow-2xl drop-shadow-2xl shadow-blue-650">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded-lg text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-white  focus:ring-[#050708]/50 uppercase">
                            Daily Co. Payout
                        </span>
                        <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-sm lg:text-base xl:text-xl font-bold text-gray-50">
                            {dailyPayoutProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>
                </div>

                {/* PART BRANCH PAYOUT */}
                <div className="block">
                    <div className=" grid xl:flex lg:flex md:grid sm:grid items-center xl:justify-between h-20 rounded-lg bg-blue-600 shadow-2xl drop-shadow-2xl shadow-blue-650">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded-lg text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-white  focus:ring-[#050708]/50 uppercase">
                            Total Br. Payout
                        </span>
                        <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-sm lg:text-base xl:text-xl font-bold text-gray-50">
                            {totalPayoutBProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className=" grid xl:flex lg:flex md:grid sm:grid items-center xl:justify-between h-20 rounded-lg bg-blue-600 shadow-2xl drop-shadow-2xl shadow-blue-650">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded-lg text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-white  focus:ring-[#050708]/50 uppercase">
                            Monthly Br.  Payout
                        </span>
                        <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-sm lg:text-base xl:text-xl font-bold text-gray-50">
                            {monthlyPayoutBProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className=" grid xl:flex lg:flex md:grid sm:grid items-center xl:justify-between h-20 rounded-lg bg-blue-600 shadow-2xl drop-shadow-2xl shadow-blue-650">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded-lg text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-white  focus:ring-[#050708]/50 uppercase">
                            Daily Br.  Payout
                        </span>
                        <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-sm lg:text-base xl:text-xl font-bold text-gray-50">
                            {dailyPayoutBProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>
                </div>

                {/* PART ADVISOR PAYOUT */}
                <div className="block">
                    <div className=" grid xl:flex lg:flex md:grid sm:grid items-center xl:justify-between h-20 rounded-lg bg-blue-600 shadow-2xl drop-shadow-2xl shadow-blue-650">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded-lg text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-white  focus:ring-[#050708]/50 uppercase">
                            Total Adv. Payout
                        </span>
                        <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-sm lg:text-base xl:text-xl font-bold text-gray-50">
                            {totalPayoutAProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className=" grid xl:flex lg:flex md:grid sm:grid items-center xl:justify-between h-20 rounded-lg bg-blue-600 shadow-2xl drop-shadow-2xl shadow-blue-650">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded-lg text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-white  focus:ring-[#050708]/50 uppercase">
                            Monthly Adv. Payout
                        </span>
                        <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-sm lg:text-base xl:text-xl font-bold text-gray-50">
                            {monthlyPayoutAProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className=" grid xl:flex lg:flex md:grid sm:grid items-center xl:justify-between h-20 rounded-lg bg-blue-600 shadow-2xl drop-shadow-2xl shadow-blue-650">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded-lg text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-white  focus:ring-[#050708]/50 uppercase">
                            Daily Adv. Payout
                        </span>
                        <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-sm lg:text-base xl:text-xl font-bold text-gray-50">
                            {dailyPayoutAProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>
                </div>
            </div>

        </section>
    );
}

export default AdmFinBr;
