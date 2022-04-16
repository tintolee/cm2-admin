import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { LoadingDialog } from "../../../../../../_metronic/_partials/controls";

export function ProvidersLoadingDialog() {
  // Providers Redux state
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.providers.listLoading }),
    shallowEqual
  );
  // looking for loading/dispatch
  useEffect(() => { }, [isLoading]);
  return <LoadingDialog isLoading={isLoading} text="Loading ..." />;
}
