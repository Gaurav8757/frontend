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
        <section className="container-fluid relative bg-orange-50">
            <div className="container-fluid p-2 border-orange-200 border-dashed rounded-lg bg-orange-100">
                <h1 className="text-3xl font-bold pt-3 pb-5">Our Branches</h1>
                <div className="max-w-full bg-orange-100">
                    {APIData.map((data, index) => (
                        <div className="card horizontal flex my-4 flex-wrap justify-between  overflow-y-hidden bg-orange-100 p-2 rounded-lg" key={data._id}>
                            {/* numbers div */}
                            <div className="flex h-40 justify-center items-center  sm:flex md:flex xl:flex">
                                <div className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-orange-800">{index + 1}</div>
                                <div className="w-2 h-2 mt-4 sm:mt-4 md:mt-4 lg:mt-6 xl:mt-8 bg-blue-500 ml-0.5"></div>
                            </div>
                            {/* branch name */}
                            <div className="flex-1 flex h-40 justify-center items-center">
                                <h5 className="text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl font-bold text-orange-900 text-center">
                                    {data.branchname}
                                </h5>
                            </div>
                            {/* company name and details */}
                            <div className="flex-1 flex flex-col justify-center items-center h-40 text-center bg-orange-100">
                                <p className="mt-4 hidden text-blue-500 font-bold text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl">Address</p>
                                <p className="text-center text-orange-900 font-bold my-auto text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl">
                                    {data.branchaddress} <br />
                                </p>
                            </div>
                            <div className="hidden  flex-wrap justify-center items-center h-40  xl:flex text-center">
                                <h5 className="text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl xl:ml-20 font-bold text-orange-900 text-center">
                                    {data.branchemail}
                                </h5>
                            </div>
                            {/* contacts */}
                            <div className="flex-1 flex justify-center items-center h-40 text-center">
                                <h5 className="text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl font-bold text-orange-900 text-center">
                                    {data.branchmobile}
                                    <br />
                                    {data.branchphone}
                                </h5>
                            </div>
                            {/* pincode */}
                            <div className="flex-1 hidden  justify-center items-center h-40  sm:flex md:flex xl:flex text-center">
                                <h5 className="font-bold text-orange-900 text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl">
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