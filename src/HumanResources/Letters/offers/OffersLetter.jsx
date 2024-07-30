import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
function OfferLetter() {

    //    print function
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        documentTitle: "By offered username",
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
            pdf.save('offer_letter.pdf');
        });
    };



    return (
        <section className="container-fluid sm:ml-64 " >
            <div className='flex justify-end mx-5  '>
                <button onClick={downloadPDF} className="flex justify-end my-3 mx-4 px-4 py-2 bg-blue-700 text-white rounded-md shadow-md">
                    Download
                </button>
                <button onClick={handlePrint} className="flex justify- text-end my-3   px-4 py-2 bg-green-500 text-white rounded-md shadow-md">
                    Print
                </button>
            </div>
            <div className=" max-w-auto bg-gradient-to-br from-red-100 to-red-200  p-6 print" ref={componentRef}>
                {/* header */}
                <header className="flex mb-6 justify-between relative overflow-hidden">
                    {/* 1 */}
                    <div className="absolute bottom-0 left-0 w-full h-full bg-black transform origin-bottom-right -skew-y-6"></div>
                    <div className="absolute bottom-0 left-0 w-full h-full bg-red-700 transform origin-top-left -skew-y-6"></div>
                    {/* 1 */}
                    <div className="relative z-10 p-8 text-white">
                        <img className="h-40 w-80 shadow shadow-slate-100" src="/logo.webp"  alt="logo" />
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
                        Reference No:</span>
                        <span>Date: 12/01/2024</span>
                    </div>
                    {/* <h2 className="text-xl font-bold mb-4 text-start mx-4"> <span>Dear [Employee Name]</h2> */}
                    <p className="mb-4 mx-4 text-start">
                        To.
                        <br />
                        Megha Kumari <br />
                        Address: patna<br />
                        meghaghatkan@gmail.com <br />
                        6201556255 <br />
                    </p>

                    {/* <ul className="list-disc mb-4 ml-6">
                        <li>Position: [Job Title]</li>
                        <li>Salary: [Salary Amount]</li>
                        <li>Start Date: [Start Date]</li>
                        <li>Location: [Location]</li>
                    </ul> */}
                    <p className='text-center font-bold'>
                        Offer Letter
                    </p>
                    <p className="mb-4 p-4 leading-8 text-justify">






                        <span className='font-bold'>Dear Megha Kumari,</span><br />
                        This has reference to your application and the subsequent interview you had with us it has been decided to take you as Office Executive in
                        our organization effective from the date of your joining duty on the following terms and conditions.
                        <ul className="list-disc mb-4  mx-16">


                            <li className=''>You will be initially Based At Our Office. Patna .</li>
                            <li className=''>You will be paid a Gross Salary/Stipend of Rs.14000/- (Fourteen Thousand only) Per month. Details may be provided in appointment later.</li>
                            <li className=''>You will Undergo the probation for a period of six months. Probation can be terminated by the company without notice.</li>
                            <li className=''>During the Probation period you will not be entitled to any kind of leave whatsoever. Incase you take leave it will be considered as
                                loss of payments for day/days.</li>
                            <li className=''>Training can be extended for a further period at Company discretion.</li>
                            <li className=''>As this Probation is purely an opportunity, this does not guarantee any permanent employment with us.</li>
                            <li className=''>After completion of successful probation period your performance will be evaluated.</li>
                            <li className=''>Please note this Offer latter stands valid till 16/01/2024</li>
                        </ul>
                        Kindly return the duplicate copy of this letter duly signed signifying your acceptance and also intimate the date of your joining duty.
                        Wishing you all the best.


                        
                    </p>
                    <p className="mb-2 text-start mx-4 mt-5 font-bold">
                        Kamlesh Thakur <br/>
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

        </section>
    );
}

export default OfferLetter;
