/* eslint-disable no-unused-vars */
import React, {
  useEffect,
  useContext,
  createContext,
  useState,
  useCallback,
} from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./ProviderUsersUIHelper";

const ProviderUsersUIContext = createContext();

export function useProviderUsersUIContext() {
  return useContext(ProviderUsersUIContext);
}

export const ProviderUsersUIConsumer = ProviderUsersUIContext.Consumer;

export function ProviderUsersUIProvider({ currentProviderId, children }) {
  const [providerId, setProviderId] = useState(currentProviderId);
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
  const [selectedId, setSelectedId] = useState(null);
  const [showEditProviderUserDialog, setShowEditProviderUserDialog] = useState(
    false
  );
  const initProviderUser = {
    id: undefined,
    firstName: "",
    lastName: "",
    email: "",
    status: 1,
    opportunityProviderUserOpportunityProviderId: providerId,
  };
  useEffect(() => {
    initProviderUser.opportunityProviderUserOpportunityProviderId = currentProviderId;
    setProviderId(currentProviderId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProviderId]);

  const openNewProviderUserDialog = () => {
    setSelectedId(undefined);
    setShowEditProviderUserDialog(true);
  };
  const openEditProviderUserDialog = (id) => {
    setSelectedId(id);
    setShowEditProviderUserDialog(true);
  };
  const closeEditProviderUserDialog = () => {
    setSelectedId(undefined);
    setShowEditProviderUserDialog(false);
  };

  const value = {
    providerId,
    setProviderId,
    queryParams,
    setQueryParams,
    initProviderUser,
    selectedId,
    showEditProviderUserDialog,
    openNewProviderUserDialog,
    openEditProviderUserDialog,
    closeEditProviderUserDialog,
  };

  return (
    <ProviderUsersUIContext.Provider value={value}>
      {children}
    </ProviderUsersUIContext.Provider>
  );
}
