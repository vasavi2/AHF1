import MUIDataTable from "mui-datatables";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import EngineeringIcon from "@mui/icons-material/Engineering";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SettingsIcon from "@mui/icons-material/Settings";
import PublicIcon from "@mui/icons-material/Public";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
// import Pagination from "../Pagination";
import Pagination from "../Pagination"

import CloseIcon from "@mui/icons-material/Close";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import GridViewIcon from "@mui/icons-material/GridView";
import CircleGraph from "./CircleGraph"

const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});

function DataTableAsset({
  selected_plant_data,
  trigger_hide_assettablefun,
  call_sensor_table
}) {
  const [responsive, setResponsive] = useState("vertical");
  const [gridview, setGridView] = useState(false);

  const [tableBodyHeight, setTableBodyHeight] = useState("400px");
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
  const [searchBtn, setSearchBtn] = useState(true);
  const [downloadBtn, setDownloadBtn] = useState(false);
  const [printBtn, setPrintBtn] = useState(false);
  const [viewColumnBtn, setViewColumnBtn] = useState(false);
  const [openaddnewasset, setOpenAddNewAsset] = useState(false);
  const [opensetting, setOpensetting] = useState(false);
  const [filterBtn, setFilterBtn] = useState(true);
  const [assets, setAssets] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  let [account, setAccount] = useState({});
  const [selectedPlant, setSelectedPlant] = useState("");
  let [responcedata, setResSendData] = useState({});
  const [showPopupSensor, setShowPopupSensor] = useState({ shown: false });
  const [assetloading, setassetLoading] = useState("");
  const [selected_plant_id_name, setSelected_Plant_Id_Name] = useState({});
  const [showPopup, setShowPopup] = useState({ shown: false });
  const [disablerow, setDisableRow] = useState(false);
  const [editDatavalue, setEditData] = useState([]);
  const [openedit, setOpenEdit] = useState(false);
  let [editaccount, setEditAccount] = useState({});
  const [refresh, setRefresh] = useState(true);
  const [headercount, setHeadercount] = useState(0);
  const [selectname, setSelectName] = useState("");
  const [algorithmname, setAgorithmtName] = useState("");
  //
  const [select_plant_id,setSelectedPlantId]=useState([{}])

  // popup send data
  const [sendselectdata, setSelectData] = useState({});
  const {
    offset,
    handleChangePage,
    page,
    rowsPerPage,
    handleChangeRowsPerPage,
  } = Pagination();



  useEffect(() =>
  
  {
                      setRefresh(false);
                      setSelectData(selected_plant_data);
                      setOpenAddNewAsset(selected_plant_data.popup);

                      async function fetchAssetData() {
                        const id = selected_plant_data.id;

                        // const GA_URL = process.env.REST_URL + "/getassetList/";
                        const GA_URL="http://127.0.0.1:9090/getassetList/"

                        const result = await axios.get(
                          `${GA_URL}${id}?limit=${rowsPerPage}&offset=${offset}`
                        );
                        console.log("Plant Id<------------>",id)


                        let last_element=select_plant_id[select_plant_id.length-1]
                        console.log("select_plant_id<------>",last_element)
                        console.log("length of dictionary<------>",Object.keys(last_element).length)

                      
                        Object.keys(last_element).length>0 && axios.post("http://127.0.0.1:9090/insertPlantId",last_element)
                      .then((response)=>{console.log("api for plantid",response)})
                      console.log("pipeline url-2",last_element)
                      



              


                        if (result && result.data) {
                          // console.log(result.data);
                          setAssets(result.data);
                          setRows(result.data);

                          const totalCount = result.headers.get("x-total-count");
                          setHeadercount(totalCount);
                        } else {
                          console.log("result is empty or error");
                        }
                      }

                      fetchAssetData();
    }, [refresh, offset, rowsPerPage, selected_plant_data]);




    useEffect(()=>{
      let plantId2=selected_plant_data["id"].toString()
      setSelectedPlantId((sel_id)=>([{id:plantId2}]))
      console.log("selected_plant_data",select_plant_id)
      console.log("selected_plant_data",select_plant_id)
     
    },[selected_plant_data["id"]])




        console.log("trigger_hide_assettablefun",trigger_hide_assettablefun)
        console.log("call_sensor_table",call_sensor_table)
        const editData = (value) => {
          setDisableRow(true);
          setEditData(value);
          setOpenEdit(true);
          setDisableRow(false);
        };

// useEffect(()=>{
//   let last_element=select_plant_id[select_plant_id.length-1]
//   console.log("select_plant_id<------>",last_element)

// axios.post("http://127.0.0.1:9090/insertPlantId",last_element)
// .then((response)=>{console.log("api for plantid",response)})
// console.log("pipeline url-2",last_element)
// },[])
       

            



        let deleteData = (value) => 
        {
                          setRefresh(true);
                          setDisableRow(true);
                          // alert("deleteData", value);

                          let deletedata = {
                            id: value,
                          };
                        const DELETE_PLANT =  "http://127.0.0.1:9090/deleteAsset";
                        axios
                          .post(`${DELETE_PLANT}`, deletedata)
                          .then((response) => {
                            setDisableRow("");

                            // console.log("delete sucssfully", response);
                            alert("Selected Plant Info Deleted Successfully");
                            setRefresh(false);
                          })
                          .catch((error) => {
                            console.log(error);
                            setDisableRow(false);
                          });
      };


 

  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let asset_id = {
      plant_id: selected_plant_data.id,
    };
    account[name] = value;
    let acobj = {
      ...account,
      ...asset_id,
    };
    setAccount(acobj);
  };



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
  const columns = [
    // {
      // name: "id",
      // label: " ID",
      { name: "id", label: <div style={{color:"black",marginLeft:"50px"}}>Asset_ID</div> ,

    },
    {
      name: "asset_name",
      // label: " Asset Name",
      label: <div style={{color:"black",marginLeft:"250px"}}>Asset_Name</div> ,


      options: { filterOptions: { fullWidth: true } },
    },
    {
      name: "asset_tag",
      // label: "Asset Tag",
      label: <div style={{color:"black",marginLeft:"50px"}}>Asset_Tag</div> ,

    },
    {
      name: "update_time_stamp",
      // label: "Date",
      label: <div style={{color:"black",marginLeft:"150px"}}>Date</div> ,

    },
    {
      name: "id",
      // label: "Actions",
      label: <div style={{color:"black",marginLeft:"100px"}}>Actions</div> ,

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
                <Tooltip title="Delete" style={{ margin: "5px" }}>
                  <IconButton component="span">
                    <DeleteIcon onClick={() => deleteData(value)} />
                  </IconButton>
                </Tooltip>
              </>
            );
        },
      },
    },
  ];
  function handleEdit() {}

  const options = {
    onRowClick: (rowdata) => {
      setDisableRow(true);
      {
        disablerow == true && call_sensor_table(rowdata, selected_plant_data);
      }
    },
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
              <AddIcon onClick={() => setOpenAddNewAsset(true)} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Settings" style={{ margin: "5px" }}>
            <IconButton component="span">
              <SettingsIcon onClick={() => setOpensetting(true)} />
            </IconButton>
          </Tooltip>
        </>
      );
    },
    onTableChange: (action, state) => {
      // console.log(action);
      console.dir(state);
    },
  };
  const handlePlantChange = (event) => {
    setSelectedPlant(event.target.value);
  };
  let save = (e) => {
    e.preventDefault();

    // console.log("idd", e.target.id);
    trigger_hide_assettablefun();

    setShowPopup({ shown: !showPopup.shown });

    let sendData = JSON.stringify(account);
    let customConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const CREATE ="http://127.0.0.1:9090/insertAssetData";

    axios
      .post(CREATE, sendData, customConfig)
      .then((res) => {
        setShowPopupSensor({ shown: !showPopupSensor.shown });

        // triggerSensorfun()
        // console.log("asset create sucessfully ", res);
        // console.log("res.data bus",res.data)
        setResSendData(res.data);
        call_sensor_table(sendselectdata, res.data);
        setassetLoading(true);
        alert("Asset Details Submitted Successfully.");

        setLoading(false);
      })
      .catch((err) => {
        console.log("Error Post Data", err);
        alert("err");
      });
  };

  // call_sensor_table(sendselectdata, responcedata);
  // console.log("asset create sucessfully ", responcedata);

  // console.log("sendselectdata asset", sendselectdata);

  let handleEditChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    account[name] = value;
    let acobj2 = {
      id: editDatavalue.rowData[0],
    };
    let acobj = {
      ...account,
      ...acobj2,
    };

    setEditAccount(acobj);
  };

  let editSave = (e) => {
    e.preventDefault();
    setLoading(false);
    setRefresh(true);
    let sendData = JSON.stringify(editaccount);
    // console.log("editaccount", sendData);

    let customConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const Update = "http://127.0.0.1:9090/updateAsset";

    axios
      .post(Update, sendData, customConfig)
      .then((res) => {
        alert("Plant Details Updated Successfully");
        // console.log("Update  sucessfully res", res);
        setRefresh(false);

        // setResSendData(res.data);
        setDisableRow("");
        setOpenEdit("");
        // setSensorloading(true);
      })
      .catch((err) => {
        console.log("Error Post Data", err);
        alert("err");
        setOpenEdit("");
        setDisableRow("");
      });
  };
  // console.log("editDatavalue", editDatavalue);
  const submitAlorithm = () => {
    const sendobj = {
      asset_id: selectname,
      algorithm: algorithmname,
    };

    // console.log("idd", e.target.id);
    trigger_hide_assettablefun();

    setShowPopup({ shown: !showPopup.shown });

    let customConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const CREATE =  "http://127.0.0.1:9090/insertAlgorithm";

    axios
      .post(CREATE, sendobj, customConfig)
      .then((res) => {
        setShowPopupSensor({ shown: !showPopupSensor.shown });
        setResSendData(res.data);
        call_sensor_table(sendselectdata, res.data);
        setassetLoading(true);
        alert(" Algorithm Details Submitted Successfully.");

        setLoading(false);
      })
      .catch((err) => {
        console.log("Error Post Data", err);
        alert("err");
      });
  };
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
              <Breadcrumbs separator="›" aria-label="breadcrumbs">
                <Link
                  // `preventDefault` is for demo purposes
                  // and is generally not needed in your app
                  // onClick={(event) => event.preventDefault()}
                  underline="hover"
                  color="primary"
                  fontSize="inherit"
                  href="/admin"
                >
                  <PublicIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                  
                  {selected_plant_data.name } 
                </Link>
                

                <Typography fontSize="inherit">Asset</Typography>

                
              </Breadcrumbs>
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
            </span>
          </div>
        </div>
      </div>

      {/* {showPopup.shown === true && <PopupPlant />} */}
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
                  <h6>Edit Asset Details</h6>
                  <div>
                    <Tooltip
                      title="Close"
                      style={{ margin: "5px", color: "white" }}
                    >
                      <IconButton component="span">
                        <CloseIcon
                          onClick={() => {
                            setOpenEdit("");
                            setDisableRow("");
                          }}
                        />
                      </IconButton>
                    </Tooltip>
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
                          name="asset_tag"
                          label="Asset Tag"
                          defaultValue={editDatavalue.rowData[2]}
                          onChange={handleEditChange}
                          //  value={editDatavalue.rowData[1]}
                          fullWidth
                          focused
                        />
                      </div>
                      <div style={{ margin: "13px" }}>
                        <TextField
                          name="asset_name"
                          label="Asset Name"
                          onChange={handleEditChange}
                          fullWidth
                          defaultValue={editDatavalue.rowData[1]}
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
      {openaddnewasset === true ? (
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
                <h6>New Asset</h6>
                <div>
                  <Tooltip
                    title="Close"
                    style={{ margin: "5px", color: "white" }}
                  >
                    <IconButton component="span">
                      <CloseIcon
                        onClick={() => {
                          setLoading("");
                          setOpenAddNewAsset("");
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
              <form method="post" onSubmit={save}>
                <div className="ws_popup-content" style={{ flexGrow: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      margin: "20px",
                    }}
                  >
                    <div style={{ margin: "13px" }}>
                      <TextField
                        name="plant_id"
                        placeholder="Plant ID"
                        value={selected_plant_data.name}
                        id={selected_plant_data.id}
                        onChange={handleChange}
                        fullWidth
                        label="Plant Name"
                        disabled={true}
                      />
                    </div>
                    <div style={{ margin: "13px" }}>
                      <TextField
                        name="asset_tag"
                        placeholder="Asset Tag"
                        onChange={handleChange}
                        fullWidth
                        label="Asset Tag"
                        required
                      />
                    </div>
                    <div style={{ margin: "13px" }}>
                      <TextField
                        name="asset_name"
                        placeholder="Asset Name"
                        onChange={handleChange}
                        fullWidth
                        label="Asset Name"
                        required
                      />
                    </div>

                    <div style={{ margin: "auto" }}>
                      <Button type="submit" value="Submit" variant="contained">
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
       
      <CacheProvider value={muiCache}>
        <ThemeProvider theme={createTheme()}>
          {gridview === false ? (

            <MUIDataTable
              // title={ selected_plant_data +"--->Asset"}
              data={rows}
              columns={columns}
              options={options}
            />
          ) : (
            <CircleGraph />
          )}
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}

export default DataTableAsset;
