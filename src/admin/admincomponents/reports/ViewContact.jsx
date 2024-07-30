import axios from "axios";
import UpdateContact from "./UpdateContact.jsx";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import VITE_DATA from "../../../config/config.jsx";
const ViewContact = () => {
  const [contacts, setContacts] = useState([]);
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
      toast.error("Not Authorized yet.. Try again!");
    } else {
      axios
        .get(`${VITE_DATA}/users/viewcontact`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          setContacts(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  // refreshing page after updating data
  const onUpdateContact = async () => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        toast.error("Not Authorized yet.. Try again!");
      } else {
        const response = await axios.get(
          `${VITE_DATA}/users/viewcontact`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        setContacts(response.data);
      }
    } catch (error) {
      console.error("Error fetching updated contact data:", error);
    }
  };
  

  const onDeleteComplaint = async (_id) => {
    try {
      await axios.delete(`${VITE_DATA}/users/deletecontact/${_id}`);
      toast.warn("Contact is Deleted.....!", {
        theme: "dark",
        position: "top-right",
      });
      setContacts((prevData) => prevData.filter((data) => data._id !== _id));
    } catch (error) {
      console.error("Error deleting complaint:", error);
    }
  };

  return (
    <section className="container-fluid relative h-screen p-0 sm:ml-48 bg-gradient-to-r from-slate-200 to-slate-200">
      <div className="container-fluid  justify-center py-4 border-gray-200 border-dashed rounded-lg  bg-gradient-to-r from-slate-200 to-slate-200">
      <h1 className="flex justify-center text-3xl font-semibold w-full text-blue-700 ">All Contact List&apos;s</h1>
        <div className="inline-block min-w-full w-full py-3">
        
          <div className="inline-block min-w-full w-full py-0 overflow-x-auto">
            <table className="min-w-full text-center text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr className="text-blue-700">
                  <th scope="col" className="px-1 border border-black py-1">
                    Email
                  </th>
                  <th scope="col" className="px-1 border border-black py-1">
                    Mobile
                  </th>
                  <th scope="col" className="px-1 border border-black py-1">
                    Query
                  </th>
                  <th scope="col" className="px-1 border border-black py-1">
                    Update
                  </th>
                  <th scope="col" className="px-1 border border-black py-1">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr
                    className="border border-black text-sm font-medium"
                    key={contact._id}
                  >
                    <td className="whitespace-nowrap border border-black px-1 py-1">{contact.usercontact_email}</td>
                    <td className="whitespace-nowrap border border-black px-1 py-1">{contact.usercontact_mobile}</td>
                    <td className="whitespace-nowrap border border-black px-1 py-1">{contact.usercontact_query}</td>
                    <td className="whitespace-nowrap border border-black px-1 py-1">
                    <button onClick={() => handleUpdateClick(contacts)} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded text-sm px-2 py-1 my-0.5 mx-0.5 text-center ">
                                                            Update
                                                        </button>
                    </td>
                    <td className="whitespace-nowrap px-1 py-1">
                      <button
                        type="button"
                        onClick={() => onDeleteComplaint(contact._id)}
                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded text-sm px-3 py-1 text-center "
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showUpdatePopup && selectedRowId && (
                <UpdateContact data={selectedRowId} onUpdate={onUpdateContact} onClose={handleClosePopup} />
            )}
    </section>
  );
};

export default ViewContact;
