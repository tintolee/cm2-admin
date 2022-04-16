import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../_redux/providersActions";
import * as uiHelpers from "../ProvidersUIHelpers";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../_metronic/_helpers";
import { ActionsColumnFormatter } from "./column-formatters/ActionsColumnFormatter";
import { StatusColumnFormatter } from "./column-formatters/StatusColumnFormatter";
import { NameColumnFormatter } from "./column-formatters/NameColumnFormatter";
import { Pagination } from "../../../../../_metronic/_partials/controls";
import { useProvidersUIContext } from "../ProvidersUIContext";

export function ProvidersTable() {
  const providersUIContext = useProvidersUIContext();
  const providersUIProps = useMemo(() => {
    return {
      ids: providersUIContext.ids,
      setIds: providersUIContext.setIds,
      queryParams: providersUIContext.queryParams,
      setQueryParams: providersUIContext.setQueryParams,
      openEditProviderPage: providersUIContext.openEditProviderPage,
      openUpdateProviderStatusDialog:
        providersUIContext.openUpdateProviderStatusDialog,
    };
  }, [providersUIContext]);

  // Getting curret state of providers list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.opportunityProviders }),
    shallowEqual
  );

  // console.log(currentState);
  const { totalCount, entities, listLoading } = currentState;

  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(actions.fetchOpportunityProviders(providersUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providersUIProps.queryParams, dispatch]);

  // Table columns
  const columns = [
    {
      dataField: "name",
      text: "Name",
      formatter: NameColumnFormatter,
      formatExtraData: {
        openEditProviderPage: providersUIProps.openEditProviderPage,
      },
    },
    {
      dataField: "companyNo",
      text: "Company/Charity No.",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "parent",
      text: "Parent",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "setupLink",
      text: "Re-send setup link",
      sort: false,
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
        openEditProviderPage: providersUIProps.openEditProviderPage,
        openUpdateProviderStatusDialog:
          providersUIProps.openUpdateProviderStatusDialog,
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
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                bordered={false}
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
