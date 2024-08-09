import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-calendar/dist/Calendar.css';
import VITE_DATA from '../../config/config.jsx';

function EmpAttendance() {
  const [value, setValue] = useState(new Date());
  const [APIData, setAPIData] = useState([]);
  const [presentDays, setPresentDays] = useState(0);
  const [absentDays, setAbsentDays] = useState(0);
  const [halfday, setHalfDay] = useState(0);
  const [holidayDays, setHolidayDays] = useState(0);
  const employeeId = sessionStorage.getItem('employeeId');

  const tileClassName = ({ date }) => {
    let classNames = '';
    const statusForDate = getAttendanceStatusForDateSync(date);
    if (statusForDate) {
      if (statusForDate === 'present') {
        classNames += 'present-day';
      } else if (statusForDate === 'absent') {
        classNames += 'absent-day';
      } else if (statusForDate === 'halfday') {
        classNames += 'half-day';
      } else if (statusForDate === 'holiday') {
        classNames += 'holi-day';
      } else {
        classNames += 'default-class'; // Default class for other cases
      }
    }
    return classNames.trim();
  };

 

  const getAttendanceStatusForDateSync = (selectedDate) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedSelectedDate = selectedDate.toLocaleDateString('en-GB', options);
    const attendanceData = APIData.find((data) => {
      const dataDate = data.date.split('T')[0]; // Extract the date part from the API date
      if (dataDate === formattedSelectedDate) {
        return data;
      }
      return null;
    });
    return attendanceData ? attendanceData.status : null;
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      toast.error('Not Authorized yet.. Try again! ');
    } else {
      axios
        .get(`${VITE_DATA}/employee/emp/attendance/${employeeId}`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          setAPIData(response.data);
          filterAttendanceByMonth(response.data.date);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [employeeId]);

  const filterAttendanceByMonth = (data, selectedDate) => {
    
    const selectedMonth = selectedDate.getMonth() + 1; // getMonth is zero-based
    const selectedYear = selectedDate.getFullYear();

    const filteredData = data.filter((attendance) => {
      // eslint-disable-next-line no-unused-vars
      const [day, month, year] = attendance.date.split('/');
      // console.log(day);
      return parseInt(month, 10) === selectedMonth && parseInt(year, 10) === selectedYear;
    });

    // Calculate present, absent, half-day, and holiday counts
    let presentCount = 0;
    let absentCount = 0;
    let halfDayCount = 0;
    let holidayCount = 0;

    filteredData.forEach((attendance) => {
      if (attendance.status === 'present') {
        presentCount++;
      } else if (attendance.status === 'absent') {
        absentCount++;
      } else if (attendance.status === 'halfday') {
        halfDayCount++;
      } else if (attendance.status === 'holiday') {
        holidayCount++;
      }
    });

    setPresentDays(presentCount);
    setAbsentDays(absentCount);
    setHalfDay(halfDayCount);
    setHolidayDays(holidayCount);
  };
  

  useEffect(() => {
    filterAttendanceByMonth(APIData, value);
  }, [value, APIData]);

  return (
    <section className="container-fluid emp-attendance-container relative h-screen p-0 sm:ml-48 bg-orange-100">
      <div className="container-fluid flex justify-center p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-orange-100">
        <div className="w-full ">
          <span className="text-3xl tracking-wider text-orange-700 font-medium p-4">Attendance</span>
          <div className='flex justify-start'>
            <div className='text-lg font-semibold text-orange-700'>
              Present Days: <span className='me-4 text-xl font-semibold text-green-600'> {presentDays}</span>
              Absent Days: <span className='me-4 text-xl font-semibold text-red-600'>{absentDays} </span>
              Half Day: <span className='me-4  text-xl font-semibold text-yellow-600'>{halfday}</span>
              Holiday: <span className='text-xl font-semibold text-blue-600'>{holidayDays}</span>
            </div>
          </div>
          <Calendar
            onChange={setValue}
            value={value}
            tileClassName={tileClassName}
            prevLabel="Prev Month"
            nextLabel="Next Month"
            next2Label="Next Year"
            prev2Label="Prev Year"
            className="max-w-screen"
            defaultView="month"
          />
        </div>
      </div>
    </section>
  );
}

export default EmpAttendance;