import { Suspense } from 'react';
import { NavLink } from 'react-router-dom';
const Footers = () => {
  return (
    <section className="bg-gradient-to-r from-white to-slate-100">
      <h1 className="text-slate-600 text-2xl xs:text-xl sm:text-2xl md:text-3xl xl:text-3xl text-dark font-bold bg-gradient-to-r from-white to-slate-100 p-4 ml-2 mr-2">More Products</h1>
      <Suspense fallback={<div>Loading...</div>}>
      <div className="grid grid-cols-2 xs:grid-cols-2 justify-center text-xl xs:text-xl sm:text-xl md:text-xl xl:text-xl sm:grid-cols-2 md:grid-cols-4  lg:grid-cols-5 xl:grid-cols-5 gap-2 justify-items-center p-5 ml-2 mr-2  text-black bg-gradient-to-r from-white to-slate-100">
        <div>
        <img src="/umbrell.png" height={5} width={25} alt="life" className="inline-block m-2"/>
          <NavLink className="leading-8 xl:text-xl lg:text-xl md:text-lg sm:text-lg text-base">
            Life Insurance
            <img src="/umbrell.png" height={5} width={25} alt="life" className="inline-block m-2"/>
            <ul className="text-blue-600">
              <li>
                Life Insurance
              </li>
              <li>
                Term Insurance
              </li>
              <li>
                Term Insurance Calculator
              </li>
              <li>
                Child Saving Plans
              </li>
            </ul>
          </NavLink>
        </div>

        <div>
        <img src="/healthcare.png" height={5} width={25} alt="life" className="inline-block m-2"/>
          <NavLink className="leading-8 xl:text-xl lg:text-xl md:text-lg sm:text-lg text-base">
            Health Insurance
            <img src="/healthcare.png" height={5} width={25} alt="life" className="inline-block m-2"/>
            <ul className="text-blue-600">
              <li>
                Health Insurance
              </li>

              <li>
                Family Health Insurance
              </li>
              <li>
                Senior Citizen Health Insurance
              </li>
            </ul>
          </NavLink>
        </div>

        <div>
        <img src="/earning.png" height={5} width={25} alt="life" className="inline-block m-2"/>
          <NavLink className="leading-8 xl:text-xl lg:text-xl md:text-lg sm:text-lg text-base">
            Investment
            <img src="/earning.png" height={5} width={25} alt="life" className="inline-block m-2"/>
            <ul className="text-blue-600">
              <li>
                Investment Plans
              </li>
              <li>
                Capital Guarantee Plans
              </li>
              <li>
                Investment Plans for NRIs
              </li>
              <li>
                Child Plans
              </li>
            </ul>
          </NavLink>
        </div>

        <div>
        <img src="/ger.png" height={5} width={25} alt="life" className="inline-block m-2"/>
          <NavLink className="leading-8 xl:text-xl lg:text-xl md:text-lg sm:text-lg text-base">
            General Insurance
            <img src="/ger.png" height={5} width={25} alt="life" className="inline-block m-2"/>
            <ul className="text-blue-600">
              <li>
                Car Insurance
              </li>
              <li>
                Bike Insurance
              </li>
              <li>
                Motor Insurance
              </li>
              <li>
                Third Party Car Insurance
              </li>
            </ul>
          </NavLink>
        </div>

        <div>
        <img src="/ins.png" height={5} width={25} alt="life" className="inline-block m-2"/>
          <NavLink className="leading-8 xl:text-xl lg:text-xl md:text-lg sm:text-lg text-base">
            Other Insurance
            <img src="/ins.png" height={5} width={25} alt="life" className="inline-block m-2"/>
            <ul className="text-blue-600">
              <li>
                Group Health Insurance
              </li>
              <li>
                Marine Insurance
              </li>
              <li>
                Workers Compensation
              </li>
              <li>
                Professional Indemnity
              </li>
            </ul>
          </NavLink>
        </div>
      </div>
      </Suspense>
    </section>
  );
};

export default Footers;
