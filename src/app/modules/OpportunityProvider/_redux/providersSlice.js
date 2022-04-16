import { createSlice } from "@reduxjs/toolkit";

const initialProvidersState = {
    listLoading: false,
    actionsLoading: false,
    totalCount: 0,
    entities: null,
    providerForEdit: undefined,
    lastError: null
};
export const callTypes = {
    list: "list",
    action: "action"
};

export const opportunityProvidersSlice = createSlice({
    name: "opportunityProviders",
    initialState: initialProvidersState,
    reducers: {
        catchError: (state, action) => {
            state.error = `${action.type}: ${action.payload.error}`;
            if (action.payload.callType === callTypes.list) {
                state.listLoading = false;
            } else {
                state.actionsLoading = false;
            }
        },
        startCall: (state, action) => {
            state.error = null;
            if (action.payload.callType === callTypes.list) {
                state.listLoading = true;
            } else {
                state.actionsLoading = true;
            }
        },
        // getOpportunityProviderById
        opportunityProviderFetched: (state, action) => {
            state.actionsLoading = false;
            state.providerForEdit = action.payload.providerForEdit;
            state.error = null;
        },
        // find opportunityProviders
        opportunityProvidersFetched: (state, action) => {
            const { items } = action.payload;
            state.listLoading = false;
            state.error = null;
            state.entities = items;
            state.totalCount = items.length;
        },
        // createopportunityProvider
        opportunityProviderCreated: (state, action) => {
            state.actionsLoading = false;
            state.error = null;
            //state.entities.push(action.payload.provider);
        },
        // updateopportunityProvider
        opportunityProviderUpdated: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            state.entities = state.entities.map(entity => {
                if (entity.id === action.payload.provider.id) {
                    return action.payload.provider;
                }
                return entity;
            });
        },
        // productsUpdateState
        opportunityProvideStatusUpdated: (state, action) => {
            state.actionsLoading = false;
            state.error = null;
            const { id, status } = action.payload;
            state.entities = state.entities.map(entity => {
                if (entity.id === id) {
                    entity.status = status;
                }
                return entity;
            });
        }
    }
});