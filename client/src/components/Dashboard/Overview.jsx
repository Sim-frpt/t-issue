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

// Api calls
import { getIssues } from 'api/issueApi';
import { getUserProjects } from 'api/userApi';

const useStyles = makeStyles((theme) => ({
  overviewCard: {
    height: '50vh',
    padding: '1em',
  },
  selectContainer: {
    textAlign: 'center',
  },
  chartsContainer: {
    flexGrow: 1
  }
}));

export default function Overview(props) {
  const classes = useStyles();
  const [ userProjects, setUserProjects ] = useState([]);
  const [ selectedProject, setSelectedProject ] = useState('');
  const [ issues, setIssues ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const user = props.auth.user;
  const [ priorityGraphData, setPriorityGraphData ] = useState([]);

  const theme = useTheme();

  // Get projects and put them in state
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const result = await getUserProjects(user.user_id);
      setUserProjects(result.data);
      setIsLoading(false);
    };

    fetchData();
  }, [user]);

  // On mount, set selected project to be the first project
  useEffect(() => {
    if (userProjects.length === 0) {
      return;
    }
    setSelectedProject(userProjects[0].project_id);
  }, [ userProjects ]);

  // Get issues based on selected project
  useEffect(() => {
    if (!selectedProject) {
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);

      const params = {
        project_id: selectedProject
      };

      const result = await getIssues(params);

      setPriorityGraphData(getPriorityGraphData(result.data));

      setIssues(result.data);

      setIsLoading(false);
    };

    fetchData();

  }, [selectedProject]);

  useEffect(() => {
    //console.log(issues);
    //console.log(priorityGraphData);
  }, [issues]);

  const handleChange = event => {
    setSelectedProject(event.target.value);
  };

  function getPriorityGraphData(data) {
    const holder = {};

    data.forEach(obj => {
      if (holder.hasOwnProperty(obj.priority)) {
        holder[obj.priority]++;
      } else {
        holder[obj.priority] = 1;
      }
    });

    const priorityData = [];

    for (let prop in holder) {
      priorityData.push({name: prop, value: holder[prop]});
    }

    return priorityData;
  }

  return (
    isLoading ?
      <FullPageSpinner/> :
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
              { userProjects.map(project => (
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
        {/*<Grid container spacing={2} className={classes.chartsContainer}>*/}
          {/*<Grid item xs={12}>*/}
            <ResponsiveContainer width={"90%"} height={"80%"}>
              <BarChart data={priorityGraphData}>
                <XAxis dataKey="name" />
                <YAxis dataKey="value" />
                <Bar dataKey="value" fill={theme.palette.secondary.light}/>

              </BarChart>
            </ResponsiveContainer>
          {/*</Grid>*/}
        {/*</Grid>*/}
      </Paper>
    </>
  );
}
