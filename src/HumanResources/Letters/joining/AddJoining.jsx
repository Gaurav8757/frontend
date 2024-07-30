import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import VITE_DATA from "../../../config/config.jsx";

function AddJoining() {
  const [APIData, setAPIData] = useState([]);
  // const [ofdate, setOfdate] = useState('');
  const [joinempdate, setOfvalidDate] = useState('');
  const [joinsigndate, setOfvalidDate1] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [selectedItemData, setSelectedItemData] = useState({
    // ofdate: "",
    ofname: "",
    ofmobile: "",
    ofaddress: "",
    ofemail: "",
    ofdesignation: "",
    ofgrosalary: "",
    ofsalaryWords: "",
    ofvalidDate: "",
    joinempdate: joinempdate || "",
    joinsigndate: joinsigndate || "",
    joinbasicSalaryPercent: "",
    joinbasicSalary: "",
    joinhrapercentage: "",
    joinhrapercentageamount: "",
    joinmapercent: "",
    joinma: "",
    joinkitallowpercent: "",
    joinkitallowance: "",
    joinbenefitspercent: "",
    joinbenefitsamount: "",
    joinpipercent: "",
    joinpi: "",
    joinpf: "",
    joinpfpercent: "",
    joinesi: "",
    joinesipercent: "",
    joinstock: "",
    joinstockpercent: "",
    joincar: "",
    joiningtotal: ""
  });


  // AUTO SHOW DATA
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Not Authorized yet.. Try again! ");
    } else {
      axios
        .get(`${VITE_DATA}/letters/view/offer`, {
          headers: {
            Authorization: `${token}`,
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

  function getFormattedDate() {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  const date = getFormattedDate();
  useEffect(() => {
    setOfvalidDate(date);
    setOfvalidDate1(date);
  }, [date]);

 
  const handleDropdownChange = (e) => {
    const selectedItemId = e.target.selectedOptions[0].getAttribute("data-id");
    setSelectedItemId(selectedItemId);
    const selectedItem = APIData.find((item) => item._id === selectedItemId);
    if (selectedItem) {
      setSelectedItemData(selectedItem);
    } else {
      setSelectedItemData({
        // ofdate: "",
        ofname: "",
        ofmobile: "",
        ofaddress: "",
        ofemail: "",
        ofdesignation: "",
        ofgrosalary: "",
        ofsalaryWords: "",
        ofvalidDate: "",
        joinempdate: "",
        joinsigndate: "",
        
      });
    }
  };
// fianl amount calculated
  const calculateAmounts = (grossSalary, percentages) => {
    const amounts = {};
    for (const [key, value] of Object.entries(percentages)) {
      amounts[key] = (grossSalary * value) / 100;
    }
    return amounts;
  };

  useEffect(() => {
    const grossSalary = parseFloat(selectedItemData.ofgrosalary) || 0;
    const percentages = {
      joinbasicSalary: parseFloat(selectedItemData.joinbasicSalaryPercent) || 0,
      joinhrapercentageamount: parseFloat(selectedItemData.joinhrapercentage) || 0,
      joinma: parseFloat(selectedItemData.joinmapercent) || 0,
      joinkitallowance: parseFloat(selectedItemData.joinkitallowpercent) || 0,
      joinbenefitsamount: parseFloat(selectedItemData.joinbenefitspercent) || 0,
      joinpi: parseFloat(selectedItemData.joinpipercent) || 0,
      joinpf: parseFloat(selectedItemData.joinpfpercent) || 0,
      joinesi: parseFloat(selectedItemData.joinesipercent) || 0,
      joinstock: parseFloat(selectedItemData.joinstockpercent) || 0,
    };
    const amounts = calculateAmounts(grossSalary, percentages);
    // const joincar = grossSalary - Object.values(amounts).reduce((a, b) => a + b, 0);
    const joincar = (grossSalary - amounts) || 0;
    setSelectedItemData((prevState) => ({
      ...prevState,
      joinbasicSalary: amounts.joinbasicSalary,
      joinhrapercentageamount: amounts.joinhrapercentageamount,
      joinma: amounts.joinma,
      joinkitallowance: amounts.joinkitallowance,
      joinbenefitsamount: amounts.joinbenefitsamount,
      joinpi: amounts.joinpi,
      joinpf: amounts.joinpf,
      joinesi: amounts.joinesi,
      joinstock: amounts.joinstock,
      joincar: joincar,
      joiningtotal: grossSalary
    }));
  }, [
    selectedItemData.joinbasicSalaryPercent,
    selectedItemData.joinhrapercentage,
    selectedItemData.joinmapercent,
    selectedItemData.joinkitallowpercent,
    selectedItemData.joinbenefitspercent,
    selectedItemData.joinpipercent,
    selectedItemData.joinpfpercent,
    selectedItemData.joinesipercent,
    selectedItemData.joinstockpercent,
    selectedItemData.ofgrosalary
  ]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formSubmitted) {
      return;
    }

    try {
      const response = await axios.put(
        `${VITE_DATA}/letters/update/letter/${selectedItemId}`,
        selectedItemData
      );

      if (response.data) {
        toast.success(`${response.data.status}`);
        setFormSubmitted(true);
        setSelectedItemId("");
        setSelectedItemData({
          // ofdate: "",
          ofname: "",
          ofmobile: "",
          ofaddress: "",
          ofemail: "",
          ofdesignation: "",
          ofgrosalary: "",
          ofsalaryWords: "",
          ofvalidDate: "",
          joinempdate: "",
          joinsigndate: "",
          joinbasicSalaryPercent: "",
          joinbasicSalary: "",
          joinhrapercentage: "",
          joinhrapercentageamount: "",
          joinmapercent: "",
          joinma: "",
          joinkitallowpercent: "",
          joinkitallowance: "",
          joinbenefitspercent: "",
          joinbenefitsamount: "",
          joinpipercent: "",
          joinpi: "",
          joinpf: "",
          joinpfpercent: "",
          joinesi: "",
          joinesipercent: "",
          joinstock: "",
          joinstockpercent: "",
          joincar: "",
          joiningtotal: ""
        });
      } else {
        toast.error("Error Occurred. Try again...! ");
      }
    } catch (error) {
      console.error("Error during Add User", error.response);
      toast.error("Error Occurred. Try again...!");
    } finally {
      setFormSubmitted(false);
    }
  };

  return (
    <section className="container-fluid relative  sm:ml-64 bg-white">
      <div className="container-fluid  justify-center p-2 border-gray-200 border-dashed rounded-lg bg-white">
        <h1 className="font-semibold text-3xl mb-2 text-orange-700">Create Joining Letter</h1>
        <div className="relative w-full p-0  rounded-xl shadow-xl text-2xl items-center bg-slate-200">

          <div className="flex flex-wrap justify-between">
            <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
              <label htmlFor="emp" className="text-base mx-1">Select Offered Employee</label>
              <select
              id="emp"
                className="input-style p-1 text-base rounded-lg"
                value={selectedItemId}
                name="selectedItemId"
                onChange={handleDropdownChange}
              >
                <option value="">----------- Select Employee ----------</option>
                {APIData.map((item) => (
                  <option key={item._id} value={item._id} data-id={item._id}>
                    {item.ofname}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
              <label htmlFor="email" className="text-base mx-1">Email ID<sup className="text-red-600 font-bold">*</sup></label>
              <input
              id="email"
                className="input-style bg-red-200 p-1 rounded-lg"
                type="text"
                value={selectedItemData.ofemail}
                name="ofemail"
              autoComplete="true"
              readOnly
              />
            </div>

            <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
              <label htmlFor="contact" className="text-base mx-1">Contact No:<sup className="text-red-600 font-bold">*</sup></label>
              <input
              id="contact"
                className="input-style bg-red-200 p-1 rounded-lg"
                type="text"
                value={selectedItemData.ofmobile}
                name="ofmobile"
             
              readOnly
              />
            </div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
              <label htmlFor="des" className="text-base mx-1">Employee Type(Designation):<sup className="text-red-600 font-bold">*</sup></label>
              <input
              id="des"
                className="input- bg-red-200 p-1 rounded-lg"
                type="text"
                value={selectedItemData.ofdesignation}
                name="ofdesignation"
              
                readOnly
              />
            </div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
              <label htmlFor="address" className="text-base mx-1">Address:<sup className="text-red-600 font-bold">*</sup></label>
              <textarea
              id="address"
                className="input-style bg-red-200 p-1 rounded-lg"
                type="text"
                cols={20}
                value={selectedItemData.ofaddress}
                name="ofaddress"
                autoComplete="true"
              readOnly
              />
            </div>



            <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
              <label htmlFor="gross" className="text-base mx-1">Gross Salary<sup className="text-red-600 font-bold">*</sup></label>
              <input
              id="gross"
                className="input-style bg-red-200 p-1 rounded-lg"
                type="text"
                value={selectedItemData.ofgrosalary}
                name="ofgrosalary"
             
                readOnly
              />
            </div>

            <div className="flex flex-col p-2 text-start  w-full lg:w-1/5">
              <label htmlFor="words" className="text-base mx-1">Salary in Words:<sup className="text-red-600 font-bold">*</sup></label>
              <input
              id="words"
                className="input-style bg-red-200 p-1 rounded-lg"
                type="text"
                value={selectedItemData.ofsalaryWords}
                name="ofsalaryWords"
               
                readOnly
              />
            </div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
              <label htmlFor="join" className="text-base mx-1">Joining Date:<sup className="text-red-600 font-bold">*</sup></label>
              <input
              id="join"
                className="input-style rounded-lg p-1"
                type="text"
                value={selectedItemData.joinempdate}
                name="joinempdate"
                placeholder="JOINING DATE"
                onChange={(e) => setSelectedItemData({ ...selectedItemData, joinempdate: e.target.value })}
                required
              />
            </div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
              <label htmlFor="hr" className="text-base mx-1">HR Sign Date:<sup className="text-red-600 font-bold">*</sup></label>
              <input
              id="hr"
                className="input-style rounded-lg p-1"
                type="text"
                value={selectedItemData.joinsigndate}
                name="joinsigndate"
                placeholder="HR SIGN DATE"
                onChange={(e) => setSelectedItemData({ ...selectedItemData, joinsigndate: e.target.value})}
                
              />
            </div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
              <label htmlFor="basic" className="text-base mx-1">Basic Salary %:<sup className="text-red-600 font-bold">*</sup></label>
              <input
              id="basic"
                className="input-style rounded-lg p-1"
                type="number"
                value={selectedItemData.joinbasicSalaryPercent}
                name="joinbasicSalaryPercent"
                placeholder="BASIC SALARY %"
                onChange={(e) =>
                  setSelectedItemData({
                    ...selectedItemData,
                    joinbasicSalaryPercent: e.target.value,
                  })
                }
              />
            </div>
          

            <div className="flex flex-col p-2 mt-4 text-start w-full lg:w-1/5">
              <label htmlFor="hra" className="text-base mx-1">HRA %:<sup className="text-red-600 font-bold">*</sup></label>
              <input
              id="hra"
                className="input-style rounded-lg p-1"
                type="number"
                value={selectedItemData.joinhrapercentage}
                name="joinhrapercentage"
                placeholder="HRA %"
                onChange={(e) => setSelectedItemData({ ...selectedItemData, joinhrapercentage: e.target.value })}

              />
            </div>
          
            <div className="flex flex-col p-2 mt-4 text-start w-full lg:w-1/5">
              <label htmlFor="ma" className="text-base mx-1">Medical Allowance %:<sup className="text-red-600 font-bold">*</sup></label>
              <input
              id="ma"
                className="input-style rounded-lg p-1"
                type="number"
                value={selectedItemData.joinmapercent}
                name="joinmapercent"
                placeholder="MA %"
                onChange={(e) => setSelectedItemData({ ...selectedItemData, joinmapercent: e.target.value })}
              />
            </div>
           
           
            <div className="flex flex-col p-2 mt-4 text-start w-full lg:w-1/5">
              <label htmlFor="ka" className="text-base mx-1">Kit Allowance %:<sup className="text-red-600 font-bold">*</sup></label>
              <input
              id="ka"
                className="input-style rounded-lg p-1"
                type="number"
                value={selectedItemData.joinkitallowpercent}
                name="joinkitallowpercent"
                placeholder="KA %"
                onChange={(e) => setSelectedItemData({ ...selectedItemData, joinkitallowpercent: e.target.value })}
              />
            </div>
            <div className="flex flex-col p-2 mt-4 text-start w-full lg:w-1/5">
              <label htmlFor="ab" className="text-base mx-1">Additional Benefits %:<sup className="text-red-600 font-bold">*</sup></label>
              <input
              id="ab"
                className="input-style rounded-lg p-1"
                type="number"
                value={selectedItemData.joinbenefitspercent}
                name="joinbenefitspercent"
                placeholder="AB %"
                onChange={(e) => setSelectedItemData({ ...selectedItemData, joinbenefitspercent: e.target.value })}
              />
            </div>
            <div className="flex flex-col p-2 mt-4 text-start w-full lg:w-1/5">
              <label htmlFor="sal" className="text-base mx-1">Basic Salary Amount:<sup className="text-red-600 font-bold">*</sup></label>
              <input
              id="sal"
                className="input-style bg-red-200 rounded-lg p-1"
                type="number"
                value={selectedItemData.joinbasicSalary}
                name="joinbasicSalary"
                // onChange={(e) => setSelectedItemData({...selectedItemData, joinbasicSalaryPercent: e.target.value})}
              
                readOnly
              />
            </div>
            <div className="flex flex-col p-2 mt-4 text-start w-full lg:w-1/5">
              <label htmlFor="hrm" className="text-base mx-1">HRA Amount:<sup className="text-red-600 font-bold">*</sup></label>
              <input
              id="hrm"
                className="input-style bg-red-200 rounded-lg p-1"
                type="number"
                value={selectedItemData.joinhrapercentageamount}
                name="joinhrapercentageamount"
                // onChange={(e) => setSelectedItemData({...selectedItemData, joinbasicSalaryPercent: e.target.value})}
               
                readOnly
              />
            </div>

            <div className="flex flex-col p-2 mt-4 text-start w-full lg:w-1/5">
              <label htmlFor="maa" className="text-base mx-1">Medical Allowance Amount:<sup className="text-red-600 font-bold">*</sup></label>
              <input
              id="maa"
                className="input-style bg-red-200 rounded-lg p-1"
                type="number"
                value={selectedItemData.joinma}
                name="joinma"
                // onChange={(e) => setSelectedItemData({...selectedItemData, joinbasicSalaryPercent: e.target.value})}
               
                readOnly
              />
            </div>

            <div className="flex flex-col p-2 mt-4 text-start w-full lg:w-1/5">
              <label htmlFor="kaa" className="text-base mx-1">Kit Allowance Amount:<sup className="text-red-600 font-bold">*</sup></label>
              <input
              id="kaa"
                className="input-style bg-red-200 rounded-lg p-1"
                type="number"
                value={selectedItemData.joinkitallowance}
                name="joinkitallowance"
                // onChange={(e) => setSelectedItemData({...selectedItemData, joinbasicSalaryPercent: e.target.value})}
               
                readOnly
              />
            </div>
          
            <div className="flex flex-col p-2 mt-4 text-start w-full lg:w-1/5">
              <label htmlFor="aba" className="text-base mx-1">Additinal Benefits Amount:<sup className="text-red-600 font-bold">*</sup></label>
              <input
              id="aba"
                className="input-style bg-red-200 rounded-lg p-1"
                type="number"
                value={selectedItemData.joinbenefitsamount}
                name="joinbenefitsamount"
                // onChange={(e) => setSelectedItemData({...selectedItemData, joinbasicSalaryPercent: e.target.value})}
                
                readOnly
              />
            </div>

            <div className="flex flex-col p-2 mt-4 text-start w-full lg:w-1/5">
              <label htmlFor="pi" className="text-base mx-1">Performance Incentive %:<sup className="text-red-600 font-bold">*</sup></label>
              <input
              id="pi"
                className="input-style rounded-lg p-1"
                type="number"
                value={selectedItemData.joinpipercent}
                name="joinpipercent"
                placeholder="PI %"
                onChange={(e) => setSelectedItemData({ ...selectedItemData, joinpipercent: e.target.value })}
              />
            </div>
           

            <div className="flex flex-col p-2 mt-4 text-start w-full lg:w-1/5">
              <label htmlFor="pf" className="text-base mx-1">PF %:<sup className="text-red-600 font-bold">*</sup></label>
              <input
              id="pf"
                className="input-style rounded-lg p-1"
                type="number"
                value={selectedItemData.joinpfpercent}
                name="joinpfpercent"
                placeholder="PF %"
                onChange={(e) => setSelectedItemData({ ...selectedItemData, joinpfpercent: e.target.value })}
              />
            </div>
            <div className="flex flex-col p-2 mt-4 text-start w-full lg:w-1/5">
              <label htmlFor="stock" className="text-base mx-1">Stock %:<sup className="text-red-600 font-bold">*</sup></label>
              <input
              id="stock"
                className="input-style rounded-lg p-1"
                type="number"
                value={selectedItemData.joinstockpercent}
                name="joinstockpercent"
                placeholder="STOCK %"
                onChange={(e) => setSelectedItemData({ ...selectedItemData, joinstockpercent: e.target.value })}
              />
            </div>

            <div className="flex flex-col p-2 mt-4 text-start w-full lg:w-1/5">
              <label htmlFor="esi" className="text-base mx-1">ESI %:<sup className="text-red-600 font-bold">*</sup></label>
              <input
              id="esi"
                className="input-style rounded-lg p-1"
                type="number"
                value={selectedItemData.joinesipercent}
                name="joinesipercent"
                placeholder="ESI %"
                onChange={(e) => setSelectedItemData({ ...selectedItemData, joinesipercent: e.target.value })}
              />
            </div>
            
            <div className="flex flex-col p-2 mt-4 text-start w-full lg:w-1/5">
              <label htmlFor="car" className="text-base mx-1">Car:<sup className="text-red-600 font-bold">*</sup></label>
              <input
              id="car"
                className="input-style rounded-lg p-1"
                type="number"
                value={selectedItemData.joincar}
                name="joincar"
                placeholder="CAR(in Rs.)"
                onChange={(e) => setSelectedItemData({ ...selectedItemData, joincar: e.target.value })}
              />
            </div>

            <div className="flex flex-col p-2 mt-4 text-start w-full lg:w-1/5">
              <label htmlFor="pia" className="text-base mx-1">Performance Incentive Amount:<sup className="text-red-600 font-bold">*</sup></label>
              <input
              id="pia"
                className="input-style bg-red-200 rounded-lg p-1"
                type="number"
                value={selectedItemData.joinpi}
                name="joinpi"
                // onChange={(e) => setSelectedItemData({...selectedItemData, joinbasicSalaryPercent: e.target.value})}
               
                readOnly
              />
            </div>
            <div className="flex flex-col p-2 mt-4 text-start w-full lg:w-1/5">
              <label htmlFor="pfa" className="text-base mx-1">PF Amount:<sup className="text-red-600 font-bold">*</sup></label>
              <input
              id="pfa"
                className="input-style bg-red-200 rounded-lg p-1"
                type="number"
                value={selectedItemData.joinpf}
                name="joinpf"
                // onChange={(e) => setSelectedItemData({...selectedItemData, joinbasicSalaryPercent: e.target.value})}
               
                readOnly
              />
            </div>
           
            <div className="flex flex-col p-2 mt-4 text-start w-full lg:w-1/5">
              <label htmlFor="sa" className="text-base mx-1">Stock Amount:<sup className="text-red-600 font-bold">*</sup></label>
              <input
              id="sa"
                className="input-style bg-red-200 rounded-lg p-1"
                type="number"
                value={selectedItemData.joinstock}
                name="joinstock"
                // onChange={(e) => setSelectedItemData({...selectedItemData, joinbasicSalaryPercent: e.target.value})}
               
                readOnly
              />
            </div>
            <div className="flex flex-col p-2 mt-4 text-start w-full lg:w-1/5">
              <label htmlFor="esa" className="text-base mx-1">ESI Amount:<sup className="text-red-600 font-bold">*</sup></label>
              <input
              id="esa"
                className="input-style bg-red-200 rounded-lg p-1"
                type="number"
                value={selectedItemData.joinesi}
                name="joinesi"
                // onChange={(e) => setSelectedItemData({...selectedItemData, joinbasicSalaryPercent: e.target.value})}
               
                readOnly
              />
            </div>
           

            <div className="flex flex-col p-2 mt-4 text-start w-full lg:w-1/5">
              <label htmlFor="ts" className="text-base mx-1">Total Salary:<sup className="text-red-600 font-bold">*</sup></label>
              <input
              id="ts"
                className="input-style bg-red-200 rounded-lg p-1"
                type="number"
                value={selectedItemData.joiningtotal}
                name="joiningtotal"
                onChange={(e) => setSelectedItemData({ ...selectedItemData, joiningtotal: e.target.value })}
               
                readOnly
              />
            </div>
            <div className="flex flex-col p-2 mt-4 text-start w-full lg:w-1/5"></div>
          </div>

          <div className="flex justify-center p-2 text-center w-full pb-5 mt-5 gap-10">
            <button
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 hover:text-black dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded text-base px-4 py-1.5 text-center"
              onClick={handleSubmit}
              type="button"
              disabled={formSubmitted}
            >
              {formSubmitted ? "Submitted" : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddJoining;
