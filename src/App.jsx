import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Patients from './Patients'
import Doctors from './Doctors'
import Home from './Home'
import Navbar from './Navbar'
import NotFound from './NotFound'
import SingleDoctor from './SingleDoctor'
import SinglePatient from './SinglePatient'

function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/patients' element={<Patients/>}/>
        <Route path='/doctors' element={<Doctors/>}/>
        <Route path='/doctors/:id' element={<SingleDoctor/>}/>
        <Route path='/patients/:id' element={<SinglePatient/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
    </>
    
  )
}

export default App