import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useAppUsersUIContext } from "../AppUsersUIContext";

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
      { firstName: { contains: searchText } },
      { lastName: { contains: searchText } },
      { email: { contains: searchText } },
      { mobileNumber: { contains: searchText } }
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

export function AppUsersFilter({ listLoading }) {
  // AppUsers UI Context
  const appUsersUIContext = useAppUsersUIContext();
  const appUsersUIProps = useMemo(() => {
    return {
      setQueryParams: appUsersUIContext.setQueryParams,
      queryParams: appUsersUIContext.queryParams,
    };
  }, [appUsersUIContext]);

  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(appUsersUIProps.queryParams, values);
    if (!isEqual(newQueryParams, appUsersUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      appUsersUIProps.setQueryParams(newQueryParams);
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
                    <option value="0">Suspend</option>
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
                    <b>Search</b> in name, email and mobile number
                </small>
                </div>
              </div>
            </form>
          )}
      </Formik>
    </>
  );
}
