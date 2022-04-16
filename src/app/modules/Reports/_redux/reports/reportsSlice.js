import { createSlice } from "@reduxjs/toolkit";

const initialReportState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  reportForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const reportsSlice = createSlice({
  name: "reports",
  initialState: initialReportState,
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
    // getReportById
    reportFetched: (state, action) => {
      state.actionsLoading = false;
      state.reportForEdit = action.payload.reportForEdit;
      state.error = null;
    },
    // findReports
    reportsFetched: (state, action) => {
      const { items } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = items;
      state.totalCount = items.length;
    },
    // updateReport
    reportUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.id === action.payload.report.id) {
          return action.payload.report;
        }
        return entity;
      });
    },
  }
});
