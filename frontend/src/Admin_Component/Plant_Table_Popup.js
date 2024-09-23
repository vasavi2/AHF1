import MUIDataTable from "mui-datatables";
import React, { useState, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import GridViewIcon from "@mui/icons-material/GridView";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import { PlANT_TITILE } from "../../constants/text.jsx";
// import { PlANT_TITILE } from "../Component/text.js";
import { PlANT_TITILE } from "./text.js";
// import "../../popup.css";
// import "./popup.css"
import "./popup.css"


// import Pagination from "../Pagination/Pagination.jsx";
import Pagination from "./Pagination.js";
import DataUsageIcon from '@mui/icons-material/DataUsage';
import TabletIcon from '@mui/icons-material/Tablet';
import SimpleMap from "./SimpleMap.js";
// import SensorsIcon from '@mui/icons-material/Sensors';
import StarsIcon from '@mui/icons-material/Stars';
import Grid from '@mui/material/Unstable_Grid2';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Sample from "./SampleStatic.js";
import "./plant.css"
const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});

function PlantTablePopup({ triggerAssetfun, call_assett_table }) {
  const [plantID,setPlantId]=useState(0)
  const [plantIncrement,setPlantCountryIncrement]=useState([])

  const [responsive, setResponsive] = useState("vertical");
  const [gridview, setGridView] = useState(false);
  const [tableBodyHeight, setTableBodyHeight] = useState("400px");
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
  const [searchBtn, setSearchBtn] = useState(true);
  const [downloadBtn, setDownloadBtn] = useState(false);
  const [printBtn, setPrintBtn] = useState(false);
  const [viewColumnBtn, setViewColumnBtn] = useState(false);
  const [filterBtn, setFilterBtn] = useState(true);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  // const [plants, setPlants] = useState([]);
  // const [assets, setAssets] = useState([]);
  const [headercount, setHeadercount] = useState(0);

  const [disablerow, setDisableRow] = useState(false);
  const [selecthandlecountry, setSelectHandleCountry] = useState("");
  // sethandleStateList
  const [selectHandleState, setSelectHandleStateList] = useState("");
  //   const [rowsasset, setRowsAsset] = useState([]);
  // const [assetrows, setAssetRows] = useState([]);
  const [plantrows, setPlantsRows] = useState([]);
  const [openedit, setOpenEdit] = useState(false);
  const [editDatavalue, setEditData] = useState([]);
  const [openaddnewplant, setOpenAddNewPlant] = useState(false);
  const [showPopup, setShowPopup] = useState({ shown: false });
  // const [reload, setReload] = useState(false);
  // const [lastrow, setLastRow] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sensorloading, setSensorloading] = useState(false);
  // const [assetId, setdownAssets] = useState(0);
  const [refresh, setRefresh] = useState(true);
  const childRef1 = useRef(null);
  let [account, setAccount] = useState({});
  let [editaccount, setEditAccount] = useState({});

  let [ressendData, setResSendData] = useState({});

  // const [plantname, setPlantName] = useState("");
  const [newPlantName, setNewPlantName] = useState("");
  // const [selectedfile, setSelectedFile] = useState(null);
  const [plantCountry, setPlantCountry] = useState([]);
  const [coordinates, setCoordinates] = useState(null);

  //toggle-buttons
  const [displayComponent,setDisplayComponent]=useState(1)

  //setPlantState
  const [plantState, setPlantState] = useState([]);
  const {
    offset,
    handleChangePage,
    page,
    rowsPerPage,
    handleChangeRowsPerPage,
  } = Pagination();
  useEffect(() => {
    // window.reload()
    // setPlantName(editDatavalue);
    async function fetchPlantData() {
      const GA_URL = process.env.REST_URL + "/getlimitplants";
      
      // console.log(rowsPerPage, offset);
      const result = await axios.get(
        `${GA_URL}?limit=${rowsPerPage}&offset=${offset}`
      );
      if (result && result.data) {
        // console.log(result.data);
        // setPlants(result.data);
        setPlantsRows(result.data);
        console.log("plant_data----------------->",result.data)

        const totalCount = result.headers.get("x-total-count");
        setHeadercount(totalCount);
      } else {
        console.log("result is empty or error");
      }
    }

    fetchPlantData();
    // fetchAssetData();
  }, [refresh, offset, rowsPerPage, editDatavalue]);

  // plantrows
  console.log("<---------------plantrows------------------>",plantrows)

  useEffect(() => {
    axios
      .get("http://127.0.0.1:9090/api/countries")
      .then((res) => setPlantCountry(res.data))
      .catch((err) => {
        console.log(err);
      });
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJuYWdhcmFqYW5ld2xpZmVAZ21haWwuY29tIiwiYXBpX3Rva2VuIjoibFFsZlVoN1ZQTHFTSzZ5U2t2Sk9PeEVCci1XdzlWS25uSmpQV0pTSDloclZlUzdNd1JLdWNmQTdFLW1zdmVxMW42dyJ9LCJleHAiOjE2ODE4MDUwMzh9.Dsp5lJiscsve2KhcvolEOqfD-vtPZiOUc3ztT3ogywA
  }, []);
  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:9090/api/coordinates?country=${selecthandlecountry}&region=${selectHandleState}`
      )
      .then((res) => {
        setLatitude(res.data.latitude);
        setLongitude(res.data.longitude);
      })
      .catch((err) => {
        console.log(err);
      });
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJuYWdhcmFqYW5ld2xpZmVAZ21haWwuY29tIiwiYXBpX3Rva2VuIjoibFFsZlVoN1ZQTHFTSzZ5U2t2Sk9PeEVCci1XdzlWS25uSmpQV0pTSDloclZlUzdNd1JLdWNmQTdFLW1zdmVxMW42dyJ9LCJleHAiOjE2ODE4MDUwMzh9.Dsp5lJiscsve2KhcvolEOqfD-vtPZiOUc3ztT3ogywA
  }, [selectHandleState]);
  console.log("countries", plantCountry);

  function handleFileUpload(event) {
    setRefresh(true);
    event.preventDefault();
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = async function () {
      // const csvData = reader.result;
      // const senddata = JSON.stringify(csvData);
      console.log("formData", formData);
      let header = {
        "Content-Type": "application/json",
      };
      axios
        .post("http://localhost:9090/upload_Files", formData, header)
        .then((response) => {
          alert("File Uploaded Successfully");
          setLoading(false);
          setRefresh(false);
          // Do something with the response
        })

        .catch((error) => {
          console.log(error);
          alert("Upload Failed", error);

          // Handle the error
        });
    };
  }

  const handleCountryState = (country) => {
    console.log("");
    setSelectHandleCountry(country);
    const C_URL = `http://127.0.0.1:9090/api/regions?country=${country}`;

    axios.get(C_URL).then((res) => setPlantState(res.data));
  };

  useEffect(() => {
    if (editDatavalue.rowData !== undefined) {
      handleCountryState(editDatavalue?.rowData[3]);
    } else {
      return;
    }
  }, [openedit, editDatavalue]);

  let deleteData = (value) => {
    setDisableRow(true);
    setRefresh(true);
    let deletedata = {
      plant_id: value,
    };
    const DELETE_PLANT = process.env.REST_URL + "/deletePlantData2";
    axios
      .post(`${DELETE_PLANT}`, deletedata)
      .then((response) => {
        setDisableRow("");
        alert("Selected Plant Info Deleted Successfully");
        setRefresh(false);
      })
      .catch((error) => {
        console.log(error);
        setDisableRow(false);
      });
  };
  const editData = (value) => {
    setDisableRow(true);
    setEditData(value);
    setOpenEdit(true);
    setDisableRow(false);
  };

  
  let save = (e) => {
    e.preventDefault();
    setPlantId(plantID+1)||
      console.log("plants count",plantID)
    if (
      !newPlantName ||
      !selecthandlecountry ||
      !selectHandleState ||
      !latitude ||
      !longitude
    ) {
    } else {
      setShowPopup({ shown: !showPopup.shown });
      setLoading(false);
      // triggerAssetfun();
      setSensorloading(true);
      triggerAsset();
      account["plant_name"] = newPlantName;
      // let asdata = childRef1.current.getStateValue();
      // console.log("selecthandlecountry");
      let acobj2 = {
        country: selecthandlecountry,
        region: selectHandleState,
        latitude: latitude,
        longitude: longitude,
      };
      let acobj = {
        ...account,
        ...acobj2,
      };

      setAccount(acobj);
      let sendData = JSON.stringify(acobj);
      console.log("sendData", sendData);
     
      console.log("plants count:",plantID)
     
      let customConfig = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const CREATE = process.env.REST_URL + "/insertPlantData";

      axios
        .post(CREATE, sendData, customConfig)
        .then((res) => {
          alert("Plant Details Submitted Successfully.");
          setLoading(false);
          setResSendData(res.data);
          // console.log("Plant Details res",res)
          // call_assett_table(res.data, "newasset");
          setSensorloading(true);
        })
        .catch((err) => {
          console.log("Error Post Data", err);
          alert("err");
        });
    }
  };
  let editSave = (e) => {
    e.preventDefault();
    setLoading(false);
    setSensorloading(true);
    setRefresh(true);
    let asdata = childRef1.current.getStateValue();
    let acobj2 = {
      plant_id: editDatavalue.rowData[0],
      plant_name: newPlantName,
      country: selecthandlecountry,
      region: selectHandleState,
    };
    // console.log("sendData edit acobj", acobj2);

    let acobj = {
      ...editaccount,
      ...asdata,
      ...acobj2,
    };
    // console.log("sendData edit acobj", acobj);
    setEditAccount(acobj);
    // console.log("sendData edit editaccount", editaccount);

    let sendData = JSON.stringify(acobj);

    // console.log("sendData edit data", sendData);

    let customConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const Update = process.env.REST_URL + "/updatePlantData";

    axios
      .post(Update, sendData, customConfig)
      .then((res) => {
        alert("Plant Details Updated Successfully");
        // console.log("Update  sucessfully res", res);
        // setResSendData(res.data);
        setDisableRow("");
        setOpenEdit("");
        setSensorloading(true);
        setRefresh(false);
      })
      .catch((err) => {
        console.log("Error Post Data", err);
        alert("err");
        setOpenEdit("");
        setDisableRow("");
      });
  };

  const columns = [
      {
        name: "plant_id",
        label: " ID",
        customHeadRender:(columnMeta)=>{
          return (
            <th style={{color:'red'}} >{columnMeta.label}</th>
          );
        },
        customBodyRender:(value)=>{
          return (
            <span style={{color:'red'}}>{value}</span>
          )

        }
      },
    {
      name: "country",
      label: "Country",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "region",
      label: "Regions",
      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "plant_name",
      label: "Plant Name",
      options: { filterOptions: { fullWidth: true } },
      align:"center"
      
    },


    // {
    //   name: "latitude",
    //   label: "Latitude",
    // },
    // {
    //   name: "longitude",
    //   label: "Longitude",
    // },
    
    {
      name: "plant_id",
      label: "Actions",
      sort: false,
      filter: false,
      empty: true,
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          if (value)
            return (
              <div style={{ display: "flex" }} className="left-space">
                <Tooltip title="Edit" style={{ margin: "1px" }}>
                  <IconButton component="span" className="left-space">
                    <EditIcon onClick={() => editData(tableMeta)} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete  " style={{ margin: "1px" }}>
                  <IconButton component="span">
                    <DeleteIcon onClick={() => deleteData(value)} />
                  </IconButton>
                </Tooltip>
              </div>
            );
        },
      },
    },
  ];

