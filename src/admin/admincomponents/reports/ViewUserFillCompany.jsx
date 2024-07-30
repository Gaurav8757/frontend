import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import VITE_DATA from "../../../config/config.jsx";
function ViewUserFillCompany() {
    const [APIData, setAPIData] = useState([]);
    const [search, setSearch] = useState("");
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Not Authorized yet.. Try again! ");
        } else {
            // The user is authenticated, so you can make your API request here.
            axios
                .get(`${VITE_DATA}/users/view/userdetails`, {
                    headers: {
                        Authorization: `${token}`, // Send the token in the Authorization header
                    },
                })
                .then((response) => {
                    // console.log(response.data);
                    setAPIData(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);

    // ******************** Delete Functions *************************************/
    const onDeleteCustomerDetails = async (_id) => {
        try {
            await axios.delete(`${VITE_DATA}/users/delete/userdetails/${_id}`);
            toast.success("Customer Details Removed Successfully..!", { theme: "dark", position: "top-right" });
            setAPIData((prevData) => prevData.filter((data) => data._id !== _id));
        } catch (error) {
            console.error('Error removing employee salary:', error);
        }
    };

    return (
        <section className="container-fluid relative  h-screen p-0 sm:ml-48 bg-slate-200">
            <div className="container-fluid  justify-center p-2  border-gray-200 border-dashed rounded-lg   bg-slate-200">
                <div className="overflow-x-auto  my-auto flex justify-between text-blue-700">
                  <div className="w-1/5"></div>
                    <div className="flex justify-center text-3xl font-semibold  my-4">View Form Filled by Customer&apos;s</div>
                    <div className="flex my-auto justify-end">
                            <label className=" text-xl font-medium text-blue-800 mx-4 my-auto" > Filter:</label>
                            <input type="search" onChange={(e) => setSearch(e.target.value)} className="shadow input-style w-52 ps-5 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  appearance-none py-2 px-1" placeholder="Search Customer's" />
                        
                            </div>
                       
                   
                </div>
                <div className="inline-block min-w-full w-full py-0">
                    <div className="inline-block min-w-full w-full py-0 overflow-x-auto">
                        <table className="min-w-full text-center text-sm font-light ">
                            <thead className="border border-black font-medium ">
                                <tr className="text-blue-800">
                                    <th scope="col" className="px-1 py-1 border border-black">
                                        Company Name
                                    </th>
                                    <th scope="col" className="px-1 py-1 border border-black">
                                        Customer Name
                                    </th>
                                    <th scope="col" className="px-1 py-1 border border-black">
                                        Mobile No.
                                    </th>
                                    <th scope="col" className="px-1 py-1 border border-black">
                                        Email ID
                                    </th>
                                    <th scope="col" className="px-1 py-1 border border-black">
                                        Address
                                    </th>
                                    <th scope="col" className="px-1 py-1 border border-black">
                                        Delete
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {APIData.filter((data) => {
                                    const searchLower = search.toLowerCase();
                                    const cnameLower = data.h_cname.toLowerCase();
                                    return searchLower === '' ? true : cnameLower.includes(searchLower);
                                    // return search.toLowerCase() === '' ? data : data.h_cname.toLowerCase().includes(search)
                                }).map((data) => {
                                    return (
                                        <tr
                                            className="border-b dark:border-neutral-200 text-sm font-medium"
                                            key={data._id}>
                                            <td className="whitespace-nowrap px-1 py-1 border border-black">
                                                {data.h_cname}
                                            </td>
                                            <td className="whitespace-nowrap px-1 py-1 border border-black">
                                                {data.h_name}
                                            </td>
                                            <td className="whitespace-nowrap px-1 py-1 border border-black">
                                                {data.h_mobile}
                                            </td>
                                            <td className="whitespace-nowrap px-1 py-1 border border-black">
                                                {data.h_email}
                                            </td>
                                            <td className="whitespace-wrap px-1 py-1 text-center border border-black">
                                                {data.h_address}
                                            </td>

                                            <td className="whitespace-nowrap px-1 py-1 border border-black">
                                                <button type="button" onClick={() => onDeleteCustomerDetails(data._id)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 shadow-lg shadow-red-500/50  font-medium rounded text-sm px-3 py-1 text-center">Delete</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </section>
    );
}
export default ViewUserFillCompany;