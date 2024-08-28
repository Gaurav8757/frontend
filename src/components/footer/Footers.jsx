import { Suspense } from "react";
import { NavLink } from "react-router-dom";
const Footers = () => {
  return (
    <section className="mt-2 bg-gradient-to-r from-slate-100 to-slate-100">
      <h1 className="text-black  py-5 text-xl xs:text-xl sm:text-2xl md:text-3xl xl:text-3xl text-dark font-bold bg-gradient-to-r from-white to-slate-100 ">
        More Products
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
  <div className="xl:flex xl:justify-between lg:flex lg:justify-between md:flex md:justify-between grid grid-cols-2  w-full justify-items-center text-black bg-gradient-to-r from-white to-slate-100">
    {[
      {
        imgSrc: "/umbrell.png",
        title: "Life Insurance",
        items: ["Life Insurance", "Term Insurance", "Term Insurance Calculator", "Child Saving Plans"],
      },
      {
        imgSrc: "/healthcare.png",
        title: "Health Insurance",
        items: ["Health Insurance", "Family Health Insurance", "Senior Citizen Health Insurance"],
      },
      {
        imgSrc: "/earning.png",
        title: "Investment",
        items: ["Investment Plans", "Capital Guarantee Plans", "Investment Plans for NRIs", "Child Plans"],
      },
      {
        imgSrc: "/ger.png",
        title: "General Insurance",
        items: ["Car Insurance", "Bike Insurance", "Motor Insurance", "Third Party Car Insurance"],
      },
      {
        imgSrc: "/ins.png",
        title: "Other Insurance",
        items: ["Group Health Insurance", "Marine Insurance", "Workers Compensation", "Professional Indemnity"],
      },
    ].map((section, index) => (
      <div key={index} className="mx-4 ">
        {/* <img src={section.imgSrc} height={5} width={25} alt={section.title} className="flex m-2" /> */}
        <NavLink className="leading-8 xl:text-lg lg:text-lg md:text-sm sm:text-sm text-sm">
          <span className="text-red-800 text-start font-mono font-semibold">{section.title}</span>
          {/* <img src={section.imgSrc} height={5} width={25} alt={section.title} className="inline-block m-2" /> */}
          <ul className="text-black font-serif  ">
            {section.items.map((item, idx) => (
              <li className="text-center" key={idx}>{item}</li>
            ))}
          </ul>
        </NavLink>
      </div>
    ))}
  </div>
</Suspense>

    </section>
  );
};

export default Footers;
