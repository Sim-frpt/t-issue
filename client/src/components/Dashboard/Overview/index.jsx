import React, { useState, useEffect } from 'react';
import HeroTitle from 'components/Common/HeroTitle';
import ProjectSelect from './ProjectSelect';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography
} from'@material-ui/core';
import {
  BarChart,
  Bar,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const useStyles = makeStyles((theme) => ({
  overviewCard: {
    minHeight: '50vh',
    padding: '1em',
  },
  //selectContainer: {
    //textAlign: 'center',
    //marginBottom: '2em',
  //},
  chartsContainer: {
    flexGrow: 1
  },
  chartsPaper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    height: '20em',
  }
}));

export default function Overview(props) {
  const classes = useStyles();
  const { userProjects, issues } = props;
  const [ selectedProject, setSelectedProject ] = useState('');
  const [ priorityGraphData, setPriorityGraphData ] = useState([]);
  const [ tagGraphData, setTagGraphData ] = useState([]);
  const [ statusGraphData, setStatusGraphData ] = useState([]);
  const [ projectGraphData, setProjectGraphData ] = useState([]);

  const theme = useTheme();

  // On mount, set selected project to be the first project
  useEffect(() => {
    if (userProjects.length === 0) {
      return;
    }
    setSelectedProject(userProjects[0].project_id);
  }, [userProjects]);

  // Filter issues based on selected project
  useEffect(() => {
    if (!selectedProject) {
      return;
    }

    // TODO check this, looks shaky to filter projects by selectedProject name, but whatever I guess
    const selectedProjectName = userProjects.filter(project => project.project_id === selectedProject)[0].name;

    const issuesFromProject = props.issues.filter(issues => issues.project === selectedProjectName);

    setPriorityGraphData(getPriorityGraphData(issuesFromProject));
    setTagGraphData(getTagGraphData(issuesFromProject));
    setStatusGraphData(getStatusGraphData(issuesFromProject));
    setProjectGraphData(getProjectGraphData(issues));

  }, [ selectedProject, userProjects, props.issues ]);

  const handleChange = event => {
    setSelectedProject(event.target.value);
  };

  function getPriorityGraphData(issues) {

    const holder = issues.reduce((acc, current) => {
      if (acc.hasOwnProperty(current.priority)) {
        acc[current.priority]++;
      } else {
        acc[current.priority] = 1;
      }

      return acc;
    }, {});

    const priorityData = [];

    for (let prop in holder) {
      priorityData.push({name: prop, value: holder[prop]});
    }

    const orderedData = [];

    priorityData.forEach(data => {
      if (data.name === 'low') {
        orderedData[0] = data;
      } else if (data.name === 'normal') {
        orderedData[1] = data;
      } else {
        orderedData[2] = data;
      }
    });

    return orderedData.filter(data => data.name);
  }

  function getStatusGraphData(data) {
    const holder = data.reduce((acc, current) => {
      if (acc.hasOwnProperty(current.status)) {
        acc[current.status]++;
      } else {
        acc[current.status] = 1;
      }

      return acc;
    }, {});

    const StatusData = [];

    for (let prop in holder) {
      StatusData.push({name: prop, value: holder[prop]});
    }

    return StatusData;
  }

  function getTagGraphData(data) {
    const holder = data.reduce((acc, current) => {
      if (acc.hasOwnProperty(current.tag)) {
        acc[current.tag]++;
      } else {
        acc[current.tag] = 1;
      }

      return acc;
    }, {});

    const tagData = [];

    for (let prop in holder) {
      tagData.push({name: prop, value: holder[prop]});
    }

    return tagData;
  }

  function getProjectGraphData(data) {
    const holder = data.reduce((acc, current) => {
      if (acc.hasOwnProperty(current.project)) {
        acc[current.project]++;
      } else {
        acc[current.project] = 1;
      }

      return acc;
    }, {});

    const projectData = [];

    for (let prop in holder) {
      projectData.push({name: prop, value: holder[prop]});
    }

    return projectData;
  }

  return (
    <>
      <Container>
        <Box
          textAlign="center"
          display="flex"
          justifyContent="center"
        >
          <HeroTitle title='Overview'/>
        </Box>
      </Container>
      <Paper className={classes.overviewCard}>
        <ProjectSelect
          selectedProject={selectedProject}
          handleChange={handleChange}
          userProjects={userProjects}
        />
        {/*<div className={classes.selectContainer}>*/}
          {/*<FormControl>*/}
            {/*<InputLabel id="project-label">*/}
              {/*Project*/}
            {/*</InputLabel>*/}
            {/*<Select*/}
              {/*labelId="project-label"*/}
              {/*id="project-select"*/}
              {/*value={selectedProject}*/}
              {/*onChange={handleChange}*/}
            {/*>*/}
              {/*{ userProjects.map(project => (*/}
                {/*<MenuItem*/}
                  {/*value={project.project_id}*/}
                  {/*key={project.project_id}*/}
                {/*>*/}
                  {/*{project.name}*/}
                {/*</MenuItem>*/}
              {/*))*/}
              {/*}*/}
            {/*</Select>*/}
          {/*</FormControl>*/}
        {/*</div>*/}
        <Grid container spacing={7} className={classes.chartsContainer} justify="center">
          <Grid item sm={12} md={7} lg={5}>
            <Typography variant="subtitle1" color="textSecondary">Issues by priority</Typography>
            <Paper className={classes.chartsPaper} variant='outlined'>
              <ResponsiveContainer>
                <BarChart data={priorityGraphData} barCategoryGap="20%">
                  <XAxis dataKey="name" tickSize={10} />
                  <YAxis dataKey="value" allowDecimals={false} />
                  <Tooltip itemStyle={{color: theme.palette.primary.dark}} cursor={false} />
                  <Bar dataKey="value" barSize={50} legendType="none" fill={theme.palette.secondary.light} />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item sm={12} md={7} lg={5}>
            <Typography variant="subtitle1" color="textSecondary">Issues by category</Typography>
            <Paper className={classes.chartsPaper} variant='outlined'>
              <ResponsiveContainer>
                <BarChart data={tagGraphData} barCategoryGap="20%">
                  <XAxis dataKey="name" tickSize={10} />
                  <YAxis dataKey="value" allowDecimals={false} />
                  <Tooltip itemStyle={{color: theme.palette.primary.dark}} cursor={false} />
                  <Bar dataKey="value" barSize={50} fill={theme.palette.secondary.light} />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item sm={12} md={7} lg={5} >
            <Typography variant="subtitle1" color="textSecondary">Issues by status</Typography>
            <Paper className={classes.chartsPaper} variant='outlined'>
              <ResponsiveContainer>
                <BarChart data={statusGraphData} barCategoryGap="20%">
                  <XAxis dataKey="name" tickSize={10}/>
                  <YAxis dataKey="value" allowDecimals={false} />
                  <Tooltip itemStyle={{color: theme.palette.primary.dark}} cursor={false} />
                  <Bar dataKey="value" barSize={50} fill={theme.palette.secondary.light} />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item sm={12} md={7} lg={5} >
            <Typography variant="subtitle1" color="textSecondary">Issues by project</Typography>
            <Paper className={classes.chartsPaper} variant='outlined'>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={projectGraphData} dataKey="value" fill={theme.palette.secondary.light} />
                  <Tooltip itemStyle={{color: theme.palette.primary.dark}} cursor={false} />
                  <Bar dataKey="value" barSize={50} fill={theme.palette.secondary.light} />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
