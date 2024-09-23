import React, { useState,useRef } from "react";
import * as ReactDOM from "react-dom";
import {Link} from "react-router-dom"
import axios from "axios"
import { Provider, connect } from "react-redux";
import { configureStore } from "./store";
import * as Actions from "./actions";
import { Editor, MenuItem } from "react-flow-editor";
import { bindActionCreators } from "redux";
import { useSelector } from "react-redux";
import Jsondata from "./data.json"
import Properties from "./properties";
// import Logo from "../public/logo.png";
import Logo from "./logo.png"
// import NewPopup from "./newPopup";
import NewPopup from "./newPopup"
import Header from "./Header";
// import Header from "./Header";
import logo from "./icon.jpg"

import html2canvas from 'html2canvas';
require("./redux.scss");



function resolver(node) {
  return React.createElement("div", {
    style: { height: "200px", width: "200px" },
  });
}

const config = {
  resolver,
  connectionType: "bezier",
  grid: true,
  direction: "we",

  connectionAnchorsLength: 40,
};
const store = configureStore();

const inputfactory = (type, provalue) => () => ({
  name: `${type}`,
  type,
  id: "",
  inputs: [{ connection: [], name: type }],
  outputs: [],
  properties: provalue,
  classNames: [type],
  checkbox: [provalue],
});

const outputfactory = (type, provalue) => () => ({
  name: `${type}  `,
  type,
  id: "",
  inputs: [],
  outputs: [{ connection: [], name: type }],
  properties: provalue,
  classNames: [type],
});
const inputoutputfactory = (type, provalue) => () => ({
  name: `${type}  `,
  type,
  id: "",
  inputs: [{ connection: [], name: type }],
  outputs: [{ connection: [], name: type }],
  properties: provalue,
  classNames: [type],
});

function Bootstrap({ props }) {
  //
  const [pipeline,setPipeline]=useState([])
  
  const [count, setCount] = useState();
  const [workspace, setWorkspace] = useState("New WorkSpace");
  //
  const [screenshot, setScreenshot] = useState(null);
  const countRef = useRef(null);
  const [enableHome,setEnableHome]=useState(false)




  const enableButton=(arg)=>{
    setEnableHome(arg)


  }


  const handleDownload = () => {
    console.log("hello")
    html2canvas(countRef.current).then((canvas) => {
      const dataUrl = canvas.toDataURL('image/png');
      setScreenshot(dataUrl);
      console.log("pipeline url",pipeline)


      console.log("screenshot",screenshot)
      setPipeline((pipeline)=>[...pipeline,{workspaceName:workspace,Screenimage:dataUrl}])
      console.log("normal pipeline",pipeline)

      axios.post("http://127.0.0.1:9090/insertWorkspace",pipeline[0])
      .then((response)=>{console.log("api for pipeline",response)})
      console.log("pipeline url-2",pipeline)

    });

    if (screenshot) {
      // Create a temporary anchor element to trigger the download
      alert("Successful screenshot capture")
      const a = document.createElement('a');
      console.log("data",a)
      console.log("screenshot",screenshot)

      

      a.href = screenshot;
      a.download = 'screenshot.png';
      a.click();
          }
    };

    


  const datas = useSelector((state) => state);
  console.log("<----------------Json element---------->",Jsondata)
  return React.createElement(

    "div",
    { className: "main-workarea flex-container-sidebar" },

    
    // React.createElement("div",
    // { className: "flex-container-sidebar-sidemenu" },
    // React.createElement(
    //   "div",
    //   { className: "flow-menu" },
    //   React.createElement(Link,{to:"/dashboard",className:"faq-drawer__title"},"HOME")
    // )),
    

    React.createElement(
      "img",
      { src: Logo, width: "160px", height: "69px" },
      null
    ),
    // React.createElement(
    //   "button",
    //   {
    //     className: "your-button-class", // Add your own button class
    //     onClick: () => {
    //       console.log("hello")
    //       // Add your button click functionality
    //       // For example, you can redirect to a specific page
    //       window.location.href = "/your-page";
    //     },
    //   },
    //   "Home"
    // ),

    
    
    React.createElement("div",
    { className: "flex-container-sidebar-sidemenu" },
    React.createElement(
      "div",
      { className: "flow-menu" },
      React.createElement("HOME")
    )),
    
    
    React.createElement(
      "div",
      { className: "flex-container-sidebar-sidemenu" },

      React.createElement(
        "div",
        { className: "flow-menu" },



        Jsondata.length !== 0 &&
        
          Jsondata.map((tag, i) => (
            <div key={i}>
              {count === i ? (
                <div
                  onClick={() => setCount()}
                  className="faq-drawer__title-after"
                  key={i}
                >
                <span>  {tag.iteam}  </span>
                </div>
              ) : (
                <div onClick={() => setCount(i)} className="faq-drawer__title">
                  {tag.iteam}
                </div>
              )}

              {count === i ? (
                <div>
                  {tag.submenu !== 0 &&

                    tag.submenu.map((sub, i) =>


                      React.createElement(MenuItem, {
                        classNames: [sub.name],
                        name: sub.name,

                        factory:
                          sub.iO.length !== 0 && sub.iO === "inputfactory"
                            ? inputfactory(sub.name, sub.properties)
                            : null || sub.iO === "outputfactory"
                            ? outputfactory(sub.name, sub.properties)
                            : null || sub.iO === "inputoutputfactory"
                            ? inputoutputfactory(sub.name, sub.properties)
                            : null

                      })
                    )}
                </div>
              ) : null}
            </div>
          ))
      )
    ),

    React.createElement(
      "div",
      { className: "flex-container-content" },


      React.createElement(
        "div",
        { className: "flex-container-content-header" },

        <Header  enableHomeBtn={enableHome}/>

      ),
      React.createElement(
        "div",
        { className: "flex-container-content-header " },
        props.state.workspace.length !== 0 ? null : (<div>
          <NewPopup name={workspace} onNameChange={setWorkspace} />
          </div>
        )
      ),

      React.createElement(
        "div",
        // { className: "flex-container-content-workarea" ,ref:countRef},
        { className: "flex-container-content-workarea" },


        React.createElement(
          "div",
          { className: "react-flow-header-title" },

          React.createElement("div", null
          , `${workspace}`
          ,React.createElement("img",{
            src:logo,
            // className:"react-flow-header-title-icon",
            width: "30px", height: "18px",alt:"Download Icon",onClick:handleDownload,
            style:{cursor:"pointer",marginLeft:"10px"}
          }
            )              ),
          

          React.createElement("div",{ className: "react-flow-editor " ,ref:countRef}
          ,
          React.createElement(
            Editor,
            {
              config: Object.assign(Object.assign({}, config), {
                onChanged: props.actions.editorUpdatesAction,
              }),
              nodes: props.state.nodes,
            },

            React.createElement(
              "button",
              {
                className: "react-flow-header-button",
                tyle: "button",
              },
              "SUBMIT"
            )
          

        )
        )
        )
      ),
      React.createElement(
        "div",
        { className: "flex-container-content-workarea" },
        <Properties />

      )
      
      
      

      
    
  )
  
  
  );
}
export default Bootstrap;
const render = (props) => <Bootstrap props={props} />;

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch),
});
const Container = connect(mapStateToProps, mapDispatchToProps)(render);
ReactDOM.render(
  React.createElement(
    Provider,
    { store: store },
    React.createElement(Container, null)
  ),
  document.getElementById("root")
);
