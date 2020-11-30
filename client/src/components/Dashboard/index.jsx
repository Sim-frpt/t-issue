import React, { useContext, useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Projects from './Projects';
import Overview from './Overview/index.jsx';
import FullPageSpinner from 'components/Common/FullPageSpinner';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import { AuthContext } from 'AuthContext';
import { makeStyles } from '@material-ui/core/styles';

// Api calls
import { getIssues } from 'api/issueApi';
import { getUserProjects } from 'api/userApi';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

export default function Dashboard(props) {
  const classes = useStyles();
  const { path, url } = useRouteMatch();
  const [ auth ] = useContext(AuthContext);
  const user = auth.user;

  const [ userProjects, setUserProjects ] = useState([]);
  const [ issues, setIssues ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);

  // Get projects and put them in state
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const result = await getUserProjects(user.user_id);
      setUserProjects(result.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const projectIds = userProjects.map(project => project.project_id);

      const params = {
        project_id: projectIds
      };

      const result = await getIssues(params);
      setIssues(result.data);

      setIsLoading(false);
    };

    fetchData();

  }, [userProjects]);

  return (
    <>
      <div className={classes.root}>
        <div>
          <Sidebar {...{url} }/>
        </div>
        <div className={classes.content}>
          { isLoading
            ? <FullPageSpinner/>
            :
            <Switch>
              <Route exact path={path}>
                <Redirect to={`${path}/overview`} />
              </Route>
              <Route exact path={`${path}/projects`} component={Projects}/>
              <Route
                exact
                path={`${path}/overview`}
                render={(props) => (
                  <Overview {...props} auth={auth} userProjects={userProjects} issues={issues}/>
                )}
              />
            </Switch>
          }
        </div>
      </div>
    </>
  );
}
