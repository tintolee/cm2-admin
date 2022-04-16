import React from "react";
import { Route } from "react-router-dom";
import { ProjectsLoadingDialog } from "./specialProjects/projects-loading-dialog/ProjectsLoadingDialog"
import { ProjectsUIProvider } from "./ProjectsUIContext";
import { ProjectCard } from "./ProjectCard";
import { ProjectUpdateStatusDialog } from "./../pages/specialProjects/projects-update-status-dialog/ProjectUpdateStatusDialog";

export function ProjectsPage({ history }) {

  const projectsUIEvents = {
    openUpdateProjectStatusDialog: (id) => {
      history.push(`/special-projects/${id}/updateStatus`);
    }
  };

  return (
    <ProjectsUIProvider projectsUIEvents={projectsUIEvents}>
      <ProjectsLoadingDialog />
      <Route path="/special-projects/:id/updateStatus">
        {({ history, match }) => (
          <ProjectUpdateStatusDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/special-projects");
            }}
          />
        )}
      </Route>
      <ProjectCard />
    </ProjectsUIProvider>
  );
}

