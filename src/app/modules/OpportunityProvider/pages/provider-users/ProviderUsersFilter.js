import React, { useMemo } from "react";
import { useProviderUsersUIContext } from "./ProviderUsersUIContext";

export function ProviderUsersFilter() {
  // ProviderUsers UI Context
  const providerUsersUIContext = useProviderUsersUIContext();
  const providerUsersUIProps = useMemo(() => {
    return {
      setQueryParams: providerUsersUIContext.setQueryParams,
      openNewProviderUserDialog:
        providerUsersUIContext.openNewProviderUserDialog,
      queryParams: providerUsersUIContext.queryParams,
    };
  }, [providerUsersUIContext]);

  return (
    <>
      <div className="form-filtration">
        <div className="row align-items-center">
          <div className="col-md-2 margin-bottom-10-mobile"></div>
          <div className="col-md-6 margin-bottom-10-mobile"></div>
          <div className="col-md-4 text-right margin-bottom-10-mobile">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => providerUsersUIProps.openNewProviderUserDialog()}
            >
              Create New Provider User
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
