import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import MainHeader from './components/Header/MainHeader';
import Login from './components/Login/Login';
import Registration from './components/Login/Registration';
import AdminHeader from './components/Header/AdminHeader';
import AddState from './components/Location/AddState';
import ViewState from './components/Location/ViewState';
import AdminDashboard from './components/DashBoard/AdminDashBoard';
import AddCity from './components/Location/AddCity';
import PropertyCard from './components/PropertyDisplay/PropertyCard';
import PropertyDetailsDialog from './components/PropertyDisplay/PropertyDetailsDialog';
import UserDashboard from './components/DashBoard/UserDashBoard';
import SellProperty from './components/ListProperty/SellProperty';
import RentProperty from './components/ListProperty/RentProperty';
import OwnerListedProp from './components/PropertyDisplay/OwnerListedProp';
import ApprovedPropertyCard from './components/PropertyDisplay/ApprovedPropertyCard';
import PaymentComponent from './components/Payment/PaymentComponent';
import ProtectedRoute from './ProtectedRoute'; 
import Footer from './components/Footer/Footer';
import Logout from './components/Login/Logout';
import EditPropertyForm from './components/PropertyDisplay/EditPropertyForm ';
import BrokerForm from './components/Login/BrokerForm';
import BrokerTable from './components/Login/BrokerTable';
import AdminHome from './components/DashBoard/AdminHome';
import UserHome from './components/DashBoard/UserHome';
import AboutUs from './components/Header/AboutUs';
import ContactUs from './components/Header/ContactUs';
import EditProfile from './components/DashBoard/EditProfile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/mainheader" element={<MainHeader />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/footer" element={<Footer/>}/>
      <Route path="/logout" element={<Logout/>}/>
      <Route path="/aboutus" element={<AboutUs/>}/>
      <Route path="/contactus" element={<ContactUs/>}/>
      {/* Protected Routes */}
      <Route 
        path="/admin-dashboard" 
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute> 
        } 
      />
      <Route 
        path="/user-dashboard" 
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        } 
      />
      <Route path="/adminhome" element={<AdminHome/>}/>
      <Route path="/userhome" element={<UserHome/>}/>
      <Route path="/adminheader" element={<AdminHeader />} />
      <Route path="/broker" element={<BrokerForm/>}/>
      <Route path="/addstate" element={<AddState />} />
      <Route path="/viewstate" element={<ViewState />} />
      <Route path="/addcity" element={<AddCity />} />
      <Route path="/allproperty" element={<PropertyCard />} />
      <Route path="/propertydetails" element={<PropertyDetailsDialog />} />
      <Route path="/sellproperty" element={<SellProperty />} />
      <Route path="/rentproperty" element={<RentProperty />} />
      <Route path="/ownerlistedprop" element={<OwnerListedProp />} />
      <Route path="/approvedpropcard" element={<ApprovedPropertyCard />} />
      <Route path="/subscriptionpayment" element={<PaymentComponent />} />
      <Route path="/editproperty" element={<EditPropertyForm/>}/>
      <Route path="/brokerlist" element={<BrokerTable/>}/>
      <Route path="/editprofile" element={<EditProfile/>}/>
    </Routes>
  );
}

export default App;
