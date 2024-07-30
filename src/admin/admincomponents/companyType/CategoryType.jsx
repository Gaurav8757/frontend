import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import VITE_DATA from "../../../config/config.jsx";
function CategoryType() {
  const [data, setData] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [catType, setCatType] = useState("");
  const [cType, setCType] = useState("");
  const [catTypesForSelectedPolicy, setCatTypesForSelectedPolicy] = useState([]);


  useEffect(() => {
    axios.get(`${VITE_DATA}/view/company/lists`)
      .then((resp) => {
        const ctType = resp.data;
        setData(ctType);
      })
      .catch((error) => {
        console.error("Error fetching Category Types:", error);
      });
  }, []);


  const handleSubmit = async () => {
    setFormSubmitted(true);
    try {
      if (!cType) {
        toast.error('Please select a Category Type!');
        return;
      }
      await axios.put(`${VITE_DATA}/api/company/${catTypesForSelectedPolicy}/category`, {
        category: catType
      });
      toast.success('Category added successfully!');
      setCatType("");
    } catch (error) {
      console.error('Error adding category', error.response ? error.response.data.message : error.message);
    } finally {
      setFormSubmitted(false);
    }
  }

  // delete codes
  const deleteCategoryTypes = async (_id) => {
    try {
      await axios.delete(`${VITE_DATA}/api/company/category/${_id}/delete`);
      toast.error("Category Type Deleted.....!", { theme: "dark", position: "top-right" });
      setData((prevData) => prevData.filter((data) => data._id !== _id));
    } catch (error) {
      console.error('Error Deleting Category Type', error);
    }
  };


  return (
    <section className="container-fluid relative flex  p-0 sm:ml-48 bg-slate-200">
      <div className="container-fluid  flex flex-col w-full lg:w-1/2 p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-white">
        <span className="text-3xl p-2 tracking-wider text-blue-700 font-medium">Add Category Type</span>
        <div className="container-fluid flex flex-wrap justify-between p-2 border-dashed rounded-lg bg-slate-200">
          <div className="flex flex-col p-2 text-start w-full lg:w-1/3">
            <label className="text-base mx-1 my-1">Company Name:</label>
            <select
              className="input-style p-1 text-base rounded-lg"
              name="c_type"
              value={cType}
              onChange={(e) => {
                setCType(e.target.value);
                const selectedCatId = e.target.selectedOptions[0].getAttribute("data-id");
                setCatTypesForSelectedPolicy(selectedCatId);
              }}
            >
              <option className="w-1 ps-2" value="">
                 Select Company Name ---
              </option>
              {data.map((policy) => (
                <option key={policy._id} value={policy.c_type} data-id={policy._id}>
                  {policy.c_type}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col   p-2 text-start w-full lg:w-1/3">
            <label className="text-base mx-1 my-1">Category Type:</label>
            <input
              className="input-style  p-1  rounded-lg"
              value={catType}
              onChange={(e) => setCatType(e.target.value.toUpperCase())}
              name="catType"
            />

          </div>
          <div className="flex flex-col  p-2 text-start w-full lg:w-1/3"></div>

          <div className="w-full p-1 mt-8 justify-center flex">
            <button
              className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded text-sm px-3 py-2 text-center"
              onClick={handleSubmit}
              type="button"
            >
              {formSubmitted ? "Submitted" : "Submit"}
            </button>
          </div>
          {/* </form> */}
        </div>
      </div>
      <div className="container-fluid  flex flex-col w-full lg:w-1/2  justify-center p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-white">
        <span className="text-3xl p-2  tracking-wider text-blue-700 font-medium">List of Company with Category</span>
        <div className="container-fluid flex justify-center p-2   border-gray-200 border-dashed rounded-lg   bg-slate-200">
          <table className="min-w-full text-center text-sm font-light ">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr className="text-blue-700">
                <th scope="col" className="px-1 py-1 border border-black">
                  Company Type
                </th>
                <th scope="col" className="px-1 py-1 border border-black">
                  Category Type
                </th>
                <th scope="col" className="px-1 py-1 border border-black">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((data) => {

                return (
                  <tr
                    className="border-b dark:border-neutral-200 text-sm font-medium"
                    key={data._id}
                  >


                    <td className="whitespace-nowrap px-1 py-1 border border-black">
                      {data.c_type}
                    </td>

                    {data.c_type &&

                      <td className="whitespace-nowrap px-1 py-1 border border-black">
                        <select className="w-full p-1  rounded-lg">
                          <option value="" defaultChecked >ADD MORE PRODUCT</option>
                          {data.category.map((product, index) => (
                            <option key={index} value={product}>
                              {product}
                            </option>
                          ))}
                        </select>
                      </td>
                    }

                    <td className="whitespace-nowrap px-1 py-1 border border-black">
                      <button type="button"
                        onClick={() => deleteCategoryTypes(data._id)}
                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded text-sm px-3 py-1 text-center">Delete</button>
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

export default CategoryType;