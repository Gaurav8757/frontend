/* eslint-disable react/prop-types */
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function TerminationLetter({ terminate, onClose }) {
    //    print function
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        documentTitle: `${terminate.empname}_termination_letter`,
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
            const pageHeight = 295;
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
            pdf.save('termination_letter.pdf');
        });
    };



    return (
        <>
                <div
                    id="static-modal"
                    data-modal-backdrop="static"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed top-0 right-0 left-0 bottom-0 inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
                    <div className="relative p-4 w-full max-w-7xl max-h-7xl mx-auto my-20 backdrop-blur-lg">
                        <div className="flex flex-col bg-orange-700 border shadow-sm rounded-xl pointer-events-auto ">
                            <div className="flex justify-between items-center py-3 px-4 ">
                                <div className='flex justify-end mx-5  '>
                                <button onClick={downloadPDF} className="flex justify-end my-0 mx-4 px-4 py-2 bg-blue-500 hover:bg-blue-800  text-white rounded shadow-md">
                                        Download
                                    </button>
                                    <button onClick={handlePrint} className="flex justify- text-end my-0   px-4 py-2 bg-green-600 hover:bg-green-800 text-white rounded shadow-md">
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
                            <div className="overflow-y-auto h-full">

                                <div className=" max-w-auto bg-gradient-to-br from-red-100 to-red-200  p-4 print" ref={componentRef}>
                                    {/* header */}
                                    <header className="flex mb-10 justify-between relative overflow-hidden">
                                        {/* 1 */}
                                        <div className="absolute bottom-0 left-0 w-full h-full bg-black transform origin-bottom-right -skew-y-6"></div>
                                        <div className="absolute bottom-0 left-0 w-full h-full bg-red-700 transform origin-top-left -skew-y-6"></div>
                                        {/* 1 */}
                                        <div className="relative z-10 p-8 text-white">
                                            <img className="h-40 w-80 shadow shadow-slate-100" src="/logo.webp" alt="logo" />
                                        </div>
                                        {/* 2 */}
                                        <div className="px-4 leading-8 relative rounded-s-xl text-end text-white">
                                            <h2 className="text-2xl font-bold py-3">ELEEDOM IMF PVT. LTD.</h2>
                                            <p>CIN No .: U66000BR2022PTC058334</p>
                                            <p>GST IN : 10AAHCE0776B1Z9</p>
                                            <p>Flat No.607, B-Block, Gagan Apartment
                                                Exhibition Road, Patna- 800001</p>
                                            <p>eleedomimf@gmail.com</p>
                                            <p>06224 270046, 9934337013</p>
                                        </div>
                                    </header>


                                    {/* section */}
                                    <section className="">
                                        <div className="text-start mx-4 font-bold mb-5 flex justify-between">
                                            <span>
                                                Employee ID: <span>{terminate.empid}</span></span>
                                            <span>Date: {terminate.currDate}</span>
                                        </div>
                                        <p className='text-center font-bold'>
                                            Termination Letter
                                        </p>
                                        {/* <h2 className="text-xl font-bold mb-4 text-start mx-4"> <span>Dear [Employee Name]</h2> */}
                                        <p className="mb-4 mx-4 flex-wrap text-start">
                                            To,
                                            <br />
                                            {terminate.empname} <br />
                                            {terminate.currentempaddress}<br />
                                            {terminate.empemail}<br />
                                            {terminate.empmobile} <br />
                                        </p>

                                        <p className=' p-4 text-start'>
                                            Subject:- <span className='font-bold text-base'>Termination of Employment</span>
                                        </p>
                                        <p className="mb-4 p-4 leading-8 text-justify">
                                            <span className='font-semibold'>Dear {terminate.empname},</span><br />
                                            I am writing to inform you that, unfortunately, your employment with <b>Eleedom IMF Pvt. Ltd.</b> will be terminated effective <span className='font-semibold'>{terminate.terminatedate}</span>. This decision was made after careful consideration and evaluation of various factors.
                                            <br />
                                            We appreciate the contributions you have made during your time with us, and we want to thank you for your dedication and hard work. However, despite our efforts to address certain performance issues, we have not seen the desired improvement, and therefore, we believe it is in the best interest of both parties to part ways.
                                            <br />
                                            Your final paycheck will include all accrued wages up to your last day of employment, including any unused vacation or sick leave, as per company policy. Additionally, you will receive information regarding continuation of benefits and any other pertinent details.
                                            <br />
                                            We understand that this news may come as a disappointment, and we are committed to providing you with support during this transition period. Please feel free to contact <b>HR Manager</b> in the Human Resources department if you have any questions or need assistance with any aspect of the termination process.
                                            <br />
                                            We wish you the best in your future endeavors.
                                        </p>
                                        <p className="mb-2 text-start mx-4 mt-5 font-bold">
                                            Kamlesh Thakur <br />
                                            (HR Manager)
                                        </p>
                                    </section>
                                    {/* footer */}
                                    <div className=" flex w-full h-1.5 bg-red-700 mb-0.5"></div>
                                    <footer className="flex relative  overflow-hidden">
                                        <div className="z-50 py-2 w-full h-full bg-red-700 transform origin-top-left -skew-y-3"></div>
                                        <div className="absolute py-2 w-full h-full bg-black transform origin-bottom-right -skew-y-4"></div>
                                    </footer>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    );
}






export default TerminationLetter;