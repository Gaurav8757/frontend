// import { useState } from "react";
import HomeHeading from "../homeComponets/HomeHeading";
import HomeSection from "../homeComponets/HomeSection";
import Buyalso from "../homeComponets/Buyalso";
import SecondCarousel from "../homeComponets/SecondCarousel";
import HomeSection4 from "../homeComponets/HomeSection4";
import ThirdCarousel from "../homeComponets/ThirdCarousel";
import HomeSection5 from "../homeComponets/HomeSection5";
import HomeSection6 from "../homeComponets/HomeSection6";
import FourthCarousel from "../homeComponets/FourthCarousel";
import OurPartners from "../homeComponets/OurPartners";
// import Notice from "../notice/Notice";
let homesection = [
    {
      title: "Health",
      images: "/h.png",
      links: "/healthinsurance",
      subItems: [
        {
          subtitle: "Employee Group Health Insurance",
          image: "/group.png",
          link: "/grouphealthinsurance",
        },
        {
          subtitle: "Family Health Insurance",
          image: "/family.png",
          link: "/familyhealthinsurance",
        },
        // Add more subItems as needed
      ],
    },
    {
      title: "Motor",
      images: "/m.png",
      links: "/motorinsurance",
    },
    {
      title: "Non-Motor",
      images: "/nm.png",
      links: "/nonmotorinsurance",
    },
    {
        title: "Life ",
        images: "/li.png",
        links: "#",
      },
]

// buyalso
const buyalso = [{
    title: "Investment",
    name: "LIC Plans",
    image: "/al1.png",
},

{
    title: "Term Life",
    name: "Return of Premium",
    image: "/al2.png",
},

{
    title: "Term Life",
    name: "Life Insurance for Housewives",
    image: "/al3.png",
},
{
    title: "Health Insurance",
    name: "Day 1 Coverage",
    image: "/al4.png",
},

{
    title: "Health Insurance",
    name: "1 Cr Health Insurance",
    image: "/al5.png",
},

{
    title: "Health Insurance",
    name: "Unlimited Restoration of Cover",
    image: "/al6.png",
},

{
    title: "Business Insurance",
    name: "Marine Insurance",
    image: "/al7.png",
},

{
    title: "Business Insurance",
    name: "Professional Indemnity for Doctors",
    image: "/al8.png",
},

{
    title: "Business Insurance",
    name: "Directors & Officers Liability",
    image: "/al9.png",
},

{
    title: "Business Insurance",
    name: "Workmen Compensation",
    image: "/al10.png",
},

{
    title: "Others",
    name: "Pet Insurance",
    image: "/al11.png",
},
{
    title: "Commercial Insurance",
    name: "Commercial Insurance",
    image: "/al12.png",
},
]

const listOfInsurance = [
    {
        titles: "Personal Insurance",
        path: "#"
    },
    {
        titles: "Business Insurance",
        path: "#"
    }
];

const homesecondslider = [
    {
        img: "/mparivahan.png",
        link:"https://vahan.parivahan.gov.in/nrservices/faces/user/citizen/citizenlogin.xhtml"
    }, 
    {
        img: "/chalan.png",
        link:"https://echallan.parivahan.gov.in/index/accused-challan"
    },
 
    {
        img: "/carousel2.png",
        link:""
    },
    {
        img: "/carousel3.png",
        link:""
    }, 
    {
        img: "/carousel4.png",
        link:""
    },
    {
        img: "/carousel5.png",
        link:""
    }, 
    {
        img: "/carousel6.png",
        link:""
    }
]


const homethirdslider = [
    {
        img: "/b1.svg"
    }, 
    {
        img: "/b2.svg"
    },
    {
        img: "/b3.svg"
    }, 
    {
        img: "/b4.svg"
    }, 
    {
        img: "/b5.svg"
    }
]



const Health = [{
    img: "/h1.svg"
},{
    img: "/h3.svg"
},
{
    img: "/h2.svg"
}]


const general = [{
    img: "/1.png"
},{
    img: "/2.png"
},{
    img: "/3.png"
},
{
    img: "/4.png"
},
{
    img: "/5.png"
},{
    img: "/6.png"
},{
    img: "/7.png"
},{
    img: "/8.png"
},


]



const Home = () => {
   
    return (<>
        
        <HomeHeading/>
        {/* <Notice/> */}
        <HomeSection homesection={homesection} modal={listOfInsurance} homesecondslider={homesecondslider}/>
        
        <Buyalso buyalso={buyalso} />
        <SecondCarousel homesecondslider={homesecondslider} />
        <HomeSection4/>
        <ThirdCarousel homethirdslider={homethirdslider}/>
        <HomeSection5/>
        <HomeSection6/>
        <FourthCarousel/>
        <OurPartners general= {general} health = {Health}/>
        
    </>
    )
}

export default Home;