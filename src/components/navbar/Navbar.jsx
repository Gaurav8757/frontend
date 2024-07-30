/* eslint-disable react/prop-types */
import Sidebar from './Sidebar';
import { useState, startTransition } from "react";
import { NavLink } from 'react-router-dom';
function classNames(...classes) {
  // console.log(classes.filter(Boolean).join(' '));
  return classes.filter(Boolean).join(' ');
}

export default function Navbar({ navigation }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    startTransition(() => {
    setSidebarOpen(!isSidebarOpen);
  });
  };

  return (
    <>
      {/* Navbar */}
      <nav style={{backgroundColor: "#A31217"}}>
        <div className="mx-auto max-w-auto px-2">
          <div className="relative flex h-20 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:justify-center  sm:hidden">
              {/* Mobile menu button*/}
              <button
                className="relative inline-flex items-center justify-center rounded-lg  text-white hover:bg-red-500 "
                onClick={toggleSidebar}
              >
               
                <span className="sr-only">Open main menu</span>
                {isSidebarOpen ? (
                  // <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  <img src="/off.png" height={5} width={25} alt="staff"/>
                ) : (
                  <img src="/app.png" height={5} width={25} alt="leger"/>
                  // <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
            <div className="flex flex-1  items-center sm:justify-center justify-evenly sm:items-stretch md:justify-between">
              <NavLink to="/" className="flex ms-4 md:me-2  items-center">
                <img src="/logo.webp" rel='preload' loading='lazy' className=" h-16  py-2 xs:h-12 sm:h-12 md:h-16   lg:h-16   xl:h-20  mx-2 w-28 sm:w-28 md:w-28 lg:w-32 xl:w-32 " alt="Logo" />
               
              </NavLink>

              <div className="hidden sm:ml-2  items-center sm:block md:block py-10">
                <div className="flex lg:space-x-2  xl:space-x-3 ">
                  {navigation.map((item, idx) => (
                    <div key={idx} className="relative group text-lg">
                      <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                          classNames(
                            isActive
                              ? ' text-slate-200   sm:text-sm md:text-sm lg:text-sm xl:text-lg'
                              : 'bg-gradient-to-r from-slate-100 via-slate-100 to-slate-200 bg-clip-text text-transparent hover:bg-orange-600 ',
                            'rounded-md px-2 py-2 font-medium text-gray-900'
                          )
                        }
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </NavLink>
                      {item.submenus && (
                        <>
                          <NavLink>
                            <svg
                              className="inline-flex h-5 w-6 text-gray-100 group-hover:text-orange-400 transition-all ease-in duration-75"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </NavLink>

                          <NavLink>
                            {item.submenus && (
                              <div className="absolute hidden z-20 bg-gray-200 text-gray-900 pt-4 mt-1 space-y-2 rounded-md group-hover:block w-40">
                                {item.submenus.map((submenu, idx) => (
                                  <NavLink
                                    key={idx}
                                    to={submenu.to}
                                    className="block px-2 py-2 text-md hover:bg-orange-700 hover:text-white"
                                  >
                                    {submenu.name}
                                  </NavLink>
                                ))}
                              </div>
                            )}
                          </NavLink>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>


              <div className="absolute inset-y-0 right-0 z-40 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
              </div>
            </div>
          </div>
        </div>
        <Sidebar navigation={navigation} isSidebarOpen={isSidebarOpen} />
      </nav>


    </>
  );
}
