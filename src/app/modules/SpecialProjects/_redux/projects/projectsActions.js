import * as requestFromServer from "./projectsCrud";
import { projectsSlice, callTypes } from "./projectsSlice";

const { actions } = projectsSlice;

export const fetchProjects = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllProjects(queryParams)
    .then(response => {
      const { items } = response.data.listSpecialProjects;
      dispatch(actions.projectsFetched({ items }));
    })
    .catch(error => {
      error.clientMessage = "Can't find Special Projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchProject = id => dispatch => {
  if (!id) {
    return dispatch(actions.projectFetched({ projectForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getProjectById(id)
    .then(response => {
      const project = response.data.getSpecialProject;
      dispatch(actions.projectFetched({ projectForEdit: project }));
    })
    .catch(error => {
      error.clientMessage = "Can't find given Special Project";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateProjectStatus = project => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForProject(project)
    .then(() => {
      dispatch(actions.projectUpdated({ project }));
    })
    .catch(error => {
      error.clientMessage = "Can't update special project's status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
