import axios from "axios";
import { API, graphqlOperation } from "aws-amplify";
import {
  createOpportunityProvider as apiCreateOpportunityProvider,
  updateOpportunityProvider as apiUpdateOpportunityProvider,
} from "../../../../graphql/mutations";
import {
  listOpportunityProviders,
  getOpportunityProvider,
} from "../../../../graphql/queries";

export const OPPORTUNITYPROVIDERS_URL = "api/providers";

export function createOpportunityProvider(provider) {
  return API.graphql(
    graphqlOperation(apiCreateOpportunityProvider, { input: provider })
  );
}

export function getAllOpportunityProviders(queryParams) {
  return API.graphql(
    graphqlOperation(listOpportunityProviders, { filter: queryParams.filter })
  );
}

export function getOpportunityProviderById(providerId) {
  return API.graphql(
    graphqlOperation(getOpportunityProvider, { id: providerId })
  );
}

export function findOpportunityProviders(queryParams) {
  return axios.post(`${OPPORTUNITYPROVIDERS_URL}/find`, { queryParams });
}

export function updateOpportunityProvider(provider) {
  return API.graphql(
    graphqlOperation(apiUpdateOpportunityProvider, { input: provider })
  );
}

// UPDATE Status
export function updateStatusForOpportunityProvider(id, status) {
  return axios.post(
    `${OPPORTUNITYPROVIDERS_URL}/updateStatusForOpportunityProvider`,
    {
      id,
      status,
    }
  );
}
