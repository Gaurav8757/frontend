import { useState } from "react";
import { useLocation } from "react-router-dom";
function AllMotorInsurances() {
  // const { category } = useParams(); // Get the category from the URL
  const location = useLocation();
  const { subCategories, logos, insuranceName } = location.state || {}; // Get subCategories from state passed via navigate
  const [selectedOption, setSelectedOption] = useState("");
  const [menuItems, setMenuItems] = useState([]);

  const handleSelectChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedOption(selectedCategory);

    // Update menuItems based on the selected category
    if (subCategories && subCategories[selectedCategory]) {
      const items = Object.values(subCategories[selectedCategory]).map(
        (subCat) => subCat.name
      );
      setMenuItems(items);
    } else {
      setMenuItems([]);
    }
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-10">
      <div className="container mx-auto flex sm:justify-between  justify-evenly flex-wrap items-center p-2">
      
          {/* Logo */}
          <div className="text-xl  font-bold">
            {" "}
            <img
              className="md:w-20 md:h-20 w-12 h-12 shadow-inner shadow-gray-300"
              src={logos}
              alt={insuranceName}
            />
          </div>
          <div className="container-flex flex justify-center">

          {/* Select Menu */}
          {subCategories ? (
            <select
              value={selectedOption}
              onChange={handleSelectChange}
              className="block appearance-none my-auto bg-white  border-gray-300 py-2 ps-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option className="">Select Insurance</option>
              {Object.keys(subCategories).map((subCat, index) => (
                <option className="capitalize" key={index} value={subCat}>
                  {subCat}
                </option>
              ))}
            </select>
          ) : (
            <p>No Insurance Available.</p>
          )}
        </div>
        {/* Selected Menu List */}
        <div className="flex space-x-4">
          {menuItems.map((item, index) => (
            <div key={index} className="py-2 px-4 bg-gray-200 rounded">
              {item}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default AllMotorInsurances;
