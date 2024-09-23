import React from "react";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import "./popups.scss"
import HomeIcon from '@mui/icons-material/Home';

// import "./popup.scss"
function NewPopup({ name, onNameChange }) {

  const dashboard=[] 
  const [newdashboard,SetnewDshboard]=useState(dashboard)
  const [random,setRandom]=useState(0)
  const [months,setMonths]=useState("")

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  
  const initialValues1 = {};
  const [names,setName]=useState("")
  const [values, setValues] = useState(initialValues1);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const datas = useSelector((state) => state);
  

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second
    return () => {
      clearInterval(intervalId); // Clean up the interval when the component unmounts
    };
  }, []);


  const formattedDate = new Date().toLocaleDateString(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

 

//
  function formatDate(date) {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat(undefined, options).format(date);
    return formattedDate.replace('.', ''); // Remove dots from the abbreviated month name
  }
  const currentDateTime1 = formatDate(new Date());

  //


  const now=new Date()
  const options={hour12:false};
  const formattedTime=now.toLocaleTimeString(undefined,options)
  // const formattedTime = currentDateTime.toLocaleTimeString();
  const date = new Date();

  const day = date.getDate();

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const monthIndex = date.getMonth();

  const year = date.getFullYear();

    

  const formattedDate2 = `${day}-${monthNames[monthIndex]}-${year}`;

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRandom(random+1)
    console.log("count",random)

    setValues((values)=>({...values,[name]:value}) );
    const time=formattedDate2+"|"+formattedTime

    SetnewDshboard((newdashboard)=>[...newdashboard,{"TaskNo":random,"PipilineName":names.charAt(0).toUpperCase()+names.slice(1),"Created_on":time
    ,Status: "Paused",
     Owner: "Nagaraj",
    Description: "Working on the workspace",
  remark:"None"}])

  console.log("old",newdashboard)
      

    //
  };



  const handleSubmit = () => {
    const obj = {
      type: "CREATE_WORKSPACE",
      payload: values,
    };
    console.log("normal",newdashboard[0])
    console.log("nrml",newdashboard)
    
    axios.post("http://127.0.0.1:9090/insertDashboardData",newdashboard[0])
    .then((response)=>{console.log("api for dashboard",response)})
    dispatch(obj);
    setLoading(false);


    onNameChange(names.charAt(0).toUpperCase()+names.slice(1))
    
    
   };

  return (
    <>
      {loading === true ? (
        // <div className="ws_popup-container ">
                  <div className="ws_popup_container ">

          <div className="ws_popups">
            <div
              className="ws_popup-inners"
              style={{
                borderStyle: "solid",
                borderColor: "#e8eef5",
              }}
            >
              <div className="ws_popup-titles">
                <h6 style={{color:"white"}}>Workspace</h6>


              </div>

              <div className="ws_popup-content" style={{ flexGrow: 1 }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "25px",
                  }}
                >
                  <div style={{ margin: "13px" }}>

                    {/* <button style={{position:"absolute",bottom:"400px",right:"600px"}} onClick={HomeButton}>Home</button> */}
                    
                    
              <a href="/dashboard">
              
              <button style={{cursor:"pointer",position:"fixed",bottom:"400px",right:"652px"}}>
              <HomeIcon/>
              </button>.
            </a>

                    <label style={{margin: "12px",}}>Name</label>
                    <input type="text" value={names}  style={{
                        borderColor: "grey",
                        width: "183px",
                        height: "25px",
                        borderRadius: "7px",
                      }} onChange={(e)=>setName(e.target.value)}/>

                  
                  </div>
                  <div style={{ margin: "13px" }}>
                    <label
                      style={{
                        margin: "5px",
                      }}
                    >
                      Category
                    </label>
                    <select name="Category" onChange={handleInputChange}>
                      <option>Select </option>
                      <option value="Marketing">Manufacturing</option>
                      <option value="Finance">Oil & Gas</option>
                      <option value="Finance">Chemical Industry </option>
                      <option value="Finance">Plant Engineering</option>


                    </select>
                  </div>

                  <div style={{ margin: "auto" }}>
                    <button
                      // onClick={onSubmit}
                      type="button"
                      onClick={handleSubmit}
                      style={{
                        width: "153px",
                        height: "35px",
                        color: "white",
                        background:
                          "transparent linear-gradient(256deg, #0479B2 0%, #1B5D94 100%) 0% 0% no-repeat padding-box",
                        boxShadow: "3px 3px 7px #0873AC0F",
                        borderRadius: " 10px",
                        opacity: 1,
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
export default NewPopup;
