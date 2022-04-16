import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader
} from "../../../../_metronic/_partials/controls";
import { ProjectsFilter } from "./specialProjects/projects-filter/ProjectsFilter";
import { ProjectsTable } from "./specialProjects/projects-table/ProjectsTable";
import { useProjectsUIContext } from "./ProjectsUIContext";

export function ProjectCard() {
  const projectsUIContext = useProjectsUIContext();
  const projectsUIProps = useMemo(() => {
    return {
      ids: projectsUIContext.ids
    };
  }, [projectsUIContext]);

  return (
    <Card>
      <CardHeader title="Send a Special Project Request">
      </CardHeader>
      <CardBody>
        <ProjectsFilter />
        {projectsUIProps.ids.length > 0}
        <ProjectsTable />
      </CardBody>
    </Card>
  );
}
