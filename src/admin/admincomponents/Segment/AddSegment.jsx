import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import VITE_DATA from "../../../config/config.jsx";
function AddSegment() {
  const [data, setData] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [catType, setCatType] = useState("");
  const [segment, setSegment] = useState("");
  const [cType, setCType] = useState();
  const [productTypesForSelectedPolicy, setProductTypesForSelectedPolicy] = useState([]);

  useEffect(() => {
    axios.get(`${VITE_DATA}/view/company/lists`)
      .then((resp) => {
        const PolicyType = resp.data;

        setData(PolicyType);
      })
      .catch((error) => {
        console.error("Error fetching policy types:", error);
      });
  }, []);

  // console.log(data.map((comp)=>comp.c_type));

  const handleSubmit = async () => {
    setFormSubmitted(true);
    try {
      if (!catType) {
        toast.error('Please select a Category Name!');
        return;
      }
      await axios.put(`${VITE_DATA}/api/comp/${productTypesForSelectedPolicy}/segment`, {
        segment
      });
      toast.success('Product added successfully!');
      setCatType("");
    } catch (error) {
      console.error('Error adding product:', error.response ? error.response.data.message : error.message);
    } finally {
      setFormSubmitted(false);
    }
  }



  // delete codes
  //   const deleteProductTypes = async (_id) => {
  //     try {
  //         await axios.delete(`http://localhost:7000/api/policy/products/${_id}/delete`);
  //         toast.warn("Policy Type Deleted.....!", { theme: "dark", position: "top-right" });
  //         setData((prevData) => prevData.filter((data) => data._id !== _id));
  //     } catch (error) {
  //         console.error('Error Deleting Policy Type', error);
  //     } 
  // };





  return (
    <section className="container-fluid relative flex p-0 sm:ml-48 bg-slate-200">
      <div className="container-fluid  flex flex-col  w-full lg:w-1/2 p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-white">
        <span className="text-3xl p-2 tracking-wider text-blue-700 font-medium">Add Segment Type</span>
        <div className="container-fluid   p-2 border-dashed rounded-lg bg-slate-200">
          <div className="flex">
          <div className="flex flex-col p-2 text-start w-full lg:w-1/3">
            <label className="text-sm text-semibold mx-1 my-1">Company Name:</label>
            <select
              className="input-style p-1 text-sm font-semibold w-full ps-2 rounded-lg"
              name="c_type"
              value={cType}
              onChange={(e) => {
                setCType(e.target.value);
                const selectedCatId = e.target.selectedOptions[0].getAttribute("data-id");
                setProductTypesForSelectedPolicy(selectedCatId);
              }}
            >
              <option className="" value="">
                -- Select Company --
              </option>

              {data.map((comp) => (
                <option className="font-semibold" key={comp._id} value={comp.c_type} data-id={comp._id}>
                  {comp.c_type}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col   p-2 text-start w-full lg:w-1/3">
            <label className="text-sm text-semibold mx-1 my-1">Category Name:</label>
            <select
              className="input-style  p-1 text-sm font-semibold w-full ps-2 rounded-lg"
              value={catType}
              name="catType"
              onChange={(e) => setCatType(e.target.value)}
            >
              <option value=""> -- Select Category -- </option>
              {data.map((cat) => (
                cat._id === productTypesForSelectedPolicy &&
                cat.category.map((product, idx) => (
                  <option className="font-semibold" key={idx} value={product}>{product}</option>
                ))))
              }
            </select>
          </div>

          <div className="flex flex-col   p-2 text-start w-full lg:w-1/3">
            <label className="text-sm text-semibold mx-1 my-1">Segment:</label>
            <input
              className="input-style p-1 text-sm font-semibold w-full ps-2  rounded-lg"
              value={segment}
              onChange={(e) => setSegment(e.target.value.toUpperCase())}
              name="segment"
            />
          </div>
          </div>
          <div className="w-full p-1 mt-8 justify-center lg:w-full">
            <button
              className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded text-sm px-3 py-1 text-center"
              onClick={handleSubmit}
              type="button"
            >
              {formSubmitted ? "Submitted" : "Submit"}
            </button>
          </div>
          {/* </form> */}
        </div>
      </div>
      <div className="w-4/5">
      <div className="container-fluid  flex flex-col justify-center p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-white">
        <span className="text-3xl p-2 tracking-wider text-blue-700 font-medium">Segment with Company-Category</span>

        <div className="container-fluid flex justify-center p-2   border-gray-200 border-dashed rounded-lg   bg-slate-200">
          <table className="min-w-full text-center text-sm font-light ">
            <thead className="border border-black font-medium">
              <tr className="text-blue-700">
                <th scope="col" className="px-1 py-1 border border-black">
                  Company Name
                </th>
                <th scope="col" className="px-1 py-1 border border-black">
                  Category Name
                </th>
                <th scope="col" className="px-1 py-1 border border-black">
                  Segments
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
                        <select className="w-1/2 p-1 ps-3  rounded-lg">
                          <option value="" defaultChecked> --- Select Category --- </option>
                          {data.category.map((product, index) => (
                            <option key={index} value={product}>
                              {product}
                            </option>
                          ))}
                        </select>
                      </td>
                    }

                    {data.c_type &&
                      <td className="whitespace-nowrap px-1 py-1 border border-black">
                        <select className="w-1/2 p-1 ps-2  rounded-lg">
                          <option value="" defaultChecked >ADD MORE SEGMENT</option>
                          {data.category.map((segment, index) => (
                            <option key={index} value={segment}>
                              {segment}
                            </option>
                          ))}
                        </select>
                      </td>
                    }

                    <td className="whitespace-nowrap px-1 py-1 border border-black">
                      <button type="button"
                        // onClick={() => deleteProductTypes(data._id)}
                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded text-sm px-3 py-1 text-center">Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </section>
  )
}



export default AddSegment;