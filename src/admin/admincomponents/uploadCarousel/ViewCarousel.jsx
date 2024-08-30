import axios from "axios";
import UpdateCarousel from "./UpdateCarousel.jsx";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import TextLoader from "../../../loader/TextLoader.jsx";
import VITE_DATA from "../../../config/config.jsx";
function ViewCarousel() {
    const [APIData, setAPIData] = useState([]);
    const [showUpdatePopup, setShowUpdatePopup] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const handleUpdateClick = (id) => {
        setSelectedRowId(id);
        setShowUpdatePopup(true);
    };

    const handleClosePopup = () => {
        setSelectedRowId(null);
        setShowUpdatePopup(false);
    };

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Not Authorized yet.. Try again! ");
        } else {
            // The user is authenticated, so you can make your API request here.
            axios
                .get(`${VITE_DATA}/users/first/view`, {
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

    
    // refreshing page after updating data
  const onUpdateCarousel = async () => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        toast.error("Not Authorized yet.. Try again!");
      } else {
        const response = await axios.get(
          `${VITE_DATA}/users/first/view`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setAPIData(response.data);
      }
    } catch (error) {
      console.error("Error fetching updated Carousel data:", error);
    }
  };

    // ******************** Delete Functions *************************************/
    const onDeleteCarousel = async (_id) => {
        try {
            await axios.delete(`${VITE_DATA}/users/first/deletecarousel/${_id}`);

            setAPIData((prevData) => prevData.filter((data) => data._id !== _id));
            toast.warn("Carousel Removed.....!", { theme: "dark", position: "top-right" });
        } catch (error) {
            toast.error(`Error in Removing Carousel ${error}`)
            console.error('Error deleting Carousel:', error);
        }
    };



    return (
        <section className="container-fluid relative  h-screen p-0 sm:ml-48 bg-slate-200">
            <div className="container-fluid flex justify-center p-2  border-gray-200 border-dashed rounded-lg dark:border-gray-700  bg-slate-200">
                {/* <div className="sm:-mx-6 lg:-mx-8"> */}
                <div className="inline-block min-w-full w-full py-0">
                    <div className="flex justify-between w-xl  text-white">
                        <h1></h1>
                        <h1 className="text-3xl text-blue-700 font-semibold w-full my-2">All Carousel&apos;s List</h1>
                        <span className="flex justify-end">
                        <NavLink to="/dashboard/addcarousel" className=" my-auto text-red-700 ">
                        <button type="button" className="text-white  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded text-sm px-3 py-2 text-center me-2 whitespace-nowrap">Go Back</button>
                        </NavLink>
                        </span>
                    </div>


                    <div className="inline-block min-w-full w-full py-0 overflow-x-auto">
                        <table className="min-w-full text-center text-sm font-light border border-slate-800 ">
                        {APIData.length === 0 ? ( // Conditional rendering when there are no policies
                                    <TextLoader/>
                                ) : (<>
                            <thead className="border-b font-medium border-black">
                                <tr className="text-blue-700 border-black">
                                    <th scope="col" className="px-1 py-0.5">
                                        Title
                                    </th>
                                    <th scope="col" className="px-1 py-0.5">
                                        Description
                                    </th>
                                    <th scope="col" className="px-1 py-0.5">
                                        Links
                                    </th>

                                    <th scope="col" className="px-1 py-0.5">
                                        Images
                                    </th>
                                    <th scope="col" className="px-1 py-0.5">
                                        Update
                                    </th>
                                    <th scope="col" className="px-1 py-0.5">
                                        Delete
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {APIData.map((data) => {

                                    return (
                                        <tr
                                            className="border border-black text-sm font-medium "
                                            key={data._id}>
                                            <td className="whitespace-nowrap px-1 py-1 ">
                                                {data.usercarousel_title}
                                            </td>
                                            <td className=" flex-1 whitespace-wrap px-1 py-0.5 ">
                                                {data.usercarousel_desc}
                                            </td>
                                            <td className="whitespace-wrap px-1 py-0.5 text-center">
                                                {data.usercarousel_link}
                                            </td>

                                            <td className="whitespace-nowrap px-1 py-0.5 flex justify-center">
                                                <img width={80} src={data.usercarousel_upload} alt="file" />
                                            </td>

                                            <td className="whitespace-nowrap px-1 py-0.5">
                                            <button onClick={() => handleUpdateClick(data)} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded text-sm px-2 py-1 my-0.5 mx-0.5 text-center ">
                                                            Update
                                                        </button>
                                            </td>

                                            <td className="whitespace-nowrap px-1 py-0.5">
                                                <button type="button" onClick={() => onDeleteCarousel(data._id)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded text-sm px-2 py-1 my-0.5 text-center">Delete</button>
                                            </td>
                                            
                                        </tr>
                                    );
                                })}
                            </tbody>
                            </> )}
                        </table>
                    </div>
                </div>
            </div>
            {showUpdatePopup && selectedRowId && (
                <UpdateCarousel carouselFirst={selectedRowId} onUpload={onUpdateCarousel} onClose={handleClosePopup} />
            )}
        </section>
    )

}




export default ViewCarousel;