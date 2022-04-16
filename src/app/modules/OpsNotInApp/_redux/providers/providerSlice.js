import { createSlice } from "@reduxjs/toolkit";

const initialProviderState = {
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

export const providersSlice = createSlice({
  name: "providers",
  initialState: initialProviderState,
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
    // getProviderById
    providerFetched: (state, action) => {
      state.actionsLoading = false;
      state.providerForEdit = action.payload.providerForEdit;
      state.error = null;
    },
    // findProviders
    providersFetched: (state, action) => {
      const { items } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = items;
      state.totalCount = items.length;
    },
    // createProvider
    providerCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.provider);
    },
    // updateProvider
    providerUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.id === action.payload.provider.id) {
          return action.payload.provider;
        }
        return entity;
      });
    },
    // ArchiveProvider
    providerArchived: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
    // archiveProviders
    providersArchived: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.id)
      );
    },
  }
});
