import { useState, useEffect } from "react";
// import { CgCloseR } from "react-icons/cg";
import axios from 'axios';
import { toast } from "react-toastify";
import VITE_DATA from "../../config/config.jsx";
function CvLists() {
    const [APIData, setAPIData] = useState([]);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Not Authorized yet.. Try again! ");
        } else {
            // The user is authenticated, so you can make your API request here.
            axios
                .get(`${VITE_DATA}/commission/slab/view`, {
                    headers: {
                        Authorization: `${token}`, // Send the token in the Authorization header
                    },
                })
                .then((response) => {

                    setAPIData(response.data);

                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);




    return (
        <section className="container-fluid relative flex flex-wrap p-0 sm:ml-48 bg-slate-200">
            <div className="container-fluid flex justify-center p-2  w-full sm:w-full md:w-full lg:w-full xl:w-full border-dashed rounded-lg  bg-slate-200">
                <div className=" m-4 flex justify-between text-blue-500 max-w-auto mx-auto w-auto ">
                    <span className=" flex justify-center text-center  text-3xl font-semibold  ">Lists of Commercial Vehicle </span>
                </div>
            </div>
            <table className="min-w-full text-center text-sm font-light table bg-slate-200 ">
                <thead className="border-b  font-medium bg-slate-200  sticky top-16">
                    <tr className="text-blue-700 sticky top-16">

                        <th scope="col" className="px-1 py-0 border border-black">
                            Company Name
                        </th>
                        <th scope="col" className="px-1 py-0 border border-black sticky">
                            Category Name
                        </th>
                        <th scope="col" className="px-1 py-0 border border-black sticky">
                            Segment
                        </th>
                        <th scope="col" className="px-1 py-0 border border-black sticky">
                            Policy Type
                        </th>
                        <th scope="col" className="px-1 py-0 border border-black sticky">
                            Product Code
                        </th>
                        <th scope="col" className="px-1 py-0 border border-black sticky">
                            Vehicle Age
                        </th>
                        <th scope="col" className="px-1 py-0 border border-black sticky">
                            PayoutOn
                        </th>
                        <th scope="col" className="px-1 py-0 border border-black sticky">
                            Percentage
                        </th>
                        <th scope="col" className="px-1 py-0 border border-black sticky">
                            Branch Payout Percentage
                        </th>

                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 overflow-y-hidden">
                    {APIData.reverse().map((data) => {
                        if (data.vehicleSlab === 'CV-Slab') {
                            return (
                                <tr className=":border-neutral-200 text-sm font-medium" key={data._id}>
                                    <td className="px-1 py-0 whitespace-nowrap border border-black">{data.cnames}</td>
                                    <td className="px-1 py-0 border border-black">{data.catnames}</td>
                                    <td className="px-1 py-0 border border-black">{data.segments}</td>
                                    <td className="px-1 py-0 whitespace-nowrap border border-black">{data.policytypes}</td>
                                    <td className="px-1 py-0 border border-black">{data.pcodes}</td>
                                    <td className="px-1 py-0 border border-black">{data.vage}</td>
                                    <td className="px-1 py-0 border border-black">{data.payoutons}</td>
                                    <td className="px-1 py-0 border border-black">{data.cvpercentage}</td>
                                    <td className="px-1 py-0 border border-black">{data.branchpayoutper}</td>
                                </tr>
                            );
                        } else {
                            return null;
                        }
                    })}
                </tbody>
            </table>

        </section>
    )
}

export default CvLists;