import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Registration'
import Header from './components/Header'
import Profile from './components/Profile'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from './components/ProtectedRoutes'
import FileUpload from './components/FileUpload.jsx'
const App = () => {
  return (
    <>
    <ToastContainer />
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route element={<ProtectedRoutes />}>
        
        <Route path='/profile' element={<Profile />} />
        <Route path='/upload' element={<FileUpload />} />
         </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        
      </Routes>
    </Router>
  </>
  )
}

export default App