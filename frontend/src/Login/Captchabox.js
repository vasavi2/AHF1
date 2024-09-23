import React, { useState } from "react";
function Captcha() {
  const [user, setUser] = useState({
    username: "",
  });
  const characters = "abc123";
  function generateString(length) {
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  const captcha = generateString(6); // Function called here and save in captcha variable
  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    user[name] = value;
    setUser(user);
  };
  const onCancel=()=>{
    window.location.reload();

  }
  const onSubmit = (e) => {
    var element = document.getElementById("succesBTN");
    var inputData = document.getElementById("inputType");
    element.style.cursor = "wait";
    element.innerHTML = "Checking...";
    inputData.disabled = true;
    element.disabled = true;
    var myFunctions = function () {
      if (captcha === user.username) {
        element.style.backgroundColor = "green";
        element.innerHTML = "Captcha Verified";
        element.disabled = true;
        element.style.cursor = "not-allowed";
        inputData.style.display = "none";
      } else {
        element.style.backgroundColor = "red";
        element.style.cursor = "not-allowed";
        element.innerHTML = "Not Matched";
        element.disabled = true;
        //  element.disabled = true;
        var myFunction = function () {
          element.style.backgroundColor = "#007bff";
          element.style.cursor = "pointer";
          element.innerHTML = "Verify Captcha";
          element.disabled = false;
          inputData.disabled = false;
          inputData.value = "sssss";
        };
        setTimeout(myFunction, 5000);
      }
    };
    setTimeout(myFunctions, 5000);
  };

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-4"></div>

        <div className="col-md-8">
          <div className="form-group row">
            <table>
              <tr>
                <td>
                  <h3>Captcha</h3>
                </td>
                <td>
                  <h5>Type the code as shown</h5>
                </td>
              </tr>
              <tr>
                <td>
                  <h4 id="captcha">{captcha} </h4>
                </td>
                <td>
                  <input
                    type="text"
                    id="inputType"
                    className="form-control"
                    placeholder="Enter Captcha"
                    name="username"
                    onChange={handleChange}
                    autocomplete="off"
                    style={{ width:'120 px !important' , height :'0px', padding:'18px' }}
                  />
                </td>
              </tr>
              <tr>
                <td>
          
                  <button
                    type="button"
                    id="succesBTN"
                    onClick={onSubmit}
                  
                  >
                    Submit
                  </button>
                </td>
                <td>
                
                  <button
                    type="button"
                    id="cancelBTN"
                    onClick={onCancel}
                    className="default"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Captcha;
