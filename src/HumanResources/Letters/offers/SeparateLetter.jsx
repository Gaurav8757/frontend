/* eslint-disable react/prop-types */
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
function SeparateLetter({ offers, onClose }) {


    //    print function
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        documentTitle: `${offers.ofname}_Offer_letter`,
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
            pdf.save('offer_letter.pdf');
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
                        <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                            <div className='flex justify-end mx-5  '>
                                <button onClick={downloadPDF} className="flex justify-end my-0 mx-4 px-4 py-2 bg-blue-700 text-white rounded-md shadow-md">
                                    Download
                                </button>
                                <button onClick={handlePrint} className="flex justify- text-end my-0   px-4 py-2 bg-green-700 hover:bg-green-500 hover:text-black text-white rounded-md shadow-md">
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

                            <div className=" max-w-auto bg-gradient-to-br from-red-100 to-red-200  p-2 print" ref={componentRef}>
                                {/* header */}
                                <header className="flex mb-5 justify-between relative overflow-hidden">
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
                                    <div className="text-start mx-4 font-bold mb-10 flex justify-between">
                                        <span>
                                            Reference No: <span>{offers.referenceno}</span></span>
                                        <span>Date: {offers.ofdate}</span>
                                    </div>
                                    {/* <h2 className="text-xl font-bold mb-4 text-start mx-4"> <span>Dear [Employee Name]</h2> */}
                                    <p className="mb-2 mx-4 flex-wrap text-start">
                                        To,
                                        <br />
                                        {offers.ofname} <br />
                                        {offers.ofaddress}<br />
                                        {offers.ofemail}<br />
                                        {offers.ofmobile} <br />
                                    </p>
                                    <p className='text-center font-bold'>
                                        Offer Letter
                                    </p>
                                    <p className="mb-3 p-4 leading-8 text-justify">
                                        <span className='font-bold'>Dear {offers.ofname},</span><br />
                                        This has reference to your application and the subsequent interview you had with us it has been decided to take you as {offers.ofdesignation} in
                                        our organization effective from the date of your joining duty on the following terms and conditions.
                                        <ul className="list-disc mb-4  mx-16">
                                            <li className=''>You will be initially Based At Our Office/H.Q at {offers.oflocation}.</li>
                                            <li className=''>You will be paid a Gross Salary/Stipend of Rs.{offers.ofgrosalary}/- ({offers.ofsalaryWords}) Per month. Details may be provided in appointment later.</li>
                                            <li className=''>You will Undergo the probation for a period of six months. Probation can be terminated by the company without notice.</li>
                                            <li className=''>During the Probation period you will not be entitled to take any kind of leave whatsoever. Incase you take leave it will be considered as
                                                loss of payments for day/days.</li>
                                            <li className=''>Training can be extended for a further period at Company discretion.</li>
                                            <li className=''>As this Probation is purely an opportunity, this does not guarantee any permanent employment with us.</li>
                                            <li className=''>During Probation Period in the event of resignation/termination 30 days notice period is mandatory from either side.</li>
                                            <li className=''>After completion of successful probation period your performance will be evaluated.</li>
                                            <li className=''>Please note this Offer letter stands valid till {offers.ofvalidDate}.</li>
                                        </ul>
                                        Kindly return the duplicate copy of this letter duly signed signifying your acceptance and also intimate the date of your joining duty.
                                        Wishing you all the best.
                                    </p>
                                    <p className="mb-2 text-start mx-4 mt-5 font-bold">
                                        Kamlesh Thakur <br />
                                        (Manager-HR)
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




export default SeparateLetter;