import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./ProjectsUIHelpers";

const ProjectsUIContext = createContext();

export function useProjectsUIContext() {
  return useContext(ProjectsUIContext);
}

export const ProjectsUIConsumer = ProjectsUIContext.Consumer;

export function ProjectsUIProvider({ projectsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback(nextQueryParams => {
    setQueryParamsBase(prevQueryParams => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    openUpdateProjectStatusDialog: projectsUIEvents.openUpdateProjectStatusDialog,
  };

  return <ProjectsUIContext.Provider value={value}>{children}</ProjectsUIContext.Provider>;
}