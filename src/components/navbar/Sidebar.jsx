/* eslint-disable react/prop-types */
import { useState, useEffect, useRef, startTransition } from "react";
import { NavLink } from "react-router-dom";

function classNames(...classes) {
  // console.log(classes.filter(Boolean).join(' '));
  return classes.filter(Boolean).join(" ");
}

// Your component function
const Sidebar = ({ navigation, isSidebarOpen, toggleSidebar }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const sidebarRef = useRef(null);

   // Function to toggle the submenu
   const toggleSubmenu = (idx) => {
    startTransition(() => {
      setOpenSubmenu(openSubmenu === idx ? null : idx);
    });
  };

   // Function to handle link click
   const handleLinkClick = () => {
    toggleSidebar(false); // Close the sidebar when a link is clicked
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      toggleSidebar(false); // Close the sidebar if the click is outside
    }
  };

  // Adding event listener for clicks outside of sidebar
  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);
  return (
    <aside  ref={sidebarRef}
      className={`absolute inset-y-[63px] w-40 z-50 bg-gradient-to-r from-orange-800 to-orange-900 h-full transform transition-transform md:hidden ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="w-auto text-start text-sm sm:text-base md:text-base lg:text-lg xl:text-lg ml-4 mr-3 list-none m-0 p-0">
        {navigation.map((item, idx) => (
          <div key={idx} className="relative group">
            <div
              onClick={() => toggleSubmenu(idx)} // Toggle the submenu on click
            >
              <NavLink
                to={item.to}
                className={classNames(
                  item.current
                    ? "bg-white bg-clip-text text-transparent text-base sm:text-xl md:text-xl lg:text-xl xl:text-xl"
                    : "text-gray-300 hover:text-white",
                  "rounded-md  font-medium text-slate-300 block py-2"
                )}
                aria-current={item.current ? "page" : undefined}
                //  onClick={handleLinkClick}
              >
                {item.name}
                {item.submenus && (
                  <span className="float-right">
                    <svg
                      className="inline-flex h-5 w-5 text-slate-300 group-hover:text-white transition-all ease-in duration-75"
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
                  </span>
                )}
              </NavLink>
            </div>
            {item.submenus && (
              <ul
                className={`pl-1 transition-all ease-in duration-300 ${
                  openSubmenu === idx
                    ? "opacity-100 max-h-96"
                    : "opacity-0 max-h-0 overflow-hidden"
                }`}
              >
                {item.submenus.map((submenu, subIdx) => (
                  <li key={subIdx} className="mb-1">
                    <NavLink
                      to={submenu.to}
                      className="text-sm sm:text-base md:text-base lg:text-lg xl:text-lg text-gray-200 font-sans hover:text-white hover:bg-slate-600 block py-1 px-1 rounded"
                      onClick={handleLinkClick}
                    >
                      {submenu.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
