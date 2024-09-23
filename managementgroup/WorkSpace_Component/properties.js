import React from "react";
import useKeypress from "react-use-keypress";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
function Properties(props) {
  const datas = useSelector((state) => state);

  const [isLoading1, setIsLoading1] = useState("");

  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const initialValues1 = [];

  const [values, setValues] = useState(initialValues1);
  const dispatch = useDispatch();

  useKeypress(["Delete"], () => {
    setIsLoading1("");
    isLoading1 === "NodeSelected" &&
      confirmAlert({
        title: "Confirm to Delete Node ?",
        message: "Are you sure to do this.",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              if (datas.nodes.length > 0) {
                const idsToRemove = [datas.popup[0].id]; //filif

                const filtered = datas.nodes.filter(
                  (item) => !idsToRemove.includes(item.id)
                );

                datas.nodes = [];
                filtered.map((iteam) => {
                  return datas.nodes.push(iteam);
                });

                console.log("filter", datas.nodes);
                return [...datas.nodes];
              }
            },
          },
          {
            label: "Cancel",
            onClick: () => {
               return ;
            },
          },
        ],
      });
    return [];
  });

  const handleSubmit = () => {
    const obj = {
      type: "EDITOR_PROPERTIES",
      payload: values,
    };

    dispatch(obj);

    setValues(initialValues1);
    setIsLoading1("")
    setTimeout(() => {
      setLoading(false);
    }, 1);


    setLoading(true);
    setIsError(false);
  };

  const loading1 = datas.openclose1[0];
  useEffect(() => {
    setIsLoading1(loading1);
  }, [loading1]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
      id: datas.popup[0].id,
    });
  };

  return (
    <div>
      {isLoading1 === "NodeSelected" ? (
        <div id="popup1" className="overlay">
          <div className="popup">
            <div
              style={{
                borderBottom: "#FFFFFF 2px solid",
                width: "87px",
              }}
            >
              <h2
                style={{
                  color: "#FFFFFF",
                  fontSize: "small",
                }}
              >
                PROPERTIES
              </h2>
            </div>
            <button onClick={() => setIsLoading1("")} className="close">
              x
            </button>

            <div className="content">
            <form>
              <p
                style={{
                  color: "#FFFFFF",
                }}
              >
               
                  <div>
                    {datas.popup.map((objKey) =>
                      Object.entries(objKey.properties).map(([key, value]) => (
                        <div
                          style={{
                            display: "flex",
                            flexFlow: "column wrap",
                          }}
                        >
                          <div>
                            <label> {key} </label>
                          </div>
                          <div>
                            {value.type === "text" ? (
                              <input
                                className="form-control"
                                type={value.type}
                                id="valueData"
                                name={key}
                                value={values.myvalue1}
                                onChange={handleInputChange}
                                placeholder={value.value}
                              />
                            ) : (
                              <select
                                className="form-control"
                                name={key}
                                id="valueData1"
                                value={values.myvalue1}
                                onChange={handleInputChange}
                              >
                                <option>Select</option>
                                {value.values.map((optionvalue) => {
                                  return (
                                    <option value={optionvalue}>
                                      {optionvalue}
                                    </option>
                                  );
                                })}
                              </select>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  {isError && (
                    <small className="mt-3 d-inline-block text-danger"></small>
                  )}
                  <button
                    type="submit"
                    className="properties-button"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "SAVE"}
                  </button>
               
              </p>
               </form>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default Properties;
