import axios from "axios";
import { useState, useEffect } from "react";
import {toast} from "react-toastify";
import VITE_DATA from "../../../config/config.jsx";
function AddPaymentMode() {
  const [paymentMode, setPaymentMode] = useState('');
    const [APIData, setAPIData] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);


    useEffect(() => {
      const token = sessionStorage.getItem("token");
      if (!token) {
          toast.error("Not Authorized yet.. Try again! ");
      } else {
          // The user is authenticated, so you can make your API request here.
          axios
              .get(`${VITE_DATA}/view/payment/mode`, {
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
  }, [formSubmitted]);

  const handleSubmit = async() => {
    setFormSubmitted(true);
    try {  
        // Check if a valid attendance status is selected
        if (!paymentMode) {
          toast.error('Please Enter PaymentMode...!');
          return;
        }
        // Make a POST request to mark attendance
       await axios.post(`${VITE_DATA}/add/payment/mode`, {
          paymentmode: paymentMode,
        });
        // Handle success (e.g., show a success message)
        toast.success('PaymentMode Added Successfully....!');
        setPaymentMode("");
      } catch (error) {
        // Handle error (e.g., show an error message)
        console.error(
          'Error Adding PaymentMode',
          error.response ? error.response.data.message : error.message
        );
      } finally {
        setFormSubmitted(false);
      }
}

// Delete Functions
const deletePaymentMode = async (_id) => {
  try {
      await axios.delete(`${VITE_DATA}/payment/delete/${_id}`);
      toast.warn("PaymentMode Name Deleted.....!", { theme: "dark", position: "top-right" });
      setAPIData((prevData) => prevData.filter((data) => data._id !== _id));
  } catch (error) {
      console.error('Error Deleting PaymentMode Name', error);
  } 
};



  return (
    <section className="container-fluid relative flex p-0 sm:ml-48 bg-white">
    <div className="container-fluid flex-col w-full lg:w-full justify-center p-2 border-gray-200 border-dashed rounded-lg  bg-white">
    <h1 className="font-semibold text-3xl my-2 text-blue-700">Add Payment Mode</h1>
        <div className="relative  p-5  rounded-xl shadow-xl text-2xl items-center bg-slate-200">
           
            <div className="flex flex-col p-2 text-start w-full lg:w-1/2">
                <label className="text-base mx-1 mb-1">Payment Mode Name<span className="text-red-600 font-bold">*</span></label>
                <input
                    className="input-style p-1 rounded-lg"
                    type="text"
                    name="paymentMode"
                    value={paymentMode}
                    onChange={(e) => setPaymentMode(e.target.value.toUpperCase())}
                    placeholder="Add Payment Mode"
                />
               
            </div>

            <div className="flex justify-center p-2 text-center w-full my-2 mt-4 gap-4">
                <button
                    className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded text-sm px-4 py-2 text-center"
                    onClick={handleSubmit}
                    type="button"
                    disabled={formSubmitted}>
                    {formSubmitted ? "Submitted" : "Submit"}
                </button>
            </div>
        </div>
        </div>
        <div className="container-fluid flex-col w-full lg:w-full justify-center p-2 border-gray-200 border-dashed rounded-lg  bg-white">
        <div className="inline-block my-0 min-w-full w-full py-0 ">
            <h1 className="font-semibold text-3xl my-2 text-blue-700">PaymentMode List&apos;s</h1>
            <table className="min-w-full text-center text-base font-light table bg-slate-200">
                <thead className="border  font-medium border-black">
                    <tr className="text-blue-700">
                        {/* <th scope="col" className="px-5 py-4">
                            Sr No.
                        </th> */}
                        <th scope="col" className="px-1 py-1 border border-black">
                            Payment Mode Name
                        </th>
                        {/* <th scope="col" className="px-5 py-4">
                            Update
                        </th> */}
                        <th scope="col" className="px-1 py-1 border border-black">
                            Delete
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {APIData.map((data) => {
                        return (
                            <tr
                                className="border  font-medium text-sm border-black"
                                key={data._id}
                            >
                                <td className="whitespace-nowrap px-1 py-1 border border-black">
                                    {data.paymentmode}
                                </td>
                                {/* <td className="whitespace-nowrap px-4 py-4">
                                    Your Update button
                                </td> */}
                                <td className="whitespace-nowrap px-1 py-1 border border-black">
                                    <button 
                                        type="button" 
                                        // _ID MADE TO DELETE
                                        onClick={() => deletePaymentMode(data._id)} 
                                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded text-sm px-3 py-1 text-center">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                     })} 
                </tbody>
            </table>
        </div>
    </div>
</section>
  )
}

export default AddPaymentMode;