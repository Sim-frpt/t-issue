import React, { useState, useEffect } from 'react';
import HeroTitle from 'components/Common/HeroTitle';
import ProjectSelect from './ProjectSelect';
import IssuesBarGraph from './IssuesBarGraph';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Box,
  Container,
  Grid,
  Paper,
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

    const priorityOrder = [ 'low', 'normal', 'high' ];
    const tagOrder = [ 'bug', 'feature request', 'training/documentation request', 'other' ];
    const statusOrder = [ 'open', 'in progress', 'resolved', 'closed' ];

    setPriorityGraphData(getIssueGraphData(issuesFromProject, 'priority', priorityOrder));
    setTagGraphData(getIssueGraphData(issuesFromProject, 'tag', tagOrder));
    setStatusGraphData(getIssueGraphData(issuesFromProject, 'status', statusOrder));
    setProjectGraphData(getProjectGraphData(issues));

  }, [ selectedProject, userProjects, issues ]);

  const handleChange = event => {
    setSelectedProject(event.target.value);
  };

  function getIssueGraphData(data, sortingKey, sortOrder) {
    const holder = data.reduce((acc, current) => {
      if (acc.hasOwnProperty(current[sortingKey])) {
        acc[current[sortingKey]].count++;
      } else {
        acc[current[sortingKey]] = {};
        acc[current[sortingKey]].count = 1;
        acc[current[sortingKey]].order = sortOrder.indexOf(current[sortingKey]);
      }

      return acc;
    }, {});

    const graphData = [];

    for (let prop in holder) {
      graphData[holder[prop].order] = { name: prop, value: holder[prop].count };
    }

    return graphData.filter(data => data !== undefined);
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
        <Grid container spacing={7} className={classes.chartsContainer} justify="center">
          <Grid item sm={12} md={7} lg={5}>
            <IssuesBarGraph
              paperClassStyle={classes.chartsPaper}
              data={priorityGraphData}
              title="Issues by priority"
            />
          </Grid>
          <Grid item sm={12} md={7} lg={5}>
            <IssuesBarGraph
              paperClassStyle={classes.chartsPaper}
              data={tagGraphData}
              title="Issues by tag"
            />
          </Grid>
          <Grid item sm={12} md={7} lg={5} >
            <IssuesBarGraph
              paperClassStyle={classes.chartsPaper}
              data={statusGraphData}
              title="Issues by status"
            />
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
