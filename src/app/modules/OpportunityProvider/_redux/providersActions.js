import * as requestFromServer from "./providersCrud";
import { opportunityProvidersSlice, callTypes } from "./providersSlice";

const { actions } = opportunityProvidersSlice;

export const fetchOpportunityProviders = queryParams => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.list }));
    return requestFromServer
        .getAllOpportunityProviders(queryParams)
        .then(response => {
            const { items } = response.data.listOpportunityProviders;
            dispatch(actions.opportunityProvidersFetched({ items }));
        })
        .catch(error => {
            // console.log(error)
            error.clientMessage = "Can't find opportunity providers";
            dispatch(actions.catchError({ error, callType: callTypes.list }));
        });
};

export const fetchProvider = id => dispatch => {
    if (!id) {
        return dispatch(actions.opportunityProviderFetched({ providerForEdit: undefined }));
    }

    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .getOpportunityProviderById(id)
        .then(response => {
            const provider = response.data.getOpportunityProvider;
            dispatch(actions.opportunityProviderFetched({ providerForEdit: provider }));
        })
        .catch(error => {
            error.clientMessage = "Can't find opportunity provider";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const createProvider = providerForCreation => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .createOpportunityProvider(providerForCreation)
        .then(response => {
            const { provider } = response.data.createOpportunityProvider;
            dispatch(actions.opportunityProviderCreated({ provider }));
        })
        .catch(error => {
            error.clientMessage = "Can't create opportunity provider";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const updateProvider = provider => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .updateOpportunityProvider(provider)
        .then(() => {
            dispatch(actions.opportunityProviderUpdated({ provider }));
        })
        .catch(error => {
            error.clientMessage = "Can't update opportunity provider";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const updateProviderStatus = (id, status) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .updateStatusForOpportunityProvider(id, status)
        .then(() => {
            dispatch(actions.providerStatusUpdated({ id, status }));
        })
        .catch(error => {
            error.clientMessage = "Can't update opportunity provider status";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};
