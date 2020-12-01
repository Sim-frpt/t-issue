import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import {
  Paper,
  Typography,
} from '@material-ui/core';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

export default function IssuesPriorityGraph({paperClassStyle, data, title}) {
  const theme = useTheme();

  return (
    <>
      <Typography variant="subtitle1" color="textSecondary">{title}</Typography>
      <Paper className={paperClassStyle} variant='outlined'>
        <ResponsiveContainer>
          <BarChart data={data} barCategoryGap="20%">
            <XAxis dataKey="name" tickSize={10} />
            <YAxis dataKey="value" allowDecimals={false} />
            <Tooltip itemStyle={{color: theme.palette.primary.dark}} cursor={false} />
            <Bar dataKey="value" barSize={50} legendType="none" fill={theme.palette.secondary.light} />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </>
  );
}
