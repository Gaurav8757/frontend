/* eslint-disable react/prop-types */
import Sidebar from "./Sidebar";
import { useState, startTransition } from "react";
import { NavLink, Link } from "react-router-dom";
function classNames(...classes) {
  // console.log(classes.filter(Boolean).join(' '));
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ navigation }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const toggleSidebar = () => {
    startTransition(() => {
      setSidebarOpen(!isSidebarOpen);
    });
  };

  const toggleSubMenu = (index) => {
    setOpenSubMenu((prev) => (prev === index ? null : index));
  };

  return (
    <>
      {/* Navbar */}
      <nav style={{ backgroundColor: "#A31217" }}>
        <div className="mx-auto max-w-auto px-2">
          <div className="relative flex h-16 items-center justify-between">
            <div className="inset-y-0 left-0 flex items-center sm:justify-center sm:hidden">
              <button
                className="relative inline-flex items-center justify-center rounded-lg text-white hover:bg-red-500"
                onClick={toggleSidebar}
              >
                <span className="sr-only">Open main menu</span>
                {isSidebarOpen ? (
                  <img src="/off.png" height={5} width={25} alt="staff" />
                ) : (
                  <img src="/app.png" height={5} width={25} alt="leger" />
                )}
              </button>
            </div>

            <NavLink to="/" className="flex ms-4 md:me-2 justify-center items-center">
              <img
                src="/logo.webp"
                rel="preload"
                loading="lazy"
                className="h-16 items-center py-2 xs:h-12 sm:h-12 md:h-16 lg:h-16 xl:h-20 mx-2 w-28 sm:w-28 md:w-28 lg:w-32 xl:w-32"
                alt="Logo"
              />
            </NavLink>

            <div className="hidden sm:ml-2 items-center sm:block md:block py-10">
              <div className="flex lg:space-x-2 xl:space-x-3">
                {navigation.map((item, idx) => (
                  <div key={idx} className="relative group text-lg">
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        classNames(
                          isActive
                            ? "text-slate-200 sm:text-sm md:text-sm lg:text-sm xl:text-lg"
                            : "bg-gradient-to-r from-slate-100 via-slate-100 to-slate-200 bg-clip-text text-transparent hover:bg-orange-600",
                          "rounded-md px-2 py-2 font-medium text-gray-900"
                        )
                      }
                      aria-current={item.current ? "page" : undefined}
                      onClick={() => item.submenus && toggleSubMenu(idx)} // Toggle submenu on click
                    >
                      {item.name}
                    </NavLink>
                    {item.submenus && (
                      <>
                        <svg
                          className="inline-flex h-5 w-6 text-gray-100 group-hover:text-orange-400 transition-all ease-in duration-75"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                          onClick={() => toggleSubMenu(idx)} // Toggle submenu on arrow click
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>

                        {openSubMenu === idx && (
                          <div className="absolute z-20 bg-gray-200 text-gray-900 pt-4 mt-1 space-y-2 rounded-md w-40">
                            {item.submenus.map((submenu, submenuIdx) => (
                              <NavLink
                                key={submenuIdx}
                                to={submenu.to}
                                className="block px-2 py-2 text-md hover:bg-orange-700 hover:text-white"
                                onClick={() => setOpenSubMenu(null)} // Close submenu on link click
                              >
                                {submenu.name}
                              </NavLink>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex z-40 justify-end items-end">
              <Link
                to="/login"
                className="relative xl:hidden sm:hidden inline-flex items-center justify-end p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-0 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
              >
                <span className="relative px-2 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Login
                </span>
              </Link>
            </div>
          </div>
        </div>

        <Sidebar navigation={navigation} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </nav>
    </>
  );
}
