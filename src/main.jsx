import React from "react";
import ReactDOM from "react-dom/client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Companies from "./components/about/Companies.jsx";
import Feedback from "./components/feedback/Feedback.jsx";
import App from "./components/app/App.jsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./index.css";
import Home from "../src/components/home/Home.jsx";
import DirectorMessage from "./components/about/DirectorMessage.jsx";
import Mission from "./components/about/Mission.jsx";
import Brochure from "./components/downloads/Brochure.jsx";
import Proposal from "./components/downloads/Proposal.jsx";
import ClaimForm from "./components/downloads/ClaimForm.jsx";
import ServiceClaim from "./components/service-request/ServiceClaim.jsx";
import Branch from "./components/branch/Branch.jsx";
import TrackRequest from "./components/track-request/TrackRequest.jsx";
import ComplaintForm from "./components/complaint/ComplaintForm.jsx";
import ContactUs from "./components/contact/ContactUs.jsx";
import Dashboard from "./admin/admincomponents/Dashboard.jsx";
import AddBranch from "./admin/admincomponents/Branch/AddBranch.jsx";
import AddEmployee from "./HumanResources/Employee/AddEmployee.jsx";
import AddHRSalary from "./admin/admincomponents/Salary/HrSalary.jsx";
import GenerateSalary from "./HumanResources/GenerateSalary/GenerateSalary.jsx";
import Policy from "./admin/admincomponents/reports/Policy.jsx";
import AddPolicyDetails from "./admin/admincomponents/PolicyLists/AddPolicyDetails.jsx";
import Layout from "./admin/Layout.jsx";
import ViewBranch from "./admin/admincomponents/Branch/ViewBranch.jsx";
import UpdateBranch from "./admin/admincomponents/Branch/UpdateBranch.jsx";
import ViewEmployee from "./HumanResources/Employee/ViewEmployee.jsx";
import ViewHRSalary from "./admin/admincomponents/Salary/ViewHrSalary.jsx";
import UpdateHRSalary from "./admin/admincomponents/Salary/UpdateHrSalary.jsx";
import ViewPolicy from "./admin/admincomponents/PolicyLists/ViewPolicy.jsx";
import ViewGenSalary from "./HumanResources/GenerateSalary/ViewGenSalary.jsx";
import ProtectRoute from "./admin/Protected.jsx";
import BranchLayout from "./branches/BranchLayout.jsx";
import BranchDashboard from "./branches/BranchDash/BranchDashboard.jsx";
import BranchProtected from "./branches/BranchProtect.jsx";
import ViewClaim from "./admin/admincomponents/reports/ViewClaim.jsx";
import ViewComplaint from "./admin/admincomponents/reports/ViewComplaint.jsx";
import ViewContact from "./admin/admincomponents/reports/ViewContact.jsx";
import ViewFeedback from "./admin/admincomponents/reports/ViewFeedback.jsx";
import HealthInsurance from "./components/homeComponets/HealthInsurance.jsx";
import MotorInsurance from "./components/homeComponets/MotorInsurance.jsx";
import NonMotorInsurance from "./components/homeComponets/NonMotorInsurance.jsx";
import AddCompanies from "./admin/admincomponents/company/AddCompanies.jsx";
import ViewCompany from "./admin/admincomponents/company/ViewCompany.jsx";
import HealthPage from "../src/components/homeComponets/Health/HealthPage.jsx";
import MotorPage from "../src/components/homeComponets/Motor/MotorPage.jsx";
import NonMotorPage from "./components/homeComponets/Non_Motor/NonMotorPage.jsx";
import UserCarousel from "./admin/admincomponents/uploadCarousel/UserCarousel.jsx";
import ViewCarousel from "./admin/admincomponents/uploadCarousel/ViewCarousel.jsx";
import ViewUserFillCompany from "./admin/admincomponents/reports/ViewUserFillCompany.jsx";
import FamilyHealthPage from "./components/homeComponets/Health/FamilyHealthPage.jsx";
import EmpHealthPage from "./components/homeComponets/Health/EmpHealthPage.jsx";
import TwoWheeler from "./components/homeComponets/Motor/TwoWheeler.jsx";
import CommercialVehicle from "./components/homeComponets/Motor/CommercialVehicle.jsx";
import HomeInsPage from "./components/homeComponets/Non_Motor/HomeInsPage.jsx";
import BusinessInsPage from "./components/homeComponets/Non_Motor/BusinessInsPage.jsx";
import MarineInsPage from "./components/homeComponets/Non_Motor/MarineInsPage.jsx";
import ChallanView from "./components/homeComponets/viewChallan/ChallanView.jsx";
import Careers from "./components/careers/Careers.jsx";
import MasterForm from "./admin/admincomponents/MasterForm/MasterForm.jsx";
import ViewMasterForm from "./admin/admincomponents/MasterForm/ViewMasterForm.jsx";
import MasterView from "./branches/showInsuranceData/MasterView.jsx";
import ProtectedAdvisor from "./advisor/Dashboard/ProtectedAdvisor.jsx";
import InsuranceLists from "./advisor/showInsurance/InsuranceLists.jsx";
import LayoutAdvisor from "./advisor/LayoutAdvisor.jsx";
import AddAdvisor from "./admin/admincomponents/Advisor/AddAdvisor.jsx";
import ViewAdvisor from "./admin/admincomponents/Advisor/ViewAdvisor.jsx";
import UpdateAdvisor from "./admin/admincomponents/Advisor/UpdateAdvisor.jsx";
import HomepageAdvisor from "./advisor/Home/HomepageAdvisor.jsx";
import ForgotPassword from "./advisor/ForgotPassword.jsx";
import ForgetPassBranch from "./branches/ForgetPassBranch.jsx";
import UpdateEmployee from "./HumanResources/Employee/UpdateEmployee.jsx";
import UpdateGenSalary from "./HumanResources/GenerateSalary/UpdateGenSalary.jsx";
import ProtectedEmp from "./Employee/ProtectedEmp.jsx";
import LayoutEmp from "./Employee/LayoutEmp.jsx";
import ForgotEmpPassword from "./Employee/ForgotEmpPassword.jsx";
import ProtectedHr from "./HumanResources/ProtectedHr.jsx";
import LayoutHr from "./HumanResources/LayoutHr.jsx";
import AddHr from "./admin/admincomponents/Hr/AddHr.jsx";
import ViewHr from "./admin/admincomponents/Hr/ViewHr.jsx";
import DashboardHr from "./HumanResources/dashboard/DashboardHr.jsx";
import AddSalary from "./HumanResources/Salary/AddSalary.jsx";
import ViewSalary from "./HumanResources/Salary/ViewSalary.jsx";
import UpdateSalary from "./HumanResources/Salary/UpdateSalary.jsx";
import GenerateHrSalary from "./admin/admincomponents/GenerateSalary/GenerateSalary.jsx";
import ViewGenHrSalary from "./admin/admincomponents/GenerateSalary/ViewGenSalary.jsx";
import UpdateGenHrSalary from "./admin/admincomponents/Salary/UpdateHrSalary.jsx";
import HrAttendance from "./HumanResources/attendance/HrAttendance.jsx";
import AddHrAttendance from "./HumanResources/attendance/AddHrAttendance.jsx";
import EmpAttendance from "./Employee/attendance/EmpAttendance.jsx";
import DashboardEmp from "./Employee/Dashboard/DashboardEmp.jsx";
import AddAttendance from "./Employee/attendance/AddAttendance.jsx";
import ViewHrAttendace from "./admin/admincomponents/Hr/ViewHrAttendace.jsx";
import EmpAttendanceModal from "./HumanResources/Employee/EmpAttendanceModal.jsx";
import EmpCalendar from "./HumanResources/Employee/EmpCalendar.jsx";
import AddDataByBranch from "./branches/AddDetails/AddDataByBranch.jsx";
import OperationHead from "./admin/admincomponents/operationHead/OperationHead.jsx";
// import TeamLead from "./admin/admincomponents/Teams/TeamLead.jsx";
import StaffType from "./admin/admincomponents/stafftype/StaffType.jsx";
// import ListStaffType from "./admin/admincomponents/stafftype/ListStaffType.jsx";
import EmpPolicy from "./Employee/policy/EmpPolicy.jsx";
import ForgetPassOps from "./opsAdmin/ForgetPassOps.jsx";
import ProtectOps from "./opsAdmin/ProtectOps.jsx";
import LayoutOps from "./opsAdmin/LayoutOps.jsx";
import DashboardOps from "./opsAdmin/OPSDashboard/DashboardOps.jsx";
import AllOpsDetails from "./opsAdmin/AllOpsDetails/AllOpsDetails.jsx";
import LoginAll from "./Login/LoginAll.jsx";
import AdminForgot from "./admin/AdminForgot.jsx";
import AdpassUpdate from "./admin/AdpassUpdate.jsx";
import BrpassUpdate from "./branches/BrpassUpdate.jsx";
import OpspassUpdate from "./opsAdmin/OpspassUpdate.jsx";
import EmpPassUpdate from "./Employee/EmpPassUpdate.jsx";
import HrForgetAdmin from "./HumanResources/HrForgetAdmin.jsx";
import HrPassUpdate from "./HumanResources/HrPassUpdate.jsx";
import AddPolicyType from "./admin/admincomponents/PolicyType/AddPolicyType.jsx";
import AddProductType from "./admin/admincomponents/PolicyType/AddProductType.jsx";
import ProfileUpdate from "./Employee/updateProfile/ProfileUpdate.jsx";
import ForgetFinance from "./finance/ForgetFinance.jsx";
import ProtectFinance from "./finance/ProtectFinance.jsx";
import LayoutFinance from "./finance/LayoutFinance.jsx";
import DashboardFinance from "./finance/DashboardFinance/DashboardFinance.jsx";
import CompanyType from "./admin/admincomponents/companyType/CompanyType.jsx";
import CategoryType from "./admin/admincomponents/companyType/CategoryType.jsx";
import AddSegment from "./admin/admincomponents/Segment/AddSegment.jsx";
import AddFuel from "./admin/admincomponents/Fuel/AddFuel.jsx";
import AddPayoutOn from "./admin/admincomponents/PayoutOn/AddPayoutOn.jsx";
import AddPaymentMode from "./admin/admincomponents/PaymentMode/AddPaymentMode.jsx";
import ReportEmp from "./HumanResources/attendanceReport/ReportEmp.jsx";
import FinPassUpdate from "./finance/FinPassUpdate.jsx";
import HolidayAdd from "./admin/admincomponents/holiday/HolidayAdd.jsx";
import CurrentAttendance from "./HumanResources/attendanceReport/CurrentAttendance.jsx";
import AddFinance from "./finance/FinanceData/AddFinance.jsx";
import ViewFinance from "./finance/FinanceData/ViewFinance.jsx";
import SalarySlip from "./HumanResources/GenerateSalary/SalarySlip.jsx";
import OffersLetter from "./HumanResources/Letters/offers/OffersLetter.jsx";
import ResignationLetter from "./HumanResources/resign/ResignationLetter.jsx";
import TerminationLetter from "./HumanResources/Letters/termination/TerminationLetter.jsx";
import IncrementLetter from "./HumanResources/Letters/increment/IncrementLetter.jsx";
import JoiningLetter from "./HumanResources/Letters/joining/JoiningLetter.jsx";
// import LeaveApplication from "./Employee/LeaveApplication/LeaveApplication.jsx";
import AddPolicy from "./opsAdmin/AddPolicyByOPS/AddPolicy.jsx";
import AddOfferLetter from "./HumanResources/Letters/offers/AddOfferLetter.jsx";
import ViewOfferLetter from "./HumanResources/Letters/offers/ViewOfferLetter.jsx";
import AddJoining from "./HumanResources/Letters/joining/AddJoining.jsx";
import ViewJoining from "./HumanResources/Letters/joining/ViewJoining.jsx";
import AddIncrement from "./HumanResources/Letters/increment/AddIncrement.jsx";
import ViewIncrement from "./HumanResources/Letters/increment/ViewIncrement.jsx";
import ProtectedHrAdmin from "./HRAdmin/ProtectedHr.jsx";
import LayoutHrAdmin from "./HRAdmin/LayoutHrAdmin.jsx";
import DashHrAdmin from "./HRAdmin/DashHrAdmin.jsx";
import AddTerminator from "./HumanResources/Letters/termination/AddTerminator.jsx";
import ViewTerminate from "./HumanResources/Letters/termination/ViewTerminate.jsx";
import LeaveApproval from "./HumanResources/LeaveApproval/LeaveApproval.jsx";
import CommercialVehicles from "./branches/CommissionSlab/CommercialVehicles.jsx";
import PrivateCar from "./branches/CommissionSlab/PrivateCar.jsx";
import TwoWheelers from "./branches/CommissionSlab/TwoWheelers.jsx";
import CvLists from "./branches/ListsCommissionSlab/CvLists.jsx";
import PCLists from "./branches/ListsCommissionSlab/PCLists.jsx";
import TwLists from "./branches/ListsCommissionSlab/TwLists.jsx";
import CompanySlab from "./branches/CommissionSlab/CompanySlab.jsx";
import AddAdvisors from "./advisor/RegisterAdvisor/AddAdvisors.jsx";
import ListAdvisor from "./advisor/ShowListAdvisor/ListAdvisor.jsx";
import OdDiscount from "./admin/admincomponents/odDiscount/OdDiscount.jsx";
import Cc from "./admin/admincomponents/CC/Cc.jsx";
import SitCapacity from "./admin/admincomponents/SittingCapacity/SitCapacity.jsx";
import NcbData from "./admin/admincomponents/NCB/NcbData.jsx";
import Ledger1 from "./admin/admincomponents/Ledger/Ledger1.jsx";
import Ledger2 from "./admin/admincomponents/Ledger/Ledger2.jsx";
import Ledger3 from "./admin/admincomponents/Ledger/Ledger3.jsx";
import LeaveBalance from "./HumanResources/LeaveBalance/LeaveBalance.jsx";
import PayoutView from "./advisor/payout/PayoutView.jsx";
import DailyViewLeger from "./branches/ViewLeger/DailyViewLeger.jsx";
import MonthViewLeger from "./branches/ViewLeger/MonthViewLeger.jsx";
import UpdateMaster from "./admin/admincomponents/MasterForm/UpdateMaster.jsx";
import ListOfLeave from "./Employee/attendance/ListOfLeave.jsx";
import CareersView from "./admin/admincomponents/Careers/CareersView.jsx";
import ViewSal from "./Employee/viewSalary/ViewSal.jsx";
import ForgetCIC from "./claim&indosrhment/ForgetPassCIC.jsx";
import ForgetPassCIC from "./claim&indosrhment/ForgetPassCIC.jsx";
import ProtectCIC from "./claim&indosrhment/sidebar/ProtectCIC.jsx";
import LayoutCIC from "./claim&indosrhment/sidebar/LayoutCIC.jsx";
// import DashboardCIC from "./claim&indosrhment/dashboard/DashboardCIC.jsx";
import Claim from "./claim&indosrhment/allform/claim/Claim.jsx";
import Indorshment from "./claim&indosrhment/allform/indosh/Indorshment.jsx";
import Cancelation from "./claim&indosrhment/allform/cancelation/Cancelation.jsx";
import ViewClaimed from "./claim&indosrhment/allform/claim/ViewClaimed.jsx";
import ViewIndorsh from "./claim&indosrhment/allform/indosh/ViewIndorsh.jsx";
import ViewCancelation from "./claim&indosrhment/allform/cancelation/ViewCancelation.jsx";
import SubCompName from "./branches/aigtata/SubCompName.jsx";
import BranchClaimList from "./branches/cic/BranchClaimList.jsx";
import BranchIndorshment from "./branches/cic/BranchIndorshment.jsx";
import BranchCancelation from "./branches/cic/BranchCancelation.jsx";
import VisitDaily from "./Employee/DailyVisitReport/VisitDaily.jsx";
import ViewDailyVisit from "./Employee/DailyVisitReport/ViewDailyVisit.jsx";
import VisitReport from "./admin/admincomponents/VisitReport/VisitReport.jsx";
import Dvr from "./branches/DVR/Dvr.jsx";
import ReconAdvisor from "./admin/admincomponents/MasterForm/ReconAdvisor/ReconAdvisor.jsx";
import AllCompanyName from "./advisor/API/Companies/AllCompanyName.jsx";
import AllMotorInsurances from "./advisor/Motor/AllMotorInsurances.jsx";
import AdvResetPassword from "./advisor/AdvResetPassword.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />}>
        {/* home */}
        <Route path="" element={<Home />} />
        {/* health insurance */}
        <Route path="/healthinsurance" element={<HealthInsurance />} />
        <Route path="/healthinsurance/health" element={<HealthPage />} />
        <Route path="/healthinsurance/health2" element={<FamilyHealthPage />} />
        <Route path="/healthinsurance/health3" element={<EmpHealthPage />} />

        {/* motor */}
        <Route path="/motorinsurance" element={<MotorInsurance />} />
        <Route path="/motorinsurance/car" element={<MotorPage />} />
        <Route path="/motorinsurance/twowheeler" element={<TwoWheeler />} />
        <Route
          path="/motorinsurance/commervehicle"
          element={<CommercialVehicle />}
        />

        {/* non-motor */}
        <Route path="/nonmotorinsurance" element={<NonMotorInsurance />} />
        <Route path="/nonmotorinsurance/travelins" element={<NonMotorPage />} />
        <Route path="/nonmotorinsurance/homeins" element={<HomeInsPage />} />
        <Route
          path="/nonmotorinsurance/businessins"
          element={<BusinessInsPage />}
        />
        <Route
          path="/nonmotorinsurance/marineins"
          element={<MarineInsPage />}
        />

        {/* about us */}
        <Route path="/aboutus" element={<Companies />} />
        <Route path="/vision" element={<Mission />} />
        <Route path="/messages" element={<DirectorMessage />} />
        {/* downloads */}
        <Route path="/claimform" element={<ClaimForm />} />
        <Route path="/proposal" element={<Proposal />} />
        <Route path="/brochures" element={<Brochure />} />
        {/* SERVICE */}
        <Route path="/serviceclaim" element={<ServiceClaim />} />
        {/* Branch */}
        <Route path="/branch" element={<Branch />} />
        {/* complaint */}
        <Route path="/complaintform" element={<ComplaintForm />} />
        {/* Contact us */}
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/track-request" element={<TrackRequest />} />
        {/* challans */}
        <Route path="/challans" element={<ChallanView />} />
      </Route>

      {/* all departments can login from here */}
      <Route path="/login" element={<LoginAll />} />

      {/* admin routes */}
      <Route path="/admin" element={<LoginAll />} />
      <Route path="/admin/forget" element={<AdminForgot />} />
      <Route
        path="/reset/password/admin/:adminId/:token"
        element={<AdpassUpdate />}
      />
      <Route element={<ProtectRoute />}>
        <Route path="/dashboard" element={<Layout />}>
          <Route path="" element={<Dashboard />} />
          <Route path="/dashboard/addcompanies" element={<AddCompanies />} />
          <Route path="/dashboard/viewcompanies" element={<ViewCompany />} />
          <Route path="/dashboard/addbranch" element={<AddBranch />} />
          <Route path="/dashboard/viewbranch" element={<ViewBranch />} />
          <Route path="/dashboard/updatebranch" element={<UpdateBranch />} />
          <Route path="/dashboard/addhr" element={<AddHr />} />
          <Route path="/dashboard/viewhr" element={<ViewHr />} />
          <Route path="/dashboard/addhrsalary" element={<AddHRSalary />} />
          <Route path="/dashboard/viewhrsalary" element={<ViewHRSalary />} />
          <Route
            path="/dashboard/updatehrsalary"
            element={<UpdateHRSalary />}
          />
          <Route
            path="/dashboard/generate/salary"
            element={<GenerateHrSalary />}
          />
          <Route
            path="/dashboard/update/gensalary"
            element={<UpdateGenHrSalary />}
          />
          <Route
            path="/dashboard/view/generatesalary"
            element={<ViewGenHrSalary />}
          />
          <Route
            path="/dashboard/view/attendance"
            element={<ViewHrAttendace />}
          />
          <Route path="/dashboard/policy" element={<Policy />} />
          <Route path="/dashboard/addpolicy" element={<AddPolicyDetails />} />
          <Route path="/dashboard/viewpolicy" element={<ViewPolicy />} />
          <Route path="/dashboard/viewclaim" element={<ViewClaim />} />
          <Route path="/dashboard/viewcomplaint" element={<ViewComplaint />} />
          <Route path="/dashboard/viewfeedback" element={<ViewFeedback />} />
          <Route path="/dashboard/viewcontact" element={<ViewContact />} />
          <Route path="/dashboard/addcarousel" element={<UserCarousel />} />
          <Route
            path="/dashboard/firstview/carousel"
            element={<ViewCarousel />}
          />
          <Route
            path="/dashboard/viewfilledform"
            element={<ViewUserFillCompany />}
          />
          <Route path="/dashboard/masterform" element={<MasterForm />} />

          <Route
            path="/dashboard/viewmasterform"
            element={<ViewMasterForm />}
          />
          <Route path="/dashboard/addAdvisor" element={<AddAdvisor />} />
          <Route path="/dashboard/viewadvisor" element={<ViewAdvisor />} />
          <Route path="/dashboard/updateadvisor" element={<UpdateAdvisor />} />
          <Route path="/dashboard/operation/head" element={<OperationHead />} />
          {/* <Route path="/dashboard/team/operation" element={<TeamLead />} /> */}
          <Route path="/dashboard/staff/type" element={<StaffType />} />
          {/* <Route path="/dashboard/staff/lists" element={<ListStaffType />} /> */}
          <Route path="/dashboard/policy/type" element={<AddPolicyType />} />
          <Route path="/dashboard/policy/lists" element={<AddProductType />} />
          <Route path="/dashboard/company/type" element={<CompanyType />} />
          <Route path="/dashboard/company/lists" element={<CategoryType />} />
          <Route path="/dashboard/segment/add" element={<AddSegment />} />
          <Route path="/dashboard/fuel/type" element={<AddFuel />} />
          <Route path="/dashboard/payout/type" element={<AddPayoutOn />} />
          <Route path="/dashboard/payment/type" element={<AddPaymentMode />} />
          <Route path="/dashboard/holiday/add" element={<HolidayAdd />} />
          <Route
            path="/dashboard/commvehicle"
            element={<CommercialVehicles />}
          />
          <Route path="/dashboard/payout/slab" element={<PrivateCar />} />
          <Route path="/dashboard/advisor/slabs" element={<CompanySlab />} />
          <Route path="/dashboard/payout/lists" element={<PCLists />} />
          <Route path="/dashboard/advisor/payout/lists" element={<TwLists />} />
          <Route path="/dashboard/oddiscount" element={<OdDiscount />} />
          <Route path="/dashboard/CC" element={<Cc />} />
          <Route path="/dashboard/ncb" element={<NcbData />} />
          <Route path="/dashboard/sit/capacity" element={<SitCapacity />} />
          <Route path="/dashboard/ledger1" element={<Ledger1 />} />
          <Route path="/dashboard/ledger2" element={<Ledger2 />} />
          <Route path="/dashboard/ledger3" element={<Ledger3 />} />
          <Route
            path="/dashboard/updatemasterform"
            element={<UpdateMaster />}
          />
          <Route path="/dashboard/career/view/list" element={<CareersView />} />
          <Route path="/dashboard/cic/claim" element={<ViewClaimed />} />
          <Route path="/dashboard/cic/indorshment" element={<ViewIndorsh />} />
          <Route
            path="/dashboard/cic/cancelation"
            element={<ViewCancelation />}
          />
          <Route
            path="/dashboard/daily/visits/view"
            element={<VisitReport />}
          />
          <Route path="/dashboard/recon/adv/advis" element={<ReconAdvisor />} />
        </Route>
      </Route>

      {/* BRANCHES ROUTES */}
      <Route path="/branches" element={<LoginAll />} />
      <Route path="/branches/forget" element={<ForgetPassBranch />} />
      <Route
        path="/reset/password/branch/:userId/:token"
        element={<BrpassUpdate />}
      />
      <Route element={<BranchProtected />}>
        <Route path="/branches/home" element={<BranchLayout />}>
          <Route path="/branches/home" element={<BranchDashboard />} />
          <Route path="/branches/home/tataaig" element={<SubCompName />} />
          <Route
            path="/branches/home/add/policy"
            element={<AddDataByBranch />}
          />
          <Route path="/branches/home/viewinsurance" element={<MasterView />} />
          <Route
            path="/branches/home/commvehicle"
            element={<CommercialVehicles />}
          />
          <Route path="/branches/home/pvtvehicle" element={<PrivateCar />} />
          <Route path="/branches/home/payout" element={<TwoWheelers />} />
          {/* advisor register/add new */}
          <Route
            path="/branches/home/advisor/register"
            element={<AddAdvisors />}
          />
          <Route
            path="/branches/home/advisor/lists"
            element={<ListAdvisor />}
          />
          <Route
            path="/branches/home/commvehicle/lists"
            element={<CvLists />}
          />
          <Route path="/branches/home/advisor/grids" element={<PCLists />} />
          <Route path="/branches/home/payout/lists" element={<TwLists />} />
          <Route
            path="/branches/home/daily/leger"
            element={<DailyViewLeger />}
          />
          <Route
            path="/branches/home/monthly/leger"
            element={<MonthViewLeger />}
          />
          <Route
            path="/branches/home/claim/lists"
            element={<BranchClaimList />}
          />
          <Route
            path="/branches/home/indorsh/lists"
            element={<BranchIndorshment />}
          />
          <Route
            path="/branches/home/cncl/lists"
            element={<BranchCancelation />}
          />
          <Route path="/branches/home/daily/visits" element={<Dvr />} />
        </Route>
      </Route>

      {/* Advisor Routes */}

      <Route path="/advisor" element={<LoginAll />} />
      <Route path="/advisor/forget" element={<ForgotPassword />} />
      <Route
        path="/reset/password/advisor/:advId/:token"
        element={<AdvResetPassword />}
      />
      <Route element={<ProtectedAdvisor />}>
        <Route path="/advisor/home" element={<LayoutAdvisor />}>
          <Route path="/advisor/home" element={<HomepageAdvisor />} />
          <Route path="/advisor/home/insurance" element={<AllCompanyName />} />
          <Route
            path="/advisor/home/viewinsurance"
            element={<InsuranceLists />}
          />
          <Route path="/advisor/home/payout/view" element={<PayoutView />} />
        </Route>
        {/* apis calls */}
        <Route
          path="/advisor/:insuranceName/:category"
          element={<AllMotorInsurances />}
        />
      </Route>

      {/* Employee Routes */}
      <Route path="/employee" element={<LoginAll />} />
      <Route path="/employee/forget" element={<ForgotEmpPassword />} />
      <Route
        path="/reset/password/emp/:empsId/:token"
        element={<EmpPassUpdate />}
      />
      <Route element={<ProtectedEmp />}>
        <Route path="/employee/home" element={<LayoutEmp />}>
          <Route path="" element={<DashboardEmp />} />
          <Route path="/employee/home/profile" element={<ProfileUpdate />} />
          <Route
            path="/employee/home/add/attendance"
            element={<AddAttendance />}
          />
          <Route path="/employee/home/attendance" element={<EmpAttendance />} />
          <Route path="/employee/home/policy" element={<EmpPolicy />} />
          <Route path="/employee/home/lists" element={<ListOfLeave />} />
          <Route path="/employee/home/monthly/salary" element={<ViewSal />} />
          <Route
            path="/employee/home/daily/visits/add"
            element={<VisitDaily />}
          />
          <Route
            path="/employee/home/daily/visits/view"
            element={<ViewDailyVisit />}
          />
        </Route>
      </Route>

      {/* HR Routes */}
      <Route path="/hr" element={<LoginAll />} />
      <Route path="/hradmin/forget" element={<HrForgetAdmin />} />
      <Route
        path="/reset/password/hradmin/:hradId/:token"
        element={<HrPassUpdate />}
      />
      <Route element={<ProtectedHr />}>
        <Route path="/hr/home" element={<LayoutHr />}>
          <Route path="" element={<DashboardHr />} />
          <Route path="/hr/home/addemployee" element={<AddEmployee />} />
          <Route path="/hr/home/viewemployee" element={<ViewEmployee />} />
          <Route
            path="/hr/home/emp/modal/attendance"
            element={<EmpAttendanceModal />}
          />
          <Route path="/hr/home/updateemployee" element={<UpdateEmployee />} />
          <Route path="/hr/home/emp/attendance" element={<EmpCalendar />} />
          <Route path="/hr/home/addsalary" element={<AddSalary />} />
          <Route path="/hr/home/viewsalary" element={<ViewSalary />} />
          <Route path="/hr/home/updatesalary" element={<UpdateSalary />} />
          <Route path="/hr/home/generate/salary" element={<GenerateSalary />} />
          <Route
            path="/hr/home/update/gensalary"
            element={<UpdateGenSalary />}
          />
          <Route
            path="/hr/home/view/generate/salary"
            element={<ViewGenSalary />}
          />
          <Route path="/hr/home/attendance" element={<HrAttendance />} />
          <Route path="/hr/home/add/attendance" element={<AddHrAttendance />} />
          <Route path="/hr/home/attendance/report" element={<ReportEmp />} />
          <Route
            path="/hr/home/attendance/current/date"
            element={<CurrentAttendance />}
          />
          <Route path="/hr/home/salary/slip" element={<SalarySlip />} />
          <Route
            path="/hr/home/add/offer/letter"
            element={<AddOfferLetter />}
          />
          <Route
            path="/hr/home/view/offer/letter"
            element={<ViewOfferLetter />}
          />
          <Route path="/hr/home/offer/letters" element={<OffersLetter />} />
          <Route
            path="/hr/home/resign/letter"
            element={<ResignationLetter />}
          />
          <Route
            path="/hr/home/add/terminate/letter"
            element={<AddTerminator />}
          ></Route>
          <Route
            path="/hr/home/view/terminate/letter"
            element={<ViewTerminate />}
          ></Route>
          <Route
            path="/hr/home/terminate/letter"
            element={<TerminationLetter />}
          />
          <Route
            path="/hr/home/add/increment/letter"
            element={<AddIncrement />}
          />
          <Route
            path="/hr/home/view/increment/letter"
            element={<ViewIncrement />}
          />
          <Route
            path="/hr/home/increment/letter"
            element={<IncrementLetter />}
          />
          <Route path="/hr/home/add/joining/letter" element={<AddJoining />} />
          <Route
            path="/hr/home/view/joining/letter"
            element={<ViewJoining />}
          />
          <Route path="/hr/home/joining/letter" element={<JoiningLetter />} />
          <Route path="/hr/home/leave/approval" element={<LeaveApproval />} />
          <Route path="/hr/home/leave/balance" element={<LeaveBalance />} />
          {/* <Route path="/hr/home/attendance" element={<EmpAttendance/>} /> */}
        </Route>
      </Route>

      <Route path="/hr/admin" element={<LoginAll />} />
      <Route element={<ProtectedHrAdmin />}>
        <Route path="/admin/hr/home" element={<LayoutHrAdmin />}>
          <Route path="" element={<DashHrAdmin />} />
        </Route>
      </Route>

      {/* OPSAdmin */}
      <Route path="/ops" element={<LoginAll />} />
      <Route path="/ops/forget" element={<ForgetPassOps />} />
      <Route
        path="/reset/password/ops/:opsId/:token"
        element={<OpspassUpdate />}
      />
      <Route element={<ProtectOps />}>
        <Route path="/ops/home" element={<LayoutOps />}>
          <Route path="" element={<DashboardOps />} />
          <Route path="/ops/home/add/policy" element={<AddPolicy />} />
          <Route path="/ops/home/policy" element={<AllOpsDetails />} />
        </Route>
      </Route>

      <Route path="/finance" element={<LoginAll />} />
      <Route path="/finance/forget" element={<ForgetFinance />} />
      <Route
        path="/reset/password/finance/:fId/:token"
        element={<FinPassUpdate />}
      />
      <Route element={<ProtectFinance />}>
        <Route path="/finance/home" element={<LayoutFinance />}>
          <Route path="" element={<DashboardFinance />} />
          <Route path="/finance/home/new" element={<AddFinance />} />
          <Route path="/finance/home/view" element={<ViewFinance />} />
          {/* <Route path="/finance/home/update" element={<UpdateFinance />} /> */}
          <Route path="/finance/home/daily/leger" element={<Ledger1 />} />
          <Route path="/finance/home/monthly/leger" element={<Ledger2 />} />
          <Route path="/finance/home/company/leger" element={<Ledger3 />} />
        </Route>
      </Route>

      {/* CLAIM/INDOSRSHMENT/CANCEL */}
      <Route path="/cic" element={<LoginAll />} />
      <Route path="/cic/forget" element={<ForgetCIC />} />
      <Route
        path="/reset/password/cic/:cId/:token"
        element={<ForgetPassCIC />}
      />
      <Route element={<ProtectCIC />}>
        <Route path="/cic/home" element={<LayoutCIC />}>
          {/* <Route path="" element={<DashboardCIC/>} /> */}
          <Route path="/cic/home" element={<Claim />} />
          <Route path="/cic/home/claims/view" element={<ViewClaimed />} />
          <Route path="/cic/home/indorsh" element={<Indorshment />} />
          <Route path="/cic/home/indorsh/view" element={<ViewIndorsh />} />
          <Route path="/cic/home/cancelation" element={<Cancelation />} />
          <Route
            path="/cic/home/cancelation/view"
            element={<ViewCancelation />}
          />
        </Route>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer
      position="top-right"
      autoClose={2000}
      limit={9}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      theme="colored"
    />
  </React.StrictMode>
);
