import { useState, startTransition } from "react";
import { NavLink } from "react-router-dom";
import LogoutOps from "./LogoutOps.jsx";
// const RxDashboard = lazy(() => import("react-icons/rx").then(module => ({ default: module.RxDashboard })));
// const IoPeopleOutline = lazy(() => import("react-icons/io5").then(module => ({ default: module.IoPeopleOutline })));
// const FcViewDetails = lazy(() => import("react-icons/fc").then(module => ({ default: module.FcViewDetails }))); 

const SidebarOps = () => {
  const dashboardRouted = [
    {
      title: "Home",
      path: "/ops/home",
      logo: <img src="/pages.png" height={10} width={25} alt="dashboard"/>
    },
    {
      title: "Create Policy",
      path: "/ops/home/add/policy",
      // logo: < FcViewDetails size={24}/>
      logo: <img src="/policy.png" height={5} width={25} alt="policy"/>
    },
    {
      title: "Policy Lists",
      path: "/ops/home/policy",
      // logo: <IoPeopleOutline size={25} />
      logo: <img src="/grids.png" height={5} width={25} alt="grid"/>
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

  // const loginBranch = sessionStorage.getItem("email");
  const name = sessionStorage.getItem("name");
  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-blue-800">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button  onClick={toggleSidebar} type="button" className="inline-flex items-center p-2 text-sm text-white rounded-lg sm:hidden hover:bg-gradient-to-r from-blue-700 to-sky-600 focus:outline-none focus:ring-1 focus:ring-sky-500">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
              </button>
              <NavLink to="/ops" className="flex ms-2 md:me-24">
                <img src="/logo.webp "  className="h-10 me-1 w-20" alt="Logo" />
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
                    {/* <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                     {loginBranch}
                    </p> */}
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <NavLink to="/branches" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Home</NavLink>
                    </li>
                    <li>
                      <NavLink to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</NavLink>
                    </li>
                    <li>
                      <LogoutOps />
                      {/* <NavLink to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Earnings</NavLink> */}
                    </li>

                  </ul>
                </div>
              </div>
              <span>
                      <LogoutOps />
                      {/* <NavLink to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Earnings</NavLink> */}
                    </span>
            </div>

          </div>
        </div>
      </nav>

      {/* aside bar */}
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-42 h-screen pt-20 transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} bg-blue-800 border-r  sm:translate-x-0 `}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-blue-800">
          <ul className="space-y-2 font-medium">
            {dashboardRouted.map((route, idx) => (
              <li key={idx}>
                {route.subRoutes ? (
                  // Render parent route with sub-routes
                  <div className="relative group">
                    <NavLink
                      to={route.path}
                      onClick={() => toggleSubmenu(idx)}
                      className={`flex items-center p-2  rounded-lg text-white hover:bg-slate-800 group ${openSubmenu === idx ? "bg-slate-800" : ""}`}
                    >
                      <span className="">{route.logo}</span>
                      <span className="ms-2 text-sm">{route.title}</span>
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
                            className="block p-2 ms-4 text-sm text-white text-start mx-4  hover:rounded-xl hover:bg-slate-800"
                          >
                            {subRoute.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  // Render regular route without sub-routes
                  <NavLink to={route.path} className="flex items-center p-1 rounded-lg text-white  hover:bg-slate-800 group">
                    <span className="">{route.logo}</span>
                    <span className="ms-2 text-sm">{route.title}</span>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      </aside>


      <main className="mt-16">
        {/* ALL PAGES RENDER HERE */}
      </main>
    </>
  );
};

export default SidebarOps;
