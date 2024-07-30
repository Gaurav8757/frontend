import {NavLink} from "react-router-dom";
function CompanyName() {
  return (
    <div className="flex flex-wrap pt-4 mx-aut0">


      <div className="w-1/2  sm:w-1/2 md:w-1/3 lg:w-1/5 px-2 mb-4">
        {/*DETAILS */}
        <NavLink to="/branches/home/tataaig" className="bg-gray-100  shadow-xl text-center" >
          <img src="/1.png" className="object-fill" data-tooltip-target="tooltip-bottom" data-tooltip-placement="bottom" alt="TATA AIG" />
        </NavLink>
        {/* TOOLTIP */}
        <div id="tooltip-bottom" role="tooltip" className="absolute  z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-[black]/40 rounded-lg shadow-sm opacity-0 tooltip">
          Get a policy from Tata AIG
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      </div>

      {/* <div className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/5 px-2  mb-4">
        <div className="bg-gray-100 shadow-xl text-center">
          <img src="/1.png" className="object-fill" data-tooltip-target="tooltip-bottom1" data-tooltip-placement="bottom" alt="TATA AIG" />
        </div>
        <div id="tooltip-bottom1" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-[black]/40  rounded-lg shadow-sm opacity-0 tooltip">
          Tooltip on bottom
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      </div> */}

      {/* <div className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/5 px-2  mb-4">
        <div className="bg-gray-100 shadow-xl text-center">
          <img src="/1.png" className="object-fill" data-tooltip-target="tooltip-bottom2" data-tooltip-placement="bottom" alt="TATA AIG" />
        </div>
        <div id="tooltip-bottom2" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-[black]/40  rounded-lg shadow-sm opacity-0 tooltip">
          Tooltip on bottom
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      </div> */}

      {/* <div className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/5 px-2  mb-4">
        <div className="bg-gray-100 shadow-xl text-center">
          <img src="/1.png" className="object-fill" data-tooltip-target="tooltip-bottom3" data-tooltip-placement="bottom" alt="TATA AIG" />
        </div>
        <div id="tooltip-bottom3" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-[black]/40  rounded-lg shadow-sm opacity-0 tooltip">
          Tooltip on bottom
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      </div> */}

      {/* <div className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/5 px-2  mb-4">
        <div className="bg-gray-100 shadow-xl text-center">
          <img src="/1.png" className="object-fill" data-tooltip-target="tooltip-bottom4" data-tooltip-placement="bottom" alt="TATA AIG" />
        </div>
        <div id="tooltip-bottom4" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-[black]/40  rounded-lg shadow-sm opacity-0 tooltip">
          Tooltip on bottom
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      </div> */}

    </div>
  )
}

export default CompanyName;