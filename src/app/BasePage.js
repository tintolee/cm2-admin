import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { BuilderPage } from "./pages/BuilderPage";
import { DashboardPage } from "./pages/DashboardPage";
import { DashboardMetronicPage } from "./pages/DashboardMetronicPage";

const GoogleMaterialPage = lazy(() =>
  import("./modules/GoogleMaterialExamples/GoogleMaterialPage")
);
const ReactBootstrapPage = lazy(() =>
  import("./modules/ReactBootstrapExamples/ReactBootstrapPage")
);
const ECommercePage = lazy(() =>
  import("./modules/ECommerce/pages/eCommercePage")
);
const UserProfilepage = lazy(() =>
  import("./modules/UserProfile/UserProfilePage")
);
const OpportunityProviderPage = lazy(() =>
  import("./modules/OpportunityProvider/pages/OpportunityProviderPage")
);
const OpsNotInAppPage = lazy(() =>
  import("./modules/OpsNotInApp/pages/OpsNotInAppPage")
);
const SpecialProjects = lazy(() =>
  import("./modules/SpecialProjects/pages/SpecialProjectPage")
);
const Reports = lazy(() =>
  import("./modules/Reports/pages/AdminReportsPage")
);
const AppUsersPage = lazy(() =>
  import("./modules/AppUsers/pages/AppUsersRootPage")
);

export default function BasePage() {
  // useEffect(() => {
  //   console.log('Base page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /opportunity-providers. */
          <Redirect exact from="/" to="/opportunity-providers" />
        }
        <ContentRoute path="/dashboard" component={DashboardPage} />
        <ContentRoute path="/dashboard-metronic" component={DashboardMetronicPage} />
        <ContentRoute path="/builder" component={BuilderPage} />
        <Route path="/google-material" component={GoogleMaterialPage} />
        <Route path="/react-bootstrap" component={ReactBootstrapPage} />
        <Route path="/e-commerce" component={ECommercePage} />
        <Route path="/user-profile" component={UserProfilepage} />
        <Route path="/opportunity-providers" component={OpportunityProviderPage} />
        <Route path="/ops-not-in-app" component={OpsNotInAppPage} />
        <Route path="/special-projects" component={SpecialProjects} />
        <Route path="/reports" component={Reports} />
        <Route path="/app-users" component={AppUsersPage} />
        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}
