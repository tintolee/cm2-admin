import React from "react";
import { Route } from "react-router-dom";
import { ProvidersLoadingDialog } from "./providers-loading-dialog/ProvidersLoadingDialog";
import { ProvidersCard } from "./ProvidersCard";
import { ProviderUpdateStatusDialog } from "./provider-update-status-dialog/ProviderUpdateStatusDialog";
import { ProvidersUIProvider } from "./ProvidersUIContext";

export function ProvidersPage({ history }) {
    const providersUIEvents = {
        newProviderButtonClick: () => {
            history.push("/opportunity-providers/new");
        },
        openEditProviderPage: (id) => {
            history.push(`/opportunity-providers/${id}/edit`);
        },
        openUpdateProviderStatusDialog: (id) => {
            history.push(`/opportunity-providers/${id}/updateStatus`);
        },
    };

    return (
        <ProvidersUIProvider providersUIEvents={providersUIEvents}>
            <ProvidersLoadingDialog />
            <Route path="/opportunity-providers/:id/updateStatus">
                {({ history, match }) => (
                    <ProviderUpdateStatusDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/opportunity-providers");
                        }}
                    />
                )}
            </Route>
            <ProvidersCard />
        </ProvidersUIProvider>
    );
}
