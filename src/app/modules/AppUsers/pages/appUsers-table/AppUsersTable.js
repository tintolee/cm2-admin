import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../_redux/appUsersActions";
import * as uiHelpers from "../AppUsersUIHelpers";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../_metronic/_helpers";
import { ActionsColumnFormatter } from "./column-formatters/ActionsColumnFormatter";
import { StatusColumnFormatter } from "./column-formatters/StatusColumnFormatter";
import { NamesColumnFormatter } from "./column-formatters/NamesColumnFormatter";
import { Pagination } from "../../../../../_metronic/_partials/controls";
import { useAppUsersUIContext } from "../AppUsersUIContext";

export function AppUsersTable() {
  const appUsersUIContext = useAppUsersUIContext();
  const appUsersUIProps = useMemo(() => {
    return {
      queryParams: appUsersUIContext.queryParams,
      setQueryParams: appUsersUIContext.setQueryParams,
      openDetailAppUserPage: appUsersUIContext.openDetailAppUserPage,
      openUpdateAppUserStatusDialog:
        appUsersUIContext.openUpdateAppUserStatusDialog,
    };
  }, [appUsersUIContext]);

  // Getting curret state of appUsers list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.appUsers }),
    shallowEqual
  );

  // console.log(currentState);
  const { totalCount, entities, listLoading } = currentState;

  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(actions.fetchAppUsers(appUsersUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appUsersUIProps.queryParams, dispatch]);

  // Table columns
  const columns = [
    {
      dataField: "name",
      text: "Name",
      formatter: NamesColumnFormatter,
      formatExtraData: {
        openDetailAppUserPage: appUsersUIProps.openDetailAppUserPage,
      },
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "mobileNumber",
      text: "Mobile Number",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "postcodeArea",
      text: "Postcode Area",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "dateOfBirth",
      text: "Date of Birth",
      sort: true,
      sortCaret: sortCaret,
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
        openDetailAppUserPage: appUsersUIProps.openDetailAppUserPage,
        openUpdateAppUserStatusDialog:
          appUsersUIProps.openUpdateAppUserStatusDialog,
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
    sizePerPage: appUsersUIProps.queryParams.pageSize,
    page: appUsersUIProps.queryParams.pageNumber,
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
                  appUsersUIProps.setQueryParams
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
