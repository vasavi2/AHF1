import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import MailIcon from '@mui/icons-material/Mail';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PlaceIcon from '@mui/icons-material/Place';
import { styled } from '@mui/material/styles';


import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& > :not(style) ~ :not(style)': {
      marginTop: theme.spacing(2),
    },
  }));




export default function Profile() {
    const content = (
        <div>
          {`As a System Manager,I Manage the district heat system to heat water supply and maintain a stable temperature
        throughout the plant.`}
       
        </div>
      );

  return (
    <>
    <div style={{display:"flex"}}>
    <Card sx={{width:400,height:300,marginLeft:"-20px",positon:"absolute"}} >
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      }}
    >

    <Typography variant="h5" gutterBottom style={{marginLeft:"25px",marginTop:"20px"}}>
    N Shaikshavali
      </Typography>
      <Divider variant="inset" component="li"  sx={{width:'85%'}} style={{marginLeft:"30px",marginTop:"40px"}}/>

      <Divider variant="inset" component="li"  sx={{width:'85%'}} style={{marginLeft:"30px",marginTop:"60px"}}/>

      <div style={{display:"flex",marginTop:"-40px",marginLeft:"50px"}}>
        <MailIcon />
        <p style={{position:"absolute",top:"123px",marginLeft:"60px"}}>shaikshavali.niruaganti@gmail.com</p>
    </div>


      <div style={{display:"flex",marginLeft:"50px",marginTop:"35px"}}>
        <PhoneAndroidIcon />
        <p style={{marginLeft:"60px",position:"absolute",top:"185px"}}>(+91) 99999 99999</p>
        </div>

 

        <Divider variant="inset" component="li"  sx={{width:'85%'}} style={{marginLeft:"30px",marginTop:"15px"}}/>

        <div style={{display:"flex",marginTop:"20px",marginLeft:"50px"}}>
        <PlaceIcon />
        <p style={{position:"absolute",top:"245px",marginLeft:"60px"}}>India</p>
        </div>





    </List>

    </Card>

    <Card sx={{width:710,height:500,padding:0}} style={{marginLeft:"10px"}}>
        <Typography variant="h5" gutterBottom style={{marginLeft:"50px",marginTop:"30px"}}>
      About me
      </Typography>
        
            <Root style={{marginLeft:"50px"}}>
            {/* <Divider sx={{width:'85%',marginTop:"20px"}} /> */}

      {content }

      <Typography variant="h5" gutterBottom style={{marginTop:"40px"}}>
      Details
      </Typography>


      <Divider sx={{width:'87%',marginTop:"140px"}} />
      <div style={{display:"flex",marginTop:"0px"}}>
        <Typography variant="subtitle2"  gutterBottom style={{marginLeft:"10px",marginTop:"15px",color:"black"}}>
        Full  Name:
      </Typography>
              <Typography variant="subtitle1"  gutterBottom style={{marginLeft:"30px",marginTop:"13px",color:"black"}}>
        Shaikshavali
      </Typography>


      </div>


      {/* <Divider sx={{width:'45%',position:"absolute",top:"350px"}} /> */}

      <Divider sx={{width:'45%',marginTop:"-10px",position:"absolute",top:"440px"}} />

      <div style={{display:"flex",marginTop:"0px"}}>

        <Typography variant="subtitle2"  gutterBottom style={{marginLeft:"10px",marginTop:"20px",color:"black"}}>
        Address:
      </Typography>
              <Typography variant="subtitle1"  gutterBottom style={{marginLeft:"45px",marginTop:"17px",color:"black"}}>
              Mumbai,India
      </Typography>


      </div>
      <Divider sx={{width:'45%',position:"absolute",top:"505px"}} />
      <div style={{display:"flex",marginTop:"0px"}}>


        <Typography variant="subtitle2"  gutterBottom style={{marginLeft:"10px",marginTop:"25px",color:"black"}}>
        Zip Code:
      </Typography>
              <Typography variant="subtitle1"  gutterBottom style={{marginLeft:"40px",marginTop:"20px",color:"black"}}>
              522357
      </Typography>
      </div>
      <Divider sx={{width:'45%',position:"absolute",top:"550px"}} />
      <div style={{display:"flex",marginTop:"0px"}}>
 

        <Typography variant="subtitle2"  gutterBottom style={{marginLeft:"10px",marginTop:"25px",color:"black"}}>
        Website:
      </Typography>
              <Typography variant="subtitle1"  gutterBottom style={{marginLeft:"45px",marginTop:"20px",color:"black"}}>
              https:www.plantengineering//.com
      </Typography>
      </div>



      
    </Root>



    </Card>
    </div>

</>
    
       
  );
}