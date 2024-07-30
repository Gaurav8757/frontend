import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import VITE_DATA from "../../../config/config.jsx";
function AddProductType() {
  const [data, setData] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [productType, setProductType] = useState("");
  const [policyType, setPolicyType] = useState("");
  const [productTypesForSelectedPolicy, setProductTypesForSelectedPolicy] = useState([]);

  useEffect(() => {
    axios.get(`${VITE_DATA}/staff/policy/lists`)
      .then((resp) => {
        const PolicyType = resp.data;

        setData(PolicyType);
      })
      .catch((error) => {
        console.error("Error fetching policy types:", error);
      });
  }, [data]);

  const handleSubmit = async () => {
    setFormSubmitted(true);
    try {
      if (!productType) {
        toast.error('Please select a Product Type!');
        return;
      }
      await axios.put(`${VITE_DATA}/api/policy/types/${productTypesForSelectedPolicy}/products`, {
        product: productType
      });
      toast.success('Product added successfully!');
      setProductType("");
    } catch (error) {
      console.error('Error adding product:', error.response ? error.response.data.message : error.message);
    } finally {
      setFormSubmitted(false);
    }
  }
  // delete codes
  const deleteProductTypes = async (_id) => {
    try {
      await axios.delete(`${VITE_DATA}/api/policy/products/${_id}/delete`);
      toast.warn("Policy Type Deleted.....!", { theme: "dark", position: "top-right" });
      setData((prevData) => prevData.filter((data) => data._id !== _id));
    } catch (error) {
      console.error('Error Deleting Policy Type', error);
    }
  };





  return (
    <section className="container-fluid relative flex p-0 sm:ml-48 bg-slate-200">
      <div className="container-fluid  w-full lg:w-1/2 flex flex-col   p-2 border-gray-200 border-dashed rounded-lg bg-white">
        <span className="text-3xl p-2 tracking-wider text-blue-700 font-medium">Add Product Type</span>

        <div className="container-fluid flex flex-wrap justify-between p-2 border-dashed rounded-lg bg-slate-200">
          {/* <form className="flex flex-wrap justify-between"> */}

          <div className="flex flex-col p-2 text-start w-full lg:w-1/3">
            <label className="text-base mx-1 my-1">Policy Type:</label>
            <select
              className="input-style p-1 text-base rounded-lg"
              name="p_type"
              value={policyType}
              onChange={(e) => {
                setPolicyType(e.target.value);
                const selectedPolicyId = e.target.selectedOptions[0].getAttribute("data-id");
                setProductTypesForSelectedPolicy(selectedPolicyId);
              }}
            >
              <option className="w-1" value="">
                ----- Select Policy Type -----
              </option>
              {data.map((policy) => (
                <option key={policy._id} value={policy.p_type} data-id={policy._id}>
                  {policy.p_type}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col   p-2 text-start w-full lg:w-1/3">
            <label className="text-base mx-1 my-1">Product Type:</label>
            <input
              className="input-style p-1 rounded-lg"
              value={productType}
              onChange={(e) => setProductType(e.target.value.toUpperCase())}
              name="productType"
            />

          </div>
          <div className="flex flex-col  p-2 text-start w-full lg:w-1/3"></div>

          <div className="w-full p-1 mt-8 justify-center flex">
            <button
              className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 shadow-lg shadow-green-500/50 font-medium rounded-lg text-sm px-5 py-2 text-center"
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
        <span className="text-3xl p-2 tracking-wider text-blue-700 font-medium">List of Policy Type with Products</span>

        <div className="container-fluid flex justify-center p-2   border-gray-200 rounded-lg   bg-slate-200">
          <table className="min-w-full text-center text-sm font-light border border-black ">
            <thead className="border-b font-medium ">
              <tr className="text-blue-700">
                {/* <th scope="col" className="px-4 py-4">
                                S.No
                            </th> */}
                <th scope="col" className="px-1 py-1 border border-black">
                  Policy Type
                </th>
                <th scope="col" className="px-1 py-1 border border-black">
                  Product Type
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
                    key={data._id}>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">
                      {data.p_type}
                    </td>
                    {data.p_type &&
                      <td className="whitespace-nowrap px-1 py-1 border border-black">
                        <select className="w-full p-1 text-base rounded-lg">
                          <option value="" defaultChecked >ADD MORE PRODUCT</option>
                          {data.products.map((product, index) => (
                            <option key={index} value={product}>
                              {product}
                            </option>
                          ))}
                        </select>
                      </td>
                    }

                    <td className="whitespace-nowrap px-1 py-1 border border-black">
                      <button type="button"
                        onClick={() => deleteProductTypes(data._id)}
                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">Delete</button>
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

export default AddProductType;
