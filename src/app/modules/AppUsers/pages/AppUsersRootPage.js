import React, { Suspense } from "react";
import { Switch } from "react-router-dom";
import { AppUsersPage } from "./AppUsersPage";
import { AppUserDetail } from "./appUsers-detail/AppUserDetail";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";

export default function AppUsersRootPage() {
    return (
        <Suspense fallback={<LayoutSplashScreen />}>
            <Switch>
                <ContentRoute
                    path="/app-users/:id/detail"
                    component={AppUserDetail}
                />
                <ContentRoute path="/app-users" component={AppUsersPage} />
            </Switch>
        </Suspense>
    );
}
