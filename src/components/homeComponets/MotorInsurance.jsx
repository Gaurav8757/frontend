import { NavLink } from "react-router-dom";
function MotorInsurance() {
 
  const sublinks = [
      {
        subtitle: "Car Insurance",
        image: "/m2.svg",
        link: "/carinsurance",
        sublink: "/motorinsurance/car"
      },
      {
        subtitle: "2 Wheeler Insurance",
        image: "/m1.svg",
        link: "/twowheelinsurance",
        sublink: "/motorinsurance/twowheeler"
      },
      {
        subtitle: "Commerical Vehicle Insurance",
        image: "/m3.svg",
        link: "/commercialinsurance",
        sublink: "/motorinsurance/commervehicle"
      },
  ]

  return (
    <section className="container-fluid bg-white">
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 gap-2 justify-items-center pt-10  bg-white">
        {sublinks.map((data, idx) => (
          // adding link to cli
          <NavLink to={data.sublink} className="flex flex-col    hover:-translate-y-1 hover:-translate-x-0" key={idx}>
            {/* home links */}
            <div className="flex justify-center border-slate-200 ">
              {/* <div className="bg-green-200 z-">hello</div> */}
              <img src={`${data.image}`} className="items-center border-1 border-red-800 shadow-2xl" alt="img" />
            </div>
            <div className="text-center">{data.subtitle}</div>
          </NavLink>
        ))}
      </div>
    </section>
  );
}

export default MotorInsurance;
