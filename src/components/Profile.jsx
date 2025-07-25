import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector((state) => state.user);
  return user &&(
    <div className="profile container min-h-screen flex items-center justify-center">
      <EditProfile user={user} />
      
    </div>
  )
}

export default Profile