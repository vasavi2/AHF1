import  React,{useState,useEffect}  from 'react';
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import "bootstrap/dist/css/bootstrap.min.css"
import { IoIosApps, IoIosAlert, IoIosHelp } from "react-icons/io";
import axios from "axios"
import Asset from './Asset';
import Alerts from './Alerts';
import Sensors from './Sensors';
import "./Sample.css"
// import Simple from './Simple';
import Divider from '@mui/material/Divider';
import shadows from '@mui/material/styles/shadows';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


export default function Sample() {
  const [spacing, setSpacing] = React.useState(2);
  const [products, setProducts] = useState([]);
  const [assets, setAssets] = useState([]);
  const [regions, setRegions] = useState([]);
  const [assett_name, setAssettName] = useState([]);
  const [ids, setIds] = useState(0);
  const [assetLenth,setAssetLength]=useState(1)
  const [assetids, setAssetIds] = useState(0);
  const [selectedassetID,setSelectedasseID]=useState(0)
  const [sensorLength,setSensorLength]=useState(0)
  const [sensor,setSensor]=useState([])
  const [sensorName,setSensortName]=useState([])
  const [alert,setAlert]=useState([])
  const [alertName,setAlertName]=useState([])
  const [selectedSensorId,setSelectedSensorId]=useState(0)
  const [AssetName,selectedAssetName]=useState("")
  const [SensorName,selectedSensorName]=useState("")
  //plant-map
  const defaultPosition = [13.0214494, 80.1756929];
  const [selectedPlant, setSelectedPlant] = useState(null);
  const mapRef = React.useRef(null);
  const [openAlert,setOpenAlert]=useState(false)


  //selected value
  let [selectedValue,setSelectedValue]=useState("")
  let [openForm,setOpenForm]=useState(false)

//specific normal--
{/* <p><Alerts len={lenalert} counts={tr} /></p> */}
  const [lenalert,setAlertLength]=useState(0)
  const [tr,setTr]=useState({})

  console.log("1---->lenalert",lenalert)
  console.log("1---->alert->tr",tr)



  {/* <p><Alerts len={lenalert} counts={tr}  len30={lenalert30} counts30={tr30} /></p> */}
  //specific period->30days
  const [lenalert30,setAlertLength30]=useState(0)
  const [tr30,setTr30]=useState({})
  const [open30Form,setOpenForm30]=useState(false)
  console.log("2---->lenalert30",lenalert30)


  {/* <p><Alerts len={lenalert} counts={tr}  len30={lenalert30} counts30={setTr30} lensix={lenalert_six_months}  countssix={tr_six_months}/></p> */}
  //specific period->6months
  const [lenalert_six_months,setAlertLength_six_months]=useState(0)
  const [tr_six_months,setTr_six_months]=useState({})
  console.log("3---->lenalert60",lenalert_six_months)
  const [open6Form,setOpenForm6]=useState(false)

  {/* <p><Alerts len={lenalert} counts={tr}  len30={lenalert30} counts30={setTr30} lensix={lenalert_six_months}  countssix={tr_six_months}  lenyear={lenalert_last_year}  countsyear={tr_last_year}/></p> */}
  //specific one year
  const [lenalert_last_year,setAlertLength_year]=useState(0)
  const [tr_last_year,setTr_last_year]=useState({})

  console.log("4---->lenalert_last_year",lenalert_last_year)



  // const handleChange=(e)=>{
    // setSelectedValue(e.target.value)

// }


const handleChange=(event)=>{
  setSelectedValue(event.target.value);
  switch(event.target.value){
    case 'Last year':
      setOpenForm(true)
      setOpenForm6(false)
      setOpenForm30(false)
      break
    case '6 months':
      setOpenForm(false)
      setOpenForm6(true)
      setOpenForm30(false)
      break;
    case 'Last month':
      setOpenForm(false)
      setOpenForm6(false)
      setOpenForm30(true)
      break
    default :
      setOpenForm(false)
      setOpenForm6(false)
      setOpenForm30(false)

  }
}



  // const renderComponent=()=>{
  //   switch(selectedValue){
  //       case "Last Months":
  //           return <Alerts len={lenalert30} counts={tr30} />
  //       case "Last 6 months":
  //               return <Alerts len={lenalert_six_months} counts={tr_six_months} />
  //       case "Last year":
  //               return <Alerts len={lenalert_last_year} counts={tr_last_year} /> 
  //       default :
  //           return <Alerts len={lenalert} counts={tr}/> 
  //   }
  // }










  useEffect(() => {
    (async () => {
      try {
  const res = await axios.get("http://127.0.0.1:9090/getplants");
        setProducts(res.data);
        setRegions(res.data.map(item => item.plant_name));
      } catch (error) {
        console.log(error)
      }
    })();
  }, []); // Empty dependency array

  console.log("plants map->",products)
  
  //plant-map
  const icon = L.icon({
    iconUrl: 'https://latitude.to/img/gmapz/pin-default.png',
        iconSize: [28, 55],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
      });


  useEffect(() => {
    if (ids) {
      (async () => {
        try {
          console.log("plant ids",ids)
          const res = await axios.get(`http://127.0.0.1:9090/getassetList/${ids}`);
          setAssetLength(res.data.length)
          
          setAssets(res.data);
          setAssettName(res.data.map(item => item.asset_name));
        } catch (error) {
          console.log(error)
        }
      })();
    }
  }, [ids]); // Dependency array with 'ids'

console.log("selected assets------------------------>",assets)

  useEffect(()=>{
    if(selectedassetID){
      (async ()=>{
        try{
          console.log("asset ids->",selectedassetID)
          const res = await axios.get(`http://127.0.0.1:9090/getsensorList/${selectedassetID}`);
         
          setSensorLength(res.data.length)
          setSensor(res.data);
          setSensortName(res.data.map(item => item.name));
          
        }
        catch(error){
          console.log(error)

        }
      })();
    }
  }
  ,[selectedassetID])


  

  useEffect(() => {
    if (selectedSensorId) {
      (async () => {
        try {
          console.log("sensor id->", selectedSensorId);
          console.log("selected final asset ids->", selectedassetID);
          console.log("selected final sensor ids->", selectedSensorId);

          //Normla 
          const res = await axios.get(`http://127.0.0.1:9090/getAlertLists/${selectedassetID}/${selectedSensorId}`);
          console.log("<------ alert data---->", res.data);
          setAlertLength(res.data.length);
          console.log("length of alerts----------->", lenalert);

          //30 days
          // const res30 = await axios.get(`http://127.0.0.1:9090/getAlertList30/${selectedassetID}/${selectedSensorId}`);
          // console.log("<----- alert data 30 ---->", res30.data);
          // setAlertLength30(res30.data.length)
          // console.log("length of alerts for 30 days222", lenalert30);
          // console.log("length of alerts for 30 days222", res30.data.length);
          // console.log("length of alerts for 30 days222", lenalert30);



          //6 month
          // const res_six_month = await axios.get(`http://127.0.0.1:9090/getAlertList6months/${selectedassetID}/${selectedSensorId}`);
          // console.log("<----- alert data 6 months ---->", res_six_month.data);
          // setAlertLength_six_months(res_six_month.data.length)
          // console.log("length of alerts for six months",res_six_month);
          // console.log("length of alerts for six months", res_six_month.data.length);


          // //1 year
          // const res_one_year = await axios.get(`http://127.0.0.1:9090/getAlertListlastyear/${selectedassetID}/${selectedSensorId}`);
          // console.log("<----- alert data for last 1 year ---->", res_one_year.data);
          // setAlertLength_year(res_one_year.data.length)
          // console.log("length of alerts for one year",lenalert_last_year);


          
          //normal
          const countAlerts = res.data.reduce(
            (acc, alert) => {
              if (alert.alert_type === 'True Positive') {
                acc.truePositive++;
              } else if (alert.alert_type === 'False Positive') {
                acc.falsePositive++;
              }
              else if (alert.alert_type === 'True Negative') {
                acc.trueNegative++;
              }
              else if (alert.alert_type === 'False Negative') {
                acc.falseNegative++;
              }
              // False Negative
              return acc;
            },
            { truePositive: 0, falsePositive: 0,trueNegative:0,falseNegative:0 }
          );
          console.log("Alerts data for nrml ---->",res.data)
          console.log("length of alerts for nrml", res.data.length);
          console.log("count alerts----->", countAlerts);
          setTr({...tr,countAlerts})



          //30days for truepositive,falsepositive
          // const countAlerts30 = res30.data.reduce(
          //   (acc, alert) => {
          //     if (alert.alert_type === 'True Positive') {
          //       acc.truePositive++;
          //     } else if (alert.alert_type === 'False Positive') {
          //       acc.falsePositive++;
          //     }
          //     else if (alert.alert_type === 'True Negative') {
          //       acc.trueNegative++;
          //     }
          //     else if (alert.alert_type === 'False Negative') {
          //       acc.falseNegative++;
          //     }
          //     return acc;
          //   },
          //   { truePositive: 0, falsePositive: 0,trueNegative:0,falseNegative:0 }
          // );

          // console.log("Alerts data for 30 days---->",res30.data)
          // console.log("length of alerts for 30 days", res30.data.length);
          // console.log("count alerts for 30 days----->", countAlerts30);
          // setTr30({...tr30,countAlerts30})



          //6months for truepositive,falsepositive
          // const countAlertssix_months = res_six_month.data.reduce(
          //   (acc, alert) => {
          //     if (alert.alert_type === 'True Positive') {
          //       acc.truePositive++;
          //     } else if (alert.alert_type === 'False Negative') {
          //       acc.falsePositive++;
          //     }
          //     else if (alert.alert_type === 'True Negative') {
          //       acc.trueNegative++;
          //     }
          //     else if (alert.alert_type === 'False Negative') {
          //       acc.falseNegative++;
          //     }
          //     return acc;
          //   },
          //   { truePositive: 0, falsePositive: 0,trueNegative:0,falseNegative:0 }
          // );

          // console.log("Alerts data for 6 months---->",res_six_month.data)
          // console.log("length of alerts for six months",res_six_month.data.length);
          // console.log("count alerts for 6 months----->", countAlertssix_months);
          // setTr_six_months({...tr_six_months,countAlertssix_months})


          

            //last year for truepositive,falsepositive
          // const countAlerts_last_year = res_one_year.data.reduce(
          //     (acc, alert) => {
          //       if (alert.alert_type === 'True Positive') {
          //         acc.truePositive++;
          //       } else if (alert.alert_type === 'False Negative') {
          //         acc.falsePositive++;
          //       }
          //       else if (alert.alert_type === 'True Negative') {
          //       acc.trueNegative++;
          //     }
          //     else if (alert.alert_type === 'False Negative') {
          //       acc.falseNegative++;
          //     }
          //       return acc;
          //     },
          //     { truePositive: 0, falsePositive: 0 ,trueNegative:0,falseNegative:0}
          //   );
          //   console.log("Alerts data for 1 year --->",res_one_year.data)
          //   console.log("length of alerts for one year",res_one_year.data.length);
          //   console.log("count alerts for last one year----->", countAlerts_last_year);
          //   setTr_last_year({...tr_last_year,countAlerts_last_year})
             

          
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [selectedSensorId]);


  useEffect(()=>{
    if(selectedSensorId && openForm){
      (async ()=>{
        try{

          
          // //1 year
          const res_one_year = await axios.get(`http://127.0.0.1:9090/getAlertListlastyear/${selectedassetID}/${selectedSensorId}`);
          console.log("<----- alert data for last 1 year ---->", res_one_year.data);
          setAlertLength_year(res_one_year.data.length)
          console.log("length of alerts for one year",lenalert_last_year);


          
            // last year for truepositive,falsepositive
          const countAlerts = res_one_year.data.reduce(
              (acc, alert) => {
                if (alert.alert_type === 'True Positive') {
                  acc.truePositive++;
                } else if (alert.alert_type === 'False Negative') {
                  acc.falsePositive++;
                }
                else if (alert.alert_type === 'True Negative') {
                acc.trueNegative++;
              }
              else if (alert.alert_type === 'False Negative') {
                acc.falseNegative++;
              }
                return acc;
              },
              { truePositive: 0, falsePositive: 0 ,trueNegative:0,falseNegative:0}
            );
            console.log("Alerts data for 1 year --->",res_one_year.data)
            console.log("length of alerts for one year",res_one_year.data.length);
            console.log("count alerts for last one year----->", countAlerts);
            setTr_last_year({...tr_last_year,countAlerts})


          

          }

        // }
        catch(error){
          console.log(error)

        }
      })();
    }
  }
  ,[selectedSensorId,openForm])

  console.log("tr_last_year------>",tr_last_year)


  useEffect(()=>{
    if(selectedSensorId && open6Form){
      (async ()=>{
        try{

            //6 month
          const res_six_month = await axios.get(`http://127.0.0.1:9090/getAlertList6months/${selectedassetID}/${selectedSensorId}`);
          console.log("<----- alert data 6 months ---->", res_six_month.data);
          setAlertLength_six_months(res_six_month.data.length)
          console.log("length of alerts for six months",res_six_month);
          console.log("length of alerts for six months", res_six_month.data.length);

                     //6months for truepositive,falsepositive
          const countAlerts = res_six_month.data.reduce(
            (acc, alert) => {
              if (alert.alert_type === 'True Positive') {
                acc.truePositive++;
              } else if (alert.alert_type === 'False Negative') {
                acc.falsePositive++;
              }
              else if (alert.alert_type === 'True Negative') {
                acc.trueNegative++;
              }
              else if (alert.alert_type === 'False Negative') {
                acc.falseNegative++;
              }
              return acc;
            },
            { truePositive: 0, falsePositive: 0,trueNegative:0,falseNegative:0 }
          );

          console.log("Alerts data for 6 months---->",res_six_month.data)
          console.log("length of alerts for six months",res_six_month.data.length);
          console.log("count alerts for 6 months----->", countAlerts);
          setTr_six_months({...tr_six_months,countAlerts})


          

          }

        // }
        catch(error){
          console.log(error)

        }
      })();
    }
  }
  ,[selectedSensorId,open6Form])

  console.log("tr_six_months------>",tr_six_months)


  
  useEffect(()=>{
    if(selectedSensorId && open30Form){
      (async ()=>{
        try{

            //30 days

                      //30 days
          const res30 = await axios.get(`http://127.0.0.1:9090/getAlertList30/${selectedassetID}/${selectedSensorId}`);
          console.log("<----- alert data 30 ---->", res30.data);
          setAlertLength30(res30.data.length)
          console.log("length of alerts for 30 days222", lenalert30);
          console.log("length of alerts for 30 days222", res30.data.length);
          console.log("length of alerts for 30 days222", lenalert30);

                      //30days for truepositive,falsepositive
          const countAlerts = res30.data.reduce(
            (acc, alert) => {
              if (alert.alert_type === 'True Positive') {
                acc.truePositive++;
              } else if (alert.alert_type === 'False Positive') {
                acc.falsePositive++;
              }
              else if (alert.alert_type === 'True Negative') {
                acc.trueNegative++;
              }
              else if (alert.alert_type === 'False Negative') {
                acc.falseNegative++;
              }
              return acc;
            },
            { truePositive: 0, falsePositive: 0,trueNegative:0,falseNegative:0 }
          );

          console.log("Alerts data for 30 days---->",res30.data)
          console.log("length of alerts for 30 days", res30.data.length);
          console.log("count alerts for 30 days----->", countAlerts);
          setTr30({...tr30,countAlerts})

         

         


          

          }

        // }
        catch(error){
          console.log(error)

        }
      })();
    }
  }
  ,[selectedSensorId,open30Form])
  console.log("tr 30 days------>",tr30)









  
 










const handleSelect = (e, value) => {
  const selectedProductID = products.find(product => product.plant_name === value);
  //plant->map
  setSelectedPlant(selectedProductID);
  console.log("selected plant name:",selectedProductID.plant_name)
  // if (selectedProductID ) {
  //   setIds(selectedProductID.plant_id);
  // }
  if (selectedProductID && mapRef.current) {
    setIds(selectedProductID.plant_id);  
    mapRef.current.setView([parseFloat(selectedProductID.latitude), parseFloat(selectedProductID.longitude)], 12);
  
  }
};

const handleAsset=(e,value)=>{
  const selectedProductID = assets.find(product => product.asset_name === value);
  console.log("selected asset name:",selectedProductID.asset_name)


  if(selectedProductID && selectedProductID.asset_name.length>0){
    selectedAssetName(selectedProductID.asset_name)

  }
  if(selectedProductID){
    setSelectedasseID(selectedProductID.id)
  }
}




const handleSensor=(e,value)=>{
  console.log(value)
  console.log(sensor)
  const selectedSenoserID =sensor.find(product=>product.name===value)
  console.log("<-sensors->",selectedSenoserID)

  if(selectedSenoserID && selectedSenoserID.name.length>0){
    console.log("selected sensor name->",selectedSenoserID)
    selectedSensorName(selectedSenoserID.name)
    console.log("sensorName---->",SensorName)
  }

  if(selectedSenoserID){
    console.log("selected sensor data",selectedSenoserID.sensorgroup_id)
    setSelectedSensorId(selectedSenoserID.sensorgroup_id)
  }
}


const handleOpenAlert=()=>{
  setOpenAlert((p)=>!p)

}












  return (
    <>
    <div style={{border:"1px solid black"}}>
            <div style={{marginTop:"15px",marginLeft:"5px",display:"flex",justifyContent:"space-evenly"}}>
             
            <Autocomplete   disablePortal   id="combo-box-demo"   options={regions}   sx={{ width: 300 }}
             renderInput={(params) => <TextField {...params} label="Plants"  />} onChange={handleSelect}/>



            <Autocomplete
                    disablePortal
                    id="combo-box-demo-assets"
                    options={assett_name}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Assets" />}
                    onChange={handleAsset}      
                  />

            
              <Autocomplete
                    disablePortal
                    id="combo-box-demo-assets"
                    options={sensorName}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Sensors" />}
                    onChange={handleSensor}      
                  />

<h1><FilterListIcon   className='filter' onClick={handleOpenAlert}  /></h1>

{openAlert && 
// (

// <Paper elevation={3} style={{width:'200px',height:'200px'}}>

//             <FormControl>
//             <FormLabel id="demo-radio-buttons-group-label">Show Status:</FormLabel>
//             <RadioGroup
//                 aria-labelledby="demo-radio-buttons-group-label"
//                 defaultValue="Current Months"
//                 name="radio-buttons-group"
//                 value={selectedValue} 
//                 onChange={handleChange}
//             >
//                 {/* <FormControlLabel value="Last Months" control={<Radio />} label="Current Months" /> */}
//                 {/* <FormControlLabel value="Last 6 months" control={<Radio />} label="Last 6 months" /> */}
//                 {/* <FormControlLabel value="Last year" control={<Radio />} label="Last year" /> */}
                
//             <FormControlLabel value="Last month" control={<Radio />} label="Last month" />
//             <FormControlLabel value="6 months" control={<Radio />} label="6 months" />
//             <FormControlLabel value="Last year" control={<Radio />} label="Last year" />
//             </RadioGroup>
//             </FormControl>
//     </Paper>)

(
  <div  >
  <FormControl style={{color:"black",border:"2px solid black",height:"60px",display:"flex"}}>
  <FormLabel style={{color:"black"}}>Show status for:</FormLabel>
        <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" value={selectedValue} onChange={handleChange}>
        <div style={{flex:"display",justifyContent:"space-between",color:"black"}}>
        {/* <FormControlLabel value="Last month" control={<Radio />} label="Last month" /> */}
        <FormControlLabel value="6 months" control={<Radio />} label="6 months" />  
        <FormControlLabel value="Last year" control={<Radio />} label="Last year" />
          </div>

        </RadioGroup>
</FormControl>
</div>
)
}

           
             
            </div>
              




    
    <Grid sx={{ flexGrow: 1 }} container spacing={2} style={{marginTop:"5px",marginRight:"50px"}}>
        <Grid item xs={12}>
                                          <Grid container justifyContent="center" spacing={spacing} >

                                                            <Grid item>
                                                                  <Paper
                                                                      sx={{
                                                                        height: 250,
                                                                        width: 1050,
                                                                        
                                                                        backgroundColor: (theme) =>
                                                                          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                                                      }}
                                                                                      style={{display:"row",justifyContent:"space-between",backgroundColor:"#f2f2f2"}}
                                                                                      >
                                                                          <p>
                                                                                <MapContainer ref={mapRef} center={selectedPlant ? [parseFloat(selectedPlant.latitude), parseFloat(selectedPlant.longitude)] : defaultPosition} zoom={selectedPlant ? 12 : 4} style={{ height: '240px', width: '100%' }}>
                                                                          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                                                                  {products.map((plant) => (
                                                                                    <Marker
                                                                                      key={plant.plant_id}
                                                                                      position={[parseFloat(plant.latitude), parseFloat(plant.longitude)]}
                                                                                      icon={icon}
                                                                                    >
                                                                                      <Popup>
                                                                                        {plant.plant_name} - {plant.region} <br /> Updated: {plant.update_time_stamp}
                                                                                      </Popup>
                                                                                    </Marker>
                                                                                  ))}
                                                                                </MapContainer>
                                                                          </p>
                                                                      </Paper> 
                                                                  </Grid>

                        <div style={{display:"flex",justifyContent:"space-evenly"}}>
                                  
                                                                    <Grid item>
                                                                      <Paper
                                                                        sx={{
                                                                          height: 150,
                                                                          width: 200,
                                                                          backgroundColor: (theme) =>
                                                                            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                                                        }}
                                                                        style={{display:"row",justifyContent:"space-between",paddingTop:"30px",paddingLeft:"50px",backgroundColor:"#f2f2f2",marginTop:"80px",marginLeft:"100px",position:"absolute",right:"900px",left:"200px"}}
                                                                        >
                                                                          <h3 style={{marginLeft:40}} >{assetLenth}</h3>

                                                                         <h4 style={{color:"blue"}}>Assets</h4>                                                                      
                                                                        </Paper>
                                                                      
                                                                    </Grid>


                                                                    <Grid item>
                                                                      <Paper
                                                                        sx={{
                                                                          height: 150,
                                                                          width: 200,
                                                                          backgroundColor: (theme) =>
                                                                            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                                                        }}
                                                                        style={{display:"row",justifyContent:"space-between",paddingTop:"30px",paddingLeft:"50px",backgroundColor:"#f2f2f2",marginTop:"80px",marginLeft:"50px",position:"absolute",right:"600px"}}>
                                                                              {/* <h3 style={{marginLeft:"40px"}}>{sensorLength}</h3> */}
                                                                              <h3 style={{marginLeft:"40px"}}>{sensorLength}</h3>


                                                                              <h4 style={{color:"blue"}}>Sensors</h4>         
                                                                          
                                                                        </Paper>
                                                                      
                                                                    </Grid>


                                                                    
                                                                    

                                                                  {/* <Grid item>
                                                                      <Paper
                                                                        sx={{
                                                                          height: 250,
                                                                          width: 500,
                                                                          backgroundColor: (theme) =>
                                                                            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                                                        }}
                                                                        style={{display:"row",justifyContent:"space-between",paddingTop:"20px",paddingLeft:"50px",backgroundColor:"#f2f2f2",marginLeft:"100px"}}>
                                                                        {
                                                                          <Alerts len={lenalert} counts={tr}/> 
                                                                        }


                                                                        </Paper>
                                                                      
                                                                    </Grid> */}

{
              openForm ?(
              //   <Grid item>
              //   <Paper
              //     sx={{
              //       height: 250,
              //       width: 500,
              //       marginLeft:500,
              //       // backgroundColor: (theme) =>
              //         // theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
              //     }}
              //     style={{display:"row",justifyContent:"space-between",boxShadow:"-20px 0px rgba(0, 0, 0, 0.21)",border:"2px solid black",paddingTop:"20px",paddingLeft:"50px"}}>
              //         {/* <p><Alert len={lenalert}/></p> */}
              //         {console.log("tr2--------->",tr)}
              //          <p><Alerts len={lenalert_last_year} counts={tr_last_year}/></p>

              //     </Paper>
              // </Grid>
              <p style={{border:"2px solid blaxk",marginTop:"25px",marginLeft:"600px",backgroundColor:"#f2f2f2",padding:"20px"}}>
                <Alerts len={lenalert_last_year} counts={tr_last_year}/>
                </p>

              
              ):open6Form ?(
              // <Grid item>
              //   <Paper
              //     sx={{
              //       height: 250,
              //       width: 500,
              //       // backgroundColor: (theme) =>
              //         // theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
              //     }}
              //     style={{display:"row",justifyContent:"space-between",boxShadow:"-20px 0px rgba(0, 0, 0, 0.21)",border:"2px solid black",paddingTop:"20px",paddingLeft:"50px"}}>
              //         {/* <p><Alert len={lenalert}/></p> */}
              //         {console.log("tr2--------->",tr)}
              //          <p><Alerts len={lenalert_six_months} counts={tr_six_months}/></p>

              //     </Paper>
              // </Grid>
              <p style={{border:"2px solid blaxk",marginTop:"25px",marginLeft:"600px",backgroundColor:"#f2f2f2",padding:"20px"}}>
                <Alerts len={lenalert_six_months} counts={tr_six_months}/></p>

              ):open30Form ?(
              //   <Grid item>
              //   <Paper
              //     sx={{
              //       height: 250,
              //       width: 500,
                    
              //     }}
              //     style={{display:"row",justifyContent:"space-between",boxShadow:"-20px 0px rgba(0, 0, 0, 0.21)",border:"2px solid black",paddingTop:"20px",paddingLeft:"50px"}}>
              //         {console.log("tr2--------->",tr)}
              //          <p><Alerts len={lenalert30} counts={tr30}/></p>

              //     </Paper>
              // </Grid>
              <p style={{border:"2px solid blaxk",marginTop:"25px",marginLeft:"600px",backgroundColor:"#f2f2f2",padding:"20px"}}><Alerts len={lenalert30} counts={tr30}/></p>

              ): (
              <Grid item>
                {/* <Paper
                  sx={{
                    height: 250,
                    width: 500,
                    marginLeft:20,
                    marginTop:5
                  }}
                  style={{display:"row",justifyContent:"space-between",boxShadow:"-20px 0px rgba(0, 0, 0, 0.21)",border:"2px solid black",paddingTop:"20px",paddingLeft:"50px"}}>
                      {console.log("tr2--------->",tr)}
                       <p><Alerts len={lenalert} counts={tr}/></p>
                  </Paper> */}
                                         <p style={{border:"2px solid blaxk",marginTop:"25px",marginLeft:"500px",backgroundColor:"#f2f2f2",padding:"20px"}}>
                                          
                                          <Alerts len={lenalert} counts={tr}/>
                                          </p>

              </Grid>

              )
            }

</div>




                                            
                                          </Grid>
                                </Grid>
                      <Grid item xs={12}>

      </Grid>
    </Grid>
    </div>
    </>
  );
}


