import { useState, startTransition } from "react";
import { NavLink } from "react-router-dom";
import  LogoutAdvisor  from "./LogoutAdvisor.jsx";

function DashboardAdvisor() {
    const dashboardRouted = [
        {
          title: "Home",
          path: "/advisor/home",
          // logo: <RxDashboard size={25} />
          logo:<img src="/pages.png" height={10} width={25} alt="dashboard"/>
        },
        {
          title: "Insurance",
         path: "#",
         // logo: <RiGitBranchFill size={25} />
         logo: <img src="/policy.png" height={5} width={25} alt="insurance"/>,
         subRoutes: [
              {
                title: "New One",
                path: "/advisor/home/insurance"
              },
              {
                title: "View Insurance",
                path: "/advisor/home/viewinsurance"
              }
            ]
       },
        // {
        //    title: "",
        //   path: "",
        //   logo: <img src="/policy.png" height={5} width={25} alt="policy"/>
        // },
        // {
        //   title: "Payout Grid",
        //   path: "/advisor/home/payout/view",
        //   // logo: <GiReceiveMoney size={25} />
        //   logo: <img src="/grids.png" height={5} width={25} alt="grid"/>
        // },
        // {
        //   title: "Add Salary",
        //   path: "/branches",
        //   logo: <TbMoneybag size={25} />
        // },
        // {
        //   title: "Generate Salary",
        //   path: "/branches",
        //   logo: <FcMoneyTransfer size={25} />
        // },
        // {
        //   title: "Report",
        //   path: "/branches",
        //   logo: <TbReport size={25} />,
        //   subRoutes: [
        //     {
        //       title: "Policy",
        //       path: "/branches"
        //     },
        //     {
        //       title: "Add Policy Details",
        //       path: "/branches"
        //     }
          
        //   ]
        // }
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
      const loginBranch = sessionStorage.getItem("advisoremail");
      const names = sessionStorage.getItem('name');
      return (
        <>
          <nav className="fixed top-0 z-50 w-full bg-blue-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-start rtl:justify-end">
                  <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls={toggleSidebar} type="button" className="inline-flex border bg-gradient-to-r from-blue-700 to-blue-300 items-center p-2 text-sm text-white rounded-lg sm:hidden hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 ">
                    <span className="sr-only">Open sidebar</span>
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                    </svg>
                  </button>
                  <NavLink to="/advisor/home" className="md:flex ms-2 hidden  md:me-24">
                    <img src="/logo.webp"  className="h-10 w-20 " alt="Logo" />
                    <span className="self-center text-xl font-semibold sm:text-xl whitespace-nowrap text-white">ELEEDOM IMF</span>
                  </NavLink>
                </div>
                <div>
                  <span className="text-2xl text-white font-medium font-serif "> {`Advisor`}</span>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center  me-1">
                    <div>
                      <button type="button" className="flex text-sm bg-blue-800 rounded-full focus:ring-4 focus:ring-gray-300 " aria-expanded="false" data-dropdown-toggle="dropdown-user">
                        <span className="sr-only">Open user menu</span>
                        {/* <img className="w-8 h-8 rounded-full" src="/profile.jpg" alt="user photo" /> */}
                      </button>
                    </div>
                    <div className="z-50 hidden my-4 text-base list-none bg-gray-700 divide-y divide-gray-100 rounded shadow " id="dropdown-user">
                      <div className="px-4 py-3" role="none">
                        <p className="text-sm text-gray-900 dark:text-white" role="none">
                          {names}
                        </p>
                        <p className="text-sm font-medium text-gray-200 truncate " role="none">
                         {loginBranch}
                        </p>
                      </div>
                      <ul className="py-1" role="none">
                        <li>
                          <NavLink to="#" className="block px-4 py-2 text-sm text-gray-100 hover:bg-gray-100 " role="menuitem">Home</NavLink>
                        </li>
                        <li>
                          <NavLink to="#" className="block px-4 py-2 text-sm text-gray-100 hover:bg-gray-100 " role="menuitem">Settings</NavLink>
                        </li>
                        <li>
                          <LogoutAdvisor />
                        </li>
    
                      </ul>
                    </div>
                    
                  </div>
                  <LogoutAdvisor />
                </div>
              </div>
            </div>
          </nav>
    
          {/* aside bar */}
          <aside
            id="logo-sidebar"
            className={`fixed top-0 left-0 z-40 w-48 h-screen pt-16 transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} bg-blue-700 border-r  sm:translate-x-0 `}
            aria-label="Sidebar"
          >
            <div className="h-full px-3 pb-2 overflow-y-auto bg-blue-700">
              <ul className="space-y-3 font-medium">
                {dashboardRouted.map((route, idx) => (
                  <li key={idx}>
                    {route.subRoutes ? (
                      // Render parent route with sub-routes
                      <div className="relative font-medium group">
                       <NavLink
                      to={route.path}
                      onClick={() => toggleSubmenu(idx)}
                      className={`flex items-center p-1  rounded-lg text-white  hover:bg-slate-800 group ${openSubmenu === idx ? "bg-gray-700 " : ""}`}
                    >
                      <span className="w-7">{route.logo}</span>
                      <span className="ms-4 md:text-base text-sm">{route.title}</span>
                      <img src="/chivron.png" height={1} width={8} className="my-auto mx-2 " alt="dropdown" />
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
                            className="flex p-2 md:text-base text-sm text-white text-start mx-0 mt-1  hover:rounded-lg hover:bg-slate-800"
                          ><img src="/chivron1.png" height={1} width={8} className="my-auto mx-2" alt="right" />
                            {subRoute.title}
                          </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      // Render regular route without sub-routes
                      <NavLink to={route.path} className="flex items-center p-1 mt-4 rounded-lg text-white  hover:bg-slate-800 group ">
                        <span className="w-7">{route.logo}</span>
                        <span className="ms-4 text-sm md:text-base">{route.title}</span>
                      </NavLink>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
    
    
          <main className="mt-16">
           
          </main>
        </>
      );
    }

export default DashboardAdvisor;