/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
const Footer2 = ({ footer }) => {
    return (
        <section className="bg-gradient-to-r from-slate-200  to-slate-200 ">

            <div className=" justify-center text-md xs:text-sm sm:text-md md:text-md xl:text-md  justify-items-center dark:text-gray-300 text-black bg-gradient-to-r from-slate-200  to-slate-200  font-serif">

                <div className="py-4 flex w-full flex-wrap justify-center  bg-gray-100 bg-gradient-to-r from-slate-200  to-slate-200 md:flex md:items-center md:justify-center">

                    {footer.map((item, idx) => (
                        <div key={idx} className="transition-transform transform hover:translate-y-[-2px] hover:font-normal ease-in-out text-sm sm:text-sm md:text-base lg:text-lg xl:text-lg">
                            <NavLink
                                to={item.to}
                                className="first-line:bg-red-700  text-gray-900 mx-1 sm:mx-2 md:mx-2 lg:mx-3 xl:mx-3 leading-loose  hover:text-red-700 hover:font-semibold rounded-md p-1  font-medium ">
                                {item.name}
                            </NavLink>
                        </div>
                    ))}

                </div>



                <div className="px-4 py-2  bg-gradient-to-r from-slate-200  to-slate-200   md:flex md:items-center md:justify-between">
                    <span className="text-sm text-black  sm:text-center"> <NavLink to="#">Eleedom Imf Private Limited</NavLink>. <br/>  ©{new Date().getFullYear()} All Rights Reserved.
                    </span>
                    <div className="flex mt-4  justify-center md:mt-0 space-x-5 text-red-700   rtl:space-x-reverse">

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