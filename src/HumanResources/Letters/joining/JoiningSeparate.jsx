/* eslint-disable react/prop-types */
import { useRef } from "react";
import { useReactToPrint } from 'react-to-print';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function JoiningSeparate({ offers, onClose }) {
    // Print function
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        documentTitle: `${offers.ofname}_Joining_letter`,
        content: () => componentRef.current,
        removeAfterPrint: true,
    });

    // Download PDF function
    const downloadPDF = () => {
        const input = componentRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210;
            const pageHeight = 595;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            pdf.save('joining_letter.pdf');
        });
    };

    return (
        <>
          
                <div
                    id="static-modal"
                    data-modal-backdrop="static"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed top-0 right-0 left-0 bottom-0 inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
                >
                    <div className="relative p-4 w-full max-w-7xl max-h-7xl mx-auto my-20 backdrop-blur-lg">
                        <div className="flex flex-col bg-orange-700 border shadow-sm rounded-xl pointer-events-auto">
                            <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                                <div className="flex justify-end mx-5">
                                    <button onClick={downloadPDF} className="flex justify-end my-0 mx-4 px-4 py-2 bg-blue-700 text-white rounded-md shadow-md">
                                        Download
                                    </button>
                                    <button onClick={handlePrint} className="flex justify-end my-0 mx-4 px-4 py-2 bg-green-700 text-white rounded-md shadow-md">
                                        Print
                                    </button>
                                </div>
                                <button
                                    onClick={onClose}
                                    type="button"
                                    className=" bg-transparent hover:bg-red-100 text-slate-100  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  "
                            >
                                <img
                                    src="/close.png"
                                    height={5}
                                    width={25}
                                    alt="close"
                                    className="hover:bg-red-100 rounded-full"
                                />
                                </button>
                            </div>

                            <div className="overflow-y-auto h-auto">
                                <div className="max-w-auto bg-gradient-to-br from-red-100 to-red-200 p-1 print" ref={componentRef}>
                                    {/* Your content here */}
                                    <header className="flex mb-0 justify-between relative overflow-hidden">
                                        {/* 1 */}
                                        <div className="absolute bottom-0 left-0 w-full h-full bg-black transform origin-bottom-right -skew-y-6"></div>
                                        <div className="absolute bottom-0 left-0 w-full h-full bg-red-700 transform origin-top-left -skew-y-6"></div>
                                        {/* 1 */}
                                        <div className="relative z-10 p-8 text-white">
                                            <img className="h-40 w-80 shadow shadow-slate-100" src="/logo.webp" alt="logo" />
                                        </div>
                                        {/* 2 */}
                                        <div className="px-4 leading-8 relative  rounded-s-xl text-end text-white">
                                            <h2 className="text-2xl font-bold py-4">ELEEDOM IMF PVT. LTD.</h2>
                                            <p>CIN No .: U66000BR2022PTC058334</p>
                                            <p>GST IN : 10AAHCE0776B1Z9</p>
                                            <p>Flat No.607, B-Block, Gagan Apartment
                                                Exhibition Road, Patna- 800001</p>
                                            <p>eleedomimf@gmail.com</p>
                                            <p>06224 270046, 9934337013</p>
                                        </div>
                                    </header>
                                    <div className="bg-white p-10 rounded-b shadow-md">
                                        <p className="mb-4 text-end font-semibold">Date: {offers.ofdate}</p>
                                        <p className="mb-3 mx-4 text-start">
                                            To,
                                            <br />
                                            {offers.ofname}<br />
                                            {offers.ofaddress}<br />
                                            {offers.ofemail}<br />
                                            {offers.ofmobile}<br />
                                        </p>
                                        <p className="mb-3 mx-4 text-start font-bold">Subject: Appointment for Post of Officer Renewal & Manual Entry</p>
                                        <p className="mb-4 mx-4 text-start font-semibold">Dear {offers.ofname}</p>
                                        <p className="mb-4 mx-4 text-justify">We are pleased to offer you, the position of {offers.ofdesignation} with <span className='font-bold'> Eleedom IMF Pvt. Ltd.</span>  (the ‘Company’) on the following terms and conditions:</p>
                                        <ul className="list-disc mb-4 text-start mx-16">
                                            <li>Commencement of employment<br /> Your employment will be effective, as of {offers.joinempdate}</li><br />
                                            <li>Job title:<br />
                                                Your job title will be {offers.ofdesignation}, and   you will report to Mr. Kamlesh Thakur, Manager Accounts.
                                            </li><br />

                                            {/* <li>Your employment will be effective, as of 1st July 2022</li><br/> */}
                                            <li>Salary<br />
                                                Your salary and other benefits will be as set out in Schedule 1, here to.
                                            </li><br />

                                            <li>Place of posting<br />
                                                You will be posted at Hajipur Vaishali Bihar. You may however be required to work at any place of business which the Company has, or may later acquire.
                                            </li><br />

                                            <li>Hours of Work<br />
                                                The normal working days are Monday through Saturday. You will be required to work for such hours as necessary for the proper discharge of your duties to the Company. The normal working hours are from 10.00 AM to 06.00 PM and you are expected to work not less than 8 hours each day, and if necessary for additional hours depending on your responsibilities.
                                            </li><br />
                                            <li>
                                                Leave/Holidays
                                                <ul className="list-disc mb-4 text-start mx-16">
                                                    <li>You are entitled to casual leave of 6 days.</li>
                                                    <li>You are entitled to 6 working days of paid sick leave.</li>
                                                    <li>The Company shall notify a list of declared holidays in the beginning of each year. </li>
                                                </ul></li><br />
                                            <li>Nature of duties<br />
                                                You will perform to the best of your ability all the duties as are inherent in your post and such additional duties as the company may call upon you to perform, from time to time. Your specific duties are set out in Schedule II hereto.
                                            </li><br />
                                            <li>Company property<br />
                                                You will always maintain in good condition Company property, which may be entrusted to you for official use during the course of your employment and shall return all such property to the Company prior to relinquishment of your charge, failing which the cost of the same will be recovered from you by the Company.
                                            </li><br />

                                            <li>Borrowing/accepting gifts<br />
                                                You will not borrow or accept any money, gift, reward or compensation for your personal gains from or otherwise place yourself under pecuniary obligation to any person/client with whom you may be having official dealings.
                                            </li><br />

                                            <li>Termination:
                                                <ul className="list-disc mb-4 text-start mx-16">
                                                    <li>Your appointment can be terminated by the Company, without any reason, by giving you not less than one months’ prior notice in writing or salary in lieu thereof. For the purpose of this clause, salary shall mean basic salary.</li>
                                                    <li>You may terminate your employment with the Company, without any cause, by giving no less than 2 months’ prior notice or salary for unsaved period, left after adjustment of pending leaves, as on date.</li>
                                                    <li>The Company reserves the right to terminate your employment summarily without any notice period or termination payment, if it has reasonable ground to believe you are guilty of misconduct or negligence, or have committed any fundamental breach of contract or caused any loss to the Company. </li>
                                                    <li> On the termination of your employment for whatever reason, you will return to the Company all property; documents and paper, both original and copies thereof, including any samples, literature, contracts, records, lists, drawings, blueprints, letters, notes, data and the like; and Confidential Information, in your possession or under your control relating to your employment or to clients’ business affairs. </li>
                                                </ul></li><br />
                                            <li>Confidential Information:
                                                <ul className="list-disc mb-4 text-start mx-16">
                                                    <li>During your employment with the Company you will devote your whole time, attention and skill to the best of your ability for its business. You shall not, directly or indirectly, engage or associate yourself with, be connected with, concerned, employed or engaged in any other business or activities or any other post or work part time or pursue any course of study whatsoever, without the prior permission of the Company.</li>
                                                    <li>You must always maintain the highest degree of confidentiality and keep as confidential the records, documents and other Confidential Information relating to the business of the Company which may be known to you or confided in you by any means and you will use such records, documents and information only in a duly authorized manner in the interest of the Company. For the purposes of this clause ‘Confidential Information’ means information about the Company’s business and that of its customers which is not available to the general public and which may be learnt by you in the course of your employment. This includes, but is not limited to, information relating to the organization, its customer lists, employment policies, personnel, and information about the Company’s products, processes including ideas, concepts, projections, technology, manuals, drawing, designs, specifications, and all papers, resumes, records and other documents containing such Confidential Information.</li>
                                                    <li>At no time, will you remove any Confidential Information from the office without permission.</li>
                                                    <li>Your duty to safeguard and not disclose Confidential Information will survive the expiration or termination of this Agreement and/or your employment with the Company.</li>
                                                    <li>Breach of the conditions of this clause will render you liable to summary dismissal under clause  above in addition to any other remedy the Company may have against you in law.</li>
                                                </ul></li><br />
                                            <li>Notices<br />
                                                Notices may be given by you to the Company at its registered office address. Notices may be given by the Company to you at the address intimated by you in the official records.
                                            </li><br />
                                            <li>Applicability of Company Policy<br />
                                                The Company shall be entitled to make policy declarations from time to time pertaining to matters like leave entitlement, maternity leave, employees’ benefits, working hours, transfer policies, etc., and may alter the same from time to time at its sole discretion. All such policy decisions of the Company shall be binding on you and shall override this Agreement to that extent.
                                            </li><br />
                                            <li>Governing Law/Jurisdiction<br />
                                                Your employment with the Company is subject to Indian laws. All disputes shall be subject to the jurisdiction of Patna High Court Bihar only.</li><br />

                                            <li> Acceptance of our offer <br />
                                                Please confirm your acceptance of this Contract of Employment by signing and returning the duplicate copy.</li>
                                        </ul>
                                        <p className="mb-4 text-start mx-4">We welcome you, and look forward to receiving your acceptance and to working with you.</p>
                                        <p className="mb-4 text-start mx-4 font-semibold">Yours sincerely,</p>
                                        <p className='text-start mx-4  font-bold'>Kamlesh Thakur<br />
                                            (Manager – HR)

                                        </p>
                                        <p className="text-start mx-7">{offers.joinsigndate}</p>

                                        <p className="mb-4 mt-20 mx-4 font-bold">Schedule I - Compensation Details:</p>
                                        <div className="flex justify-center ">
                                            <table className=' text-center border-collapse border border-slate-900'>
                                                <tbody className='text-center '>
                                                    <tr className='border border-slate-600'>
                                                        <td className='whitespace-nowrap text-center px-10 lg:px-40 py-2'>Basic Salary</td>
                                                        <td className='whitespace-nowrap text-center px-10 lg:px-40 py-2'>{`₹${offers.joinbasicSalary || 0}`}</td>
                                                    </tr>
                                                    <tr className='border border-slate-600'>
                                                        <td className='whitespace-nowrap text-center px-10 lg:px-40 py-2'>House rent allowance</td>
                                                        <td className='whitespace-nowrap text-center px-10 lg:px-40 py-2'>{`₹${offers.joinhrapercentageamount || 0}`}</td>
                                                    </tr>
                                                    <tr className='border border-slate-600'>
                                                        <td className='whitespace-nowrap text-center px-10 lg:px-40 py-2'>Medical allowance</td>
                                                        <td className='whitespace-nowrap text-center px-10 lg:px-40 py-2'>{`₹${offers.joinma || 0}`}</td>
                                                    </tr>
                                                    <tr className='border border-slate-600'>
                                                        <td className='whitespace-nowrap text-center px-10 lg:px-40 py-2'>Kit allowance</td>
                                                        <td className='whitespace-nowrap text-center px-10 lg:px-40 py-2'>{`₹${offers.joinkitallowance || 0}`}</td>
                                                    </tr>
                                                    <tr className='border border-slate-600'>
                                                        <td className='whitespace-nowrap text-center px-10 lg:px-40 py-2'>Additional Benefits</td>
                                                        <td className='whitespace-nowrap text-center px-10 lg:px-40 py-2'>{`₹${offers.joinbenefitsamount || 0}`}</td>
                                                    </tr>
                                                    <tr className='border border-slate-600'>
                                                        <td className='whitespace-nowrap text-center px-10 lg:px-40 py-2'>Performance incentive</td>
                                                        <td className='whitespace-nowrap text-center px-10 lg:px-40 py-2'>{`₹${offers.joinpi || 0}`}</td>
                                                    </tr>
                                                    <tr className='border border-slate-600'>
                                                        <td className='whitespace-nowrap text-center px-10 lg:px-40 py-2'>PF Contribution</td>
                                                        <td className='whitespace-nowrap text-center px-10 lg:px-40 py-2'>{`₹${offers.joinpf || 0}`}</td>
                                                    </tr>
                                                    <tr className='border border-slate-600'>
                                                        <td className='whitespace-nowrap text-center px-10 lg:px-40 py-2'>ESI Contribution</td>
                                                        <td className='whitespace-nowrap text-center px-10 lg:px-40 py-2'>{`₹${offers.joinesi || 0}`}</td>
                                                    </tr>
                                                    <tr className='border border-slate-600'>
                                                        <td className='whitespace-nowrap text-center px-10 lg:px-40 py-2'>Stock Option</td>
                                                        <td className='whitespace-nowrap text-center px-10 lg:px-40 py-2'>{`₹${offers.joinstock || 0}`}</td>
                                                    </tr>
                                                    <tr className='border border-slate-600'>
                                                        <td className='whitespace-nowrap text-center px-10 lg:px-40 py-2'>Car</td>
                                                        <td className='whitespace-nowrap text-center px-10 lg:px-40 py-2'>{`₹${offers.joincar || 0}`}</td>
                                                    </tr>
                                                    <tr className='border border-slate-600'>
                                                        <td className='whitespace-nowrap text-center px-10 lg:px-40 py-2 font-bold'>Total</td>
                                                        <td className='whitespace-nowrap text-center px-10 lg:px-40 py-2 font-bold'>{`₹${offers.joiningtotal || 0}`}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>




                                        <p className="mb-4 text-start mx-4 mt-5"> <span className='font-semibold'>Note: </span>
                                            You will receive salary, and all other benefits forming part of your remuneration package subject to , and after, deduction of tax at source in accordance with applicable law.</p>


                                        <p className="mb-4 mt-20 mx-4 font-semibold text-start"> Schedule II - Employee Duties & Responsibilities:</p>

                                        <p className="mb-4 mt-5 mx-4  text-start">
                                            Duties: <br />
                                            <ul className="list-disc mb-4 text-start mx-16">
                                                <li>Achieve Monthly Target of Renewal Two-Wheeler,</li>
                                                <li>Maintaining Manual Ledger of debtor’s </li>
                                                <li>Maintaining Ledger of Office Expense and Hospitality.</li>
                                            </ul>
                                        </p>
                                        <p className="mb-4 mt-10 mx-4  text-start">
                                            Responsibilities: <br />
                                            <ul className="list-disc mb-4 text-start mx-16">
                                                <li>Maintain All Manual Debtor’s Entry in good condition.</li>
                                                <li>Maintain Target Vs Achievement Data of Personal Renewal Two-Wheelers.</li>
                                            </ul>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* footer */}
                            <div className=" flex w-full h-1.5 bg-red-700 mb-0.5"></div>
                            <footer className="flex relative  overflow-hidden">
                                <div className="z-50 py-4 w-full h-full bg-red-700 transform origin-top-left -skew-y-3"></div>
                                <div className="absolute py-4 w-full h-full bg-black transform origin-bottom-right -skew-y-4"></div>
                            </footer>
                        </div>
                    </div>
                </div>
        </>
    );
}

export default JoiningSeparate;
