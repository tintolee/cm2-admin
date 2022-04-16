import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useProvidersUIContext } from "../../ProvidersUIContext";

const prepareFilter = (queryParams, values) => {
  const { status, searchText } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};

  if (status) {
    filter.status = status !== "" ? { eq: status } : undefined;
  }

  if (searchText) {
    filter.or = [
      { name: { contains: searchText.toLowerCase() } },
      { interested: { contains: searchText } }
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
  const providersUIProps = useMemo(() => {
    return {
      setQueryParams: providersUIContext.setQueryParams,
      queryParams: providersUIContext.queryParams
    };
  }, [providersUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(providersUIProps.queryParams, values);
    if (!isEqual(newQueryParams, providersUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      providersUIProps.setQueryParams(newQueryParams);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          status: "",
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
                    placeholder="Show"
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
