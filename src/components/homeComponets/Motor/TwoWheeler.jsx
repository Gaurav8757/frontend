import { useState, useEffect } from "react";
import Form from "../ViewForm/Form.jsx";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import VITE_DATA from "../../../config/config.jsx";
function TwoWheeler() {
    const [APIData, setAPIData] = useState([]);
    const [selectedCompanyName, setSelectedCompanyName] = useState("");
    useEffect(() => {
        axios
            .get(`${VITE_DATA}/api/company/motor-list`)
            .then((response) => {
                // console.log(response.data);
                setAPIData(response.data);

            })
            .catch((error) => {
                toast.error(`No Data Found!`)
                console.error(error);
            });
        // }
    }, []);

    const handleCompanySelection = (companyName) => {
        setSelectedCompanyName(companyName);
    };
    return (
        <>
            <section className="container-fluid relative  h-screen p-0  bg-gradient-to-r from-indigo-400 to-cyan-400">
                <div className="container-fluid flex justify-center p-2  border-gray-200 border-dashed rounded-lg dark:border-gray-700  bg-gradient-to-r from-indigo-400 to-cyan-400">

                    {/* <div className="sm:-mx-6 lg:-mx-8"> */}
                    <div className="inline-block min-w-full w-full py-0 sm:px-6 lg:px-8">
                        <div className="overflow-x-auto w-xl  text-black">
                            <h1 className="flex justify-center text-4xl w-full mb-8">Two-Wheeler Insurance</h1><hr></hr>
                        </div>
                        <div className="inline-block min-w-full w-full py-0 sm:px-6 lg:px-8 overflow-x-auto">
                            <table className="min-w-full text-center text-sm font-light ">
                                <thead className="border-b bg-gradient-to-r from-slate-300 to-slate-200 font-medium dark:border-neutral-500">
                                    <tr className="text-black">
                                        <th scope="col" className="px-5 py-4">
                                            Company Name
                                        </th>

                                        <th scope="col" className="px-5 py-4">
                                            Files
                                        </th>
                                        <th scope="col" className="px-5 py-4">

                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {APIData.filter((data) => {
                                        return data.comp_categories === '2 Wheeler Insurance';
                                    }).map((data) => {
                                            return (
                                                <tr
                                                    className="border-b dark:border-neutral-200 text-sm font-medium"
                                                    key={data._id}>
                                                    <td className="whitespace-nowrap px-4 py-4">
                                                        {data.comp_cname}
                                                    </td>

                                                    <td className="whitespace-nowrap px4 py-4">
                                                        <NavLink to={`https://eleedomimf.com${data.comp_cfiles}`}>
                                                            <img src={data.comp_cfiles} alt="files" />
                                                        </NavLink>

                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-4">
                                                        <button
                                                            onClick={() => handleCompanySelection(data.comp_cname)}
                                                            className="text-white bg-blue-700 active:bg-green-700 font-bold px-4 py-2 rounded shadow outline-none focus:outline-none mr-1 mb-1 transition-transform transform hover:translate-y-[-3px] hover:shadow-2xl"
                                                            type="button"
                                                        >
                                                            Fill Details
                                                        </button>

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
            {selectedCompanyName && (
                <Form
                    companyName={selectedCompanyName}
                    setShowModal={() => setSelectedCompanyName("")}
                />
            )}
        </>
    )
}

export default TwoWheeler;