import {
    Home,
    MessageSquare,
    BarChart2,
    Settings,
    ShoppingCart,
    Package,
    Heart,
    Archive,
    User,
   
  } from "lucide-react";

  const sidebarItems = [
    { icon: Home, label: "Home" },
    { icon: MessageSquare, label: "Messages" },
    { icon: BarChart2, label: "Analytics" },
    { icon: ShoppingCart, label: "Orders" },
    { icon: Package, label: "Products" },
    { icon: Heart, label: "Favorites" },
    { icon: Archive, label: "Archive" },
    { icon: Settings, label: "Settings" },
  ];
/* eslint-disable react/prop-types */

function Asidebar() {
  return (
    
      <aside className=" mt-20 fixed left-2 top-2 md:top-6 bottom-2 w-16 flex flex-col items-center justify-between bg-blue-700 rounded-md shadow-lg">
        <div className="flex flex-col justify-between items-end">
          <div className="w-full pt-6 flex flex-col items-center space-y-6">
            {sidebarItems.map((item, index) => (
              <div key={index} className="relative group">
                <button
                  data-tooltip-target={`tooltip-${index} tooltip-right`}
                  data-tooltip-placement="right"
                  className="text-white hover:bg-slate-900 shadow-inner rounded-full p-3"
                  aria-label={item.label}
                >
                  <item.icon className="h-6 w-6" />
                </button>
                {/* Tooltip */}
                <div
                  id={`tooltip-${index} tooltip-right`}
                  role="tooltip"
                  className="absolute left-0 -top-8 z-10 hidden group-hover:block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded- shadow-sm"
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>
          <div className="w-full pt-6 bottom-5 ">
            <button
              className="text-white hover:bg-slate-900 rounded-full p-2"
              aria-label="User profile"
            >
              <User className="h-6 w-6" />
            </button>
          </div>
        </div>
      </aside>
  )
}

export default Asidebar;