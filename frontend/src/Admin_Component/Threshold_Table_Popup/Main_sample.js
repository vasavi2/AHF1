import { useState } from "react";
import * as XLSX from 'xlsx';
// import CheckboxesTags from "./Components/CheckboxesTags";
// import CheckboxesTags from "./CheckboxesTags.js"
import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Swal from 'sweetalert2'
import axios from "axios";
import Alert from '@mui/material/Alert';
// import CheckboxesTags from "./CheckboxesTags";
import CheckboxesTags from "./CheckboxesTags"
// import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "./Upload.css"



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.pink,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

  



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
'& .MuiDialogContent-root': {
  padding: theme.spacing(2),
},
'& .MuiDialogActions-root': {
  padding: theme.spacing(1),
},
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle  {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function Main() {

    //
    const [refresh, setRefresh] = useState(true);
    const [loading, setLoading] = useState(true);

  // onchange states
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const [selected_Files,setSelected_Files]=useState("")
  const [upload,setUpload]=useState(false)
  //table view
  const [open, setOpen] = React.useState(false);

  //yes or no
  const [yess,setYess]=useState(false)

  

  const handleClickOpen = () => {
    setOpen(true);
  };
  // const handleClose = () => {
    // setOpen(false);


    // Swal.fire({
    //   title: "Are you sure?",
    //   text: "Do you want select Feature Selection!",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Yes!",
    //   cancelButtonText:"No"      
    // })
    


  // };


  const handleClose = () => {
    setOpen(false);


    Swal.fire({
      title: "Are you sure?",
      text: "Do you want select Feature Selection!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
      cancelButtonText:"No"      
    })
    .then((result) => {
      if (result.isConfirmed) {
        setYess(true)
        // If the user selects "Yes," show checkboxes
        // setOpen(true);
      } else {
        // If the user selects "No," directly send parameters and file name to the backend
        if (excelData) {
          setYess(false)
          const dataToSend = {
  file_name: selected_Files.name,
            feature_selection: Object.keys(excelData[0])
          };
          alert(" Data Received Successfully✊")
          // <Alert severity="success">Successfully Data Received  — check it out!</Alert>
  // Make an API call here with dataToSend using axios.post or fetch
  // 9005
  axios.post('http://127.0.0.1:9009/predicts', dataToSend)
            .then(response => {
              // Handle response if needed
              console.log("direct data send",response.data)
            })
            .catch(error => {
              // Handle error if needed
            });
        }
      }
    });
    


  };

  // submit state
  const [excelData, setExcelData] = useState(null);

  // onchange event-main
  // const handleFile=(e)=>{
  //   let fileTypes = ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','text/csv'];
  //   let selectedFile = e.target.files[0];
  //   setSelected_Files(selectedFile)
  //   console.log("selectedFile",selectedFile)
  //   if(selectedFile){
  //     if(selectedFile&&fileTypes.includes(selectedFile.type)){
  //       setTypeError(null);
  //       let reader = new FileReader();
  //       reader.readAsArrayBuffer(selectedFile);
  //       reader.onload=(e)=>{
  //         setExcelFile(e.target.result);
  //       }
  //     }
  //     else{
  //       setTypeError('Please select only excel file types');
  //       setExcelFile(null);
  //     }
  //   }
  //   else{
  //     console.log('Please select your file');
  //   }
  // }


  //sample
  
  const handleFile=(e)=>{
    let fileTypes = ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','text/csv'];
    let selectedFile = e.target.files[0];
    console.log("selectedFile---->",selectedFile)
//form data
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
//

    setSelected_Files(selectedFile)
    console.log("selectedFile",selectedFile)
    if(selectedFile){
      if(selectedFile&&fileTypes.includes(selectedFile.type)){
        setTypeError(null);
        let reader = new FileReader();
        console.log("reader",reader)
        reader.readAsArrayBuffer(selectedFile);
        console.log("reader2",reader)
        reader.onload=(e)=>{
          setExcelFile(e.target.result);
        }

//csv/excel ->file upload
        const reader_txt = new FileReader();
        reader_txt.readAsText(selectedFile);
        reader_txt.onload = async function () 
        {
          // const csvData = reader.result;
          // const senddata = JSON.stringify(csvData);
          console.log("formData", formData);
          let header = {
            "Content-Type": "application/json",
          };
          console.log("formData",formData)
          await axios
          // 9006
        .post("http://127.0.0.1:9009/upload", formData, header)
        .then((response) => {
          // alert("File Uploaded Successfully");
          // setLoading(false);
          setRefresh(false);
          // Do something with the response
        })

        .catch((error) => {
          console.log(error);
          alert("Upload Failed", error);

          // Handle the error
        });
    }



    }
      else{
        setTypeError('Please select only excel file types');
        setExcelFile(null);
      }
    }
    else{
      console.log('Please select your file');
    }
  }

  

  console.log("upload file",excelFile)
  
  // submit event
  const handleFileSubmit=(e)=>{
    console.log("files event",e)
    
    setRefresh(true);
    setOpen(true);
    setUpload(true)
    e.preventDefault();
    if(excelFile!==null){
      const workbook = XLSX.read(excelFile,{type: 'buffer'});
      console.log("workbook",workbook)
      const worksheetName = workbook.SheetNames[0];
      console.log("worksheetName",worksheetName)

      const worksheet = workbook.Sheets[worksheetName];
      console.log("worksheet",worksheet)
      const data = XLSX.utils.sheet_to_json(worksheet);
      console.log("data",data)
      setExcelData(data.slice(0,10));

      //upload file
    //   const file = e.target.files[0];
    //   const formData = new FormData();
    //   formData.append("file", e.target.files[0]);
    //   const reader = new FileReader();
    //   reader.readAsText(file);
    //   reader.onload = async function () {
    //     // const csvData = reader.result;
    //     // const senddata = JSON.stringify(csvData);
    //     console.log("formData", formData);
    //     let header = {
    //       "Content-Type": "application/json",
    //     };
    //     console.log("formData",formData)
    //     await axios
    //       .post("http://127.0.0.1:9006/upload", formData, header)
    //       .then((response) => {
    //         alert("File Uploaded Successfully");
    //         setLoading(false);
    //         setRefresh(false);
    //         // Do something with the response
    //       })
  
    //       .catch((error) => {
    //         console.log(error);
    //         alert("Upload Failed", error);
  
    //         // Handle the error
    //       });
    //   };





    }
  }

  return (
    <>
    <div className="wrapper">

      <h1 style={{left:"490px",color:"green",position:"absolute",top:"100px"}}>Upload Your Sensor Group Data</h1>
      <h3 style={{fontFamily:"'Playfair Display', serif",color:"black"}}>Upload & View Excel/CSV File</h3>

      {/* form */}
      <input type="file" style={{color:"black",position:"absolute",top:"150px",marginTop:"10px",left:350,width:"750px"}} className="form-control" required onChange={handleFile} />

      <form className="form-group custom-form" onSubmit={handleFileSubmit}>
        {/* <input type="file" style={{color:"black",position:"absolute",top:"150px",marginTop:"10px",left:350}} className="form-control" required onChange={handleFile} /> */}
        {/* <input type="file" style={{color:"black",position:"absolute",top:"150px",marginTop:"10px",left:350}} className="form-control" required onChange={handleFile} /> */}

        <button type="submit" style={{marginLeft:"500px",position:"absolute",top:"140px",left:620,marginTop:"20px",background:"green",color:"white"}} className="btn btn-success btn-md">UPLOAD</button>

        <div className="helpDocWrap">
      {/* <Button onClick={handleClickOpen} style={{color:"#171617", border:"none !important", margin:"0px", padding:"0px", fontSize:"1rem", textTransform:"capitalize",background:"blue"}}> */}
       {/* Help */}
      {/* </Button> */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}       
      >
           {excelData && <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700,color:"white" }} aria-label="customized table">
        <TableHead style={{color:"white"}}>
          <TableRow>
            {/* <StyledTableCell>Dessert (100g serving)</StyledTableCell>
            <StyledTableCell align="right">Calories</StyledTableCell>
            <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
            
            { Object.keys(excelData[0]).map((key)=>(
                    <StyledTableCell align="right" style={{color:"white"}} key={key}> {key.charAt(0).toUpperCase()+key.slice(1)} </StyledTableCell>
                  ))}
          </TableRow>
        </TableHead>
        <TableBody>

          {/* {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell>
            </StyledTableRow>
          ))} */}

          {excelData.map((individualExcelData, index)=>(
                  <StyledTableRow key={index}>
                    {Object.keys(individualExcelData).map((key)=>(
                      <StyledTableCell key={key}>{individualExcelData[key]}</StyledTableCell>
                    ))}
                  </StyledTableRow>
                ))}

          
        </TableBody>
      </Table>
    </TableContainer>}
        <DialogActions>
          <Button autoFocus onClick={handleClose} className="HelpOkBtn" style={{backgroundColor:"#1f70b7", color:"#fff"}}>
           Ok
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>





        {typeError&&(
          <div className="alert alert-danger" role="alert">{typeError}</div>
        )}
      </form>

      {/* view data */}
      <div className="viewer">
        {excelData?(
          <div style={{color:"green",width:"845px",paddingLeft:"250px"}} className="table-responsive">
            
            File Successfully Uploaded😀!
          </div>
        ):(
          <div style={{color:"green",width:"845px",paddingLeft:"170px",position:"absolute",top:"10px",marginLeft:"300px"}}>No File is uploaded yet😑!</div>
        )}
      </div>

      { yess  &&<CheckboxesTags dataOptions={excelData?Object.keys(excelData[0]):[]} FileNames={selected_Files}/> }


     {/* { upload &&<CheckboxesTags dataOptions={excelData?Object.keys(excelData[0]):[]} FileNames={selected_Files}/> } */}

    </div>

    </>
  );
}

export default Main;
