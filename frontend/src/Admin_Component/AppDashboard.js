import React, { useState, createContext, useEffect } from "react";
import { AiFillAppstore } from "react-icons/ai";
import { BsFillGearFill } from "react-icons/bs";
import { IoIosApps, IoIosHelp } from "react-icons/io";

// import Header from "../Header";
// import Logo from "../../../public/logo.jpg";
//  DATATABLES
// import DataTablePlant from "./Plant/Plant_Table_Popup.js";

// import DataTableAsset from "./Asset/Asset_Table_Popup.js";
// import DataTableAsset from "./Components/Asset/Asset_Table_Popup.js";
import DataTableAsset from "./Asset/Asset_Table_Popup.js"
import DataSensorTable from "./sensor/Sensor_Table_Popup.js"
import Threshold from "./Threshold_Table_Popup/Threshold.js";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import PublicIcon from "@mui/icons-material/Public";
import Typography from "@mui/material/Typography";
// import SamplePlant from "./Components/SamplePlant.js";
import SamplePlant from "./SamplePlant.js"
// import DataSensorTable from "./Components/sensor/Sensor_Table_Popup.js";
// import DataTableSensor from "./Sensor/Sensor_Table_Popup.js";

// import Threshold from "./Components/Threshold_Table_Popup/Threshold.js";
// import Threshold from "./Threshold/Threshold_Table_Popup.js";
// import ModelConfig from "./ModelConfig/ModelConfig_Table_Popup.js";
// import "./Dashbord.css";
// import "./Dashboard.css"
// import "./Dashboard.css"
import "./Dashboards.css"
// import {
//   DASHBOARD_HEADER,
//   DASHBOARD_WORKSPACE,
//   DASHBOARD_ALERTMANAGEMENT,
//   DASHBOARD_SETTINGS,
//   DASHBOARD_ADMIN,
//   DASHBOARD_POWERBI,
//   MENU_COLOR,
//   MENU_HOVER,
// } from "./Components/text.js"

import {
  DASHBOARD_HEADER,
  DASHBOARD_WORKSPACE,
  DASHBOARD_ALERTMANAGEMENT,
  DASHBOARD_SETTINGS,
  DASHBOARD_ADMIN,
  DASHBOARD_POWERBI,
  MENU_COLOR,
  MENU_HOVER,
} from "./text.js"

export const UserContext = createContext();

