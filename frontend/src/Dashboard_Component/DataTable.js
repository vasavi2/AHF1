import React, { useState,useEffect } from "react";
import { AiFillAppstore } from "react-icons/ai";
import { Icon } from "@iconify/react";
// import Jsondata from "./dashboradapi.json";
import axios from "axios"
// import "./table.css";
import "./table.css"

export const DataTable = ({inputValue}) => {
  const [open, setOpen] = useState(true);
  const [data,setData]=useState([])


  const [screen,setScreen]=useState([])
  const [tableData,setTableData]=useState([])


  const [screenshot,setScreenshot]=useState([])
  const [filteredData,setFilteredData]=useState([])


  // const [selectedimage,setSelectedimage]=useState()
  // const [largeimage,setlargeimage]=useState(false)
  // const [title,setTitle]=useState("")

  const [clickedImage, setClickedImage] = useState(null);

  console.log("final final",inputValue)

  useEffect(()=>{
    axios.get("http://127.0.0.1:9090/getdashboard")
    .then((res)=>{setData(res.data);setFilteredData(res.data)})
    .catch((error)=>{
      console.log("Error fetching data:",error)
    })
  },[])

  useEffect(()=>{
    axios.get("http://127.0.0.1:9090/getWorkspace")
    .then((res)=>{setScreen(res.data);  setScreenshot(res.data)})
    .catch((error)=>{
      console.log("Error screenshot data:",error)
    })
  },[])
  console.log("screenshot data----------->",screenshot)


useEffect(()=>{
  if(inputValue!==undefined)
  {
          const filtered = data.filter((item) =>
          item.pipilinename.toLowerCase().includes(inputValue.toLowerCase()));

          const screenshots=screen.filter((item)=>
          item.workspacename.toLowerCase().includes(inputValue.toLowerCase()))


  setFilteredData(filtered);

  setScreenshot(screenshots)

  }


  // const screenshots=screenshot.filter((item)=>
  // item.workspacename.toLowerCase().includes(inputValue.toLowerCase()))

  // setScreenshot(screenshots)
  // console.log(screenshots)

  // setData(filtered)
  // console.log("filtered data",filtered)
  // console.log("filtered data2",screenshots)

}, [inputValue,data,screen])


  // console.log("in data table",props.searchInput)

  // const renderHeader = () => {
  //   return Object.entries(Jsondata.data[0]).map(([key, value]) => {
  //     return <th key={key}>{key.toUpperCase()}</th>;
  //   });
  // };









 

  const handleImageClick = (imageSrc) => {
    // Check if the clicked image is the same as the currently clicked one
    if (clickedImage === imageSrc) {
      setClickedImage(null); // Toggle back to normal size
    } else {
      setClickedImage(imageSrc); // Set as clicked for larger size
    }
  };

 

  const handleImageDoubleClick = () => {
    setClickedImage(null); // Reset to normal size on double click
  };

  const handleDownloadClick = (imageSrc) => {
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = "image.jpg"; // You can specify the desired filename here
    link.click();
  };


  // const setNew=()=>{
  //   return window.location.href="/pipline";
  // }
  








  return (
    <>
      <div
        style={{
          // background:' var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box',
          background: "#FFFFFF 0% 0% no-repeat padding-box",
          boxShadow: "3px 3px 7px #0000000D",
          borderRadius: "10px",
          margin: "5px",
          opacity: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            marginTop: "0px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h4
            style={{
              padding: "10px",
            }}
          >
            Workspace
          </h4>
          <div style={{ marginTop: "3px", padding: "7px" }}>
          {/* // window.location.href="/pipline"; */}

            <a href="/pipline">
              {" "}
              <button className="pointer button1"> New +</button>{" "}
            </a>
                          {/* <button className="pointer button1" onClick={()=>{setNew()}}> New +</button>{" "} */}

            {open === true ? (
              <button className="button1" onClick={() => setOpen(false)}>
                <AiFillAppstore className="pointer b" />
              </button>
            ) : (
              <button onClick={() => setOpen(true)} className="pointer button1">
                {" "}
                |||
              </button>
            )}
          </div>
        </div>
        {open === true ? (
          
          <div className="App" style={{height:"100vh",display:"flex",flexDirection:"column"}}>
            <div style={{height:"40%",overflow:"auto"}}>

            {/* <div> */}


            {/* <table id="employee" className="styled-table">
                      <thead>
                         
                          <tr>
                            <th>TaskNo</th>
                            <th>PipelineName</th>
                            <th>Created_on</th>
                            <th>Status</th>
                            <th>Owner</th>
                            <th>Description</th>
                            <th>Remarks</th>
                          </tr>
                      </thead>
                        {
                        data!==null?( (<tbody>
                        {
                            data.map((item,index)=>(
                            <tr key={index}>
                              <td>{item.taskno}</td>

                              <td>{item.pipilinename.charAt(0).toUpperCase()+item.pipilinename.slice(1)}</td>
                              <td>{item.created_no}</td>
                              <td>{item.status}</td>
                              <td>{item.owner}</td>
                              <td>{item.description}</td>
                              <td>{item.remark}</td>
                            </tr>
                            ))
                          }
                        </tbody>
                       
                        )):("")
}
          
           </table> */}
           <table className="styled-table">

<thead>

  <tr>

    <th>TaskNo</th>

    <th>PipelineName</th>

    <th>Created_on</th>

    <th>Status</th>

    <th>Owner</th>

    <th>Description</th>

    <th>Remarks</th>

  </tr>

</thead>

<tbody>

  {filteredData.length > 0 ? (
    filteredData.map((item, index) => (
      // <tr key={index}>
      //   <td>{item.taskno}</td>
      //   <td>{item.pipilinename.charAt(0).toUpperCase() + item.pipilinename.slice(1)}</td>
      //   <td>{item.created_no}</td>
      //   <td>{item.status}</td>
      //   <td>{item.owner}</td>
      //   <td>{item.description}</td>
      //   <td>{item.remark}</td>
      // </tr>

<tr key={index}>
<td style={{paddingLeft:"30px"}}>{item.taskno}</td>
<td style={{paddingLeft:"0px"}}>{item.pipilinename.charAt(0).toUpperCase() + item.pipilinename.slice(1)}</td>
<td style={{paddingLeft:"0px"}}>{item.created_no}</td>
<td style={{paddingLeft:"0px"}}>{item.status}</td>
<td style={{paddingLeft:"15px"}}>{item.owner}</td>
<td style={{paddingLeft:"0px"}}>{item.description}</td>
<td style={{paddingLeft:"30px"}}>{item.remark}</td>
</tr>
    ))
  ) : (
    <tr>
      <td colSpan="7">No data available</td>
    </tr>
  )}

</tbody>

</table>



           
           </div>
           </div>
          
        ) :
        


//                                         {/* {largeimage&&(

//                                         <div className="img-container"> 
//                                                     <h1 style={{marginLeft:"50px",paddingTop:"50px"}}>{title}</h1>
//                                                     <img
//                                                                     src={selectedimage}
//                                                                     width="100%"
//                                                                     height="450px"
//                                                                     alt="img"
//                                                                     // title={title}
//                                                                   />
//                                                       <button className="btn bnt-primary float-end">close</button>
//                                           </div>
//                                           )
//                                         } */}







screenshot!==null?(
  <div className="App" style={{ height: "100vh", display: "flex", flexDirection: "column" }}>

  <div style={{ height: "80%", overflow: "auto" }}>

    <div

      style={{

        display: "flex",

        flexWrap: "wrap",

        justifyContent: "space-around",

      }}

    >

      {screenshot.map((value, index) => {
        console.log("values------>",value)

        const isClicked = clickedImage === value.screenimage;
        console.log("screen image----->",isClicked)

        return (

          <div

            className={`image-box ${isClicked ? "clicked" : ""}`}


            key={index}

            style={{

              width: isClicked ? "900px" : "230px", // Increase width when clicked

              height: isClicked ? "520px" : "138px", // Increase height when clicked

              background: "#F6F6F6 0% 0% no-repeat padding-box",

              boxShadow: "0px 2px 3px #0000000D",

              border: "0.20000000298023224px solid #70707021",

              borderRadius: "10px",


              opacity: 1,

              margin: "9px",
              marginTop:"50px",

              background:

                "transparent linear-gradient(244deg, #0479B2 0%, #1B5D94 100%) 0% 0% no-repeat padding-box",

              transition: "width 0.3s, height 0.3s", // Add smooth transition

              display: isClicked ? "block" : "initial", // Show clicked image, hide others

            }}


            onClick={() => handleImageClick(value.screenimage)} // Handle single click

            onDoubleClick={handleImageDoubleClick} // Handle double click

          >

            <div>

              <div

                style={{

                  display: "flex",

                  justifyContent: "space-around",

                  marginTop: "10px",


                }}

              >

                <div>{value.workspacename.charAt(0).toUpperCase() + value.workspacename.slice(1)}</div>

                <div>

                  {/* <Icon icon="carbon:overflow-menu-horizontal" /> */}

                </div>

              </div>

            </div>



            <div style={{ marginLeft: "3px" }}>

              <img

                src={value.screenimage}

                alt="img"

                style={{

                  width: "100%",

                  height: "100%",

                  objectFit: "cover",

                }}

              />

            </div>


                <div   style={{marginLeft: isClicked ? "800px" : "125px",border:"50px"}}>
                    <button style={{marginRight:"90px",width:"90px",marginTop:"-30px"}} onClick={() => handleDownloadClick(value.screenimage)}>Download</button>
                </div>

              </div>

            

        );

      })}

    </div>

  </div>

</div>
          
        ):(<h1 style={{textAlign:"center" }}>No Results Found</h1>)


    }

      </div>
    </>
  );
};
export default DataTable;
