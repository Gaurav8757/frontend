import { useEffect, useState } from "react";
import axios from "axios";
import VITE_DATA from "../../config/config.jsx";
const Branch = () => {
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        // Fetch data directly without checking for the token
        axios
            .get(`${VITE_DATA}/api/branch-list`)
            .then((response) => {
                setAPIData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <section className="container-fluid relative bg-orange-100">
            <div className="container-fluid p-1 border-orange-200 border-dashed rounded bg-slate-100">
                <h1 className="text-2xl mb-2 font-bold">Our Branches</h1>
                <div className="max-w-full bg-orange-100">
                    {APIData.map((data, index) => (
                        <div className="card grid sm:grid-cols-5 lg:grid-cols-7 grid-cols-3 horizontal border-b-2 border-black  overflow-y-hidden bg-orange-100 p-1 rounded" key={data._id}>
                            {/* numbers div */}
                            <div className=" justify-center items-center  lg:flex hidden">
                                <div className="text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl font-bold text-orange-800">{index + 1}</div>
                                <div className="w-1 h-1 mt-4 sm:mt-4 md:mt-4 lg:mt-5 xl:mt-5 bg-blue-500 ml-0.5"></div>
                            </div>
                            {/* branch name */}
                            <div className=" flex-wrap flex justify-center items-center">
                                <h5 className="text-sm  md:text-base lg:text-base xl:text-lg font-bold text-orange-900 text-center">
                                    {data.branchname}
                                </h5>
                            </div>
                            {/* company name and details */}
                            <div className="flex-wrap  flex flex-col justify-center items-center text-center bg-orange-100">
                                <p className="mt-4 hidden text-blue-500 font-bold text-sm sm:text-lg md:text-xl lg:text-base xl:text-lg">Address</p>
                                <p className="text-center text-orange-900 font-bold my-auto text-sm  md:text-base lg:text-base xl:text-lg ">
                                    {data.branchaddress} <br />
                                </p>
                            </div>
                            <div className=" hidden col-span-2 flex-wrap justify-center items-center  sm:flex text-center">
                                <h5 className=" flex whitespace-wrap text-sm  md:text-base lg:text-base xl:text-lg  font-bold text-orange-900 text-center">
                                    {data.branchemail}
                                </h5>
                            </div>
                            {/* contacts */}
                            <div className="flex-1 flex justify-center items-center  text-center">
                                <h5 className="text-sm  md:text-base lg:text-base xl:text-lg  font-bold text-orange-900 text-center">
                                    {data.branchmobile}
                                    <br />
                                    {data.branchphone}
                                </h5>
                            </div>
                            {/* pincode */}
                            <div className="hidden md:hidden justify-center items-center sm:flex lg:flex xl:flex text-center">
                                <h5 className="font-bold    text-orange-900 text-sm  md:text-base lg:text-base xl:text-lg">
                                    {data.branchpincode}
                                </h5>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

    )
}
export default Branch;