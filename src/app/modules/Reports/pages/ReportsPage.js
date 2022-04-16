import React from "react";
import { Route } from "react-router-dom";
import { ReportsLoadingDialog } from "./reports/reports-loading-dialog/ReportsLoadingDialog"
import { ReportsUIProvider } from "./ReportsUIContext";
import { ReportCard } from "./ReportCard";
import { ReportUpdateStatusDialog } from "./../pages/reports/reports-update-status-dialog/ReportUpdateStatusDialog";

export function ReportsPage({ history }) {

  const reportsUIEvents = {
    openUpdateReportStatusDialog: (id) => {
      history.push(`/reports/${id}/updateStatus`);
    }
  };

  return (
    <ReportsUIProvider reportsUIEvents={reportsUIEvents}>
      <ReportsLoadingDialog />
      <Route path="/reports/:id/updateStatus">
        {({ history, match }) => (
          <ReportUpdateStatusDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/reports");
            }}
          />
        )}
          </Route>
     <ReportCard />
    </ReportsUIProvider>
  );
}

