import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Body from './components/Body'
import Login from './components/Login'
import Profile from './components/Profile'
import Feed from './components/Feed'
import Connection from './components/Connection'
import Requests from './components/Requests'
import LandingPage from './components/LandingPage'
import Chat from './components/Chat'
import UserProfile from './components/UserProfile'
import Explore from './components/Explore';

const App = () => {
  return (
    <>
     
      <Routes>
      <Route path="/landingPage" element={<LandingPage />} />
         <Route path='/login' element={<Login />} />
      <Route path="/" element={<Body/>} >
         <Route path='/' element={<Feed />} />
         <Route path='/profile' element={<Profile />} />
         <Route path='/connection' element={<Connection />} />
         <Route path="/request" element={<Requests />} />
         <Route path="/explore" element={<Explore />} />
      </Route>
         <Route path="/profile/:userId" element={<UserProfile />} />
         <Route path="/chat/:targetUserId" element={<Chat />} />
      </Routes>
    </>
  )
}

export default App