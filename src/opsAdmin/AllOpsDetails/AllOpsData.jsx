/* eslint-disable react/prop-types */
import UpdateOps from '../updateOPS/UpdateOps.jsx';
function AllOpsData({ datas, policy, deleteStaff, empData }) {
    return (
        <tr
            className="divide-y text-sm font-medium border border-black hover:bg-orange-100 ">
            <td className="whitespace-nowrap px-1  border border-black">
                <UpdateOps UpdateOps={datas} update={policy} APIData={empData} />
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {datas.policyrefno}
            </td>
            <td className="whitespace-nowrap px-1 border border-black">
                {datas.entryDate}
            </td>
            <td className="whitespace-nowrap px-1 border border-black">
                {datas.branch}
            </td>
            <td className="whitespace-wrap px-1  border border-black">
                {datas.insuredName}
            </td>

            <td className="whitespace-nowrap px-1  border border-black">
                {datas.contactNo}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {datas.staffName}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {datas.currentTime}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {datas.empTime}
            </td>
            <td className="whitespace-nowrap px-1 border border-black">
                {datas.company}
            </td>
            <td className="whitespace-nowrap px-1 border border-black">
                {datas.category}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {datas.policyType}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {datas.policyNo}
            </td>
            <td className="whitespace-wrap px-1  border border-black">
                {datas.engNo}
            </td>
            <td className="whitespace-wrap px-1  border border-black">
                {datas.chsNo}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {datas.odPremium}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {datas.liabilityPremium}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {datas.netPremium}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {datas.taxes}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {datas.rsa}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {datas.finalEntryFields}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {datas.odDiscount}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {datas.ncb}
            </td>
            <td className="whitespace-wrap px-1 border border-black">
                {datas.policyPaymentMode}
            </td>
            <td className="px-1 py-0 border border-black">
                <button type="button" onClick={() => deleteStaff(datas._id)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded text-sm px-2 py-1 text-center ">Delete</button>
            </td>
        </tr>
        
    )
}

export default AllOpsData;