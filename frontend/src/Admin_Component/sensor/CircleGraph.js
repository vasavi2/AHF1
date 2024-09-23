import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

function CircleGraph() {
  const data = [
    { title: 'A1', value: 10, color: '#E38627' },
    { title: 'A2', value: 15, color: '#C13C37' },
    { title: 'A3', value: 20, color: '#6A2135' },
  ];

  return (
    <div style={{display:"inline-grid"}}>
    <PieChart
      data={data}
     
      // lineWidth={15}
      // paddingAngle={1}
      // radius={42
      label={({ dataEntry }) => `${dataEntry.title}, It has ${Math.round(dataEntry.percentage)}% Sensor `}
      labelStyle={{
        fontSize: '5px',
        fontFamily: 'sans-serif',
        fill: '#fff',
      }}
    />
    </div>
  );
}

export default CircleGraph;
