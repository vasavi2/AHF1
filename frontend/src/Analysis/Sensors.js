import React, { useState, useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import axios from "axios"
const data = [
  { value: 10, label: 'A' } // Update the value to 10
];
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
        Sensors
      </StyledText>
    </>
  );
}
export default function Sensors(props) {
  console.log("sensors props",props)
  let abb=""
  if(Object.keys(props.name).length){
    console.log("size",size)
    const words=props.name.split(" ");
    console.log("words",words)
    abb=words.map(word=>word[0].toUpperCase()).join("");
    console.log("abb",abb.length)
  }

  return (
    <>
      
             <PieChart
      series={[
        { data: [{ value: 10, color: 'skyblue',label:abb }],innerRadius:70 }
      ]}
      {...size}>
            <PieCenterLabel>
           {props["len"]}
      </PieCenterLabel>

      </PieChart>
    </>
  );
}


