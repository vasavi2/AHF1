import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TableHead from "@mui/material/TableHead";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import { AiFillAppstore } from "react-icons/ai";
import { BsFillGearFill } from "react-icons/bs";
import { IoIosApps, IoIosHelp } from "react-icons/io";
import axios from "axios";
import "./table.css";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import { useTheme } from "@mui/material/styles";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";

import CircularProgress from "@mui/material/LinearProgress";

import Box from "@mui/material/Box";
import LastPageIcon from "@material-ui/icons/LastPage";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
// import Header from "./Header";
import PopAlert from "./PopupAlert";
import Header from "./Header";
import Input from "@material-ui/core/Input";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

// import Logo from "../../public/logo.jpg";

import "./Dash.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 650,
  },
  selectTableCell: {
    width: 60,
  },
  tableCell: {
    width: 130,
    height: 40,
  },
  input: {
    width: 130,
    height: 40,
  },
}));
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}
TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
const CustomTableCell = ({ row, name, onChangeEdit }) => {
  const classes = useStyles();
  const { isEditMode } = row;

  return (
    <TableCell align="left" className={classes.tableCell}>
      {isEditMode ? (
        name === "alert_type" ? (
          <select
            name={name}
            onChange={(e) => onChangeEdit(e, row)}
            style={{
              borderColor: "grey",
              width: "209px",
              height: "47px",
              borderRadius: "7px",
            }}
          >
            <option>Select </option>
            <option value="True Positive">True Positive</option>
            <option value="True Negative">True Negative</option>
            <option value="False Positive">False Positive</option>
            <option value="False Negative">False Negative</option>
          </select>
        ) : (
          <Input
            type={
              name === "start_time" || name === "end_time"
                ? "datetime-local"
                : "text"
            }
            value={row[name]}
            name={name}
            onChange={(e) => onChangeEdit(e, row)}
            className={classes.input}
            disabled={name === "alert_id" ? true : false}
          />
        )
      ) : (
        row[name]
      )}
    </TableCell>
  );
};
// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }
export const AppDashboard = () => {
  //   id get
  const [assetId, setdownAssets] = useState(0);
  const [sensorId, setSensor] = useState(0);
  // data get
  const [assets, setAssets] = useState([]);
  const [rows, setRows] = useState([]);

  const [getsensordata, setgetSensor] = useState([]);
  const [headercount, setHeadercount] = useState(0);
  const [updateData, setUpdateData] = useState({});
  const [load, setLoad] = useState({ reload: false });
  const [editcollectData, setEditCollectData] = useState([]);
  const [previous, setPrevious] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [deleteopen, setDeleteopen] = React.useState(false);
  const [insertopen, setInsertopen] = React.useState(false);
  const [isShown, setIsShown] = useState(false);
  const [isShownWorkspace, setIsShownWorkspace] = useState(false);
  const [isShownManagement, setIsShowManagement] = useState(false);
  const [showPopup, setShowPopup] = useState({ shown: false });
  const [Loading, setLoading] = useState(false);
  const [page, setPage] = React.useState(0);
  const [offset, setOffset] = useState(0);
  const [triggerapi, setTriggerApi] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [headerrun,setHeaderRun]=useState(false)
  const [row,setRowss]=useState([])
  const classes = useStyles();
  
  const onChangeEdit = (e, row) => {
    // if (!previous[row.alert_id]) {
    //   setPrevious((state) => ({ ...state, [row.alert_id]: row }));
    // }
    const value = e.target.value;
    const name = e.target.name;
    const rid = row.alert_id;

    const newRows = rows.map((row, index) => {
      if (row.alert_id === rid) {
        return { ...row, [name]: value, key: index };
      }
      return row;
    });
    setRows(newRows);
    const filteredRow = newRows.filter((row) => row.alert_id === rid);
    const desiredObject = filteredRow[0];
    const updatedObject = Object.assign({}, desiredObject);
    delete updatedObject.isEditMode;
    setUpdateData(updatedObject);
    collectData(updatedObject);
  };

  const onToggleEditModeSave = (id) => {
    const objectLength = Object.keys(updateData).length;
    const UPDATE_ALERT = process.env.REST_URL + "/updatealert";
    if (objectLength !== 0) {
      axios
        .post(`${UPDATE_ALERT}`, {
          AlertId: id,
          AlertStatus: updateData.alert_type,
        })
        .then((response) => {
          // alert("update sucssfully");
          setOpen(true);
          setEditCollectData("");
        })
        .catch((error) => {
          console.log(error);
        });
      setRows((state) => {
        return rows.map((row, index) => {
          if (row.alert_id === id) {
            return { ...row, isEditMode: !row.isEditMode, key: index };
          }
          return row;
        });
      });
    }
  };
  const collectEditSave = () => {
    let senddataobj = editcollectData.map((obj) => {
      return Object.assign({}, obj, {
        AlertId: obj.alert_id,
        AlertStatus: obj.alert_type,
      });
    });
    const UPDATE_ALERT = process.env.REST_URL + "/updatealert";

    editcollectData.length !== 0 &&
      axios
        .post(`${UPDATE_ALERT}`, senddataobj)
        .then((response) => {
          // alert("All Data update sucssfully");
          setUpdateData("");
          setEditCollectData("");
          setOpen(true);
          setLoad({ reload: !load.reload });
        })
        .catch((error) => {
          console.log(error);
        });
  };
  const onToggleEditMode = (id) => {
    setRows((state) => {
      return rows.map((row, index) => {
        if (row.alert_id === id) {
          return { ...row, isEditMode: !row.isEditMode, key: index };
        }
        return row;
      });
    });
  };

  const onToggleDeleteMode = (id) => {
    let deletedata = {
      alert_id: id,
    };
    const DELETE_ALERT = process.env.REST_URL + "/deletePlantData2";
    axios
      .post(`${DELETE_ALERT}`, deletedata)
      .then((response) => {
        setDeleteopen(true);
        setLoad({ reload: !load.reload });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onRevert = (id) => {
    setEditCollectData("");
    setUpdateData("");
    setLoad({ reload: !load.reload });
    const newRows = rows.map((row, index) => {
      if (row.alert_id === id) {
        return previous[id] ? previous[id] : row;
      }
      return row;
    });
    setRows(newRows);
    setPrevious((state) => {
      delete state[id];
      return state;
    });
    onToggleEditMode(id);
  };
  function collectData(datapush) {
    let newData = [...editcollectData];

    newData.push(datapush);
    setEditCollectData(newData);
    return newData;
  }
  const triggerapiset = () => {
    setTriggerApi(true);
    // setInsertopen(true);
  };
  useEffect(() => {
    async function fetchAssetData() {

      // Fetching all assets without plant ids CODE-->
    //   const GA_URL = process.env.REST_URL + "/getAssets";
      const GA_URL ="http://127.0.0.1:9090/getAssets"

      const result = await axios.get(GA_URL);
      console.log("without plant id",result);

      // Fetching all assets with plant ids CODE-->

      // const GA_URL1 = process.env.REST_URL + "/getplantids"
      // const resultid = await axios.get(GA_URL1);
      // const ids=resultid.data[resultid.data.length-1]["plant_id"]
      // console.log("plant id--->",ids)

      // const GA_URL = process.env.REST_URL + "/getassetListIds/";
      // const result = await axios.get(
      //   `${GA_URL}${ids}`
      // );
      // console.log("url",result)
      // console.log("with plant id---->",result.data)

      //

      if (result && result.data) {
        console.log("<-- result data --->",result.data)
        setAssets(result.data);
        setRows(result.data);
      } else {
        console.log("result is empty or error");
      }
    }


    async function fetchSensorData() {
    //   const GS_URL = process.env.REST_URL + "/getsensorList/";

      const GS_URL="http://127.0.0.1:9090/getsensorList/"

      const result = await axios.get(`${GS_URL}${assetId}`);

      if (result && result.data) {
        setgetSensor(result.data);
      } else {
        console.log("result is empty or error");
      }
    }


    async function fetchgetalertData() {
      setLoading(true);
    //   const GA_URL = process.env.REST_URL + "/getAlertList/";
      const GA_URL="http://127.0.0.1:9090/getAlertList/";
      
      const result = await axios.get(
        `${GA_URL}${assetId}/${sensorId}?limit=${rowsPerPage}&offset=${offset}`
      );
      console.log("Final result data--->",result.data)


      setLoading(false);

      if (result && result.data) {
        setRows(result.data);
        const totalCount = result.headers.get("x-total-count");
        setHeadercount(totalCount);
      } else {
        console.log("result is empty or error");
      }
    }
    fetchAssetData();
    if (assetId.length !== 0) {
      fetchSensorData();
      
    }
    if (
   
    (assetId.length !== 0 && sensorId.length !== 0) ||
    (rowsPerPage !== 5 && offset !== 0)
  ) 
    
    
    
    {
      fetchgetalertData();
    }
    if (triggerapi === true) {
      fetchgetalertData();
      setTriggerApi({ shown: !showPopup.shown });
    }
  }, [assetId, sensorId, rowsPerPage, offset, load, triggerapi]);

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const asdataobj = {
    asset_id: assetId,
    sensorgroup_id: sensorId,
  };
  const handleChangePage = (event, newPage) => {
    console.log(event, newPage);
    setPage(newPage);
    setOffset(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log(event.target.value);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setDeleteopen(false);
    setOpen(false);
    // setInsertopen(false);
    setTriggerApi(false);
  };

const trigerheader=()=>{
  // alert("headerfun")
  setHeaderRun(true)
}



  
  return (
    <>
      <div className="main-workarea flex-container-sidebar">
        {/* <div className="flex-container-sidebar-sidemenu">
          <img
            // src={Logo}
            src=""
            style={{
              width: "170px",
              height: "48px",
              padding: "1px",
              marginRight: "5px",
            }}
            alt="logo"
          />
          <div className="flow-menu">
            <div
              style={{ padding: "7px" }}
              onMouseEnter={() => setIsShown(true)}
              onMouseLeave={() => setIsShown(false)}
            >
              <AiFillAppstore
                className={isShown === true ? "menuHover" : "menuColor"}
                style={{ marginTop: "2px" }}
              />
              <a
                href="/dashboard"
                style={{
                  marginLeft: "8px",
                }}
                className={isShown === true ? "menuHover" : "menuColor"}
              >
                Dashboard
              </a>
            </div>

            <div
              style={{ padding: "7px" }}
              onMouseEnter={() => setIsShownWorkspace(true)}
              onMouseLeave={() => setIsShownWorkspace(false)}
            >
              <IoIosApps
                className={
                  isShownWorkspace === true ? "menuHover" : "menuColor"
                }
                style={{ marginTop: "2px" }}
              />
              <a
                href="/pipline"
                style={{
                  marginLeft: "8px",
                }}
                className={
                  isShownWorkspace === true ? "menuHover" : "menuColor"
                }
              >
                Workspace
              </a>
            </div>

            <div
              style={{ padding: "7px" }}
              onMouseEnter={() => setIsShownWorkspace(true)}
              onMouseLeave={() => setIsShownWorkspace(false)}
            >
              <IoIosApps
                className={
                  isShownWorkspace === true ? "menuHover" : "menuColor"
                }
                style={{ marginTop: "2px" }}
              />
              <a
                href="/plant"
                style={{
                  marginLeft: "8px",
                }}
                className={
                  isShownWorkspace === true ? "menuHover" : "menuColor"
                }
              >
                AdminPage
              </a>
            </div>

            <div
              style={{ padding: "7px" }}
              onMouseEnter={() => setIsShowManagement(true)}
              onMouseLeave={() => setIsShowManagement(false)}
            >
              <IoIosApps
                className={
                  isShownManagement === true ? "menuHover" : "menuColor"
                }
                style={{ marginTop: "2px", color: "#0479b2" }}
              />
              <a
                href="/management"
                style={{
                  marginLeft: "8px",
                  color: "#0479b2",
                }}
                className={
                  isShownManagement === true ? "menuHover" : "menuColor"
                }
              >
                Alert Management
              </a>
            </div>

            <ul key="l5" style={{ padding: "7px" }}>
              <IoIosHelp style={{ color: "grey", marginTop: "2px" }} />
              <span style={{ marginLeft: "8px", color: "#888888" }}>
                AHF PowerBI
              </span>
            </ul>
            <ul key="l6" style={{ padding: "7px" }}>
              <BsFillGearFill style={{ color: "grey", marginTop: "2px" }} />
              <span style={{ marginLeft: "8px", color: "#888888" }}>
                Settings
              </span>
            </ul>
          </div>
        </div> */}

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Updated success !
          </Alert>
        </Snackbar>
        <Snackbar
          open={deleteopen}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Delete success !
          </Alert>
        </Snackbar>

        <Snackbar
          open={insertopen}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Insert success !
          </Alert>
        </Snackbar>
        <div className="flex-container-content" style={{marginLeft:"0px",width:"1100px",height:"700px"}}>
          <div className="flex-container-content-header">
            {headerrun === true ?             <Header  assetId={assetId} sensorId={sensorId}  rowsPerPage={rowsPerPage} offset={offset} headerpass={headerrun} />
:<Header  assetId={assetId} sensorId={sensorId}  rowsPerPage={rowsPerPage} offset={offset}/>}

            <div className="dashbord-header">
              <div className="recent" style={{display:"flex",justifyContent:"space-between"}}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap-reverse",
                    justifyContent: "space-between",
                    alignItems: "normal",
                    alignContent: "normal",
                    margin: "7px",
                  }}
                >
                  <div
                    style={{
                      display: "block",
                      flexGrow: 0,
                      flexShrink: 1,
                      flexBasis: "auto",
                      alignSelf: "auto",
                      order: 0,
                    }}
                  >
                    <label style={{ color: "black" }}>Asset </label>
                    <br></br>

                    <select
                      value={assetId}
                      onChange={(e) => setdownAssets(e.target.value)}
                      style={{ width: "400px" }}
                    >
                      <option>Select </option>

                      {assets && Array.isArray(assets) && assets.length > 0 ? (
                        assets.map((asset) => (
                          <option key={asset.id} value={asset.id}>
                            {asset.asset_name}
                          </option>
                        ))
                      ) : (
                        <div>Loading.. . </div>
                      )}
                    </select>
                  </div>
                  <div
                    style={{
                      display: "block",
                      flexGrow: 0,
                      flexShrink: 1,
                      flexBasis: "auto",
                      alignSelf: "auto",
                      order: 0,
                      marginLeft:"100px"
                    }}
                  >
                    <div>
                      <label style={{ color: "black" }}>Sensor </label>
                      <br></br>

                      <select
                        value={sensorId}
                        onChange={(e) => {
                          setSensor(e.target.value);
                          setHeadercount(0);
                        }}
                        style={{ width: "400px" }}
                      >
                        <option>Select</option>

                        {getsensordata &&
                        Array.isArray(getsensordata) &&
                        getsensordata.length > 0 ? (
                          getsensordata.map((sensor) => (
                            <option
                              key={sensor.sensorgroup_id}
                              value={sensor.sensorgroup_id}
                            >
                              {sensor.name}
                            </option>
                          ))
                        ) : (
                          <div>
                            {" "}
                            <CircularProgress />
                          </div>
                        )}
                      </select>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "block",
                      flexGrow: 0,
                      flexShrink: 1,
                      flexBasis: "auto",
                      alignSelf: "auto",
                      order: 0,
                      margin: "15px",
                      marginTop:"20px"
                    }}
                  >
                    <button
                      onClick={() => setShowPopup({ shown: !showPopup.shown })}
                    >
                      <h6 style={{ padding: "5px", cursor: "pointer",color:"white",position:"absolute",top:80 }}>
                        Add +
                      </h6>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {sensorId !== 0 && headercount !== 0 ? (
            <>
              <div className="flex-container-content-workarea">
                <TableContainer component={Paper}>
                  <div
                    style={{
                      display: "flex",
                      marginTop: "3px",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h4
                      style={{
                        padding: "8px",
                      }}
                    >
                      Alert Management
                    </h4>
                    <div style={{ marginTop: "3px" }}></div>
                  </div>
                  <div style={{ marginTop: "3px" }}>
                    {Loading === true && (
                      <div>
                        {" "}
                        <CircularProgress />
                      </div>
                    )}
                  </div>
                  <Table
                    sx={{ minWidth: 500 }}
                    aria-label="custom pagination table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <b>ID</b>
                        </TableCell>
                        <TableCell>
                          <b>Name</b>
                        </TableCell>
                        <TableCell>
                          <b>Start&nbsp;Time</b>
                        </TableCell>
                        <TableCell>
                          <b>End&nbsp;Time</b>
                        </TableCell>
                        <TableCell>
                          <b>Type</b>
                        </TableCell>
                        <TableCell>
                          <b>Action</b>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    {assetId.length !== 0 && sensorId.length !== 0 ? (
                      
                      <TableBody>
                        {!rows ? (
                          <div> Loading ...</div>
                        ) : (
                          
                          rows.map((row, index) => (
                            <TableRow key={row.alert_id}>
                           
                              <CustomTableCell
                                {...{ row, name: "alert_id", onChangeEdit }}
                              />
                              <CustomTableCell
                              
                                {...{ row, name: "alert", onChangeEdit }}
                                

                                // row.alert.charAt(0).toUpperCase()+row.alert.slice(1)

                              />
                              <CustomTableCell
                                {...{ row, name: "start_time", onChangeEdit }}
                              />
                              <CustomTableCell
                                {...{ row, name: "end_time", onChangeEdit }}
                              />
                              <CustomTableCell
                                {...{ row, name: "alert_type", onChangeEdit }}
                              />

                              <TableCell className={classes.selectTableCell}>
                                {row.isEditMode ? (
                                  <>
                                    <IconButton
                                      aria-label="done"
                                      onClick={() =>
                                        onToggleEditModeSave(row.alert_id)
                                      }
                                    >
                                      <DoneIcon />
                                    </IconButton>
                                    <IconButton
                                      aria-label="revert"
                                      onClick={() => onRevert(row.alert_id)}
                                    >
                                      <RevertIcon />
                                    </IconButton>
                                  </>
                                ) : (
                                  <div style={{ display: "flex" }}>
                                    <IconButton
                                      aria-label="delete"
                                      onClick={() =>
                                        onToggleEditMode(row.alert_id)
                                      }
                                    >
                                      <EditIcon />
                                    </IconButton>

                                    <IconButton
                                      aria-label="delete"
                                      onClick={() =>
                                        onToggleDeleteMode(row.alert_id)
                                      }
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                  </div>
                                )}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    ) : (
                      <div className="mui-datatables-1ex1afd-MuiTableCell-root">
                        No Record(s) found
                      </div>
                    )}

                    <TableFooter>
                      <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[
                            5,
                            10,
                            25,
                            { label: "All", value: -1 },
                          ]}
                          colSpan={3}
                          count={headercount}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          SelectProps={{
                            inputProps: {
                              "aria-label": "rows per page",
                            },
                            native: true,
                          }}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                          ActionsComponent={TablePaginationActions}
                        />
                        {assetId.length !== 0 && sensorId.length !== 0 ? (
                          <div
                            style={{
                              float: "right",
                              margin: "12px",
                              marginRight: "-284px",
                            }}
                          >
                            <h4
                              style={{
                                padding: "8px",
                              }}
                            >
                              {/* <button
                                style={{
                                  background:
                                    editcollectData.length !== 0
                                      ? null
                                      : "#545050",
                                }}
                                onClick={collectEditSave}
                              >
                                Submit
                              </button> */}
                            </h4>
                          </div>
                        ) : null}
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
              </div>
            </>
          ) : (
            <>
              <div className="mui-datatables-1ex1afd-MuiTableCell-root">
                No Record(s) found
              </div>
            </>
          )}
          {showPopup.shown === true && (
            <PopAlert asdata={asdataobj} trigger={triggerapiset} headerfun={trigerheader} />
          )}
        </div>
      </div>
    </>
  );
  // <Header/>
};
export default AppDashboard;
