import * as requestFromServer from "./reportsCrud";
import { reportsSlice, callTypes } from "./reportsSlice";

const { actions } = reportsSlice;

export const fetchReports = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllReports(queryParams)
    .then(response => {
      const { items } = response.data.listReports;
      dispatch(actions.reportsFetched({ items }));
    })
    .catch(error => {
      error.clientMessage = "Can't find Reports";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchReport= id => dispatch => {
  if (!id) {
    return dispatch(actions.reportFetched({ reportForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getReportById(id)
    .then(response => {
      const report = response.data.getReport;
      dispatch(actions.reportFetched({ reportForEdit: report }));
    })
    .catch(error => {
      error.clientMessage = "Can't find given report";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateReportStatus = report => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
      .updateStatusForReport(report)
      .then(() => {
          dispatch(actions.reportUpdated({ report }));
      })
      .catch(error => {
          error.clientMessage = "Can't update report's status";
          dispatch(actions.catchError({ error, callType: callTypes.action }));
      });
};