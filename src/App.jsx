import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Body from './components/Body'
import Login from './components/login'
import Profile from './components/Profile'
import Feed from './components/Feed'


const App = () => {
  return (
    <>
     
      <Routes>
      <Route path="/" element={<Body/>} >
         <Route path='login' element={<Login />} />
          <Route path='/' element={<Feed />} />
         <Route path='profile' element={<Profile />} />
      </Route>
      </Routes>
    </>
  )
}

export default App