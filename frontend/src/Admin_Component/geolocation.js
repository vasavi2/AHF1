import React, { useState, useEffect,useImperativeHandle,forwardRef } from "react";
import TextField from "@mui/material/TextField";

function Geolocation(props, ref) {
  const [lat, setLat] = useState("");

  const [lng, setLng] = useState("");
  useImperativeHandle(ref,() => ({
      getStateValue: () => {
        let locobj={
            latitude:lat,
            longitude:lng
        }
        return locobj;
      }
    }));
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);

          setLng(position.coords.longitude);
        },

        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div>
      <div style={{ margin: "13px" }}>
        <label
          style={{
            margin: "8px",
          }}
        >
          latitude
        </label>
        <TextField
          name="latitude"
          placeholder="Latitude"
          value={lat}
          readOnly
          fullWidth
          label="Latitude "
        />
      </div>
      <div style={{ margin: "13px" }}>
        <label
          style={{
            margin: "8px",
          }}
        >
          longitude
        </label>
        <TextField
          name="longitude"
          value={lng}
          readOnly
          placeholder="longitude"
          fullWidth
          label="Longitude "
        />
      </div>
    </div>
  );
}
export default forwardRef(Geolocation)

