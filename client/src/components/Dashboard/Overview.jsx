import React, { useState, useEffect } from 'react';
import FullPageSpinner from 'components/Common/FullPageSpinner';
import HeroTitle from 'components/Common/HeroTitle';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Container,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from'@material-ui/core';

// Api calls
//import { getIssues } from 'api/issueApi';
import { getUserProjects } from 'api/userApi';

const useStyles = makeStyles((theme) => ({
  overviewCard: {
    height: '50vh',
    padding: '1em',
  },
  selectContainer: {
    textAlign: 'center',
  }
}));

export default function Overview(props) {
  const classes = useStyles();
  const [ userProjects, setUserProjects ] = useState([]);
  const [ selectedProject, setSelectedProject ] = useState('');
  //const [ issues, setIssues ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const user = props.auth.user;

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

  //useEffect(() => {
    //const fetchData = async () => {
      //setIsLoading(true);

      //const result = await getIssues();
      //setIssues(result.data);
      //setIsLoading(false);
    //};

    //fetchData();
  //}, []);

  const handleChange = event => {
    setSelectedProject(event.target.value);
  };

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
      </Paper>
    </>
  );
}
