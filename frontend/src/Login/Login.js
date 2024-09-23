import React, { useState,useEffect } from "react";
import Captcha from "./Captchabox";
import { BsPersonFill } from "react-icons/bs";
import { BsLockFill } from "react-icons/bs";
import { Icon } from "@iconify/react";
import logipic from "./login.png"
import { BrowserRouter , Route ,Routes} from "react-router-dom";

// import logipic from "./logins.jpg"
import logo from "../Login/../logo.jpg"
import "./Login.css";
import Auth from './Auth'
import Admin from "../Admin";
import Dashboard from "../Dashboard"
import { useNavigate } from "react-router-dom";
import Workspace from "../Workspace";
// import ResponsiveDrawer from "./Drawer";
import ResponsiveDrawer from "../Drawer";
// function Login({setAuth}) {
  function Login({setAuth}) {
 
  // function Login() {
 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
 
 
 
  useEffect(() => { // Check if the current URL is '/admin' and authenticate directly
    if (window.location.pathname === '/admin')
    {
      setAuth(true);
    }
     else if (window.location.pathname === '/pipline')
    {
      setAuth(true);
    }
    else if (window.location.pathname === '/dashboard')
    {
      setAuth(true);
    }
 
  },
    [setAuth]);
 
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("")
    if (username === 'admin@gmail.com' && password === 'admin') {
      setAuth(true)
      console.log("Authentication status ")
    }
   
    else{
      setErrorMessage("incorrect username and password")
    }
  };
  const [forget, setForget] = useState(true);
  const [view, setView] = useState("password");
//   const handleSignUp=()=>{
//     setAuth(true)
   
// }
 
 
  return (
    (window.location.pathname==="/admin")?(
      <div style={{marginLeft:"238px"}}>

    <BrowserRouter>
         <ResponsiveDrawer/>
       <Routes>
       <Route path="/admin" element={<Admin/>}/>
       </Routes>
    </BrowserRouter>
    </div>
    
    
    ):
    (window.location.pathname==="/dashboard")?
    (
      <div style={{marginLeft:"240px"}}>
    <BrowserRouter>
         <ResponsiveDrawer/>
       <Routes>
       <Route path="/dashboard" element={<Dashboard/>}/>
       </Routes>
    </BrowserRouter>
    </div>):
    (window.location.pathname==='/pipline')?(<Workspace/>):
    (<div className="flex-container-login">
      <div
        className="imglogin"
        style={{ backgroundImage: `url(${logipic}) ` }}
      ></div>
      <div className="login-form">
        <div className="triangle-topright"> </div>
        <div className="center">
          <img src={logo} alt="logo" className="logos" />
          <span alt="welcome">Welcome to</span>
          <br></br>
          <span title="Workspace"> WORKSPACE</span>
          <div className="from-ui">
            {forget === true ? (
              <>
 
               
                <h5 style={{marginBottom:"10px",marginLeft:"130px",marginTop:"30px",color:"#024D87"}}>
                  <b >Sign In</b>
                 
                </h5>
                <form onSubmit={handleSubmit}>
                  <label> User Id </label>
                  <br></br>
                  <div className="wrappers">
                    <div className="icon">
                      <BsPersonFill style={{ color: "#888888" }} />
                    </div>
                    {errorMessage && (
                      <div className="alert alert-danger">{errorMessage}</div>
                    )}
                    <input
                      type="text"
                      className="form-username"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      autoComplete="username"
                    />
                  </div>
                  <br></br> <label style={{marginTop:"-20px"}}>Password</label>
                  <br></br>
                  <div className="wrappers" style={{marginTop:"-20px"}}>
                    <div className="icon">
                      <BsLockFill style={{ color: "#888888" }} />
                    </div>
                    <input
                      type={view}
                      className="form-password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
 
                    />
                    <div className="viewicon">
                      {/* gridicons:not-visible */}
                      {view === "password" ? (
                        <Icon
                          onClick={() => setView("text")}
                          icon="gridicons:not-visible"
                          style={{ color: "#888888" }}
                        />
                      ) : (
                        <Icon
                          onClick={() => setView("password")}
                          icon="gridicons:visible"
                          style={{ color: "#888888" }}
                        />
                      )}
                    </div>
                  </div>
                  <br></br>
                   <button type="submit" style={{cursor:"pointer",borderRadius:"50px",marginTop:"-10px"}}
                  //  onClick={handleSignUp}
                   >LOGIN</button>
                   <div
                    href="#"
                    className="fpassword"
                    onClick={() => setForget(false)}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    Forgot Password?
                  </div>
                  <h3>or</h3>
                  <Auth/>
                </form>
              </>
            ) : (
              <>
                <h4>
                  <b>Forgot Password</b>
                </h4>
                 <form>
                  <label>User Id</label>
                  <br></br>
                  <div className="wrapper">
                    <div className="icon">
                      <BsPersonFill style={{ color: "#888888" }} />
                    </div>
                    <input
                      type="text"
                      className="form-username"
                      name="username"
                    />
                  </div>
<div style={{marginLeft:"-130px"}}>
<Captcha  />
 
</div>
                 
                </form>
               
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  ))
  ;
}
 
export default Login;
 
 



