import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import AuthLayout from './layouts/AuthLayout';
import AdminLayout from './layouts/AdminLayout';
import ConfirmAccount from './pages/ConfirmAccount';
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login'; 
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import ManagePatients from './pages/ManagePatients';
import { PatientsProvider } from './context/PatientsProvider';
import UpdateProfile from './pages/UpdateProfile';
import ChangePassword from './pages/ChangePassword';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PatientsProvider>
          <Routes>
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route path='confirm/:token' element={<ConfirmAccount />} />
              <Route path='forgot' element={<ForgotPassword />} />
              <Route path='forgot/:token' element={<ResetPassword />} />
            </Route>

            <Route path='/admin' element={<AdminLayout />}>
              <Route index element={<ManagePatients />} />
              <Route path='profile' element={<UpdateProfile />} />
              <Route path='change-password' element={<ChangePassword />} />
            </Route>
          </Routes>
        </PatientsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App
