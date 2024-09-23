import * as React from 'react';
import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Button from '@mui/material/Button';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';




 
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
 
export default function CheckboxesTags(props) {
  console.log("props--->",props)
  let file_name=props.FileNames["name"]
    props.dataOptions.unshift("AllSelect")
    console.log("parameters",Array.from(new Set(props.dataOptions)))
    const final_data=Array.from(new Set(props.dataOptions))

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [receiveFeature,setReceiveFeature]=useState([])
 
 
  // const handleOptionChange = (option) => {
  //   if (option === "AllSelect") {
  //     if (selectedOptions.includes("AllSelect")) {
  //       // If "AllSelect" is already selected, unselect all options
  //       setSelectedOptions([]);
  //     } else {
  //       // If "AllSelect" is selected, select all options
  //       // setSelectedOptions([...data]);
  //       setSelectedOptions([...final_data]);
  //       setReceiveFeature([...receiveFeature,{feature:selectedOptions}])
  //     }
  //   } 
  // };

  // const handleOptionChange = (option) => {
  //   console.log("selected options",selectedOptions)
  //   if (option === "AllSelect") {
  //     if (selectedOptions.includes("AllSelect")) {
  //       setSelectedOptions([]);
  //     } else {
  //       setSelectedOptions([...final_data]);
  //       setReceiveFeature([{ feature_selection: [...final_data] }]);
  //     }
  //   } else {
  //     setSelectedOptions((prevSelected) => {
  //       // let updatedOptions = [...prevSelected.filter((item) => item !== "AllSelect"), option];
  //       let updatedOptions = [prevSelected.filter((item) => item !== "AllSelect"), option];

  //       setReceiveFeature([{ feature: updatedOptions }]);
  //       console.log("selected parameters",updatedOptions)
  //       // return updatedOptions;
  //     });
  //   }
  // };

  const handleOptionChange = (option) => {
    if (option === "AllSelect") {
      if (selectedOptions.includes("AllSelect")) {
        setSelectedOptions([]);
        setReceiveFeature([]);
      } else {
        setSelectedOptions([...final_data]);
        setReceiveFeature([{file_name:file_name, feature_selection: [...final_data] }]);
      }
    } else {
      let updatedOptions;
      if (selectedOptions.includes("AllSelect")) {
        updatedOptions = [option];
        setReceiveFeature([{file_name:file_name,feature_selection: updatedOptions }]);
      } else {
        updatedOptions = selectedOptions.includes(option)
          ? selectedOptions.filter((item) => item !== option)
          : [...selectedOptions, option];
        setReceiveFeature([{file_name:file_name, feature_selection: updatedOptions }]);
      }
      setSelectedOptions(updatedOptions);
    }
  };
  

  console.log("selected features",selectedOptions)
  console.log("selected features2",receiveFeature[0])
  console.log("selected parameters2",selectedOptions)



  const handleSubmit = (e) => {
    alert("Successfully Data Received  ");
    <Stack sx={{ width: '100%' }} spacing={2}>
      
    <Alert severity="success">This is a success alert </Alert>
  </Stack>

    axios.post('http://127.0.0.1:9009/predicts', receiveFeature[0])
      .then(response => {
        console.log("response data->",response.data)
        // setReceivedFeatureData(response.data)
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  //
 
  return (
    <>
    <div style={{width:"900px",height:"350px",border:"2px solid black",marginTop:"700px",marginLeft:"10px"}}>

<div style={{marginTop:"10px",marginLeft:"20px"}}>
    
    

      {/* <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={Array.from(new Set(props.dataOptions))}
        // options={data}
        disableCloseOnSelect
        getOptionLabel={(option) => option}
        value={selectedOptions}
        onChange={(_, newValue) => setSelectedOptions(newValue)}
        renderOption={(props, option) => (
          <li {...props}>

            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selectedOptions.includes(option)}
              onChange={() => handleOptionChange(option)}
            />
            {option}
          </li>
        )} */}
         <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={Array.from(new Set(props.dataOptions))}
            disableCloseOnSelect
            getOptionLabel={(option) => option}
            value={selectedOptions}
            onChange={(_, newValue) => setSelectedOptions(newValue)}
            PopperComponent={({ children, anchorEl, open }) => (
              <div style={{ border: "1px solid #ccc", marginTop: "10px", width: "500px", display: open ? 'block' : 'none' }}>
                {children}
              </div>
            )}
            renderOption={(props, option) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleOptionChange(option)}
                />
                {option}
              </li>
            )}
        style={{ width: 500}}
        renderInput={(params) => (
          <TextField {...params} label="Checkboxes" placeholder="Favorites" />
        )}      
      />
      </div>
      <div>
      <Button variant="contained"   style={{position:"fixed",marginLeft:"780px",marginTop:"150px",width:"100px"}} onClick={handleSubmit}>submit</Button>

      </div>

              </div>

    </>
  );
}
