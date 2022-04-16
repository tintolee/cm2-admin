/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../_redux/appUsersActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { useSubheader } from "../../../../../_metronic/layout";
import { ModalProgressBar } from "../../../../../_metronic/_partials/controls";
import { AppUserCard } from "./AppUserCard";

export function AppUserDetail({
  history,
  match: {
    params: { id },
  },
}) {
  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [tab, setTab] = useState("collaborations");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const { actionsLoading, appUserForDetail } = useSelector(
    (state) => ({
      actionsLoading: state.appUsers.actionsLoading,
      appUserForDetail: state.appUsers.appUserForDetail,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchAppUser(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : "App User Detail";
    if (appUserForDetail && id) {
      _title = `App User - ${appUserForDetail.firstName} ${appUserForDetail.lastName}`;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appUserForDetail, id]);

  const backToProductsList = () => {
    history.push(`/app-users`);
  };

  return (
    <Card>
      {actionsLoading && <ModalProgressBar />}
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToProductsList}
            className="btn btn-light"
          >
            <i className="fa fa-arrow-left"></i>
            Back
          </button>
          {`  `}
          <button type="submit" className="btn btn-primary ml-2">
            Download CV
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <AppUserCard user={appUserForDetail} />

        <ul className="nav nav-tabs nav-tabs-line " role="tablist">
          <li className="nav-item" onClick={() => setTab("collaborations")}>
            <a
              className={`nav-link ${tab === "collaborations" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "collaborations").toString()}
            >
              Collaborations
            </a>
          </li>
          {id && (
            <>
              {" "}
              <li className="nav-item" onClick={() => setTab("opportunities")}>
                <a
                  className={`nav-link ${tab === "opportunities" && "active"}`}
                  data-toggle="tab"
                  role="button"
                  aria-selected={(tab === "opportunities").toString()}
                >
                  Registered Opportunities
                </a>
              </li>
              <li className="nav-item" onClick={() => setTab("destinations")}>
                <a
                  className={`nav-link ${tab === "destinations" && "active"}`}
                  data-toggle="tab"
                  role="tab"
                  aria-selected={(tab === "destinations").toString()}
                >
                  Destinations
                </a>
              </li>
            </>
          )}
        </ul>
        <div className="mt-5">
          {tab === "opportunities" && <></>}
          {tab === "opportunities" && id && <></>}
          {tab === "destinations" && id && <></>}
        </div>
      </CardBody>
    </Card>
  );
}
