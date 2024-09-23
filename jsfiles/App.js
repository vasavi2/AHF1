import React,{useState} from "react";
import { BrowserRouter , Route ,Routes} from "react-router-dom";
import ResponsiveDrawer from "./Drawer";
import Login from "./Login/Login";
import Dashboard from "./Dashboard";
import Workspace from "./Workspace";
import Contact from "./Contact";
import Analytic from "./Analytic";
import Admin from "./Admin";
import Alert_Mangement from "./Alert_Mangement";
import PowerBi from "./PowerBi";
import Settings from "./Settings";
import Chat from "./Chat_Component/Chat";
import { makeStyles } from '@material-ui/core/styles';
 
 
const useStyles=makeStyles({
  container:{
    display:"flex"
  }
})
 
const App = () => {
  const classes=useStyles();
 
    const [auth,setAuth]=useState(false)
 
  return (
    <div>
      {
        auth?(
        
        
        <div className={classes.container}>
                  <BrowserRouter>
         <ResponsiveDrawer/>
       <Routes>
       <Route path="/" element={<Dashboard/>}/>
       <Route path="/dashboard" element={<Dashboard/>}/>
       <Route path="/pipline" element={<Workspace/>} />
       <Route path="/analystic" element={<Analytic/>}/>
       <Route path="/admin" element={<Admin/>}/>
       <Route path="/alert" element={<Alert_Mangement/>}/>
       <Route path="/powerbi" element={<PowerBi/>}/>
       <Route path="/chat" element={<Chat/>}/>
       <Route path="/setting" element={<Settings/>}/>
 
       </Routes>  
 
 
 
     </BrowserRouter>
        </div>
        )
        
        
        
        :(
                  <Login setAuth={setAuth}/>
 
        )
      }
    </div>
  );
};
 
export default App;
 
