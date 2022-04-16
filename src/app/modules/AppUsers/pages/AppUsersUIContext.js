import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./AppUsersUIHelpers";

const AppUsersUIContext = createContext();

export function useAppUsersUIContext() {
  return useContext(AppUsersUIContext);
}

export function AppUsersUIProvider({ appUsersUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const setQueryParams = useCallback((nextQueryParams) => {
    setQueryParamsBase((prevQueryParams) => {
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
    setQueryParams,
    openDetailAppUserPage: appUsersUIEvents.openDetailAppUserPage,
    openFetchAppUsersDialog: appUsersUIEvents.openFetchAppUsersDialog,
    openUpdateAppUserStatusDialog:
      appUsersUIEvents.openUpdateAppUserStatusDialog,
  };

  return (
    <AppUsersUIContext.Provider value={value}>
      {children}
    </AppUsersUIContext.Provider>
  );
}
