import React, { useMemo, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useProjectsUIContext } from "../../ProjectsUIContext";
import Select from "react-select";
import * as providersActions from "../../../../OpportunityProvider/_redux/providersActions";

const prepareFilter = (queryParams, values) => {
  const { providerId, searchText } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};

  if (providerId) {
    if (providerId.length !== 0) {
      filter.or = [];
      providerId.forEach((type) => {
        filter.or.push({ opportunityProviderId: { eq: type.value } });
      });
    }
  }

  // Filter by all fields
  if (searchText) {
    filter.or = [
      { contactName: { contains: searchText.toLowerCase() } },
      { email: { contains: searchText.toLowerCase() } }
    ];
  }

  if (!providerId && !searchText) {
    newQueryParams.filter = null;
  }else if (!providerId && searchText) {
    newQueryParams.filter = filter;
  }else if (providerId.length === 0 && !searchText) {
    newQueryParams.filter = null;
  } else {
    newQueryParams.filter = filter;
  }

  return newQueryParams;
};

export function ProjectsFilter({ listLoading }) {
  const projectsUIContext = useProjectsUIContext();
  const dispatch = useDispatch();
  const projectsUIProps = useMemo(() => {
    return {
      queryParams: projectsUIContext.queryParams,
      setQueryParams: projectsUIContext.setQueryParams,
    };
  }, [projectsUIContext]);

  const { providers } = useSelector(
    (state) => ({ providers: state.opportunityProviders.entities }),
    shallowEqual
  );

  const params = {
    filter: null,
  };
  useEffect(() => {
    if(providers === null){
      dispatch(providersActions.fetchOpportunityProviders(params));
    }
  }, [params, providers, dispatch]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(projectsUIProps.queryParams, values);
    if (!isEqual(newQueryParams, projectsUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      projectsUIProps.setQueryParams(newQueryParams);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          opportunityProviderId: null,
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
                <Select
                  isMulti
                  name="providerId"
                  isSearchable="true"
                  options={
                    providers &&
                    providers.map((provider) => ({
                      value: provider.id,
                      label: provider.name,
                    }))
                  }
                  className="basic-multi-select"
                  onChange={(e) => {
                    setFieldValue("providerId", e);
                    handleSubmit();
                  }}
                />
                <small className="form-text text-muted">
                  <b>Filter</b> by Opportunity Provider
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
                  <b>Search</b> in name and email
                </small>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
