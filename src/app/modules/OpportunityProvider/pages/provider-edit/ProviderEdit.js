import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../_redux/providersActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { ProviderEditForm } from "./ProviderEditForm";
import { useSubheader } from "../../../../../_metronic/layout";
import { ModalProgressBar } from "../../../../../_metronic/_partials/controls";
import { ProviderUsersUIProvider } from "../provider-users/ProviderUsersUIContext";
import { ProviderUsers } from "../provider-users/ProviderUsers";

const initProvider = {
  id: undefined,
  name: "",
  companyNo: "",
  parent: "",
  educationalInstitution: false,
  email: "",
  status: 1,
};

export function ProviderEdit({
  history,
  match: {
    params: { id },
  },
}) {
  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [tab, setTab] = useState("basic");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, providerForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.opportunityProviders.actionsLoading,
      providerForEdit: state.opportunityProviders.providerForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchProvider(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : "New Opportunity Provider";
    if (providerForEdit && id) {
      _title = `Edit Opportunity Provider '${providerForEdit.name} - ${providerForEdit.companyNo}'`;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providerForEdit, id]);

  const saveProvider = (values) => {
    const input = {
      name: values.name,
      companyNo: values.companyNo,
      parent: values.parent,
      educationalInstitution: values.educationalInstitution,
      email: values.email,
      status: values.status,
    };

    if (!id) {
      input.displayName = values.name;
      dispatch(actions.createProvider(input)).then(() => backToProvidersList());
    } else {
      input.id = values.id;
      dispatch(actions.updateProvider(input)).then(() => backToProvidersList());
    }
  };

  const btnRef = useRef();
  const saveProviderClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToProvidersList = () => {
    history.push(`/opportunity-providers`);
  };

  return (
    <Card>
      {actionsLoading && <ModalProgressBar />}
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToProvidersList}
            className="btn btn-light"
          >
            <i className="fa fa-arrow-left"></i>
            Back
          </button>
          {`  `}
          <button
            type="submit"
            className="btn btn-primary ml-2"
            onClick={saveProviderClick}
          >
            Save
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ul className="nav nav-tabs nav-tabs-line " role="tablist">
          <li className="nav-item" onClick={() => setTab("basic")}>
            <a
              className={`nav-link ${tab === "basic" && "active"}`}
              data-toggle="tab"
              role="tab"
              // aria-selected={(tab === "basic").toString()}
              href="#section"
            >
              Basic info
            </a>
          </li>
          {id && (
            <>
              {" "}
              <li className="nav-item" onClick={() => setTab("providerUsers")}>
                <a
                  className={`nav-link ${tab === "providerUsers" && "active"}`}
                  data-toggle="tab"
                  role="button"
                  // aria-selected={(tab === "providerUsers").toString()}
                  href="#section"
                >
                  Opportunity Provider Users
                </a>
              </li>
            </>
          )}
        </ul>
        <div className="mt-5">
          {tab === "basic" && (
            <ProviderEditForm
              actionsLoading={actionsLoading}
              provider={providerForEdit || initProvider}
              btnRef={btnRef}
              saveProvider={saveProvider}
            />
          )}
          {tab === "providerUsers" && id && (
            <ProviderUsersUIProvider currentProviderId={id}>
              <ProviderUsers />
            </ProviderUsersUIProvider>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
