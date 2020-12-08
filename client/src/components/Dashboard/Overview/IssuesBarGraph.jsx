import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import MinorTitle from 'components/Common/MinorTitle'; 
import { Paper } from '@material-ui/core';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

export default function IssuesBarGraph({paperClassStyle, data, title}) {
  const theme = useTheme();
  const primaryDark = theme.palette.primary.dark

  return (
    <>
      <MinorTitle title={title} />
      <Paper className={paperClassStyle} variant='outlined'>
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="name" tickSize={10} tick={{ fill: primaryDark }} stroke={primaryDark} />
            <YAxis dataKey="value" allowDecimals={false} tick={{ fill: primaryDark }} />
            <Tooltip itemStyle={{ color: primaryDark }} cursor={false} />
            <Bar dataKey="value" barSize={50} legendType="none" fill={theme.palette.secondary.light} />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </>
  );
}
