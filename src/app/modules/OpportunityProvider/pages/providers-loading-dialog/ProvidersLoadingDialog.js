import React, {useEffect} from "react";
import {shallowEqual, useSelector} from "react-redux";
import {LoadingDialog} from "../../../../../_metronic/_partials/controls";

export function ProvidersLoadingDialog() {
  const { isLoading } = useSelector(
    state => ({ isLoading: state.opportunityProviders.listLoading }),
    shallowEqual
  );
  useEffect(() => {}, [isLoading]);
  return <LoadingDialog isLoading={isLoading} text="Loading ..." />;
}
