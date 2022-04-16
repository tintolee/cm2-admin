import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./ProvidersUIHelpers";

const ProvidersUIContext = createContext();

export function useProvidersUIContext() {
    return useContext(ProvidersUIContext);
}

export function ProvidersUIProvider({ providersUIEvents, children }) {
    const [queryParams, setQueryParamsBase] = useState(initialFilter);
    const [ids, setIds] = useState([]);
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
        ids,
        setIds,
        setQueryParams,
        newProviderButtonClick: providersUIEvents.newProviderButtonClick,
        openEditProviderPage: providersUIEvents.openEditProviderPage,
        openFetchProvidersDialog: providersUIEvents.openFetchProvidersDialog,
        openUpdateProviderStatusDialog: providersUIEvents.openUpdateProviderStatusDialog,
    };

    return (
        <ProvidersUIContext.Provider value={value}>
            {children}
        </ProvidersUIContext.Provider>
    );
}
