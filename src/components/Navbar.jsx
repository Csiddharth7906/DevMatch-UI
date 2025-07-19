import React from 'react'

const Navbar = () => {
  return (
    <div className="navbar bg-base-200 shadow-sm">
  <div className="flex-1">
   <a className="text-2xl font-bold px-3 py-1 rounded-lg hover:bg-base-200 transition duration-300">
  <span className="text-white"><i class="ri-arrow-left-s-line"></i>Dev</span>
  <span className="bg-gradient-to-r from-red-500 via-blue-500 to-pink-400 bg-clip-text text-transparent">
    Match<i class="ri-arrow-right-s-line"></i>
  </span>
</a>
   
  </div>
  <div className="flex gap-2">
   
    <div className="dropdown dropdown-end mx-5">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
  )
}

export default Navbar