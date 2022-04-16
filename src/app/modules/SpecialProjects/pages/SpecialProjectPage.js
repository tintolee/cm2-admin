import React, { Suspense } from "react";
import { Switch } from "react-router-dom";
import { ProjectsPage } from "./ProjectsPage";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";

export default function SpecialProjectPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ContentRoute path="/special-projects" component={ProjectsPage} />
      </Switch>
    </Suspense>
  );
}
