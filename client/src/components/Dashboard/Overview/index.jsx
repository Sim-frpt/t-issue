import React, { useState, useEffect } from 'react';
import FullPageSpinner from 'components/Common/FullPageSpinner';
import HeroTitle from 'components/Common/HeroTitle';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Container,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from'@material-ui/core';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const useStyles = makeStyles((theme) => ({
  overviewCard: {
    minHeight: '50vh',
    padding: '1em',
  },
  selectContainer: {
    textAlign: 'center',
    marginBottom: '2em',
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
  const [ selectedProject, setSelectedProject ] = useState('');
  //const [ isLoading, setIsLoading ] = useState(false);
  const [ priorityGraphData, setPriorityGraphData ] = useState([]);
  const [ tagGraphData, setTagGraphData ] = useState([]);
  //const [ statusGraphData, setStatusGraphData ] = useState([]);

  const theme = useTheme();

  // On mount, set selected project to be the first project
  useEffect(() => {
    if (props.userProjects.length === 0) {
      return;
    }
    setSelectedProject(props.userProjects[0].project_id);
  }, [props.userProjects]);

   //Filter issues based on selected project
  useEffect(() => {
    if (!selectedProject) {
      return;
    }

    // TODO check this, looks shaky to filter projects by selectedProject name, but whatever I guess
    const selectedProjectName = props.userProjects.filter(project => project.project_id === selectedProject)[0].name;

    const issues = props.issues.filter(issues => issues.project === selectedProjectName);

    setPriorityGraphData(getPriorityGraphData(issues));
    setTagGraphData(getTagGraphData(issues));
      //setStatusGraphData(getStatusGraphData(result.data));
      //setIssues(result.data);

      //setIsLoading(false);
    //};

    //fetchData();

  }, [ selectedProject, props.userProjects, props.issues ]);

  //useEffect(() => {
    //console.log(priorityGraphData);
  //});

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

  return (
    //isLoading ?
      //<FullPageSpinner/> :
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
        <div className={classes.selectContainer}>
          <FormControl>
            <InputLabel id="project-label">
              Project
            </InputLabel>
            <Select
              labelId="project-label"
              id="project-select"
              value={selectedProject}
              onChange={handleChange}
            >
              { props.userProjects.map(project => (
                  <MenuItem
                    value={project.project_id}
                    key={project.project_id}
                  >
                    {project.name}
                  </MenuItem>
              ))
              }
            </Select>
          </FormControl>
        </div>
        <Grid container spacing={7} className={classes.chartsContainer}>
          <Grid item sm={12} md={6} lg={4}>
            <Paper className={classes.chartsPaper} variant='outlined'>
              <ResponsiveContainer>
                <BarChart data={priorityGraphData} barCategoryGap="20%">
                  <XAxis dataKey="name" tickSize={10} />
                  <YAxis dataKey="value" allowDecimals={false} />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="value" barSize={50} legendType="none" fill={theme.palette.secondary.light} />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item sm={12} sm={6} lg={4}>
            <Paper className={classes.chartsPaper} variant='outlined'>
              <ResponsiveContainer>
                <BarChart data={tagGraphData} barCategoryGap="20%">
                  <XAxis dataKey="name" tickSize={10} />
                  <YAxis dataKey="value" allowDecimals={false} />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="value" barSize={50} fill={theme.palette.secondary.light} />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          {/*<Grid item sm={12} sm={6} lg={3}>*/}
            {/*<Paper className={classes.chartsPaper} variant='outlined'>*/}
              {/*<ResponsiveContainer>*/}
                {/*<BarChart data={statusGraphData} barCategoryGap="20%">*/}
                  {/*<XAxis dataKey="name" />*/}
                  {/*<YAxis dataKey="value" />*/}
                  {/*<Bar dataKey="value" fill={theme.palette.secondary.light} />*/}
                {/*</BarChart>*/}
              {/*</ResponsiveContainer>*/}
            {/*</Paper>*/}
          {/*</Grid>*/}
        </Grid>
      </Paper>
    </>
  );
}
