import { API, graphqlOperation } from "aws-amplify";
import {
  createOpportunityProviderUser as apiCreateOpportunityProviderUser,
  updateOpportunityProviderUser as apiUpdateOpportunityProviderUser,
} from "../../../../../graphql/mutations";
import {
  listOpportunityProviderUsers,
  getOpportunityProviderUser,
} from "../../../../../graphql/queries";

export function createOpportunityProviderUser(providerUser) {
  return API.graphql(
    graphqlOperation(apiCreateOpportunityProviderUser, { input: providerUser })
  );
}

export function getAllOpportunityProviderUsers(queryParams) {
  return API.graphql(
    graphqlOperation(listOpportunityProviderUsers, {
      filter: queryParams.filter,
    })
  );
}

export function getOpportunityProviderUserById(providerUserId) {
  return API.graphql(
    graphqlOperation(getOpportunityProviderUser, { id: providerUserId })
  );
}

export function updateOpportunityProviderUser(providerUser) {
  return API.graphql(
    graphqlOperation(apiUpdateOpportunityProviderUser, { input: providerUser })
  );
}
