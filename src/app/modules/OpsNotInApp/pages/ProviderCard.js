import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_metronic/_partials/controls";
import { ProvidersFilter } from "./opportunityProvidersNotInApp/providers-filter/ProvidersFilter";
import { ProvidersTable } from "./opportunityProvidersNotInApp/providers-table/ProvidersTable";
import { useProvidersUIContext } from "./ProvidersUIContext";

export function ProviderCard() {
  const providersUIContext = useProvidersUIContext();
  const providersUIProps = useMemo(() => {
    return {
      ids: providersUIContext.ids,
      newProviderButtonClick: providersUIContext.newProviderButtonClick,
    };
  }, [providersUIContext]);

  return (
    <Card>
      <CardHeader title="OPs Not in App">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={providersUIProps.newProviderButtonClick}
          >
            New OPs Not In APP
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ProvidersFilter />
        {providersUIProps.ids.length > 0}
        <ProvidersTable />
      </CardBody>
    </Card>
  );
}
