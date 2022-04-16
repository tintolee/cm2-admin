import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useProvidersUIContext } from "../ProvidersUIContext";

const prepareFilter = (queryParams, values) => {
  const { status, searchText } = values;
  const newQueryParams = { ...queryParams };
  //Filter for GraphQL query
  const filter = {};
  // Filter by status
  if (status) {
    filter.status = status !== "" ? { eq: status } : undefined;
  }
  if (searchText) {
    filter.or = [
      { name: { contains: searchText.toLowerCase() } },
      { companyNo: { contains: searchText } },
      { parent: { contains: searchText } }
    ]
  }
  if (!status && !searchText) {
    newQueryParams.filter = null;
  }
  else {
    newQueryParams.filter = filter;
  }
  return newQueryParams;
};

export function ProvidersFilter({ listLoading }) {
  // Providers UI Context
  const providersUIContext = useProvidersUIContext();
  const providerssUIProps = useMemo(() => {
    return {
      setQueryParams: providersUIContext.setQueryParams,
      queryParams: providersUIContext.queryParams,
    };
  }, [providersUIContext]);

  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(providerssUIProps.queryParams, values);
    if (!isEqual(newQueryParams, providerssUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      providerssUIProps.setQueryParams(newQueryParams);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          status: "", // values => All=""/Archive=0/Active=1
          searchText: "",
        }}
        onSubmit={(values) => {
          applyFilter(values);
        }}
      >
        {({
          values,
          handleSubmit,
          handleBlur,
          handleChange,
          setFieldValue,
        }) => (
            <form onSubmit={handleSubmit} className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-2">
                  <select
                    className="form-control"
                    name="status"
                    placeholder="Filter by Status"
                    onChange={(e) => {
                      setFieldValue("status", e.target.value);
                      handleSubmit();
                    }}
                    onBlur={handleBlur}
                    value={values.status}
                  >
                    <option value="">All</option>
                    <option value="0">Archive</option>
                    <option value="1">Active</option>
                  </select>
                  <small className="form-text text-muted">
                    <b>Filter</b> by Status
                </small>
                </div>
                <div className="col-lg-2">
                  <input
                    type="text"
                    className="form-control"
                    name="searchText"
                    placeholder="Search"
                    onBlur={handleBlur}
                    value={values.searchText}
                    onChange={(e) => {
                      setFieldValue("searchText", e.target.value);
                      handleSubmit();
                    }}
                  />
                  <small className="form-text text-muted">
                    <b>Search</b> in all fields
                </small>
                </div>
              </div>
            </form>
          )}
      </Formik>
    </>
  );
}
