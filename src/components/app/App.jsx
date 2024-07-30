// import { useState } from "react";
import Footers from "../footer/Footers.jsx";
import Footer from "../footer/Footer2.jsx";
import PaymentFooter from "../footer/PaymentFooter.jsx";
import Navbar from "../navbar/Navbar.jsx";
import './App.css'
import { Outlet } from "react-router-dom"
function App() {
 
  const navigation = [
    { name: 'Home', to: '/', current: true },
    {
      name: 'About Us',
      to: '#',
      current: false,
      submenus: [
        { name: 'About Company', to: '/aboutus' },
        { name: 'Mission & Vision', to: '/vision' },
        { name: 'Director Message', to: '/messages' },
      ],
    },
    {
      name: 'Downloads',
      to: '#',
      current: false,
      submenus: [
        { name: 'Claim Form', to: '/claimform' },
        { name: 'Purposal', to: '/proposal' },
        { name: 'Brochure', to: '/brochures' },
        // Add more submenus as needed
      ],
    },
    {
      name: 'Claim',
      to: '#',
      current: false,
      submenus: [
        { name: 'Claim', to: '/serviceclaim' },
      ],
    },
    {
      name: 'Branch', to: '#', current: false, submenus: [
        { name: 'Branch', to: '/branch' },
        { name: 'Track Request', to: '/track-request' },
        // Add more submenus as needed
      ],
    },
    // { name: 'Complaint', to: '/complaintform', current: false },
    { name: 'Feedback', to: '/feedback', current: false },
    { name: 'Contact Us', to: '/contactus', current: false },
    { name: 'Careers', to: '/careers', current: false },
    
    
  ];


  return (
    <>
      <Navbar navigation = {navigation} />
      <Outlet/>
      <Footers/>
      <Footer footer = {navigation}/>
      <PaymentFooter/>
    </>
  )
}

export default App;
