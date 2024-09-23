import React, { useState, useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import "./Alert.css"
import axios from "axios"

const size = {
  width: 400,
  height: 200,
};
const StyledText = styled('text')(({ theme, fontSize }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: fontSize || 20,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  const fontSize = 40; // Font size for '6'
  const assetsY = top + height / 2 + fontSize / 4 + 20; // Added 20 for extra spacing
  return (
    <>
      <StyledText x={left + width / 2} y={top + height / 2 - fontSize / 4} fontSize={`${fontSize}px`}>
        {children}
      </StyledText>
      <StyledText x={left + width / 2} y={assetsY} fontSize="20px">
        Alerts
      </StyledText>
    </>
  );
}

export default function Alerts(props) {
  console.log("<-----props----->",props)
  


  props.counts.countAlerts!==undefined && console.log("props alerts",props.counts.countAlerts["falsePositive"])

  
  return (
    <>     
{props.counts.countAlerts!==undefined ?(
       
    <PieChart
        series={[
            { 
          data: [{ value:props.counts.countAlerts["falsePositive"] , color: 'orange',label:`FalsePos-${props.counts.countAlerts["falsePositive"]}` },
        { value: props.counts.countAlerts["truePositive"], color: 'green',label:`TruePos-${props.counts.countAlerts["truePositive"]}` },
        { value: props.counts.countAlerts["trueNegative"], color: 'pink',label:`TrueNeg-${props.counts.countAlerts["trueNegative"]}` },
        { value: props.counts.countAlerts["falseNegative"], color: 'brown',label:`FalseNeg-${props.counts.countAlerts["falseNegative"]}` },


      ],innerRadius:70 
      }
        ]}
        style={{marginLeft:"50px"}}
        {...size}>

        <PieCenterLabel>
              {
            props.len
           }
        </PieCenterLabel>
      </PieChart>
      ):(

      <PieChart
        series={[
            { 
          data: [{ value:10 , color: 'orange',label:`FalsePos-${0}` },
        { value: 10, color: 'green',label:`TruePos-${0}` },
        { value: 10, color: 'pink',label:`TrueNeg-${0}` },
        { value: 10, color: 'brown',label:`FalseNeg-${0}` },



      ],innerRadius:70 
      }
        ]}
        style={{marginLeft:"50px"}}
        {...size}>

        <PieCenterLabel>
             0
        </PieCenterLabel>
      </PieChart>



      )


  }


    </>
  );
}