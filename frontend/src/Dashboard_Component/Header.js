import React,{useState,useEffect} from "react";
// import * as React from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';
import {   FaSearch, FaBell } from "react-icons/fa";
import Badge from '@mui/material/Badge';
// import './Header.css'
import "./Header.css"
// import profile from "../"
// import profile from '../../public/profile.png'
import profile from "./profile.png"
// import "./profile.png"
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import axios from "axios";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import MoreIcon from '@mui/icons-material/MoreVert';
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from '@mui/icons-material/Home';
import {useNavigate} from "react-router-dom"
// import "./Style/helpDoc.css"
import "./helpDoc.css"

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

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));





var date = new Date().toDateString();
// import DataTable from "./DataTable";

const Header = ({onValueChange}) => {
  let [inputValue,setInputValue]=useState("")
  const [loadData, setData] = useState([]);
  const [formData, setFormData] = useState([]);
  const [getRows, setRows] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [mveLogin,setMveLogin]=useState(false)

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


//103
  const [open,setOpen]=useState(false)
  const [opens,setOpens]=useState(false)
  
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  // const handleMenuClose = () => {
  //   // window.location.href="/login";
  //   setAnchorEl(null);
  //   handleMobileMenuClose();
  // };
  let navigate=useNavigate()
  // const handleMenuCloses = () => {
  //   setMveLogin(true)
  //   if(mveLogin){
  //     window.location.href="/"
  //   }

  const handleMenuCloses = () => {
    // console.log("mveLogin",!mveLogin)
    setMveLogin(true)
    if(mveLogin){
          console.log("mveLogin page ")
      navigate("/")
    }

 


//     <a href="/dashboard">
// </a>
    // mveLogin==true && window.location.href==="/"
    // navigate("/login")
    // console.log("helli hello")
    

    // setAnchorEl(null);
    // handleMobileMenuClose();
  };


  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
  
  


  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      // onClose={handleMenuClose}
      onClose={handleMenuCloses}

    >
      {/* <p></p> */}
                    {/* <p style={{color:"black",fontSize:"15px"}}>Shaikshavali</p> */}

      <MenuItem onClick={handleClickOpen} >Help</MenuItem>
      {/* //<MenuItem onClick={handleMenuClose}>Logout</MenuItem> */}
      <MenuItem onClick={handleMenuCloses}>Logout</MenuItem>

    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const handleInputChanges=(e)=>{
    const newValue=e.target.value
    setInputValue(newValue)
    onValueChange(newValue)
  }



// #notification
  // const handleClose = () => setOpen(false);

const handleOpens=()=>{
    setOpens(true)
    loadList();
}

const loadList = async () => {
  const result = await axios.get("http://127.0.0.1:9090/api/list");
  setData(result.data);
};

const getLatestRowDetails = async () => {
  const results = await axios.get("http://127.0.0.1:9090//api/getLatestRow");
  console.log("results2<--->",results)
  setRows(results.data);
  console.log("getrows")
};

useEffect(() => {
  loadList();
  getLatestRowDetails();
}, []);


const updateNotification=()=>{
  axios.post('http://127.0.0.1:9090/api/updateNotification')
  .then((result)=>{
      console.log("update notification",result)
      setOpens(false)
      getLatestRowDetails();
    })
    .catch(()=>{
      alert('Error in the Code');
    });
}


useEffect(() => {
  if (formData.length > 0) {
      console.log("formData updated:", formData);
  }

}, [formData]); // Only run when formData changes







  return (
    <>
            <Modal open={opens} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            {/* <Modal  open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description"> */}

             <Box sx={style}>
              <Grid container spacing={2}>
                   
                    <Grid xs={12}>
                       <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 250 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell component="th" ><b>Student Name</b></TableCell>
                                    <TableCell component="th"><b>Branch Name</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    console.log("final------final",loadData)
                                }
                            {loadData.map((row) => (
                                
                               <TableRow style={{ backgroundColor: row.status === "0" ? "green" : "white"}}>
                                    <TableCell> {row.name} </TableCell>
                                    <TableCell>{row.description}</TableCell>
                               </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer>
                   </Grid>
              </Grid>
               <br/><br/>
               <Box textAlign='center'> <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={updateNotification}
                  >
                    Ok
              </Button></Box>
 
             </Box>
            </Modal>
    <div>

      
      {/* <div className="flex-header-container">
    <div className="flex-header-date">
      <b>{date}</b>
    </div>

    <div className="flex-header-icons">
      <div className="flex-header-search">
            <div className="search-input ">
                <FaSearch  onClick={()=>{console.log("searching")}} className="searchs" />
                <input type="text" className="in" placeholder="Search Workspace" value={inputValue} onChange={handleInputChanges} />
            </div>
      </div>
      </div>

      
      <div className="flex-header-notification bell">

        <MenuItem onClick={handleOpen}>
                    <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                    >
                    <Badge  color="error">

                        <NotificationsIcon />
                    </Badge>
                    </IconButton>
             
         </MenuItem>



      </div>
      <div className="flex-header-profile">
        <img src={profile} width='25px' height='25px' alt="profile"/>
      </div>
    </div> */}
        {/* <img src={profile} width='25px' height='25px' alt="profile"/> */}

    <div className="flex-header-container">
    <Box sx={{ flexGrow: 1 ,marginLeft:"-10px"}} >
      <AppBar position="static" style={{marginLeft:"0px"}}>

        <Toolbar>
        {/* <HomeIcon style={{fontSize:"40px"}}/> */}

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' ,marginLeft:"-60px"} }}
          >
            {/* <HomeIcon style={{fontSize:"40px",marginTop:"10px"}}/> */}
            AHF
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={inputValue} 
              onChange={handleInputChanges} 
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon onClick={handleOpens} />
              </Badge>
            </IconButton>


            
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {/* <p style={{color:"black",fontSize:"15px",marginRight:"5px"}}>Shi</p> */}
              {/* <div style={{display:"flex",marginTop:"20px"}}> */}
              {/* <AccountCircle /> */}
                      <img src={profile} width='25px' height='25px' alt="profile"/>

              {/* </div> */}
                            <p style={{color:"black",fontSize:"15px",marginRight:"-20px",marginLeft:"-35px",marginTop:"55px",color:"white"}}>Sandy</p>



            </IconButton>


          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
    <div className="helpDocWrap">
    <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}       
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} className="popup-heading">
          Asset Health FrameWork
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <h6 style={{marginTop:"15px"}}>Introduction</h6>

          <Typography className='p-font' gutterBottom>
          Asset Health FrameWork is a self-service portal,In this we insert our data in form of Excels/Csv Files. It will generate the alerts . Its access is limited to LTTSites.
          <p className='p-text'>There are one technologies available at present- React </p>
          <p className='p-text'>Developers viewing/using/downloading the components from the playground are termed as 'Consumers'.
          </p>
          {/* <p className='p-text'>
          Each Component inside the Web App Studio playground was created by using the React and Angular Technologies. 
          </p>           */}
          </Typography> 

           <h6>Components details</h6>
          <Typography className='p-font' gutterBottom>
          In Playground you can find these components in the header section like Graphs/Charts, Forms, Search bar, QR Scanner, Login screen etc..
          </Typography> 
          <Typography className='p-font img-wrap' gutterBottom>
             {/* <img src={img1} style={{width:"495px"}} alt="Nav Info"/> */}
          </Typography> 
          <Typography className='p-font' gutterBottom>
          Every component in the playground allows input in JSON format only, which is completely customizable to suit the project needs. At the output screen, users are able to view the respective output.
          </Typography> 
          <Typography className='p-font img-wrap' gutterBottom>
          {/* <img src={img2} style={{width:"490px", height:"auto"}} alt="Graph Info"/> */}
          </Typography> 
          <Typography className='p-font' gutterBottom>
          Users can post comments or feedback or additonal requirement per component on the playground using a feature called “Chat Window”. Our App Studio core team is in charge of handling these Chat Window messages. Our core team will address the queries/comments in the chat window and provides the person the required updated component.
          </Typography> 
          <Typography className='p-font img-wrap' gutterBottom>
          {/* <img src={img3} alt="chat Info"/> */}
          </Typography> 
           <h6>App Health FrameWork Components:</h6>
          <Typography className='p-font' gutterBottom>
          Currently in our App Health FrameWork  there are total 11 categories are there in react as well as angular.
          <p className='p-text'>The categories are Graphs/Charts, Resting display, Forms, Media View, Date Picker/Calendar, Filter Bar, Help Info, Login Screen, QR Scanner, Search Bar and Tab view. Inside these components there are some subcategories are there for the better understanding please refer the below image.</p>
          </Typography>
          <Typography className='p-font img-wrap' gutterBottom>
          {/* <img src={img4} style={{width:"521px", height:"auto"}} alt="complete navigation Info" /> */}
          </Typography>
          <Typography className='p-font' gutterBottom>
          <p className='p-text'>There are 3 ways in which these components can be used:</p>
          <p className='p-text'>1. By using the App Health FrameWork  (Clicking on 'library' icon for the respective component on the playground )</p>
          <p className='p-text'>2. By using Hosted URL links available on the playground.</p>
          <p className='p-text'>3. We can give you the code snippets of the required component.</p>
          </Typography>

           <h6>What is Azure artifacts:</h6>
          <Typography className='p-font' gutterBottom>
          Azure DevOps Artifacts is a service that is part of the Azure DevOps toolset, which allows organizations to create and share libraries securely within the organization.
            <p className='p-text'>
            Every React and Angular components which are in app studio playground were deployed in their entirety as Azure artifacts. Users can quickly download these components by executing a few instructions if they desire to access them which is available in Azure DevOps.Please refer the below document for the same.
            </p>
            <p  className='p-text'>
              <a href="https://webappstudio-react.visualstudio.com/WebAppStudio-React/_wiki/wikis/WebAppStudio-React.wiki/58/How-To-Use-App-Studio-Libraries" target="_blank" rel="noreferrer">ReferenceDoc-HowToUseAppStudioLibraries - Overview (visualstudio.com)</a>
            </p>
          </Typography>

          <h6>App Health FrameWork  Workflow:</h6>
          <Typography className='p-font img-wrap' gutterBottom>
          {/* <img src={img5} alt="App process"/> */}
          </Typography>
          <p className='p-text'>
            The information provided on this web site may be related to products or services that are not available in your country.  
          </p> 

          <h6>App Health FrameWork  Community</h6>
          <h6>Introduction:</h6>
          <Typography  className='p-font' gutterBottom>         
          App Health FrameWork  Community is a web-based application for the registration of people who want to either consume or contribute to the App Studio Playground. The Contributor request must be approved by the owners before the user is allowed to join in Microsoft teams and Azure DevOps groups. By following this procedure, the contributor can create new react and angular components.
          </Typography>
          <h6>App Studio Community Workflow:</h6>
          <p className='p-text'>
          App Health FrameWork  Community is developed in Power apps. The user must first login using his outlook credentials. Upon successful login, the user will be taken to the App studio community Dashboard and Microsoft Teams, where they can request to be added to the App studio consumers group. After clicking on join, the admins of the App studio consumers group must approve the request before the user can join that group.
          </p>
          <p className='p-text'>
          In App Health FrameWork  community Dashboard, there is an option called “Be a contributor” on clicking that option the users who want to contribute for our App studio they can get from here. Once the user has selected the "Be a Contributor" option, they must add their primary and secondary abilities.
          </p>
          <p className='p-text'>
          The Contributor request must be approved by the owners before the user is allowed to join in Azure DevOps group. By following this procedure, the contributor can create new react and angular components in the App Studio playground.
          </p>
          <p className='p-text'>
          Once a user has successfully contributed, they can view their activity on the dashboard panel.
          </p>

          <p className='p-text'>
          The user will be directed to the app studio playground by selecting the "Go to playground" option in the app studio community.
          </p>
          
          <h6>Contributor Rules</h6>
          <Typography className='p-font' gutterBottom>
             1.	Default every person have consumer access but If user want to become a contributor, then he/she should enrol for contributor access.
           <p className='p-text'>
             2.	Contributors must provide basic information such as Primary and Secondary skills, and Web App Studio owners must grant these skills and access requests.
            </p> 
            <p className='p-text'>
             3.	A separate branch with employee PS number_component name must be created in the “New Components” repository on Azure.
            </p>
            <p className='p-text'>
             4.	Standalone application should be working as per the requirement.
            </p>
            <p className='p-text'>
             5.	For each component, the input has to come from a JSON file.
            </p>
            <p className='p-text'>
             6.	Any changes to JSON has to be reflected in the output.
            </p>
            <p className='p-text'>
             7. The component code shall not affect/change the existing components/playground/libraries in any way.
            </p>
          </Typography>

          <h6>Consumer Rules</h6>
          <Typography className='p-font' gutterBottom>
          <p className='p-text'>
           1.	By Default, every employee who logs in the community portal can have consumer access.
          </p>
          <p className='p-text'>
            2. Consumers can view or use components for their projects.
          </p>
          <p className='p-text'>
          3. Consumers are not allowed to create or edit the components.
          </p>
          {/* <p className='p-text'>
            4.	The components which are available in the Web App Studio are developed in React and Angular. Based on the user requirements they can use the components in their projects.
          </p> */}
          <p className='p-text'>
           5.	Consumers can download components from Azure Artifacts, which is available in Azure DevOps. If you don't know how to download components from Azure Artifacts, please refer the below document.
          </p>
          {/* <p className='p-text'>
             <a href='ReferenceDoc-HowToUseAppStudioLibraries - Overview (visualstudio.com)' target="_blank"  rel="noreferrer">ReferenceDoc-HowToUseAppStudioLibraries - Overview (visualstudio.com)</a>
          </p> */}
          </Typography> 
        
          <h6>Usage of React  components</h6>
          <Typography className='p-font' gutterBottom>       
          All React and components are deployed in Azure Artifacts, users can download components from Azure Artifacts. If you're not aware of how to download, please refer this below document.
          <p className='p-text'>
            {/* <a href='https://webappstudio-react.visualstudio.com/WebAppStudio-React/_wiki/wikis/WebAppStudio-React.wiki/58/How-To-Use-App-Studio-Libraries' target="_blank" rel="noreferrer">ReferenceDoc-HowToUseAppStudioLibraries - Overview (visualstudio.com)</a> */}
          </p>
          </Typography>
          
          <h6>Document for every component</h6>
          <Typography className='p-font' gutterBottom>          
          For each component there is a dedicated document available for user references, go to link below if require any assistance.
            <p className='p-text'>
            {/* <a href='https://webappstudio-react.visualstudio.com/WebAppStudio-React/_wiki/wikis/WebAppStudio-React.wiki/1/App-Studio-help-documents' target="_blank" rel="noreferrer">Web App Studio- React - Overview (visualstudio.com)</a> */}
          </p>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} className="HelpOkBtn" style={{backgroundColor:"#1f70b7", color:"#fff"}}>
           Ok
          </Button>
        </DialogActions>
      </BootstrapDialog>

      </div>

    
    </div>

  </div>
    
    </>
  );
};

export default Header;
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};