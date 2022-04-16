import React, { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import * as actions from "../../_redux/providerUsers/providerUsersActions";
import { ActionsColumnFormatter } from "./column-formatters/ActionsColumnFormatter";
import { StatusColumnFormatter } from "./column-formatters/StatusColumnFormatter";
import * as uiHelpers from "./ProviderUsersUIHelper";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  headerSortingClasses,
} from "../../../../../_metronic/_helpers";
import { useProviderUsersUIContext } from "./ProviderUsersUIContext";

export function ProviderUsersTable() {
  const providerUsersUIContext = useProviderUsersUIContext();
  const providerUsersUIProps = useMemo(() => {
    return {
      ids: providerUsersUIContext.ids,
      queryParams: providerUsersUIContext.queryParams,
      setQueryParams: providerUsersUIContext.setQueryParams,
      providerId: providerUsersUIContext.providerId,
      openEditProviderUserDialog:
        providerUsersUIContext.openEditProviderUserDialog,
    };
  }, [providerUsersUIContext]);

  // Getting curret state of products list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.opportunityProviderUsers }),
    shallowEqual
  );
  const {  entities } = currentState;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      actions.fetchProviderUsers(
        providerUsersUIProps.queryParams,
        providerUsersUIProps.providerId
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    providerUsersUIProps.queryParams,
    dispatch,
    providerUsersUIProps.providerId,
  ]);
  const columns = [
    {
      dataField: "firstName",
      text: "First Name",
      sort: false,
    },
    {
      dataField: "lastName",
      text: "Last Name",
      sort: false,
    },
    {
      dataField: "email",
      text: "Email",
      sort: false,
    },
    {
      dataField: "status",
      text: "Status",
      sort: false,
      formatter: StatusColumnFormatter,
      headerSortingClasses,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditProviderUserDialog:
          providerUsersUIProps.openEditProviderUserDialog,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];

  return (
    <BootstrapTable
      wrapperClasses="table-responsive"
      classes="table table-head-custom table-vertical-center overflow-hidden"
      bordered={false}
      bootstrap4
      remote
      keyField="id"
      data={entities === null ? [] : entities}
      columns={columns}
      defaultSorted={uiHelpers.defaultSorted}
      onTableChange={getHandlerTableChange(providerUsersUIProps.setQueryParams)}
    >
      <PleaseWaitMessage entities={entities} />
      <NoRecordsFoundMessage entities={entities} />
    </BootstrapTable>
  );
}