export const AppDashboard = () => {
  // data get
  const [isShown, setIsShown] = useState(false);
  const [isShownWorkspace, setIsShownWorkspace] = useState(false);
  const [isShownManagement, setIsShowManagement] = useState(false);
  // open the asset table
  const [openassettable, setOpenAssetTable] = useState(false);
  // hide the Plant Table
  const [hideplanttable, setHidePlantTable] = useState(true);
  // open the sensor table
  const [openthreshold, setOpenthreshold] = useState(false);
  const [openmodelconfig, setOpenModelConfig] = useState(false);
  const [opensensortable, setOpenSensorTable] = useState(false);
  // hide the asset table and plant table
  // select row data store
  const [selectedplantdata, setSelectedPlantData] = useState({});
  const [selectedassetdata, setSelectedAssetData] = useState({});
  const [selectedsensordata, setSelectedSesorData] = useState({});
  const [selectedthreshold, setSelectedThreshold] = useState({});

  const hidePlantTable_Click = (arg, arg2) => {
    console.log("plant", arg, arg2);
    if (arg.length === undefined) {
      Object.entries(arg).forEach(([key, value]) => {
        let keys = key;
        let values = value;

        let obj = {
          id: keys,
          name: values,
          popup: true,
        };
        setSelectedPlantData(obj);
        setHidePlantTable(false);
        setOpenSensorTable(false);
        setOpenAssetTable(true);
      });
    } else {
      let obj = {
        id: arg[0],
        name: arg[1],
        popup: false,
      };
      setSelectedPlantData(obj);
      setHidePlantTable(false);
      setOpenAssetTable(true);
      setOpenSensorTable(false);
    }
  };

  const hideAssetTable_Click = (arg1, arg2) => {
    var size = Object.keys(arg2).length;
    // console.log("arg1", arg1);
    // console.log("arg2", arg2);

    // console.log("asset name and id", size);
    if (size <= 1) {
      Object.entries(arg2).forEach(([key, value]) => {
        let keys = key;
        let values = value;

        let arg2obj = {
          id: keys,
          name: values,
          popup: true,
        };
        // console.log("selectedassetdata bus", arg2obj);

        setSelectedAssetData(arg2obj);
        setSelectedPlantData(arg1);
        setHidePlantTable(false);
        setOpenAssetTable(false);
        setOpenSensorTable(false);
        setOpenSensorTable(true);
      });
    } else {
      let obj = {
        id: arg1[0],
        name: arg1[1],
        popup: false,
      };
      setSelectedAssetData(obj);
      setSelectedPlantData(arg2);
      setHidePlantTable(false);
      setOpenAssetTable(false);
      setOpenSensorTable(true);
    }
  };
  const hideSensorTable_Click = (arg1, arg2, arg3) => {
    // console.log("Thresold table get arg 123", arg1, arg2, arg3);
    var size = Object.keys(arg2).length;
    // console.log("arg1", arg1);
    // console.log("arg2", arg2);

    // console.log("asset name and id", size);
    if (size <= 1) {
      Object.entries(arg2).forEach(([key, value]) => {
        let keys = key;
        let values = value;

        let arg2obj = {
          id: keys,
          name: values,
          popup: true,
        };
        // console.log("selectedassetdata bus", arg2obj);

        setSelectedSesorData(arg2obj);
        setSelectedPlantData(arg1);
        setHidePlantTable(false);
        setOpenAssetTable(false);
        setOpenSensorTable(false);
        setOpenthreshold(true);
      });
    } else {
      let obj = {
        id: arg1[0],
        name: arg1[1],
        popup: false,
      };
      setSelectedSesorData(obj);
      setSelectedPlantData(arg2);
      setHidePlantTable(false);
      setOpenAssetTable(false);
      setOpenSensorTable(false);
      setOpenthreshold(true);
    }
  };

  const hideThresholdTable_Click = (arg1, arg2) => {
    console.log("Thresold table get arg 123", arg1, arg2);
    var size = Object.keys(arg2).length;
    // console.log("arg1", arg1);
    // console.log("arg2", arg2);

    // console.log("asset name and id", size);
    if (size <= 1) {
      Object.entries(arg2).forEach(([key, value]) => {
        let keys = key;
        let values = value;

        let arg2obj = {
          id: keys,
          name: values,
          popup: true,
        };
        console.log("selectedassetdata model send", arg2obj);
        setSelectedThreshold(arg2obj);
        setSelectedSesorData(arg2obj);
        setSelectedPlantData(arg1);

        setHidePlantTable(false);
        setOpenAssetTable(false);
        setOpenSensorTable(false);
        setOpenthreshold(false);
        setOpenModelConfig(true);
      });
    } else {
      let obj = {
        id: arg1[0],
        name: arg1[1],
        popup: false,
      };
      setSelectedSesorData(obj);
      setSelectedPlantData(arg2);
      setSelectedThreshold(obj);
      setHidePlantTable(false);
      setOpenAssetTable(false);
      setOpenSensorTable(false);
      setOpenthreshold(false);
      setOpenModelConfig(true);
    }
  };
  const hideAssetTable = () => {
    setHidePlantTable(false);
    setOpenAssetTable(false);
    setOpenSensorTable(true);
  };
  const hideSensorTable = () => {
    setHidePlantTable(false);
    setOpenAssetTable(true);
    setOpenSensorTable(false);
    setOpenthreshold(true);
  };
  // const hideThresholdTable_Click = () => {
  //   setHidePlantTable(false);
  //   setOpenAssetTable(false);
  //   setOpenSensorTable(false);
  //   setOpenthreshold(false);
  //   setOpenModelConfig(true)
  // };
  return (
    <>
      <div className="main-workarea flex-container-sidebar">
        {/* <div className="flex-container-sidebar-sidemenu">
          <img
            // src={Logo}
            src=""
            style={{
              width: "160px",
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
                {DASHBOARD_HEADER}
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
                {DASHBOARD_WORKSPACE}
              </a>
            </div>

            <div
              style={{ padding: "7px" }}
              onMouseEnter={() => setIsShown(true)}
              onMouseLeave={() => setIsShown(false)}
            >
              <AiFillAppstore
                className={isShown === true ? { MENU_HOVER } : { MENU_COLOR }}
                style={{ marginTop: "2px", color: "#0479b2" }}
              />
              <a
                href="/plant"
                style={{
                  marginLeft: "8px",
                  color: "#0479b2",
                }}
                className={isShown === true ? { MENU_HOVER } : { MENU_COLOR }}
              >
                {DASHBOARD_ADMIN}
              </a>
            </div>

            <div
              style={{ padding: "7px" }}
              onMouseEnter={() => setIsShowManagement(true)}
              onMouseLeave={() => setIsShowManagement(false)}
            >
              <IoIosApps
                className={
                  isShownManagement === true ? { MENU_HOVER } : { MENU_COLOR }
                }
                style={{ marginTop: "2px" }}
              />
              <a
                href="/management"
                style={{
                  marginLeft: "8px",
                  color: "#757575",
                }}
                className={
                  isShownManagement === true ? { MENU_HOVER } : { MENU_COLOR }
                }
              >
                {DASHBOARD_ALERTMANAGEMENT}
              </a>
            </div>
            <ul key="l5" style={{ padding: "7px" }}>
              <IoIosHelp style={{ color: "grey", marginTop: "2px" }} />
              <span style={{ marginLeft: "8px", color: "#888888" }}>
                <a
                  href="/powerbi"
                  style={{
                    marginLeft: "8px",
                    color: "#757575",
                  }}
                  className={
                    isShownManagement === true ? { MENU_HOVER } : { MENU_COLOR }
                  }
                >
                  {DASHBOARD_POWERBI}
                </a>
              </span>
            </ul>
            <ul key="l6" style={{ padding: "7px" }}>
              <BsFillGearFill style={{ color: "grey", marginTop: "2px" }} />
              <span style={{ marginLeft: "8px", color: "#888888" }}>
                {DASHBOARD_SETTINGS}
              </span>
            </ul>
          </div>
        </div> */}
        <div className="flex-container-content">
          <div className="flex-container-content-header">
            {/* <Header />  */}
            <div className="dashbord-header">
              <div
                className="recent"
                style={{
                  height: "49px",
                  // height: "500px",

                  width:"1080px"
                }}
              >
                <div
                  style={{
                    margin: "2% 0% 0% 0%",
                    
                  }}
                >
                  {hideplanttable && (
                    // <div style={{width:"1090"}}>
                    <div style={{height:"40%",overflow:"auto"}}>

                    <SamplePlant call_assett_table={hidePlantTable_Click} />
                     </div>

                  )
                  
                  }
                  {openassettable && (
                    <div style={{marginTop:"600px",width:"1090px",height:"500px"}}>
                    <DataTableAsset
                      selected_plant_data={selectedplantdata}
                      trigger_hide_assettablefun={hideAssetTable}
                      call_sensor_table={hideAssetTable_Click}
                    />
                    </div>
                  )}
                  {opensensortable && (
                                        <div style={{marginTop:"600px",width:"1090px",height:"500px"}}>

                    <DataSensorTable
                      selected_plant_data={selectedplantdata}
                      selected_asset_data={selectedassetdata}
                      trigger_hide_sensortablefun={hideSensorTable}
                      call_Threshold_table={hideSensorTable_Click}
                      call_assett_table={hidePlantTable_Click}
                    />
                    </div>
                  )}
                  {
                    openthreshold  && (
                      <Threshold/>
                    )
                  }
                  {/* {openthreshold && (
                    <Threshold
                      selected_plant_data={selectedplantdata}
                      selected_asset_data={selectedassetdata}
                      selected_sensor_data={selectedsensordata}
                      call_sensor_table={hideAssetTable_Click}
                      call_assett_table={hidePlantTable_Click}
                      call_ModelConfig_table={hideThresholdTable_Click}
                    />
                  )} */}

                  {/* {openmodelconfig &&
                    (console.log("selectedthreshold", { selectedthreshold }),
                    (
                      <ModelConfig
                        selected_plant_data={selectedplantdata}
                        selected_asset_data={selectedassetdata}
                        selected_sensor_data={selectedsensordata}
                        selected_threshold_data={
                          selectedthreshold && selectedthreshold
                        }
                        call_sensor_table={hideAssetTable_Click}
                        call_assett_table={hidePlantTable_Click}
                        call_Threshold_table={hideSensorTable_Click}
                      />
                    ))} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AppDashboard;
