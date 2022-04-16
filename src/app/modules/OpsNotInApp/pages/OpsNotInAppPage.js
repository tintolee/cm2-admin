import React, { Suspense } from "react";
import { Switch } from "react-router-dom";
import { ProvidersPage } from "./ProvidersPage";
import { ProviderEditDialog } from "./opportunityProvidersNotInApp/providers-edit-dialog/ProviderEditDialog";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";

export default function OpsNotInAppPage() {
    return (
        <Suspense fallback={<LayoutSplashScreen />}>
            <Switch>
                <ContentRoute path="/ops-not-in-app" component={ProvidersPage} />
                <ContentRoute path="/ops-not-in-app/new" component={ProviderEditDialog} />
                <ContentRoute
                    path="ops-not-in-app/:id/edit"
                    component={ProviderEditDialog}
                />
            </Switch>
        </Suspense>
    );
}
