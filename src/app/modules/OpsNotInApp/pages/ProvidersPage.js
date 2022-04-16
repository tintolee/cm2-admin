import React from "react";
import { Route } from "react-router-dom";
import { ProvidersLoadingDialog } from "./opportunityProvidersNotInApp/providers-loading-dialog/ProvidersLoadingDialog";
import { ProviderEditDialog } from "./opportunityProvidersNotInApp/providers-edit-dialog/ProviderEditDialog";
import { ProviderArchiveDialog } from "./opportunityProvidersNotInApp/provider-archive-dialog/ProviderArchiveDialog";
import { ProvidersArchiveDialog } from "./opportunityProvidersNotInApp/providers-archive-dialog/ProvidersArchiveDialog";
import { ProvidersUIProvider } from "./ProvidersUIContext";
import { ProviderCard } from "./ProviderCard";

export function ProvidersPage({ history }) {
  const providersUIEvents = {
    newProviderButtonClick: () => {
      history.push("/ops-not-in-app/new");
    },

    openEditProviderDialog: (id) => {
      history.push(`/ops-not-in-app/${id}/edit`);
    },

    openArchiveProviderDialog: (id) => {
      history.push(`/ops-not-in-app/${id}/archive`);
    },

    openArchiveProvidersDialog: () => {
      history.push(`/ops-not-in-app/archiveProviders`);
    },
  }

  return (
    <ProvidersUIProvider providersUIEvents={providersUIEvents}>
      <ProvidersLoadingDialog />
      <Route path="/ops-not-in-app/new">
        {({ history, match }) => (
          <ProviderEditDialog
            show={match != null}
            onHide={() => {
              history.push("/ops-not-in-app");
            }}
          />
        )}
      </Route>
      <Route path="/ops-not-in-app/:id/edit">
        {({ history, match }) => (
          <ProviderEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/ops-not-in-app");
            }}
          />
        )}
      </Route>
      <Route path="/ops-not-in-app/archiveProviders">
        {({ history, match }) => (
          <ProvidersArchiveDialog
            show={match != null}
            onHide={() => {
              history.push("/ops-not-in-app");
            }}
          />
        )}
      </Route>
      <Route path="/ops-not-in-app/:id/archive">
        {({ history, match }) => (
          <ProviderArchiveDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/ops-not-in-app");
            }}
          />
        )}
      </Route>
      <ProviderCard />
    </ProvidersUIProvider>
  );
}

