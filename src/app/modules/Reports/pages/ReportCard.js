import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader
} from "../../../../_metronic/_partials/controls";
import { ReportsFilter } from "./reports/reports-filter/ReportsFilter";
import { ReportsTable } from "./reports/reports-table/ReportsTable";
import { useReportsUIContext } from "./ReportsUIContext";

export function ReportCard() {
  const reportsUIContext = useReportsUIContext();
  const reportsUIProps = useMemo(() => {
    return {
      ids: reportsUIContext.ids
    };
  }, [reportsUIContext]);

  return (
    <Card>
      <CardHeader title="Reports">
      </CardHeader>
      <CardBody>
      <ReportsFilter />
        {reportsUIProps.ids.length > 0}
        <ReportsTable />
      </CardBody>
    </Card>
  );
}
