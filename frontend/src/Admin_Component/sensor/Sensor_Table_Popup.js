import MUIDataTable from "mui-datatables";
import React, { useState, useEffect } from "react";
import PublicIcon from "@mui/icons-material/Public";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SettingsIcon from "@mui/icons-material/Settings";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import GridViewIcon from "@mui/icons-material/GridView";

import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import Pagination from "../Pagination/Pagination.jsx";
import Pagination from "../Pagination";
import CircleGraph from "./CircleGraph";
import Threshold from "../Threshold_Table_Popup/Threshold"
// import Threshold from "../Threshold/Threshold_Table_Popup";
// import Threshold from "../Threshold_Table_Popup/Threshold";
// import AppDashbord from "../../../App";
// import AssetTable from "./CircleGraph";
const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});

function DataSensorTable({
  selected_plant_data,
  selected_asset_data,
  call_Threshold_table,
  trigger_hide_sensortablefun,
  call_assett_table,
}) {
  // console.log("selected_asset_data Bus", selected_asset_data);
  const [responsive, setResponsive] = useState("vertical");
  const [tableBodyHeight, setTableBodyHeight] = useState("400px");
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
  const [searchBtn, setSearchBtn] = useState(true);
  const [downloadBtn, setDownloadBtn] = useState(false);
  const [printBtn, setPrintBtn] = useState(false);
  const [viewColumnBtn, setViewColumnBtn] = useState(false);
  const [filterBtn, setFilterBtn] = useState(true);
  const [assets, setAssets] = useState([]);
  const [selectSensorname, setSelectSensorName] = useState("");
  const [sensorlist, setSensorList] = useState({});
  const [sensordata, setSensorData] = useState(false);
  const [gridview, setGridView] = useState(false);
  const [openthreshold, setOpenThreshold] = useState(false);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assetloading, setassetLoading] = useState("");
  let [account, setAccount] = useState({});
  const [selectedAsset, setSelectedAsset] = useState("");
  const [openpopup, setOpenPopup] = useState("");
  const [sendassetnameid, setAssetNameId] = useState({});
  const [openedit, setOpenEdit] = useState(false);
  const [editDatavalue, setEditData] = useState([]);
  let [editaccount, setEditAccount] = useState({});
  const [refresh, setRefresh] = useState(true);
  const [opensetting1, setOpensetting1] = useState(false);
  const [AssetTableopen, setAssetTableopen] = useState(false);
  const [callassetTable, setCallAssetTable] = useState(false);
  const [headercount, setHeadercount] = useState(0);
  const [sendselectdata, setSelectData] = useState({});

  const {
    offset,
    handleChangePage,
    page,
    rowsPerPage,
    handleChangeRowsPerPage,
  } = Pagination();
  useEffect(() => {
    setRefresh(false);
    setSelectData(selected_asset_data)
    setAssetNameId(selected_asset_data);
    setOpenPopup(selected_plant_data.popup);
    async function fetchAssetData() {
      //getsensorList/1?limit=2&offset=0
    //   const GA_URL = process.env.REST_URL + "/getsensorList/";
      const GA_URL="http://127.0.0.1:9090/getsensorList/"

      // const GA_URL_Thres = process.env.REST_URL + "/getThresholdList/";

      let assetid = selected_asset_data.id;
      if (assetid) {
        const result = await axios.get(
          `${GA_URL}${assetid}?limit=${rowsPerPage}&offset=${offset}`
        );
        // const result2 = await axios.get(
        //   `${GA_URL_Thres}${assetid}?limit=${rowsPerPage}&offset=${offset}`
        // );
        if (result && result.data) {
          // console.log("result list", result.data);
          setAssets(result.data);
          setRows(result.data);
          // setSensorList(result2.data);
          const totalCount = result.headers.get("x-total-count");
          setHeadercount(totalCount);
        } else {
          console.log("result is empty or error");
        }
      } else {
        console.log("assetid is undefined");
        // alert(assetid)
      }

      // const result2 = await axios.get(
      //   `${GA_URL_Thres}${assetid}?limit=${rowsPerPage}&offset=${offset}`
      // );

      // const result = await axios.get(`${GA_URL}${assetid}`);

      // if (result && result.data) {
      //   setAssets(result.data);
      //   setRows(result.data);
      // } else {
      //   console.log("result is empty or error");
      // }
    }
    fetchAssetData();
  }, [refresh, rowsPerPage, offset]);

  console.log("sensor plant data", selected_plant_data);

  useEffect(() => {
    async function fetchSensorData() {
      //getsensorList/1?limit=2&offset=0
      // const GA_URL = process.env.REST_URL + "/getsensorList/";

    //   const GA_URL_Thres = process.env.REST_URL + "/getThresholdList/";
      const GA_URL_Thres="http://127.0.0.1:9090/getThresholdList/"

      let assetid = selected_asset_data.id;
      if (assetid) {
        // const result = await axios.get(
        //   `${GA_URL}${assetid}?limit=${rowsPerPage}&offset=${offset}`
        // );
        const result2 = await axios.get(
          `${GA_URL_Thres}${assetid}?limit=${rowsPerPage}&offset=${offset}`
        );
        if (result2 && result2.data) {
          // console.log("result list resutl2", result2.data);
          // setAssets(result.data);
          // setRows(result.data);
          setSensorList(result2.data);
          setSensorData(true);
          const totalCount = result2.headers.get("x-total-count");
          setHeadercount(totalCount);
        } else {
          console.log("result is empty or error");
        }
      } else {
        console.log("assetid is undefined");
      }
    }

    if (opensetting1 === true) {
      fetchSensorData();
    }
  }, [opensetting1]);

  // useEffect(() => {
  //   async function fetchThersData() {
  //     const GA_URL = process.env.REST_URL + "/getThreshold";
  //     const result = await axios.get(`${GA_URL}`);
  //     if (result && result.data) {
  //       console.log("result list", result.data);
  //       setAssets(result.data);
  //       setRows(result.data);
  //       const totalCount = result.headers.get("x-total-count");
  //       setHeadercount(totalCount);
  //     } else {
  //       console.log("result is empty or error");
  //     }
  //   }

  //   fetchThersData();
  // }, [openthreshold]);
  let deleteData = (value, assetid) => {
    // alert("deleteData", value);

    // console.log("deleteData 1", value);
    // console.log("deleteData 2", assetid);

    let deletedata = {
      asset_id: assetid.id,
      sensorgroup_id: value,
    };
    // const DELETE_PLANT = process.env.REST_URL + "/deleteSensor";
    const DELETE_PLANT="http://127.0.0.1:9090/deleteSensor"
    axios
      .post(`${DELETE_PLANT}`, deletedata)
      .then((response) => {
        // console.log("delete sucssfully", response);
        alert("Selected Plant Info Deleted Successfully");
        setRefresh(false);
        setRefresh(true);
      })
      .catch((error) => {
        console.log(error);
        setRefresh(true);
      });
  };
  const editData = (value) => {
    setEditData(value);
    setOpenEdit(true);
  };
  const columns = [
    {
      name: "sensorgroup_id",
      // label: " ID",
      label: <div style={{color:"black",marginLeft:"30px"}}>ID</div> ,

    },
    {
      name: "name",
      // label: " Sensor Name",
      label: <div style={{color:"black",marginLeft:"150px"}}>Sensor_Name</div> ,

      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "component",
      // label: "Component",
      label: <div style={{color:"black",marginLeft:"50px"}}>Component</div> ,

    },
    {
      name: "endpoint",
      label: <div style={{color:"black",marginLeft:"50px"}}>Endpoint</div> ,

      // label: "Endpoint",
    },
    {
      name: "update_time_stamp",
      // label: "Date",
      label: <div style={{color:"black",marginLeft:"100px"}}>Date</div> ,

    },
    {
      name: "sensorgroup_id",
      // label: "Actions",
      label: <div style={{color:"black",marginLeft:"50px"}}>Actions</div> ,

      sort: false,
      filter: false,
      empty: true,
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          if (value)
            return (
              <>
                <Tooltip title="Edit" style={{ margin: "5px" }}>
                  <IconButton component="span">
                    <EditIcon onClick={() => editData(tableMeta)} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete  " style={{ margin: "5px" }}>
                  <IconButton component="span">
                    <DeleteIcon
                      onClick={() => deleteData(value, selected_asset_data)}
                    />
                  </IconButton>
                </Tooltip>
              </>
            );
        },
      },
    },
  ];
  function call_sensor_popup_table(arg1, arg2) {
    let obj = {
      asset_id: arg1[0],
      asset_name: arg1[1],
    };

    // setPopupAssetData(obj);
  }
  function handleFileUpload(event) {
    event.preventDefault();
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = async function () {
      const csvData = reader.result;
      const senddata = JSON.stringify(csvData);

      let header = {
        "Content-Type": "application/json",
      };
      axios
        .post("http://localhost:9090/upload_Files", formData, header)
        .then((response) => {
          alert("File Uploaded Successfully");
          setLoading(false);
          setRefresh(true);
          // Do something with the response
        })

        .catch((error) => {
          console.log(error);
          alert("Upload Failed", error);

          // Handle the error
        });
    };
  }
  const options = {
    search: searchBtn,
    // onRowClick: (rowdata) => {
    //   // console.log("call_Thereshold_table", rowdata);
    //   // handleEdit(rowdata[0]);
    //   trigger_hide_sensortablefun();
    //   call_Threshold_table(rowdata, selected_plant_data, selected_asset_data);
    // },
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
    serverSide: true,
    count: headercount,
    page: page,
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
              <AddIcon onClick={() => setOpenPopup(true)} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Settings" style={{ margin: "5px" }}>
            <IconButton component="span">
              <SettingsIcon onClick={() => setOpensetting1(true)} />
            </IconButton>
          </Tooltip>
        </>
      );
    },
    onTableChange: (action, state) => {
      console.log(action);
      console.dir(state);
    },
  };
  let sensorsave = (e) => {
    e.preventDefault();
    setLoading(false);
    setassetLoading("");
    setOpenPopup("");
    setRefresh(true);
    let sendData = JSON.stringify(account);
    // console.log("sendData Sensor", JSON.stringify(account));

    let customConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // const CREATE = process.env.REST_URL + "/insertsensorData";
    // const CREATE="http://127.0.0.1:9090/insertsensorData"
    const CREATE="http://127.0.0.1:9090/insertsensorData2"


    axios
      .post(CREATE, sendData, customConfig)
      .then((res) => {
        // console.log("sensor responce", res);
        call_Threshold_table(sendselectdata, res.data)
        alert("Sensor Details Submitted Successfully..");
        setRefresh(false);
      })
      .catch((err) => {
        console.log("Error Post Data", err);
        alert("err");
      });
  };

  let sendThresholdsave = (e) => {
    e.preventDefault();
    setLoading(false);
    setassetLoading("");
    setOpenPopup("");
    setRefresh(true);
    let sendData = JSON.stringify(account);
    // console.log("insertThresholdData", JSON.stringify(account));

    let customConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // const CREATE = process.env.REST_URL + "/insertThresholdData";
    const CREATE="http://127.0.0.1:9090/insertThresholdData";

    axios
      .post(CREATE, sendData, customConfig)
      .then((res) => {
        alert("Threshold Details Submitted Successfully..");
        setRefresh(false);
        setOpensetting1("");
        setOpenThreshold(true);
      })
      .catch((err) => {
        console.log("Error Post Data", err);
        alert("err");
      });
  };
  const handleAssetChange = (event) => {
    setSelectedAsset(event.target.value);
  };
  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let asset_idobj = {
      asset_id: selected_asset_data.id,
    };

    account[name] = value;
    let acobj = {
      ...account,
      ...asset_idobj,
    };
    setAccount(acobj);
  };
  let ThresholdhandleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let asset_idobj = {
      sensorgroup_id: selectSensorname,
    };

    account[name] = value;
    let acobj = {
      ...account,
      ...asset_idobj,
    };
    setAccount(acobj);
  };
  let editSave = (e) => {
    e.preventDefault();
    setLoading(false);
    setRefresh(true);
    let sendData = JSON.stringify(editaccount);
    // console.log("sendData editaccount", JSON.stringify(editaccount));

    let customConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // const Update = process.env.REST_URL + "/updatesensorData";
    const Update="http://127.0.0.1:9090/updatesensorData"

    axios
      .post(Update, sendData, customConfig)
      .then((res) => {
        alert("Plant Details Updated Successfully");
        // console.log("Update  sucessfully res", res);
        setRefresh(false);
        // setResSendData(res.data);

        setOpenEdit("");
      })
      .catch((err) => {
        console.log("Error Post Data", err);
        alert("err");
        setOpenEdit("");
      });
  };
  const callAsset = () => {
    // setAssetTableopen(true);
    // const arrayobj1 = selected_plant_data.map((item) => item);
    const id=selected_plant_data.id
    const name=selected_plant_data.name
    console.log("Call Asset", selected_plant_data);
    const arrayobj = [id,name];
    call_assett_table(arrayobj, "false");
  };
  let handleEditChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    account[name] = value;
    let acobj2 = {
      asset_id: selected_asset_data.id,
      sensorgroup_id: editDatavalue.rowData[0],
    };
    let acobj = {
      ...account,
      ...acobj2,
    };

    setEditAccount(acobj);
  };
  console.log("selected_plant_data", selected_plant_data);

  const type = "asset";
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
          {openthreshold === false && (
            <div>
              <Breadcrumbs separator="›" aria-label="breadcrumbs">
                <Link
                  // `preventDefault` is for demo purposes
                  // and is generally not needed in your app
                  // onClick={(event) => event.preventDefault()}
                  underline="hover"
                  color="primary"
                  fontSize="inherit"
                  // href="/plant"
                  href="/admin"
                >
                  <PublicIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                  {selected_plant_data.name || "Plants" } 
                </Link>
                <Link
                  // `preventDefault` is for demo purposes
                  // and is generally not needed in your app

                  underline="hover"
                  color="primary"
                  fontSize="inherit"
                  // href="/plant"
                >
                  <Typography
                    fontSize="inherit"
                    style={{ cursor: "pointer" }}
                    onClick={callAsset}
                  >
                    {selected_asset_data.name}
                    {/* Asset Data */}
                  </Typography>
                </Link>
                <Typography fontSize="inherit">Sensor</Typography>
              </Breadcrumbs>
            </div>
          )}

          <div>
            <span
              style={{
                color: "black",
                fontSize: "large",
              }}
            >
              {openthreshold === false && (
                <IconButton component="span">
                  <GridViewIcon onClick={() => setGridView(!gridview)} />
                </IconButton>
              )}
            </span>
          </div>
        </div>
      </div>

      <>
        {openedit === true && (
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
                    <h6>Edit Sensor Details</h6>
                    <div>
                      <button
                        onClick={() => {
                          setOpenEdit("");
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
                            name="name"
                            defaultValue={editDatavalue.rowData[1]}
                            onChange={handleEditChange}
                            //  value={editDatavalue.rowData[1]}
                            fullWidth
                            label="Sensor Name"
                            focused
                          />
                        </div>
                        <div style={{ margin: "13px" }}>
                          <TextField
                            name="component"
                            onChange={handleEditChange}
                            fullWidth
                            label="Component"
                            defaultValue={editDatavalue.rowData[3]}
                            focused
                          />
                        </div>
                        <div style={{ margin: "13px" }}>
                          <TextField
                            name="endpoint"
                            // placeholder="Region"
                            onChange={handleEditChange}
                            defaultValue={editDatavalue.rowData[2]}
                            fullWidth
                            label="Endpoint"
                            focused
                          />
                        </div>

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
        {openpopup === true ? (
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
                  <h6 style={{color:'white'}}>New Sensor</h6>
                  <div>
                    <button onClick={() => setOpenPopup("")}>
                      <h3 style={{ padding: "5px", cursor: "pointer" }}>X</h3>
                    </button>
                  </div>
                </div>
                {/* <form method="post" onSubmit={sensorsave}>
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
                          name="asset_id"
                          // placeholder="Asset ID"
                          value={selected_asset_data.name}
                          onChange={handleChange}
                          fullWidth
                          // label="Asset Name"
                          disabled={true}
                        />
                      </div>
                      <div style={{ margin: "13px" }}>
                        <TextField
                          name="name"
                          placeholder="Name"
                          onChange={handleChange}
                          fullWidth
                          label="Name"
                          required
                        />
                      </div>
                      <div style={{ margin: "13px" }}>
                        <TextField
                          name="component"
                          placeholder="Component"
                          onChange={handleChange}
                          fullWidth
                          label="Component"
                          required
                        />
                      </div>
                      <div style={{ margin: "13px" }}>
                        <TextField
                          name="endpoint"
                          placeholder="Endpoint"
                          onChange={handleChange}
                          fullWidth
                          label="Endpoint"
                          required
                        />
                      </div>
                      <div style={{ margin: "auto" }}>
                        <Button
                          type="submit"
                          value="Submit"
                          variant="contained"
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>
                </form> */}

                <form method="post" onSubmit={sensorsave}>
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
                          name="asset_id"
                          // placeholder="Asset ID"
                          value={selected_asset_data.name}
                          onChange={handleChange}
                          fullWidth
                          // label="Asset Name"
                          disabled={true}
                        />
                      </div>
                      <div style={{ margin: "13px" }}>
                        <TextField
                          name="name"
                          placeholder="Sensor Name"
                          onChange={handleChange}
                          fullWidth
                          label=" Sensor Name"
                          required
                        />
                      </div>
                      <div style={{ margin: "13px" }}>
                        <TextField
                          name="component"
                          placeholder="Component Name"
                          onChange={handleChange}
                          fullWidth
                          label="Component Name"
                          required
                        />
                      </div>
                      {/* <div style={{ margin: "13px" }}>
                        <TextField
                          name="endpoint"
                          placeholder="Endpoint"
                          onChange={handleChange}
                          fullWidth
                          label="Endpoint"
                          required
                        />
                      </div> */}
                      <div style={{ margin: "auto" }}>
                        <Button
                          type="submit"
                          value="Submit"
                          variant="contained"
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : null}
        {opensetting1 === true ? (
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
                  <h6>Threshold Config</h6>
                  <div>
                    <button onClick={() => setOpensetting1("")}>
                      <h3 style={{ padding: "5px", cursor: "pointer" }}>X</h3>
                    </button>
                  </div>
                </div>
                <form method="post" onSubmit={sendThresholdsave}>
                  <div className="ws_popup-content" style={{ flexGrow: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        margin: "25px",
                      }}
                    >
                      <div style={{ margin: "13px" }}>
                        {sensordata === true && (
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Sensor Name
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={selectSensorname}
                              label="Sensor Name"
                              onChange={(e) =>
                                setSelectSensorName(e.target.value)
                              }
                            >
                              {sensorlist.length !== 0 &&
                                sensorlist.map((item) => {
                                  return (
                                    <MenuItem value={item.sensorgroup_id}>
                                      {item.name}
                                    </MenuItem>
                                  );
                                })}
                            </Select>
                          </FormControl>
                        )}
                      </div>

                      <div style={{ margin: "13px" }}>
                        <TextField
                          name="k_best"
                          placeholder="K_Best"
                          type="number"
                          onChange={ThresholdhandleChange}
                          fullWidth
                          label="K_Best"
                        />
                      </div>
                      <div style={{ margin: "13px" }}>
                        <TextField
                          name="alert_level"
                          placeholder="Alert_Level"
                          onChange={ThresholdhandleChange}
                          fullWidth
                          label="Alert_Level"
                        />
                      </div>
                      <div style={{ margin: "13px" }}>
                        <TextField
                          name="warning_level"
                          placeholder="Warning Level"
                          onChange={ThresholdhandleChange}
                          fullWidth
                          label="Warning Level"
                        />
                      </div>
                      <div style={{ margin: "13px" }}>
                        <TextField
                          name="upper_limit"
                          placeholder="upper_limit"
                          onChange={ThresholdhandleChange}
                          fullWidth
                          label="upper_limit"
                        />
                      </div>
                      <div style={{ margin: "13px" }}>
                        <TextField
                          name="lower_limit"
                          placeholder="lower_limit"
                          onChange={ThresholdhandleChange}
                          fullWidth
                          label="lower_limit"
                        />
                      </div>
                      <div style={{ margin: "auto" }}>
                        <Button
                          type="submit"
                          value="Submit"
                          variant="contained"
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : null}
        {AssetTableopen === true
          ? {
              /* <AssetTable */
            }
          : // selected_plant_data={selected_plant_data}
            // trigger_hide_assettablefun="false"
            // call_sensor_table={selected_asset_data}
            // />
            null}
      </>

      {/* {showPopup.shown === true && <PopupPlant />} */}
      {/* {showPopup.shown === true && (
        <PopupSensor sensor_popup_data={sendassetnameid} />
      )}
{sendassetnameid.length !==0 &&
  <PopupSensor sensor_popup_data={sendassetnameid} />
} */}
      <CacheProvider value={muiCache}>
        <ThemeProvider theme={createTheme()}>
          {openthreshold === false ? (
            gridview === false ? (
              <MUIDataTable data={rows} columns={columns} options={options}  />
            ) : (
              <CircleGraph />
            )
          ) : (""
            // <Threshold />
          )}
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}

export default DataSensorTable;
