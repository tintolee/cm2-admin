/* eslint-disable no-restricted-imports */
import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function ProviderUserEditDialogHeader({ id }) {
  const [title, setTitle] = useState("");
  // opportunityProviderUsers Redux state
  const { providerUserForEdit, actionsLoading } = useSelector(
    (state) => ({
      providerUserForEdit: state.opportunityProviderUsers.providerUserForEdit,
      actionsLoading: state.opportunityProviderUsers.actionsLoading,
    }),
    shallowEqual
  );

  useEffect(() => {
    let _title = id ? "" : "New Provider User";
    if (providerUserForEdit && id) {
      _title = "Edit provider user";
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [providerUserForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
