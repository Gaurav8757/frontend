import { NavLink } from "react-router-dom";

const ClaimForm = () => {
  const companies = [
    {
      s_no: "1",
      c_name: "Tata AIG",
      link: "pdf/CLAIM_FORM_TATA_AIG.PDF",
     
    },
    {
      s_no: "2",
      c_name: "Bajaj Allianz",
      link: "pdf/BAJAJ_CLAIM_FROM.pdf",
    },
    {
      s_no: "3",
      c_name: "ICICI Lombard",
      link: "pdf/CLAIM_FORM_ICIC_LOMBARD.pdf",
    },
    { s_no: "4", c_name: "Reliance General Insurance", link: "pdf/Claim_Form_RELIANCE.pdf" },
    { s_no: "5", c_name: "Future Generali", link: "pdf/FUTURE_GEN_CLAIM_FORM.pdf" },
    { s_no: "6", c_name: "HDFC ERGO", link: "pdf/HDFC_CLAIM_FROM.pdf" },
    { s_no: "7", c_name: "IFFICO Tokio", link: "pdf/IFFCO_TOKIO_CLAIM_FORM.pdf" },
    { s_no: "8", c_name: "Magma HDI", link: "pdf/magma_COMMERCIAL_VEHICLE_CLAIM_FORM.pdf" },
    { s_no: "9", c_name: "Shriram General Insurance", link: "pdf/Motor_Claim_Form_SHRIRAM.pdf" },
  ];

 

  return (
    <section className="container-fluid relative h-screen bg-orange-50">
      <div className="container-fluid flex flex-col justify-center p-2 border-gray-200 border-dashed rounded-lg">
      <h1 className="flex justify-center font-semibold text-3xl text-orange-700 w-full my-2">Claim Form&apos;s</h1>
        <div className="inline-block min-w-full w-full py-0 bg-orange-100">
          <div className="overflow-x-auto w-xl text-black">
           
            <hr></hr>
          </div>
          <div className="inline-block min-w-full w-full py-0  overflow-x-auto">
            <table className="min-w-full text-center text-sm font-light">
              <thead className="border border-black font-medium">
                <tr className="text-blue-600">
                  <th scope="col" className="px-1 py-1  ">
                    Serial No.
                  </th>
                  <th scope="col" className="px-1 py-1 ">
                    Company Name
                  </th>
                  <th scope="col" className="px-1 py-1 ">
                    Download Form
                  </th>
                </tr>
              </thead>
              <tbody className="text-black">
                {companies.map((company, index) => (
                  <tr key={index} className="border-b dark:border-neutral-500 text-sm font-medium">
                    <td>{company.s_no}</td>
                    <td className="whitespace-nowrap px-1 py-1 font-bold">{company.c_name}</td>
                    <td className="whitespace-nowrap ">
                      <NavLink
                        to={`https://eleedomimf.com/${company.link}`}
                        download={`${company.c_name}_Claim_Form.pdf`}
                        className="flex justify-center"
                        target="_blank"
                      >
                        
                        <img src="/pdf.png" alt="download" width={45} className="text-center" />
                      </NavLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClaimForm;
