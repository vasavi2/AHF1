import React, { useEffect, useState } from "react";
import axios from "axios"
import List from "./List";


export const AppDashboards = () => {


  const [isShown, setIsShown] = useState(false);
  let [data_dis,setData]=useState([])
  let [inputValue,setInputValues]=useState()
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const [isShownWorkspace, setIsShownWorkspace] = useState(false);
  const [isShownManagement, setIsShowManagement] = useState(false);
  const [isShownPlant, setIsShowPlant] = useState(false);
  const [isSettings,setIsSetting]=useState(false)

  const [plantIncr,setPlantIncr]=useState(1)
  const [workspaceIncr,setWorkSpaceIncr]=useState(2)






  console.log("display data",data_dis)
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the data array to get the items for the current page
  const currentData = data_dis.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (endIndex < data_dis.length) {
      setCurrentPage(currentPage + 1);
    }
  };

 

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  




  let display={
    "Recent":data_dis
  }

  useEffect(()=>{
    axios.get("http://127.0.0.1:9090/getplants")
    .then((res)=>{
    const rest=res.data
    console.log("hello hello0",rest)
    console.log("hello hello ",(rest[rest.length-1]["plant_id"]))
    setPlantIncr((rest[rest.length-1]["plant_id"]))  
  }
    )
  },[])


  useEffect(()=>{
    axios.get("http://127.0.0.1:9090/getdashboard")
    .then((res)=>{console.log("dashboard data",res.data);setData(res.data);
    console.log("workspace count",res.data[res.data.length-1]["taskno"]);
    setWorkSpaceIncr(res.data[res.data.length-1]["taskno"])
  })
  },[])

  const handleValueChange=(val)=>{
    setInputValues(val)
    console.log("Input values---->",val)
  }

const pathvalue=window.location.pathname
debugger

  return (
    <>
      <div className="main-workarea flex-container-sidebar">
      

        <div className="flex-container-content">
          <div className="flex-container-content-header">
            <div className="dashbord-header " style={{marginTop:"10px"}}>
             
              

              {/* {Object.entries(dummy.Total).map(([key, value]) => (
                <div key={value}>
                  <div
                    className="total"
                    style={{
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          alignItems: "center",
                        }}
                      >
                      <div>
                          <IoIosApps
                            className="iconcircle"
                            size="60px"
                            style={{
                              color: "black",
                              marginTop: "2px",
                              boxShadow: "0px 0px 3px #0000004D",
                              background: "#FFFFFF 0% 0% no-repeat padding-box",
                              border: "1px solid #707070",
                              opacity: 1,
                              width: "60px",
                              height: "60px",
                              borderRadius: "50px 50px 50px 50px",
                            }}
                          />
                        </div>
                        <div style={{ padding: "3px" }}>
                          <h5>{key}</h5>
                          <h2>{value}</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))} */}





                  {/* <div className="recent flat">                
                      <Icon
                        color="#171717"
                        style={{
                          margin: "auto",
                        }}
                        icon="material-symbols:arrow-back-ios-new-rounded"
                        className="pointer"
                        onClick={handlePrevPage}
                      />


                        <h4
                          style={{
                            alignItems: "top",
                          }}
                        >
                          Recent
                    </h4>

                            {currentData.map((value, i) => (
                              <div key={i} className="recent1">

                                <h1> {value.taskno}</h1>
                                <div className="vl"></div>
                                <div style={{ margin: "auto" }}>
                                <span title="tiltle">{value.pipilinename}</span>

                                  <br></br>
                                  <span alt="time"> {value.created_no}</span>
                                </div>
                              </div>
                            ))}

                        <Icon
                          color="#171717"
                          style={{
                            margin: "auto",
                          }}
                          className="pointer"
                          icon="material-symbols:arrow-forward-ios-rounded"
                          onClick={handleNextPage}
                        />


                  </div> */}
            </div>
          </div>
          
          <div className="flex-container-content-workarea">
            <div style={{marginLeft:"0px"}}>
            <List/>

            </div>
            {/* <DataTable inputValue={inputValue}  /> */}
           
          </div>


        </div>
      </div>
    </>
  );
  // <Header/>
};
export default AppDashboards;
