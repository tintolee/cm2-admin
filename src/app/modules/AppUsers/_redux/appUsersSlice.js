import { createSlice } from "@reduxjs/toolkit";

const initialAppUsersState = {
    listLoading: false,
    actionsLoading: false,
    totalCount: 0,
    entities: null,
    appUserForDetail: undefined,
    lastError: null
};
export const callTypes = {
    list: "list",
    action: "action"
};

export const appUsersSlice = createSlice({
    name: "appUsers",
    initialState: initialAppUsersState,
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
        // getappUserById
        appUserFetched: (state, action) => {
            state.actionsLoading = false;
            state.appUserForDetail = action.payload.appUserForDetail;
            state.error = null;
        },
        // find appUsers
        appUsersFetched: (state, action) => {
            const { items } = action.payload;
            state.listLoading = false;
            state.error = null;
            state.entities = items;
            state.totalCount = items.length;
        },
        // updateAppUser
        appUserUpdated: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
            state.entities = state.entities.map(entity => {
                if (entity.id === action.payload.appUser.id) {
                    return action.payload.appUser;
                }
                return entity;
            });
        },
    }
});