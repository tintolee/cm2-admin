import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/projects/projectsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../../ProjectsUIHelpers";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useProjectsUIContext } from "../../ProjectsUIContext";
import { ActionsColumnFormatter } from "./column-formatters/ActionsColumnFormatter";
import { StatusColumnFormatter } from "./column-formatters/StatusColumnFormatter";

export function ProjectsTable() {
  // projects UI Context
  const projectsUIContext = useProjectsUIContext();
  const projectsUIProps = useMemo(() => {
    return {
      ids: projectsUIContext.ids,
      setIds: projectsUIContext.setIds,
      queryParams: projectsUIContext.queryParams,
      setQueryParams: projectsUIContext.setQueryParams,
      openUpdateProjectStatusDialog:
        projectsUIContext.openUpdateProjectStatusDialog,
    };
  }, [projectsUIContext]);

  // Getting current state of project list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.projects }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;

  // project Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchProjects(projectsUIProps.queryParams));
  }, [projectsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "opportunityProvider.name",
      text: "Opportunity provider",
    },
    {
      dataField: "contactName",
      text: "Contact name",
    },
    {
      dataField: "email",
      text: "Email",
    },
    {
      dataField: "telephoneNumber",
      text: "Telephone No.",
    },
    {
      dataField: "mobileNumber",
      text: "Mobile No.",
    },
    {
      dataField: "primarySector.name",
      text: "primary Sector",
    },
    {
      dataField: "employeeCount",
      text: "No.Of.Employees",
    },
    {
      dataField: "projectSummary",
      text: "Description",
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
        openUpdateProjectStatusDialog:
          projectsUIProps.openUpdateProjectStatusDialog,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];

  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: projectsUIProps.queryParams.pageSize,
    page: projectsUIProps.queryParams.pageNumber,
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
                  projectsUIProps.setQueryParams
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
