import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/reports/reportsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../../ReportsUIHelpers";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useReportsUIContext } from "../../ReportsUIContext";
import { ActionsColumnFormatter } from "./column-formatters/ActionsColumnFormatter";
import { StatusColumnFormatter } from "./column-formatters/StatusColumnFormatter";

export function ReportsTable() {
  // Reports UI Context
  const reportsUIContext = useReportsUIContext();
  const reportsUIProps = useMemo(() => {
    return {
      ids: reportsUIContext.ids,
      setIds: reportsUIContext.setIds,
      queryParams: reportsUIContext.queryParams,
      setQueryParams: reportsUIContext.setQueryParams,
      openUpdateReportStatusDialog: reportsUIContext.openUpdateReportStatusDialog,
    };
  }, [reportsUIContext]);

  // Getting current state of report list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.reports }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  // reports Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchReports(reportsUIProps.queryParams));
  }, [reportsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "dateTime",
      text: "Date/time received",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "from",
      text: "From",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "details",
      text: "Details",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "type",
      text: "Type",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "about",
      text: "About",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      sortCaret: sortCaret,
      formatter: StatusColumnFormatter,
      headerSortingClasses,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openUpdateReportStatusDialog: reportsUIProps.openUpdateReportStatusDialog
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    }
  ];

  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: reportsUIProps.queryParams.pageSize,
    page: reportsUIProps.queryParams.pageNumber,
  };
  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                bordered={false}
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                remote
                keyField="id"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  reportsUIProps.setQueryParams
                )}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
