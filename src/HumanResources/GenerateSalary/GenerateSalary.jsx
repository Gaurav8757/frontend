import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDaysInMonth } from 'date-fns';
import VITE_DATA from "../../config/config.jsx";
function GenerateSalary() {
  const [empList, setEmployeeList] = useState([]);
  const [arrear, setArrear] = useState();
  const [year, setYear] = useState("");
  const [empName, setEmpname] = useState("");
  const [total, setTotal] = useState(0);
  const [empId, setEmpId] = useState("");
  const [empUniqueId, setempUniqueId] = useState();
  const [designation, setDesignation] = useState("");
  const [branchName, setBranchName] = useState("");
  const [accNo, setAccNo] = useState("");
  const [months, setMonths] = useState("");
  const [presentDay, setPresentDay] = useState(0);
  const [halfDay, setHalfDay] = useState(0);
  const [salaries, setSalaries] = useState("");
  const [monthSalary, setMonthSalary] = useState(0);
  const [monthLeave, setMonthLeave] = useState(0);
  const [totalDays, setTotalDays] = useState("");
  const [incentive, setIncentive] = useState();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [empGrossSalary, setGrossEmpSalary] = useState("");
  const [empBasicSalary, setBasicEmpSalary] = useState("");
  const [empHra, setEmpHra] = useState("");
  const [empCa, setEmpCa] = useState("");
  const [empMedical, setEmpMedical] = useState("");
  const [empTiffin, setEmpTiffin] = useState("");
  const [empCompanyPf, setEmpCompanyPf] = useState("");
  const [empPf, setEmpPf] = useState("");
  const [empEsi, setEmpESI] = useState();
  const [empLoanemi, setEmpLoanemi] = useState();
  const [totalAbsentDays, setTotalAbsentDays] = useState(0);
  const [sundays, setSundays] = useState(0);
  const [email, setEmail] = useState("");
  const [kit, setKit] = useState();
  const [additional, setAdditional] = useState();
  const [mobile, setMobile] = useState("");
  const [holidayCount, setHolidayCount] = useState("");
  const [otherDeduction, setOtherDeduction] = useState();
  const [holidayData, setHolidayData] = useState([]);
  const [finalAmountSalary, setFinalAmountSalary] = useState();
  const [finalDeduction, setFinalDeduction] = useState();
  const [otherExpense, setOtherExpense] = useState();
  const [fuelExpense, setFuelExpense] = useState();
  useEffect(() => {
    // Fetch the list of employees when the component mounts
    axios.get(`${VITE_DATA}/api/employee-list`).then((response) => {
      setEmployeeList(response.data);
    });
    // Fetch the list of holidays
    axios.get(`${VITE_DATA}/holidays/alllists`).then((response) => {
      setHolidayData(response.data);
    });
  }, []);


  
  // Function to format a Date object to dd/mm/yyyy
  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const handleYearChange = (e) => {
    const selectedYear = parseInt(e.target.value);
    setYear(selectedYear);
  };

  const handleMonthChange = (e) => {
    const selectedMonth = parseInt(e.target.value);
    setMonths(selectedMonth);
  };


  useEffect(() => {
    // Calculate total days in the selected month
    setTotalDays(getDaysInMonth(new Date(year, months - 1)));
    // Update employee details for the selected month and year
    if (empName) {
      const selectedEmp = empList.find((emp) => emp.empname === empName);
      filterEmployeeDetailsByMonthAndYear(selectedEmp, year, months);
    }
  }, [year, months, empName, empList]);

  const handleEmployeeChange = (selectedEmployee) => {
    const selectedEmp = empList.find((emp) => emp.empname === selectedEmployee);
    setEmpname(selectedEmployee);
    setEmpId(selectedEmp.empid);
    setempUniqueId(selectedEmp._id);
    setDesignation(selectedEmp.staffType);
    setBranchName(selectedEmp.empbranch);
    setAccNo(selectedEmp.accNumber);
    setEmail(selectedEmp.empemail);
    setMobile(selectedEmp.empmobile);
    setMonthLeave(selectedEmp ? selectedEmp.leavemonth : "");
    setMonthSalary(selectedEmp ? selectedEmp.salary : "");
    filterEmployeeDetailsByMonthAndYear(selectedEmp, year, months);

  };

  const filterEmployeeDetailsByMonthAndYear = (employee, selectedYear, selectedMonth) => {
    if (!employee) return;

    const startDate = startOfMonth(new Date(selectedYear, selectedMonth - 1));
    const endDate = endOfMonth(new Date(selectedYear, selectedMonth - 1));
    const daysOfMonth = eachDayOfInterval({ start: startDate, end: endDate });
    const formattedDays = daysOfMonth.map((day) => day.getDay());

    const filteredDetails = employee.employeeDetails.filter((detail) => {
      console.log(detail);
      // eslint-disable-next-line no-unused-vars
      const [day, month, year] = detail.date.split("/").map(Number);
      return year === selectedYear && month === selectedMonth;
    });


    // Calculate total present, absent, and half days
    let totalPresentDays = 0;
    let totalAbsentDays = 0;
    let totalHalfDays = 0;
    let holiDayCount = 0;
    let sundayCount = 0
    let workingDaysCount = 0;

    filteredDetails.forEach((detail) => {

      switch (detail.status) {
        case 'present':
          totalPresentDays++;
          break;
        case 'absent':
          totalAbsentDays++;
          break;
        case 'halfday':
          totalHalfDays++;
          break;
        default:
          break;
      }
    });

    //  holiday and working days counts

    daysOfMonth.map((date, dateIndex) => {
      // Convert date to dd/mm/yyyy format
      const formattedDate = formatDate(date);
      const holiday = holidayData.find(holiday => holiday.hdate === formattedDate);
      const isHoliday = !!holiday;
      if (isHoliday) {
        holiDayCount++;
      }
      if (formattedDays[dateIndex] !== 0) {
        workingDaysCount++;
      }else if(formattedDays[dateIndex] === 0){
        sundayCount++;
      }
    });
    const workday = workingDaysCount - holiDayCount;
    setPresentDay(totalPresentDays);
    setTotal(formattedDays.length);
    setTotalDays(workday);
    setTotalAbsentDays(totalAbsentDays);
    setHalfDay(totalHalfDays);
    setSundays(sundayCount);
    setHolidayCount(holiDayCount);
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

  // HANDLE Gross-Salary
  useEffect(() => {
    const handleGrossSalary = () => {
      setGrossEmpSalary(monthSalary);
    };
    handleGrossSalary();
  }, [monthSalary, presentDay]);

  useEffect(() => {
    const handleSalary = () => {
      let salary = (monthSalary / total) * (presentDay + sundays);
      const halfSalary = (monthSalary / 30.5) * 0.5 * halfDay;  
      salary = parseFloat(salary) + parseFloat(halfSalary);
      setSalaries(salary.toFixed(2));
    };
    handleSalary();
  }, [monthSalary, presentDay, halfDay, sundays, total]);

  // incentive
  useEffect(() => {
    const handleIncentive = () => {
      const salariesValue = parseFloat(salaries) || 0;
      const incentiveValue = parseFloat(incentive) || 0;
      const incent = parseFloat(salariesValue + incentiveValue);
      setAmount(incent);
    };
    handleIncentive(); // Call the function when the component mounts or when 'absent' state changes
  }, [salaries, incentive]);

  // handle basic salary
  useEffect(() => {
    const handleBasic = () => {
      const basic = parseFloat(empGrossSalary) || 0;
      const final_basic = basic / 2;
      setBasicEmpSalary(final_basic);
    }
    handleBasic();
  }, [empGrossSalary]);

  // HANDLE HRA
  useEffect(() => {
    const handleHra = () => {
      const calculateHra = parseFloat(empGrossSalary) || 0;
      const finalHra = (calculateHra * 30) / 100;
      setEmpHra(finalHra);
    }
    handleHra();
  }, [empGrossSalary]);

  // HANDLE CA
  useEffect(() => {
    const handleCa = () => {
      const calculateCa = parseFloat(empGrossSalary) || 0;
      const finalCa = (calculateCa * 5) / 100;
      setEmpCa(finalCa);
    }
    handleCa();
  }, [empGrossSalary]);

  // Handle MEDICAL
  useEffect(() => {
    const handleMedical = () => {
      const calculateMedical = parseFloat(empGrossSalary) || 0;
      const finalMedical = (calculateMedical * 5) / 100;
      setEmpMedical(finalMedical);
    }
    handleMedical();
  }, [empGrossSalary]);

  // HANDLE TIFFIN
  // useEffect(() => {
  //   const handleTiffin = () => {
  //     const calculateTiffin = parseFloat(empGrossSalary) || 0;
  //     const finalTiffin = (calculateTiffin * 5) / 100;
  //     setEmpTiffin(finalTiffin);
  //   }
  //   handleTiffin();
  // }, [empGrossSalary]);

  // HANDLE kit
  useEffect(() => {
    const handleKit = () => {
      const calculateKit = parseFloat(empGrossSalary) || 0;
      const finalTiffin = (calculateKit * 5) / 100;
      setKit(finalTiffin);
    }
    handleKit();
  }, [empGrossSalary]);

  // HANDLE kit
  useEffect(() => {
    const handleAdditional = () => {
      const calculateAdditional = parseFloat(empGrossSalary) || 0;
      const finalTiffin = (calculateAdditional * 5) / 100;
      setAdditional(finalTiffin);
    }
    handleAdditional();
  }, [empGrossSalary]);


  // handleFinalSalaryAmount
 useEffect(() => {
  const handleFinalSalaryAmount = () => {
    const salariesValue = parseFloat(salaries) || 0;
    const incentiveValue = parseFloat(incentive) || 0;
    const prevSalary =  parseFloat(arrear) || 0;
    const fuelValue = parseFloat(fuelExpense)|| 0;
    const otherValue = parseFloat(otherExpense)|| 0;
    const esi =  parseFloat(empEsi) || 0;
    // const hraValue = parseFloat(empHra) || 0;
    // const daValue = parseFloat(empCa) || 0;
    // const ma = parseFloat(empMedical) || 0;
    // const tfinValue = parseFloat(empTiffin) || 0;
    // const kitValue = parseFloat(kit) || 0;
    // const adds = parseFloat(additional) || 0;
    // const loanemis = parseFloat(empLoanemi) || 0;
    // const emppf = parseFloat(empPf) || 0;
    // const esi =  parseFloat(empEsi) || 0;
    // const otherDeductionValue =  parseFloat(otherDeduction) || 0;
    const incent = parseFloat(salariesValue + incentiveValue +  prevSalary + fuelValue + otherValue+ esi).toFixed(1);
    setFinalAmountSalary(incent);
  };
  handleFinalSalaryAmount(); // Call the function when the component mounts or when 'absent' state changes
}, [salaries, incentive, arrear, fuelExpense,empEsi, otherExpense]);

useEffect(() => {
  const handleDeductionAmount = () => {
    const loanemis = parseFloat(empLoanemi) || 0;
    const emppf = parseFloat(empPf) || 0;
    const otherDeductionValue =  parseFloat(otherDeduction) || 0;

    const deduct = parseFloat((loanemis + emppf + otherDeductionValue)).toFixed(1);
    setFinalDeduction(deduct);
  }
    handleDeductionAmount();
  }, [empLoanemi,empPf, otherDeduction, otherExpense]);

  // HANDLE COMPANY
  // useEffect(() => {
  //   const handleCompanyPf = () => {
  //     const calculatePf = parseFloat(empGrossSalary) || 0;
  //     const finalPf = (calculatePf * 12) / 100;
  //     setEmpCompanyPf(finalPf);
  //   }
  //   handleCompanyPf();
  // }, [empGrossSalary]);

  // Handle PF
  // useEffect(() => {
  //   const handlePf = () => {
  //     const calculatePf = parseFloat(empGrossSalary) || 0;
  //     const finalPf = (calculatePf * 12) / 100;
  //     setEmpPf(finalPf);
  //   }
  //   handlePf();
  // }, [empGrossSalary]);

  // Handle ESI
  // useEffect(() => {
  //   const handleESI = () => {
  //     const calculateESI = parseFloat(empGrossSalary) || 0;
  //     const finalESI = (calculateESI * 0.75) / 100;
  //     setEmpESI(finalESI);
  //   }
  //   handleESI();
  // }, [empGrossSalary]);

  // Handle Employee Loan EMI
  // useEffect(() => {
  //   const handleLoanEmi = () => {
  //     const loanEmi = parseFloat(empGrossSalary) || 0;
  //     const finalLoanEmi = (loanEmi * 2) / 100;
  //     setEmpLoanemi(finalLoanEmi);
  //   }
  //   handleLoanEmi();
  // }, [empGrossSalary]);

  
 

  let genSalary = months + "/" + year;
  // post data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log(typeof empUniqueId);
      // Proceed with the rest of the submission logic
      const response = await axios.post(`${VITE_DATA}/dashboard/gensalary`, {
        empUniqueId,
        empName,
        presentDays: presentDay,
        totalHalfDays: halfDay,
        sundays,
        email,
        mobile,
        holidayCount,
        totalAbsent: totalAbsentDays,
        genSalary: salaries,
        monthsalary: monthSalary,
        genMonths: genSalary,
        monthleave: monthLeave,
        totalMonthDays: total,
        totalDays: totalDays,
        incentive,
        kit,
        additional,
        empgrossSalary: empGrossSalary,
        empbasicSalary: empBasicSalary,
        emphra: empHra,
        empca: empCa,
        empmedical: empMedical,
        emptiffin: empTiffin,
        empcompanyPf: empCompanyPf,
        emppf: empPf,
        empesi: empEsi,
        emploanemi: empLoanemi,
        totalAmount: amount,
        empid: empId,
        empdesignation: designation,
        empbranch: branchName,
        location: branchName,
        accNum: accNo,
        arrear,
        finalAmountSalary,
        otherDeduction,
        finalDeduction,
        fuelExpense,
        otherExpense
      });
      if (response.data) {
        toast.success("Added Successfully!");
        // Reset the form and loading state on successful submission
        setTotal("");
        setempUniqueId("");
        setFuelExpense("");
        setOtherExpense('');
        setIncentive("");
        setFinalDeduction("");
        setTotalDays("");
        setEmpname("");
        setMonths("");
        setYear("");
        setArrear("");
        setPresentDay("");
        setTotalAbsentDays("");
        setHalfDay("");
        setAccNo("");
        setBranchName("");
        setEmpId("");
        setDesignation("");
        setSalaries("");
        setMonthSalary("");
        setMonthLeave("");
        setTotalDays("");
        setIncentive("");
        setAmount("");
        setGrossEmpSalary("");
        setBasicEmpSalary("");
        setEmpCa("");
        setEmpHra("");
        setEmpMedical("");
        setEmpTiffin("");
        setEmpCompanyPf("");
        setEmpPf("");
        setEmpESI("");
        setEmpLoanemi("");
        setFinalDeduction("");
        setOtherDeduction("");
        setLoading(false);
      } else {
        toast.error("Error Occurred. Try again...!");
      }
    } catch (error) {
      console.error(error.response.data.status);
      toast.info(error.response.data.status);
      setLoading(false);
    }
  };

  return (
    <section className="container-fluid h-screen relative p-0 sm:ml-64 bg-white">
      <div className="container-fluid flex w-full lg:w-full px-2   flex-col justify-center  border-gray-200 border-dashed rounded-lg bg-white">
        <h1 className="font-semibold text-3xl text-orange-700 py-2 ">Generate Employee Salary</h1>
        <div className="relative  p-0  rounded-xl shadow-xl text-2xl  items-center bg-slate-200">

          <div className="flex flex-wrap justify-between">
            <div className="flex flex-col   p-2 text-start w-full lg:w-1/5 ">
              <label className="text-base mx-1">Employee Name</label>
              <select
                className="input-style text-base rounded-lg  p-1"
                value={empName}
                onChange={(e) => handleEmployeeChange(e.target.value)}
                name="empName">
                <option value="" className="text-base">
                  -------- Select Employee ----------
                </option>
                {empList.filter(employee => employee.flags === true).map((emp) => (
                  <option key={emp.empid} value={emp.empname} className="text-base">
                    {`${emp.empid}  -  ${emp.empname}`}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">Monthly Salary:</label>
              <input
                className="input-style p-1 bg-red-100 rounded-lg"
                type="number"
                min="0"
                value={monthSalary}
                name="monthSalary"
                placeholder="₹ 0"
                disabled
              />
            </div>

            <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">Monthly Leave:</label>
              <input
                className="input-style p-1 bg-red-100 rounded-lg"
                type="number"
                min="0"
                max="12"
                value={monthLeave}
                onChange={(e) => setMonthLeave(e.target.value)}
                name="monthLeave"
                placeholder="0"
                disabled
              />
            </div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
              <label htmlFor="year" className="text-base mx-1">Year:</label>
              <select id="year" value={year} onChange={handleYearChange} className="input-style p-1 text-base rounded-lg text-black" disabled={!empName}>
                <option value="" >------------- Select Year ----------</option>
                {renderYears()}
              </select>
            </div>

            <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
              <label htmlFor="month" className="text-base mx-1">Months:</label>

              <select
                className="input-style p-1 text-base rounded-lg text-black"
                type="text"
                id="month"
                value={months}
                onChange={handleMonthChange}
                placeholder="0"
                name="genMonths"
                disabled={!year}
              >
                <option value="" >------------- Select Month ----------</option>
                {renderMonths()}
              </select>
            </div>

            <div className="flex flex-col p-2  mt-4 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">Total Days:</label>
              <input
                className="input-style p-1 bg-red-100 rounded-lg"
                type="number"
                min="0"
                value={total}
                name="totalMonthDays"
                placeholder="0"
                disabled
              />
            </div>
            <div className="flex flex-col p-2  mt-4 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">Total Working Days:</label>
              <input
                className="input-style p-1 bg-red-100 rounded-lg"
                type="number"
                min="0"
                value={totalDays}
                name="totalDays"
                placeholder="0"
                disabled
              />
            </div>
            <div className="flex flex-col p-2 mt-4 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">Present Days:</label>
              <input
                className="input-style bg-red-100 p-1 rounded-lg"
                type="number"
                min="0"
                value={presentDay}
                placeholder="0"
                name="presentDay"
              />
            </div>

            <div className="flex flex-col p-2 mt-4 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">Total Absent:</label>
              <input
                className="input-style p-1 bg-red-100 rounded-lg"
                type="number"
                min="0"
                value={totalAbsentDays}
                placeholder="0"
                name="totalAbsent"
              />
            </div>

            <div className="flex flex-col p-2 mt-4 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">Total Half Days:</label>
              <input
                className="input-style p-1 bg-red-100 rounded-lg"
                type="number"
                min="0"
                value={halfDay}
                onChange={(e) => setHalfDay(e.target.value)}
                name="totalHalfDays"
                placeholder="0"
                disabled
              />
            </div>

            <div className="flex flex-col p-2 mt-4 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">Salary:</label>
              <input
                className="input-style p-1 bg-red-100 rounded-lg"
                type="number"
                min="0"
                value={salaries}
                name="genSalary"
                placeholder="₹ 0"
              />
            </div>
            <div className="flex flex-col p-2 mt-4 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">Incentive:</label>
              <input
                className="input-style p-1 rounded-lg"
                type="number"
                min="0"
                value={incentive}
                onChange={(e) => setIncentive(e.target.value)}
                name="incentive"
                placeholder="₹ 0"
              />
            </div>

            <div className="flex flex-col p-2 mt-4 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">Total Amount:</label>
              <input
                className="input-style p-1 bg-red-100 rounded-lg"
                type="number"
                min="0"
                value={amount}
                name="totalAmount"
                placeholder="₹ 0"
              />
            </div>

            <div className="flex flex-col p-2 mt-4 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">Arrear:</label>
              <input
                className="input-style p-1 rounded-lg"
                type="number"
                min="0"
                value={arrear}
                onChange={(e) => setArrear(e.target.value)}
                name="arrear"
                placeholder="₹ 0"
              />
            </div>
            <div className="flex flex-col p-2  text-start w-full lg:w-1/5"></div>
          </div>



          <div className="w-full col-span-4 mt-5 mb-4 text-white border-b border border-orange-700 bg-orange-700"></div>
          <div className="flex flex-wrap justify-between">
            {/* next part starts here */}
            <div className="flex flex-col p-2  text-start w-full lg:w-1/5">
              <label className="text-base mx-1">Gross Salary:</label>
              <input
                className="input-style p-1 bg-red-100 rounded-lg"
                type="text"
                rows={2}
                name="empGrossSalary"
                value={empGrossSalary}
                placeholder="₹ 0"
              />
            </div>
            <div className="flex flex-col p-2  text-start w-full lg:w-1/5">
              <label className="text-base mx-1">Basic Salary:</label>
              <input
                className="input-style p-1 bg-red-100 rounded-lg"
                type="text"
                rows={2}
                name="empbasicSalary"
                value={empBasicSalary}
                onChange={(e) => setBasicEmpSalary(e.target.value)}
                placeholder="Basic Salary"
                disabled
              />
            </div>
            <div className="flex flex-col p-2  text-start w-full lg:w-1/5">
              <label className="text-base mx-1">HRA:</label>
              <input
                className="input-style p-1 bg-red-100 rounded-lg"
                type="text"
                rows={2}
                name="empHra"
                value={empHra}
                onChange={(e) => setEmpHra(e.target.value)}
                placeholder="₹ 0"
                // placeholder="HRA"
                disabled
              />
            </div>
            <div className="flex flex-col p-2  text-start w-full lg:w-1/5">
              <label className="text-base mx-1">DA:</label>
              <input
                className="input-style p-1  bg-red-100 rounded-lg"
                type="text"
                rows={2}
                name="empCa"
                value={empCa}
                onChange={(e) => setEmpCa(e.target.value)}
                placeholder="CA"
                disabled
              />
            </div>
            <div className="flex flex-col p-2  text-start w-full lg:w-1/5">
              <label className="text-base mx-1">Medical Allowance:</label>
              <input
                className="input-style bg-red-100 p-1 rounded-lg"
                type="text"
                rows={2}
                name="empMedical"
                value={empMedical}
                onChange={(e) => setEmpMedical(e.target.value)}
                placeholder="Medical Allowance"
                disabled
              />
            </div>
            <div className="flex flex-col p-2 mt-4 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">Tiffin/DAS Allowance:</label>
              <input
                className="input-style bg-red-100 p-1 rounded-lg"
                type="text"
                rows={2}
                name="empTiffin"
                value={empTiffin}
                onChange={(e) => setEmpTiffin(e.target.value)}
                placeholder="Tiffin Allowance"
                disabled
              />
              <span className="text-xs text-red-100">DISABLED</span>
            </div>
            <div className="flex flex-col p-2 mt-4 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">Kit Allowance:</label>
              <input
                className="input-style bg-red-100 p-1 rounded-lg"
                type="text"
                rows={2}
                name="kit"
                value={kit}
                onChange={(e) => setKit(e.target.value)}
                placeholder="Kit Allowance"
                disabled
              />
            </div>
            <div className="flex flex-col p-2 mt-4 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">Additional Allowance:</label>
              <input
                className="input-style bg-red-100 p-1 rounded-lg"
                type="text"
                rows={2}
                name="additional"
                value={additional}
                onChange={(e) => setAdditional(e.target.value)}
                placeholder="Additional Allowance"
                disabled
              />
            </div>
            <div className="flex flex-col p-2 mt-4 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">Company PF:</label>
              <input
                className="input-style p-1 bg-red-100 rounded-lg"
                type="text"
                rows={2}
                name="empCompanyPf"
                value={empCompanyPf}
                onChange={(e) => setEmpCompanyPf(e.target.value)}
                placeholder="PF"
                disabled
              />
                <span className="text-xs text-red-700">DISABLED</span>
            </div>
            <div className="flex flex-col p-2 mt-4 text-start w-full lg:w-1/5">
            <label className="text-base mx-1">Final Salary Amount:</label>
              <input
                className="input-style bg-green-100  p-1 rounded-lg"
                type="number"
                rows={2}
                name="finalAmountSalary"
                value={finalAmountSalary}
                onChange={(e) => setFinalAmountSalary(e.target.value)}
                placeholder="₹ 0"
                disabled
              />
            </div>
            <div className="flex flex-col p-2  text-start w-full lg:w-1/5"></div>
            <div className="flex flex-col p-2  text-start w-full lg:w-1/5"></div>
            {/* part-3 */}
            <div className="w-full col-span-4 my-4 text-white border-b border border-orange-500 bg-orange-700">Employee Contribution/Deduction</div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">PF:</label>
              <input
                className="input-style bg-red-100  p-1 rounded-lg"
                type="text"
                rows={2}
                name="empPf"
                value={empPf}
                onChange={(e) => setEmpPf(e.target.value)}
                placeholder="PF"
                disabled
              />
                <span className="text-xs text-red-700">DISABLED</span>
            </div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
              <label className="text-base mx-1">Loan EMI:</label>
              <input
                className="input-style  p-1 rounded-lg"
                type="number"
                rows={2}
                name="empLoanemi"
                value={empLoanemi}
                placeholder="₹ 0"
                onChange={(e) => setEmpLoanemi(e.target.value)}
              />
            </div>

            <div className="flex flex-col p-2 text-start w-full lg:w-1/5 border-t">
              <label className="text-base mx-1">ESI:</label>
              <input
                className="input-style bg-red-100 p-1 rounded-lg"
                type="number"
                rows={2}
                name="empEsi"
                value={empEsi}
                onChange={(e) => setEmpESI(e.target.value)}
                placeholder="₹ 0"
                disabled
              />
            </div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
            <label className="text-base mx-1">TDS:</label>
              <input
                className="input-style  p-1 rounded-lg"
                type="number"
                rows={2}
                name="otherDeduction"
                value={otherDeduction}
                onChange={(e) => setOtherDeduction(e.target.value)}
                placeholder="₹ 0"
              />
            </div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
            <label className="text-base mx-1 font-semibold text-red-700">All Deduction Amount:</label>
              <input
                className="input-style  p-1 rounded-lg "
                type="number"
                rows={2}
                name="finalDeduction"
                value={finalDeduction}
                onChange={(e) => setFinalDeduction(e.target.value)}
                placeholder="₹ 0"
                disabled
              />
            </div>
           
            <div className="w-full col-span-4 my-4 text-white border-b border border-orange-500 bg-orange-700">Other Expenses</div>

            <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
            <label className="text-base mx-1">Fuel Expenses:</label>
              <input
                className="input-style  p-1 rounded-lg"
                type="number"
                rows={2}
                name="fuelExpense"
                value={fuelExpense}
                onChange={(e) => setFuelExpense(e.target.value)}
                placeholder="₹ 0"
              />
            </div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
            <label className="text-base mx-1">Other Expenses:</label>
              <input
                className="input-style  p-1 rounded-lg"
                type="number"
                rows={2}
                name="otherExpense"
                value={otherExpense}
                onChange={(e) => setOtherExpense(e.target.value)}
                placeholder="₹ 0"
              />
            </div>
           
            <div className="flex flex-col p-2 text-start w-full lg:w-1/5"></div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/5"></div>
            <div className="w-full my-10 p-2">
              <button
                className="text-white bg-gradient-to-r leading-4 from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded shadow-lg shadow-green-500/50  dark:shadow-lg dark:shadow-green-800/80 text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={handleSubmit}
                type="button"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>

            </div>

          </div>
        </div>
      </div>

    </section>
  );
}

export default GenerateSalary;
