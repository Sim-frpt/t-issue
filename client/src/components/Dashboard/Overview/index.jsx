import React, { useState, useEffect } from 'react';

import HeroTitle from 'components/Common/HeroTitle';
import Alert from 'components/Common/Alert';
import ProjectSelect from './ProjectSelect';
import IssuesBarGraph from './IssuesBarGraph';
import IssuesPieGraph from './IssuesPieGraph';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Container,
  Grid,
  Paper,
} from'@material-ui/core';

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
  const { userProjects, issues, priorities, status, tags } = props;

  const [ selectedProject, setSelectedProject ] = useState(userProjects[0]);
  const [ priorityGraphData, setPriorityGraphData ] = useState([]);
  const [ tagGraphData, setTagGraphData ] = useState([]);
  const [ statusGraphData, setStatusGraphData ] = useState([]);
  const [ projectGraphData, setProjectGraphData ] = useState([]);
  const [ open, setOpen ] = useState(false);

  // Filter issues based on selected project
  useEffect(() => {
    if (!selectedProject) {
      return;
    }

    const issuesFromProject = issues.filter(issues => issues.project === selectedProject.name);

    const basePriorityData = getNormalizedBaseGraphData(priorities, 'priority_id');
    const baseTagData = getNormalizedBaseGraphData(tags, 'tag_id');
    const baseStatusData = getNormalizedBaseGraphData(status, 'status_id');

    setPriorityGraphData(getIssueGraphData(issuesFromProject, basePriorityData, 'priority',));
    setTagGraphData(getIssueGraphData(issuesFromProject, baseTagData, 'tag'));
    setStatusGraphData(getIssueGraphData(issuesFromProject, baseStatusData, 'status'));
    setProjectGraphData(getProjectGraphData(issues));
  }, [ selectedProject, userProjects, issues, priorities, status, tags ]);

  const handleChange = event => {
    const newProject = userProjects.filter(proj => proj.project_id === event.target.value)[0];

    setSelectedProject(newProject);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  function getNormalizedBaseGraphData(data, dataOrderKey) {
    return data
      .sort((a, b) => a[dataOrderKey] < b[dataOrderKey])
      .reduce((acc, curr) => {
        acc[curr.name] = 0;

        return acc;
      }, {});
  }

  function getIssueGraphData(projectIssues, baseData, dataKey) {
    projectIssues.forEach(issue => {
      if (baseData.hasOwnProperty(issue[dataKey])) {
        baseData[issue[dataKey]]++;
      }
    });

    const graphData = [];

    for (let prop in baseData) {
      graphData.push({
        name: prop,
        value: baseData[prop]
      });
    }

    return graphData;
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

    // Only keep the 10 biggest projects if we have too many
    const projectLimit = 10;

    if (projectData.length > projectLimit) {
      return projectData.sort((a, b) => b.value - a.value).slice(0, projectLimit);
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
          {!selectedProject
            ?
              <Alert severity="info" text="No projects to display data for"/>
            :
              <>
                <ProjectSelect
                  handleChange={handleChange}
                  handleClose={handleClose}
                  handleOpen={handleOpen}
                  open={open}
                  userProjects={userProjects}
                  value={selectedProject.project_id}
                />
                <Grid container spacing={7} className={classes.chartsContainer} justify="center">
                  <Grid item xs={12} lg={5}>
                    <IssuesBarGraph
                      paperClassStyle={classes.chartsPaper}
                      data={priorityGraphData}
                      title="Issues by priority"
                    />
                  </Grid>
                  <Grid item xs={12} lg={7}>
                    <IssuesBarGraph
                      paperClassStyle={classes.chartsPaper}
                      data={tagGraphData}
                      title="Issues by tag"
                    />
                  </Grid>
                  <Grid item xs={12} lg={6} >
                    <IssuesBarGraph
                      paperClassStyle={classes.chartsPaper}
                      data={statusGraphData}
                      title="Issues by status"
                    />
                  </Grid>
                  <Grid item xs={12} lg={6} >
                    <IssuesPieGraph
                      paperClassStyle={classes.chartsPaper}
                      data={projectGraphData}
                      title="Issues by project"
                    />
                  </Grid>
                </Grid>
              </>
          }
        </Paper>
      </>
  );
}
