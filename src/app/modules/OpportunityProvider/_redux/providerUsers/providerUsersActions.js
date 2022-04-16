import * as requestFromServer from "./providerUsersCrud";
import { opportunityProviderUsersSlice, callTypes } from "./providerUsersSlice";

const { actions } = opportunityProviderUsersSlice;

export const fetchProviderUsers = (queryParams, providerId) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  if (!providerId) {
    return dispatch(
      actions.providerUsersFetched({ totalCount: 0, entities: null })
    );
  }

  const filter = {
    ...queryParams,
    filter: {
      opportunityProviderUserOpportunityProviderId: { eq: providerId },
      ...queryParams.filter
    },
  };

  return requestFromServer
    .getAllOpportunityProviderUsers(filter)
    .then((response) => {
      const { items } = response.data.listOpportunityProviderUsers;
      dispatch(actions.providerUsersFetched({ items }));
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't find providerUsers";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchProviderUser = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.providerUserFetched({ providerUserForEdit: undefined })
    );
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getOpportunityProviderUserById(id)
    .then((response) => {
      const providerUser = response.data.getOpportunityProviderUser;
      dispatch(
        actions.providerUserFetched({ providerUserForEdit: providerUser })
      );
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't find providerUser";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createProviderUser = (providerUserForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createOpportunityProviderUser(providerUserForCreation)
    .then((response) => {
      const { providerUser } = response.data.createOpportunityProviderUser;
      dispatch(actions.providerUserCreated({ providerUser }));
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't create providerUser";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateProviderUser = (providerUser) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateOpportunityProviderUser(providerUser)
    .then(() => {
      dispatch(actions.providerUserUpdated({ providerUser }));
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't update providerUser";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