//   const columns=[
//     {title:"Id",field:"plant_id"},
//     {title:"Country",field:"country"},
//     {title:"Region",field:"region"},
//     {title:"Plant Name",field:"plant_name"},

// ]
  const options = {
    // selectableRows: "none",
    search: searchBtn,
    download: downloadBtn,
    print: printBtn,
    viewColumns: viewColumnBtn,
    filter: filterBtn,
    filterType: "dropdown",
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
    selectableRows: false,
    rowsPerPage: rowsPerPage,
    rowsPerPageOptions: [5, 10, 25, { label: "All", value: -1 }],
    serverSide: false,
    count: headercount,
    page: page,
    onRowClick: (rowdata) => {
      console.log("call_assett_table", rowdata, "false");
      setDisableRow(true);
      {
        disablerow === true && call_assett_table(rowdata, "false");
      }
    },
    onChangePage(currentPage) {
      handleChangePage(currentPage);
    },
    onChangeRowsPerPage(numberOfRows) {
      handleChangeRowsPerPage(numberOfRows);
    },
    customToolbar: () => {
      return (
        <>
        
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            id="file-input"
            style={{ display: "none" }}
          />

          <Tooltip title="Upload" style={{ margin: "5px" }}>
            <IconButton component="span">
              <label htmlFor="file-input">
                <CloudUploadIcon />
              </label>
            </IconButton>
          </Tooltip>


          <Tooltip title="Add" style={{ margin: "5px" }}>
            <IconButton component="span">
              <AddIcon onClick={() => setOpenAddNewPlant(true)} />
            </IconButton>
          </Tooltip>
        </>
      );
    },
  };

  const triggerAsset = () => {
    setTimeout(() => {}, 5000);
  };
  call_assett_table(ressendData, "true");

  console.log("coordinates", coordinates);


  const tablesData=()=>{
    console.log("plantrows----plantrows----plantrows---",plantrows)
    return (
      <>
                  <div style={{height:"20%",overflow:"auto"}}>

                  <MUIDataTable className="right-space"
              data={plantrows}
              columns={columns}
              options={options}
            />
            </div>
      </>
    )
  }

  const Maps=()=>{
    return(
      <>
                  <SimpleMap />
      </>
    )
  }

  const Sensorse=()=>{
    return (
      <h1>
        {/* Sensors */}
        <Sample/>

      </h1>
    )
  }

  const Analysis=()=>{
    return (
      <h1>
        Analysis
      </h1>
    )
  }

  const Period=()=>{
    return (
      <h1>
        Period
      </h1>
    )
  }

  const Admin=()=>{
    return (
      <h1>
        Admin
      </h1>
    )
  }

  

  const renderComponent=()=>{
    switch (displayComponent){
      case 2:
        return Sensorse()
      case 3:
        return  Maps()
      case 4:
        return Period()
      default :
        return tablesData()
    }
  }

  const handleButtonClick=(componentNumber)=>{
    setDisplayComponent(componentNumber)
  }

  return (
    <>
      <div style={{ margin: "13px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "-17px",
          }}
        >
          <div>
            <span
              style={{
                color: "black",
                fontSize: "large",
              }}
            >
              {PlANT_TITILE}
            </span>
          </div>
          <div>


            <div style={{display:"flex",justifyContent:"space-between",marginBottom:"100px"}}>
            <span
              style={{
                color: "black",
                fontSize: "large",
                // border:"2px solid #b3b3b3",
                // borderRadius:"10px",
                marginRight:"30px",
                paddingLeft:"10px",
                paddingRight:"10px",
                marginBottom:"0px",
                position:"absolute",
                left:"570px",
                top:"100px"
              }}
            >
              {/* <button onClick={() => setGridView(!gridview)} style={{border:"2px solid #b3b3b3",borderRadius:"10px"}}> */}
              <button onClick={() => handleButtonClick(9)} style={{border:"2px solid #b3b3b3",borderRadius:"10px"}}>

              {/* <IconButton > */}
                {/* <GridViewIcon onClick={() => setGridView(!gridview)} /> */}
               {/* <TabletIcon onClick={() => setGridView(!gridview)} /> */}
               <AdminPanelSettingsIcon   style={{color:"#b3b3b3",marginBottom:"4px"}} />

              {/* </IconButton> */}
              -     Admin
              </button>
            </span>{" "}
            <span
              style={{
                color: "black",
                fontSize: "large",
                
                // border:"2px solid #b3b3b3",
                // borderRadius:"10px",
                marginRight:"30px",
                paddingLeft:"10px",
                paddingRight:"10px",
                marginBottom:"0px",
                position:"absolute",
                left:"740px",
                top:"100px"
              }}
            >
              {/* <button onClick={() => setGridView(!gridview)} style={{border:"2px solid #b3b3b3",borderRadius:"10px"}}> */}
              <button onClick={() => handleButtonClick(2)} style={{border:"2px solid #b3b3b3",background:"#0000b3",borderRadius:"10px",color:"white"}}>

              {/* <IconButton > */}
                {/* <GridViewIcon onClick={() => setGridView(!gridview)} /> */}
               {/* <TabletIcon onClick={() => setGridView(!gridview)} /> */}
               {/* <SensorsIcon  style={{color:"white",marginBottom:"4px"}} /> */}

              {/* </IconButton> */}
              -     Sensors
              </button>
            </span>{" "}

            <span
              style={{
                color: "black",
                fontSize: "large",
                // border:"2px solid #b3b3b3",
                marginRight:"30px",
                paddingLeft:"10px",
                // borderRadius:"10px",

                paddingRight:"10px",
                position:"absolute",
                left:"915px",
                top:"100px"

              }}
            >
              {/* <button onClick={() => setGridView(!gridview)} style={{border:"2px solid #b3b3b3",borderRadius:"10px"}}> */}
              <button onClick={() => handleButtonClick(3)} style={{border:"2px solid #b3b3b3",borderRadius:"10px"}}>

              {/* <IconButton component="span"> */}
                {/* <GridViewIcon onClick={() => setGridView(!gridview)} /> */}
               {/* <DataUsageIcon onClick={() => setGridView(!gridview)} /> */}
                              <DataUsageIcon  style={{color:"#b3b3b3",marginBottom:"3px"}}  onClick={() => setGridView(!gridview)} />

              {/* </IconButton> */}
              - Analysis
               </button>

              
            </span>{" "}

              
            {/* <span
              style={{
                color: "black",
                fontSize: "large",
                
                marginRight:"30px",
                paddingLeft:"10px",
                paddingRight:"10px",
                position:"absolute",
                left:"1090px",
                top:"93px"
              }}
            >
              <button onClick={() => setGridView(!gridview)} style={{border:"2px solid #b3b3b3",borderRadius:"10px"}}>

              <IconButton component="span">
               <StarsIcon onClick={() => setGridView(!gridview)} />
              </IconButton>
              - Specific Period
              </button>

            </span>{" "} */}
             <span
              style={{
                color: "black",
                fontSize: "large",
                marginRight:"30px",
                paddingLeft:"10px",
                paddingRight:"10px",
                position:"absolute",
                left:"1090px",
                top:"100px"
              }}
            >
              {/* <button onClick={() => setGridView(!gridview)} style={{border:"2px solid #b3b3b3",borderRadius:"10px"}}>

              <IconButton component="span">
               <StarsIcon onClick={() => setGridView(!gridview)} />
              </IconButton>
              - Specific Period
              </button>

            </span>{" "} */}

            {/* <button onClick={() => setGridView(!gridview)} style={{border:"2px solid #b3b3b3",borderRadius:"10px"}}> */}


            {/* <button onClick={() => handleButtonClick(4)} style={{border:"2px solid #b3b3b3",borderRadius:"10px"}}>

              
                              <DataUsageIcon  style={{color:"#b3b3b3",marginBottom:"3px"}}  onClick={() => setGridView(!gridview)} />

              - Specific Period
               </button> */}

              
            </span>{" "}

            </div>

            




          </div>
        </div>
      </div>
      {openedit && (
        <>
          <div className="ws_popup-container ">
            <div className="ws_popup">
              <div
                className="ws_popup-inner"
                style={{
                  borderStyle: "solid",
                  borderColor: "#e8eef5",
                }}
              >
                <div className="ws_popup-title">
                  <h6>Edit Plant Details</h6>
                  <div>
                    <button
                      onClick={() => {
                        setOpenEdit("");
                        setDisableRow("");
                      }}
                    >
                      <h3 style={{ padding: "5px", cursor: "pointer" }}>X</h3>
                    </button>
                  </div>
                </div>

                <form method="post" onSubmit={editSave}>
                  <div className="ws_popup-content" style={{ flexGrow: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        margin: "25px",
                      }}
                    >
                      <div style={{ margin: "13px" }}>
                        <TextField
                          name="plant_name"
                          id="outlined-start-adornment"
                          defaultValue={editDatavalue.rowData[3]}
                          onChange={(e) => {
                            setNewPlantName(e.target.value);
                          }}
                          fullWidth
                          label="Plant Name"
                          focused
                        />
                      </div>
                      <div style={{ margin: "13px" }}>
                        <Select
                          fullWidth
                          onChange={(e) => handleCountryState(e.target.value)}
                          defaultValue={editDatavalue.rowData[1]}
                        >
                          {plantCountry.length > 0 &&
                            plantCountry.map((country, i) => (
                              <MenuItem key={i} value={country.name}>
                                {country.name}
                              </MenuItem>
                            ))}
                        </Select>
                      </div>
                      <div style={{ margin: "13px" }}>
                        <Select
                          fullWidth
                          defaultValue={editDatavalue.rowData[2]}
                          onChange={(e) =>
                            setSelectHandleStateList(e.target.value)
                          }
                        >
                          {
                            (plantState.length > 0 &&
                              console.log("plantState", plantState),
                            // alert("dd"),
                            plantState.map((state, i) => (
                              <MenuItem key={i} value={state.name}>
                                {state.name}
                              </MenuItem>
                            )))
                          }
                        </Select>
                      </div>

                      {/* <Geolocation ref={childRef1} /> */}
                      <div style={{ margin: "auto" }}>
                        <input
                          type="submit"
                          value="Update"
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
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
      {openaddnewplant && (
        <>
          {loading ? (
            <div className="ws_popup-container ">
              <div className="ws_popup">
                <div
                  className="ws_popup-inner"
                  style={{
                    borderStyle: "solid",
                    borderColor: "#e8eef5",
                  }}
                >
                  <div className="ws_popup-title">
                    <h6>New Plant</h6>
                    <div>
                      <button
                        onClick={() => {
                          setOpenAddNewPlant("");
                        }}
                      >
                        <h3 style={{ padding: "5px", cursor: "pointer" }}>X</h3>
                      </button>
                    </div>
                  </div>

                  <form method="post" onSubmit={save}>
                    <div className="ws_popup-content" style={{ flexGrow: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          margin: "25px",
                        }}
                      >
                        <div style={{ margin: "13px" }}>
                          <TextField
                            name="plant_name"
                            placeholder="Plant Name"
                            value={newPlantName}
                            onChange={(e) => {
                              setNewPlantName(e.target.value);
                              setPlantId(plantID+1)
                              setPlantCountryIncrement((plantIncrement)=>[...plantIncrement,{id:plantID}])
                              console.log("plantINcrree",plantIncrement)

                            }}
                            fullWidth
                            label="Name"
                            required
                          />
                        </div>

                        <div style={{ margin: "13px" }}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label1">
                              Country
                            </InputLabel>

                            <Select
                              labelId="demo-simple-select-label1"
                              id="demo-simple-select"
                              label="Country"
                              value={selecthandlecountry}
                              onChange={(e) =>
                                handleCountryState(e.target.value)
                              }
                              fullWidth
                              required
                            >
                              {plantCountry.length > 0 &&
                                plantCountry.map((country, i) => (
                                  <MenuItem key={i} value={country.name}>
                                    {country.name}
                                  </MenuItem>
                                ))}
                            </Select>
                          </FormControl>
                        </div>


                        <div style={{ margin: "13px" }}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label2">
                              Region
                            </InputLabel>

                            <Select
                              labelId="demo-simple-select-label2"
                              id="demo-simple-select"
                              label="Region"
                              required
                              value={selectHandleState}
                              onChange={(e) =>
                                setSelectHandleStateList(e.target.value)
                              }
                              fullWidth
                            >
                              {plantState.length > 0 &&
                                plantState.map((state, i) => (
                                  <MenuItem key={i} value={state.name}>
                                    {state.name}
                                  </MenuItem>
                                ))}
                            </Select>
                          </FormControl>
                        </div>

                        
                        {/* <Geolocation ref={childRef1} /> */}

                        <div style={{ margin: "13px" }}>
                          <TextField
                            id="coordinates-textbox"
                            label="latitude"
                            fullWidth
                            value={latitude}
                            required
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        </div>
                        <div style={{ margin: "13px" }}>
                          <TextField
                            id="coordinates-textbox"
                            label="longitude"
                            fullWidth
                            required
                            value={longitude}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        </div>
                        <div style={{ margin: "auto" }}>
                                  <input
                                    type="submit"
                                    value="Submit"
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
                                    
                                  />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : null}
        </>
      )}

      <CacheProvider value={muiCache} >
        <ThemeProvider theme={createTheme()} className="right-space2">
<div>
 <div style={{position:"absolute",top:"145px",width:"1170px"}}>
   {renderComponent()}

 </div>
</div>

        </ThemeProvider>
      </CacheProvider>
    </>
  );
}
export default PlantTablePopup;
