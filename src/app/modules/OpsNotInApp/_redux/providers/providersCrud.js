import axios from "axios";
import { API, graphqlOperation } from 'aws-amplify';
import {
  createOpsNotInApp as apiCreateOpsNotInApp,
  updateOpsNotInApp as apiUpdateOpsNotInApp
} from '../../../../../graphql/mutations';
import { listOpsNotInApps, getOpsNotInApp } from '../../../../../graphql/queries';

//todo: change this with OPs not in App API Url
export const PROVIDER_URL = "api/opsnotinapp";

// CREATE =>  POST: add a new OPs not in app to the server
export function createProvider(provider) {
  return API.graphql(graphqlOperation(apiCreateOpsNotInApp, { input: provider }));
}

// READ
export function getAllProviders(queryParams) {
    return API.graphql(graphqlOperation(listOpsNotInApps, { filter: queryParams.filter }));
}

export function getProviderById(providerId) {
  return API.graphql(graphqlOperation(getOpsNotInApp, { id: providerId }));
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findProviders(queryParams) {
  return axios.post(`${PROVIDER_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the provider on the server
export function updateProvider(provider) {
  return API.graphql(graphqlOperation(apiUpdateOpsNotInApp, { input: provider }));
}

// ARCHIVE => archive the provider from the server
export function archiveProvider(providerId) {
  return axios.delete(`${PROVIDER_URL}/${providerId}`);
}

// ARCHIVE Providers by ids
export function archiveProviders(ids) {
  return axios.post(`${PROVIDER_URL}/archiveProviders`, { ids });
}
