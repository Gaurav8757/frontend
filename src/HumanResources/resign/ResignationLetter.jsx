import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function ResignationLetter() {


    //    print function
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        documentTitle: "By joining username",
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
            pdf.save('resignation_letter.pdf');
        });
    };



    return (
        <section className="container-fluid sm:ml-64 " >
            <div className='flex justify-end mx-5 '>
                <button onClick={downloadPDF} className="flex justify-end my-3 mx-4 px-4 py-2 bg-blue-700 text-white rounded-md shadow-md">
                    Download
                </button>
                <button onClick={handlePrint} className="flex justify- text-end my-3   px-4 py-2 bg-green-500 text-white rounded-md shadow-md">
                    Print
                </button>
            </div>
            <div className=" max-w-auto after:p-4 bg-gradient-to-br from-red-100 to-red-200  p-8 print" ref={componentRef}>
                {/* header */}
                <header className="flex mb-8 justify-between relative overflow-hidden">
                    {/* 1 */}
                    <div className="absolute bottom-0 left-0 w-full h-full bg-black transform origin-bottom-right -skew-y-6"></div>
                    <div className="absolute bottom-0 left-0 w-full h-full bg-red-700 transform origin-top-left -skew-y-6"></div>
                    {/* 1 */}
                    <div className="relative z-10 p-8 text-white">
                        <img className="h-40 w-80 shadow shadow-slate-100" src="/logo.jpg" alt="logo" />
                    </div>
                    {/* 2 */}
                    <div className="px-4 leading-8 relative rounded-s-xl text-end text-white">
                        <h2 className="text-2xl font-bold py-4">ELEEDOM IMF PVT. LTD.</h2>
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
                    <h2 className="text-xl font-bold mb-4 text-start">Dear [HR Name],</h2>
                    <p className="mb-4">
                        We are thrilled  for resignation to Eleedom IMF as a [Job Title] on our [Market Team].
                        You will be an integral part of our mission to [Company Mission Statement].
                    </p>
                    <p className="mb-4">
                        Here are the details of your offer:
                    </p>
                    {/* <ul className="list-disc mb-4 ml-6">
                        <li>Position: [Job Title]</li>
                        <li>Salary: [Salary Amount]</li>
                        <li>Start Date: [Start Date]</li>
                        <li>Location: [Location]</li>
                    </ul> */}
                    <p className="mb-4">
                        I am writing to inform you that I will be leaving ABC Corporation permanently on April 21, 20XX. I have recently
                        accepted a position as head architect with a local organization in the public sector. I think that this new opportunity is
                        well suited to my long-term career goals.
                        Thank you for allowing me the opportunity to work with and learn from such an outstanding staff. The knowledge I
                        have gained in my year at ABC Corporation will surely aid me in my future endeavors. I am especially grateful for your
                        close and patient supervision. Your kind encouragement assured me of my ability to handle all aspects of this industry.
                        If there is anything I can do to make my departure easier, please let me know.
                    </p>
                    <p className="mb-4 flex justify-end mx-5">
                        Sincerely,
                        <br />
                        [Your Name]
                        <br />
                        [Your Position]
                        <br />
                        Eleedom IMF
                    </p>
                </section>

                {/* footer */}
                <div className=" flex w-full h-1.5 bg-red-700 mb-0.5"></div>
                <footer className="flex relative  overflow-hidden">
                    <div className="z-50 py-4 w-full h-full bg-red-700 transform origin-top-left -skew-y-3"></div>
                    <div className="absolute py-4 w-full h-full bg-black transform origin-bottom-right -skew-y-4"></div>
                </footer>

            </div>

        </section>
    );
}

export default ResignationLetter;