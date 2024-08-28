import Marquee from "react-fast-marquee";

function Notice() {
  return (
    <div className="py-10 bg-red-200">
    <p className="disabled"> 
    <Marquee speed={110} pauseOnHover={true} >
    Hello Gaurav! Similarly, there are methods for getting the current day of the month and the current month || 
    </Marquee>
    
    </p>
    </div>
  )
}

export default Notice;