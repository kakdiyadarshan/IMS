import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/src/sweetalert2.scss'
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import Role from './pages/Role';
import Branch from './pages/Branch';
import Course from './pages/Course';
import Reference from './pages/Reference';
import Status from './pages/Status';
import Adminuser from './pages/Adminuser';  
import ViewUser from './pages/Viewuser';
import Inquiry from './pages/Inquiry';
import Viewinquiry from './pages/Viewinquiry';
import PrivateRoutes from './components/PrivateRoutes';
import PublicRoute from './components/PublicRoute';

function App() {
  return (
    <div className="App">

        <Routes>
          <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
          
            <Route path="/home" element={<PrivateRoutes><Sidebar> <Home /> </Sidebar></PrivateRoutes>} />
            <Route path="/role" element={<PrivateRoutes><Sidebar> <Role /> </Sidebar></PrivateRoutes>} />
            <Route path="/branch" element={<PrivateRoutes><Sidebar> <Branch /> </Sidebar></PrivateRoutes>} />
            <Route path="/course" element={<PrivateRoutes><Sidebar> <Course /> </Sidebar></PrivateRoutes>} />
            <Route path="/reference" element={<PrivateRoutes><Sidebar> <Reference /> </Sidebar></PrivateRoutes>} />
            <Route path="/status" element={<PrivateRoutes><Sidebar> <Status /> </Sidebar></PrivateRoutes>} />
            <Route path="/addadminuser" element={<PrivateRoutes><Sidebar> <Adminuser /> </Sidebar></PrivateRoutes>} />
            <Route path="/viewuser" element={<PrivateRoutes><Sidebar> <ViewUser /> </Sidebar></PrivateRoutes>} />
            <Route path="/addinquiry" element={<PrivateRoutes><Sidebar> <Inquiry /> </Sidebar></PrivateRoutes>} />
            <Route path="/viewinquiry" element={<PrivateRoutes><Sidebar> <Viewinquiry /> </Sidebar></PrivateRoutes>} />
        </Routes>

    </div>
  );
}

export default App;
