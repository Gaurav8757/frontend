import HrDash from "./HrDash.jsx";
const DashboardHr = () => {
    return (
        <div className="p-0 sm:ml-64 h-screen bg-sky-200">
            <div className="p-4 rounded-lg ">
                {/* part 1 */}
                <HrDash />
            </div>
        </div>
    );
};

export default DashboardHr;