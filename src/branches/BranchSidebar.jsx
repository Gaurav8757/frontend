import { useState, startTransition } from "react";
import { NavLink } from "react-router-dom";
import BranchLogout from "./BranchLogout.jsx";

const BranchSidebar = () => {
  const dashboardRouted = [
    {
      title: "Home",
      path: "/branches/home",
      // logo: <RxDashboard size={25} />
      logo: <img src="/pages.png" height={10} width={25} alt="dashboard" />
    },
    {
      title: "Advisor",
      path: "#",
      // logo: <CgProfile size={25} />,
      logo: <img src="/advisor.png" height={5} width={25} alt="leger" />,
      subRoutes: [
        {
          title: "Add Advisor",
          path: "/branches/home/advisor/register",
          dash: ""
        },
        {
          title: "Advisor Lists",
          path: "/branches/home/advisor/lists",
          dash: ""
        },
      ]
    },
    {
      title: "Policy Lists",
      path: "/branches/home/viewinsurance",
      // logo: <RiGitBranchFill size={25} />,
      logo: <img src="/policy.png" height={5} width={25} alt="policy" />
    },
    {
      title: "Leger",
      path: "#",
      // logo: <FaMoneyBill size={25} />,
      logo: <img src="/account.png" height={5} width={25} alt="leger" />,
      subRoutes: [
        {
          title: "Daily Advisor",
          path: "/branches/home/daily/leger",
          dash: ""
        },
        {
          title: "Monthly Advisor",
          path: "/branches/home/monthly/leger",
          dash: ""
        },
      ]
    },
    {
      title: "CEC",
      path: "#",
      // logo: <CgProfile size={25} />,
      logo: <img src="/cic.png" height={5} width={25} alt="cic" />,
      subRoutes: [
        {
          title: "Claim",
          path: "/branches/home/claim/lists",
          dash: ""
        },
        {
          title: "Endorsment",
          path: "/branches/home/indorsh/lists",
          dash: ""
        },
        {
          title: "Cancellation",
          path: "/branches/home/cncl/lists",
          dash: ""
        },
      ]
    },
    {
      title: "Reports",
      path: "/branches/home/daily/visits",
      // logo: <RxDashboard size={25} />
      logo: <img src="/tablet.png" height={10} width={25} alt="dashboard" />
    },
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
  const name = sessionStorage.getItem("name");
  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-blue-800">
        <div className="px-3 py-2 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button onClick={toggleSidebar} type="button" className="inline-flex items-center p-2 text-sm text-white rounded-lg sm:hidden hover:bg-gradient-to-r from-blue-700 to-sky-600 focus:outline-none focus:ring-1 focus:ring-sky-500">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
              </button>
              <NavLink to="/branches/home" className="flex ms-2 md:me-24">
                <img src="/logo.webp " className="h-10 w-20 me-2 " alt="Logo" />
                <span className="self-center text-xl font-semibold sm:text-xl whitespace-nowrap text-white">ELEEDOM IMF</span>
              </NavLink>
            </div>
            <div>
              <span className="text-2xl text-white font-medium font-serif hidden xs:block sm:block md:block lg:block xl:block">{name}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center mx-5">
                <div>
                  <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                    <span className="sr-only">Open user menu</span>
                    {/* <img className="w-8 h-8 rounded-full" src="/profile.jpg" alt="user photo" /> */}
                  </button>
                </div>
                <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                  <div className="px-4 py-3" role="none">
                    <p className="text-sm text-gray-900 dark:text-white" role="none">
                      {name}
                    </p>
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                      {loginBranch}
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <NavLink to="/branches" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Home</NavLink>
                    </li>
                    <li>
                      <NavLink to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</NavLink>
                    </li>
                    <li>
                      <BranchLogout />
                      {/* <NavLink to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Earnings</NavLink> */}
                    </li>
                  </ul>
                </div>
              </div>
              <span>
                <BranchLogout />
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* aside bar */}
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-48 h-screen pt-20 transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} bg-blue-800  border-r  sm:translate-x-0  `}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-blue-800 ">
          <ul className="space-y-2 font-medium">
            {dashboardRouted.map((route, idx) => (
              <li key={idx}>
                {route.subRoutes ? (
                  // Render parent route with sub-routes
                  <div className="relative group">
                    <NavLink
                      to={route.path}
                      onClick={() => toggleSubmenu(idx)}
                      className={`flex items-center p-2  rounded-lg text-white  hover:bg-slate-800 group ${openSubmenu === idx ? "bg-gray-700 " : ""}`}
                    >
                      <span className="">{route.logo}</span>
                      <span className="ms-4 text-sm">{route.title}</span>
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
                            className="flex p-2  text-sm text-white text-start mx-0 mt-1  hover:rounded-xl hover:bg-slate-800"
                          ><img src="/chivron1.png" height={1} width={8} className="my-auto mx-2" alt="right" />
                            {subRoute.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  // Render regular route without sub-routes
                  <NavLink to={route.path} className="flex items-center p-2  rounded-lg text-white hover:bg-slate-800 group">
                    <span className="">{route.logo}</span>
                    <span className="ms-4 text-sm">{route.title}</span>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <main className="mt-16 ">
        {/* ALL PAGES RENDER HERE */}
      </main>
    </>
  );
};

export default BranchSidebar;
