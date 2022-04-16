import React from "react";
import { Route } from "react-router-dom";
import { AppUsersLoadingDialog } from "./appUsers-loading-dialog/AppUsersLoadingDialog";
import { AppUsersCard } from "./AppUsersCard";
import { AppUserUpdateStatusDialog } from "./appUsers-update-status-dialog/AppUserUpdateStatusDialog";
import { AppUsersUIProvider } from "./AppUsersUIContext";

export function AppUsersPage({ history }) {
    const appUsersUIEvents = {
        openDetailAppUserPage: (id) => {
            history.push(`/app-users/${id}/detail`);
        },
        openUpdateAppUserStatusDialog: (id) => {
            history.push(`/app-users/${id}/updateStatus`);
        },
    };

    return (
        <AppUsersUIProvider appUsersUIEvents={appUsersUIEvents}>
            <AppUsersLoadingDialog />
            <Route path="/app-users/:id/updateStatus">
                {({ history, match }) => (
                    <AppUserUpdateStatusDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/app-users");
                        }}
                    />
                )}
            </Route>
            <AppUsersCard />
        </AppUsersUIProvider>
    );
}
