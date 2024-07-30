/* eslint-disable react/prop-types */
import { useState } from "react";
import UpdateMaster from "./UpdateMaster.jsx";
const TableData = ({ filteredData, onDeleteAllData, onUpdateInsurance, totalItems }) => {
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

  return (
    <div className="inline-block min-w-full w-full py-0 relative">
      <table className="min-w-full text-center text-xs font-light table border border-black">
        <thead className="border-b font-medium bg-slate-300 sticky top-16">
          <tr className="text-blue-700 sticky top-16">
            {[
              'Update',
              'Reference ID',
              'Entry Date',
              'Branch',
              'Insured Name',
              'Contact No',
              'Policy Made By',
              'Policy Received Time',
              'Policy Updated Time',
              'Company',
              'Category',
              'Policy Type',
              'Policy No',
              'Engine No',
              'Chassis No',
              'OD Premium',
              'Liability Premium',
              'Net Premium',
              'RSA',
              'GST (in rupees)',
              'Final Amount',
              'OD Discount (%)',
              'NCB',
              'Policy Payment Mode',
              'State',
              'District',
              'Vehicle Reg No',
              'Segment',
              'Sourcing',
              'Policy Start Date',
              'Policy End Date',
              'OD Expiry',
              'TP Expiry',
              'IDV',
              'Body Type',
              'Make & Model',
              'MFG Year',
              'Registration Date',
              'Vehicle Age',
              'Fuel',
              'GVW',
              'Seating Capacity',
              'C.C',
              'Product Code',
              'Advisor Name',
              'Sub Advisor',
              'Payout On',
              'Advisor Payout %',
              'Advisor Payout',
              'Advisor Payable Amount',
              'Branch Payout %',
              'Branch Payout',
              'Branch Payable Amount',
              'Company Payout %',
              'Company Payout',
              'Profit/Loss',
              '',
              'Delete',
            ].map((header) => (
              <th scope="col" className="px-1 border border-black" key={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 overflow-y-hidden">
          {filteredData.map((data) => (
            <tr
              className="border-b dark:border-neutral-200 bg-slate-200 text-sm font-medium hover:bg-orange-100 hover:transition ease-in-out"
              key={data._id} >
              <td className="whitespace-nowrap px-1 border border-black">
              <button onClick={() => handleUpdateClick(data)} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded text-sm px-2 py-1 my-0.5 mx-0.5 text-center ">
                                                            Update
                                                        </button>
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.policyrefno}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.entryDate}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.branch}
              </td>
              <td className="whitespace-wrap px-1 border border-black">
                {data.insuredName}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.contactNo}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.staffName}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.currentTime}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.empTime}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.company}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.category}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.policyType}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.policyNo}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.engNo}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.chsNo}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.odPremium}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.liabilityPremium}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.netPremium}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.rsa}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.taxes}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.finalEntryFields}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.odDiscount}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.ncb}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.policyPaymentMode}
              </td>
              <td className="whitespace-nowrap px-1 py-0 border border-black">
                {data.states}
              </td>
              <td className="whitespace-nowrap px-1 py-0 border border-black">
                {data.district}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.vehRegNo}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.segment}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.sourcing}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.policyStartDate}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.policyEndDate}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.odExpiry}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.tpExpiry}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.idv}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.bodyType}
              </td>
              <td className="whitespace-wrap px-1 border border-black">
                {data.makeModel}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.mfgYear}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.registrationDate}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.vehicleAge}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.fuel}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.gvw}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.sitcapacity}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.cc}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.productCode}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.advisorName}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.subAdvisor}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.payoutOn}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.cvpercentage}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">{`₹${data.advisorPayoutAmount}`}</td>
              <td className="whitespace-nowrap px-1 border border-black">{`₹${data.advisorPayableAmount}`}</td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.branchpayoutper}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">{`₹${data.branchPayout}`}</td>
              <td className="whitespace-nowrap px-1 border border-black">{`₹${data.branchPayableAmount}`}</td>
              <td className="whitespace-nowrap px-1 border border-black">
                {data.companypayoutper}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">{`₹${data.companyPayout}`}</td>
              <td className={`whitespace-nowrap px-1 border border-black ${data.profitLoss > 0 ? 'text-green-600 font-bold' : (data.profitLoss < 0 ? 'text-red-600 font-bold' : 'text-black font-bold')}`}>
                      {`₹${data.profitLoss}`}
                    </td>
              <td className="whitespace-nowrap px-8 border border-black">
                {/* <input type="checkbox" className="border-black" /> */}
              </td>
              <td className="whitespace-nowrap px-1 border border-black">
                <button
                  onClick={() => onDeleteAllData(data._id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="font-bold">Total Items: {totalItems}</div>
      {showUpdatePopup && selectedRowId && (
                <UpdateMaster insurance={selectedRowId} onUpdate={onUpdateInsurance} onClose={handleClosePopup} />
            )}
    </div>
    
  );
};

export default TableData;
