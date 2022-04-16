import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./ProvidersUIHelpers";

const ProvidersUIContext = createContext();

export function useProvidersUIContext() {
  return useContext(ProvidersUIContext);
}

export const ProvidersUIConsumer = ProvidersUIContext.Consumer;

export function ProvidersUIProvider({ providersUIEvents, children }) {
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

  const initProvider = {
    id: undefined,
    name: "",
    interested: "0",
    status: 1,
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initProvider,
    newProviderButtonClick: providersUIEvents.newProviderButtonClick,
    openEditProviderDialog: providersUIEvents.openEditProviderDialog,
    openArchiveProviderDialog: providersUIEvents.openArchiveProviderDialog,
    openArchiveProvidersDialog: providersUIEvents.openArchiveProvidersDialog
  };

  return <ProvidersUIContext.Provider value={value}>{children}</ProvidersUIContext.Provider>;
}