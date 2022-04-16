import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/providers/providersActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../../ProvidersUIHelpers";
import { ActionsColumnFormatter } from "./column-formatters/ActionsColumnFormatter";
import { StatusColumnFormatter } from "./column-formatters/StatusColumnFormatter";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useProvidersUIContext } from "../../ProvidersUIContext";

export function ProvidersTable() {
  // providers UI Context
  const providersUIContext = useProvidersUIContext();
  const providersUIProps = useMemo(() => {
    return {
      ids: providersUIContext.ids,
      setIds: providersUIContext.setIds,
      queryParams: providersUIContext.queryParams,
      setQueryParams: providersUIContext.setQueryParams,
      openEditProviderDialog: providersUIContext.openEditProviderDialog,
      openArchiveProviderDialog: providersUIContext.openArchiveProviderDialog,
    };
  }, [providersUIContext]);

  // Getting current state of provider list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.providers }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;

  // provider Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchProviders(providersUIProps.queryParams));
  }, [providersUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "name",
      text: "Name",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "interested",
      text: "Interested",
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
        openEditProviderDialog: providersUIProps.openEditProviderDialog,
        openArchiveProviderDialog: providersUIProps.openArchiveProviderDialog,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: providersUIProps.queryParams.pageSize,
    page: providersUIProps.queryParams.pageNumber,
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
                  providersUIProps.setQueryParams
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
