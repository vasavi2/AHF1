import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Card from "@mui/material/Card";
// import Personl from './Personal';
// import Profile from './Profile';
import { styled } from '@mui/material/styles';
// import Password from './Password';

import Personal from './Personal';
import Profile from './Profile';
import Password from './Password';

import  CardContent  from '@mui/material/CardContent';


export default function List() {
  const [value, setValue] = React.useState('Profile');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  
  const StyledTabs = styled((props) => (
    <Tabs
      {...props}
      TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
  ))({
    '& .MuiTabs-indicator': {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: '#635ee7',
    },
  });
  
  const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      textTransform: 'none',
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(15),
      marginRight: theme.spacing(1),
      color: '#141414',
      '&.Mui-selected': {
        color: "blue",
      },
      '&.Mui-focusVisible': {
        backgroundColor: "blue",
      },
    }),
  );




  return (
    <Card sx={{minHeight:84+"vh",width:"1100px"}} style={{background:"#f2f2f2"}}>
        {/* <CardContent> */}
    <Box sx={{ width: '100%' }}>
      <TabContext value={value}>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

          <StyledTabs onChange={handleChange} aria-label="lab API tabs example">

            <StyledTab label="Profile" value="Profile" />
            <StyledTab label="My Account" value="Personal Details" />
            <StyledTab label="Change Password" value="Change Password" />

          </StyledTabs>
        </Box>



        <TabPanel value="Profile"><Profile/></TabPanel>
        <TabPanel value="Personal Details"> <Personal/></TabPanel>
        <TabPanel value="Change Password"><Password/></TabPanel>

      </TabContext>
    </Box>
    {/* </CardContent> */}
    </Card>
  );
}