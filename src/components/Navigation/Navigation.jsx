import React from 'react'
import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";




export default function Navigation() {
  const { user, logout} = useAuth()

  return (

    <div>
  { user ? <nav style={{display:'flex', justifyContent:'flex-end'}}>
    
    <p onClick={logout} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
  </nav>:
   <div>
     

   <nav style={{display:'flex', justifyContent:'flex-end'}}>
            <Link to="/signin">
              <p className='f3 link dim black underline pa3 pointer'>Sign In</p>
            
            </Link>

            <Link to="/register">
              <p className='f3 link dim black underline pa3 pointer'>Register</p>
            </Link>

</nav>
</div>
}
</div>
    
)}