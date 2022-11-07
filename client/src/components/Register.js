import React,{useState,useRef} from 'react'
import {useNavigate} from "react-router-dom";
import axios from "axios"
import "./Register.css"

function Register() {
  const navigate = useNavigate()
  const [isLoading,setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [user,setUser]= useState("")
 

  const formEl = useRef(null);
  const firstNameEl = useRef(null); 
  const lastNameEl = useRef(null); 
  const userNameEl = useRef(null); 
  const birthdayEl = useRef(null)
  const emailEl = useRef(null); 
  const passwordEl = useRef(null); 
  async function submitHandler(e){
    e.preventDefault();
    const userData ={
      firstName: firstNameEl.current.value,
      lastName:lastNameEl.current.value,
      userName: userNameEl.current.value,
      dateOfBirth:birthdayEl.current.value,
      eMail: emailEl.current.value,
      password: passwordEl.current.value
    }
  
    try {
      setIsLoading(true);
      const axiosResp = await axios.post("http://localhost:4000/user", userData);
      setIsLoading(false);
     
      
      if(axiosResp.data.error) {
       console.log(axiosResp.data.error)
       setIsError(true)
        return;
      }

      console.log("axiosResp.data", axiosResp.data)
     
  }catch (error){
    setIsError(true)
  
    return;
  }
  setUser(userData.firstName)
  setIsRegistered(true);
  formEl.current.reset();
  }

  if(isRegistered){setTimeout(()=> navigate("/login"),2500)}
 
  return (
  
   
    <div className='register'>
     
    <div className="reg-form-container">

    <form ref={formEl} className={isLoading? "reg-form reg-form-opacity":"reg-form"} action="">
     <div>Register</div>
     <br />
     <input ref={firstNameEl} type="text"  placeholder='First name'/>
     <input ref={lastNameEl} type="text"  placeholder='Last name'/>
     <input ref={userNameEl} type="text"  placeholder='User name'/>
     <input ref={birthdayEl} type="text" placeholder='Birthday dd.mm.yyyy'/>
     <input ref={emailEl} type="email"  placeholder='Email'/>
     <input ref={passwordEl} type="password"  placeholder='Password'/>
     <button className='register-btn' onClick={submitHandler}>Register</button>
     {isRegistered? <> <div > Hello <span style={{color:"darkorange",fontStyle:"italic"}}>{user}</span> you were successfully registered</div> <div>Your will be automatically directed to <span style={{color:"darkorange",fontStyle:"italic"}}>login</span> page</div></>:""}
     {isError? <div style={{color:"red"}}>Sorry.. something went wrong. please try again</div>:""}
    </form>
       {isLoading? <div className='reg-loading'>loading...</div>:""}  
     
    </div>
      </div>

 
     
    
   
  )
}

export default Register