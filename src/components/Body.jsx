import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  // Function to fetch user data
  const fetchUser = async () =>{
    if (userData) {
      return; 
    }
     try{ 
      const res = await axios.get(BASE_URL+'/profile/view', {
       withCredentials: true ,
      }); 
   
      dispatch(addUser(res.data));
     }catch (error) {
  if (error.response && error.response.status === 401) {
    navigate("/landingPage");
  }
  console.error("Error fetching user data:", error);
}
  };
  useEffect(() => {
    
      fetchUser();
    
  },[] );
  return (
    <div className='bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white'>
       <Navbar />
        <Outlet />  
        {/* <Footer /> */}
    </div>
  )
}

export default Body
