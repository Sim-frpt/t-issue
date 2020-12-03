import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import MinorTitle from 'components/Common/MinorTitle'; 
import { Paper } from '@material-ui/core';
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const RADIAN = Math.PI / 180;                    


export default function IssuesBarGraph({paperClassStyle, data, title}) {
  const theme = useTheme();

  // Taken from recharts documentation
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name}) => {
    const radius = 25 + innerRadius + (outerRadius - innerRadius);
    const x  = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy  + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill={theme.palette.primary.dark} textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
        {name}
      </text>
    );
  };

  return (
    <>
      <MinorTitle title={title} />
      <Paper className={paperClassStyle} variant='outlined'>
        <ResponsiveContainer>
          <PieChart> 
            {/*isAnimationActive must be false or labels don't show*/}
            <Pie isAnimationActive={false} data={data} dataKey="value" fill={theme.palette.secondary.light} label={renderCustomizedLabel} labelLine={{stroke: theme.palette.primary.dark}} />
            <Tooltip itemStyle={{color: theme.palette.primary.dark}} cursor={false} />
          </PieChart>
        </ResponsiveContainer>
      </Paper>
    </>
  );
}
