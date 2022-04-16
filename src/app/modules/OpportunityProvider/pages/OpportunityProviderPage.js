import React, { Suspense } from "react";
import { Switch } from "react-router-dom";
import { ProvidersPage } from "./ProvidersPage";
import { ProviderEdit } from "./provider-edit/ProviderEdit";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";

export default function OpportunityProviderPage() {
    return (
        <Suspense fallback={<LayoutSplashScreen />}>
            <Switch>
                <ContentRoute path="/opportunity-providers/new" component={ProviderEdit} />
                <ContentRoute
                    path="/opportunity-providers/:id/edit"
                    component={ProviderEdit}
                />
                <ContentRoute path="/opportunity-providers" component={ProvidersPage} />
            </Switch>
        </Suspense>
    );
}
