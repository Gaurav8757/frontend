/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
const Footer2 = ({ footer }) => {
    return (
        <section className="bg-gradient-to-r from-slate-200  to-slate-200 ">

            <div className=" justify-center text-md xs:text-sm sm:text-md md:text-md xl:text-md  justify-items-center  ml-2 mr-2 dark:text-gray-300 text-black bg-gradient-to-r from-slate-200  to-slate-200  ">

                <div className="py-4 bg-gray-100 bg-gradient-to-r from-slate-200  to-slate-200 md:flex md:items-center md:justify-center">

                    {footer.map((item, idx) => (
                        <div key={idx} className="">
                            <NavLink
                                to={item.to}
                                className="first-line:bg-blue-700  text-gray-900  hover:text-blue-700 rounded-md p-5  font-medium">
                                {item.name}
                            </NavLink>
                        </div>
                    ))}

                </div>



                <div className="px-4 py-2  bg-gradient-to-r from-slate-200  to-slate-200   md:flex md:items-center md:justify-between">
                    <span className="text-sm text-black  sm:text-center">© 2023 <NavLink to="#">Eleedom Imf Private Limited</NavLink>.  All Rights Reserved.
                    </span>
                    <div className="flex mt-4  justify-center md:mt-0 space-x-5 text-blue-700   rtl:space-x-reverse">

                        <NavLink to="#">
                            <img src="/facebook.png" height={5} width={20} alt="facebook"/>
                        </NavLink>
                        <NavLink to="#" >
                        <img src="/instagram.png" height={5} width={20} alt="instagram"/>
                        </NavLink>
                        <NavLink to="#" >
                        <img src="/twitter.png" height={5} width={20} alt="twitter"/>
                        </NavLink>
                       
                        <NavLink to="#" >
                        <img src="/linkedin.png" height={5} width={20} alt="linkedin"/>
                        </NavLink>
                    </div>
                </div>
            </div>



        </section>


    )
}



export default Footer2;