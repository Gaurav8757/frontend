/* eslint-disable react/prop-types */

import { NavLink } from "react-router-dom";

function HealthInsurance() {
  const sublinks = [
    {
      subtitle: "Health Insurance",
      image: "/he1.svg",
      link: "/healthinsurance",
      sublink: "/healthinsurance/health"
    },
      {
        subtitle: "Family Health Insurance",
        image: "/he2.svg",
        link: "/familyhealthinsurance",
        sublink: "/healthinsurance/health2"
      },
      {
        subtitle: "Employee Group",
        image: "/he3.svg",
        link: "/grouphealthinsurance",
        sublink: "/healthinsurance/health3"
      },
  ]

  return (
    <section className="container-fluid bg-slate-100">
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 gap-2 justify-items-center pt-10 ml-2 mr-2   ">
        {sublinks.map((data, idx) => (
          // adding link to click
          <NavLink to={data.sublink} className="grid   hover:-translate-y-1 hover:-translate-x-0" key={idx}>
            {/* home links */}
            <div className="bg-gradient-to-r from-slate-300 to-slate-400 rounded-lg shadow-lg shadow-white-500/50 hover:shadow-none flex justify-items-center justify-center">
              {/* <div className="bg-green-200 z-">hello</div> */}
              <img src={`${data.image}`} className="items-center border-2 border-slate-200 shadow-2xl" alt="img" />
            </div>
            <div className="text-center mt-4">{data.subtitle}</div>
          </NavLink>
        ))}
      </div>
    </section>
  );
}

export default HealthInsurance;
