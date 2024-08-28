/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
const Buyalso = ({ buyalso }) => {
  return (
    <section className="container-fluid  bg-white">
      <div className=" pt-4 ml-2 mr-2   flex justify-start bg-white">
        <div className="text-black text-2xl font-bold ml-4 ">
          <h1 className="text-base sm:text-lg md:text-base lg:text-2xl xl:text-2xl">
            Also Buy
          </h1>
          <svg
            width="70"
            height="70"
            xmlns="http://www.w3.org/2000/svg"
            className="-mt-10 -ml-3"
          >
            <line
              x1="10"
              y1="40"
              x2="30"
              y2="40"
              stroke="red"
              strokeWidth="3"
            />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 shadow-xl gap-4 justify-items-center pb-12 bg-white">
        {buyalso.map((obj, idx) => (
          // adding link to click
          <NavLink
            to="#"
            className="grid w-32 xl:w-48 lg:w-48 md:w-40 sm:w-38 hover:-translate-y-1 hover:-translate-x-0  bg-red-800 rounded-lg  hover:shadow-none  shadow-2xl   "
            key={idx}
          >
            {/* home links */}
            <div className="flex bg-gradient-to-r from-red-700 to-slate-500  bg-clip-text text-transparent text-sm  font-bold  m-2  items-start justify-start">
              <img src={obj.image} alt={obj.title} className="" />
            </div>

            {/* <p className="text-md justify-items-start p-1 ">{obj.name}</p> */}
          </NavLink>
        ))}
      </div>
    </section>
  );
};

export default Buyalso;
