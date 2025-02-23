import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Landing_Page from '../src/components/Landing_Page'
import Login from '../src/components/Login'
import Reset_Password from './components/Reset_Password'
import Signup from './components/Signup'
import Profile_Page from './components/Profile_Page'
import AllJobs from './components/All_Jobs'
import UserProvider from './Context/Context'
import  HRInterview  from './components/HR_Interview'
import './App.css'
import {BrowserRouter, Routes,Route} from "react-router-dom"
function App() {
  

  return (
    <>
   
    {/* <UserProvider>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Landing_Page></Landing_Page>}></Route>
    <Route path='/signin' element={<Login></Login>}></Route>
    <Route path='/resetpassword' element={<Reset_Password></Reset_Password>}></Route>
    <Route path='/signup' element={<Signup></Signup>}></Route>
    <Route path='/profile' element={<Profile_Page></Profile_Page>}></Route>
    <Route path='/alljobs' element={<AllJobs></AllJobs>}></Route>
    <Route path='/hrinterview' element={<HRInterview></HRInterview>}></Route>
    
    </Routes>


      
      
  
</BrowserRouter>
    </UserProvider> */}
   <UserProvider>
   <HRInterview></HRInterview>
   </UserProvider>

    </>
  )
}

export default App
