import { useState, startTransition } from "react";
import { NavLink } from "react-router-dom";
import LogoutHr from "./LogoutHr.jsx";

// const IoMdArrowDropright = React.lazy(() => import("react-icons/io").then(module => ({ default: module.IoMdArrowDropright })));
// const IoMdArrowDropdown = React.lazy(() => import("react-icons/io").then(module => ({ default: module.IoMdArrowDropdown })));
// const FcLeave = React.lazy(() => import("react-icons/fc").then(module => ({ default: module.FcLeave })));

function DashboardHr() {
  const dashboardRouted = [
    {
      title: "Home",
      path: "/hr/home",
      // logo: <RxDashboard size={25} />
      logo: <img src="/pages.png" height={10} width={25} alt="dashboard" />
    },
    {
      title: "Attendance",
      path: "#",
      // logo: <FcPlanner size={25} />,
      logo: <img src="/calendar.png" height={10} width={25} alt="attend" />,
      subRoutes: [
        {
          title: "Add Attendance",
          path: "/hr/home/add/attendance",
          dash: ""
        },
        {
          title: "View Attendance",
          path: "/hr/home/attendance",
          dash: ""
        },
      ]
    },
    {
      title: "Attendance Report",
      path: "#",
      // logo: <IoCalendarNumberOutline size={25} />,
      logo: <img src="/attendance.png" height={10} width={25} alt="report" />,
      subRoutes: [
        {
          title: "All Report",
          path: "/hr/home/attendance/report",
          dash: ""
        },
        {
          title: "Today's Attendance",
          path: "/hr/home/attendance/current/date",
          dash: ""
        },
      ]
    },
    {
      title: "Offer",
      path: "#",
      logo: <img src="/marketing.png" height={10} width={25} alt="market" />,
      subRoutes: [
        {
          title: 'Add Letter',
          path: '/hr/home/add/offer/letter'
        },
        {
          title: 'View Letter',
          path: '/hr/home/view/offer/letter'
        },
      ],
    },
    {
      title: "Joining",
      path: "#",
      logo: <img src="/cover.png" height={10} width={25} alt="cover" />,
      subRoutes: [
        {
          title: 'Add Letter',
          path: '/hr/home/add/joining/letter'
        },
        {
          title: 'View Letter',
          path: '/hr/home/view/joining/letter'
        }
      ],
    },
    {
      title: "Employee",
      path: "#",
      // logo: <FaUserGroup size={25} />,
      logo: <img src="/staff.png" height={5} width={25} alt="staff" />,
      subRoutes: [
        {
          title: "Add Employee",
          path: "/hr/home/addemployee",
          dash: ""
        },
        {
          title: "View Employee",
          path: "/hr/home/viewemployee",
          dash: ""
        },

      ]
    },
    {
      title: "Salary",
      path: "#",
      // logo: <TbMoneybag size={25} />,
      logo: <img src="/salary.png" height={10} width={25} alt="salary" />,
      subRoutes: [
        {
          title: "Add Salary",
          path: "/hr/home/addsalary",
          dash: ""
        },
        {
          title: "View Salary",
          path: "/hr/home/viewsalary",
          dash: ""
        },
        {
          title: "Generate Salary",
          path: "/hr/home/generate/salary",
          dash: ""
        },
        {
          title: "View Final Salary",
          path: "/hr/home/view/generate/salary",
          dash: ""
        },

        // {
        //   title: "Salary Slip",
        //   path: "/hr/home/salary/slip",
        //   dash: ""
        // },

      ]
    },
    {
      title: "Increment",
      path: "#",
      // logo: <MdAutoGraph size={25} />,
      logo: <img src="/increment.png" height={10} width={25} alt="inc" />,
      subRoutes: [
        {
          title: 'Add Letter',
          path: '/hr/home/add/increment/letter'
        },
        {
          title: 'View Letter',
          path: '/hr/home/view/increment/letter'
        },
      ],
    },
    {
      title: "Termination",
      path: "#",
      // logo: <IoPersonRemoveSharp size={25} />,
      logo: <img src="/reject.png" height={10} width={25} alt="reject" />,
      subRoutes: [
        {
          title: 'Add Letter',
          path: '/hr/home/add/terminate/letter'
        },
        {
          title: 'View Letter',
          path: '/hr/home/view/terminate/letter'
        },
      ],
    },
    // {
    //   title: "Resignation Acceptance",
    //   path: "#",
    //   // logo: <SlNote size={25} />,
    //   logo: <img src="/contract.png" height={10} width={25} alt="contract" />,
    //   subRoutes: [
    //     {
    //       title: 'Add Letter',
    //       path: '/hr/home/add/resign/letter'
    //     },
    //     {
    //       title: 'View Letter',
    //       path: '/hr/home/view/resign/letter'
    //     }, {
    //       title: 'Letter',
    //       path: '/hr/home/resign/letter'
    //     }
    //   ],
    // },
    {
      title: "Leave Approval",
      path: "/hr/home/leave/approval",
      // logo: <IoPersonRemoveSharp size={25} />,
      logo: <img src="/exit.png" height={10} width={25} alt="exit" />,

    },
    // {
    //   title: "Leave Balance",
    //   path: "/hr/home/leave/balance",
    //   // logo: <FcLeave size={25} />,
    //   logo: <img src="/visits.png" height={10} width={25} alt="visit" />,
    // },
  ];

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleSidebar = () => {
    startTransition(() => {
      setSidebarOpen(!sidebarOpen);
    });
  };

  const toggleSubmenu = (idx) => {
    startTransition(() => {
      setOpenSubmenu(openSubmenu === idx ? null : idx);
    });
  };

  const closeSubmenu = () => {
    startTransition(() => {
      setOpenSubmenu(null);
    });
  };

  const loginBranch = sessionStorage.getItem("email");
  // const name = sessionStorage.getItem("name");

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-orange-800">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <button onClick={toggleSidebar} className="inline-flex items-center p-2 text-sm text-white rounded-lg sm:hidden hover:bg-gradient-to-r from-orange-700 to-orange-600 focus:outline-none focus:ring-1 focus:ring-black">
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
              </svg>
            </button>
            <NavLink to="/hr/home" className="flex ms-2 md:me-24">
              <img src="/logo.webp" className="h-10 me-1 w-20 " alt="Logo" />
              <span className="self-center text-xl font-semibold sm:text-xl whitespace-nowrap text-white">ELEEDOM IMF</span>
            </NavLink>
            <div>
              <span className="text-2xl text-white font-medium font-serif hidden xs:block sm:block md:block lg:block xl:block">HR MANAGER</span>
            </div>

            <div className="flex">
              <div className="flex items-center mx-5">
                <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                  <span className="sr-only">Open user menu</span>
                  {/* <img className="w-8 h-8 rounded-full" src="/profile.jpg" alt="user photo" /> */}
                </button>
              </div>
              <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                <div className="mx-4 py-3" role="none">
                  <p className="text-sm text-gray-900 dark:text-white" role="none">
                    HR Manager
                  </p>
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                    {loginBranch}
                  </p>
                </div>
                <ul className="py-1" role="none">
                  <li>
                    <NavLink to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</NavLink>
                  </li>
                  <li>
                    <LogoutHr />
                  </li>
                </ul>
              </div>
              <span className="text-sm font-medium " role="none">
                <LogoutHr />
              </span>
            </div>

          </div>
        </div>
      </nav>

      {/* aside bar */}
      <aside id="logo-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} bg-orange-800 border-r   sm:translate-x-0 `} aria-label="Sidebar">
        <div className="h-full px-3 pb-4 overflow-y-auto bg-orange-800">
          <ul className="space-y-2 font-medium text-base">
            {dashboardRouted.map((route, idx) => (
              <li key={idx}>
                {route.subRoutes ? (
                  // Render parent route with sub-routes
                  <div className="relative group">
                    <NavLink
                      to={route.path}
                      onClick={() => toggleSubmenu(idx)}
                      className={`flex items-center p-2  rounded-lg dark:text-white text-white hover:bg-gray-500 group ${openSubmenu === idx ? "bg-gray-500" : ""}`}
                    >
                      <span className="">{route.logo}</span>
                      <span className="ms-4 text-sm whitespace-nowrap">{route.title}</span>
                      <img src="/chivron.png" height={1} width={8} className="my-auto mx-2" alt="dropdown" />
                    </NavLink>
                    <ul
                      onClick={() => toggleSubmenu(idx)}
                      onMouseLeave={closeSubmenu}
                      className={`pl-2 transition-all ease-in-out duration-400 ${openSubmenu === idx ? "opacity-100 max-h-1/2" : "opacity-0 max-h-0 overflow-hidden"}`}
                    >
                      {route.subRoutes.map((subRoute, subIdx) => (
                        <li key={subIdx}>
                          <NavLink
                            to={subRoute.path}
                            className="flex text-sm  p-2 text-white text-start mx-4  hover:rounded-xl hover:bg-gray-500"
                          >
                            <img src="/chivron1.png" height={1} width={8} className="my-auto mx-2" alt="right" />
                            {subRoute.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  // Render regular route without sub-routes
                  <NavLink to={route.path} className="flex items-center p-2  rounded-lg text-white  hover:bg-gray-500 group">
                    <span className="">{route.logo}</span>
                    <span className="ms-4 text-sm">{route.title}</span>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <main className="mt-16 "></main>
    </>
  );
}

export default DashboardHr;






















