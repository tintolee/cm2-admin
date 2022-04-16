import { API, graphqlOperation } from "aws-amplify";
import {
  updateSeeker as apiUpdateSeeker
} from '../../../../graphql/mutations';
import { listSeekers, getSeeker } from "../../../../graphql/queries";

export function getAllAppUsers(queryParams) {
  return API.graphql(graphqlOperation(listSeekers,{ filter: queryParams.filter }));
}
export function getAppUserById(appUserId) {
  return API.graphql(graphqlOperation(getSeeker, { id: appUserId }));
}

export function updateAppUser(appUser) {
  return API.graphql(graphqlOperation(apiUpdateSeeker, { input: appUser }));
}