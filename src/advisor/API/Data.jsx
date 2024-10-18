import VITE_DATA from "../../config/config.jsx";
const Data = {
  business_types: [
    { id: 0, name: "New Business", value: "1", authLink: `${VITE_DATA}/tataaig/auth/details` },
    { id: 1, name: "Rollover", value: "3", authLink: `${VITE_DATA}/tataaig/auth/details` },
    { id: 3, name: "Used Vehicle", value: "4", authLink: `${VITE_DATA}/tataaig/auth/details`                                                                                                                                                                  },
  ],

  policyPlans: [
    { id: "01", name: "Standalone TP (1 year)" },
    { id: "02", name: "Package (1 year OD + 1 year TP)" },
    { id: "03", name: "Standalone TP (3 years)" },
    { id: "04", name: "Package (1 year OD + 3 years TP)" },
    { id: "05", name: "Standalone OD (1 year)" },
  ],

  customerTypes: [
    { id: "individual", value: "Individual", label: "Individual" },
    { id: "organisation", value: "Organisation", label: "Organisation" },
  ],
  policyTypes: [
    { id: "package", value: "Package", label: "Package" },
    { id: "liability", value: "Liability", label: "Liability" },
  ],

  paOwner: [
    {id: "yes", name: "Yes", value: true},
    {id: "no", name: "No", value: false}
  ],

  ownerTenure:[
    1,3
  ],
  
    titles: [
      "Adv",
      "Brig",
      "Capt",
      "Col",
      "Cust",
      "Dr",
      "Gen",
      "Hon",
      "Justice",
      "Lady",
      "Lt",
      "Maj",
      "Major",
      "Mast",
      "Md",
      "Mis",
      "Miss",
      "M/s.",
      "Mstr",
      "Mr",
      "Mrs",
      "Ms",
      "Mst",
      "Phd",
      "Prof",
      "Rev",
      "Shri",
      "Sist",
      "Wing Cdr",
      "Wing Commander"
    ],
  
    ncbvalues: [
      { id: "0", ncb: 0 },
      { id: "1", ncb: 20 },
      { id: "2", ncb: 25 },
      { id: "3", ncb: 40},
      { id: "4", ncb: 80},
      { id: "5", ncb: 100}
    ],

  GeneralInsurance: [
    {
      name: "tata_aig",
      image: "/c1Tata.png",
      links: "/login",
      categories: {
        motor: {
          "Pvt-Car": {
            new: {
              name: "New",
              authLink: `${VITE_DATA}/tataaig/auth/details`,
              quoteLink: "https://uatapigw.tataaig.com/motor/v1/quote",
              custType: ["Individual", "Organisation"],
            },
            rollover: {
              name: "Rollover",
              apiLink: "/api/tata_aig/pvt_car/rollover",
              custType: ["Individual", "Organisation"],
            },
            satp: {
              name: "SATP",
              apiLink: "/api/tata_aig/pvt_car/satp",
              custType: ["Individual", "Organisation"],
            },
          },

          "2 Wheeler": {
            new: { name: "New", apiLink: "/api/tata_aig/2_wheeler/new" },
            renewal: {
              name: "Renewal",
              apiLink: "/api/tata_aig/2_wheeler/renewal",
            },
            comprehensive: {
              name: "Comprehensive",
              apiLink: "/api/tata_aig/2_wheeler/comprehensive",
            },
          },

          "Commercial Vehicle": {
            new: {
              name: "New",
              apiLink: "/api/tata_aig/commercial_vehicle/new",
            },
            rollover: {
              name: "Rollover",
              apiLink: "/api/tata_aig/commercial_vehicle/rollover",
            },
            fleet: {
              name: "Fleet",
              apiLink: "/api/tata_aig/commercial_vehicle/fleet",
            },
          },
        },
        nonmotor: ["Travel", "Home", "Business", "Marine"],
        health: ["Health", "Family Health", "Employee Group"],
      },
    },

    {
      name: "magma_hdi",
      image: "/c2Magma.png",
      links: "",
      categories: {
        motor: {
          "Pvt-Car": {
            new: { name: "New", apiLink: "/api/magma_hdi/pvt_car/new" },
            rollover: {
              name: "Rollover",
              apiLink: "/api/magma_hdi/pvt_car/rollover",
            },
            satp: { name: "SATP", apiLink: "/api/magma_hdi/pvt_car/satp" },
          },

          "2 Wheeler": {
            new: { name: "New", apiLink: "/api/magma_hdi/2_wheeler/new" },
            renewal: {
              name: "Renewal",
              apiLink: "/api/magma_hdi/2_wheeler/renewal",
            },
            comprehensive: {
              name: "Comprehensive",
              apiLink: "/api/magma_hdi/2_wheeler/comprehensive",
            },
          },

          "Commercial Vehicle": {
            new: {
              name: "New",
              apiLink: "/api/magma_hdi/commercial_vehicle/new",
            },
            rollover: {
              name: "Rollover",
              apiLink: "/api/magma_hdi/commercial_vehicle/rollover",
            },
            fleet: {
              name: "Fleet",
              apiLink: "/api/magma_hdi/commercial_vehicle/fleet",
            },
          },
        },
        nonmotor: ["Travel", "Home", "Business", "Marine"],
        health: ["Health", "Family Health", "Employee Group"],
      },
    },

    {
      name: "bajaj_allianz",
      image: "/c3Allianz.png",
      links: "",
      categories: {
        motor: {
          "Pvt-Car": {
            new: { name: "New", apiLink: "/api/bajaj_allianz/pvt_car/new" },
            rollover: {
              name: "Rollover",
              apiLink: "/api/bajaj_allianz/pvt_car/rollover",
            },
            satp: { name: "SATP", apiLink: "/api/bajaj_allianz/pvt_car/satp" },
          },

          "2 Wheeler": {
            new: { name: "New", apiLink: "/api/bajaj_allianz/2_wheeler/new" },
            renewal: {
              name: "Renewal",
              apiLink: "/api/bajaj_allianz/2_wheeler/renewal",
            },
            comprehensive: {
              name: "Comprehensive",
              apiLink: "/api/bajaj_allianz/2_wheeler/comprehensive",
            },
          },

          "Commercial Vehicle": {
            new: {
              name: "New",
              apiLink: "/api/bajaj_allianz/commercial_vehicle/new",
            },
            rollover: {
              name: "Rollover",
              apiLink: "/api/bajaj_allianz/commercial_vehicle/rollover",
            },
            fleet: {
              name: "Fleet",
              apiLink: "/api/bajaj_allianz/commercial_vehicle/fleet",
            },
          },
        },
        nonmotor: ["Travel", "Home", "Business", "Marine"],
        health: ["Health", "Family Health", "Employee Group"],
      },
    },

    {
      name: "hdfc_ergo",
      image: "/c4Hdfc.png",
      links: "",
      categories: {
        motor: {
          "Pvt-Car": {
            new: { name: "New", apiLink: "/api/hdfc_ergo/pvt_car/new" },
            rollover: {
              name: "Rollover",
              apiLink: "/api/hdfc_ergo/pvt_car/rollover",
            },
            satp: { name: "SATP", apiLink: "/api/hdfc_ergo/pvt_car/satp" },
          },

          "2 Wheeler": {
            new: { name: "New", apiLink: "/api/hdfc_ergo/2_wheeler/new" },
            renewal: {
              name: "Renewal",
              apiLink: "/api/hdfc_ergo/2_wheeler/renewal",
            },
            comprehensive: {
              name: "Comprehensive",
              apiLink: "/api/hdfc_ergo/2_wheeler/comprehensive",
            },
          },

          "Commercial Vehicle": {
            new: {
              name: "New",
              apiLink: "/api/hdfc_ergo/commercial_vehicle/new",
            },
            rollover: {
              name: "Rollover",
              apiLink: "/api/hdfc_ergo/commercial_vehicle/rollover",
            },
            fleet: {
              name: "Fleet",
              apiLink: "/api/hdfc_ergo/commercial_vehicle/fleet",
            },
          },
        },
        nonmotor: ["Travel", "Home", "Business", "Marine"],
        health: ["Health", "Family Health", "Employee Group"],
      },
    },

    {
      name: "icici_lombard",
      image: "/c4Icici.png",
      links: "",
      categories: {
        motor: {
          "Pvt-Car": {
            new: { name: "New", apiLink: "/api/icici_lombard/pvt_car/new" },
            rollover: {
              name: "Rollover",
              apiLink: "/api/icici_lombard/pvt_car/rollover",
            },
            satp: { name: "SATP", apiLink: "/api/icici_lombard/pvt_car/satp" },
          },

          "2 Wheeler": {
            new: { name: "New", apiLink: "/api/icici_lombard/2_wheeler/new" },
            renewal: {
              name: "Renewal",
              apiLink: "/api/icici_lombard/2_wheeler/renewal",
            },
            comprehensive: {
              name: "Comprehensive",
              apiLink: "/api/icici_lombard/2_wheeler/comprehensive",
            },
          },

          "Commercial Vehicle": {
            new: {
              name: "New",
              apiLink: "/api/icici_lombard/commercial_vehicle/new",
            },
            rollover: {
              name: "Rollover",
              apiLink: "/api/icici_lombard/commercial_vehicle/rollover",
            },
            fleet: {
              name: "Fleet",
              apiLink: "/api/icici_lombard/commercial_vehicle/fleet",
            },
          },
        },
        nonmotor: ["Travel", "Home", "Business", "Marine"],
        health: ["Health", "Family Health", "Employee Group"],
      },
    },

    {
      name: "iffco_tokio",
      image: "/c6Iffico.png",
      links: "",
      categories: {
        motor: {
          "Pvt-Car": {
            new: { name: "New", apiLink: "/api/iffco_tokio/pvt_car/new" },
            rollover: {
              name: "Rollover",
              apiLink: "/api/iffco_tokio/pvt_car/rollover",
            },
            satp: { name: "SATP", apiLink: "/api/iffco_tokio/pvt_car/satp" },
          },

          "2 Wheeler": {
            new: { name: "New", apiLink: "/api/iffco_tokio/2_wheeler/new" },
            renewal: {
              name: "Renewal",
              apiLink: "/api/iffco_tokio/2_wheeler/renewal",
            },
            comprehensive: {
              name: "Comprehensive",
              apiLink: "/api/iffco_tokio/2_wheeler/comprehensive",
            },
          },

          "Commercial Vehicle": {
            new: {
              name: "New",
              apiLink: "/api/iffco_tokio/commercial_vehicle/new",
            },
            rollover: {
              name: "Rollover",
              apiLink: "/api/iffco_tokio/commercial_vehicle/rollover",
            },
            fleet: {
              name: "Fleet",
              apiLink: "/api/iffco_tokio/commercial_vehicle/fleet",
            },
          },
        },
        nonmotor: ["Travel", "Home", "Business", "Marine"],
        health: ["Health", "Family Health", "Employee Group"],
      },
    },
    {
      name: "future_generali",
      image: "/c7future.png",
      links: "",
      categories: {
        motor: {
          "Pvt-Car": {
            new: { name: "New", apiLink: "/api/future_generali/pvt_car/new" },
            rollover: {
              name: "Rollover",
              apiLink: "/api/future_generali/pvt_car/rollover",
            },
            satp: {
              name: "SATP",
              apiLink: "/api/future_generali/pvt_car/satp",
            },
          },

          "2 Wheeler": {
            new: { name: "New", apiLink: "/api/future_generali/2_wheeler/new" },
            renewal: {
              name: "Renewal",
              apiLink: "/api/future_generali/2_wheeler/renewal",
            },
            comprehensive: {
              name: "Comprehensive",
              apiLink: "/api/future_generali/2_wheeler/comprehensive",
            },
          },

          "Commercial Vehicle": {
            new: {
              name: "New",
              apiLink: "/api/future_generali/commercial_vehicle/new",
            },
            rollover: {
              name: "Rollover",
              apiLink: "/api/future_generali/commercial_vehicle/rollover",
            },
            fleet: {
              name: "Fleet",
              apiLink: "/api/future_generali/commercial_vehicle/fleet",
            },
          },
        },
        nonmotor: ["Travel", "Home", "Business", "Marine"],
        health: ["Health", "Family Health", "Employee Group"],
      },
    },
    {
      name: "liberty",
      image: "/c8Liberty.png",
      links: "",
      categories: {
        motor: {
          "Pvt-Car": {
            new: { name: "New", apiLink: "/api/liberty/pvt_car/new" },
            rollover: {
              name: "Rollover",
              apiLink: "/api/liberty/pvt_car/rollover",
            },
            satp: { name: "SATP", apiLink: "/api/liberty/pvt_car/satp" },
          },

          "2 Wheeler": {
            new: { name: "New", apiLink: "/api/liberty/2_wheeler/new" },
            renewal: {
              name: "Renewal",
              apiLink: "/api/liberty/2_wheeler/renewal",
            },
            comprehensive: {
              name: "Comprehensive",
              apiLink: "/api/liberty/2_wheeler/comprehensive",
            },
          },

          "Commercial Vehicle": {
            new: {
              name: "New",
              apiLink: "/api/liberty/commercial_vehicle/new",
            },
            rollover: {
              name: "Rollover",
              apiLink: "/api/liberty/commercial_vehicle/rollover",
            },
            fleet: {
              name: "Fleet",
              apiLink: "/api/liberty/commercial_vehicle/fleet",
            },
          },
        },
        nonmotor: ["Travel", "Home", "Business", "Marine"],
        health: ["Health", "Family Health", "Employee Group"],
      },
    },
  ],

  LifeInsurance: [
    // Add life insurance data here
    {
      name: "PNB MetLife",
      image: "/l1pnb.png",
      links:
        "https://www.pnbmetlife.com/wps/PA_CustomerLogin/jsp/UserRegistration.jsp",
    },
    {
      name: "LIC",
      image: "/l2lic.png",
      links: "https://ebiz.licindia.in/D2CPM/#Login",
    },
    {
      name: "TATA AIA",
      image: "/l3aia.png",
      links: "https://grip.tataaia.com/TVG/",
    },
  ],

  HealthInsurance: [
    // Add health insurance data here
    {
      name: "Health Guard",
      image: "https://example.com/images/health_guard.jpg",
      links: "",
    },
    {
      name: "Wellness Plan",
      image: "https://example.com/images/wellness_plan.jpg",
      links: "",
    },
  ],
};

export default Data;
