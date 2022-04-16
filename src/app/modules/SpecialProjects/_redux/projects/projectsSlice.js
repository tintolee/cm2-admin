import { createSlice } from "@reduxjs/toolkit";

const initialProjectState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  projectForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const projectsSlice = createSlice({
  name: "projects",
  initialState: initialProjectState,
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
    // getProjectById
    projectFetched: (state, action) => {
      state.actionsLoading = false;
      state.projectForEdit = action.payload.projectForEdit;
      state.error = null;
    },
    // findProjects
    projectsFetched: (state, action) => {
      const { items } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = items;
      state.totalCount = items.length;
    },
    // updateProject
    projectUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.id === action.payload.project.id) {
          return action.payload.project;
        }
        return entity;
      });
    },
  }
});
