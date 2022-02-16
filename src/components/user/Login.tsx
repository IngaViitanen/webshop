import React, { useState } from 'react'
import loginlogo from "../../images/login.png"

function Login() {
  const [showForm, setShowForm] = useState(false)


  return (
    <div>
      <img 
      onClick={() => setShowForm(!showForm)}
      className="logos" 
      src={loginlogo} 
      alt="Login icons created by Good Ware - Flaticon" 
      height="50px" 
      />
      {showForm ? (
        <form >
          <input type="text" placeholder='username'/>
          <input type="text" placeholder='password'/>
          <button>login</button>
        </form>
      ) : null}
      </div>
  )
}

export default Login