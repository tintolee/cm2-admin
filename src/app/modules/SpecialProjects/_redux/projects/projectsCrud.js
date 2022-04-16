import axios from "axios";
import { API, graphqlOperation } from 'aws-amplify';
import {
  createSpecialProject  as apiCreateSpecialProject,
  updateSpecialProject as apiUpdateSpecialProject
} from '../../../../../graphql/mutations';
import { listSpecialProjects, getSpecialProject } from '../../../../../graphql/queries';

export const PROJECT_URL = "api/specialprojects";

// READ
export function getAllProjects(queryParams) {
  return API.graphql(graphqlOperation(listSpecialProjects, { filter: queryParams.filter }));
}

export function createProject(project) {
  return API.graphql(graphqlOperation(apiCreateSpecialProject, { input: project }));
}

export function getProjectById(projectId) {
  return API.graphql(graphqlOperation(getSpecialProject, { id: projectId }));
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findProjects(queryParams) {
  return axios.post(`${PROJECT_URL}/find`, { queryParams });
}

// UPDATE Status
export function updateStatusForProject(project) {
  return API.graphql(graphqlOperation(apiUpdateSpecialProject, { input: project }));
}

