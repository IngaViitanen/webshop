import React, { useState, FormEvent, useEffect } from 'react'
import loginlogo from "../../images/login.png"
import UserData from '../../models/UserData'
import './login.css'
import { User } from '../../models/User'

interface Props {
  loggedin: boolean
  setLoggedin: (login: boolean) => void
}

function Login({loggedin, setLoggedin}: Props) {
  const [showForm, setShowForm] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [validcss, setValidcss] = useState('')
  const [message, setMessage] = useState('')

  const loginHandler = (event: FormEvent) => {
      event.preventDefault()

      for( let i = 0; i < UserData.length; i++) {
        if(UserData[i].username !== username && UserData[i].password !== password){
            setValidcss('invalid')
            setMessage('username or password is incorrect')
        }
				else if( UserData[i].username === username && UserData[i].password === password) {
					console.log('success')
					const userName = { name: UserData[i].name, loggedin: true}
					setLoggedin(true)
					localStorage.setItem( 'loggedin', JSON.stringify(userName) )
          setValidcss('')
          setMessage('')
          setShowForm(!showForm)
					return 
				}
			}
  }

  const logoutHandler = () => {
    console.log('logout')

    const userLogout = { name: '', loggedin: false }

    setLoggedin(false)
    localStorage.setItem( 'loggedin', JSON.stringify(userLogout))
    setShowForm(!showForm)
  }


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
        <div >
        {loggedin ? 
        <div className='dropdown-login bg-login'>
          <p className='invalidMess'>Logged in as: {UserData[0].name}</p>
          <button onClick={logoutHandler} >logout</button> 
        </div> 
        : 
        <form className='dropdown-login' onSubmit={loginHandler}>
          <input className={validcss} type="text" placeholder='username' onChange={ event => setUsername(event.target.value)} required/>
          <input className={validcss} type="password" placeholder='password' onChange={ event => setPassword(event.target.value)} required/>
          <button type="submit">login</button>
          <p className='invalidMess'>{message}</p>
        </form>
        }
       
        </div>
      ) : null}
    </div>
  )
}

export default Login