import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import AlarmIcon from '@mui/icons-material/Alarm';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MailIcon from '@mui/icons-material/Mail';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';




export default function Password() {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
    const currencies = [
        {
          value: 'USD',
          label: 'Super Admin',
        },
        {
          value: 'EUR',
          label: 'Admin',
        }
      ];

      const currencies2 = [
        {
          value: 'USD',
          label: 'India',
        },
        {
          value: 'EUR',
          label: 'Australia',
        }
      ];
      
      
  return (
    <>

    <Card sx={{height:300,width:1100,marginLeft:"-20px",color:"black"}} >

    <Typography variant="h6" gutterBottom style={{marginLeft:"15px",marginTop:"20px",color:"black"}}>
        Change Password
      </Typography>
      <Divider/>

      <div style={{display:"flex",justifyContent:"space-around"}}>

                    <div>
                                    <div>
                                                <FormControl sx={{ m: 1, width: '60ch',marginTop:"35px" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Current Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
                                        </div>
                                        <FormControl sx={{ m: 1, width: '60ch',marginTop:"35px" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
                        </div>

                        <div>
                                    <div>
                                    
                                        
                                        </div>

                                        <div style={{marginLeft:"2px",marginTop:"20px"}}>
                                        
                                        <FormControl sx={{ m: 1, width: '60ch',marginTop:"113px" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

                                        </div>
                        </div>

        </div>

     
    

    </Card>
   
    </>
  );
}


     
