import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';

const useStyles = makeStyles({
  selectContainer: {
    textAlign: 'center',
    marginBottom: '2em',
  },
});

export default function ProjectSelect(props) {
  const classes = useStyles();
  const { selectedProject, handleChange, userProjects } = props;

  return (
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
  );
}
