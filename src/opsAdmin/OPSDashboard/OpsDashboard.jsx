import { useState, useEffect, startTransition } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import VITE_DATA from "../../config/config.jsx";
import { useSpring, animated } from "@react-spring/web";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "react-calendar/dist/Calendar.css";

function OpsDashboard() {
  const [yearlyData, setYearlyData] = useState(0);
  const [monthlyData, setMonthlyData] = useState(0);
  const [dailyData, setDailyData] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [employeePolicyCounts, setEmployeePolicyCounts] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [allData, setAllData] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const allDetailsProps = useSpring({
    number: yearlyData,
    from: { number: 0 },
  });
  const monthlyProps = useSpring({ number: monthlyData, from: { number: 0 } });
  const dailyProps = useSpring({ number: dailyData, from: { number: 0 } });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          toast.error("Not Authorized yet.. Try again!");
          return;
        }

        const response = await axios.get(`${VITE_DATA}/alldetails/show/view`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        const allData = response.data;
        setAllData(allData);

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const currentDay = currentDate.getDate();

        const filteredYearlyData = allData.filter((item) => {
          const itemYear = new Date(item.entryDate).getFullYear();
          return itemYear === currentYear;
        });

        const filteredMonthlyData = allData.filter((item) => {
          const itemDate = new Date(item.entryDate);
          const itemYear = itemDate.getFullYear();
          const itemMonth = itemDate.getMonth() + 1;
          return itemYear === currentYear && itemMonth === currentMonth;
        });

        const filteredDailyData = allData.filter((item) => {
          const itemDate = new Date(item.entryDate);
          const itemYear = itemDate.getFullYear();
          const itemMonth = itemDate.getMonth() + 1;
          const itemDay = itemDate.getDate();
          return (
            itemYear === currentYear &&
            itemMonth === currentMonth &&
            itemDay === currentDay
          );
        });

        const uniqueEmployees = [
          ...new Set(
            allData
              .filter((item) => item.staffName.trim() !== "")
              .map((item) => item.staffName.toLowerCase())
          ),
        ];
        setEmployees(uniqueEmployees);

        const newEmployeePolicyCounts = uniqueEmployees.reduce(
          (acc, employee) => {
            const employeeData = allData.filter(
              (item) => item.staffName.toLowerCase() === employee
            );

            acc[employee] = {
              ytd: employeeData.filter(
                (item) => new Date(item.entryDate).getFullYear() === currentYear
              ).length,
              mtd: employeeData.filter((item) => {
                const itemDate = new Date(item.entryDate);
                return (
                  itemDate.getMonth() + 1 === currentMonth &&
                  itemDate.getFullYear() === currentYear
                );
              }).length,
              daily: employeeData.filter((item) => {
                const itemDate = new Date(item.entryDate);
                return (
                  itemDate.getDate() === currentDay &&
                  itemDate.getMonth() + 1 === currentMonth &&
                  itemDate.getFullYear() === currentYear
                );
              }).length,
            };
            return acc;
          },
          {}
        );

        startTransition(() => {
          setYearlyData(filteredYearlyData.length);
          setMonthlyData(filteredMonthlyData.length);
          setDailyData(filteredDailyData.length);
          setEmployeePolicyCounts(newEmployeePolicyCounts);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data.");
      }
    };
    fetchData();
  }, []);

  const handleFilter = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const filteredData = allData.filter((item) => {
      const itemDate = new Date(item.entryDate);
      return (!startDate || itemDate >= start) && (!endDate || itemDate <= end);
    });

    const filteredYearlyData = filteredData.filter((item) => {
      const itemYear = new Date(item.entryDate).getFullYear();
      return itemYear === new Date().getFullYear();
    });

    const filteredMonthlyData = filteredData.filter((item) => {
      const itemDate = new Date(item.entryDate);
      const itemYear = itemDate.getFullYear();
      const itemMonth = itemDate.getMonth() + 1;
      return (
        itemYear === new Date().getFullYear() &&
        itemMonth === new Date().getMonth() + 1
      );
    });

    const filteredDailyData = filteredData.filter((item) => {
      const itemDate = new Date(item.entryDate);
      const itemYear = itemDate.getFullYear();
      const itemMonth = itemDate.getMonth() + 1;
      const itemDay = itemDate.getDate();
      return (
        itemYear === new Date().getFullYear() &&
        itemMonth === new Date().getMonth() + 1 &&
        itemDay === new Date().getDate()
      );
    });

    const newEmployeePolicyCounts = employees.reduce((acc, employee) => {
      const employeeData = filteredData.filter(
        (item) => item.staffName.toLowerCase() === employee
      );

      acc[employee] = {
        ytd: employeeData.filter(
          (item) =>
            new Date(item.entryDate).getFullYear() === new Date().getFullYear()
        ).length,
        mtd: employeeData.filter((item) => {
          const itemDate = new Date(item.entryDate);
          return (
            itemDate.getMonth() + 1 === new Date().getMonth() + 1 &&
            itemDate.getFullYear() === new Date().getFullYear()
          );
        }).length,
        daily: employeeData.filter((item) => {
          const itemDate = new Date(item.entryDate);
          return (
            itemDate.getDate() === new Date().getDate() &&
            itemDate.getMonth() + 1 === new Date().getMonth() + 1 &&
            itemDate.getFullYear() === new Date().getFullYear()
          );
        }).length,
      };
      return acc;
    }, {});

    startTransition(() => {
      setYearlyData(filteredYearlyData.length);
      setMonthlyData(filteredMonthlyData.length);
      setDailyData(filteredDailyData.length);
      setEmployeePolicyCounts(newEmployeePolicyCounts);
      setIsFiltered(true);
    });
  };

  const handleRemoveFilter = () => {
    setStartDate("");
    setEndDate("");
    setIsFiltered(false);
    startTransition(() => {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;
      const currentDay = currentDate.getDate();

      const filteredYearlyData = allData.filter((item) => {
        const itemYear = new Date(item.entryDate).getFullYear();
        return itemYear === currentYear;
      });

      const filteredMonthlyData = allData.filter((item) => {
        const itemDate = new Date(item.entryDate);
        const itemYear = itemDate.getFullYear();
        const itemMonth = itemDate.getMonth() + 1;
        return itemYear === currentYear && itemMonth === currentMonth;
      });

      const filteredDailyData = allData.filter((item) => {
        const itemDate = new Date(item.entryDate);
        const itemYear = itemDate.getFullYear();
        const itemMonth = itemDate.getMonth() + 1;
        const itemDay = itemDate.getDate();
        return (
          itemYear === currentYear &&
          itemMonth === currentMonth &&
          itemDay === currentDay
        );
      });

      setYearlyData(filteredYearlyData.length);
      setMonthlyData(filteredMonthlyData.length);
      setDailyData(filteredDailyData.length);
      //   setEmployeePolicyCounts(filteredData);
    });
  };

  return (
    <>
      <div className="flex flex-nowrap flex-auto justify-between mb-5">
        <div className="flex mr-2">
          <div className="mr-8">
            <label className="text-base font-mono font-semibold xl:inline lg:inline md:inline sm:inline hidden mr-1">
              From:
            </label>
            <input
              type="date"
              className="input-style font-mono xl:w-auto lg:w-auto sm:w-auto w-24 p-1 rounded"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label className="text-base font-mono font-semibold xl:inline lg:inline md:inline sm:inline hidden mx-1">
              To:
            </label>
            <input
              type="date"
              className="input-style font-mono xl:w-auto lg:w-auto  sm:w-auto w-24 p-1 rounded"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <div className="flex  flex-wrap justify-between">
          <button
            onClick={handleFilter}
            className={`bg-blue-600 text-white font-mono rounded font-semibold mr-4 xl:w-auto w-18 px-3 py-1 ${
              !startDate && !endDate ? "cursor-not-allowed" : ""
            }`}
            disabled={!startDate && !endDate}
          >
            Filter
          </button>

          {isFiltered && (
            <button
              onClick={handleRemoveFilter}
              className="bg-red-600 text-white font-mono rounded font-semibold xl:w-auto w-18 px-3 py-1"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="flex xl:flex lg:flex md:flex sm:flex items-center justify-between  xl:h-16 lg:h-10 md:h-10 h-8 rounded-lg bg-cyan-600 shadow-2xl drop-shadow-2xl shadow-blue-650">
          <span className="sm:block mx-1 sm:mx-2 lg:mx-3 xl:mx-6  px-2 py-1 rounded-lg text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg font-semibold text-white  focus:ring-[#050708]/50">
            YTD
          </span>
          <animated.span className="mx-1 sm:mx-2 lg:mx-3 xl:mx-6 text-xs sm:text-sm md:text-sm lg:text-base xl:text-base font-bold text-gray-50">
            {allDetailsProps.number.to((n) => n.toFixed(0))}
          </animated.span>
        </div>

        <div className="flex xl:flex lg:flex md:flex sm:flex i items-center justify-between xl:h-16 lg:h-10 md:h-10 h-8 rounded-lg bg-blue-600 shadow-2xl drop-shadow-2xl shadow-blue-650">
          <span className="sm:block mx-1 sm:mx-2 lg:mx-3 xl:mx-6  px-2 py-1 rounded-lg text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg font-semibold text-white  focus:ring-[#050708]/50 xl:whitespace-nowrap">
            MTD
          </span>
          <animated.span className="mx-1 sm:mx-2 lg:mx-3 xl:mx-6 text-xs sm:text-sm md:text-sm lg:text-base xl:text-base font-bold text-gray-50">
            {monthlyProps.number.to((n) => n.toFixed(0))}
          </animated.span>
        </div>

        <div className="flex xl:flex lg:flex md:flex sm:flex  items-center justify-between  xl:h-16 lg:h-10 md:h-10 h-8 rounded-lg bg-sky-500 shadow-2xl drop-shadow-2xl shadow-blue-650">
          <span className="sm:block mx-1 sm:mx-2 lg:mx-3 xl:mx-6  px-2 py-1 rounded-lg text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg font-semibold text-white  focus:ring-[#050708]/50">
            FTD
          </span>
          <animated.span className="mx-1 sm:mx-2 lg:mx-3 xl:mx-6text-xs sm:text-sm md:text-sm lg:text-base xl:text-base font-bold text-gray-50">
            {dailyProps.number.to((n) => n.toFixed(0))}
          </animated.span>
        </div>
      </div>

      {/* part 2 employee wise data policy */}

      <div className=" flex flex-col justify-between ">
        <div className="grid grid-cols-6 items-center ">
          <span className="col-span-3 uppercase font-serif text-xs sm:text-sm md:text-sm lg:text-base xl:text-base text-center">
            EMP NAME
          </span>
          <span className="col-span-1 uppercase font-serif text-xs sm:text-sm md:text-sm lg:text-base xl:text-base text-center">
            YTD
          </span>
          <span className="col-span-1 tuppercase font-serif text-xs sm:text-sm md:text-sm lg:text-base xl:text-base text-center">
            MTD
          </span>
          <span className="col-span-1 uppercase font-serif text-xs sm:text-sm md:text-sm lg:text-base xl:text-base text-center">
            FTD
          </span>
        </div>
        {employees.map((employee, index) => (
          <div
            key={index}
            className={`odd:bg-sky-500  grid grid-cols-6 items-center h-10 lg:p-1 lg:h-10 xl:h-10 bg-blue-600 shadow-2xl drop-shadow-2xl shadow-blue-650 ${
              index === 0 ? "rounded-t-lg" : ""
            } ${index === employees.length - 1 ? "rounded-b-lg " : ""}`}
          >
            <span className="col-span-3 sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded-lg text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-white  focus:ring-[#050708]/50 uppercase">
              {employee.toUpperCase()}
            </span>
            {["ytd", "mtd", "daily"].map((period) => (
              <span
                key={period}
                className="col-span-1 text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-bold text-gray-50"
              >
                {employeePolicyCounts[employee]
                  ? employeePolicyCounts[employee][period]
                  : "0"}
              </span>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default OpsDashboard;
