import React, { useState, useEffect,useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';

import MUIDataTable from "mui-datatables";
import axios from 'axios';
import Pagination from './Pagination';
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import GridViewIcon from "@mui/icons-material/GridView";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
// import Geolocation from "./geolocation.js";
import Geolocation from "./geolocation"
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
// import "./plant.css"
// import "./popup.css"
import "./popup.css"
import "./plant.css"
 
import { PlANT_TITILE } from './text';
 
const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});


const styles = {
  customColumnStyle: {
    marginLeft: '-40px',
    // color: 'pink',
  },

  customColumnStyle2: {
    marginLeft: '-70px',
    color: 'green',
  },
  customColumnStyleAction:{
    marginTop:"20px",
    marginLeft:"40px",
    color: 'pink',

  }


};
 
const SamplePlant = ({call_assett_table,classes }) => {
  const [plantrows, setPlantsRows] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [headercount, setHeadercount] = useState(0);
  const [disablerow, setDisableRow] = useState(false);
  const [editDatavalue, setEditData] = useState([]);
  const [openedit, setOpenEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openaddnewplant, setOpenAddNewPlant] = useState(false);
  const [gridview, setGridView] = useState(false);
  const [sensorloading, setSensorloading] = useState(false);
  const childRef1 = useRef(null);
  const [newPlantName, setNewPlantName] = useState("");
  const [plantCountry, setPlantCountry] = useState([]);
  const [coordinates, setCoordinates] = useState(null);
  const [selecthandlecountry, setSelectHandleCountry] = useState("");
  // sethandleStateList
  const [selectHandleState, setSelectHandleStateList] = useState("");
 
  let [account, setAccount] = useState({});
  let [editaccount, setEditAccount] = useState({});
 
  let [ressendData, setResSendData] = useState({});
  const [plantState, setPlantState] = useState([]);
  const [plantID,setPlantId]=useState(0)
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [showPopup, setShowPopup] = useState({ shown: false });
 
 
  //options
  const [searchBtn, setSearchBtn] = useState(true);
  const [downloadBtn, setDownloadBtn] = useState(false);
  const [printBtn, setPrintBtn] = useState(false);
  const [viewColumnBtn, setViewColumnBtn] = useState(false);
  const [filterBtn, setFilterBtn] = useState(true);
  const [responsive, setResponsive] = useState("vertical");
  const [tableBodyHeight, setTableBodyHeight] = useState("400px");
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
 
 
 
 
 
 
 
 
 
 
 
 
  const {
    offset,
    handleChangePage,
    page,
    rowsPerPage,
    handleChangeRowsPerPage,
  } = Pagination();
 
  useEffect(() => {
    async function fetchPlantData() {
      const GA_URL = "http://127.0.0.1:9090/getlimitplants";
      const result = await axios.get(
        `${GA_URL}?limit=${rowsPerPage}&offset=${offset}`
      );
      if (result && result.data) {
        setPlantsRows(result.data);
        const totalCount = result.headers.get("x-total-count");
        setHeadercount(totalCount);
      } else {
        console.log("result is empty or error");
      }
    }
    fetchPlantData();
  }, [refresh, offset, rowsPerPage]);
 
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
 
 
 
//           const columns = [
//     // {name:"plant_id",label:"Plant ID",
//       { name: "plant_id", label: "Plant ID"   
// },
//     {name:"plant_name",label:"Plant Name",
// },
//     {name:"country",label:"Country"},
//     {name:"region",label:"Region"},
//     {name:"update_time_stamp",label:"TimeStamp"},
//     {
//       name: "plant_id",
//       label: "Actions",
//       sort: false,
//       filter: false,
//       empty: true,
//       options: {
//         customBodyRender: (value, tableMeta, updateValue) => {
//           if (value)
//             return (
//               <div style={{ display: "flex" }} className="left-space">
//                 <Tooltip title="Edit" style={{ margin: "1px" }}>
//                   <IconButton component="span" className="left-space">
//                     <EditIcon onClick={() => editData(tableMeta)} />
//                   </IconButton>
//                 </Tooltip>
//                 <Tooltip title="Delete  " style={{ margin: "1px" }}>
//                   <IconButton component="span">
//                     <DeleteIcon onClick={() => deleteData(value)} />
//                   </IconButton>
//                 </Tooltip>
//               </div>
//             );
//         },
//       },
//     },
   

 
   
//   ];

  const columns = [
  // { name: "plant_id", label: "Plant ID" ,

  { name: "plant_id", label: <div style={{color:"black",marginLeft:"50px"}}>Plant_ID</div> ,

},
  // { name: "plant_name", label: "Plant Name",
  { name: "plant_name", label: <div style={{color:"black",marginLeft:"50px"}}>Plant_Name</div> ,

},
{ name: "country", label: <div style={{color:"black",marginLeft:"80px"}}>Country</div> ,

 },


  // { name: "region", label: "Region"
  { name: "region", label: <div style={{color:"black",marginLeft:"50px"}}>Region</div> ,

 },
  // { name: "update_time_stamp", label: "TimeStamp"
  { name: "update_time_stamp", label: <div style={{color:"black",marginLeft:"200px"}}>TimeStamp</div> ,
 
},
  {
    name: "plant_id",
    // label: "Actions",
    label: <div style={{color:"black",marginLeft:"50px"}}>Actions</div> ,
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
      // customHeadRender: () => (
      //   <div>

      //   <div className={classes.customColumnStyleAction}>Actions</div>

      //   </div>
        
      // ),
    },
  },
];
 
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
console.log("plantState------>",plantState)
 
  let deleteData = (value) => {
    setDisableRow(true);
    setRefresh(true);
    let deletedata = {
      plant_id: value,
    };
   
    // const DELETE_PLANT = process.env.REST_URL + "/deletePlantData2";
    const DELETE_PLANT="http://127.0.0.1:9090/deletePlantData2";
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
 
  const options = {
    // selectableRows: "none",
    scrollY: '600px', // Set the height for vertical scrolling
    rowsPerPage: rowsPerPage,
    rowsPerPageOptions: [5, 10, 25, { label: "All", value: -1 }],
    page: page,
    //
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
    serverSide: true,
    count: headercount,
    //
 
 
 
 
 
    //
 
 
    // searching:false,
    onRowClick: (rowdata) => {
      console.log("call_assett_table", rowdata, "false");
      setDisableRow(true);
      {
        disablerow === true && call_assett_table(rowdata, "false");
      }
    },
    onChangePage: (currentPage) => {
      handleChangePage(currentPage);
    },
    onChangeRowsPerPage: (numberOfRows) => {
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
   
    // Other options...
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
      // const CREATE = process.env.REST_URL + "/insertPlantData";
      const CREATE="http://127.0.0.1:9090/insertPlantData"
 
      axios
        .post(CREATE, sendData, customConfig)
        .then((res) => {
          alert("Plant Details Submitted Successfully.");
          setLoading(false);
          setResSendData(res.data);
          console.log("Plant Details res",res)
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
    // const Update = process.env.REST_URL + "/updatePlantData";
    const Update="http://127.0.0.1:9090/updatePlantData"
 
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
 
 
  const triggerAsset = () => {
    setTimeout(() => {}, 5000);
  };
 
  call_assett_table(ressendData, "true");
 
  console.log("coordinates", coordinates);
 
  return (
    <>
    {/* <h4 align="center">Tables</h4> */}
    {/* <h4 align="center">Tables</h4> */}
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
            <span
              style={{
                color: "black",
                fontSize: "large",
              }}
            >
              <IconButton component="span">
                <GridViewIcon onClick={() => setGridView(!gridview)} />
              </IconButton>
            </span>{" "}
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
                          defaultValue={editDatavalue.rowData[1]}
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
                          defaultValue={editDatavalue.rowData[3]}
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
 
                      <Geolocation ref={childRef1} />
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
 
    <div className='table-container'>
      <CacheProvider value={muiCache}>
        <ThemeProvider theme={createTheme()}>
          <MUIDataTable
            data={plantrows}
            columns={columns}
            options={options}
            title={'Plants'} 
          />
        </ThemeProvider>
      </CacheProvider>
    </div>
    </>
  );
};
 
// export default SamplePlant;
export default withStyles(styles)(SamplePlant);









// import React, { useState, useEffect,useRef } from 'react';
// import MUIDataTable from "mui-datatables";
// import axios from 'axios';
// import Pagination from './Pagination';
// import createCache from "@emotion/cache";
// import { CacheProvider } from "@emotion/react";
// import { ThemeProvider } from "@mui/material/styles";
// import { createTheme } from "@mui/material/styles";
// import Tooltip from "@mui/material/Tooltip";
// import IconButton from "@mui/material/IconButton";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import AddIcon from "@mui/icons-material/Add";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import GridViewIcon from "@mui/icons-material/GridView";
// import TextField from "@mui/material/TextField";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// // import Geolocation from "./geolocation.js";
// import Geolocation from "./geolocation"
// import InputLabel from "@mui/material/InputLabel";
// import FormControl from "@mui/material/FormControl";
// // import "./plant.css"
// // import "./popup.css"
// import "./popup.css"
// import "./plant.css"
// import "./SamplePlant.css"
// import { withStyles } from '@material-ui/core/styles';
// import { PlANT_TITILE } from './text';
// import { green } from '@mui/material/colors';

// const muiCache = createCache({
//   key: "mui-datatables",
//   prepend: true,
// });

// const styles = {
//   customColumnStyle: {
//     marginLeft: '-70px',
//     color: 'pink',
//   },

//   customColumnStyle2: {
//     marginLeft: '-70px',
//     color: 'green',
//   },
//   customColumnStyleAction:{
//     marginTop:"20px",
//     marginLeft:"40px",
//     color: 'black',

//   }


// };
 
// const SamplePlant = ({call_assett_table,classes  }) => {
//   const [plantrows, setPlantsRows] = useState([]);
//   const [refresh, setRefresh] = useState(true);
//   const [headercount, setHeadercount] = useState(0);
//   const [disablerow, setDisableRow] = useState(false);
//   const [editDatavalue, setEditData] = useState([]);
//   const [openedit, setOpenEdit] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [openaddnewplant, setOpenAddNewPlant] = useState(false);
//   const [gridview, setGridView] = useState(false);
//   const [sensorloading, setSensorloading] = useState(false);
//   const childRef1 = useRef(null);
//   const [newPlantName, setNewPlantName] = useState("");
//   const [plantCountry, setPlantCountry] = useState([]);
//   const [coordinates, setCoordinates] = useState(null);
//   const [selecthandlecountry, setSelectHandleCountry] = useState("");
//   // sethandleStateList
//   const [selectHandleState, setSelectHandleStateList] = useState("");

//   let [account, setAccount] = useState({});
//   let [editaccount, setEditAccount] = useState({});

//   let [ressendData, setResSendData] = useState({});
//   const [plantState, setPlantState] = useState([]);
//   const [plantID,setPlantId]=useState(0)
//   const [latitude, setLatitude] = useState("");
//   const [longitude, setLongitude] = useState("");
//   const [showPopup, setShowPopup] = useState({ shown: false });


//   //options
//   const [searchBtn, setSearchBtn] = useState(true);
//   const [downloadBtn, setDownloadBtn] = useState(false);
//   const [printBtn, setPrintBtn] = useState(false);
//   const [viewColumnBtn, setViewColumnBtn] = useState(false);
//   const [filterBtn, setFilterBtn] = useState(true);
//   const [responsive, setResponsive] = useState("vertical");
//   const [tableBodyHeight, setTableBodyHeight] = useState("400px");
//   const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");











 
//   const {
//     offset,
//     handleChangePage,
//     page,
//     rowsPerPage,
//     handleChangeRowsPerPage,
//   } = Pagination();
 
//   useEffect(() => {
//     async function fetchPlantData() {
//       const GA_URL = "http://127.0.0.1:9090/getlimitplants";
//       const result = await axios.get(
//         `${GA_URL}?limit=${rowsPerPage}&offset=${offset}`
//       );
//       if (result && result.data) {
//         setPlantsRows(result.data);
//         const totalCount = result.headers.get("x-total-count");
//         setHeadercount(totalCount);
//       } else {
//         console.log("result is empty or error");
//       }
//     }
//     fetchPlantData();
//   }, [refresh, offset, rowsPerPage]);
// console.log("setPlantsRows-------------->",plantrows)
//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:9090/api/countries")
//       .then((res) => setPlantCountry(res.data))
//       .catch((err) => {
//         console.log(err);
//       });
//     // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJuYWdhcmFqYW5ld2xpZmVAZ21haWwuY29tIiwiYXBpX3Rva2VuIjoibFFsZlVoN1ZQTHFTSzZ5U2t2Sk9PeEVCci1XdzlWS25uSmpQV0pTSDloclZlUzdNd1JLdWNmQTdFLW1zdmVxMW42dyJ9LCJleHAiOjE2ODE4MDUwMzh9.Dsp5lJiscsve2KhcvolEOqfD-vtPZiOUc3ztT3ogywA
//   }, []);
//   useEffect(() => {
//     axios
//       .get(
//         `http://127.0.0.1:9090/api/coordinates?country=${selecthandlecountry}&region=${selectHandleState}`
//       )
//       .then((res) => {
//         setLatitude(res.data.latitude);
//         setLongitude(res.data.longitude);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJuYWdhcmFqYW5ld2xpZmVAZ21haWwuY29tIiwiYXBpX3Rva2VuIjoibFFsZlVoN1ZQTHFTSzZ5U2t2Sk9PeEVCci1XdzlWS25uSmpQV0pTSDloclZlUzdNd1JLdWNmQTdFLW1zdmVxMW42dyJ9LCJleHAiOjE2ODE4MDUwMzh9.Dsp5lJiscsve2KhcvolEOqfD-vtPZiOUc3ztT3ogywA
//   }, [selectHandleState]);
//   console.log("countries", plantCountry);
 


//           const columns = [
//     {name:"plant_id",label:"Plant ID",options: { customBodyRender: (value) => <div className={classes.customColumnStyle}>{value}</div> }
// },
//     {name:"plant_name",label:"Plant Name",
// },
//     {name:"country",label:"Country"},
//     {name:"region",label:"Region"},
//     {name:"update_time_stamp",label:"TimeStamp"},
//     {
//       name: "plant_id",
//       label: "Actions",
//       sort: false,
//       filter: false,
//       empty: true,
//       options: {
//         customBodyRender: (value, tableMeta, updateValue) => {
//           if (value)
//             return (
//               <div style={{ display: "flex" }} className="left-space">
//                 <Tooltip title="Edit" style={{ margin: "1px" }}>
//                   <IconButton component="span" className="left-space">
//                     <EditIcon onClick={() => editData(tableMeta)} />
//                   </IconButton>
//                 </Tooltip>
//                 <Tooltip title="Delete  " style={{ margin: "1px" }}>
//                   <IconButton component="span">
//                     <DeleteIcon onClick={() => deleteData(value)} />
//                   </IconButton>
//                 </Tooltip>
//               </div>
//             );
//         },
//       },
//     },
   

   
//   ];

// // const columns = [
// //   { name: "plant_id", label: "Plant ID", options: { customBodyRender: (value) => <div className={classes.customColumnStyle}>{value}</div> } },
// //   { name: "plant_name", label: "Plant Name" },
// //   { name: "country", label: "Country" },
// //   { name: "region", label: "Region" },
// //   { name: "update_time_stamp", label: "TimeStamp" },
// //   {
// //     name: "plant_id",
// //     label: "Actions",
// //     sort: false,
// //     filter: false,
// //     empty: true,
// //     options: {
// //       customBodyRender: (value, tableMeta, updateValue) => {
// //         if (value)
// //           return (
// //             <div style={{ display: "flex" }} className="left-space">
// //               <Tooltip title="Edit" style={{ margin: "1px" }}>
// //                 <IconButton component="span" className="left-space">
// //                   <EditIcon onClick={() => editData(tableMeta)} />
// //                 </IconButton>
// //               </Tooltip>
// //               <Tooltip title="Delete  " style={{ margin: "1px" }}>
// //                 <IconButton component="span">
// //                   <DeleteIcon onClick={() => deleteData(value)} />
// //                 </IconButton>
// //               </Tooltip>
// //             </div>
// //           );
// //       },
// //       customHeadRender: () => (
// //         <div className={classes.customColumnStyleAction}>Actions</div>
// //       ),
// //     },
// //   },
// // ];

  
// function handleFileUpload(event) {
//   setRefresh(true);
//   event.preventDefault();
//   const file = event.target.files[0];
//   const formData = new FormData();
//   formData.append("file", event.target.files[0]);
//   const reader = new FileReader();
//   reader.readAsText(file);
//   reader.onload = async function () {
//     // const csvData = reader.result;
//     // const senddata = JSON.stringify(csvData);
//     console.log("formData", formData);
//     let header = {
//       "Content-Type": "application/json",
//     };
//     axios
//       .post("http://localhost:9090/upload_Files", formData, header)
//       .then((response) => {
//         alert("File Uploaded Successfully");
//         setLoading(false);
//         setRefresh(false);
//         // Do something with the response
//       })

//       .catch((error) => {
//         console.log(error);
//         alert("Upload Failed", error);

//         // Handle the error
//       });
//   };
// }

// const handleCountryState = (country) => {
//   console.log("");
//   setSelectHandleCountry(country);
//   const C_URL = `http://127.0.0.1:9090/api/regions?country=${country}`;

//   axios.get(C_URL).then((res) => setPlantState(res.data));
// };
// console.log("plantState------>",plantState)

//   let deleteData = (value) => {
//     setDisableRow(true);
//     setRefresh(true);
//     let deletedata = {
//       plant_id: value,
//     };
    
//     // const DELETE_PLANT = process.env.REST_URL + "/deletePlantData2";
//     const DELETE_PLANT="http://127.0.0.1:9090/deletePlantData2";
//     axios
//       .post(`${DELETE_PLANT}`, deletedata)
//       .then((response) => {
//         setDisableRow("");
//         alert("Selected Plant Info Deleted Successfully");
//         setRefresh(false);
//       })
//       .catch((error) => {
//         console.log(error);
//         setDisableRow(false);
//       });
//   };
//   const editData = (value) => {
//     setDisableRow(true);
//     setEditData(value);
//     setOpenEdit(true);
//     setDisableRow(false);
//   };
 
//   const options = {
//     // selectableRows: "none",
//     scrollY: '600px', // Set the height for vertical scrolling
//     rowsPerPage: rowsPerPage,
//     rowsPerPageOptions: [5, 10, 25, { label: "All", value: -1 }],
//     page: page,
//     //
//     search: searchBtn,
//     download: downloadBtn,
//     print: printBtn,
//     viewColumns: viewColumnBtn,
//     filter: filterBtn,
//     filterType: "dropdown",
//     responsive,
//     tableBodyHeight,
//     tableBodyMaxHeight,
//     selectableRows: false,
//     serverSide: true,
//     count: headercount,
//     //





//     //


//     // searching:false,
//     onRowClick: (rowdata) => {
//       console.log("call_assett_table", rowdata, "false");
//       setDisableRow(true);
//       {
//         disablerow === true && call_assett_table(rowdata, "false");
//       }
//     },
//     onChangePage: (currentPage) => {
//       handleChangePage(currentPage);
//     },
//     onChangeRowsPerPage: (numberOfRows) => {
//       handleChangeRowsPerPage(numberOfRows);
//     },
//     customToolbar: () => {
//       return (
//         <>
        
//           <input
//             type="file"
//             accept=".csv"
//             onChange={handleFileUpload}
//             id="file-input"
//             style={{ display: "none" }}
//           />

//           <Tooltip title="Upload" style={{ margin: "5px" }}>
//             <IconButton component="span">
//               <label htmlFor="file-input">
//                 <CloudUploadIcon />
//               </label>
//             </IconButton>
//           </Tooltip>


//           <Tooltip title="Add" style={{ margin: "5px" }}>
//             <IconButton component="span">
//               <AddIcon onClick={() => setOpenAddNewPlant(true)} />
//             </IconButton>
//           </Tooltip>
//         </>
//       );
//     },
    
//     // Other options...
//   };
  
//   let save = (e) => {
//     e.preventDefault();
//     setPlantId(plantID+1)||
//       console.log("plants count",plantID)
//     if (
//       !newPlantName ||
//       !selecthandlecountry ||
//       !selectHandleState ||
//       !latitude ||
//       !longitude
//     ) {
//     } else {
//       setShowPopup({ shown: !showPopup.shown });
//       setLoading(false);
//       // triggerAssetfun();
//       setSensorloading(true);
//       triggerAsset();
//       account["plant_name"] = newPlantName;
//       // let asdata = childRef1.current.getStateValue();
//       // console.log("selecthandlecountry");
//       let acobj2 = {
//         country: selecthandlecountry,
//         region: selectHandleState,
//         latitude: latitude,
//         longitude: longitude,
//       };
//       let acobj = {
//         ...account,
//         ...acobj2,
//       };

//       setAccount(acobj);
//       let sendData = JSON.stringify(acobj);
//       console.log("sendData", sendData);
     
//       console.log("plants count:",plantID)
     
//       let customConfig = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };
//       // const CREATE = process.env.REST_URL + "/insertPlantData";
//       const CREATE="http://127.0.0.1:9090/insertPlantData"

//       axios
//         .post(CREATE, sendData, customConfig)
//         .then((res) => {
//           alert("Plant Details Submitted Successfully.");
//           setLoading(false);
//           setResSendData(res.data);
//           console.log("Plant Details res",res)
//           // call_assett_table(res.data, "newasset");
//           setSensorloading(true);
//         })
//         .catch((err) => {
//           console.log("Error Post Data", err);
//           alert("err");
//         });
//     }
//   };

  
//   let editSave = (e) => {
//     e.preventDefault();
//     setLoading(false);
//     setSensorloading(true);
//     setRefresh(true);
//     let asdata = childRef1.current.getStateValue();
//     let acobj2 = {
//       plant_id: editDatavalue.rowData[0],
//       plant_name: newPlantName,
//       country: selecthandlecountry,
//       region: selectHandleState,
//     };
//     // console.log("sendData edit acobj", acobj2);

//     let acobj = {
//       ...editaccount,
//       ...asdata,
//       ...acobj2,
//     };
//     // console.log("sendData edit acobj", acobj);
//     setEditAccount(acobj);
//     // console.log("sendData edit editaccount", editaccount);

//     let sendData = JSON.stringify(acobj);

//     // console.log("sendData edit data", sendData);

//     let customConfig = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     // const Update = process.env.REST_URL + "/updatePlantData";
//     const Update="http://127.0.0.1:9090/updatePlantData"

//     axios
//       .post(Update, sendData, customConfig)
//       .then((res) => {
//         alert("Plant Details Updated Successfully");
//         // console.log("Update  sucessfully res", res);
//         // setResSendData(res.data);
//         setDisableRow("");
//         setOpenEdit("");
//         setSensorloading(true);
//         setRefresh(false);
//       })
//       .catch((err) => {
//         console.log("Error Post Data", err);
//         alert("err");
//         setOpenEdit("");
//         setDisableRow("");
//       });
//   };


//   const triggerAsset = () => {
//     setTimeout(() => {}, 5000);
//   };
  
//   call_assett_table(ressendData, "true");

//   console.log("coordinates", coordinates);
 
//   return (
//     <>
//     {/* <h4 align="center">Tables</h4> */}
//     {/* <h4 align="center">Tables</h4> */}
//     <div style={{ margin: "13px" }}>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             marginTop: "-17px",
//           }}
//         >
//           <div>
//             <span
//               style={{
//                 color: "black",
//                 fontSize: "large",
//               }}
//             >
//               {PlANT_TITILE}
//             </span>
//           </div>
//           <div>
//             <span
//               style={{
//                 color: "black",
//                 fontSize: "large",
//               }}
//             >
//               <IconButton component="span">
//                 <GridViewIcon onClick={() => setGridView(!gridview)} />
//               </IconButton>
//             </span>{" "}
//           </div>
//         </div>
//       </div>
//       {openedit && (
//         <>
//           <div className="ws_popup-container ">
//             <div className="ws_popup">
//               <div
//                 className="ws_popup-inner"
//                 style={{
//                   borderStyle: "solid",
//                   borderColor: "#e8eef5",
//                 }}
//               >
//                 <div className="ws_popup-title">
//                   <h6>Edit Plant Details</h6>
//                   <div>
//                     <button
//                       onClick={() => {
//                         setOpenEdit("");
//                         setDisableRow("");
//                       }}
//                     >
//                       <h3 style={{ padding: "5px", cursor: "pointer" }}>X</h3>
//                     </button>
//                   </div>
//                 </div>

//                 <form method="post" onSubmit={editSave}>
//                   <div className="ws_popup-content" style={{ flexGrow: 1 }}>
//                     <div
//                       style={{
//                         display: "flex",
//                         flexDirection: "column",
//                         margin: "25px",
//                       }}
//                     >
//                       <div style={{ margin: "13px" }}>
//                         <TextField
//                           name="plant_name"
//                           id="outlined-start-adornment"
//                           defaultValue={editDatavalue.rowData[1]}
//                           onChange={(e) => {
//                             setNewPlantName(e.target.value);
//                           }}
//                           fullWidth
//                           label="Plant Name"
//                           focused
//                         />
//                       </div>
//                       <div style={{ margin: "13px" }}>
//                         <Select
//                           fullWidth
//                           onChange={(e) => handleCountryState(e.target.value)}
//                           defaultValue={editDatavalue.rowData[3]}
//                         >
//                           {plantCountry.length > 0 &&
//                             plantCountry.map((country, i) => (
//                               <MenuItem key={i} value={country.name}>
//                                 {country.name}
//                               </MenuItem>
//                             ))}
//                         </Select>
//                       </div>
//                       <div style={{ margin: "13px" }}>
//                         <Select
//                           fullWidth
//                           defaultValue={editDatavalue.rowData[2]}
//                           onChange={(e) =>
//                             setSelectHandleStateList(e.target.value)
//                           }
//                         >
//                           {
//                             (plantState.length > 0 &&
//                               console.log("plantState", plantState),
//                             // alert("dd"),
//                             plantState.map((state, i) => (
//                               <MenuItem key={i} value={state.name}>
//                                 {state.name}
//                               </MenuItem>
//                             )))
//                           }
//                         </Select>
//                       </div>

//                       <Geolocation ref={childRef1} />
//                       <div style={{ margin: "auto" }}>
//                         <input
//                           type="submit"
//                           value="Update"
//                           style={{
//                             width: "153px",
//                             height: "35px",
//                             color: "white",
//                             background:
//                               "transparent linear-gradient(256deg, #0479B2 0%, #1B5D94 100%) 0% 0% no-repeat padding-box",
//                             boxShadow: "3px 3px 7px #0873AC0F",
//                             borderRadius: " 10px",
//                             opacity: 1,
//                           }}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//       {openaddnewplant && (
//         <>
//           {loading ? (
//             <div className="ws_popup-container ">
//               <div className="ws_popup">
//                 <div
//                   className="ws_popup-inner"
//                   style={{
//                     borderStyle: "solid",
//                     borderColor: "#e8eef5",
//                   }}
//                 >
//                   <div className="ws_popup-title">
//                     <h6>New Plant</h6>
//                     <div>
//                       <button
//                         onClick={() => {
//                           setOpenAddNewPlant("");
//                         }}
//                       >
//                         <h3 style={{ padding: "5px", cursor: "pointer" }}>X</h3>
//                       </button>
//                     </div>
//                   </div>

//                   <form method="post" onSubmit={save}>
//                     <div className="ws_popup-content" style={{ flexGrow: 1 }}>
//                       <div
//                         style={{
//                           display: "flex",
//                           flexDirection: "column",
//                           margin: "25px",
//                         }}
//                       >
//                         <div style={{ margin: "13px" }}>
//                           <TextField
//                             name="plant_name"
//                             placeholder="Plant Name"
//                             value={newPlantName}
//                             onChange={(e) => {
//                               setNewPlantName(e.target.value);
//                             }}
//                             fullWidth
//                             label="Name"
//                             required
//                           />
//                         </div>

//                         <div style={{ margin: "13px" }}>
//                           <FormControl fullWidth>
//                             <InputLabel id="demo-simple-select-label1">
//                               Country
//                             </InputLabel>

//                             <Select
//                               labelId="demo-simple-select-label1"
//                               id="demo-simple-select"
//                               label="Country"
//                               value={selecthandlecountry}
//                               onChange={(e) =>
//                                 handleCountryState(e.target.value)
                                
//                               }
//                               fullWidth
//                               required
//                             >
//                               {plantCountry.length > 0 &&
//                                 plantCountry.map((country, i) => (
//                                   <MenuItem key={i} value={country.name}>
//                                     {country.name}
//                                   </MenuItem>
//                                 ))}
//                             </Select>
//                           </FormControl>
//                         </div>
//                         <div style={{ margin: "13px" }}>
//                           <FormControl fullWidth>
//                             <InputLabel id="demo-simple-select-label2">
//                               Region
//                             </InputLabel>

//                             <Select
//                               labelId="demo-simple-select-label2"
//                               id="demo-simple-select"
//                               label="Region"
//                               required
//                               value={selectHandleState}
//                               onChange={(e) =>
//                                 setSelectHandleStateList(e.target.value)
//                               }
//                               fullWidth
//                             >
//                               {plantState.length > 0 &&
//                                 plantState.map((state, i) => (
//                                   <MenuItem key={i} value={state.name}>
//                                     {state.name}
//                                   </MenuItem>
//                                 ))}
//                             </Select>
//                           </FormControl>
//                         </div>
//                         {/* <Geolocation ref={childRef1} /> */}

//                         <div style={{ margin: "13px" }}>
//                           <TextField
//                             id="coordinates-textbox"
//                             label="latitude"
//                             fullWidth
//                             value={latitude}
//                             required
//                             InputProps={{
//                               readOnly: true,
//                             }}
//                           />
//                         </div>
//                         <div style={{ margin: "13px" }}>
//                           <TextField
//                             id="coordinates-textbox"
//                             label="longitude"
//                             fullWidth
//                             required
//                             value={longitude}
//                             InputProps={{
//                               readOnly: true,
//                             }}
//                           />
//                         </div>
//                         <div style={{ margin: "auto" }}>
//                           <input
//                             type="submit"
//                             value="Submit"
//                             style={{
//                               width: "153px",
//                               height: "35px",
//                               color: "white",
//                               background:
//                                 "transparent linear-gradient(256deg, #0479B2 0%, #1B5D94 100%) 0% 0% no-repeat padding-box",
//                               boxShadow: "3px 3px 7px #0873AC0F",
//                               borderRadius: " 10px",
//                               opacity: 1,
//                             }}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           ) : null}
//         </>
//       )}

//     <div className='table-container'>
//       <CacheProvider value={muiCache}>
//         <ThemeProvider theme={createTheme()}>
//           <MUIDataTable
//             data={plantrows}
//             columns={columns}
//             options={options}
//           />
//         </ThemeProvider>
//       </CacheProvider>
//     </div>
//     </>
//   );
// };
 
// // export default SamplePlant;

// export default withStyles(styles)(SamplePlant);