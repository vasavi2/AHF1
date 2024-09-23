import * as React from 'react';
import Button from '@mui/material/Button';
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



export default function Personal() {
    const currencies = [
        {
          value: 'USD',
          label: 'Super Admin',
        },
        {
          value: 'EUR',
          label: 'Admin',
        },
        {
            value: 'EURI',
            label: 'Manager',
          },
          {
            value: 'EURIO',
            label: 'User',
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

    <Card sx={{height:500,width:1100,marginLeft:"-20px"}} >

    <Typography variant="h6" gutterBottom style={{marginLeft:"15px",marginTop:"20px",color:"black"}}>
        General Setting
      </Typography>
      <Divider/>

      <div style={{display:"flex",justifyContent:"space-around"}}>

                    <div>
                                    <div>
                                    <FormControl fullWidth sx={{ m: 1,width: '60ch' ,marginTop:"35px"}}>

                                        <InputLabel htmlFor="outlined-adornment-amount">Username</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            startAdornment={<InputAdornment position="start">Shaikshavali</InputAdornment>}
                                            label="Username"
                                        />
                                        </FormControl>
                                        </div>

                                        <div style={{marginLeft:"2px",marginTop:"20px"}}>
                                        <TextField sx={{ m: 1,width: '60ch' }}
                                        id="outlined-select-currency"
                                        select
                                        label="User Type"
                                        defaultValue="EUR"
                                        helperText="Please select your position"
                                        >
                                        {currencies.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                            </MenuItem>
                                        ))}
                                        </TextField>

                                        </div>
                        </div>

                        <div>
                                    <div>
                                    <FormControl fullWidth sx={{ m: 1,width: '60ch' ,marginTop:"35px"}}>

                                        <InputLabel htmlFor="outlined-adornment-amount">Account Email</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            startAdornment={<InputAdornment position="start">Shaikshavali</InputAdornment>}
                                            label="Username"
                                        />
                                        </FormControl>
                                        </div>

                                        <div style={{marginLeft:"2px",marginTop:"20px"}}>
                                        <TextField sx={{ m: 1,width: '60ch' }}
                                        id="outlined-select-currency"
                                        select
                                        label="Location"
                                        defaultValue="EUR"
                                        helperText="Please select your position"
                                        >
                                        {currencies2.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                            </MenuItem>
                                        ))}
                                        </TextField>

                                        </div>
                        </div>

        </div>

        <div style={{display:"flex"}}>
        <div style={{marginLeft:"10px",marginTop:"30px"}}>
        <TextField sx={{ m: 1,width: '80ch' }}
          id="outlined-multiline-static"
          label="My Bio"
          multiline
          rows={4}
          defaultValue="Data.............."
        />

        </div>
        <div style={{marginLeft:"230px",marginTop:"120px"}}>
        <Button variant="contained">Submit</Button>


        </div>

        </div>




     
    

    </Card>
   
    </>
  );
}


     
