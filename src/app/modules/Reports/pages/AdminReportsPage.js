import React, { Suspense } from "react";
import { Switch } from "react-router-dom";
import { ReportsPage } from "./ReportsPage";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";

export default function AdminReportsPage() {
    return (
        <Suspense fallback={<LayoutSplashScreen />}>
            <Switch>
                <ContentRoute path="/reports" component={ReportsPage} />
            </Switch>
        </Suspense>
    );
}
