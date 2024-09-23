import React from "react";
import { useState } from "react";
import axios from "axios";
import "./popup.css";

function NewPopup({ name, onNameChange, asdata, trigger,headerfun }) {
  const [loading, setLoading] = useState(true);
   let [account, setAccount] = useState(null);

  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    // account[name] = value;
    // let acobj = {
    //   ...account,
    //   ...asdata,
    // };
    let acobj={
      ...account,
      [name]:value,
      ...asdata
    }
     setAccount(acobj);
     
  };

  let save = (e) => 
  {
      e.preventDefault();

      if(loading){
      setLoading(false);
      trigger();
      let sendData = JSON.stringify(account);
  
      let customConfig = {
        headers: {
          "Content-Type": "application/json",
        },
      };
    //   const CREATE = process.env.REST_URL + "/insertAlert";
      const CREATE="http://127.0.0.1:9090/insertAlert"
      if(sendData!==null){
        axios
        .post(CREATE, sendData, customConfig)
        .then((res) => {
          setAccount(null)
          headerfun()
          
          alert("Alert create sucessfully");
          console.log("alerts---->",res.data)
        })
        .catch((err) => {
          console.log("Error Post Data", err);
          alert("error");
        });
      }

        
    }
  };

  return (
    <>
      {loading === true ? (
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
                <h6>Alert</h6>
                <div>
                  <button onClick={() => setLoading("")}>
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
                      <label
                        style={{
                          margin: "8px",
                        }}
                      >
                        Alert Name
                      </label>
                      <input
                        type="text"
                        name="alert"
                        placeholder="Alert Name"
                        style={{
                          borderColor: "grey",
                          width: "183px",
                          height: "25px",
                          borderRadius: "7px",
                        }}
                        onChange={handleChange}
                      />
                    </div>
                    <div style={{ margin: "13px" }}>
                      <label
                        style={{
                          margin: "5px",
                        }}
                      >
                        Start Time
                      </label>

                      <input
                        type="datetime-local"
                        name="start_time"
                        style={{
                          borderColor: "grey",
                          width: "183px",
                          height: "25px",
                          borderRadius: "7px",
                        }}
                        onChange={handleChange}
                      />
                    </div>
                    <div style={{ margin: "13px" }}>
                      <label
                        style={{
                          margin: "5px",
                        }}
                      >
                        End Time
                      </label>

                      <input
                        type="datetime-local"
                        name="end_time"
                        style={{
                          borderColor: "grey",
                          width: "183px",
                          height: "25px",
                          borderRadius: "7px",
                        }}
                        onChange={handleChange}
                      />
                    </div>
                    <div style={{ margin: "10px" }}>
                      <label
                        style={{
                          margin: "1px",
                        }}
                      >
                        Alert Type
                      </label>
                      <select
                        name="alert_type"
                        onChange={handleChange}
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
  );
}
export default NewPopup;
