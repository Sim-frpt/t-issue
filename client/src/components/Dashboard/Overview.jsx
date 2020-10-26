import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import FullPageSpinner from 'components/Common/FullPageSpinner';
import { getProjects } from 'api/projectApi';
import { getIssues } from 'api/issueApi';

export default function Overview(props) {
  const [ userProjects, setUserProjects ] = useState();
  const [ issues, setIssues ] = useState();
  const [ isLoading, setIsLoading ] = useState(false);

  useEffect( () => {
    const fetchData = async () => {
      setIsLoading(true);

      const result = await getProjects();
      setUserProjects(result.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect( () => {
    const fetchData = async () => {
      setIsLoading(true);

      const result = await getIssues();
      setIssues(result.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(props.auth);
    //console.log(issues, userProjects);
  });

  return (
    isLoading ? 
      <FullPageSpinner/> :
      <Typography>
      Summary
      </Typography>
  );
}
