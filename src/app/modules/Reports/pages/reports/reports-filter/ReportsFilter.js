import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useReportsUIContext } from "../../ReportsUIContext";
import Select from 'react-select';

const prepareFilter = (queryParams, values) => {
  const { typeId, from, about } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};

  // Filter by type
  if (typeId) {
    if (typeId.length === 0) {
      filter.or = [
        { dateTime: { contains: "" } },
        { from: { contains: "" } },
        { details: { contains: "" } },
        { type: { contains: "" } },
        { about: { contains: "" } }
      ];
    } else {
      filter.or = [];
      typeId.forEach(type => {
        filter.or.push({ typeId: { eq: type.value } })
      })
    }
  }
  // Filter by about
  if (about) {
    filter.about= about !== "" ? { contains: about.toLowerCase() } : undefined;
  }
  // Filter by from
  if (from) {
    filter.from= from !== "" ? { contains: from.toLowerCase() } : undefined;
  }

  if (!typeId && !about && !from) {
    newQueryParams.filter = null;
  }
  else {
    newQueryParams.filter = filter;
  }
  return newQueryParams;
};

const stepOptions = [
  { value: '1', label: 'Steps' },
  { value: '2', label: 'Opportunity' },
  { value: '3', label: 'Opportunity Comment' },
  { value: '4', label: 'Seeker Profile' },
  { value: '5', label: 'OP Profile' },
  { value: '6', label: 'Collaboration' },
  { value: '7', label: 'Collaboration Comment' },
  { value: '8', label: 'Direct Message' },
];

export function ReportsFilter({ listLoading }) {
  // Reports UI Context
  const reportsUIContext = useReportsUIContext();
  const reportsUIProps = useMemo(() => {
    return {
      queryParams: reportsUIContext.queryParams,
      setQueryParams: reportsUIContext.setQueryParams,
    };
  }, [reportsUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(reportsUIProps.queryParams, values);
    if (!isEqual(newQueryParams, reportsUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      reportsUIProps.setQueryParams(newQueryParams);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          typeId: "",
          from: "",
          about: ""
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
                  <Select
                    isMulti
                    name="typeId"
                    isSearchable="true"
                    options={stepOptions}
                    className="basic-multi-select"
                    onChange={(e) => {
                      setFieldValue("typeId", e);
                      handleSubmit();
                    }}
                  />

                  <small className="form-text text-muted">
                    <b>Filter</b> by Type
                </small>
                </div>
                <div className="col-lg-2">
                  <input
                    type="text"
                    className="form-control"
                    name="from"
                    placeholder="From"
                    onBlur={handleBlur}
                    value={values.from}
                    onChange={(e) => {
                      setFieldValue("from", e.target.value);
                      handleSubmit();
                    }}
                  />
                  <small className="form-text text-muted">
                    <b>Search</b> in From field
                </small>
                </div>
                <div className="col-lg-2">
                  <input
                    type="text"
                    className="form-control"
                    name="about"
                    placeholder="About"
                    onBlur={handleBlur}
                    value={values.about}
                    onChange={(e) => {
                      setFieldValue("about", e.target.value);
                      handleSubmit();
                    }}
                  />
                  <small className="form-text text-muted">
                    <b>Search</b> in About field
                </small>
                </div>
              </div>
            </form>
          )}
      </Formik>
    </>
  );
}
