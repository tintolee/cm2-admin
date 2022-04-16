import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./ReportsUIHelpers";

const ReportsUIContext = createContext();

export function useReportsUIContext() {
  return useContext(ReportsUIContext);
}

export const ReportsUIConsumer = ReportsUIContext.Consumer;

export function ReportsUIProvider({ reportsUIEvents, children }) {
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

  const initReport = {
    id: undefined,
    dateTime: "",
    from: "",
    details: "",
    type: "",
    about: "",
    status: 0,
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initReport,
    openUpdateReportStatusDialog: reportsUIEvents.openUpdateReportStatusDialog,
  };

  return <ReportsUIContext.Provider value={value}>{children}</ReportsUIContext.Provider>;
}