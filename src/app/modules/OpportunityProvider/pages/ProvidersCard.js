import React, { useMemo } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar,
} from "../../../../_metronic/_partials/controls";
import { ProvidersFilter } from "./providers-filter/ProvidersFilter";
import { ProvidersTable } from "./providers-table/ProvidersTable";
import { useProvidersUIContext } from "./ProvidersUIContext";

export function ProvidersCard() {
    const providersUIContext = useProvidersUIContext();
    const providersUIProps = useMemo(() => {
        return {
            ids: providersUIContext.ids,
            queryParams: providersUIContext.queryParams,
            setQueryParams: providersUIContext.setQueryParams,
            newProviderButtonClick: providersUIContext.newProviderButtonClick,
            openEditProviderPage: providersUIContext.openEditProviderPage,
            openFetchProvidersDialog: providersUIContext.openFetchProvidersDialog,
        };
    }, [providersUIContext]);

    return (
        <Card>
            <CardHeader title="Opportunity Providers">
                <CardHeaderToolbar>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={providersUIProps.newProviderButtonClick}
                    >
                        New Opportunity Provider
            </button>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                <ProvidersFilter />
                <ProvidersTable />
            </CardBody>
        </Card>
    );
}