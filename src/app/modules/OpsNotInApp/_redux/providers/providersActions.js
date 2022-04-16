import * as requestFromServer from "./providersCrud";
import { providersSlice, callTypes } from "./providerSlice";

const { actions } = providersSlice;

export const fetchProviders = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllProviders(queryParams)
    .then(response => {
      const { items } = response.data.listOpsNotInApps;
      dispatch(actions.providersFetched({ items }));
    })
    .catch(error => {
      error.clientMessage = "Can't find OPs not in App";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchProvider = id => dispatch => {
  if (!id) {
    return dispatch(actions.providerFetched({ providerForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getProviderById(id)
    .then(response => {
      const provider = response.data.getOpsNotInApp;
      dispatch(actions.providerFetched({ providerForEdit: provider }));
    })
    .catch(error => {
      error.clientMessage = "Can't find OPs not in App";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const archiveProvider = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .archiveProvider(id)
    .then(response => {
      dispatch(actions.providerArchived({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete OPs not in APP";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createProvider = providerForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createProvider(providerForCreation)
    .then(response => {
      const provider = response.data.createOpsNotInApp;
      dispatch(actions.providerCreated({provider}));
    })
    .catch(error => {
      error.clientMessage = "Can't create OP not in App";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateProvider = provider => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateProvider(provider)
    .then(() => {
      dispatch(actions.providerUpdated({ provider }));
    })
    .catch(error => {
      error.clientMessage = "Can't update Ops not in App";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const archiveProviders = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .archiveProviders(ids)
    .then(() => {
      dispatch(actions.providersArchived({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete Ops not in App";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
